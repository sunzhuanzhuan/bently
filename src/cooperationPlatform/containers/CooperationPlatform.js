import React, { Component } from 'react'
import Search from "../components/cooperationPlatform/Search";
import TableList from "../components/cooperationPlatform/TableList";
import { Modal, Button, Spin } from 'antd';
import "./CooperationPlatform.less"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from '../actions/index'
import axios from "axios";
class CooperationPlatform extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: { title: "", content: "", width: '' },
			visable: false,
			isLoading: true,
		};
	}
	componentDidMount = () => {
		const { actions: { getCooperationPlatformByPage } } = this.props
		getCooperationPlatformByPage({ page: { currentPage: '1', pageSize: '10' } }).then(() => {
			this.setState({
				isLoading: false
			})
		})
	}
	searchByPageOrOther = (params) => {
		this.setState({
			isLoading: true
		})
		const { actions: { getCooperationPlatformByPage } } = this.props
		getCooperationPlatformByPage(params).then(() => {
			this.setState({
				isLoading: false
			})
		})
	}
	hideModal = () => {
		this.setState({ visable: false })
	}
	setShowModal = (isVisable, showModal) => {
		if (isVisable) {
			this.setState({
				visable: isVisable,
				showModal: showModal
			})
		} else {
			this.hideModal()
		}
	}
	//删除合作平台操作
	deleteCO = (id) => {
		const { actions: { delPlatform } } = this.props
		delPlatform({ id: id }).then(() => {
			this.searchByPageOrOther()
		})
	}
	//设置默认报价项
	setDefaultCO = (id) => {
		const { actions: { updatePlatformDefault } } = this.props
		updatePlatformDefault({ id: id }).then(() => {
			this.searchByPageOrOther()
		})
	}

	render() {
		const { showModal, isLoading, visable } = this.state
		const { cooperationPlatformReducer: { cooperationPlatformByPageList }, actions } = this.props
		const searchProps = {
			searchByPageOrOther: this.searchByPageOrOther,
		}
		const listProps = {
			setShowModal: this.setShowModal,
			cooperationPlatformByPageList,
			actions,
			deleteCO: this.deleteCO,
			setDefaultCO: this.setDefaultCO,
			searchByPageOrOther: this.searchByPageOrOther
		}
		return (
			<div className="cooperation-platform" >
				<div className="head-title">合作平台管理<span style={{ padding: '0px 15px' }}>/</span>合作平台配置</div>
				<fieldset className='fieldset-css'>
					<legend>查询</legend>
					<Search {...searchProps} />
				</fieldset>

				<a href="/config/platform/edit" target="_blank">
					<Button type="primary" style={{ margin: "10px 0px" }}>新增合作平台</Button>
				</a>
				<Spin spinning={isLoading} >
					<TableList {...listProps} />
				</Spin>
				<Modal
					title={showModal.title}
					visible={visable}
					width={showModal.width}
					onCancel={this.hideModal}
					footer={null}>
					{showModal.content}
				</Modal>
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
export default connect(mapStateToProps, mapDispatchToProps)(CooperationPlatform);
