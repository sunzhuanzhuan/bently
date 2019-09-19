import React from 'react';
import { Table } from "antd"
import EditOrder from './EditOrder'
const TableList = props => {
	const { data, pagination } = props
	const paginationConfig = {
		current: 1,
		pageSize: 50,
		...pagination,
	}
	const columns = [
		{
			title: 'BP',
			dataIndex: 'bpName',
			align: 'center',
			key: 'bpName',
		},
		{
			title: '所属大区',
			dataIndex: 'region',
			align: 'center',
			key: 'region',
		},
		{
			title: '是否参与随机分配',
			dataIndex: 'is_random',
			align: 'center',
			key: 'is_random',
			render: (text, record) => text ? '是' : '否'
		},
		{
			title: '接单品牌范围',
			dataIndex: 'address2',
			align: 'center',
			key: 'address2',
		}, {
			title: '操作',
			dataIndex: 'operate',
			align: 'center',
			key: 'operate',
			render: (text, record) => <div className='table-operate'>
				<EditOrder text={'查看'} /> | <EditOrder text={'编辑'} isEdit={true} />
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
