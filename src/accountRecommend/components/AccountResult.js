import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Row, Col, Select, Spin } from 'antd';
import AccountResultFilter from '../base/AccountResultFilter'
import AccountResultList from '../base/AccountResultList'
import qs from 'qs'
import * as actions from "../actions/listApi"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import FilterAction from '../actions/FilterAction'
const Option = Select.Option;

class AccountResult extends Component {
	constructor() {
		super()
		this.task_id = null
		this.weibo_type = null
		this.state = ({ FilterData: '', sinaFilterData: '', loading: true, })
	}
	async componentWillMount() {
		this.props.filterParams.filterParams = null
		let loc = qs.parse(window.location.search.substring(1))
		this.task_id = loc.task_id
		this.weibo_type = loc.weibo_type
		//筛选
		let data = this.weibo_type == 9 ? await this.props.actions.getFilterData({ task_id: this.task_id }) : null//微信筛选
		let sinaFilterData = this.weibo_type == 1 ? await this.props.actions.sinaFilter({ task_id: this.task_id }) : null
		//列表
		let weixinListdata = this.weibo_type == 9 ? await this.props.actions.FilterList({ task_id: this.task_id }) : null
		let sinaListdata = this.weibo_type == 1 ? await this.props.actions.sinaList({ task_id: this.task_id }) : null
		this.props.actions.getList(this.weibo_type == 9 ? weixinListdata : sinaListdata)
		this.setState({
			FilterData: this.weibo_type == 9 ? data['data'] : null,
			sinaFilterData: this.weibo_type == 1 ? sinaFilterData['data'] : null,
			FilterList: this.weibo_type == 9 ? this.props.filterParams.getList['data'] : null,
			loading: false
		})
	}
	async componentWillReceiveProps(nextProps) {
		if (this.checkArrObj(this.props.filterParams.postApi, nextProps.filterParams.postApi,
			["source"])) { return false }
		let data = this.weibo_type == 9 ? await this.props.actions.FilterList(nextProps.filterParams.postApi) : await this.props.actions.sinaList(nextProps.filterParams.postApi)
		// this.setState({ loading: false })
		debugger
		this.setState({ loading: true })
		this.props.actions.getList(data)
	}
	componentDidUpdate() {
		if (this.state.loading) {
			this.setState({ loading: false })
		}
	}
	checkArrObj(obj, oldObj, arr) {
		for (let i = 0; i < arr.length; i++) {
			if (obj[arr[i]] !== oldObj[arr[i]]) {
				return false;
			}
		}
		return true
	}
	handleUpdateFilterData(filterData) {
		this.setState({
			FilterData: filterData
		})
	}
	render() {
		// let self = this
		let FilterData = this.state.FilterData;
		let sinaFilterData = this.state.sinaFilterData;
		let FilterList = this.props.weixinData && this.props.weixinData;
		let sinaList = this.props.weixinData && this.props.weixinData;

		return (
			<Spin spinning={this.state.loading}>
			<div className='account-result'>
				{
					this.task_id ?
						<div>
							<Col>
								<div>
									<Row>
										<Col span={19}>
											<h2>关键词账号推荐推荐结果</h2>
										</Col>
										<Col span={4} push={1}>
											<Select allowClear placeholder='请选择' style={{ width: 150 }} defaultValue={1}>
												<Option value={1} onClick={async () => {
													this.setState({ loading: true })
													await this.props.actions.postApi(
														{ "source": 1, 'task_id': this.task_id, 'page': 1 },
													)
												}}>展示库内账号</Option>
												<Option value={0} onClick={async () => {
													this.setState({ loading: true })
													await this.props.actions.postApi(
														{ "source": 0, 'task_id': this.task_id, 'page': 1 })
												}}>展示所有抓取账号</Option>
											</Select>
										</Col>
									</Row>
								</div>
							</Col>

							{this.weibo_type == 9 ? <AccountResultFilter FilterData={FilterData} handleUpdateFilterData={this.handleUpdateFilterData} platform={'weixin'} weiboType={this.weibo_type} taskId={this.task_id} /> : null}
							{this.weibo_type == 1 ? <AccountResultFilter FilterData={sinaFilterData} platform={'sina'} weiboType={this.weibo_type} taskId={this.task_id}  /> : null}

							{this.weibo_type == 9 ? <AccountResultList FilterList={FilterList} platform={'weixin'} weiboType={this.weibo_type} taskId={this.task_id} loading={this.state.loading} /> : null}
							{this.weibo_type == 1 ? <AccountResultList FilterList={sinaList} platform={'sina'} weiboType={this.weibo_type} taskId={this.task_id} loading={this.state.loading} /> : null}
						</div>
						: null
				}
			</div>
		</Spin>
		)
	}
}
const mapStateToProps = state => (
	{
		// ...state,
		filterParams: state.filterParams,
		postApi: state.postApi,
		getList: state.getList,
		weixinData: state.filterParams.getList.data
	}
)
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...actions,
		...FilterAction
	}, dispatch)
})
export default (connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(AccountResult)))
