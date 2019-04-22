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
const pageDefault = { page: { currentPage: 1, pageSize: 10 } }
class Agent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			showModal: { title: "", content: "" },
			isLoading: true,
			searchParams: qs.parse(window.location.search.substring(1)),
			cooperationPlatformInfoDetail: {},
			pageParam: {}
		};
		this.setShowModal = this.setShowModal.bind(this)
	}
	componentDidMount = async () => {
		const { actions: { getAgentByPage, getCooperationPlatformInfoById } } = this.props
		const { searchParams } = this.state
		const { data } = await getCooperationPlatformInfoById({ id: searchParams.id })
		getAgentByPage({
			page: { currentPage: 1, pageSize: 10 },
			form: { cooperationPlatformCode: searchParams.code }
		}).then(() => {
			this.setState({
				cooperationPlatformInfoDetail: data,
				isLoading: false
			})
		})
	}
	//查询
	seachAgentByPage = (params, operate) => {
		const { searchParams, pageParam } = this.state
		this.setState({
			isLoading: true
		})
		const { actions: { getAgentByPage }, cooperationPlatformReducer: { agentByPageList } } = this.props
		const paramsAll = { ...pageDefault, ...pageParam, form: { cooperationPlatformCode: searchParams.code }, ...params }

		if (operate == 'delete' && (agentByPageList && agentByPageList.total) % paramsAll.page.pageSize == 1) {
			paramsAll.page.currentPage = paramsAll.page.currentPage - 1
		}
		getAgentByPage(paramsAll).then(() => {
			this.setState({
				isLoading: false,
				pageParam: paramsAll
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
				message.success(`该平台已经${status == 1 ? '启用' : '停用'}`);
				this.seachAgentByPage()
			})

	}
	//删除代理商
	deleteAgent = (id) => {
		const { actions: { delAgent } } = this.props
		delAgent({ id: id, })
			.then(() => {
				message.success(`删除成功`);
				this.seachAgentByPage(null, 'delete')
			})

	}
	render() {
		const { showModal, visible, isLoading, searchParams, cooperationPlatformInfoDetail } = this.state
		const { actions, cooperationPlatformReducer } = this.props
		const { insertAgent } = actions
		const { agentByPageList, } = cooperationPlatformReducer
		const { platformName, cooperationPlatformName, captureCooperationPlatformName } = cooperationPlatformInfoDetail
		const titleModal = `【下单平台：${captureCooperationPlatformName}  所属媒体平台：${platformName}】`
		const listProps = {
			setShowModal: this.setShowModal,
			agentByPageList,
			deleteAgent: this.deleteAgent,
			editAgentStatus: this.editAgentStatus,
			seachAgentByPage: this.seachAgentByPage,
			actions,
			searchParams,
			titleModal
		}

		return (

			<div className="agent-info">
				<h2 className="head-title">增加修改代理商</h2>
				<Spin spinning={isLoading} >
					<DividingBox text="下单平台基本信息" />
					<div className="agent-base-info">
						<div>
							下单平台编号：{searchParams.code}
						</div>
						<div>
							下单平台名称：{cooperationPlatformName}
						</div>
						<div>
							所属媒体平台：{platformName}
						</div>
					</div>
					<DividingBox text="代理商信息" />
					<a onClick={() => this.setShowModal(true, {
						title: `新增代理商 ${titleModal}`,
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
