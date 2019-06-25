import React, { Component } from 'react'
import { Form, Modal, Input } from 'antd';
import SelectFormItem from '../common/SelectFormItem';
import Interface from '../../constants/Interface';
import api from '../../../api/index';

const FormItem = Form.Item;

class BrandModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 1
        };
        this.levelOption = [
            { id: 1, value: '主品牌' },
            { id: 2, value: '子品牌' },
        ];
        this.signOption = [
            { id: 1, value: '可用' },
            { id: 2, value: '不可用' },
        ];
    }

    componentDidMount() {
        const { itemInfo } = this.props;

        if (itemInfo)
            this.setState({level: itemInfo.level});
    }

    handleSave = () => {
        const { form, modalType, itemInfo, handleAddItem, handleEditItem, isShowModal } = this.props;
        
        form.validateFields((err, values) => {
            if(err) return;

            if( modalType === 'add' ) {
                handleAddItem(values);
            }else if( modalType === 'edit' && itemInfo) {
                const copyItem = {...itemInfo};
                Object.assign(copyItem, values);
                handleEditItem(copyItem);
            }

            isShowModal();
        })
    }

    handleChangeLevel = level => {
        const { form } = this.props;
        const isChildCodeErr = form.getFieldError('brand_child_code');
        const childCode = form.getFieldValue('brand_child_code');
        const errMsg = level === 1 ? '请填写主品牌code' : '请选择主品牌';
        this.setState({ level });

        if(childCode && childCode.length === 5 && isChildCodeErr) {
            this.setFormItemError('brand_child_code', childCode, [new Error(errMsg)])
        }

        form.resetFields(['brand_parent_code']);
    }

    judgeInputLenth = (_, value, callback) => {    
        const notEmpty = value && value.trim();
        const lenthOk = value && value.length <= 20;
        const { brand_name } = this.state;

        if(notEmpty && lenthOk && !brand_name)
        {
            callback();
        }else if(!notEmpty) {
            callback("请填写品牌名称");
        }else if(!lenthOk) {
            callback("品牌名称不得超过20个字");
        }else if(brand_name) {
            callback('和现有品牌名称重复，请重新填写')
        }
    }

    judgeCode = (name, value, callback) => {
        const { brand_parent_code, brand_child_code } = this.state;
        const isNum = /^\d+$/.test(value);
        const isRepeat = name === '主品牌code' ? brand_parent_code : brand_child_code;
        const repeatMsg = name === '主品牌code' ? `和现有${name}重复，请重新填写` : `和其他${name}重复，请重新填写`;
        const invalidVal = value === '00000';
        
        if(isNum && value.length === 5 && !isRepeat && !invalidVal) {
            callback();
        }else if(!(value && value.length)){
            callback(`请填写${name}`);
        }else if(!isNum || value.length !== 5) {
            callback(`${name}必须为5位数字`)
        }else if(invalidVal) {
            callback(`${name}不能全为0`)
        }else if(isRepeat) {
            callback(repeatMsg)
        }
    }

    getInitalValue = dataType => {
        const { modalType, itemInfo } = this.props;
        if ( modalType !== 'edit' || !itemInfo )
            return undefined;

        return itemInfo[dataType];
    }

    setFormItemError = (type, value, errors) => {
        const { form } = this.props;
        form.setFields({[type]: {value, errors}})
    }

    handleVerifyUnique = (name, type, value, lenthOk, parentCode) => {
        const { form, modalType, itemInfo = {} } = this.props;
        const { level } = this.state;
        const payload = {[type]: value};
        const childCode = form.getFieldValue('brand_child_code');
        const finalPCode = form.getFieldValue('brand_parent_code') || parentCode;
        const parentMsg = level === 1 ? '请填写主品牌code' : '请选择主品牌';

        if(!value || !lenthOk || value === '00000') return;
        if(modalType === 'edit' && type === 'brand_name' && value === itemInfo.brand_name) {
            this.setState({brand_name: false});
            return;
        }

        if(type === 'brand_child_code') {
            if(finalPCode) {
                payload.brand_parent_code = finalPCode;
            }else {
                this.setFormItemError(type, value, [new Error(parentMsg)])
                return;
            }
        }else if(type === 'brand_parent_code' && childCode && childCode.length === 5) {
            this.handleVerifyUnique('品牌序列号', 'brand_child_code', childCode, true)
        }
        
        api.post(Interface.verifyUnique, payload).then(result => {
            const { data } = result;
            const errorMsg = data ? [new Error(`和现有${name}重复，请重新填写`)] : null;

            this.setState({[type]: data});
            this.setFormItemError(type, value, errorMsg);
        });
    }

    handleChangeParenBrand = parentCode => {
        const { mainBrandList = [], form } = this.props;
        const selectMainBrand = mainBrandList.find(item => item.id === parentCode) || {};
        const childCode = form.getFieldValue('brand_child_code');

        if(childCode && childCode.length === 5) {
            this.handleVerifyUnique('品牌序列号', 'brand_child_code', childCode, true, parentCode)
        }
        
        form.setFieldsValue({'industry_code': selectMainBrand.industry})
    }

    handleFocusInput = (type) => {
        this.setState({[type]: false})
    }

    render() {
        const { modalType, mainBrandList, IndustryList, form, isShowModal } = this.props;
        const { level } = this.state;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 19},
        };
        const levelInit = {
            initialValue: level,
            rules: [{
                required: true,
                message: '请选择品牌类型'
            }]
        };
        const mainBrandInit = {
            initialValue: this.getInitalValue('brand_parent_code'),
            rules: [{
                required: true,
                message: '请选择主品牌'
            }]
        };
        const industryInit = {
            initialValue: this.getInitalValue('industry_code'),
            rules: [{
                required: true,
                message: '请选择品牌所属行业'
            }]
        };
        const signInit = {
            initialValue: this.getInitalValue('is_signed_available'),
            rules: [{
                required: true,
                message: '请选择该品牌是否可用于标注'
            }]
        };
        const getAddInfoItems = () => {
            return [
                <SelectFormItem
                    key='levelItem'
                    getFieldDecorator={getFieldDecorator}
                    label={'品牌类型'}
                    keyName={'level'}
                    options={this.levelOption}
                    initObj={levelInit}
                    formItemLayout={formItemLayout} 
                    onChange={this.handleChangeLevel}
                />,
                level == 1 ? 
                    <FormItem key='brandCodeItem' label="主品牌code" {...formItemLayout}>
                        {getFieldDecorator('brand_parent_code', {
                            initialValue: this.getInitalValue('brand_parent_code'),
                            rules: [
                                {required: true, message: ' '}, 
                                {validator: (_, value, callback) => {this.judgeCode('主品牌code', value, callback)}}
                            ]
                        })(
                            <Input 
                                placeholder='请输入5位数字主品牌code' 
                                onFocus={() => {this.handleFocusInput('brand_parent_code')}}
                                onBlur={
                                    ({target: {value}}) => 
                                    {
                                        this.handleVerifyUnique('主品牌code', 'brand_parent_code', value, value.length === 5)
                                    }
                                } 
                            />
                        )}
                    </FormItem> : 
                    <SelectFormItem
                        key='brandCodeItem'
                        showSearch
                        placeholder='请输入主品牌名称查询'
                        getFieldDecorator={getFieldDecorator}
                        label={'选择主品牌'}
                        keyName={'brand_parent_code'}
                        options={mainBrandList}
                        initObj={mainBrandInit}
                        formItemLayout={formItemLayout}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={this.handleChangeParenBrand}
                    />,
                <FormItem  key='brandChildItem' label="品牌序列号" {...formItemLayout}>
                    {getFieldDecorator('brand_child_code', {
                        initialValue: this.getInitalValue('brand_child_code'),
                        rules: [{required: true, message: ' '},{validator: (_, value, callback) => {this.judgeCode('品牌序列号', value, callback)}}]
                    })(
                        <Input 
                            placeholder='请输入5位数字品牌序列号' 
                            onFocus={() => {this.handleFocusInput('brand_child_code')}}
                            onBlur={
                                ({target: {value}}) => 
                                {
                                    this.handleVerifyUnique('品牌序列号', 'brand_child_code', value, value.length === 5)
                                }
                            } 
                        />
                    )}
                </FormItem>
            ];
        };

        return (
            <Modal
                visible
                destroyOnClose
                width={600}
                title={ modalType === 'add' ? '添加品牌' : '修改品牌' }
                onOk={ this.handleSave }
                onCancel={ () => { isShowModal() } }
            >
                <Form>
                    <FormItem label="品牌名称" {...formItemLayout}>
                        {getFieldDecorator('brand_name', {
                            initialValue: this.getInitalValue('brand_name'),
                            rules: [{required: true, message: ' '}, {validator: this.judgeInputLenth}]
                        })(
                            <Input 
                                placeholder='请输入20字以内品牌名称' 
                                onFocus={() => {this.handleFocusInput('brand_name')}}
                                onBlur={
                                    ({target: {value}}) => 
                                    {
                                        this.handleVerifyUnique('品牌名称', 'brand_name', value, value.length <= 20)
                                    }
                                } 
                            />
                        )}
                    </FormItem>
                    { modalType === 'add' ? getAddInfoItems() : null }
                    <SelectFormItem
                        getFieldDecorator={getFieldDecorator}
                        label={'所属行业'}
                        keyName={'industry_code'}
                        options={IndustryList}
                        initObj={industryInit}
                        formItemLayout={formItemLayout}
                    />
                    <SelectFormItem
                        getFieldDecorator={getFieldDecorator}
                        label={'标注可用'}
                        keyName={'is_signed_available'}
                        options={this.signOption}
                        initObj={signInit}
                        formItemLayout={formItemLayout}
                    />
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(BrandModal);
