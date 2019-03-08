import React, { Component } from 'react'
import { Table, Button } from 'antd';
import QuotationEdit from "./QuotationEdit";
import { DeleteModal } from "../common"
import { Tips } from "../cooperationPlatform/DisableDefault";
class Quotation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: []
		};
	}
	onSelectChange = (selectedRowKeys) => {
		console.log('selectedRowKeys changed: ', selectedRowKeys);
		this.setState({ selectedRowKeys });
	}
	render() {
		const {
			quotationList,
			setShowModal,
			formLayoutModal,
			updateList,
			deleteList,
			notOperate,//带复选框
			onClose,//关闭弹窗
			noLast,//只没有操作列
			isEdit,
			isWeiBo//是微博
		} = this.props
		const { selectedRowKeys } = this.state
		const tableProps = notOperate ? {
			rowSelection: {
				selectedRowKeys,
				onChange: this.onSelectChange
			}
		} : {}
		const idColumns = [{
			title: '报价项ID',
			dataIndex: 'id',
			align: 'center',
			key: 'id',
		}]
		const timeColumns = [{
			id: 1,
			title: '创建时间',
			dataIndex: 'createTime',
			align: 'center',
			key: 'createTime',
		}, {
			id: 2,
			title: '最后一次修改时间',
			dataIndex: 'lastTime',
			align: 'center',
			key: 'lastTime',
		}]
		const nameColunm = [{
			title: '平台抓取报价项名称',
			dataIndex: 'name',
			align: 'center',
			key: 'name',
		}, {
			title: '微播易展示报价项名称',
			dataIndex: 'ownName',
			align: 'center',
			key: 'ownName',
		}]
		const weiboColunm = [{
			title: '对应预设报价项',
			dataIndex: 'ow',
			align: 'center',
			key: 'ow',
		}]
		const statuColunm = [{
			title: '描述',
			dataIndex: 'remark',
			align: 'center',
			key: 'remark',
		}, {
			title: '状态',
			dataIndex: 'status',
			align: 'center',
			key: 'status',
			render: (text) => text == 1 ? "启用" : "已停用"
		}]
		const oprateColunm = [{
			title: '操作',
			dataIndex: 'operate',
			align: 'center',
			key: 'operate',
			render: (text, record, index) => {
				return <div>
					<a onClick={() => setShowModal(true, {
						title: <div>修改报价项</div>,
						content: <QuotationEdit
							formLayoutModal={formLayoutModal}
							setShowModal={setShowModal}
							updateList={updateList}
							index={index}
							isEdit={true}
							item={record} />
					})} style={{ marginRight: 4 }}>修改</a>
					{record.isAddItem ?
						<DeleteModal onDelete={() => deleteList(record.id, 'quotationList')} /> :
						<a style={{ marginLeft: 0 }} onClick={() => { console.log('启用') }}>
							{record.status == 1 ? '停用' : '启用'}
						</a>}
				</div>
			}
		}];
		const addColumns = [
			...nameColunm, ...(isWeiBo ? weiboColunm : []), ...statuColunm, ...(notOperate ? [] : oprateColunm)
		]
		const editColumns = [
			...idColumns, ...nameColunm, ...(isWeiBo ? weiboColunm : []), ...timeColumns, ...statuColunm, ...(noLast ? [] : oprateColunm)
		]
		return (
			<div style={{ paddingLeft: notOperate ? '' : "10%", marginBottom: 8 }}>
				{notOperate ? <div style={{ paddingBottom: 20 }}><Tips text='若要启用该平台，请至少选择一个报价项！' /> </div> : null}
				<Table
					dataSource={quotationList}
					columns={isEdit ? editColumns : addColumns}
					pagination={false}
					bordered={true}
					{...tableProps} />
				{notOperate ? <div style={{ textAlign: "center", marginTop: 20 }}>
					<Button onClick={() => onClose(false)}>取消</Button>
					<Button type='primary' style={{ marginLeft: 40 }} onClick={() => { '启用' }} disabled={selectedRowKeys < 1}>确认</Button>
				</div> : null}
			</div>
		);
	}
}

export default Quotation;
