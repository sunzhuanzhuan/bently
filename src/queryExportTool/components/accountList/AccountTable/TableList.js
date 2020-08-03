import React, { Component } from 'react';
import { Table } from 'antd';
class TableList extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const dataSource = [{
			key: '1',
			name: '胡彦斌',
			age: 32,
			address: '西湖区湖底公园1号'
		}, {
			key: '2',
			name: '胡彦祖',
			age: 42,
			address: '西湖区湖底公园1号'
		}];

		const columns = [{
			title: '账号昵称',
			dataIndex: 'name',
			key: 'name',
		}, {
			title: '所属平台',
			dataIndex: 'platformId',
			key: 'platformId',
		}, {
			title: '账号ID',
			dataIndex: 'accountId12',
			key: 'accountId12',
		}, {
			title: 'accountId',
			dataIndex: 'accountId',
			key: 'accountId',
		}, {
			title: '执行类型',
			dataIndex: 'type',
			key: 'type',
		}, {
			title: '媒介经理',
			dataIndex: 'manage',
			key: 'manage',
		}, {
			title: '上下架状态',
			dataIndex: 'updown',
			key: 'updown',
		}, {
			title: '是否在库',
			dataIndex: 'isin',
			key: 'isin',
		}];

		return (
			<Table dataSource={dataSource} columns={columns} />

		);
	}
}

export default TableList;
