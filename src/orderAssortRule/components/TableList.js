import React from 'react';
import { Table } from "antd"
import EditOrder from './EditOrder'
const TableList = props => {
	const { listBP, pagination, setModal, actions } = props
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
			dataIndex: 'regionNames',
			align: 'center',
			key: 'regionNames',
			render: (text = []) => text.map((one, index) => `${one}${index < text.length - 1 ? '、' : ''}`)
		},
		{
			title: '是否参与随机分配',
			dataIndex: 'isCanDistributionInAll',
			align: 'center',
			key: 'isCanDistributionInAll',
			render: (text, record) => text == 1 ? '是' : '否'
		},
		{
			title: '接单品牌范围',
			dataIndex: 'brandRelations',
			align: 'center',
			key: 'brandRelations',
			render: (text = [], record) => text.map((one, index) => text ? `${one.brandName}（${one.companyName}）${index < text.length - 1 ? '、' : ''}` : '-')
		}, {
			title: '操作',
			dataIndex: 'operate',
			align: 'center',
			key: 'operate',
			render: (text, record) => <div className='table-operate'>
				<a onClick={() => setModal(true, {
					title: '查看',
					content: <EditOrder actions={actions} setModal={setModal} bpId={record.bpId} />
				})}>查看</a>	|
				<a onClick={() => setModal(true, {
					title: '编辑',
					content: <EditOrder isEdit={true} setModal={setModal} actions={actions} bpId={record.bpId} />
				})}> 编辑</a>
			</div>
		},
	];
	return <Table
		dataSource={listBP && listBP.list}
		columns={columns}
		bordered
		pagination={paginationConfig}
	/>
}
export default TableList
