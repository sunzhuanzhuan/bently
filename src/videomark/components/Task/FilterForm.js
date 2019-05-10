import React, { Component } from 'react'
import { Form, Input, Button, DatePicker, Select, Icon } from 'antd';
import SelectFormItem from '../common/SelectFormItem'
const Option = Select.Option;
const FormItem = Form.Item;
import './FilterForm.less'
const dateFormat = 'YYYY-MM-DD';
const SIGNED_STATUS_NO = 2
//标注状态
const signedList = [
    {
        id: 0,
        value: '全部订单'
    }, {
        id: 1,
        value: '已标注'
    }, {
        id: 2,
        value: '未标注'
    }
]

//内容形式
const contentType = [
    {
        id: 0,
        value: '请选择'
    }, {
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
        id: 0,
        value: '请选择'
    }, {
        id: 1,
        value: '创发'
    }, {
        id: 2,
        value: '分发'
    }
]
class FilterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    handleSubmit = () => {
        const setStateData = this.props.setStateData
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            setStateData({ loadingVisible: true })
            setStateData({ filterParams: values })

            const params = this.formatData(values)
            this.props.getOrderList(params).then(() => {
                setStateData({ loadingVisible: false });
            })
        });
    }

    formatData = (data) => {

        const timeMap = [
            'signed_start_time',
            'signed_end_time',
            'execution_completed_start_time',
            'execution_completed_end_time'
        ];
        timeMap.forEach((v) => {
            if (data[v]) {
                data[v] = data[v].format("YYYY-MM-DD")
            }
        });
        return data
    }
    handleSignedChange = (value) => {
        if (value == SIGNED_STATUS_NO) {
            this.props.setStateData({
                signedStatus: false
            });
        } else {
            this.props.setStateData({
                signedStatus: true
            });
        }
    }

    render() {
        const {
            type,
            platformList,
            saleList,
            resetForm,
            signedStatus,
            form
        } = this.props;

        const { getFieldDecorator } = form;
        return (
            <Form layout="inline">
                <fieldset className="margin-top-md form-container filter-form-box">
                    <legend className="searchTitle">搜索</legend>
                    <FormItem label="订单ID">
                        {getFieldDecorator('order_id', {
                            rules: [{
                                pattern: /^[1-9]\d*$/,
                                message: '订单ID必须为正整数'
                            }]
                        })(
                            <Input className="input-width" />
                        )}
                    </FormItem>
                    {
                        type === 'reservation' ?
                            <FormItem label="预约需求名称">
                                {getFieldDecorator('requirement_name')(
                                    <Input className="input-width" />
                                )}
                            </FormItem>
                            :
                            <FormItem label="活动名称">
                                {getFieldDecorator('campaign_name')(
                                    <Input className="input-width" />
                                )}
                            </FormItem>
                    }
                    <FormItem label="账号名称">
                        {getFieldDecorator('weibo_name')(
                            <Input className="input-width" />
                        )}
                    </FormItem>
                    <FormItem label="平台">
                        {getFieldDecorator('weibo_type_filter')(
                            <Select
                                placeholder="请选择"
                                className="select-width"
                            >
                                <Option key='0'>请选择</Option>
                                {
                                    platformList.length > 0 ?
                                        platformList.map(item => {
                                            return <Option key={item.platform_id}
                                                value={item.platform_id}
                                            >
                                                {item.platform_name}
                                            </Option>
                                        }) : ""
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="厂商简称">
                        {getFieldDecorator('company_name')(
                            <Input className="input-width" />
                        )}
                    </FormItem>
                    <FormItem label="销售经理">
                        {getFieldDecorator('sale_manager_id')(
                            <Select
                                placeholder="请选择"
                                className="select-width"
                            >
                                <Option key='0'>请选择</Option>
                                {
                                    saleList.length > 0 ?
                                        saleList.map(item => {
                                            return <Option key={item.owner_admin_id}
                                                value={item.owner_admin_id}
                                            >
                                                {item.real_name}
                                            </Option>
                                        }) : ""
                                }
                            </Select>
                        )}
                    </FormItem>
                    {
                        type === 'reservation' && <FormItem label="回传链接时间">
                            {getFieldDecorator('execution_completed_start_time', {

                            })(
                                <DatePicker format={dateFormat} placeholder="请选择开始时间" />
                            )}
                        </FormItem>
                    }
                    {
                        type === 'reservation' && <FormItem label="">
                            <span className="time-section-line">-</span>
                            {getFieldDecorator('execution_completed_end_time', {

                            })(
                                <DatePicker format={dateFormat} placeholder="请选择结束时间" />
                            )}
                        </FormItem>
                    }
                    <FormItem label="标注时间">
                        {getFieldDecorator('signed_start_time', {

                        })(
                            <DatePicker format={dateFormat} placeholder="请选择开始时间" />

                        )}
                    </FormItem>
                    <FormItem label="">
                        <span className="time-section-line">-</span>
                        {getFieldDecorator('signed_end_time', {

                        })(
                            <DatePicker format={dateFormat} placeholder="请选择结束时间" />
                        )}
                    </FormItem>
                    <FormItem label="状态">
                        {getFieldDecorator('is_signed', {
                            initialValue: 2
                        })(
                            <Select
                                placeholder="请选择"
                                className="select-width"
                                onChange={this.handleSignedChange}
                            >
                                {
                                    signedList.map(item => {
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
                        signedStatus ?
                            <SelectFormItem
                                getFieldDecorator={getFieldDecorator}
                                label={'内容形式'}
                                keyName={'content_type'}
                                options={contentType}
                            ></SelectFormItem>
                            : ''
                    }
                    {
                        signedStatus ?
                            <SelectFormItem
                                getFieldDecorator={getFieldDecorator}
                                label={'需求类型'}
                                keyName={'original_post_type'}
                                options={originalPostType}
                            ></SelectFormItem>
                            : ''
                    }
                    {
                        signedStatus ?
                            <SelectFormItem
                                getFieldDecorator={getFieldDecorator}
                                label={'推广产品所属行业'}
                                keyName={'industry'}
                                options={originalPostType}
                            ></SelectFormItem>
                            : ''
                    }
                    <div className="filter_tool">
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>搜索</Button>
                        </FormItem>
                        <FormItem>
                            <a onClick={() => resetForm(type)} className="resetFilter"><Icon type="retweet" /> 重置搜索框</a>
                        </FormItem>
                    </div>
                </fieldset>
            </Form>
        );
    }
}

export default Form.create()(FilterForm)


