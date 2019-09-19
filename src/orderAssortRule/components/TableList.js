import React from 'react';
import { Table } from "antd"
import EditOrder from './EditOrder'
const TableList = props => {
	const { data, pagination } = props
	const paginationConfig = {
		current: 1,
		pageSize: 1,
		...pagination,
	}
	const columns = [
		{
			title: 'BP',
			dataIndex: 'BP',
			align: 'center',
			key: 'BP',
		},
		{
			title: '所属大区',
			dataIndex: 'age',
			align: 'center',
			key: 'age',
		},
		{
			title: '是否参与随机分配',
			dataIndex: 'ccc2',
			align: 'center',
			key: 'ccc2',
			render: (text, record) => text ? '是' : '否'
		},
		{
			title: '接单品牌范围',
			dataIndex: 'address2',
			align: 'center',
			key: 'address2',
		}, {
			title: '操作',
			dataIndex: 'address',
			align: 'center',
			key: 'address',
			render: (text, record) => <div className='table-operate'>
				<EditOrder text={'查看'} /> | <EditOrder text={'操作'} />
			</div>
		},
	];
	return <Table
		dataSource={data}
		columns={columns}
		bordered
		pagination={paginationConfig}
	/>
}
export default TableList
