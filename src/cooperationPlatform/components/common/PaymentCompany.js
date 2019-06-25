import React, { Component } from 'react'
import { Form, Input, Select, Radio } from 'antd';
const RadioGroup = Radio.Group;
class PaymentCompany extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { form, formLayout, dataDefault } = this.props
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
							<Radio value='ZF0002'>微博易</Radio>
							<Radio value='ZF0001'>布谷鸟</Radio>
						</RadioGroup>
					)}
				</Form.Item>
			</div>

		);
	}
}

export default PaymentCompany;
