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
			callback('请确认填写的是0-100，最多可以输入两位小数')
		} else {
			callback()
		}
	}

	render() {
		const { form, formLayout } = this.props
		const { getFieldDecorator, getFieldValue } = form
		return (
			<div>
				<Form.Item label="合作方式"{...formLayout}>
					{getFieldDecorator('method', {
						initialValue: 1,
						rules: [
							{ required: true, message: '请选择合作方式' },
						],
					})(
						<RadioGroup >
							<Radio value={1}>周期返款</Radio>
							<Radio value={2}>其他</Radio>
						</RadioGroup>
					)}
				</Form.Item>
				{getFieldValue("method") == 1 ? <Form.Item label="反款比例"  {...formLayout}>
					{getFieldDecorator('proportion', {
						initialValue: 1,
						validateFirst: true,
						rules: [
							{ required: true, message: '请输入反款比例' },
							{ validator: this.vailPrice }
						],
					})(
						<Input placeholder="请输入反款比例" />
					)}
				</Form.Item>
					: <Form.Item label="说明"  {...formLayout}>
						{getFieldDecorator('remark', {
							initialValue: 1,
							validateFirst: true,
							rules: [
								{ max: 50, message: "最多可输入50个字符" }
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
