import React, { Component } from 'react';
import {
	Form,
	Radio,
	Checkbox,
	Popover,
	Row,
	Col,
	Divider,
	DatePicker,
	Alert,
	Tooltip
} from 'antd';
import PriceInput from "../base/PriceInput";
import { priceKeysMap, priceTitle } from '../constants/price'
import './AccountPrice.less'
import moment from 'moment'
import { AccountPriceHelp } from "./Unique";

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

// 合并报价项到当前存在的报价项中
function assiginPriceKeys(obj1 = {}, obj2 = {}) {
	let _obj = {}
	for (let key in obj1) {
		if (!obj1.hasOwnProperty(key)) continue
		_obj[key] = obj2[key] || obj1[key]
	}
	return _obj
}
// 过滤空报价
function filterEmptyPrice(obj1 = {}) {
	let _obj = {}
	for (let key in obj1) {
		if (!obj1.hasOwnProperty(key)) continue
		if (obj1[key]) {
			_obj[key] = obj1[key]
		}
	}
	return _obj
}
// 时间转moment对象
function data2moment(data) {
	return !!data && moment(data)
}
// 检查最少一项报价
const checkPrice = (onOff, otherCheck) => (rule, value = {}, callback) => {
	if (!onOff || Object.values(value).filter(Boolean).length) {
		if (otherCheck) {
			return otherCheck(rule, value, callback)
		}
		return callback()
	}
	callback('报价项最少填写一项')
}
// 处理审核状态
function approvalStatus(code = 1, desc = '') {
	code = parseInt(code)
	switch (code) {
		case 2:
			return '审核成功';
		case 3:
			return <div>
				<span style={{ color: 'red', marginRight: '20px' }}>审核失败</span>
				<Popover placement="topLeft" title='失败原因' content={
					<p style={{ maxWidth: '300px' }}>{desc}</p>} trigger="click">
					<a>显示失败原因</a>
				</Popover>
			</div>;
		default:
			return '待审核';
	}
}
// 处理原因显示
function handleReason(reason = '') {
	let result = ''
	if (Array.isArray(reason)) {
		result = reason.join('，')
	} else if (typeof reason === 'string') {
		result = reason.replace(/,/g, '，')
	}
	return result
}
// 处理有效期和禁用逻辑
function handleDatePeriod({ now_star, now_end, next_star, next_end, pass = false, right = false }) {
	now_star = data2moment(now_star);
	now_end = data2moment(now_end);
	next_star = data2moment(next_star);
	next_end = data2moment(next_end);


	// 最终数据
	let nowStar = now_star, // 本期开始时间
		nowEnd = now_end, // 本期结束时间
		nextStar = next_star, // 下期开始时间
		nextEnd = next_end, // 下期结束时间
		nowDate = moment(), // 当前时间
		require = true, // 是否必填
		canEditTime = true, // 是否可编辑时间
		canEditPrice = true, // 是否可编辑价格
		hasPass = false,
		disabledDate = moment().add(30, 'd') // 禁用时间选择范围

	// 没有本期时间
	if (!now_star || !now_end) {
		nowStar = moment().subtract(1, 'days').startOf('d')
		nowEnd = moment().subtract(1, 'days').endOf('d')
	} else {
		nowStar = moment(now_star).startOf('d')
		nowEnd = moment(now_end).endOf('d')
	}

	if (!next_star || !next_end) {
		// 不存在下期时间(数据) & 没有审核信息
		if (nowDate < nowEnd) {
			// 本期时间未过期
			nextStar = moment(nowEnd).add(1, 'd').startOf('d')
			require = false
			nextEnd = null
		} else {
			// 本期时间已过期
			nextStar = moment(nowDate).startOf('d')
			require = true
			nextEnd = null
		}
		disabledDate = moment(nextStar).add(29, 'd')
		canEditTime = true
		canEditPrice = true
	} else {
		// 存在下期时间(数据) & 必有审核信息
		hasPass = true
		if (nowDate < nowEnd) {
			// 本期时间未过期
			if (pass) {
				// 审核通过
				canEditTime = false
				canEditPrice = right
			} else {
				canEditTime = true
				canEditPrice = true
			}
			disabledDate = moment(nextStar).add(30, 'd')
			require = false
		} else {
			// 本期时间已过期 & 审核没有通过
			nextStar = moment(nowDate).startOf('d')
			nextEnd = moment(nextEnd).isBefore(nowDate) ? moment(nextStar).add(30, 'd').endOf('d') : nextEnd
			// nextEnd = moment(nextStar).add(30, 'd').endOf('d')
			disabledDate = moment(nextStar).add(29, 'd')
			require = true
			canEditTime = true
			canEditPrice = true
		}
	}

	return {
		nowStar,
		nowEnd,
		nextStar,
		nextEnd,
		disabledDate,
		require,
		canEditTime,
		canEditPrice,
		hasPass
	}
}

// 处理下单状态显示
function orderStatusView(refuse_status, desc = '') {
	let _C = null
	if (refuse_status) {
		_C = '是'
	} else {
		_C = <div>
			<span style={{ marginRight: '20px' }}>否</span>
			<Tooltip title={handleReason(desc)}>
				<a>显示原因</a>
			</Tooltip>
		</div>
	}
	return _C
}

// 报价提示信息
function handlePriceTitle(tax, type) {
	let key = '1'
	if (!tax) {
		key = type == 1 ? '2' : '3'
	}
	return priceTitle[key].desc
}

// 派单报价
export class NamelessPrice extends Component {
	render() {
		const {
			getFieldDecorator, formItemLayout, children, isUpdate, priceKeys, data: { accountInfo, priceInfo }
		} = this.props
		const {
			partner_type: type,
			tax_in_price: tax
		} = accountInfo
		const {
			price_item_list,
			partner_type = type,
			tax_in_price = tax
		} = priceInfo
		let val = {};
		price_item_list && price_item_list.forEach(({ sku_type_id, cost_price_raw }) => {
			val[sku_type_id] = cost_price_raw;
		})
		return <div className='price_scroll_container'>
			<FormItem {...formItemLayout} label='账号报价'>
				{getFieldDecorator('price_now', {
					initialValue: val,
					rules: [{
						required: true,
						message: '最少需填写一个报价项'
					}, { validator: checkPrice(true) }]
				})(
					<PriceTable desc={handlePriceTitle(tax_in_price == 1, partner_type)} isEdit={true} priceKeys={priceKeys} />)}
				<AccountPriceHelp />
			</FormItem>
			{isUpdate ? <NamelessStatus {...{
				getFieldDecorator,
				formItemLayout,
				accountInfo,
				priceInfo
			}} /> : null}
			{children}
		</div>
	}
}

// 预约报价
export class FamousPrice extends Component {
	handleisAllow = (e) => {
		this.setState({ isAllow: e.target.value })
	}
	handleforcedOrder = (e) => {
		this.setState({ forcedOrder: e.target.checked })
	}
	// 价格有效期联动校验 -- 时间
	checkDateAndPrice = (rule, value, callback) => {
		const { getFieldValue, setFields } = this.props
		let price = getFieldValue('price_next') || {}
		if (Object.values(price).filter(Boolean).length) {
			if (!value) {
				return callback('请填写下期有效期结束时间')
			}
		} else {
			setFields({
				'price_next': value ? {
					"errors": [{
						"message": "报价项最少填写一项",
						"field": "price_next"
					}]
				} : {}
			})
		}
		callback()
	}
	//
	// 价格有效期联动校验 -- 价格
	checkPriceAndDate = (rule, value, callback) => {
		const { getFieldValue, setFields } = this.props
		let date = getFieldValue('next_price_valid_to')
		let flag = Object.values(value).filter(Boolean).length > 0
		if (date) {
			if (!flag) {
				return callback('报价项最少填写一项')
			}
		} else {
			setFields({
				'next_price_valid_to': flag ? {
					value: null,
					"errors": [{
						"message": "请填写下期有效期结束时间",
						"field": "next_price_valid_to"
					}]
				} : { value: null }
			})
		}
		callback()
	}
	handleisAllow = (e) => {
		this.setState({ isAllow: e.target.value })
	}
	handleforcedOrder = (e) => {
		this.setState({ forcedOrder: e.target.checked })
	}

	constructor(props) {
		super(props)
		const { data: { priceInfo } } = props
		const { is_allow_order_status, sale_status, force_sale_status, off_shelf_reason } = priceInfo
		this.state = {
			isAllow: is_allow_order_status,// 是否可接单
			orderStatus: sale_status == 1,// 下单状态
			forcedOrder: force_sale_status == 1, // 强制可下单
			orderStatusReason: off_shelf_reason // 强制可下单原因
		}
	}

	componentDidMount() {
		const { validateFields } = this.props
		if (!this.cNextEnd && !this.cRequire) {
			validateFields(['next_price_valid_to', 'price_next'])
		}
	}

	render() {
		const {
			getFieldDecorator, formItemLayout, children, priceKeys, data: { accountInfo, priceInfo }, auth = {}
		} = this.props
		const {
			price_valid_from,
			price_valid_to,
			next_price_valid_from,
			next_price_valid_to,
			review_status,
			review_fail_reason,
			tax_in_price,
			partner_type,
			price_item_list
		} = priceInfo
		/*const orderStatus = {
			isCheck: is_flowunit_off_shelf == 1, // 是否流单过多下架
			accept_order: is_allow_order_status == 1, // 是否接单
			refuse_order: is_reject_order_off_shelf == 1, // 是否拒单下架
			open: is_open == 1 // 是否公开
		}*/
		const _data = {
			now_star: price_valid_from,
			now_end: price_valid_to,
			next_star: next_price_valid_from,
			next_end: next_price_valid_to,
			pass: review_status == 2,
			right: auth['account.manage.update.price.edit']
		}
		const {
			nowStar, // 本期开始时间
			nowEnd, // 本期结束时间
			nextStar, // 下期开始时间
			nextEnd, // 下期结束时间
			require, // 是否必填
			canEditTime, // 是否可编辑时间
			canEditPrice, // 是否可编辑价格
			disabledDate, // 禁用时间选择范围
			hasPass // 是否有审核信息
		} = handleDatePeriod(_data)
		this.cNextEnd = nextEnd
		this.cRequire = require
		let nowVal = {}, nextVal = {};
		price_item_list && price_item_list.forEach(({ sku_type_id, cost_price_raw, next_cost_price_raw }) => {
			nowVal[sku_type_id] = cost_price_raw;
			nextVal[sku_type_id] = next_cost_price_raw;
		})
		const { isAllow, orderStatus, forcedOrder, orderStatusReason } = this.state
		const viewStatus = (isAllow == 1 && (orderStatus || forcedOrder)) ? '销售AB端可下单' : '销售AB端不可下单'
		return <div className='price_scroll_container'>
			<FormItem {...formItemLayout} label='本期有效期'>
				<span>{nowStar.format('YYYY-MM-DD')}</span><span className='m10-e'>至</span>
				<span>{nowEnd.format('YYYY-MM-DD')}</span>
			</FormItem>
			<FormItem {...formItemLayout} label='账号报价'>
				{getFieldDecorator('price_now', {
					initialValue: nowVal,
					rules: [{ validator: checkPrice(_data.right) }]
				})(<PriceTable isEdit={_data.right} priceKeys={priceKeys} />)}
			</FormItem>
			<Divider dashed />
			<FormItem {...formItemLayout} label='下期有效期' style={{ display: 'none' }}>
				{getFieldDecorator('next_price_valid_from', {
					initialValue: nextStar
				})(
					<span>{nextStar.format('YYYY-MM-DD')}</span>)}
			</FormItem>
			<FormItem {...formItemLayout} label='下期有效期'>
				<span>{nextStar.format('YYYY-MM-DD')}</span><span className='m10-e'>至</span>
				{canEditTime ? getFieldDecorator('next_price_valid_to', {
						validateFirst: true,
						initialValue: nextEnd,
						rules: [{
							type: 'object',
							required: require,
							message: '请选择结束时间'
						}, { validator: this.checkDateAndPrice }]
					})(
					<DatePicker getPopupContainer={() => document.querySelector('#account-manage-container')} disabledDate={current => current && current < disabledDate} />) :
					<span>
						{getFieldDecorator('next_price_valid_to', {
							initialValue: nextEnd
						})(<input type={'hidden'} />)}
						{nextEnd && nextEnd.format('YYYY-MM-DD')}
						</span>}
			</FormItem>
			<FormItem {...formItemLayout} label='账号报价'>
				{getFieldDecorator('price_next', {
					initialValue: nextVal,
					validateFirst: true,
					rules: [{
						required: require,
						validator: checkPrice(require, this.checkPriceAndDate)
					}]

				})(
					<PriceTable desc={handlePriceTitle(tax_in_price == 1, partner_type)} isEdit={canEditPrice} priceKeys={priceKeys} />)}
				<AccountPriceHelp />
			</FormItem>
			{hasPass ? <FormItem {...formItemLayout} label='审核状态'>
				{approvalStatus(review_status, review_fail_reason)}
			</FormItem> : null}
			<Divider dashed />
			{/* TODO: 字段修改*/}
			<FormItem {...formItemLayout} label='是否可接单'>
				{getFieldDecorator('is_allow_order_status', {
					initialValue: isAllow
				})(
					<RadioGroup onChange={this.handleisAllow}>
						<Radio value={1}>是</Radio>
						<Radio value={2}>否</Radio>
					</RadioGroup>
				)}
			</FormItem>
			<FormItem {...formItemLayout} label='下单状态'>
				{orderStatusView(orderStatus, orderStatusReason)}
			</FormItem>
			<FormItem {...formItemLayout} label='选择账号状态'>
				{getFieldDecorator('force_sale_status', {
					valuePropName: 'checked',
					initialValue: forcedOrder
				})(
					<Checkbox onChange={this.handleforcedOrder}>强制可下单</Checkbox>)}
			</FormItem>
			<FormItem {...formItemLayout} label=' ' colon={false}>
				<Alert message={
					<span>保存后，<b>{viewStatus}</b></span>
				} type="info" showIcon />
			</FormItem>
			<Divider dashed />
			{/* 隐藏域提交 */}
			{getFieldDecorator('price_valid_from', { initialValue: nowStar })(
				<input type="hidden" />)}
			{getFieldDecorator('price_valid_to', { initialValue: nowEnd })(
				<input type="hidden" />)}
			{children}
		</div>
	}
}

// 报价table组
class PriceTable extends Component {
	onChange = key => value => {
		this.setState({ [key]: value }, () => {
			this.props.onChange(filterEmptyPrice({ ...this.state }))
		});
	}

	constructor(props) {
		super(props);
		this.priceKeys = props.priceKeys || []
		this._keys = this.priceKeys.reduce((obj, item) => {
			obj[item['key']] = ''
			return obj
		}, {})
		this.state = { ...assiginPriceKeys(this._keys, this.props.value) };
	}

	render() {
		const { isEdit, desc = '' } = this.props
		return this.priceKeys.length ? <div>
			{desc ? <span>请填写<span style={{ color: 'red' }}>{desc}</span></span> : null}
			<div className='price-table'>
				<div className='price-table-head'>
					<Row gutter={8}>
						<Col span={10}><p className='price-table-title'>服务项</p></Col>
						<Col span={14}><p className='price-table-title'>报价(元)</p></Col>
					</Row>
				</div>
				<div className='price-table-body'>
					{
						this.priceKeys.map(({ key, name }) => <Row key={key} gutter={8}>
							<Col span={10}>
								<p className='price-table-title'>{name}</p>
							</Col>
							<Col span={14}>
								<div className='price-table-input'>
									<PriceInput isEdit={isEdit} value={this.state[key]} onChange={this.onChange(key)} />
								</div>
							</Col>
						</Row>)
					}
				</div>
			</div>
		</div> : null
	}
}

// 预约账号接单状态
class NamelessStatus extends Component {
	handleisAllow = (e) => {
		this.setState({ isAllow: e.target.value })
	}
	handleforcedOrder = (e) => {
		this.setState({ forcedOrder: e.target.checked })
	}
	handleisAllow = (e) => {
		this.setState({ isAllow: e.target.value })
	}
	handleforcedOrder = (e) => {
		this.setState({ forcedOrder: e.target.checked })
	}

	constructor(props) {
		super(props)
		const { priceInfo } = props
		const { is_allow_order_status, sale_status, force_sale_status, off_shelf_reason } = priceInfo
		this.state = {
			isAllow: is_allow_order_status,// 是否可接单
			orderStatus: sale_status == 1,// 下单状态
			forcedOrder: force_sale_status == 1, // 强制可下单
			orderStatusReason: off_shelf_reason // 强制可下单原因
		}
	}

	render() {
		const {
			getFieldDecorator, formItemLayout
		} = this.props
		const { isAllow, orderStatus, forcedOrder, orderStatusReason } = this.state
		const viewStatus = (isAllow == 1 && (orderStatus || forcedOrder)) ? '销售AB端可下单' : '销售AB端不可下单'
		return <div>
			<FormItem {...formItemLayout} label='是否可接单'>
				{getFieldDecorator('is_allow_order_status', {
					initialValue: isAllow
				})(
					<RadioGroup onChange={this.handleisAllow}>
						<Radio value={1}>是</Radio>
						<Radio value={2}>否</Radio>
					</RadioGroup>
				)}
			</FormItem>
			<FormItem {...formItemLayout} label='下单状态'>
				{orderStatusView(orderStatus, orderStatusReason)}
			</FormItem>
			<FormItem {...formItemLayout} label='选择账号状态'>
				{getFieldDecorator('force_sale_status', {
					valuePropName: 'checked',
					initialValue: forcedOrder
				})(
					<Checkbox onChange={this.handleforcedOrder}>强制可下单</Checkbox>)}
			</FormItem>
			<FormItem {...formItemLayout} label=' ' colon={false}>
				<Alert message={
					<span>保存后，<b>{viewStatus}</b></span>
				} type="info" showIcon />
			</FormItem>
			<Divider dashed />
		</div>
	}
}

