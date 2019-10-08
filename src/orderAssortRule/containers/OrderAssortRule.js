import React, { Component } from 'react';
import SearchForm from '../components/SearchForm'
import TableList from '../components/TableList'
import './OrderAssortRule.less'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as action from "../actions";
import { Modal, Spin } from 'antd';
class OrderAssortRule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			searchParam: {},
			modelConfig: {
				title: '',
				content: ''
			},
			isLoading: true
		}
		this.setOrderState = this.setOrderState.bind(this)
	}
	setOrderState(params) {
		this.setState(params)
	}
	componentDidMount() {
		this.searchAsync()
		this.props.actions.getRegionList()
	}
	setModal = (visible, modelConfig) => {
		this.setState({
			visible: visible,
			modelConfig: modelConfig ? modelConfig : this.state.modelConfig
		});
	};
	handleCancel = () => {
		this.setState({
			visible: false,
		});
	}

	changeSearchParam = (params) => {
		this.setState({
			searchParam: params
		})
		this.searchAsync(params)
	}
	changePage = (page, pageSize) => {
		const { searchParam } = this.state
		this.searchAsync({ ...searchParam, page: page, pageSize })
	}

	searchAsync = async (searchParam) => {
		this.setState({
			isLoading: true
		})
		await this.props.actions.getBPList({ page: 1, pageSize: 50, ...searchParam })
		this.setState({
			isLoading: false
		})
	}
	render() {
		const { orderAssortRule, actions } = this.props
		const { listBP, regionList } = orderAssortRule
		const { modelConfig, isLoading } = this.state
		const searchParam = {
			changeSearchParam: this.changeSearchParam,
			regionList
		}
		const commomParam = {
			actions: actions,
		}
		const tableProps = {
			listBP, actions,
			setModal: this.setModal,
			pagination: {
				onChange: this.changePage,
				current: listBP.page || 1,
				pageSize: listBP.pageSize || 50,
			},
			setOrderState: this.setOrderState
		}
		return (
			<div className='order-assort-rule'>
				<h2>BP/订单分配规则</h2>
				<SearchForm  {...searchParam} {...commomParam} />
				<Spin spinning={isLoading}>
					<TableList  {...tableProps} {...commomParam} />
				</Spin>

				<Modal
					title={modelConfig.title + 'BP/订单分配规则'}
					footer={null}
					visible={this.state.visible}
					onCancel={this.handleCancel}
					destroyOnClose={true}
					width={666}
				>
					{modelConfig.content}
				</Modal>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		orderAssortRule: state.orderAssortRule
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(action, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderAssortRule);

