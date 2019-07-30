import React from 'react'
import LazyLoad from 'react-lazyload';
import MediaInfo from "../common/MediaInfo";
import { StatusAB } from "../common/AccountInfos";
import platform from "../../constants/platform"
import { Table } from 'antd';
import './AccountTable/index.less'

export const SearchResultTable = (props) => {
	const { current, list } = props.accountList
	const columns = [{
		title: '账号昵称',
		dataIndex: 'name',
		align: "center",
		key: 'name',
		render: (text, record) => {
			return <span>
				{record.snsName}
			</span>
		}
	}, {
		title: '所属平台',
		dataIndex: 'age',
		align: "center",
		key: 'age',
		render: (text, record) => {
			return <span >
				{platform.platformView[record.platformId && record.platformId.toString()]}
			</span>
		}
	}, {
		title: '账号ID',
		dataIndex: 'snsId',
		align: "center",
		key: 'snsId',
		render: (text, record) => {
			return <span>
				{record.snsId}
			</span>
		}
	}, {
		title: 'accountId',
		dataIndex: 'accountId',
		align: "center",
		key: 'accountId',
		render: (text, record) => {
			return <span>
				{record.accountId}
			</span>
		}
	}, {
		title: '执行类型',
		dataIndex: 'isFamous',
		align: "center",
		key: 'isFamous',
		render: (text, record) => {
			return <span>
				{record.isFamous == 1 ? "预约" : record.isFamous == 2 ? "微闪投" : ""}
			</span>
		}
	}, {
		title: '媒介经理',
		dataIndex: 'mediaManager',
		align: "center",
		key: 'mediaManager',
		render: (text, record) => {
			return <MediaInfo userId={record.userId} agentInfo={record.agentInfo} isShowPopover={false} />
		}
	}, {
		title: '上下架状态',
		dataIndex: 'aStatus',
		align: "center",
		key: 'aStatus',
		render: (text, record) => {
			const { onShelfStatus = {} } = record
			//const { bOffShelfReasonStrings = [], aOffShelfReasonStrings = [], bOnShelfStatus, aOnShelfStatus } = onShelfStatus
			return <span>
				<StatusAB status={onShelfStatus && onShelfStatus.aOnShelfStatus} reason={onShelfStatus && onShelfStatus.aOffShelfReasonStringList || []} title="A" />
				&nbsp;&nbsp;<StatusAB status={onShelfStatus && onShelfStatus.bOnShelfStatus} reason={onShelfStatus && onShelfStatus.bOffShelfReasonStringList || []} title="B" />
			</span>
		}
	}, {
		title: '是否在库',
		dataIndex: 'existStatus',
		align: "center",
		key: 'existStatus',
		render: (text, record) => {
			return <span>
				{record.notExist == 1 ? <span style={{ color: "#e46c09" }}>不在库</span> : "在库"}
			</span>
		}
	}];
	return (
		<Table
			className="account-table-wxy-list searchResultTable"
			columns={columns}
			dataSource={list}
			rowKey={(record, index) => record.accountId && record.accountId || index}
			pagination={props.searchParams.queryType == 1 ? {
				...current,
				onChange: (page) => props.batchSearch(props.searchParams, page),
			} : false}
			loading={props.loading}
		/>
	)
}
