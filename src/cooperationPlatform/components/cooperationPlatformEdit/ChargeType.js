import React, { Component } from 'react'
import { Table } from 'antd';

class ChargeType extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const dataSource = [{
			ID: '1',
			name: '胡彦斌',
			age: 32,
			address: '西湖区湖底公园1号'
		}, {
			ID: '2',
			name: '胡彦祖',
			age: 42,
			address: '西湖区湖底公园1号'
		}];

		const columns = [{
			title: '收费类型编号',
			dataIndex: 'ID',
			key: 'ID',
		}, {
			title: '平台收费类型名称',
			dataIndex: 'ID平台收费类型名称',
			key: 'ID平台收费类型名称',
		}, {
			title: '服务费比例%',
			dataIndex: 'ID服务费比例%',
			key: 'ID服务费比例%',
		}, {
			title: '创建时间',
			dataIndex: 'ID创建时间',
			key: 'ID创建时间',
		}, {
			title: '最后一次修改时间',
			dataIndex: 'ID最后一次修改时间',
			key: 'ID最后一次修改时间',
		},]
		return (
			<div style={{ paddingLeft: "10%" }}>
				<Table dataSource={dataSource} columns={columns} pagination={false} bordered={true} />
			</div>
		);
	}
}

export default ChargeType;
