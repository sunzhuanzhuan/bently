import React, { Component } from 'react'
import { Form, Input, Radio, InputNumber } from 'antd';
const { TextArea } = Input;
const RadioGroup = Radio.Group;
class CooperationMethod extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	vailPrice = (rule, value, callback) => {
		const parent = /^([1-9][0-9]{0,1}(\.[0-9]{1,2})?|100|100.0|100.00|[0]\.[0-9]{1,2}|0)$/
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
		const { form, formLayout, dataDefault = {} } = this.props
		const { getFieldDecorator, getFieldValue } = form
		const { refundRate, cooperationType } = dataDefault
		return (
			<div>
				<Form.Item label="合作方式"{...formLayout}>
					{getFieldDecorator('agentVo.cooperationType', {
						initialValue: cooperationType || 1,
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
						//周期返款类型并且refundRate，refundRate取0否则refundRate=undefined
						initialValue: refundRate || cooperationType == 1 && refundRate === 0 ? refundRate : undefined,
						validateFirst: true,
						rules: [
							{ required: true, message: '本项为必填项，请输入！' },
							{ validator: this.vailPrice }
						],
					})(
						<InputNumber step={0.01} placeholder="请输入100以内的正数，小数点后可保留两位！" style={{ width: 300 }} />
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
