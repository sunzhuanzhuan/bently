import React, { Component } from 'react'
import { Form, Input, Select, Radio } from 'antd';
const RadioGroup = Radio.Group;
class PaymentCompany extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { form, formLayout } = this.props
		const { getFieldDecorator } = form
		return (
			<Form.Item label="付款公司"{...formLayout}>
				{getFieldDecorator('company', {
					rules: [
						{ required: true, message: '请选择付款公司' },
					],
				})(
					<RadioGroup>
						<Radio value={1}>微博易</Radio>
						<Radio value={2}>布谷鸟</Radio>
					</RadioGroup>
				)}
			</Form.Item>
		);
	}
}

export default PaymentCompany;
