import React, { Component } from 'react'
import Search from "../components/cooperationPlatform/Search";
import TableList from "../components/cooperationPlatform/TableList";
import { Modal, Button, Spin } from 'antd';
import "./CooperationPlatform.less"
import { connect } from "react-redux";
import * as actions from '../../actions'
//@connect(state => state.cooperationPlatform, actions)
export default class CooperationPlatform extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: { title: "", content: "" },
			visible: false,
			isLoading: true
		};
	}
	componentDidMount = () => {
		this.setState({
			isLoading: false
		})
	}
	hideModal = () => {
		this.setState({ visible: false })
	}
	setShowModal = (isVisable, showModal) => {
		this.setState({
			visable: isVisable,
			showModal: showModal
		})
	}
	searchAsync = (params) => {
		this.setState({
			isLoading: true
		})
		console.log(params);
		setTimeout(() => {
			this.setState({
				isLoading: false
			})
		}, 1000);
	}
	render() {
		const { showModal, isLoading, visable } = this.state
		const searchProps = {
			searchAsync: this.searchAsync
		}
		return (
			<div className="cooperation-platform" >
				<fieldset className='fieldset-css'>
					<legend>查询</legend>
					<Search {...searchProps} />
				</fieldset>

				<a href="/config/platform/edit" target="_blank">
					<Button type="primary" style={{ margin: "10px 0px" }}>新增合作平台</Button>
				</a>
				<Spin spinning={isLoading} >
					<TableList />
				</Spin>
				<Modal
					title={showModal.title}
					visible={visable}
					onOk={this.hideModal}
					onCancel={this.hideModal}>
					{showModal.content}
				</Modal>
			</div>
		);
	}
}
