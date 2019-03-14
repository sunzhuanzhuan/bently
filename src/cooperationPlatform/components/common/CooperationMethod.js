import React, { Component } from 'react'
import { Form, Input, Radio } from 'antd';
const { TextArea } = Input;
const RadioGroup = Radio.Group;
class CooperationMethod extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	vailPrice = (rule, value, callback) => {
		const parent = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d{1,2})$/
		if (!parent.test(value) || value < 0 || value > 100) {
			callback('仅可输入0-100间的正数！')
		} else {
			callback()
		}
	}

	render() {
		const { form, formLayout, dataDefault } = this.props
		const { getFieldDecorator, getFieldValue } = form
		return (
			<div>
				<Form.Item label="合作方式"{...formLayout}>
					{getFieldDecorator('agentVO.cooperationType', {
						initialValue: dataDefault && dataDefault.cooperationType || 1,
						rules: [
							{ required: true, message: '本项为必选项，请选择！' },
						],
					})(
						<RadioGroup >
							<Radio value={1}>周期返款</Radio>
							<Radio value={2}>其他</Radio>
							<Radio value={3} disabled>折扣下单</Radio>
						</RadioGroup>
					)}
				</Form.Item>
				{getFieldValue("agentVO.cooperationType") == 1 ? <Form.Item label="反款比例"  {...formLayout}>
					{getFieldDecorator('agentVO.refundRate', {
						initialValue: dataDefault && dataDefault.refundRate,
						validateFirst: true,
						rules: [
							{ required: true, message: '本项为必选项，请输入！' },
							{ validator: this.vailPrice }
						],
					})(
						<Input placeholder="请输入0-100的正数" />
					)}
				</Form.Item>
					: <Form.Item label="说明"  {...formLayout}>
						{getFieldDecorator('agentVO.cooperationRemark', {
							initialValue: dataDefault && dataDefault.cooperationRemark,
							validateFirst: true,
							rules: [
								{ max: 50, message: "最多可输入50个字！" }
							],
						})(
							<TextArea rows={2} placeholder="请输入说明" />
						)}
					</Form.Item>}
			</div>
		);
	}
}

export default CooperationMethod;
