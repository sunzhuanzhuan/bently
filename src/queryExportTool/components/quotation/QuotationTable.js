import React, { Component } from 'react';
import { Table, Icon, Dropdown, Modal, Menu } from 'antd';
import { Link } from "react-router-dom";

class ExportBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			iconPoint: false
		};
	}
	changePoint = () => {
		const { iconPoint } = this.state
		this.setState({
			iconPoint: !iconPoint
		})
	}
	render() {
		const { iconPoint } = this.state
		const { content } = this.props
		return (
			<div style={{ float: "right" }} >
				<Dropdown overlay={content} onVisibleChange={this.changePoint} trigger={['click']}>
					<a>
						导出<Icon type={iconPoint ? "up" : "down"} />
					</a>
				</Dropdown>
			</div >
		);
	}
}




class QuotationTable extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { quotationList={}, paginationConfig, isLoading } = this.props
		const columns = [{
			title: '报价单ID',
			dataIndex: 'id',
			key: 'id',
		}, {

			title: '报价单名称',
			dataIndex: 'name',
			key: 'name',
			render: (text, record) => {
				return <Link to={`/accountList/quotationManage/detail?quotation_id=${record.id}`}>
					{record.name}
				</Link>
			}
		}, {

			title: '平台',
			dataIndex: 'platform',
			key: 'platform',
		},
		{
			// title: '账号数量',
			// children: [{
			title: '账号总数',
			dataIndex: 'accountCount',
			key: 'accountCount',

			width: 80,
		}, {
			title: '所属公司',
			dataIndex: 'companyName',
			key: 'companyName',

			render: (text, record) => record.companyName ? record.companyName : "无"
		}, {
			align: "center",
			title: '创建时间',
			dataIndex: 'createdAt',
			key: 'createdAt',
			width: 190,
		}, {

			title: '创建人',
			dataIndex: 'creatorName',
			key: 'creatorName',
		}, {
			align: "center",
			title: '操作',
			dataIndex: 'status',
			key: 'status',
			width: 140,
			render: (text, record) => {
				const url = `/accountList/downloadCenter`
				const historyUrl = url + `?keyword=${record.name}&company_id=${record.company_id}&company_name=${record.company_name}`
				const content = <Menu>
					<Menu.Item>
						<div className="quotation-table-action-content" onClick={() => this.props.exportNew(record.id, url)}>导出最新</div>
					</Menu.Item>
					<Menu.Item>
						<Link to={historyUrl}>
							<div className="quotation-table-action-content">导出历史</div>
						</Link>
					</Menu.Item>

				</Menu>

				return <div style={{ padding: "0px 9px" }}>
					<a href={`/accountList/quotaList/1?quotation_id=${record.id}&&quotation_name=${record.name}`}>添加账号</a>
					<ExportBox content={content} />
				</div>
			}
		}]
		return (
			<Table dataSource={quotationList.rows}
				loading={isLoading}
				columns={columns}
				bordered rowKey={record => record.id}
				pagination={{
					...paginationConfig,
					total: quotationList.total,
					current: quotationList.page,
					pageSize: Number(quotationList.pageSize || 10)
				}}
			/>
		);
	}
}

export default QuotationTable;
