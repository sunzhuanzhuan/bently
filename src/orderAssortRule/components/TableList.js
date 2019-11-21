import React from 'react';
import { Table, Popover } from "antd"
import MultiClamp from 'react-multi-clamp';
import EditOrder from './EditOrder'
const CompanyList = ({ list = [] }) => {
	return list.map((item, index) => `${item.companyName}（ID：${item.companyId}，销售：${item.saleName}）${index < list.length - 1 ? '、' : ''}`)
}
const BrandList = ({ list = [] }) => {
	return list.map((one, index) => `${one.brandName}（${one.companyName}）${index < list.length - 1 ? '、' : ''}`)
}
//多行隐藏
const PopoverList = ({ title, com }) => {
	return <Popover
		content={com}
		title={title}
		overlayStyle={{ maxWidth: 400 }}
		getPopupContainer={() => document.querySelector('.order-assort-rule')}
	>
		<MultiClamp ellipsis="..." clamp={3}>
			{com}
		</MultiClamp>
	</Popover>
}
const TableList = props => {
	const { listBP, pagination, setModal, actions, saveBpAsync } = props
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
			width: 150
		},
		{
			title: '所属大区',
			dataIndex: 'regionNames',
			align: 'center',
			key: 'regionNames',
			width: 150,
			render: (text = []) => text.map((one, index) => `${one}${index < text.length - 1 ? '、' : ''}`)
		},
		{
			title: '是否参与随机分配',
			dataIndex: 'isCanDistributionInAll',
			align: 'center',
			key: 'isCanDistributionInAll',
			width: 140,
			render: (text, record) => text == 1 ? '是' : '否'
		},
		{
			title: '支持厂商',
			dataIndex: 'companyRelations',
			align: 'center',
			key: 'companyRelations',
			render: (text, record) => text ? <PopoverList
				com={<CompanyList list={text} />}
			/> : '-'
		},
		{
			title: '接单品牌范围',
			dataIndex: 'brandRelations',
			align: 'center',
			key: 'brandRelations',
			width: 400,
			render: (text, record) => text ? <PopoverList
				com={<BrandList list={text} />}
			/> : '-'
		}, {
			title: '操作',
			dataIndex: 'operate',
			align: 'center',
			key: 'operate',
			width: '100px',
			render: (text, record) => <div className='table-operate'>
				<a onClick={() => setModal(true, {
					title: '查看',
					content: <EditOrder actions={actions} setModal={setModal} bpId={record.bpId} />
				})}>查看</a>	|
				<a onClick={() => setModal(true, {
					title: '编辑',
					content: <EditOrder saveBpAsync={saveBpAsync} isEdit={true} setModal={setModal} actions={actions} bpId={record.bpId} />
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


