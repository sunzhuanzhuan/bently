import React, { Component } from 'react';
import SearchForm from '../components/SearchForm'
import TableList from '../components/TableList'
import './OrderAssortRule.less'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as action from "../actions";
class OrderAssortRule extends Component {
	state = {
		searchParam: {}
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
		console.log("TCL: OrderAssortRule -> searchAsync -> searchParam", searchParam)
	}
	render() {
		const dataSource = [
			{
				key: '1',
				name: '胡彦斌',
				age: 32,
				address: '西湖区湖底公园1号',
			},
			{
				key: '2',
				name: '胡彦祖',
				age: 42,
				address: '西湖区湖底公园1号',
			},
		];
		return (
			<div className='order-assort-rule'>
				<h1>BP/订单分配规则</h1>
				<SearchForm changeSearchParam={this.changeSearchParam} />
				<TableList data={dataSource} pagination={{ onChange: this.changePage }} />
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

