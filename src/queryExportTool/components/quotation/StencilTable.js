import React, { Component } from 'react';
import { Table, Popover } from 'antd';
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


class StencilTable extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { stencilList, paginationConfig, isLoading } = this.props
		const columns = [
			{
				title: '模版名称',
				dataIndex: 'name',
				key: 'name',
			}, {
				title: '模版简介',
				dataIndex: 'introduction',
				key: 'introduction',
				width: 300,
				render: (text, record) => <div>
					{record.introduction && record.introduction.length > 40 ?
						<Popover
							content={<div className="introduction-box" >
								{record.introduction}
							</div>}
							getPopupContainer={() => document.querySelector('.query-export-tool')}
						>
							<div>{record.introduction.slice(0, 38)}...</div>
						</Popover> : <span>{record.introduction && record.introduction.slice(0, 40)}</span>}
				</div>
			}, {
				title: '所属公司',
				dataIndex: 'company_name',
				key: 'company_name',
				render: (text, record) => record.company_name ? record.company_name : "无"
			}, {
				title: '使用次数',
				dataIndex: 'used_times',
				key: 'used_times',
			}, {
				title: '创建人',
				dataIndex: 'creator_name',
				key: 'creator_name',
			}, {
				title: '创建时间',
				dataIndex: 'created_at',
				key: 'created_at',
				width: "190",
				align: "center",
			}, {
				title: '操作',
				dataIndex: 'action',
				align: "center",
				key: 'action',
				width: "70",
				render: (text, record) => {
					return <div>
						{record.id != 1 ? <a onClick={() => { this.props.editTemple(record.id) }}>修改</a> : null}
					</div>
				}
			}]
		return (
			<Table dataSource={stencilList.rows}
				loading={isLoading} columns={columns}
				bordered
				rowKey={record => record.id}
				pagination={{
					...paginationConfig,
					total: stencilList.pagination && stencilList.pagination.total,
					current: stencilList.pagination && stencilList.pagination.page,
					pageSize: stencilList.pagination && stencilList.pagination.page_size
				}}
			/>
		);
	}
}

export default StencilTable;
