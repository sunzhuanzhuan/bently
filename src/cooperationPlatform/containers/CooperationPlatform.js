import React, { Component } from 'react'
import Search from "../components/cooperationPlatform/Search";
import TableList from "../components/cooperationPlatform/TableList";
import { Modal, Button, Spin, message } from 'antd';
import "./CooperationPlatform.less"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from '../actions/index'
class CooperationPlatform extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: { title: "", content: "", width: '' },
			visable: false,
			isLoading: true,
			oldParams: {}
		};
	}
	componentDidMount = () => {
		const { actions: { getCooperationPlatformByPage } } = this.props
		getCooperationPlatformByPage({ page: { currentPage: 1, pageSize: 10 }, form: {} }).then(() => {
			this.setState({
				isLoading: false
			})
		})
	}
	searchByPageOrOther = (params = { page: { currentPage: 1, pageSize: 10 }, form: {} }) => {
		const { oldParams } = this.state
		this.setState({
			isLoading: true
		})
		const { actions: { getCooperationPlatformByPage } } = this.props
		getCooperationPlatformByPage({ ...oldParams, ...params }).then(({ data }) => {
			this.setState({
				isLoading: false,
				oldParams: params
			})
			if (data.total) message.warning('没有符合条件的记录！')
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
			message.success(`删除成功！`)
		})
	}
	//设置默认报价项
	setDefaultCO = (id, platformId) => {
		const { actions: { updatePlatformDefault } } = this.props
		updatePlatformDefault({ id: id, platformId: platformId }).then(() => {
			this.searchByPageOrOther()
			this.setShowModal()
			message.success(`您的操作已保存成功！`)
		})
	}
	//设置禁用或启用
	setStatusCO = (id, platformId, status) => {
		const { actions: { updatePlatformStatus } } = this.props
		updatePlatformStatus({ id: id, platformId: platformId, cooperationPlatformStatus: status }).then(() => {
			this.searchByPageOrOther()
			this.setShowModal()
			message.success(`您的操作已保存成功！`)
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
			searchByPageOrOther: this.searchByPageOrOther,
			setStatusCO: this.setStatusCO,
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
					destroyOnClose={true}
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
