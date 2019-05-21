import React, { Component } from 'react'
import { Form, Select } from 'antd';
import SelectFormItem from '../common/SelectFormItem'
const FormItem = Form.Item;
const Option = Select.Option;

//内容形式
const contentType = [
    {
        id: 1,
        value: '图文'
    }, {
        id: 2,
        value: '视频'
    }, {
        id: 3,
        value: '直播'
    }
]

//需求类型
const originalPostType = [
    {
        id: 1,
        value: '创发'
    }, {
        id: 2,
        value: '分发'
    }
]

class TaskForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postTypeVisible: (!props.data.content_type_id || props.data.content_type_id == 1) ? false : true,
        }
    }
    handleContentTypeChange = (value) => {
        if (value == 1) {
            this.setState({
                postTypeVisible: false
            });
        } else {
            this.setState({
                postTypeVisible: true
            });
        }
    }

    render() {
        const { form, data, industryList, brandList, handleIndustryChange } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 10 },
            wrapperCol: { span: 6 },
        };

        let industryObj = {
            rules: [{
                required: true,
                message: '请选择推广产品所属的行业'
            }]
        }
        if (data.industry_category_code) {
            industryObj.initialValue = data.industry_category_code
        }

        let brandObj = {
            rules: [{
                required: true,
                message: '请选择推广产品所属的品牌'
            }]
        }
        
        const list = brandList.filter((v) => v.id == data.signed_brand_id);

        if (data.signed_brand_id) {
            if (list.length == 0) {
                data.signed_brand_id = ''
            }
        }
        if (data.signed_brand_id) {
            brandObj.initialValue = parseInt(data.signed_brand_id)
        }
        return (
            <div >
                <Form layout='horizontal'>
                    <FormItem {...formItemLayout} label="内容形式">
                        {getFieldDecorator('content_type_id', {
                            initialValue: data.content_type_id,
                            rules: [{
                                required: true,
                                message: '请选择内容形式'
                            }]
                        })(
                            <Select
                                placeholder="请选择"
                                onChange={this.handleContentTypeChange}
                            >
                                {
                                    contentType.map(item => {
                                        return <Option key={item.id}
                                            value={item.id}
                                        >
                                            {item.value}
                                        </Option>
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    {
                        this.state.postTypeVisible ?
                            <FormItem  {...formItemLayout} label="需求类型">
                                {getFieldDecorator('original_post_type_id', {
                                    initialValue: data.original_post_type_id,
                                    rules: [{
                                        required: true,
                                        message: '请选择内容形式'
                                    }]
                                })(
                                    <Select
                                        placeholder="请选择"
                                    >
                                        {
                                            originalPostType.map(item => {
                                                return <Option key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.value}
                                                </Option>
                                            })
                                        }
                                    </Select>
                                )}
                            </FormItem>
                            : ''
                    }
                    <SelectFormItem
                        getFieldDecorator={getFieldDecorator}
                        label={'所属行业'}
                        keyName={'industry_category_code'}
                        options={industryList}
                        onChange={handleIndustryChange}
                        initObj={industryObj}
                        formItemLayout={formItemLayout}
                    ></SelectFormItem>
                    <SelectFormItem
                        getFieldDecorator={getFieldDecorator}
                        label={'所属品牌'}
                        keyName={'signed_brand_id'}
                        options={brandList}
                        initObj={brandObj}
                        formItemLayout={formItemLayout}
                    ></SelectFormItem>
                </Form>
            </div>
        )
    }
}

export default Form.create()(TaskForm);
