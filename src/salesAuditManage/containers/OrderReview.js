import React, { Component } from 'react'
import "./OrderReview.less";
import { FilterForm, ResultList } from "../components";
import DataStatistics from "../base/DataStatistics";
import { Breadcrumb } from "antd";
import { bindActionCreators } from "redux";
import * as commonActions from "@/actions";
import * as actions from "../actions";
import { connect } from "react-redux";
import qs from "qs";
import pickBy from "lodash/pickBy";
import { parseUrlQuery } from '@/util/parseUrl'

function handleQueryToParams(params) {
	let newParams = { ...params }
	newParams['project_id'] = params['project'] && params['project']['key']
	newParams['brand_id'] = params['brand'] && params['brand']['key']
	newParams['company_id'] = params['company'] && params['company']['key']
	newParams['sale_manager_id'] = params['sale_manager'] && params['sale_manager']['key']
	newParams['weibo_type'] = params['weibo_type'] && params['weibo_type']['key']
	newParams['link_check_status_for_sale'] = params['link_check_status_for_sale'] && params['link_check_status_for_sale']['key']
	newParams['data_check_status_for_sale'] = params['data_check_status_for_sale'] && params['data_check_status_for_sale']['key']
	return newParams
}

class OrderReview extends Component {
	state = {
		searchIng: true
	}
	handleSearch = (params = {}) => {
		const { ROGetOrderList } = this.props.actions
		const { push } = this.props.history
		const allParams = pickBy({ ...parseUrlQuery(), ...params }, e => !!e)
		push('?' + qs.stringify(allParams));
		this.queryData = allParams
		this.setState({ searchIng: true })
		ROGetOrderList(handleQueryToParams(allParams)).then(() => {
			this.setState({ searchIng: false })
		}).catch(() => {
			this.setState({ searchIng: false })
		})
	}

	componentWillMount() {
		const { actions, platforms, history: { push } } = this.props
		const { getAllPlatform } = actions
		if (!platforms.length) getAllPlatform()
		let initParams = parseUrlQuery()
		{ // 初始化查询条件
			initParams['page'] = initParams['page'] || 1
			initParams['pageSize'] = initParams['pageSize'] || 20
			initParams['link_check_status_for_sale'] = initParams['link_check_status_for_sale'] || {
				key: '3',
				label: '未审核'
			}
			initParams['data_check_status_for_sale'] = initParams['data_check_status_for_sale'] || {
				key: '0',
				label: '全部订单'
			}
			push('?' + qs.stringify(initParams));
			this.queryData = initParams
		}
		this.handleSearch(initParams)
	}

	render() {
		const { actions, salesAuditManage: { orderList }, platforms } = this.props
		const { total } = orderList
		return (<div className='sales-audit-manage audit-page'>
			<header className='header-container'>
				<Breadcrumb>
					<Breadcrumb.Item>订单执行数据审核</Breadcrumb.Item>
				</Breadcrumb>
				<fieldset className="field-form-container">
					<legend>搜索</legend>
					<FilterForm search={this.handleSearch} initialValue={parseUrlQuery()} actions={actions} platforms={platforms} />
				</fieldset>
			</header>
			<main className='main-container'>
				<DataStatistics data={[`共${total}条订单`]} />
				<ResultList loading={this.state.searchIng} data={orderList} actions={actions} onPageChange={(page, pageSize) => {
					this.handleSearch({ page, pageSize })
				}} search={this.handleSearch} />
			</main>
		</div>);
	}
}

const mapStateToProps = (state) => {
	return {
		salesAuditManage: state.salesAuditManage,
		platforms: state.commonReducers.platforms.map(({ pid, platform_name }) => ({
			label: platform_name,
			value: pid
		}))
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...commonActions, ...actions }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderReview)
