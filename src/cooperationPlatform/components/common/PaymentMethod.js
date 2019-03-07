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
				callback("仅可输入16位--19位")
			} else {
				callback()
			}
		} else {
			callback("仅可输入数字")
		}

	}
	chinaVali = (rule, value, callback) => {
		const reg = /^[\u4e00-\u9fa5]+$/;
		if (reg.test(value)) {
			callback()
		} else {
			callback("仅可输入汉字")
		}

	}
	chinaAndNumberVali = (rule, value, callback) => {
		const reg = /^[0-9\u4e00-\u9fa5]+$/;
		if (reg.test(value)) {
			callback()
		} else {
			callback("仅可输入汉字及数字")
		}

	}
	render() {
		const { form, formLayout } = this.props
		const { getFieldDecorator, getFieldValue } = form
		return (
			<div>
				<Form.Item label="收款方式"{...formLayout}>
					{getFieldDecorator('payment_method', {
						initialValue: 1,
						rules: [
							{ required: true, message: '请选择收款方式' },
						],
					})(
						<RadioGroup>
							<Radio value={1}>银行转账</Radio>
							<Radio value={2}>支付宝</Radio>
						</RadioGroup>
					)}
				</Form.Item>
				{getFieldValue("payment_method") == 1 ? <div>
					<Form.Item label="开户行"{...formLayout}>
						{getFieldDecorator('bank', {
							initialValue: 1,
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
						{getFieldDecorator('bankItem', {
							validateFirst: true,
							validateTrigger: "onBlur",
							initialValue: 1,
							rules: [
								{ required: true, message: '请输入开户支行' },
								{ max: 60, message: "最多可输入60个字符" },
								{ validator: this.chinaAndNumberVali }
							],
						})(
							<Input placeholder="请输入开户支行" />
						)}
					</Form.Item>
					<Form.Item label="开户所在省"  {...formLayout}>
						{getFieldDecorator('province', {
							validateFirst: true,
							validateTrigger: "onBlur",
							initialValue: 1,
							rules: [
								{ required: true, message: '请输入开户所在省' },
								{ max: 30, message: "最多可输入30个字符" },
								{ validator: this.chinaVali }
							],
						})(
							<Input placeholder="请输入开户所在省" />
						)}
					</Form.Item>
					<Form.Item label="开户所在市"  {...formLayout}>
						{getFieldDecorator('city', {
							validateFirst: true,
							validateTrigger: "onBlur",
							initialValue: 1,
							rules: [
								{ required: true, message: '请输入开户所在市' },
								{ max: 50, message: "最多可输入50个字符" },
								{ validator: this.chinaVali }
							],
						})(
							<Input placeholder="请输入开户所在市" />
						)}
					</Form.Item>
					<Form.Item label="账号"  {...formLayout}>
						{getFieldDecorator('account', {
							validateFirst: true,
							validateTrigger: "onBlur",
							initialValue: 1,
							rules: [
								{ required: true, message: '请输入账号' },
								{ validator: this.accountVali },
							],
						})(
							<Input placeholder="请输入账号" />
						)}
					</Form.Item>
					<Form.Item label="户名"  {...formLayout}>
						{getFieldDecorator('name', {
							validateFirst: true,
							validateTrigger: "onBlur",
							initialValue: 1,
							rules: [
								{ required: true, message: '请输入户名' },
								{ max: 50, message: "最多可输入50个字符" },
								{ validator: this.chinaVali }
							],
						})(
							<Input placeholder="请输入户名" />
						)}
					</Form.Item></div> :
					<div>

						<Form.Item label="账号"  {...formLayout}>
							{getFieldDecorator('account', {
								validateFirst: true,
								initialValue: 1,
								rules: [
									{ required: true, message: '请输入账号' },
									{ max: 80, message: "最多可输入80个字符" }
								],
							})(
								<Input placeholder="请输入账号" />
							)}
						</Form.Item>
						<Form.Item label="收款方"  {...formLayout}>
							{getFieldDecorator('Receipt', {
								validateFirst: true,
								initialValue: 1,
								rules: [
									{ required: true, message: '请输入收款方' },
									{ max: 50, message: "最多可输入50个字符" }
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
