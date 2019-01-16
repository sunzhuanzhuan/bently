import React from 'react'
import LazyLoad from 'react-lazyload';
import MediaInfo from "../common/MediaInfo";
import { StatusAB } from "../common/AccountInfos";
import platform from "../../constants/platform"
import { Table } from 'antd';
import './AccountTable/index.less'

export const SearchResultTable = (props) => {
	const { pagination = {}, accounts } = props.accountList
	const columns = [{
		title: '账号昵称',
		dataIndex: 'name',
		align: "center",
		key: 'name',
		render: (text, record) => {
			return <span>
				{record.base.sns_name}
			</span>
		}
	}, {
		title: '所属平台',
		dataIndex: 'age',
		align: "center",
		key: 'age',
		render: (text, record) => {
			return <span >
				{platform.platformView[record.platform_id && record.platform_id.toString()]}
			</span>
		}
	}, {
		title: '账号ID',
		dataIndex: 'sns_id',
		align: "center",
		key: 'sns_id',
		render: (text, record) => {
			return <span>
				{record.base.sns_id}
			</span>
		}
	}, {
		title: 'account_id',
		dataIndex: 'account_id',
		align: "center",
		key: 'account_id',
		render: (text, record) => {
			return <span>
				{record.base.account_id}
			</span>
		}
	}, {
		title: '执行类型',
		dataIndex: 'is_famous',
		align: "center",
		key: 'is_famous',
		render: (text, record) => {
			return <span>
				{record.base.is_famous == 1 ? "预约" : record.base.is_famous == 2 ? "微闪投" : ""}
			</span>
		}
	}, {
		title: '媒介经理',
		dataIndex: 'media_manager',
		align: "center",
		key: 'media_manager',
		render: (text, record) => {
			return <span>
				<LazyLoad once overflow>
					<MediaInfo user_id={record.base.user_id} isShowPopover={false} />
				</LazyLoad>
				{/* <MediaInfo user_id={record.base.user_id} isShowPopover={false} /> */}
			</span>
		}
	}, {
		title: '上下架状态',
		dataIndex: 'a_status',
		align: "center",
		key: 'a_status',
		render: (text, record) => {
			const { on_shelf_status = {} } = record.base
			//const { b_off_shelf_reason_strings = [], a_off_shelf_reason_strings = [], b_on_shelf_status, a_on_shelf_status } = on_shelf_status
			return <span>
				<StatusAB status={on_shelf_status && on_shelf_status.a_on_shelf_status} reason={on_shelf_status && on_shelf_status.a_off_shelf_reason_strings || []} title="A" />
				&nbsp;&nbsp;<StatusAB status={on_shelf_status && on_shelf_status.b_on_shelf_status} reason={on_shelf_status && on_shelf_status.b_off_shelf_reason_strings || []} title="B" />
			</span>
		}
	}, {
		title: '是否在库',
		dataIndex: 'exist_status',
		align: "center",
		key: 'exist_status',
		render: (text, record) => {
			return <span>
				{record.base.not_exist == 1 ? <span style={{ color: "#e46c09" }}>不在库</span> : "在库"}
			</span>
		}
	}];
	return (
		<Table
			className="account-table-wxy-list searchResultTable"
			columns={columns}
			dataSource={accounts}
			rowKey={(record, index) => record.account_id && record.account_id || index}
			pagination={props.searchParams.query_type == 1 ? {
				current: pagination.page,
				total: pagination.total,
				onChange: (page) => props.batchSearch(props.searchParams, page),
				pageSize: 20
			} : false}
			loading={props.loading}
		/>
	)
}
