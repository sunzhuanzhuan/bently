import React, { Component } from 'react'
import { Table, Button } from 'antd';
import QuotationEdit from "./QuotationEdit";
import { DeleteModal } from "../common"
import { Tips } from "../cooperationPlatform/DisableDefault";
import qs from "qs";
class Quotation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
			idCo: qs.parse(window.location.search.substring(1)).id
		};
	}

	onSelectChange = (selectedRowKeys) => {
		console.log('selectedRowKeys changed: ', selectedRowKeys);
		this.setState({ selectedRowKeys });
	}
	render() {
		const {
			setEnableArr,
			actions,
			editQuotation,
			trinitySkuTypeVOS,
			setShowModal,
			formLayoutModal,
			updateList,
			deleteList,
			notOperate,//带复选框
			onClose,//关闭弹窗
			noLast,//只没有操作列
			isWeiBo//是微博
		} = this.props
		const { idCo, selectedRowKeys } = this.state
		console.log(idCo, 'idCo');

		const tableProps = notOperate ? {
			rowSelection: {
				selectedRowKeys,
				onChange: this.onSelectChange
			}
		} : {}
		const idColumns = [{
			title: '报价项ID',
			dataIndex: 'trinityCode',
			align: 'center',
			key: 'trinityCode',
		}]
		const timeColumns = [{
			id: 1,
			title: '创建时间',
			dataIndex: 'createdAt',
			align: 'center',
			key: 'createdAt',
		}, {
			id: 2,
			title: '最后一次修改时间',
			dataIndex: 'modifiedAt',
			align: 'center',
			key: 'modifiedAt',
		}]
		const nameColunm = [{
			title: '平台抓取报价项名称',
			dataIndex: 'trinityTypeName',
			align: 'center',
			key: 'trinityTypeName',
		}, {
			title: '微播易展示报价项名称',
			dataIndex: 'wbyTypeName',
			align: 'center',
			key: 'wbyTypeName',
		}]
		const weiboColunm = [{
			title: '对应预设报价项',
			dataIndex: 'skuTypeName',
			align: 'center',
			key: 'skuTypeName',
		}]
		const statuColunm = [{
			title: '描述',
			dataIndex: 'description',
			align: 'center',
			key: 'description',
		}, {
			title: '状态',
			dataIndex: 'trinitySkuTypeStatus',
			align: 'center',
			key: 'trinitySkuTypeStatus',
			render: (text) => text == 1 ? "已启用" : text == 3 ? `已停用` : '未启用'
		}]
		const oprateColunm = [{
			title: '操作',
			dataIndex: 'operate',
			align: 'center',
			key: 'operate',
			render: (text, record, index) => {
				const { trinitySkuTypeStatus, id } = record
				return <div>
					<a onClick={() => setShowModal(true, {
						title: <div>修改报价项</div>,
						content: <QuotationEdit
							formLayoutModal={formLayoutModal}
							setShowModal={setShowModal}
							updateList={updateList}
							index={index}
							isEdit={true}
							item={record}
							actions={actions}
							editQuotation={editQuotation} />
					})} style={{ marginRight: 4 }}>修改</a>
					{record.trinitySkuTypeStatus == 2 ?
						<DeleteModal onDelete={() => idCo > 0 ?
							editQuotation([{ id: id, isDeleted: 1 }]) :
							deleteList(record.idAdd, 'trinitySkuTypeVOS')} /> : null}
					{id > 0 ? <a style={{ marginLeft: 4 }} onClick={() => editQuotation([{
						id: id,
						trinitySkuTypeStatus: record.trinitySkuTypeStatus == 1 ? 3 : 1//1启用，3停用
					}])}>
						{record.trinitySkuTypeStatus == 1 ? '停用' : '启用'}
					</a> : null}
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
			<div style={{ marginBottom: 8 }}>
				{notOperate ? <div style={{ paddingBottom: 20 }}><Tips text='若要启用该平台，请至少选择一个报价项！' /> </div> : null}
				<Table
					dataSource={trinitySkuTypeVOS}
					rowKey={record => record.id}
					columns={idCo > 0 ? editColumns : addColumns}
					pagination={false}
					bordered={true}
					{...tableProps} />
				{notOperate ? <div style={{ textAlign: "center", marginTop: 20 }}>
					<Button onClick={onClose}>取消</Button>
					<Button type='primary' style={{ marginLeft: 40 }} onClick={() => setEnableArr(selectedRowKeys)} disabled={selectedRowKeys.length < 1}>确认</Button>
				</div> : null}
			</div>
		);
	}
}

export default Quotation;
