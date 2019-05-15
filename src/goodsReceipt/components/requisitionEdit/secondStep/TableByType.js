import React, { Component } from 'react'
import { Table, message } from "antd";
import EditTableCell from "./EditTableCell";
import EditText from "./EditText";
import qs from "qs";
import MarkMessage from "../../common/MarkMessage";
import { urlPathMap, detectionUrl } from "../../../constants/urlPathMap";
import Scolltable from "../../../../components/Scolltable";
import NumeralFormat from "../../common/NumeralFormat";

class TableByType extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	onCellChange = (item_id, dataIndex) => {
		return (value) => {
			const { actions, tableType } = this.props
			const gr_id = qs.parse(window.location.search.slice(1)).gr_id
			window.updating = true
			actions.updateGRItemInfo({
				gr_id: gr_id,
				item_type: tableType,
				item_id: item_id,
				key: dataIndex,
				value: value,
				[dataIndex]: value
			}).then(() => {
				if (dataIndex == "purchase_price" || dataIndex == "purchase_price_with_service_fee") {
					actions.editErrorList({ [`${item_id}_purchase_price_with_service_fee`]: true })
					actions.getGRItemListStatistic({ gr_id: gr_id })
				}
			}).catch((err) => {
				message.error(err && err.errorMsg)
			}).finally(() => window.updating = false)
		};
	}

	render() {
		const gr_id = qs.parse(window.location.search.slice(1)).gr_id
		const { tableType, actions, list = [], tableKeyId = "order_id", goodsReceipt: { baseDetail } } = this.props
		const { old_b_host, service_fee_rate, formatted_start_time, formatted_end_time } = baseDetail
		const orderColumn = [{
			title: '订单ID',
			dataIndex: 'order_id',
			key: 'order_id',
			width: 80,
			fixed: 'left',
			render: (text, record) => <a
				target="_blank"
				href={tableType == 1 ?
					urlPathMap(old_b_host, record.order_id).orderResUrl
					: detectionUrl(old_b_host, record.order_id, record.formatted_start_time, record.formatted_end_time)}
			>
				{record.order_id}
			</a>
		}, {
			title: tableType == 1 ? "需求名称" : "活动名称",
			dataIndex: 'addrs2',
			key: 'addrs2',
			fixed: 'left',
			width: 80,
			render: (text, record) => tableType == 1 ? <a
				target="_blank"
				href={urlPathMap(old_b_host, record.order_id).reservationUrl}
			>{record.requirement_name} </a> :
				<a
					target="_blank"
					href={urlPathMap(old_b_host, record.campaign_id).campaignUrl}
				> {record.campaign_name}</a>
		}, {
			title: '账号名称',
			dataIndex: 'weibo_name',
			key: 'weibo_name',
			fixed: 'left',
			width: 102
		}, {
			title: '平台',
			dataIndex: 'platform_name',
			key: 'platform_name',
			align: "center"
		}, {
			title: '所属项目',
			dataIndex: 'project_name',
			key: 'project_name',
		}]
		const reservationMoneyColumn = [{
			title: '订单金额',
			dataIndex: 'add26',
			key: 'add26',
			width: 160,
			align: "center",
			render: (text, record) => {
				const { accept_reservation_chosen_price, inspection_remaining_amount, inspection_deducted_amount } = record
				return <span style={{ textAlign: "left" }}>
					<div>成本价：<div style={{ float: "right" }}><NumeralFormat value={accept_reservation_chosen_price && accept_reservation_chosen_price.open_cost_price} /></div></div>
					<div>执行价：<div style={{ float: "right" }}><NumeralFormat value={accept_reservation_chosen_price && accept_reservation_chosen_price.deal_price} /></div></div>
					<div>质检退款：<div style={{ float: "right" }}><NumeralFormat value={inspection_deducted_amount && inspection_deducted_amount.deal_price} /></div></div>
					<div>结算金额：<div style={{ float: "right" }}><NumeralFormat value={inspection_remaining_amount && inspection_remaining_amount.deal_price} /></div></div>
				</span>
			}
		}, {
			title: <span>采购价<MarkMessage content={<div>可修改，请填写 最终会支付给KOL的费用</div>} /></span>,
			dataIndex: 'purchase_price',
			key: 'purchase_price',
			width: 130,
			align: "center",
			render: (text, record) => {
				const { accept_reservation_chosen_price } = record
				return <EditTableCell
					value={text}
					actions={actions}
					itemId={record.item_id}
					itemType='purchase_price'
					onChange={this.onCellChange(record.item_id, 'purchase_price')}
					isOperated={accept_reservation_chosen_price && accept_reservation_chosen_price.open_cost_price != text}
				/>
			}

		}]
		const ampaignItemMoneyColumn = [{
			title: '订单金额',
			dataIndex: 'add26',
			key: 'add26',
			align: "center",
			width: 150,
			render: (text, record) => {
				//const { accept_reservation_chosen_price = {}, inspection_remaining_amount = {} } = record
				return <span style={{ textAlign: "left" }}>
					<div>成本价：<div style={{ float: "right" }}><NumeralFormat value={record.price} /></div></div>
				</span >
			}
		}, {
			title: <span>采购价<MarkMessage content={<div>可修改，请填写 最终会支付给KOL的费用</div>} /></span>,
			dataIndex: 'purchase_price',
			key: 'purchase_price',
			width: 130,
			align: "center",
			render: (text, record) => <EditTableCell
				value={text}
				actions={actions}
				itemId={record.item_id}
				itemType='purchase_price'
				onChange={this.onCellChange(record.item_id, 'purchase_price')}
				isOperated={record.price != text}
			/>

		}]
		const priceColumn = [
			{
				title: '采购价+服务费',
				dataIndex: 'purchase_price_with_service_fee',
				key: 'purchase_price_with_service_fee',
				render: (text, record) => <EditTableCell key={text}
					value={text}
					actions={actions}
					itemId={record.item_id}
					itemType='purchase_price_with_service_fee'
					onChange={this.onCellChange(record.item_id, 'purchase_price_with_service_fee')}
					isOperated={record.purchase_price_with_service_fee != Math.round((service_fee_rate/100 + 1) * record.purchase_price)}
				/>
			}, {
				title: '采购价+服务费+税',
				dataIndex: 'purchase_price_with_service_fee_and_tax',
				key: 'purchase_price_with_service_fee_and_tax',
				render: (text, record) => <NumeralFormat value={text} />
			}, {
				title: '备注信息',
				dataIndex: 'comment',
				key: 'comment',
				align: "center",
				width: 140,
				render: (text, record) => <EditText
					value={text}
					onChange={this.onCellChange(record.item_id, 'comment')}
					isOperated={text ? true : false}
				/>
			}
		]
		const expandBusinessColumn = [
			{
				title: '活动ID',
				dataIndex: 'business_id',
				key: 'business_id',
				width: 80,
				render: (text, record) => <a
					target="_blank"
					href={urlPathMap(old_b_host, record.business_id).businessUrl}
				>
					{record.business_id}
				</a>
			}, {
				title: '活动名称',
				dataIndex: 'business_name',
				key: 'business_name',
				width: 100,
				render: (text, record) => <a
					target="_blank"
					href={urlPathMap(old_b_host, record.business_id).businessUrl}
				>
					{record.business_name}
				</a>
			}, {
				title: '活动类型',
				dataIndex: 'business_type_display',
				key: 'business_type_display',
			}, {
				title: '所属项目',
				dataIndex: 'project_name',
				key: 'project_name',
			}, {
				title: '活动金额',
				dataIndex: 'addrs',
				key: 'addrs',
				width: 160,
				align: "center",
				render: (text, record) => <span style={{ textAlign: "left" }}>
					<div>成本价：<div style={{ float: "right" }}><NumeralFormat value={record.business_real_cost} /></div></div>
					<div>活动费用：<div style={{ float: "right" }}><NumeralFormat value={record.business_cost} /></div></div>
				</span>
			}, {
				title: <span>采购价<MarkMessage content={<div>可修改，请填写 最终会支付给KOL的费用</div>} /></span>,
				dataIndex: 'purchase_price',
				key: 'purchase_price',
				width: 130,
				align: "center",
				render: (text, record) => <EditTableCell
					value={text}
					actions={actions}
					itemId={record.item_id}
					itemType='purchase_price'
					onChange={this.onCellChange(record.item_id, 'purchase_price')}
					isOperated={record.business_real_cost != text}
				/>

			}
		]
		const columns = {
			1: [...orderColumn, ...reservationMoneyColumn, ...priceColumn],
			2: [...orderColumn, ...ampaignItemMoneyColumn, ...priceColumn],
			3: [...expandBusinessColumn, ...priceColumn]
		}
		return (
			<Scolltable scrollClassName='.ant-table-body' >
				<Table
					scroll={{ x: 1129 }}
					style={{ marginTop: 20 }}
					dataSource={list}
					columns={columns[tableType]}
					rowKey={record => record.item_id + gr_id + record.purchase_price}
					pagination={false}
				/>
			</Scolltable>
		);
	}
}

export default TableByType;
