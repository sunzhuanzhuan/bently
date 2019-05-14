import React, { Component } from 'react'
import { Button, Divider, Modal } from "antd";
import { withRouter } from "react-router-dom";
import qs from "qs";
import "./Statistics.less"
class Statistics extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	nextStep = () => {

		const { setHistoryPush, supplementAttachmentsList = [], goodsReceipt: { baseDetail, errorList, GRItemListStatistic: { count = 0 } }, editServiceRateStatus } = this.props
		const { reservation_items_total = 0,
			campaign_items_total = 0,
			extended_business_items_total = 0 } = count
		if ((reservation_items_total + campaign_items_total + extended_business_items_total) <= 0) {
			Modal.error({ title: '请先勾选需要申请GR的订单/活动' });
			return false
		}
		if (editServiceRateStatus) {
			Modal.error({ title: "请先点击确认或取消修改服务费率，然后再提交" })
			return false
		}
		if (Object.values(errorList).some(boolean => !boolean)) {
			Modal.error({ title: "存在输入项有误的情况，请检查后提交" })
			return false
		}
		if (baseDetail.need_supplement_attachments == 1) {
			if (supplementAttachmentsList.length > 0) {
				this.props.actions.addGRAttachment(this.getSumbitFileParam()).then((res) => {
					setHistoryPush(2)
				})
			} else {
				Modal.error({ title: "请上传需要补充上传的结案附件" })
			}
		} else {
			setHistoryPush(2)
		}
	}
	lastStep = () => {
		const { setHistoryPush, goodsReceipt: { baseDetail }, supplementAttachmentsList } = this.props
		if (baseDetail.need_supplement_attachments == 1 && supplementAttachmentsList.length > 0) {
			this.props.actions.addGRAttachment(this.getSumbitFileParam())
		}
		setHistoryPush(0)
	}
	saveDraft = () => {
		const { goodsReceipt: { baseDetail }, supplementAttachmentsList } = this.props
		if (baseDetail.need_supplement_attachments == 1 && supplementAttachmentsList.length > 0) {
			this.props.actions.addGRAttachment(this.getSumbitFileParam())
		}
		this.props.history.push(this.props.GRListUrl)
	}
	//提交附件
	getSumbitFileParam = (value) => {
		const { supplementAttachmentsList } = this.props
		return {
			gr_id: qs.parse(window.location.search.slice(1)).gr_id,
			type: 1,
			attachments: supplementAttachmentsList
		}
	}
	render() {
		const { goodsReceipt } = this.props
		const { GRItemListStatistic = {} } = goodsReceipt
		const { purchase = {}, purchase_with_service_fee = {} } = GRItemListStatistic
		function divMoneyBox(title, value) {
			return <div>
				<div className="money-title">{title}</div>
				<div className="money-value">¥{value}</div>
			</div>
		}
		return (
			<div className="second-statistics">
				<div className="confirm-fixed">
					<div className="purchase-price">
						<div>
							<div>采购价</div>
							<div>总计：<a>{purchase.total_money}</a></div>
						</div>
						<div className="symbol">=</div>
						{divMoneyBox("预约订单", purchase.reservation_items_total_money)}
						<div className="symbol">+</div>
						{divMoneyBox("微闪投订单", purchase.campaign_items_total_money)}
						<div className="symbol">+</div>
						{divMoneyBox("公司拓展业务", purchase.extended_business_items_total_money)}
					</div>
					<div>
						<Divider type="vertical" className="divider-line" />
					</div>
					<div className="purchase-price">
						<div>
							<div>采购价+服务费</div>
							<div>总计：<a>{purchase_with_service_fee.total_money}</a></div>
						</div>
						<div className="symbol">=</div>
						{divMoneyBox("预约订单", purchase_with_service_fee.reservation_items_total_money)}
						<div className="symbol">+</div>
						{divMoneyBox("微闪投订单", purchase_with_service_fee.campaign_items_total_money)}
						<div className="symbol">+</div>
						{divMoneyBox("公司拓展业务", purchase_with_service_fee.extended_business_items_total_money)}
					</div>

				</div>
				<div className="footer-button">
					<div>
						<Button
							className="last-step"
							onClick={this.lastStep}
						>
							上一步
					</Button>
					</div>
					<div>
						<Button style={{ marginRight: 20 }} onClick={this.saveDraft}>存为草稿</Button>
						<Button type="primary"
							onClick={this.nextStep}
							className="next-step"
						>
							下一步
					</Button>
					</div>
				</div>
			</div>

		);
	}
}

export default withRouter(Statistics);
