import React from 'react';
import { Divider,Row, Col, Form, Input, Select, Radio, Checkbox, Tooltip } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

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

export class OnSaleInfoForAdd extends React.Component {

	render() {
		const {
			getFieldDecorator,
			formItemLayout, data } = this.props;
		const { accountInfo, priceInfo } = data;
		let { is_contacted, is_open, is_signed_off } = accountInfo
		let { is_allow_order_status } = priceInfo;
		return <div>
			<FormItem {...formItemLayout}
				label='是否与博主联系'
			>
				{getFieldDecorator('is_contacted', {
					initialValue: is_contacted ? is_contacted : 1,
					rules: [{ required: true, message: '是否与博主联系为必填项！' }],
				})(
					<RadioGroup>
						<Radio value={1}>是</Radio>
						<Radio value={2}>否</Radio>
					</RadioGroup>
				)}
			</FormItem>
			<FormItem {...formItemLayout}
				label='是否公开'
			>
				{getFieldDecorator('is_open', {
					initialValue: is_open ? is_open : 1,
					rules: [{ required: true, message: '是否公开为必填项！' }],
				})(
					<RadioGroup>
						<Radio value={1}>是</Radio>
						<Radio value={2}>否</Radio>
					</RadioGroup>
				)}
			</FormItem>
			<FormItem {...formItemLayout}
				label='是否在C端已注销'
			>
				{getFieldDecorator('is_signed_off', {
					initialValue: is_signed_off ? is_signed_off : 2,
					rules: [{ required: true, message: '是否在C端已注销为必填项！' }],
				})(
					<RadioGroup>
						<Radio value={1}>是</Radio>
						<Radio value={2}>否</Radio>
					</RadioGroup>
				)}
			</FormItem>
			{/* <FormItem {...formItemLayout}
				label='是否可接单'
			>
				{getFieldDecorator('is_allow_order_status', {
					initialValue: is_allow_order_status ? is_allow_order_status : 1,
					rules: [{ required: true, message: '是否可接单为必填项！' }],
				})(
					<RadioGroup>
						<Radio value={1}>是</Radio>
						<Radio value={2}>否</Radio>
					</RadioGroup>
				)}
			</FormItem> */}
		</div>
	}
}

export class OnSaleInfo extends React.Component {
	handleChangeForVerifyType = (e) => {
		let target = e.target.value;
		if (target == 3) {
			this.setState({
				is_fail: true
			})
		} else {
			this.setState({
				is_fail: false
			})
		}
	}

	constructor(context, props) {
		super(context, props);
		this.state = {
			is_fail: false
		}
		this.randomKey = 1;
	}
	componentWillReceiveProps(nextProps) {
		if ('data' in nextProps && nextProps.data.accountInfo && nextProps.data.accountInfo.approved_status == 3) {
			if (this.randomKey == 1) {
				this.setState({
					is_fail: true
				}, () => {
					this.randomKey = Math.random()
				})
			}
		}
	}

	render() {
		const {
			getFieldDecorator,
			formItemLayout, data
		} = this.props;
		const { accountInfo } = data;
		let {
			approved_status, disapproval_reason,
			is_contacted, is_shielded,
			is_signed_off, is_online,
			offline_reason, is_open,
			account_id, user_id,
			a_status, a_reason,
			b_status, b_reason

		} = accountInfo
		const width = { width: '40%' };
		const { is_fail } = this.state;
		return <div>
			{getFieldDecorator('account_id', {
				initialValue: account_id
			})(
				<input type="hidden" />
			)}
			{getFieldDecorator('user_id', {
				initialValue: user_id
			})(
				<input type="hidden" />
			)}
			<FormItem {...formItemLayout}
				label='审核状态:'
			>
				{getFieldDecorator('approved_status', {
					rules: [{ required: false }],
					initialValue: approved_status ? approved_status : 0
				})(
					<RadioGroup style={width} onChange={this.handleChangeForVerifyType}>
						<Radio value={1}>未审核</Radio>
						<Radio value={2}>审核成功</Radio>
						<Radio value={3}>审核失败</Radio>
					</RadioGroup>
				)}
			</FormItem>
			{is_fail && <FormItem {...formItemLayout}
				label=' '
				colon={false}
			>
				{getFieldDecorator('disapproval_reason', {
					rules: [{ required: true, message: '审核失败原因不能未空！' },
					{ max: 1000, message: '审核失败原因不能超过1000字' }
					],
					initialValue: disapproval_reason
				})(
					<TextArea style={{ width: '30%' }} placeholder="请输入失败原因！" autosize={{
						minRows: 2,
						maxRows: 6
					}} />
				)}
			</FormItem>}
			<FormItem {...formItemLayout}
				label='	是否与博主联系'
			>
				{getFieldDecorator('is_contacted', {
					rules: [{ required: true, message: '是否与博主联系为必填项！' }],
					initialValue: is_contacted ? is_contacted : 1
				})(
					<RadioGroup>
						<Radio value={1}>是</Radio>
						<Radio value={2}>否</Radio>
					</RadioGroup>
				)}
			</FormItem>
			<FormItem {...formItemLayout}
				label='是否在C端已注销'
			>
				{getFieldDecorator('is_signed_off', {
					rules: [{ required: true, message: '是否在C端已注销为必填项！' }],
					initialValue: is_signed_off ? is_signed_off : 2
				})(
					<RadioGroup>
						<Radio value={1}>是</Radio>
						<Radio value={2}>否</Radio>
					</RadioGroup>
				)}
			</FormItem>
			<FormItem {...formItemLayout}
				label='是否可售卖'
			>
				<div>
					{is_online && is_online == 2 && <span>否</span>}
					{is_online && is_online == 2 && offline_reason &&
						<Tooltip title={handleReason(offline_reason)}>
							<a style={{ marginLeft: '20px' }}>显示原因</a>
						</Tooltip>
					}
					{is_online && is_online == 1 && <span>是</span>}
				</div>
			</FormItem>
			<Divider />
			<FormItem {...formItemLayout}
				label='是否公开'
			>
				{getFieldDecorator('is_open', {
					rules: [{ required: true, message: '是否公开为必填项！' }],
					initialValue: is_open ? is_open : 1
				})(
					<RadioGroup>
						<Radio value={1}>是</Radio>
						<Radio value={2}>否</Radio>
					</RadioGroup>
				)}
			</FormItem>
			<FormItem {...formItemLayout}
				label='是否被官方屏蔽'
			>
				{getFieldDecorator('is_shielded', {
					rules: [{ required: true, message: '是否被官方屏蔽必填项！' }],
					initialValue: is_shielded ? is_shielded : 2
				})(
					<RadioGroup>
						<Radio value={1}>是</Radio>
						<Radio value={2}>否</Radio>
					</RadioGroup>
				)}
			</FormItem>
			<FormItem {...formItemLayout}
				label='可在A端上架'
			>
				<div>
					{a_status && a_status == 2 && <span>否</span>}
					{a_status && a_status == 2 && a_reason &&
						<Tooltip title={handleReason(a_reason)}>
							<a style={{ marginLeft: '20px' }}>显示原因</a>
						</Tooltip>
					}
					{a_status && a_status == 1 && <span>是</span>}
				</div>
			</FormItem>
			<FormItem {...formItemLayout}
				label='可在B端上架'
			>
				<div>
					{b_status && b_status == 2 && <span>否</span>}
					{b_status && b_status == 2 && b_reason &&
						<Tooltip title={handleReason(b_reason)}>
							<a style={{ marginLeft: '20px' }}>显示原因</a>
						</Tooltip>
					}
					{b_status && b_status == 1 && <span>是</span>}
				</div>
			</FormItem>
		</div>
	}
}



