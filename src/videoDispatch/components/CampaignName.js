import React, { Component } from 'react'
import { Form, Input, Radio } from 'antd';
import { countstrlen } from "../../util/verification";
const FormItem = Form.Item;
const RadioGroup = Radio.Group
class CampaignName extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	//活动名称字符串长度验证
	vailEventName = (rule, value, callback) => {
		const length = countstrlen(value)
		if (length > 28) {
			callback("名称长度不符合要求");
		} else {
			callback();
		}
	}
	render() {
		const { formItemLayout, getFieldDecorator, videoCampaignInfo } = this.props
		return (
			<div>
				<FormItem {...formItemLayout} label="投放类型">

					{getFieldDecorator('is_self_created', {
						initialValue: videoCampaignInfo && parseInt(videoCampaignInfo.is_self_created) || 1,
						rules: [{
							required: true,
							message: '请输入',
						}],
					})(
						<RadioGroup disabled>
							<Radio value={1}>客户指定</Radio>
							<Radio value={2}>系统推荐</Radio>
						</RadioGroup>
					)}
					<span className="prompt-content" style={{ color: "red" }}>注：不要通过系统推荐创建任意形式的空活动，如果需要请创建“公司拓展业务”</span>
				</FormItem>

				<FormItem {...formItemLayout} label="活动名称">
					{getFieldDecorator('name', {
						validateFirst: true,
						initialValue: videoCampaignInfo && videoCampaignInfo.name,
						rules: [{
							required: true, message: '名称不能为空',
						}, {
							validator: this.vailEventName
						}],
					})(
						<Input placeholder="请填写名称，方便活动管理，请勿超过14个字" />
					)}
				</FormItem></div>
		);
	}
}

export default CampaignName;
