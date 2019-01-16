import React, { Component } from 'react'
import { Button, Modal, message } from "antd";
import { withRouter } from "react-router-dom";
import "./Statistics.less"
class Statistics extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	nextStep = () => {
		const { goodsReceipt: { GRItemListStatistic: { countNumber } }, setHistoryPush, actions } = this.props
		if (countNumber > 0) {
			setHistoryPush(1)
		} else {
			Modal.error({ title: '请先勾选需要申请GR的订单/活动' });
		}
	}
	saveDraft = () => {
		this.props.history.push(this.props.GRListUrl)
	}
	render() {
		const { goodsReceipt = {} } = this.props
		const { GRItemListStatistic } = goodsReceipt
		const { count = {}, countNumber } = GRItemListStatistic
		const { reservation_items_total = 0,
			campaign_items_total = 0,
			extended_business_items_total = 0 } = count
		return (
			<div className="first-statistics">
				<div style={{ textAlign: "left" }}>
					<div className="purchase-title">当前已选择的订单/活动统计</div>
					<div className="confirm-fixed">
						<div className="purchase-price">
							<div>预约订单<a>{reservation_items_total}个</a></div>
						</div>
						<div className="purchase-price">
							<div>微闪投订单<a>{campaign_items_total}个</a></div>
						</div>
						<div className="purchase-price">
							<div>公司拓展业务<a>{extended_business_items_total}个</a></div>
						</div>
					</div>
				</div>
				<div>
					<Button className="draft-button" onClick={this.saveDraft}>存为草稿</Button>
					<Button disabled={countNumber <= 0} type="primary" onClick={() => this.nextStep(1)} className="next-step">下一步</Button>
				</div>
			</div>

		);
	}
}

export default withRouter(Statistics);
