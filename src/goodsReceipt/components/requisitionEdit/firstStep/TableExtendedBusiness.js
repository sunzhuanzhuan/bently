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
			this.props.addOrdersOperate([item.business_id], 3, 1)
		} else {
			this.props.removeOrdersOperate([item.business_id], 3, 1)
		}
	}
	//全选操作
	onSelectAllChange = (seleced, list, changeRows) => {
		if (seleced) {
			const ids = list.map(one => one.business_id)
			this.props.addOrdersOperate(ids, 3, changeRows.length)
		} else {
			const ids = changeRows.map(one => one.business_id)
			this.props.removeOrdersOperate(ids, 3, changeRows.length)
		}
	}
	render() {
		const { goodsReceipt, poItemExpandBusinessList } = this.props
		const { orderSelectedList: { expandBusinessList = [] }, baseDetail } = goodsReceipt
		const { old_b_host } = baseDetail
		const extendedBusinessColums = [
			{
				title: '活动ID',
				dataIndex: 'business_id',
				key: 'business_id',
				render: (text, record) => <a
					target="_blank"
					href={urlPathMap(old_b_host, record.business_id).businessUrl}>
					{record.business_id}
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
				dataIndex: 'business_name',
				key: 'business_name',
				render: (text, record) => <a
					target="_blank"
					href={urlPathMap(old_b_host, record.business_id).businessUrl}
				>{record.business_name}</a>
			}, {
				title: '活动类型',
				dataIndex: 'business_type_display',
				key: 'business_type_display',
			},
			{
				title: '所属项目',
				dataIndex: 'project_name',
				key: 'project_name',
			},
			{
				title: '活动状态',
				dataIndex: 'business_status_display',
				key: 'business_status_display',
			}
		]
		const rowSelectionParam = {
			selectedRowKeys: [...expandBusinessList],
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
				dataSource={poItemExpandBusinessList && poItemExpandBusinessList.items}
				columns={extendedBusinessColums}
				rowSelection={rowSelectionParam}
				pagination={false}
				rowKey={record => record.business_id}
			/>
		);
	}
}

export default TableByType;
