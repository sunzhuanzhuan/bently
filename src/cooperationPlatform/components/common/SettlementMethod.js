
import React, { Component } from 'react'
import { Form, Radio } from 'antd';
const RadioGroup = Radio.Group;
class SettlementMethod extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { form, formLayout, isAgent } = this.props
		const { getFieldDecorator } = form
		return (
			<div>
				<Form.Item label="结算方式"{...formLayout}>
					{getFieldDecorator('settlementMethod', {
						initialValue: 1,
						rules: [
							{ required: true, message: '请选择结算方式' },
						],
					})(
						<RadioGroup>
							<Radio value={1}>预付</Radio>
							<Radio value={2}>周期付款</Radio>
						</RadioGroup>
					)}
				</Form.Item>
				<Form.Item label="回票方式"{...formLayout}>
					{getFieldDecorator('returnTicket', {
						initialValue: 1,
						rules: [
							{ required: true, message: '请选择回票方式' },
						],
					})(
						<RadioGroup>
							<Radio value={1}>全部回票</Radio>
							{isAgent ? <Radio value={2}>部分回票</Radio> : null}
							{isAgent ? <Radio value={3}>不回票</Radio> : null}
						</RadioGroup>
					)}
				</Form.Item>
			</div>
		);
	}
}

export default SettlementMethod;
