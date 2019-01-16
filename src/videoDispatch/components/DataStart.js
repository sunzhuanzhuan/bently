import React, { Component } from 'react'
import { DatePicker, Form, Radio } from "antd";
import moment from 'moment';
import ExplainContents from "../base/ExplainContents";
import { log } from 'core-js';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
class DataStart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//是否需要提前反馈 1；是，2：否
			valueRadioFeedBack: 1,
			//是否展示最晚反馈时间
			isShowFeedBack: true,
			//开始时间提示语
			startTimeMessage: 1,
			//最晚反馈时间是否可操作
			isDisableLastFeedBack: false,
			//最晚反馈时间提示语
			lastFeedMessage: 1
		};
		//是否是第一次初始化
		this.isFirstInitialize = true
	}
	//添加初始值
	componentWillReceiveProps(nextProps) {
		const { isEditAction, isNeedDefault, videoCampaignInfo, isvideoCampaignInfo, isCopyOperate } = this.props

		//当是修改的时候并且已经获取到查询的结果并且是第一次渲染是
		if (isNeedDefault && isvideoCampaignInfo && this.isFirstInitialize) {
			let valueRadioFeedBack = isEditAction ? parseInt(videoCampaignInfo.is_last_feedback) : 1
			let isDisableLastFeedBack = false
			let startTimeMessage = 1
			let lastFeedMessage = 1
			//判断编辑是的开始时间是否小于当前时间90分钟
			if (isCopyOperate) {
				// const startValue = moment(videoCampaignInfo.start_time * 1000).format("YYYY-MM-DD HH:mm")
				// const afterValue = moment(this.getRecentTime(90)).format("YYYY-MM-DD HH:mm")
				// if (startValue < afterValue) {
				//     this.setState({ isShowFeedBack: false })
				// }
			} else {
				isDisableLastFeedBack = true
			}
			this.setState({ valueRadioFeedBack, isDisableLastFeedBack, startTimeMessage, lastFeedMessage })
			this.isFirstInitialize = false
		}

	}
	//禁用时间控制
	disabledTypeDate = (type, data) => {
		let startValue = moment().subtract(1, 'd').endOf('day')
		let endValue = moment().add(7, 'd').endOf('day')
		if (type == "last_feedback_at") {
			endValue = moment(this.props.getFieldValue("start_time")).endOf('day')
		}
		if (!data || !startValue || !endValue) {
			return false
		}
		return !(data < endValue && data.valueOf() > startValue)
	}

	//开始时间校验
	vailStartTime = (rule, value, callback) => {
		if (this.props.isEditAction) {
			callback();
		} else {
			let afterValue = moment(this.getRecentTime(15)).format("YYYY-MM-DD HH:mm")
			let messageText = `开始时间不能早于${afterValue}`
			const nowValue = moment(value).format("YYYY-MM-DD HH:mm")
			const endValue = this.getLastRecentTime(15)
			if (nowValue < afterValue) {
				this.setState({ startTimeMessage: 0 })
				callback(messageText);
			} else if (nowValue > endValue) {
				this.setState({ startTimeMessage: 0 })
				callback(`开始时间不能晚于${endValue}`)
			} else {
				callback();
			}
		}

	}
	//最晚反馈时间校验
	vailFeedBackTime = (rule, value, callback) => {
		if (this.props.isEditAction) {
			callback();
		} else {
			let afterValue = moment(this.getRecentTime(75)).format("YYYY-MM-DD HH:mm")
			const startValue = (moment(this.props.getFieldValue("start_time")).subtract(15, 'minute')).format("YYYY-MM-DD HH:mm")
			const nowValue = moment(value).format("YYYY-MM-DD HH:mm")
			let lastFeedMessage = 0
			let messageText = `最晚反馈时间不能早于 ${afterValue}`
			if (nowValue > startValue) {
				callback(`最晚反馈时间不能晚于 ${startValue}`);
			} else if (nowValue < afterValue) {
				callback(messageText);
			} else {
				callback();
				lastFeedMessage = 1
			}
			this.setState({ lastFeedMessage })
		}
	}
    /**
    * 获取最近的可用时间
    * @return {[type]} [description]
    */
	getRecentTime = (minuteStep) => {
		const dateNow = new Date()
		var minutes = dateNow.getMinutes();
		minutes = Math.ceil((minutes + minuteStep) / 15) * 15;
		return new Date(dateNow.setMinutes(minutes));
	}
    /**
    * 获取最晚的可用时间
    * @return {[type]} [description]
    */
	getLastRecentTime = (minuteStep) => {
		const dateNow = moment().add(7 * 24, 'hours')
		const minutes = Math.ceil((dateNow.minute() - minuteStep) / 15) * 15;
		return moment(dateNow).minute(minutes).format("YYYY-MM-DD HH:mm")
	}
	changeFeedBack = (value) => {
		const { isEditAction } = this.props
		const afterValue = this.getRecentTime(90)
		let isShowFeedBack = true
		let valueRadioFeedBack = 1
		let startTimeMessage = 1
		if (moment(value).format("YYYY-MM-DD HH:mm") < moment(afterValue).format("YYYY-MM-DD HH:mm")) {
			//开始时间据当前时间小于90分钟时，不显示是否需要反馈和最晚反馈时间字段
			isShowFeedBack = false
			valueRadioFeedBack = 2
			startTimeMessage = 2
		} else {
			if (isEditAction) {
				this.setState({ isDisableLastFeedBack: false, })
			}
		}
		//重新赋值，触发自定义验证
		this.props.setFieldsValue({
			last_feedback_at: this.props.getFieldValue("last_feedback_at") ? this.props.getFieldValue("last_feedback_at") : moment(this.getRecentTime(75), 'YYYY-MM-DD HH:mm'),
		})
		this.setState({ isShowFeedBack, valueRadioFeedBack, startTimeMessage, lastFeedMessage: 1 })

	}
	isShowFeedBackTime = (e) => {
		this.setState({ valueRadioFeedBack: e.target.value })
	}
	render() {

		const { formItemLayout, isEditAction, videoCampaignInfo, getFieldDecorator } = this.props
		const { valueRadioFeedBack, isShowFeedBack, startTimeMessage, isDisableLastFeedBack, lastFeedMessage } = this.state
		const startValue = (moment(this.props.getFieldValue("start_time")).subtract(15, 'minute')).format("YYYY-MM-DD HH:mm")
		const contentFeedBack = {
			title: "什么是提前反馈？",
			src: "",
			desc: <div>
				<span>客户创建微闪投活动时，可要求账号在最晚反馈时间前反馈是否接单。若账号未在该时间前反馈，则订单自动流单，客户可选择其他的账号补单。</span>
				<table style={{ marginTop: 10 }}>
					<tbody>
						<tr >
							<td width={45} style={{ fontWeight: "bold", verticalAlign: "text-top" }}>备注：</td>
							<td>
								<div>1、最晚反馈时间前60分钟内提交的订单，账号可不提前反馈</div>
								<div>2、需提前反馈的订单，账号接单后客户不能取消</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		}
		const messageStart = {
			1: isEditAction ? null : "可选择当前时间15分钟后、7天之内的时间；开始时间距当前时间大于90分钟，可要求账号提前反馈是否接单",
			2: <div><span style={{ color: "red" }}>提示：</span>开始时间距当前时间小于90分钟，账号可不提前反馈是否接单</div>,
		}
		const FeedMessage = {
			1: isEditAction ? null : `可选择当前时间75分钟后、${startValue}之前的时间`,
			2: <div style={{ color: "red" }}>开始时间距当前时间小于90分钟，最晚反馈时间不可再修改</div>
		}
		return (
			<div>
				<FormItem {...formItemLayout} label="开始时间">
					{getFieldDecorator('start_time', {
						validateFirst: true,
						initialValue: isEditAction ? (videoCampaignInfo && moment(videoCampaignInfo.start_time * 1000)) : moment(this.getRecentTime(90), 'YYYY-MM-DD HH:mm'),
						rules: [{
							required: true,
							message: '请输入',
						}, {
							validator: this.vailStartTime
						}],
					})(
						<DatePicker
							defaultOpenValue={moment(this.getRecentTime(), 'YYYY-MM-DD HH:mm')}
							disabledDate={this.disabledTypeDate.bind(null, "start_time")}
							format="YYYY-MM-DD HH:mm"
							placeholder="请选择时间"
							showTime={{ format: 'HH:mm', minuteStep: 15 }}
							showToday={false}
							onChange={this.changeFeedBack}
							disabled={isEditAction && isDisableLastFeedBack}
							allowClear={false}
						/>
					)}
					<div className="prompt-content">{messageStart[startTimeMessage]}</div>
				</FormItem>
				{isShowFeedBack ? <FormItem {...formItemLayout} label="需要提前反馈" >
					{getFieldDecorator('is_last_feedback', {
						initialValue: valueRadioFeedBack,
						validateFirst: true,
						rules: [{
							required: true,
							message: '请选择',
						}],
					})(
						<RadioGroup onChange={this.isShowFeedBackTime} disabled={isEditAction && isDisableLastFeedBack} >
							<Radio value={1}>是</Radio>
							<Radio value={2}>否</Radio>
						</RadioGroup>
					)}

					<ExplainContents content={contentFeedBack} />
				</FormItem> : null}
				{valueRadioFeedBack == 1 && isShowFeedBack ? <FormItem {...formItemLayout} label="最晚反馈时间" >
					{getFieldDecorator('last_feedback_at', {
						validateFirst: true,
						initialValue: isEditAction && videoCampaignInfo.last_feedback_at && videoCampaignInfo.is_last_feedback == 1 ? (videoCampaignInfo && moment(videoCampaignInfo.last_feedback_at)) : moment(this.getRecentTime(75), 'YYYY-MM-DD HH:mm'),
						rules: [{
							required: true,
							message: '请输入',
						}, {
							validator: this.vailFeedBackTime
						}],
					})(
						<DatePicker
							allowClear={false}
							disabled={isEditAction && isDisableLastFeedBack}
							defaultOpenValue={moment(this.getRecentTime(), 'YYYY-MM-DD HH:mm')}
							disabledDate={this.disabledTypeDate.bind(null, "last_feedback_at")}
							format="YYYY-MM-DD HH:mm"
							placeholder="请选择时间"
							showTime={{ format: 'HH:mm', minuteStep: 15 }}
							showToday={false}
						/>
					)}
					<div className="prompt-content">{FeedMessage[lastFeedMessage]}</div>
				</FormItem> : null}
			</div>
		);
	}
}

export default DataStart;
