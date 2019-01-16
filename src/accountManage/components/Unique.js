import React from 'react';
import { WBYUploadFile } from 'wbyui'
import { Form, Select, Input, Checkbox, Popover, Radio, message } from 'antd'
import SimpleTag from "../base/SimpleTag";
import moment from 'moment'
import { platformToDesc } from '../constants/placeholder'

const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;

const checkForSensitiveWord = action => (rule, value, callback) => {
	action({ string: value }).then(result => {
		let is_sensitive_words = result.data && result.data.is_sensitive_words;
		if (is_sensitive_words == 1) {
			callback('账号简介有敏感词，请重新填写')
		} else {
			callback()
		}
	})
}

/**
 * 二维码
 */
export const QCCodeUpload = (props) => {
	const { getFieldDecorator, formItemLayout, data: { accountInfo } } = props
	const {
		qr_code_url,
		is_qr_code_url_editable,
		token = {}
	} = accountInfo
	const { upload_token, upload_url } = token
	return <FormItem {...formItemLayout} label='二维码'>
		<div className='clearfix'>
			{getFieldDecorator('qr_code_url', {
				initialValue: qr_code_url ? [{
					name: qr_code_url,
					url: qr_code_url,
					filepath: qr_code_url
				}] : [],
				rules: [{ required: true, message: '二维码不能为空' }]
			})(
				<WBYUploadFile tok={{
					token: upload_token,
					upload_url: upload_url
				}} accept={'.bmp, .gif, image/jpeg'} uploadText={'点击上传'} size={5} showUploadList={{
					showPreviewIcon: true,
					showRemoveIcon: !(is_qr_code_url_editable == 2)
				}} disabled={is_qr_code_url_editable == 2} />
			)}
		</div>
		<p className='input-desc-bottom'>请上传bmp, jpeg, jpg, gif;5M以内的图片</p>
		{/* 隐藏域提交 */}
		{getFieldDecorator('is_qr_code_url_editable', { initialValue: is_qr_code_url_editable })(
			<input type="hidden" />)}
	</FormItem>
}

/**
 * 账号类型(入库用)
 */
export const AccountType = (props) => {
	const { getFieldDecorator, formItemLayout, halfWrapCol, data: { accountInfo } } = props
	const {
		media_type = 0
	} = accountInfo
	return <FormItem {...formItemLayout} wrapperCol={halfWrapCol} label='账号类型'>
		{getFieldDecorator('media_type', {
			initialValue: media_type || 3,
			// rules: [{ required: true, message: '账号类型必须选择' }]
		})(
			<Select style={{ width: '100%' }}>
				<Option value={3}>未知</Option>
				<Option value={1}>草根</Option>
				<Option value={2}>名人</Option>
				<Option value={4}>媒体</Option>
				<Option value={5}>个人</Option>
			</Select>
		)}
	</FormItem>
}

/**
 * 利润等级
 */
export const ProfitLevel = (props) => {
	const { getFieldDecorator, formItemLayout, halfWrapCol, data: { priceInfo } } = props
	const {
		profit_grade_id
	} = priceInfo
	return <FormItem {...formItemLayout} wrapperCol={halfWrapCol} label='利润等级'>
		{getFieldDecorator('profit_grade_id', {
			initialValue: profit_grade_id || 1,
			rules: [{ required: true, message: '' }]
		})(
			<Select style={{ width: '100%' }}>
				<Option value={1}>未知</Option>
			</Select>
		)}
	</FormItem>
}

/**
 * 账号简介
 */
export const AccountDesc = (props) => {
	const { getFieldDecorator, formItemLayout, data: { accountInfo }, actions: { sensitiveWordsFilter }, pid } = props
	const {
		introduction = '',
		platform_id
	} = accountInfo
	const desc = platformToDesc[platform_id || pid] || ''
	return <FormItem {...formItemLayout} label='账号简介'>
		{getFieldDecorator('introduction', {
			initialValue: introduction,
			first: true,
			validateTrigger: 'onBlur',
			rules: [{
				max: 1000,
				message: '账号简介不能超过1000字'
			}, { validator: checkForSensitiveWord(sensitiveWordsFilter) }]
		})(
			<TextArea placeholder={desc} autosize={{ minRows: 2, maxRows: 4 }} />
		)}
	</FormItem>
}

/**
 * 内容分类
 */
export const ContentCategory = (props) => {
	const { formItemLayout = {}, data: { accountInfo } } = props
	const {
		category = []
	} = accountInfo
	return <FormItem {...formItemLayout} label='内容分类'>
		{category.length ? <div>{category.map(({ name }) =>
			<SimpleTag key={name}>{name}</SimpleTag>)}</div> : '暂无分类'}
	</FormItem>
}

/**
 * 微博报价特有项(参考报价)
 */
export const ReferencePrice = (props) => {
	const { formItemLayout = {}, data: { accountInfo, priceInfo } } = props
	const {
		price_micro_task_tweet,
		price_micro_task_retweet,
		price_weiq_tweet,
		price_weiq_retweet,
		weitask_fetched_time
	} = accountInfo
	return <div>
		<FormItem {...formItemLayout} label='参考报价'>
			<div className='sina-reference-table'>
				<table>
					<tbody>
						<tr>
							<th>微任务原发价</th>
							<td>{price_micro_task_tweet || '--'}</td>
						</tr>
						<tr>
							<th>微任务转发价</th>
							<td>{price_micro_task_retweet || '--'}</td>
						</tr>
						<tr>
							<th>WEIQ原发价</th>
							<td>{price_weiq_tweet || '--'}</td>
						</tr>
						<tr>
							<th>WEIQ转发价</th>
							<td>{price_weiq_retweet || '--'}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p className='input-desc-bottom'>微任务,
				WEIQ价格更新时间: <span>{weitask_fetched_time ? moment(weitask_fetched_time * 1000).format('YYYY-MM-DD') : '--'}</span>
			</p>
		</FormItem>
	</div>
}

/**
 * 微博报价特有项(报价包含)
 */
export const PriceInclude = (props) => {
	const { getFieldDecorator, formItemLayout = {}, data: { accountInfo, priceInfo } } = props
	const {
		is_support_topic_and_link,
		is_prevent_shielding
	} = priceInfo
	return <div>
		<FormItem {...formItemLayout} label='报价包含'>
			{getFieldDecorator('is_prevent_shielding', {
				valuePropName: 'checked',
				initialValue: is_prevent_shielding == 1
			})(
				<Checkbox>防屏蔽（博主可自行下微任务/接WEIQ订单）</Checkbox>)}
		</FormItem>
		<FormItem style={{ top: '-16px' }}  {...formItemLayout} label=' ' colon={false}>
			{getFieldDecorator('is_support_topic_and_link', {
				valuePropName: 'checked',
				initialValue: is_support_topic_and_link == 1
			})(
				<Checkbox>话题/@/链接 </Checkbox>)}
		</FormItem>
	</div>
}

/**
 * 账号报价帮助信息
 */
export const AccountPriceHelp = () => {
	const content = <div className='account-price-help-tips'>
		<img src={require('../images/help.jpg')} />
	</div>
	return <div>
		<Popover getPopupContainer={() => document.querySelector('.price_scroll_container') || document.querySelector('#account-manage-container')} placement="topLeft" title={null} content={content} trigger="click">
			<a>查看订单成本, 收入计算规则</a>
		</Popover>
	</div>
}

/**
 * 账号ID
 */
export const AccountID = (props) => {
	const { data: { accountInfo } } = props
	const id = accountInfo['account_id'] || '-'
	const { formItemLayout = {} } = props
	return <FormItem {...formItemLayout} label='account_id'>
		{id}
	</FormItem>
}

/**
 * 是否微闪投账号
 */
export const AccountIsNameless = (props) => {
	const { getFieldDecorator, formItemLayout = {}, data: { accountInfo } } = props
	const {
		micro_flash_post = 0,
		is_famous
	} = accountInfo
	const style = is_famous == 1 ? {display: 'none'}: {}
	return <FormItem style={style} {...formItemLayout} label='是否微闪投账号'>
		{getFieldDecorator('micro_flash_post', {
			initialValue: is_famous == 1 ? 2 : (micro_flash_post || 2)
		})(
			<RadioGroup>
				<Radio value={2}>否</Radio>
				<Radio value={1}>是</Radio>
			</RadioGroup>
		)}
	</FormItem>
}

/**
 * 可在A端展示
 */
export const DisplayForA = (props) => {
	const { getFieldDecorator, formItemLayout = {}, data: { accountInfo } } = props
	const {
		is_open = 1
	} = accountInfo
	return <FormItem {...formItemLayout} label=' ' colon={false}>
		{getFieldDecorator('is_open', {
			valuePropName: 'checked',
			initialValue: is_open == 1
		})(
			<Checkbox>可在A端展示</Checkbox>)}
	</FormItem>
}
/**
 * 可接单(入库)
 */
export const Orderable = (props) => {
	const { getFieldDecorator, formItemLayout = {}, data: { accountInfo } } = props
	const {
		is_allow_order_status = 1
	} = accountInfo
	return <FormItem {...formItemLayout} label='是否可接单'>
		{getFieldDecorator('is_allow_order_status', {
			initialValue: is_allow_order_status || 1
		})(
			<RadioGroup>
				<Radio value={1}>是</Radio>
				<Radio value={2}>否</Radio>
			</RadioGroup>
		)}
	</FormItem>
}
/**
 * 接单策略
 * */
export const OrderStrategy = (props) => {
	const { getFieldDecorator,getFieldValue, formItemLayout = {}, halfWrapCol, data: { priceInfo } } = props
	const {
		is_accept_hard_ad,
		is_accept_hard_ad_description
	} = priceInfo
	let style = {}
	if(getFieldValue('is_accept_hard_ad') === undefined){
		style = (is_accept_hard_ad == 1) ? {display: 'block'}: {display: 'none'}
	}else {
		style = (getFieldValue('is_accept_hard_ad')) ? {display: 'block'}: {display: 'none'}
	}
	return <div>
		<FormItem label="接硬广"  {...formItemLayout} >
			{getFieldDecorator('is_accept_hard_ad', {
				rules: [{ required: false }],
				valuePropName: 'checked',
				initialValue: is_accept_hard_ad == 1
			})(
				<Checkbox>接硬广</Checkbox>
			)}
		</FormItem>
		<FormItem style={style} label="备注" {...formItemLayout} wrapperCol={halfWrapCol}>
			{getFieldDecorator('is_accept_hard_ad_description', {
				rules: [{ max: 1000, message: '备注不能超过1000字' }],
				initialValue: is_accept_hard_ad_description
			})(
				<TextArea />
			)}
		</FormItem>
	</div>
}
