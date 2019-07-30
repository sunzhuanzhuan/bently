import React, { Component } from 'react'
import { Route, withRouter, Link, Switch } from 'react-router-dom'
import lazyLoadComponent from 'lazy-load-component'
import * as publicActions from './actions'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from './actions/index'
import "./index.less";

const AccountList = lazyLoadComponent(() => import('./containers/AccountList'))
const SelectCarList = lazyLoadComponent(() => import('./containers/SelectCarList'))
const QuotationManage = lazyLoadComponent(() => import('./containers/QuotationManage'))
const QuotationDetail = lazyLoadComponent(() => import('./containers/QuotationDetail'))
const DownloadList = lazyLoadComponent(() => import('./containers/DownloadList'))
const AccountDetails = lazyLoadComponent(() => import('./containers/AccountDetails'))
const GlobalAccountSearch = lazyLoadComponent(() => import('./containers/GlobalAccountSearch'))
import Test from './containers/Test'

const TempMenu = () => {
	return <div style={{ height: '30px', background: '#fff', textAlign: 'center' }}>
		<Link style={{ paddingLeft: 10 }} to="/accountList/list/1">账号列表</Link>
		<Link style={{ paddingLeft: 10 }} to="/accountList/selectCarList">选号车列表</Link>
		<Link style={{ paddingLeft: 10 }} to="/accountList/quotationManage">报价单管理</Link>
		<Link style={{ paddingLeft: 10 }} to="/accountList/quotationManage/detail?quotation_id=1&&quotation_name=asdad">报价单详情</Link>
		<Link style={{ paddingLeft: 10 }} to="/accountList/downloadCenter">下载中心</Link>
		<Link style={{ paddingLeft: 10 }} to="/accountList/accountDetails">账号详情</Link>

	</div>
}
class AccountEnterIndex extends Component {
	state = {}

	componentDidMount() {
		// this.props.actions.getAccountListFromCart()
		//获取公司下拉列表
		// this.props.actions.getCompanyList()
	}
	render() {
		const { params } = this.props.match;
		// const { selectCartData } = this.props.queryExportToolReducer;
		return (
			<div className="query-export-tool">
				{/* <TempMenu /> */}
				{/* <Switch>

				</Switch> */}
				{/*账号列表*/}
				<Route exact path={`/accountList/list/:platformType`} component={AccountList} />
				{/*选号车列表*/}
				<Route exact path='/accountList/selectCarList' component={SelectCarList} />
				{/*报价单管理*/}
				<Route exact path='/accountList/quotationManage' component={QuotationManage} />
				{/*报价单详情*/}
				<Route exact path='/accountList/quotationManage/detail' component={QuotationDetail} />
				{/*报价单账号列表*/}
				<Route exact path='/accountList/quotaList/:platformType' component={AccountList} />
				{/* 下载中心 */}
				<Route exact path='/accountList/downloadCenter' component={DownloadList} />
				{/* lzb测试组件 */}
				<Route exact path='/accountList/test' component={Test} />
				{/* 账号详情 */}
				<Route exact path='/accountList/accountDetails' component={AccountDetails} />
				{/* 全局账号搜索 */}
				<Route path='/globalAccountSearch' component={GlobalAccountSearch} />
			</div >
		);
	}
}
const mapStateToProps = (state) => {
	return {
		queryExportToolReducer: state.queryExportToolReducer,
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({ ...action, ...publicActions }, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountEnterIndex)




