import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { WBYUploadFile } from 'wbyui'

const FormItem = Form.Item;

export class BaseInfo extends Component {

	setInputLen = key => e => {
		this.setState({
			[key]: e.target.value.length
		})
	}

	displayInputLen = (key, diaplay) => e => {
		this.setState({
			[key + 'Show']: diaplay,
			[key + 'Len']: e.target.value.length
		})
	}

	constructor(props) {
		super(props)
		let name = props.data.accountInfo['sns_name'] || ''
		let id = props.data.accountInfo['sns_id'] || ''
		this.state = {
			accountNameLen: name.length,
			IDLen: id.length,
			accountNameShow: false,
			IDShow: false
		}
	}

	render() {
		const {
			getFieldDecorator, formItemLayout, children, halfWrapCol, form, data: { accountInfo },hideUniqueId,hideLink
		} = this.props
		const {
			sns_name,
			is_sns_name_editable,
			sns_id,
			is_sns_id_editable,
			url,
			is_url_editable,
			sns_unique_id,
			avatar_url,
			is_avatar_url_editable,
			catched_at,
			token = {}
		} = accountInfo
		const { upload_token, upload_url } = token
		const { accountNameLen, IDLen, accountNameShow, IDShow } = this.state
		return <div>
			<FormItem {...formItemLayout} label='账号名称'>
				{getFieldDecorator('sns_name', {
					initialValue: sns_name,
					first: true,
					rules: [{ required: true, message: '账号名称不能为空' }, {
						pattern: /^(.){0,80}$/,
						message: '账号名称最多可输入80个字符'
					}]
				})(
					<Input disabled={is_sns_name_editable == 2} suffix={accountNameShow ?
						<span className='input-suffix-text'>{accountNameLen}/80</span> : null} onFocus={this.displayInputLen('accountName', true)} placeholder="账号名称" onChange={this.setInputLen('accountNameLen')} onBlur={this.displayInputLen('accountName', false)} />
				)}
			</FormItem>
			<FormItem {...formItemLayout} label='账号ID'>
				{getFieldDecorator('sns_id', {
					initialValue: sns_id,
					first: true,
					rules: [{ required: true, message: '账号ID不能为空' }, {
						pattern: /^.{0,100}$/,
						message: '账号ID最多可输入100个字符'
					}]
				})(
					<Input disabled={is_sns_id_editable == 2} suffix={IDShow ?
						<span className='input-suffix-text'>{IDLen}/100</span> : null} onFocus={this.displayInputLen('ID', true)} placeholder="账号ID" onChange={this.setInputLen('IDLen')} onBlur={this.displayInputLen('ID', false)} />
				)}
			</FormItem>
			{hideLink ? null : <FormItem {...formItemLayout} label='主页链接'>
				{getFieldDecorator('url', {
					first: true,
					initialValue: url,
					rules: [{ required: true, message: '主页链接不能为空' }, {
						pattern: /^((htt(p|ps))|weixin):\/\//,
						message: '主页链接格式不正确，请填写前缀为“http://或https://”的主页链接'
					}, { max: 1024, message: '主页链接最多可输入1024个字符' }]
				})(
					<Input disabled={is_url_editable == 2} placeholder="主页链接" />
				)}
			</FormItem>}
			{hideUniqueId ? null :
				<FormItem {...formItemLayout} wrapperCol={halfWrapCol} label='唯一标识'>
					{getFieldDecorator('sns_unique_id', {
						initialValue: sns_unique_id,
					})(
						<p>{sns_unique_id || '--'}</p>
					)}
				</FormItem>}
			<FormItem {...formItemLayout} label='头像'>
				<div className='clearfix'>
					{getFieldDecorator('avatar_url', {
						initialValue: avatar_url ? [{
							name: avatar_url,
							url: avatar_url,
							filepath: avatar_url
						}] : [],
						rules: [{ required: true, message: '头像不能为空' }]
					})(
						<WBYUploadFile tok={{
							token: upload_token,
							upload_url: upload_url
						}} accept={'.bmp, .gif, image/jpeg'} showUploadList={{
							showPreviewIcon: true,
							showRemoveIcon: !(is_avatar_url_editable == 2)
						}} uploadText={'点击上传'} size={5} disabled={is_avatar_url_editable == 2} />
					)}
				</div>
				<p className='input-desc-bottom'>请上传bmp, jpeg, jpg, gif;5M以内的图片</p>
				{/* 隐藏域提交 */}
				{getFieldDecorator('is_sns_name_editable', { initialValue: is_sns_name_editable })(
					<input type="hidden" />)}
				{getFieldDecorator('is_sns_id_editable', { initialValue: is_sns_id_editable })(
					<input type="hidden" />)}
				{getFieldDecorator('is_url_editable', { initialValue: is_url_editable })(
					<input type="hidden" />)}
				{getFieldDecorator('is_avatar_url_editable', { initialValue: is_avatar_url_editable })(
					<input type="hidden" />)}
				{getFieldDecorator('catched_at', { initialValue: catched_at })(
					<input type="hidden" />)}
			</FormItem>
			{React.Children.map(children, child => React.cloneElement(child, { ...form }))}
		</div>
	}
}
