import React, { Component } from 'react'
import AgentDetail from "../../containers/AgentDetail";
import AgentEdit from "../../containers/AgentEdit";
import { DeleteModal } from "../common";
import { Table } from 'antd';
class TableList extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { setShowModal, agentByPageList,
			editAgentStatus, deleteAgent, seachAgentByPage, actions } = this.props
		const columns = [{
			title: '代理商编号',
			dataIndex: 'agentCode',
			align: 'center',
			key: 'agentCode',
		}, {
			title: '代理商名称',
			dataIndex: 'agentName',
			align: 'center',
			key: 'agentName',
		}, {
			title: '合作方式',
			dataIndex: 'cooperationStyle',
			align: 'center',
			key: 'cooperationStyle',
			render: (text, recode) => {
				return text == 1 ? '周期返款' : '其他'
			}
		}, {
			title: '返款比例（%）',
			dataIndex: 'payRebate',
			align: 'center',
			key: 'payRebate',
		}, {
			title: '状态',
			dataIndex: 'agentStatus',
			align: 'center',
			key: 'agentStatus',
			render: (text, recode) => {
				return text == 1 ? '已启用' : text == 2 ? '未启用' : '停用'
			}
		}, {
			title: '创建时间',
			dataIndex: 'createdAt',
			align: 'center',
			key: 'createdAt',
		}, {
			title: '最后一次操作时间',
			dataIndex: 'modifiedAt',
			align: 'center',
			key: 'modifiedAt',
		}, {
			title: '操作',
			dataIndex: 'setmethod',
			align: 'center',
			key: 'setmethod',
			render: (text, recode) => {
				const title = `代理商   【所属下单平台：${'快接单'} 所属媒体平台：${'快手'}】`
				const { agentStatus, id } = recode
				return <div>
					<a style={{ marginRight: 4 }} onClick={() => setShowModal(true,
						{
							title: <div >查看{title} </div>,
							content: <AgentDetail
								setShowModal={setShowModal}
								actions={actions}
								agentId={id} />
						})}>查看</a>
					{agentStatus == 1 ?
						<a onClick={() => editAgentStatus(id, 3)}>停用</a>
						:
						<a onClick={() => editAgentStatus(id, 1)}>启用</a>
					}
					<a onClick={() => setShowModal(true,
						{
							width: '800px',
							title: <div>修改{title}</div>,
							content: <AgentEdit setShowModal={setShowModal}
								agentId={recode.id}
								seachAgentByPage={seachAgentByPage}
							/>
						})} style={{ margin: "0px 4px" }}>修改</a>
					{agentStatus == 2 ? <DeleteModal onDelete={() => deleteAgent({ id: id })} /> : null}
				</div>
			}
		}]
		return (
			<Table
				style={{ marginTop: 20 }}
				bordered={true}
				dataSource={agentByPageList.list}
				columns={columns}
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