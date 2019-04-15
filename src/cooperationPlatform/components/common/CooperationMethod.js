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
			callback('请输入100以内的正数，小数点后可保留两位！')
		} else {
			callback()
		}
	}
	changeType = () => {
		this.props.form.resetFields(['agentVo.refundRate', 'agentVo.cooperationRemark'])
	}
	render() {
		const { form, formLayout, dataDefault } = this.props
		const { getFieldDecorator, getFieldValue } = form
		return (
			<div>
				<Form.Item label="合作方式"{...formLayout}>
					{getFieldDecorator('agentVo.cooperationType', {
						initialValue: dataDefault && dataDefault.cooperationType || 1,
						rules: [
							{ required: true, message: '本项为必选项，请选择！' },
						],
					})(
						<RadioGroup onChange={this.changeType}>
							<Radio value={1}>周期返款</Radio>
							<Radio value={2}>其他</Radio>
							<Radio value={3} disabled>折扣下单</Radio>
						</RadioGroup>
					)}
				</Form.Item>
				{getFieldValue("agentVo.cooperationType") == 1 ? <Form.Item label="返款比例"  {...formLayout}>
					{getFieldDecorator('agentVo.refundRate', {
						initialValue: dataDefault && dataDefault.refundRate,
						validateFirst: true,
						rules: [
							{ required: true, message: '本项为必填项，请输入！' },
							{ validator: this.vailPrice }
						],
					})(
						<Input placeholder="请输入100以内的正数，小数点后可保留两位！" style={{ width: 250 }} />
					)}<span style={{ paddingLeft: 8 }}>%</span>
				</Form.Item>
					: <Form.Item label="说明"  {...formLayout}>
						{getFieldDecorator('agentVo.cooperationRemark', {
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
