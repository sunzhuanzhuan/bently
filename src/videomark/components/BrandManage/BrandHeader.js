import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd';
import SelectFormItem from '../common/SelectFormItem'
const FormItem = Form.Item;

class BrandHeader extends Component {
    constructor(props) {
        super(props);

        this.levelOption = [
            { id: 'ALL_OPTION', value: '请选择' },
            { id: 1, value: '主品牌' },
            { id: 2, value: '子品牌' },
        ];
        this.signOption = [
            { id: 'ALL_OPTION', value: '请选择' },
            { id: 1, value: '是' },
            { id: 2, value: '否' },
        ];
    }

    getSearchQuery = (data = {}) => {
        return Object.keys(data).filter(key => data[key] && data[key] !== 'ALL_OPTION')
            .map(key => { 
                return `${key}=${encodeURIComponent(data[key])}`
            }).join('&');
    }

    handleSearch = () => {
        const { form, getSearchQuery } = this.props;

        form.validateFields((_, values) => {
            const query = this.getSearchQuery(values);

            getSearchQuery(query ? `&${query}` : '')
        })
    }

    getErrorTips = msg => {
        try {
            if (typeof message.destroy === 'function') {
                message.destroy();
            }
            message.error(msg);
        } catch (error) {
            console.log(error);
        }
    };

    handleResetSearch = () => {
        const { form, getSearchQuery } = this.props;
        
        getSearchQuery();
        form.resetFields();
    }

    render() {
        const { form, isShowModal } = this.props;
        const { getFieldDecorator } = form;

        return (
            <div className='formHeaderWrapper'>
                <Form layout='inline' key='formHeader' className='brand_header_form'>
                    <SelectFormItem
                        getFieldDecorator={getFieldDecorator}
                        label={'品牌类型'}
                        keyName={'level'}
                        options={this.levelOption}
                    />
                    <SelectFormItem
                        getFieldDecorator={getFieldDecorator}
                        label={'标注可用'}
                        keyName={'is_signed_available'}
                        options={this.signOption}
                    />
                    <FormItem label="品牌名称">
                        {getFieldDecorator('brand_name')(
                            <Input placeholder='请输入品牌名称' />
                        )}
                    </FormItem>
                </Form>
                <Button type='primary' onClick={this.handleSearch}>搜索</Button>
                <Button type='primary' onClick={this.handleResetSearch}>重置</Button>
                <Button type='primary' onClick={() => {isShowModal('add')}}>添加品牌</Button>
            </div>
        )
    }
}

export default Form.create()(BrandHeader);
