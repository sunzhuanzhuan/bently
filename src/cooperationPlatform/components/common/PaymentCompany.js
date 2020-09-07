import React, { Component } from 'react'
import { Form, Input, Select, Radio } from 'antd';
const RadioGroup = Radio.Group;
const InputTextArea = Input.TextArea
class PaymentCompany extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	validatorMsg = (len) => (rules, value, callback) => {
		const tmp = value.replace(/\n/g, '')
		if (tmp.length > len) {
			callback('最多输入' + len + '个字')
		}
		callback()
	}
	render () {
		const { form, formLayout, dataDefault,
			orderPriceTipsTitle, formulaDesc
		} = this.props
		const { getFieldDecorator } = form
		return (
			<div>
				<Form.Item label="付款公司"{...formLayout}>
					{getFieldDecorator('agentVo.paymentCompanyCode', {
						initialValue: dataDefault && dataDefault.paymentCompanyCode,
						rules: [
							{ required: true, message: '此项为必选项，请选择' },
						],
					})(
						<RadioGroup>
							<Radio value='ZF0002'>微播易</Radio>
							<Radio value='ZF0001'>布谷鸟</Radio>
						</RadioGroup>
					)}
				</Form.Item>
				<Form.Item label="下单价提示标题"{...formLayout}>
					{getFieldDecorator('orderPriceTipsTitle', {
						initialValue: orderPriceTipsTitle,
						rules: [
							{
								validator: this.validatorMsg(30)
							},
							{ required: true, message: '此项为必选项，请输入！' },
						],
					})(
						<InputTextArea style={{ width: '400px', margin: '8px 0' }}></InputTextArea>
					)}
				</Form.Item>
				<Form.Item label="公式说明"{...formLayout}>
					{getFieldDecorator('formulaDesc', {
						initialValue: formulaDesc,
						rules: [
							{
								validator: this.validatorMsg(100)
							},
							{ required: true, message: '此项为必选项，请输入！' },
						],
					})(
						<InputTextArea
							style={{ width: '400px', margin: '8px 0' }}
							rows={4}
						></InputTextArea>
					)}
				</Form.Item>
			</div >

		);
	}
}

export default PaymentCompany;
