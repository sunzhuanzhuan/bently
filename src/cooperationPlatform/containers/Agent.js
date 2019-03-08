import React, { Component } from 'react'
import TableList from "../components/agent/TableList";
import AgentEdit from "./AgentEdit";
import { DividingBox } from "../components/common";
import "./Agent.less";
import { Modal, Spin, Button } from 'antd';
import { Link } from 'react-router-dom';
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
		this.setState({ isLoading: false })
	}
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
	hideModal = () => {
		this.setState({ visible: false })
	}
	render() {
		const { showModal, visible, isLoading } = this.state
		const listProps = {
			setShowModal: this.setShowModal
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
					<a onClick={() => this.setShowModal(true, { title: '新增代理商', content: <AgentEdit />, width: 800 })}>新增代理商</a>
					<TableList  {...listProps} />
					<div style={{ textAlign: "center", marginBottom: 20 }}>
						<Link to="/config/platform/list">
							<Button>返回</Button>
						</Link>
					</div>
					<Modal
						title={showModal && showModal.title}
						visible={visible}
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

export default Agent;
