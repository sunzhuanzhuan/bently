
import React, { Component } from 'react'
import { Table, Button } from "antd";
import PopoverPure from "./PopoverPure";
import selectMap from "../../../constants/SelectMap";
import moment from "moment";
import "./TableByType.less"
import { urlPathMap, detectionUrl } from "../../../constants/urlPathMap";

class TableByType extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	//单选操作
	onSelectChange = (item, seleced) => {
		if (seleced) {
			this.props.addOrdersOperate([item.order_id], 2, 1)
		} else {
			this.props.removeOrdersOperate([item.order_id], 2, 1)
		}
	}
	//全选操作
	onSelectAllChange = (seleced, list, changeRows) => {
		if (seleced) {
			const ids = list.map(one => one.order_id)
			this.props.addOrdersOperate(ids, 2, changeRows.length)
		} else {
			const ids = changeRows.map(one => one.order_id)
			this.props.removeOrdersOperate(ids, 2, changeRows.length)
		}
	}
	render() {
		const { goodsReceipt, poItemCampaignList } = this.props
		const { orderSelectedList: { campaignList = [] }, baseDetail } = goodsReceipt
		const { old_b_host } = baseDetail

		//微闪投table列
		const ampaignItemColumns = [{
			title: '订单ID',
			dataIndex: 'order_id',
			key: 'order_id',
			render: (text, record) => <a
				target="_blank"
				href={detectionUrl(old_b_host, record.order_id, record.formatted_start_time, record.formatted_end_time)}>
				{record.order_id}
			</a>
		}, {
			title: 'GR申请状态',
			dataIndex: 'gr_order_status',
			key: 'gr_order_status',
			render: (text, record) => <div>
				<div>{selectMap.applystateGR[(record.gr_order_status && record.gr_order_status || 0).toString()]}</div>
				{record.gr_order_status == 2 ? <PopoverPure cannot_gr_reason={record.cannot_gr_reason} /> : null}
			</div>
		}, {
			title: "活动名称",
			dataIndex: 'campaign_name',
			key: 'campaign_name',
			render: (text, record) => <a
				target="_blank"
				href={urlPathMap(old_b_host, record.campaign_id).campaignUrl}
			>{record.campaign_name}</a>
		}, {
			title: '账号名称',
			dataIndex: 'weibo_name',
			key: 'weibo_name',
		}, {
			title: '平台',
			dataIndex: 'platform_name',
			key: 'platform_name',
		}, {
			title: '所属项目',
			dataIndex: 'project_name',
			key: 'project_name',
		}, {
			title: '订单状态',
			dataIndex: 'status_display',
			key: 'status_display',
		}, {
			title: '质检状态',
			dataIndex: 'qc_status_display',
			key: 'qc_status_display',
		}]
		const rowSelectionParam = {
			selectedRowKeys: [...campaignList],
			onSelect: this.onSelectChange,
			onSelectAll: this.onSelectAllChange,
			getCheckboxProps: record => ({
				disabled: record.gr_order_status != 1 && record.is_selected == 2,
				name: record.name,
			})
		}

		return (
			<Table
				className="table-by-type"
				dataSource={poItemCampaignList && poItemCampaignList.items}
				columns={ampaignItemColumns}
				rowSelection={rowSelectionParam}
				pagination={false}
				rowKey={record => record.order_id}
			/>
		);
	}
}

export default TableByType;
