import React, { Component } from 'react'
import { Table, Button, message } from 'antd';
import QuotationEdit from "./QuotationEdit";
import { DeleteModal } from "../common"
import { Tips } from "../cooperationPlatform/DisableDefault";
import qs from "qs";
class Quotation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
			searchParams: qs.parse(window.location.search.substring(1))
		};
	}

	onSelectChange = (selectedRowKeys) => {
		console.log('selectedRowKeys changed: ', selectedRowKeys);
		this.setState({ selectedRowKeys });
	}
	setSkuTypeStatus = (record, isEnable, code) => {
		const { skuTypeIds = [], id } = record
		this.props.editQuotation([{
			id: id,
			trinityPlatformCode: code,
			trinitySkuTypeStatus: isEnable ? 3 : 1,//1启用，3停用
			skuTypeIds: skuTypeIds.map(one => one.key)
		}], () => {
			message.success(`提示：当前报价项已${isEnable ? '停用' : '启用'}，下单时该报价项${isEnable ? '不' : ''}可见！`)
		})
	}
	stopSkuTypeStatus = async (record, isEnable) => {
		const { actions: { getTrinitySkuTypeList } } = this.props
		const { searchParams: { code, platformId, status } } = this.state
		//如果平台启用则修改时校验报价项是否有启用
		if (status == 1) {
			const { data } = await getTrinitySkuTypeList({
				trinityPlatformCode: code,
				trinitySkuTypeStatus: 1, platformId: platformId,

			});
			if (data.length > 1) {
				this.setSkuTypeStatus(record, isEnable, code)
			} else {
				message.error('请您至少启用一条报价项，以免影响正常下单')
			}
		} else {
			this.setSkuTypeStatus(record, isEnable, code)
		}
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
			platformId,//是微博
			cooperationPlatformKey,
			titleModal,
			cooperationPlatformReducer = {}
		} = this.props
		const { skuTypeMap = {} } = cooperationPlatformReducer
		const { searchParams, selectedRowKeys } = this.state
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
			width: 80,
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
		}, {
			title: '对应预设报价项',
			dataIndex: 'skuTypeIds',
			align: 'center',
			key: 'skuTypeIds',
			render: (text = []) => {
				return text.map(one => one.label).join('，')
			}
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
			width: 70,
			render: (text) => text == 1 ? "已启用" : text == 3 ? `已停用` : '未启用'
		}]
		const oprateColunm = [{
			title: '操作',
			dataIndex: 'operate',
			align: 'center',
			key: 'operate',
			width: 80,
			render: (text, record, index) => {
				const { trinitySkuTypeStatus, id } = record
				const isEnable = trinitySkuTypeStatus == 1
				return <div>
					<a onClick={() => setShowModal(true, {
						title: <div>修改报价项{titleModal}</div>,
						content: <QuotationEdit
							formLayoutModal={formLayoutModal}
							setShowModal={setShowModal}
							updateList={updateList}
							index={index}
							isEdit={true}
							item={record}
							actions={actions}
							editQuotation={editQuotation}
							trinitySkuTypeVOS={trinitySkuTypeVOS}
							platformId={platformId}
							cooperationPlatformKey={cooperationPlatformKey} />
					})} style={{ marginRight: 4 }}>修改</a>
					{trinitySkuTypeStatus == 2 ?
						<DeleteModal onDelete={() => searchParams.id > 0 ?
							editQuotation([{ id: id, isDeleted: 1, trinityPlatformCode: searchParams.code, }]) :
							deleteList(record.idAdd, 'trinitySkuTypeVOS')} /> : null}

					{searchParams.id > 0 ?
						isEnable ? <a style={{ marginLeft: 4 }} onClick={() => this.stopSkuTypeStatus(record, isEnable)}>
							停用
						</a> : <a style={{ marginLeft: 4 }} onClick={() => this.setSkuTypeStatus(record, isEnable, searchParams.code)}>
								启用
						</a> : null}
				</div>
			}
		}];
		const addColumns = [
			...nameColunm, ...statuColunm, ...(notOperate ? [] : oprateColunm)
		]
		const editColumns = [
			...idColumns, ...nameColunm, ...timeColumns, ...statuColunm, ...(noLast ? [] : oprateColunm)
		]
		return (
			<div style={{ marginBottom: 8 }}>
				{notOperate ? <div style={{ paddingBottom: 20 }}><Tips text='若要启用该平台，请至少选择一个报价项！' /> </div> : null}
				<Table
					dataSource={trinitySkuTypeVOS}
					rowKey={record => record.id}
					columns={searchParams.id > 0 ? editColumns : addColumns}
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
