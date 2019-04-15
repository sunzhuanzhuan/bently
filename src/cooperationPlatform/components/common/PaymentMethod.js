import React, { Component } from 'react'
import { Form, Input, Select, Radio } from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;

class PaymentMethod extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount = () => {
		this.props.actions.getPaymentTypeList()
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
		if (reg.test(value) && value.length < (number + 1)) {
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
	changePaymentType = () => {
		this.props.form.resetFields([
			'agentVo.bank',
			'agentVo.bankAgency',
			'agentVo.bankAgencyProvince',
			'agentVo.bankAgencyCity',
			'agentVo.cardNumber',
			'agentVo.realName',
		])
	}
	render() {
		const { form, formLayout, dataDefault, cooperationPlatformReducer: { paymentTypeList } } = this.props
		const { getFieldDecorator, getFieldValue } = form
		return (
			<div>
				<Form.Item label="发票开具方"  {...formLayout}>
					{getFieldDecorator('agentVo.beneficiaryCompany', {
						initialValue: dataDefault && dataDefault.beneficiaryCompany,
						validateFirst: true,
						rules: [
							{ required: true, message: '此项为必填项，请输入！' },
							{ max: 50, message: "最多可输入50个字！" }
						],
					})(
						<Input placeholder="请输入发票开具方" />
					)}
				</Form.Item>
				<Form.Item label="收款方式"{...formLayout}>
					{getFieldDecorator('agentVo.paymentType', {
						initialValue: dataDefault && dataDefault.paymentType || 1,
						rules: [
							{ required: true, message: '本项是必选项，请选择！' },
						],
					})(
						<RadioGroup onChange={this.changePaymentType}>
							<Radio value={1}>银行转账</Radio>
							<Radio value={2}>支付宝</Radio>
						</RadioGroup>
					)}
				</Form.Item>
				{getFieldValue("agentVo.paymentType") == 1 ? <div>
					<Form.Item label="开户行"{...formLayout}>
						{getFieldDecorator('agentVo.bank', {
							initialValue: dataDefault && dataDefault.bank,
							rules: [
								{ required: true, message: '此项为必选项，请选择！' },
							],
						})(
							<Select placeholder="请选择" style={{ width: 200 }}>
								{paymentTypeList && paymentTypeList.map(one => <Option key={one.payment_type_id} value={one.name}>{one.name}</Option>)}
							</Select>
						)}
					</Form.Item>
					<Form.Item label="开户支行"  {...formLayout}>
						{getFieldDecorator('agentVo.bankAgency', {
							initialValue: dataDefault && dataDefault.bankAgency,
							validateFirst: true,
							rules: [
								{ required: true, message: '此项为必填项，请输入！' },
								{ validator: this.chinaAndNumberVali },
								{ max: 60, message: "最多可输入60个字以内的中英文及数字！" },

							],
						})(
							<Input placeholder="请输入开户支行" />
						)}
					</Form.Item>

					<Form.Item label="开户行所在省"  {...formLayout}>
						{getFieldDecorator('agentVo.bankAgencyProvince', {
							initialValue: dataDefault && dataDefault.bankAgencyProvince,
							validateFirst: true,
							rules: [
								{ required: true, message: '此项为必填项，请输入！' },
								{ validator: this.chinaVali.bind(null, 30) },
							],
						})(
							<Input placeholder="请输入省份" />
						)}
					</Form.Item>
					<Form.Item label="开户行所在市"  {...formLayout}>
						{getFieldDecorator('agentVo.bankAgencyCity', {
							initialValue: dataDefault && dataDefault.bankAgencyCity,
							validateFirst: true,
							rules: [
								{ required: true, message: '此项为必填项，请输入！' },
								{ validator: this.chinaVali.bind(null, 50) },
							],
						})(
							<Input placeholder="请输入城市" />
						)}
					</Form.Item>
					<Form.Item label="账号"  {...formLayout}>
						{getFieldDecorator('agentVo.cardNumber', {
							initialValue: dataDefault && dataDefault.cardNumber,
							validateFirst: true,
							rules: [
								{ required: true, message: '此项为必填项，请输入！' },
								{ validator: this.accountVali },
							],
						})(
							<Input placeholder="请输入16-19位卡号" />

						)}
					</Form.Item>
					<Form.Item label="户名"  {...formLayout}>
						{getFieldDecorator('agentVo.realName', {
							initialValue: dataDefault && dataDefault.realName,
							validateFirst: true,
							rules: [
								{ required: true, message: '此项为必填项，请输入！' },
								{ validator: this.chinaVali.bind(null, 50) },
							],
						})(
							<Input placeholder="请输入户名" />
						)}
					</Form.Item></div> :
					<div>

						<Form.Item label="账号"  {...formLayout}>
							{getFieldDecorator('agentVo.alipayAccount', {
								initialValue: dataDefault && dataDefault.alipayAccount,
								validateFirst: true,
								rules: [
									{ required: true, message: '此项为必填项，请输入！' },
									{ max: 80, message: "最多可输入80个字！" }
								],
							})(
								<Input placeholder="请输入账号" />
							)}
						</Form.Item>
						<Form.Item label="收款方"  {...formLayout}>
							{getFieldDecorator('agentVo.alipayAccountName', {
								initialValue: dataDefault && dataDefault.alipayAccountName,
								validateFirst: true,
								rules: [
									{ required: true, message: '此项为必填项，请输入！' },
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
