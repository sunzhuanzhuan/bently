import React, { Component } from 'react'
import { Button, Modal, Badge, message } from "antd";
import { withRouter, Link } from "react-router-dom";
import TagList from "../../../base/TagList";
import "./index.less"
import qs from "qs";
class Statistics extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			reservation_items: [],
			campaign_items: [],
			extended_business_items: [],
			submitReviewLoading: false
		};
	}
	onCancel = () => {
		this.setState({
			visible: false
		})
	}
	saveDraft = () => {
		this.getSumbitFileParam()
		this.props.history.push(this.props.GRListUrl)
	}
	lastStep = () => {
		const { setHistoryPush, } = this.props
		setHistoryPush(1)
		this.getSumbitFileParam()
	}
	//审核
	saveSubmitReview = () => {
		const { editTotalMountDStatus, setHistoryPush } = this.props
		const { goodsReceipt: { GRItemListStatistic: { count = 0 } } } = this.props
		const { reservation_items_total = 0,
			campaign_items_total = 0,
			extended_business_items_total = 0 } = count
		if ((reservation_items_total + campaign_items_total + extended_business_items_total) <= 0) {
			Modal.error({
				title: '请先勾选需要申请GR的订单/活动',
				okText: '确认，前往勾选',
				onOk() {
					setHistoryPush(0)
				}
			});
			return false
		}
		if (editTotalMountDStatus) {
			Modal.error({ title: "请先点击确认或取消修改GR总金额，然后再提交" })
			return false
		}
		this.getSumbitFileParam(true)
	}
	//提交附件
	getSumbitFileParam = (isShowModal = false) => {
		const { commonAttachments } = this.props
		if (commonAttachments.length > 0) {
			const data = {
				gr_id: qs.parse(window.location.search.slice(1)).gr_id,
				type: 2,
				attachments: commonAttachments,//附件id集合，英文逗号隔开
			}
			this.props.actions.addGRAttachment(data).then(() => {
				if (isShowModal) { this.submitReview() }
			})
		} else {
			if (isShowModal) { this.submitReview() }
		}

	}
	submitReview = () => {
		const { GRSubmit } = this.props.actions
		const { goodsReceipt: { baseDetail } } = this.props
		const { is_close_balance } = baseDetail
		if (is_close_balance > 0) {
			this.setState({ submitReviewLoading: true })
			GRSubmit({ gr_id: qs.parse(window.location.search.slice(1)).gr_id }).then((res) => {
				if (res.data.submit_success == 1) {
					this.props.history.push(this.props.GRListUrl)
				} else {
					const { cannot_submitted_items = {} } = res.data
					const { reservation_items = ["123"],
						campaign_items = ["123"],
						extended_business_items = ["123"] } = cannot_submitted_items
					this.setState({
						visible: true,
						reservation_items: reservation_items,
						campaign_items: campaign_items,
						extended_business_items: extended_business_items
					})
				}
				this.setState({ submitReviewLoading: false })
			})
		} else {
			Modal.error({ title: "请确认是否要关闭执行凭证余额" })
		}
	}
	onOk = () => {
		const { removeOrder, getGRItemListStatistic, getBaseDetail } = this.props.actions
		const { reservation_items = [],
			campaign_items = [],
			extended_business_items = [], } = this.state
		const gr_id = qs.parse(window.location.search.slice(1)).gr_id
		removeOrder({
			gr_id: gr_id,
			reservation_item_ids: reservation_items.join(","),
			campaign_item_ids: campaign_items.join(","),
			extended_business_ids: extended_business_items.join(","),
		}).then(() => {
			this.onCancel()
			getGRItemListStatistic({ gr_id: gr_id })
			getBaseDetail({
				gr_id: gr_id,
				with_purchase_statistic: 1
			})
			message.success("删除成功")
		})
	}
	render() {
		const { visible,
			reservation_items = [],
			campaign_items = [],
			extended_business_items = [],
			submitReviewLoading } = this.state
		const { errorIsExist } = this.props
		function getOrder(name, list = []) {
			return list.length > 0 ? <div style={{ margin: "20px 10px", clear: "both" }}>
				<div><Badge status="default" />{name}</div>
				<TagList list={list} />
			</div> : null
		}
		return (
			<div >
				<div className="footer-button-flex">
					<div>
						<Button onClick={this.lastStep}>上一步</Button>
					</div>
					<div>
						<Button onClick={this.saveDraft} style={{ margin: "0px 20px" }}>存为草稿</Button>
						<Button type="primary" onClick={errorIsExist ? "" : this.saveSubmitReview} loading={submitReviewLoading}>提交审核</Button>
					</div>
				</div>
				<Modal
					visible={visible}
					title="删除不可提交订单"
					onCancel={() => { this.setState({ visible: false }) }}
					onOk={this.onOk}
					okText="确认删除"
				>
					<div>
						<div style={{ color: "#f00" }}>
							如下订单已被其他GR申请单选择并提交审核，是否确认从本申请单删除这些订单？
						</div>
						{getOrder("预约订单", reservation_items)}
						{getOrder("微闪投订单", campaign_items)}
						{getOrder("公司拓展业务", extended_business_items)}
					</div>

				</Modal>
			</div>

		);
	}
}

export default withRouter(Statistics);
