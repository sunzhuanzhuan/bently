import React, { Component } from 'react';
import SearchForm from '../components/SearchForm'
import TableList from '../components/TableList'
import './OrderAssortRule.less'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as action from "../actions";
import { Modal } from 'antd';
class OrderAssortRule extends Component {
	state = {
		visible: false,
		searchParam: {},
		modelConfig: {
			title: '',
			content: ''
		}
	}
	componentDidMount() {
		this.searchAsync()
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
		const searchParam = { current: 1, pageSize: 50, ...params }
		this.setState({
			searchParam: searchParam
		})
		this.searchAsync(searchParam)
	}
	changePage = (current, pageSize) => {
		const { searchParam } = this.state
		this.searchAsync({ searchParam, current, pageSize })
	}

	searchAsync = (searchParam) => {
		this.props.actions.getBPList(searchParam)
	}
	render() {
		const { orderAssortRule, actions } = this.props
		const { listBP } = orderAssortRule
		const { modelConfig } = this.state
		const searchParam = {
			changeSearchParam: this.changeSearchParam
		}
		const commomParam = {
			actions: actions,
		}
		const tableProps = {
			listBP, actions,
			setModal: this.setModal,
			pagination: { onChange: this.changePage },
		}
		return (
			<div className='order-assort-rule'>
				<h2>BP/订单分配规则</h2>
				<SearchForm  {...searchParam} {...commomParam} />
				<TableList  {...tableProps} {...commomParam} />

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

