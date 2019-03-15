import React, { Component } from 'react'
import TableList from "../components/agent/TableList";
import AgentEdit from "./AgentEdit";
import { DividingBox } from "../components/common";
import "./Agent.less";
import { Modal, Spin, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import qs from "qs";
import * as action from '../actions/index'
class Agent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			showModal: { title: "", content: "" },
			isLoading: true
		};
		this.setShowModal = this.setShowModal.bind(this)
	}
	componentDidMount = () => {
		const { actions: { getAgentByPage } } = this.props
		const data = qs.parse(window.location.search.substring(1))
		getAgentByPage({
			page: { currentPage: 1, pageSize: 10 },
			form: { cooperationPlatformCode: data.code }
		}).then(() => {
			this.setState({
				isLoading: false
			})
		})
	}
	//查询
	seachAgentByPage = (params) => {
		this.setState({
			isLoading: true
		})
		const { actions: { getAgentByPage } } = this.props
		getAgentByPage({ currentPage: 1, pageSize: 10, ...params }).then(() => {
			this.setState({
				isLoading: false
			})
		})
	}
	//设置弹窗
	setShowModal = (isVisable, showModal) => {
		if (isVisable) {
			this.setState({
				visible: true,
				showModal: showModal
			})
		} else {
			this.setState({
				visible: false,
			})
		}

	}
	//隐藏弹窗
	hideModal = () => {
		this.setState({ visible: false })
	}
	//编辑代理商状态
	editAgentStatus = (id, status) => {
		const { actions: { updateAgentStatus } } = this.props
		updateAgentStatus({ id: id, agentStatus: status })
			.then(() => {
				message.success(`改平台已经${status == 1 ? '启用' : '停用'}`);
				this.seachAgentByPage()
			})

	}
	//删除代理商
	deleteAgent = (id) => {
		const { actions: { delAgent } } = this.props
		delAgent({ id: id })
			.then(() => {
				message.success(`删除成功`);
				this.seachAgentByPage()
			})

	}
	render() {
		const { showModal, visible, isLoading } = this.state
		const { actions, cooperationPlatformReducer } = this.props
		const { insertAgent } = actions
		const { agentByPageList, } = cooperationPlatformReducer
		const listProps = {
			setShowModal: this.setShowModal,
			agentByPageList,
			deleteAgent: this.deleteAgent,
			editAgentStatus: this.editAgentStatus,
			seachAgentByPage: this.seachAgentByPage,
			actions
		}
		return (

			<div className="agent-info">
				<h2 className="head-title">增加修改代理商</h2>
				<Spin spinning={isLoading} >
					<DividingBox text="下单平台基本信息" />
					<div className="agent-base-info">
						<div>
							下单平台编号：asda12312
						</div>
						<div>
							下单平台名称：快手所属
						</div>
						<div>
							所属媒体平台：快手
						</div>
					</div>
					<DividingBox text="代理商信息" />
					<a onClick={() => this.setShowModal(true, {
						title: '新增代理商',
						content: <AgentEdit setShowModal={this.setShowModal}
							insertAgent={insertAgent} seachAgentByPage={this.seachAgentByPage} />, width: 800
					})}>新增代理商</a>
					<TableList  {...listProps} />
					<div style={{ textAlign: "center", marginBottom: 20 }}>
						<Link to="/config/platform/list">
							<Button>返回</Button>
						</Link>
					</div>
					<Modal
						title={showModal && showModal.title}
						visible={visible}
						destroyOnClose={true}
						onOk={this.hideModal}
						footer={null}
						width={showModal.width}
						onCancel={this.hideModal}>
						{showModal && showModal.content}
					</Modal>
				</Spin>
			</div>

		);
	}
}

const mapStateToProps = (state) => {
	return {
		cooperationPlatformReducer: state.cooperationPlatformReducer
	}
}
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(action, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Agent);
