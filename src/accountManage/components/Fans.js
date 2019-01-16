import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, InputNumber, Radio } from 'antd';
import { WBYUploadFile } from 'wbyui';
const RadioGroup = Radio.Group;

const FormItem = Form.Item;
// const Option = Select.Option

export const Fans = (props) => {
	const { isEdit = true } = props;
	return <FansEdit {...props} disabled={!isEdit} />
}
//是否粉丝数认证 1:是 2:否 100:拒绝认证
const plainOptions = [
	{ label: '是', value: 1 },
	{ label: '否', value: 2 },
	{ label: '拒绝认证', value: 100 }
];

const FollowersCount = (props) => {
	const {
		getFieldDecorator,
		formItemLayout,
		disabled,
		count,
	} = props
	const max = Math.pow(10, 10) - 1;
	return <FormItem {...formItemLayout} label='粉丝数：'>
		{getFieldDecorator('follower_count', {
			initialValue: count,
			rules: [{ required: true, message: '粉丝数不能为空' },{
				pattern: /^\d{0,10}$/,
				message: '只能输入不超过10位数的数字'
			}]
		})(
			<InputNumber style={{ width: '320px' }} max={max} disabled={disabled} placeholder="粉丝数" />
		)}
	</FormItem>
}

const FollowersScreenShot = (props) => {
	const {
		getFieldDecorator,
		formItemLayout,
		disabled,
		url,
		token = {}
	} = props
	const {upload_token,upload_url} = token
	return <FormItem {...formItemLayout} label='粉丝截图'>
		<div className='clearfix'>
			{getFieldDecorator('follower_count_screenshot_url', {
				initialValue: url ? [{
					name: url,
					url: url,
					filepath:url
				}] : [],
				rules: [{ required: true, message: '请上传粉丝截图' }]
			})(
				<WBYUploadFile disabled={disabled} tok={{
					token: upload_token,
					upload_url: upload_url
				}} accept={'.bmp, .gif, image/jpeg'} uploadText={'点击上传'} size={5} showUploadList={{showPreviewIcon: true, showRemoveIcon: !disabled}}/>
			)}
		</div>
		<p className='input-desc-bottom'>请上传bmp, jpeg, jpg, gif;5M以内的图片</p>
	</FormItem>
}
const FollowerBeIdentified = (props) => {
	const {
		getFieldDecorator,
		formItemLayout,
		disabled,
		status = 1
	} = props
	return <FormItem {...formItemLayout} label='粉丝数目认证'>
		{getFieldDecorator('follower_count_verification_status', {
			initialValue: status || 1,
			rules: [{ required: false, message: '粉丝数目认证必填' }]
		})(
			<RadioGroup disabled={disabled} options={plainOptions} onChange={this.onChange1} />
		)}
	</FormItem>
}

const FansEdit = (props) => {
	const {
		children,
		isFansNumberImg = true, disabled,
		data: { accountInfo },
		isDisableFollowersCount,
		getFieldDecorator,
		isUpdate
	} = props
	const {
		follower_count,
		is_follower_count_editable,
		follower_count_verification_status,
		follower_count_screenshot_url,
		token,
		catched_at
	} = accountInfo
	return <div>
		<FollowersCount {...props} count={follower_count} disabled={isDisableFollowersCount || is_follower_count_editable == 2 || disabled} />
		{isFansNumberImg && <FollowersScreenShot {...props} url={follower_count_screenshot_url} token={token}/>}
		{isUpdate && <FollowerBeIdentified {...props} status={follower_count_verification_status} />}
		{/* 隐藏域提交 */}
		{getFieldDecorator('is_follower_count_editable', {initialValue: is_follower_count_editable})(<input type="hidden" />)}
		{getFieldDecorator('catched_at', {initialValue: catched_at})(<input type="hidden" />)}
		{children}
	</div>
}

Fans.propTypes = {
	isFansNumberImg: PropTypes.bool,	//是否有粉丝截图
	isEdit: PropTypes.bool,			//是否是编辑状态
	isDisableFollowersCount: PropTypes.bool		//是否禁用粉丝数
}


