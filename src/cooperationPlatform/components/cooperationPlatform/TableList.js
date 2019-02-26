import React, { Component } from 'react'
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteModal } from "../common";
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
			title: '下单平台编号',
			dataIndex: '下单平台编号name',
			align: "center",
			key: '下单平台编号name',
		}, {
			title: '下单平台名称',
			dataIndex: 'name',
			align: "center",
			key: 'name',
		}, {
			title: '所属媒体平台',
			dataIndex: '所属媒体平台name',
			align: "center",
			key: '所属媒体平台name',
		}, {
			title: '代理商数量',
			dataIndex: '代理商数量name',
			align: "center",
			key: '代理商数量name',
			render: (record, index) => {
				return <Link to={"/config/platform/agentList"}>12</Link>
			}
		}, {
			title: '付款公司',
			dataIndex: '付款公司name',
			align: "center",
			key: '付款公司name',
		}, {
			title: '创建时间',
			dataIndex: '创建时间name',
			align: "center",
			key: '创建时间name',
		}, {
			title: '最近一次操作时间',
			dataIndex: '最近一次操作时间name',
			align: "center",
			key: '最近一次操作时间name',
		}, {
			title: '平台状态',
			dataIndex: '平台状态name',
			align: "center",
			key: '平台状态name',
		}, {
			title: '合作订单数',
			dataIndex: '合作订单数name',
			align: "center",
			key: '合作订单数name',
		}, {
			title: '操作',
			dataIndex: '操作name',
			key: '操作name',
			align: "center",
			render: (record, index) => {
				//启用状态
				const enable = 1
				return <div>
					<a href={"/config/platform/detail"} target="_blank">查看</a>
					<Link to={12} style={{ margin: "0px 4px" }}>{enable == '2' ? '停用' : '启用'}</Link>
					<a href='/config/platform/edit' target='_blank' style={{ marginRight: 4 }} >修改</a>
					{enable == 1 ? <DeleteModal /> : null}
					<div>
						<Link to={"/config/platform/agentList"}>增加修改代理商</Link>
					</div>
					<DeleteModal messageType="set" typeText="设置默认报价项" />
				</div>
			}
		}];

		return (
			<Table
				dataSource={dataSource}
				columns={columns}
				bordered={true}
				pagination={{
					current: 1,
					pageSize: 10,
					showQuickJumper: true,
					showSizeChanger: true,
					onShowSizeChange: (current, pageSize) => {
						console.log(current, pageSize);

					},
					onChange: (current, pageSize) => {
						console.log(current, pageSize);
					},
				}}
			/>
		);
	}
}

export default TableList;

