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
	setDisable = () => {
		const { setShowModal } = this.props

		//判断该平台是否含有多个平台并为默认报价项

		//选择报价项弹窗并停用
		setShowModal(true, {
			title: '启用默认报价项',
			content: <DisableDefault notOperate={true} setShowModal={setShowModal} />
		})
		//直接停用
	}
	render() {
		const { setShowModal } = this.props

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
			render: (text, record) => {
				return <div>
					{text}
					{record.defaultOrderPlatform == 1 ? <div className='default-order'>默认报价项</div> : null}
				</div>
			}
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
				return <Link to={"/config/platform/agentList"}>12</Link>
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
			title: '合作订单数',
			dataIndex: '合作订单数name',
			align: "center",
			key: '合作订单数name',
		}, {
			title: '操作',
			dataIndex: '操作name',
			key: '操作name',
			align: "center",
			render: (text, record) => {
				//启用状态
				const { orderPlatformStatus, } = record
				return <div>
					<Link to={"/config/platform/detail"} >查看</Link>
					{orderPlatformStatus == 2 ? <Link to={12} style={{ margin: "0px 4px" }} onClick={this.setEnable}>启用</Link> : null}
					{orderPlatformStatus == 1 ? <Link to={12} style={{ margin: "0px 4px" }} onClick={this.setDisable}>停用</Link> : null}
					<a href='/config/platform/edit' target='_blank' style={{ marginRight: 4 }} >修改</a>
					{orderPlatformStatus == 1 ? <DeleteModal /> : null}
					<div>
						<Link to={"/config/platform/agentList"}>增加修改代理商</Link>
					</div>
					<DeleteModal messageType="set" typeText="设置默认报价项" />
				</div>
			}
		}];

		return (
			<Table
				dataSource={dataSource}
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

