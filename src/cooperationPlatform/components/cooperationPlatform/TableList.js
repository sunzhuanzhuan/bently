import React, { Component } from 'react'
import { Table, Modal, Tag } from 'antd';
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
	//启用按钮判断
	setEnable = () => {
		const { setShowModal } = this.props
		//判断该平台报价项是否启用

		//启用
		//未启用
		setShowModal(true, {
			title: '启用默认报价项',
			content: <Quotation notOperate={true} onClose={setShowModal} />,
			width: 800
		})
	}
	//禁用按钮判断
	setDisable = (platformId, coId) => {
		const { setShowModal, actions, searchByPageOrOther } = this.props

		//判断该平台是否含有多个平台并为默认报价项
		actions.getCooperationPlatformByPage({ platformId: platformId, orderPlatformStatus: 1 }).then(({ data }) => {
			if (data.list.length > 0) {
				//含有则选择默认报价项
				setShowModal(true, {
					title: '启用默认报价项',
					content: <DisableDefault notOperate={true}
						setShowModal={setShowModal}
						onDisableDefault={() => actions.updatePlatformStatus({ id: coId }).then(() => searchByPageOrOther())} />
				})
			} else {
				//不含则直接停用
				this.enable(coId)
			}
		})
	}
	enable = (coId) => {
		const { actions, searchByPageOrOther } = this.props
		confirm({
			title: '温馨提示',
			content: '是否确认将该下单平台停用，停用后将无法下单？',
			okText: '继续',
			cancelText: '取消',
			icon: "exclamation-circle",
			iconType: "exclamation-circle",
			onOk() {
				actions.updatePlatformStatus({ id: coId }).then(() => searchByPageOrOther())
			},
			onCancel() {

			},
		});
	}
	render() {

		const { setShowModal, cooperationPlatformByPageList, setDefaultCO, deleteCO } = this.props
		const dataSource = [{
			orderPlatformCode: '1',
			orderPlatformName: '胡彦斌',
			age: 32,
			orderPlatformStatus: 1,
			address: '西湖区湖底公园1号'
		}, {
			orderPlatformCode: '2',
			orderPlatformName: '胡彦祖',
			defaultOrderPlatform: 1,
			orderPlatformStatus: 2,
			address: '西湖区湖底公园1号'
		}];

		const columns = [{
			title: '下单平台编号',
			dataIndex: 'orderPlatformCode',
			align: "center",
			key: 'orderPlatformCode',
		}, {
			title: '下单平台名称',
			dataIndex: 'orderPlatformName',
			align: "center",
			key: 'orderPlatformName',

		}, {
			title: '所属媒体平台',
			dataIndex: 'platformName',
			align: "center",
			key: 'platformName',
		}, {
			title: '代理商数量',
			dataIndex: '代理商数量name',
			align: "center",
			key: '代理商数量name',
			render: (record, index) => {
				return <Link to={`/config/platform/agentList?`}>12</Link>
			}
		}, {
			title: '付款公司',
			dataIndex: 'payCompanyName',
			align: "center",
			key: 'payCompanyName',
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
			dataIndex: 'orderPlatformStatus',
			align: "center",
			key: 'orderPlatformStatus',
			render: (text, record) => text == 1 ? '启用' : text == 2 ? '未启用' : '停用'
		}, {
			title: '是否默认报价项',
			dataIndex: 'defaultAgent',
			align: "center",
			key: 'defaultAgent',
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
				const { orderPlatformStatus, defaultAgent, platformId, id } = record
				return <div>
					<Link to={`/config/platform/detail?id=${id}`} >查看</Link>
					{orderPlatformStatus == 2 || orderPlatformStatus == 1 ? <Link to={12} style={{ margin: "0px 4px" }} onClick={this.setEnable}>启用</Link> : null}
					{orderPlatformStatus == 3 ? <Link to={12} style={{ margin: "0px 4px" }} onClick={() => defaultAgent == 1 ? this.setDisable(platformId, id) : this.enable(id)}>停用</Link> : null}
					<a href={`/config/platform/edit?id=${id}`} target='_blank' style={{ marginRight: 4 }} >修改</a>
					{orderPlatformStatus == 1 ? <DeleteModal onDelete={() => deleteCO({ id: id })} /> : null}
					<div>
						<Link to={`/config/platform/agentList?id=${id}`}>增加修改代理商</Link>
					</div>
					<DeleteModal messageType="set" typeText="设置默认报价项" onDelete={() => setDefaultCO({ id: id })} />
				</div>
			}
		}];

		return (
			<Table
				dataSource={cooperationPlatformByPageList.list}
				columns={columns}
				bordered={true}
				pagination={{
					current: 1,
					pageSize: 10,
					showQuickJumper: true,
					showSizeChanger: true,
					onShowSizeChange: (current, pageSize) => {
						console.log(current, pageSize);

					},
					onChange: (current, pageSize) => {
						console.log(current, pageSize);
					},
				}}
			/>
		);
	}
}

export default TableList;

