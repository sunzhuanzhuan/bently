
import React, { Component } from 'react'
import { Form, Radio } from 'antd';
const RadioGroup = Radio.Group;
class SettlementMethod extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { form, formLayout, isAgent, dataDefault } = this.props
		const { getFieldDecorator, getFieldValue } = form
		return (
			<div>
				<Form.Item label="结算方式"{...formLayout}>
					{getFieldDecorator('agentVo.settleType', {
						initialValue: dataDefault && dataDefault.settleType,
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
					{getFieldDecorator('agentVo.returnInvoiceType', {
						initialValue: dataDefault && dataDefault.returnInvoiceType || 1,
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
				<Form.Item label="回票类型"{...formLayout}>
					{getFieldDecorator('agentVo.invoiceType', {
						initialValue: dataDefault && dataDefault.invoiceType || undefined,
						rules: [
							{ required: true, message: '请选择回票类型' },
						],
					})(
						<RadioGroup>
							<Radio value={1}>增值税普通发票</Radio>
							<Radio value={2}>增值税专用发票</Radio>
						</RadioGroup>
					)}
				</Form.Item>
				{
					getFieldValue('agentVo.invoiceType') == 2 ? 
					<Form.Item label="发票税率"{...formLayout}>
						{getFieldDecorator('agentVo.agentTaxRate', {
							initialValue: dataDefault && dataDefault.agentTaxRate || undefined,
							rules: [
								{ required: true, message: '请选择发票税率' },
							],
						})(
							<RadioGroup>
								<Radio value={0.03}>3%</Radio>
								<Radio value={0.06}>6%</Radio>
							</RadioGroup>
						)}
					</Form.Item> : null
				}
				
			</div>
		);
	}
}

export default SettlementMethod;
