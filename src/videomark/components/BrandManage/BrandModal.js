import React, { Component } from 'react'
import { Form, Modal, Input, Select } from 'antd';
import SelectFormItem from '../common/SelectFormItem';
const FormItem = Form.Item;

class BrandModal extends Component {
    constructor(props) {
        super(props);
        this.levelOption = [
            { id: 1, value: '主品牌' },
            { id: 2, value: '子品牌' },
        ];
        this.signOption = [
            { id: 1, value: '可用' },
            { id: 2, value: '不可用' },
        ];
    }

    handleSave = () => {
        const { form, handleAddItem } = this.props;
        form.validateFields((err, values) => {
            if(err) return;

            handleAddItem(values);
        })
    }

    handleSearchParent = value => {
        console.log('sldkfjlskdjflsjdf', value)
    }

    render() {
        const { modalType, itemInfo, form, isShowModal } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 19},
        };
        const levelInit = {
            initialValue: undefined,
            rules: [{
                required: true,
                message: '请选择品牌类型'
            }]
        };
        const signInit = {
            initialValue: undefined,
            rules: [{
                required: true,
                message: '请选择是否标注可用'
            }]
        };
        const brandLevel = form.getFieldValue('level');

        return (
            <Modal
                visible
                destroyOnClose
                width={600}
                title={ modalType === 'add' ? '添加' : '编辑' }
                onOk={ this.handleSave }
                onCancel={ () => { isShowModal() } }
            >
                <Form>
                    <FormItem label="品牌名称" {...formItemLayout}>
                        {getFieldDecorator('brand_name', {
                            initialValue: undefined,
                            rules: [{
                                required: true,
                                message: '请输入品牌名称'
                            }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <SelectFormItem
                        getFieldDecorator={getFieldDecorator}
                        label={'品牌类型'}
                        keyName={'level'}
                        options={this.levelOption}
                        initObj={levelInit}
                        formItemLayout={formItemLayout}
                    />
                    {
                        brandLevel === 1 ? 
                            <FormItem label="主品牌code" {...formItemLayout}>
                                {getFieldDecorator('brand_parent_code', {
                                    initialValue: undefined,
                                    rules: [{
                                        required: true,
                                        message: '请选择内容形式'
                                    }]
                                })(
                                    <Input />
                                )}
                            </FormItem> : 
                            <FormItem label="选择主品牌" {...formItemLayout}>
                                {getFieldDecorator('industry_code', {
                                    initialValue: undefined,
                                    rules: [{
                                        required: true,
                                        message: '请选择主品牌'
                                    }]
                                })(
                                    <Select
                                        showSearch
                                        placeholder='请选择'
                                        defaultActiveFirstOption={false}
                                        filterOption={false}
                                        onSearch={this.handleSearchParent}
                                        notFoundContent={null}
                                    >
                                        {/* {options} */}
                                    </Select>
                                )}
                            </FormItem>
                    }
                    
                    <FormItem label="品牌序列号" {...formItemLayout}>
                        {getFieldDecorator('brand_child_code', {
                            initialValue: undefined,
                            rules: [{
                                required: true,
                                message: '请选择内容形式'
                            }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <SelectFormItem
                        getFieldDecorator={getFieldDecorator}
                        label={'所属行业'}
                        keyName={'industry_code'}
                        options={this.signOption}
                        initObj={signInit}
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
