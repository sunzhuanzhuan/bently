import React, { Component } from 'react'
import { Input, Form, Select, AutoComplete } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
class ContactInfoForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			result: []
		};
	}
	//邮箱支持
	handleSearch = (value) => {
		let result;
		if (!value || value.indexOf('@') >= 0) {
			result = [];
		} else {
			result = ['qq.com', 'gmail.com', 'aliyun.com', '163.com', '126.com', 'tom.com', '139.com'].map(domain => `${value}@${domain}`);
		}
		this.setState({ result: result });
	}
	render() {
		const { formItemLayout, getFieldDecorator, adminUserOne, } = this.props
		const children = this.state.result.map((email) => {
			return <Option key={email}>{email}</Option>;
		});

		return (
			<div>
				<FormItem label="登录用手机号：" {...formItemLayout}>
					{getFieldDecorator('cell_phone', {
						initialValue: adminUserOne && adminUserOne.cell_phone,
						rules: [{
							message: '请输入正确格式的手机号码(如：17000000000)',
							pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
						}],
					})(
						<Input placeholder="请输入登录用手机号：" maxLength="11" />
					)}
				</FormItem>
				<FormItem label="对外展示手机号" {...formItemLayout}>
					{getFieldDecorator('contacts_phone', {
						initialValue: adminUserOne && adminUserOne.contacts_phone,
						rules: [{
							message: '请输入正确格式的手机号码(如：17000000000)',
							pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
						}],
					})(
						<Input placeholder="请输入对外展示手机号" maxLength="11" />
					)}
				</FormItem>
				<FormItem label="电话" {...formItemLayout}>
					{getFieldDecorator('phone', {
						initialValue: adminUserOne && adminUserOne.phone,
						rules: [{
							message: '请输入正确格式的电话(如：010-88888888/01088888888)',
							pattern: /^0\d{2,3}-?\d{7,8}$/
						}],
					})(
						<Input placeholder="请输入电话" />
					)}
				</FormItem>
				<FormItem label="QQ" {...formItemLayout}>
					{getFieldDecorator('qq', {
						initialValue: adminUserOne && adminUserOne.qq && adminUserOne.qq.split(",")[0],
						rules: [{
							message: '请输入正确格式的QQ号(5-12位数字)',
							pattern: /^[1-9]\d{4,12}$/
						}]
					})(
						<Input placeholder="请输入QQ" maxLength={12} />
					)}
				</FormItem>
				<FormItem label="企业QQ端口" {...formItemLayout}>
					{getFieldDecorator('qqPort', {
						initialValue: adminUserOne && adminUserOne.qq && adminUserOne.qq.split(",")[1],
						// rules: [{
						// 	message: '请输入正确格式的端口',
						// 	pattern: /^ ([0 - 9] | [1 - 9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/
						// }],
					}
					)(
						<Input placeholder="请输入企业QQ端口" />
					)}
				</FormItem>
				<FormItem label="Email" {...formItemLayout}>
					{getFieldDecorator('email', {
						initialValue: adminUserOne && adminUserOne.email,
						rules: [{
							message: '请输入正确格式的Email(xxx@xxx.xx)',
							pattern: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
						}],
					})(
						<AutoComplete
							style={{ width: '100%' }}
							onSearch={this.handleSearch}
							placeholder="请输入Email"
						>
							{children}
						</AutoComplete>
					)}
				</FormItem>
				<FormItem label="旺旺" {...formItemLayout}>
					{getFieldDecorator('wangwang', {
						initialValue: adminUserOne && adminUserOne.wangwang,
					})(
						<Input placeholder="请输入旺旺" />
					)}
				</FormItem>
				<FormItem label="微信" {...formItemLayout}>
					{getFieldDecorator('wechat_account', {
						initialValue: adminUserOne && adminUserOne.wechat_account,
					})(
						<Input placeholder="请输入微信" />
					)}
				</FormItem>
			</div>
		);
	}
}


export default ContactInfoForm;
