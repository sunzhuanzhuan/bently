import React, { Component } from 'react'
import { Form, Input, Select, Radio } from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;

class PaymentMethod extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	accountVali = (rule, value, callback) => {
		const reg = /^[0-9]+$/;
		if (reg.test(value)) {
			if (16 > value.length || value.length > 19) {
				callback("仅可输入16-19位数字")
			} else {
				callback()
			}
		} else {
			callback("仅可输入16-19位数字")
		}

	}
	chinaVali = (number, rule, value, callback) => {
		const reg = /^[\u4e00-\u9fa5]+$/;
		if (reg.test(value) && value.length < number) {
			callback()
		} else {
			callback(`仅可输入${number}字以内的汉字！`)
		}

	}
	chinaAndNumberVali = (rule, value, callback) => {
		const reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
		if (reg.test(value)) {
			callback()
		} else {
			callback("最多可输入60个字以内的中英文及数字！")
		}
	}
	render() {
		const { form, formLayout, dataDefault } = this.props
		const { getFieldDecorator, getFieldValue } = form
		return (
			<div>
				<Form.Item label="发票开具方"  {...formLayout}>
					{getFieldDecorator('agentVO.alipayAccountName', {
						initialValue: dataDefault && dataDefault.alipayAccountName,
						validateFirst: true,
						rules: [
							{ required: true, message: '本项为必选项，请输入！' },
							{ max: 50, message: "最多可输入50个字！" }
						],
					})(
						<Input placeholder="请输入发票开具方" />
					)}
				</Form.Item>
				<Form.Item label="收款方式"{...formLayout}>
					{getFieldDecorator('agentVO.paymentType', {
						initialValue: dataDefault && dataDefault.paymentType || 1,
						rules: [
							{ required: true, message: '本项是必选项，请选择！' },
						],
					})(
						<RadioGroup>
							<Radio value={1}>银行转账</Radio>
							<Radio value={2}>支付宝</Radio>
						</RadioGroup>
					)}
				</Form.Item>
				{getFieldValue("agentVO.paymentType") == 1 ? <div>
					<Form.Item label="开户行"{...formLayout}>
						{getFieldDecorator('agentVO.bank', {
							initialValue: dataDefault && dataDefault.bank,
							rules: [
								{ required: true, message: '请选择开户行' },
							],
						})(
							<Select placeholder="请选择" style={{ width: 200 }}>
								<Option value="china">China</Option>
								<Option value="usa">U.S.A</Option>
							</Select>
						)}
					</Form.Item>
					<Form.Item label="开户支行"  {...formLayout}>
						{getFieldDecorator('agentVO.subbranchBank', {
							initialValue: dataDefault && dataDefault.subbranchBank,
							validateFirst: true,
							validateTrigger: "onBlur",
							rules: [
								{ required: true, message: '请输入开户支行' },
								{ validator: this.chinaAndNumberVali },
								{ max: 60, message: "最多可输入60个字以内的中英文及数字！" },

							],
						})(
							<Input placeholder="请输入开户支行" />
						)}
					</Form.Item>
					<Form.Item label="开户所在省"  {...formLayout}>
						{getFieldDecorator('agentVO.bankProvince', {
							initialValue: dataDefault && dataDefault.bankProvince,
							validateFirst: true,
							rules: [
								{ required: true, message: '请输入开户所在省' },
								{ validator: this.chinaVali.bind(null, 30) },
							],
						})(
							<Input placeholder="请输入省份" />
						)}
					</Form.Item>
					<Form.Item label="开户所在市"  {...formLayout}>
						{getFieldDecorator('agentVO.bankCity', {
							initialValue: dataDefault && dataDefault.bankCity,
							validateFirst: true,
							validateTrigger: "onBlur",
							rules: [
								{ required: true, message: '请输入开户所在市' },
								{ validator: this.chinaVali.bind(null, 50) },
							],
						})(
							<Input placeholder="请输入城市" />
						)}
					</Form.Item>
					<Form.Item label="账号"  {...formLayout}>
						{getFieldDecorator('agentVO.bankAccount', {
							initialValue: dataDefault && dataDefault.bankAccount,
							validateFirst: true,
							validateTrigger: "onBlur",
							rules: [
								{ required: true, message: '请输入账号' },
								{ validator: this.accountVali },
							],
						})(
							<Input placeholder="请输入16-19位卡号" />
						)}
					</Form.Item>
					<Form.Item label="户名"  {...formLayout}>
						{getFieldDecorator('agentVO.bankAccountName', {
							initialValue: dataDefault && dataDefault.bankAccountName,
							validateFirst: true,
							validateTrigger: "onBlur",
							rules: [
								{ required: true, message: '请输入户名' },
								{ validator: this.chinaVali.bind(null, 50) },
							],
						})(
							<Input placeholder="请输入户名" />
						)}
					</Form.Item></div> :
					<div>

						<Form.Item label="账号"  {...formLayout}>
							{getFieldDecorator('agentVO.alipayAccount', {
								initialValue: dataDefault && dataDefault.alipayAccount,
								validateFirst: true,
								rules: [
									{ required: true, message: '请输入账号' },
									{ max: 80, message: "最多可输入80个字！" }
								],
							})(
								<Input placeholder="请输入账号" />
							)}
						</Form.Item>
						<Form.Item label="收款方"  {...formLayout}>
							{getFieldDecorator('agentVO.alipayAccountName', {
								initialValue: dataDefault && dataDefault.alipayAccountName,
								validateFirst: true,
								rules: [
									{ required: true, message: '请输入收款方' },
									{ max: 50, message: "最多可输入50个字！" }
								],
							})(
								<Input placeholder="请输入收款方" />
							)}
						</Form.Item>
					</div>}

			</div>
		);
	}
}

export default PaymentMethod;
