import React, { Component } from 'react'
import { Table } from 'antd';
import QuotationEdit from "./QuotationEdit";
import { DeleteModal } from "../common"
class Quotation extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { quotationList, setShowModal, formLayoutModal, updateQuotationList, deleteQuotationList } = this.props

		const columns = [{
			title: '报价项ID',
			dataIndex: 'id',
			key: 'id',
		}, {
			title: '平台抓取报价项名称',
			dataIndex: 'name',
			key: 'name',
		}, {
			title: '微播易展示报价项名称',
			dataIndex: 'ownName',
			key: 'ownName',
		}, {
			title: '创建时间',
			dataIndex: 'createTime',
			key: 'createTime',
		}, {
			title: '最后一次修改时间',
			dataIndex: 'lastTime',
			key: 'lastTime',
		}, {
			title: '描述',
			dataIndex: 'remark',
			key: 'remark',
		}, {
			title: '状态',
			dataIndex: 'status',
			key: 'status',
			render: (text) => text == 1 ? "启用" : "已停用"
		}, {
			title: '操作',
			dataIndex: '操作name',
			key: '操作name',
			render: (text, record, index) => {
				return <div>
					<a onClick={() => setShowModal(true, {
						title: <div>修改报价项</div>,
						content: <QuotationEdit
							formLayoutModal={formLayoutModal}
							updateQuotationList={updateQuotationList}
							index={index}
							isEdit={true}
							item={record} />
					})}>修改</a>
					<DeleteModal onDelete={() => deleteQuotationList(record.id)} />
					<a onClick={() => updateQuotationList(index, record, true, record.status == 1 ? 2 : 1)}>{record.status == 1 ? '停用' : '启用'}</a>
				</div>

			}
		}];
		return (
			<div style={{ paddingLeft: "10%" }}>
				<Table dataSource={quotationList} columns={columns} pagination={false} bordered={true} />
			</div>
		);
	}
}

export default Quotation;
