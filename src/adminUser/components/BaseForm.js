import React from 'react'
import { Input, Form } from 'antd';
const FormItem = Form.Item;
const BaseForm = props => {
	const { formItemLayout, getFieldDecorator, adminUserOne, isEditAciton, form } = props
	//确认密码判断
	const REPassword = (rule, value, callback) => {
		var re = form.getFieldValue('pwd');
		var relpassword = form.getFieldValue('relpassword');
		if (re === relpassword) {
			callback();
		} else {
			callback("两次密码输入不符请重新输入");
		}
	}
	//密码验证长度
	const passwordVali = (rule, value, callback) => {
		if (value) {
			if (value.length < 6 || value.length > 32) {
				callback('字符长度6~32');
			} else {
				callback();
			}
		} else {
			callback();
		}
	}
	//汉字验证长度
	const validatorLength = (rule, value, callback) => {
		if (value) {
			if (countstrlen(value) < 4 || countstrlen(value) > 20) {
				callback('字符长度4~20');
			} else {
				callback();
			}
		} else {
			callback();
		}
	}

	return <div>
		{isEditAciton ? <FormItem label="用户ID" style={{ display: 'none' }}>
			{getFieldDecorator('user_id', {
				initialValue: adminUserOne && adminUserOne.user_id,
			})(
				<Input />
			)}
		</FormItem> : ''}
		<FormItem label="用户名" {...formItemLayout}>
			{getFieldDecorator('username', {
				initialValue: adminUserOne && adminUserOne.username,
				rules: [{
					required: true,
					message: '请输入正确的用户名(4~32字符)',
					pattern: /^\w{4,32}$/
				}],
			})(
				<Input placeholder="请输入用户名" />
			)}
		</FormItem>
		<FormItem label="真实姓名" {...formItemLayout}>
			{getFieldDecorator('realName', {
				initialValue: adminUserOne && adminUserOne.real_name,
				rules: [{ required: true, message: '请输入真实姓名' }, {
					validator: validatorLength,
				}],
			})(
				<Input placeholder="请输入真实姓名" />
			)}
		</FormItem>
		<FormItem label="对外展示姓名" {...formItemLayout}>
			{getFieldDecorator('contacts', {
				initialValue: adminUserOne && adminUserOne.contacts,
				rules: [{ required: false }, {
					validator: validatorLength,
				}],
			})(
				<Input placeholder="请输入对外展示姓名" />
			)}
		</FormItem>
		{isEditAciton ? '' :
			<FormItem label="密码" {...formItemLayout}>
				{getFieldDecorator('pwd', {
					initialValue: adminUserOne && adminUserOne.password,
					rules: [{
						required: true, message: '请输入密码',
					}, {
						validator: passwordVali,
					}],
				})(
					<Input type='password' placeholder="请输入密码" />
				)}
			</FormItem>}
		{isEditAciton ? '' :
			<FormItem label="确认密码" {...formItemLayout}>
				{getFieldDecorator('relpassword', {
					initialValue: adminUserOne && adminUserOne.relpassword,
					rules: [{ required: true, message: '请输入确认密码' }, {
						validator: REPassword,
					}],
				})(
					<Input type='password' placeholder="请输入确认密码" />
				)}
			</FormItem>}
	</div>
}
//计算字符串个数
function countstrlen(str) {
	var strlength = 0;
	for (var i = 0; i < str.length; i++) {
		if (isChinese(str.charAt(i)) == true)
			strlength = strlength + 2;
		else
			strlength = strlength + 1;
	}
	return strlength;
}
//判断是否是中文
function isChinese(str) {
	var lst = /[\u4E00-\u9FA5]/i;
	return lst.test(str);
}
export default BaseForm;
