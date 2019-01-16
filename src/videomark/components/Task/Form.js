import React, { Component } from 'react'
import { Form, Select } from 'antd';
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
    constructor (props) {
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
        const { form, data } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 10 },
            wrapperCol: { span: 6 },
        };
        return (
            <div >
                <Form layout='horizontal'>
                    <FormItem { ...formItemLayout } label="内容形式">
                        { getFieldDecorator('content_type_id', {
                            initialValue: data.content_type_id,
                            rules: [ {
                                required: true,
                                message: '请选择内容形式'
                            } ]
                        })(
                            <Select
                                placeholder="请选择"
                                onChange={ this.handleContentTypeChange }
                            >
                                {
                                    contentType.map(item => {
                                        return <Option key={ item.id }
                                            value={ item.id }
                                        >
                                            { item.value }
                                        </Option>
                                    })
                                }
                            </Select>
                        ) }
                    </FormItem>
                    {
                        this.state.postTypeVisible ?
                            <FormItem  { ...formItemLayout } label="需求类型">
                                { getFieldDecorator('original_post_type_id', {
                                    initialValue: data.original_post_type_id,
                                    rules: [ {
                                        required: true,
                                        message: '请选择内容形式'
                                    } ]
                                })(
                                    <Select
                                        placeholder="请选择"
                                    >
                                        {
                                            originalPostType.map(item => {
                                                return <Option key={ item.id }
                                                    value={ item.id }
                                                >
                                                    { item.value }
                                                </Option>
                                            })
                                        }
                                    </Select>
                                ) }
                            </FormItem>
                            : ''
                    }
                </Form>
            </div>
        )
    }
}

export default Form.create()(TaskForm);
