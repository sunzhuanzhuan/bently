import React, { Component } from 'react'
import { Table, Button } from "antd";
import PopoverPure from "./PopoverPure";
import selectMap from "../../../constants/SelectMap";
import "./TableByType.less"
import { urlPathMap } from "../../../constants/urlPathMap";
class TableByType extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	//单选操作
	onSelectChange = (item, seleced) => {
		if (seleced) {
			this.props.addOrdersOperate([item.order_id], 1, 1)
		} else {
			this.props.removeOrdersOperate([item.order_id], 1, 1)
		}
	}
	//全选操作
	onSelectAllChange = (seleced, list, changeRows) => {
		if (seleced) {
			const ids = list.map(one => one.order_id)
			this.props.addOrdersOperate(ids, 1, changeRows.length)
		} else {
			const ids = changeRows.map(one => one.order_id)
			this.props.removeOrdersOperate(ids, 1, changeRows.length)
		}
	}
	render() {
		const { goodsReceipt, poItemReserveList } = this.props
		const { orderSelectedList: { reserveList = [], }, baseDetail } = goodsReceipt
		const { old_b_host } = baseDetail
		//预约table列
		const reservationColumns = [{
			title: '订单ID',
			dataIndex: 'order_id',
			key: 'order_id',
			render: (text, record) => <a
				target="_blank"
				href={urlPathMap(old_b_host, record.order_id).orderResUrl}>
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
			title: "需求名称",
			dataIndex: 'requirement_name',
			key: 'requirement_name',
			render: (text, record) => <a
				target="_blank"
				href={urlPathMap(old_b_host, record.requirement_id).reservationUrl}>
				{record.requirement_name}
			</a>
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
		}]
		const rowSelectionParam = {
			selectedRowKeys: [...reserveList],
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
				dataSource={poItemReserveList && poItemReserveList.items}
				columns={reservationColumns}
				rowSelection={rowSelectionParam}
				pagination={false}
				rowKey={record => record.order_id}
			/>
		);
	}
}

export default TableByType;
