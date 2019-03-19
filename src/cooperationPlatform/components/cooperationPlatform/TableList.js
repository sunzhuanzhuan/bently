import React, { Component } from 'react'
import { Table, Modal, message } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteModal } from "../common";
import Quotation from "../cooperationPlatformEdit/Quotation";
import DisableDefault from "./DisableDefault";
import './TableList.less'
const confirm = Modal.confirm;
class TableList extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	showModal = (coId, platformId, data) => {
		const { setShowModal, actions, setStatusCO } = this.props
		//弹出选择启用报价项弹窗
		setShowModal(true, {
			title: '启用默认报价项',
			content: <Quotation notOperate={true} setEnableArr={async (arr) => {
				//启用报价项
				const list = arr.map(one => { return { id: one, platformId: platformId, trinitySkuTypeStatus: 1 } })
				await actions.addOrUpdateTrinitySkuType(list)
				//并启用该平台
				setStatusCO(coId, platformId, 1)
			}}
				onClose={() => setShowModal(false)}
				trinitySkuTypeVOS={data} />,
			width: 800
		})
	}
	//启用按钮判断
	setEnable = async (code, coId, platformId, ) => {
		const { actions, setStatusCO } = this.props
		//判断该平台下 报价项 是否含有报价项启用数据
		const enableRes = await actions.getTrinitySkuTypeList({ trinityPlatformCode: code, trinityPlatformId: coId, trinitySkuTypeStatus: 1 });
		console.log('======enableRes.data.length==');
		console.log(enableRes.data.length);
		if (enableRes.data.length > 0) {
			//有，直接启用合作平台
			setStatusCO(coId, platformId, 1)
		} else {
			//未启用，查询报价项列表
			const { data } = await actions.getTrinitySkuTypeList({ trinityPlatformCode: code, trinityPlatformId: coId });
			this.showModal(coId, platformId, data)
		}

	}

	//禁用按钮判断
	setDisable = async (coId, platformId) => {
		console.log('setDisable');
		console.log(coId, platformId);
		const { setShowModal, actions, setStatusCO } = this.props
		//判断该平台是否含有多个平台并为默认报价项
		const { data } = await actions.getCooperationPlatform({ platformId: platformId, cooperationPlatformStatus: 1, cooperationDefaultPlatform: 2 })
		if (data.length > 0) {
			//含有则选择默认报价项
			setShowModal(true, {
				title: '启用默认报价项',
				content: <DisableDefault
					list={data}
					notOperate={true}
					setShowModal={setShowModal}
					onDefault={(id) => {
						actions.updatePlatformDefault({
							id: id,
							platformId: platformId
						}).then(() => {
							setStatusCO(coId, platformId, 3)
						})
					}} />
			})
		} else {
			//不含则直接停用
			this.enable(coId, platformId)
		}
	}
	enable = (coId, platformId) => {

		const { setStatusCO } = this.props
		confirm({
			title: '温馨提示',
			content: '是否确认将该下单平台停用，停用后将无法下单？',
			okText: '继续',
			cancelText: '取消',
			icon: "exclamation-circle",
			iconType: "exclamation-circle",
			onOk() {
				setStatusCO(coId, platformId, 3)
			},
			onCancel() {

			},
		});
	}
	render() {

		const { setShowModal, searchByPageOrOther, cooperationPlatformByPageList, setDefaultCO, deleteCO } = this.props

		const columns = [{
			title: '下单平台编号',
			dataIndex: 'cooperationPlatformCode',
			align: "center",
			key: 'cooperationPlatformCode',
		}, {
			title: '下单平台名称',
			dataIndex: 'cooperationPlatformName',
			align: "center",
			key: 'cooperationPlatformName',

		}, {
			title: '所属媒体平台',
			dataIndex: 'platformName',
			align: "center",
			key: 'platformName',
		}, {
			title: '代理商数量',
			dataIndex: 'agentPlatformNumber',
			align: "center",
			key: 'agentPlatformNumber',
			render: (text, record) => {
				const { id, cooperationPlatformCode, platformId, platformName, cooperationPlatformName } = record
				const params = `?id=${id}&code=${cooperationPlatformCode}
				&platformId=${platformId}&platformName=${platformName}&name=${cooperationPlatformName}`
				return <Link to={`/config/platform/agentList${params}`}>{text - 1}</Link>
			}
		}, {
			title: '付款公司',
			dataIndex: 'paymentCompanyName',
			align: "center",
			key: 'paymentCompanyName',
		}, {
			title: '创建时间',
			dataIndex: 'createdAt',
			align: "center",
			key: 'createdAt',
		}, {
			title: '最近一次操作时间',
			dataIndex: 'modifiedAt',
			align: "center",
			key: 'modifiedAt',
		}, {
			title: '平台状态',
			dataIndex: 'cooperationPlatformStatus',
			align: "center",
			key: 'cooperationPlatformStatus',
			render: (text, record) => text == 1 ? '已启用' : text == 2 ? '未启用' : '已停用'
		}, {
			title: '是否默认报价项',
			dataIndex: 'cooperationDefaultPlatform',
			align: "center",
			key: 'cooperationDefaultPlatform',
			render: (text, record) => text == 1 ? '是' : '否'
		}, {
			title: '合作订单数',
			dataIndex: 'orderNumber',
			align: "center",
			key: 'orderNumber',
		}, {
			title: '操作',
			dataIndex: '操作name',
			key: '操作name',
			align: "center",
			render: (text, record) => {
				//启用状态
				const { cooperationPlatformStatus, cooperationDefaultPlatform, platformId, id, cooperationPlatformCode, platformName, cooperationPlatformName } = record
				const params = `?id=${id}&code=${cooperationPlatformCode}
				&platformId=${platformId}&platformName=${platformName}&name=${cooperationPlatformName}`
				return <div style={{ width: 130 }}>
					<Link to={`/config/platform/detail${params}`} >查看</Link>
					{cooperationPlatformStatus == 2 || cooperationPlatformStatus == 3 ? <Link to={12} style={{ margin: "0px 4px" }} onClick={() => this.setEnable(cooperationPlatformCode, id, platformId)}>启用</Link> : null}
					{cooperationPlatformStatus == 1 ? <Link to={12} style={{ margin: "0px 4px" }} onClick={() => cooperationDefaultPlatform == 1 ?
						this.setDisable(id, platformId) :
						this.enable(id, platformId)}>停用</Link> : null}

					<a href={`/config/platform/edit${params}`} target='_blank' style={{ marginRight: 4 }} >修改</a>
					{cooperationPlatformStatus == 2 ? <DeleteModal onDelete={() => deleteCO(id)} /> : null}
					<div>
						<Link to={`/config/platform/agentList${params}`}>增加修改代理商</Link>
					</div>
					{cooperationDefaultPlatform == 2 && cooperationPlatformStatus == 1 ? <DeleteModal messageType="set" typeText="设置默认报价项" onDelete={() => setDefaultCO(id, platformId)} /> : null}
				</div>
			}
		}];
		const { list, total, pageSize, pageNum } = cooperationPlatformByPageList
		return (
			<Table
				dataSource={list}
				columns={columns}
				bordered={true}

				pagination={{
					current: pageNum,
					pageSize: pageSize,
					total: total,
					showQuickJumper: true,
					showSizeChanger: true,
					onShowSizeChange: (current, pageSize) => {
						console.log('onShowSizeChange', current, pageSize);
						searchByPageOrOther({ page: { currentPage: current, pageSize: pageSize } })
					},
					onChange: (current, pageSize) => {
						console.log('onChange', current, pageSize);
						searchByPageOrOther({ page: { currentPage: current, pageSize: pageSize } })
					},
				}}
			/>
		);
	}
}

export default TableList;

