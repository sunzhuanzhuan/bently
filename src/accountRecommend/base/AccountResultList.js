import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './AccountResultList.less'
import { Table, Tooltip, Icon, } from "antd"
import * as actions from "../actions/listApi"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import FilterAction from '../actions/FilterAction'
import AccountFaceInfo from './accountbaseInfo/AccountFaceInfo'
import AccountNameInfo from './accountbaseInfo/AccountNameInfo'
import AccountLabelIcon from './accountbaseInfo/AccountLabelIcon'
import ColumnReferencePrice from './accountbaseInfo/ColumnReferencePrice'
import weixinPlatfrom from './image/list_wechat_2x.png'
import weiboPlatfrom from './image/list_sina_2x.png'

class AccountResultList extends Component {
	// constructor(){
	// 	super()
	// 	this.state={
	// 		sortedInfo: null,
	// 		loading:false
	// 	}
	// }
	state = { sortedInfo: null }
	async componentWillReceiveProps(nextProps) {
		if (this.checkArrObj(nextProps.filterParams.postApi, this.props.filterParams.postApi,
			["online_status", "is_vip", "can_origin", "is_famous", 'sorttype', 'page', 'sortkey']))
			return false
		let data = this.props.weiboType == 9 ? await this.props.actions.FilterList(nextProps.filterParams.postApi) : await this.props.actions.sinaList(nextProps.filterParams.postApi)
		this.props.actions.getList(data)
		this.setState({ loading: true })
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
	handleChange = async (pagination, filter, sorter = {}) => {
		let sorttype = sorter.order;
		let page = pagination.current;
		let sortkey = sorter.columnKey;
		this.props.actions.postApi({ sorttype, page, sortkey, task_id: this.props.taskId })
		this.setState({
			sortedInfo: sorter,
		});
	}
	putAwayAccount() {
		// console.log(this)
		// this.setState({loading:true})
		let putAwayAccount = document.getElementById('putAwayAccount')
		putAwayAccount.checked == true ? this.props.actions.postApi({ "online_status": 1, 'task_id': this.props.taskId, 'page': 1 }) : this.props.actions.postApi({ "online_status": null, 'task_id': this.props.taskId, 'page': 1 })
	}

	weixinApprove() {
		let weixinApprove = document.getElementById('weixinApprove')
		weixinApprove.checked == true ? this.props.actions.postApi({ "is_vip": 1, 'task_id': this.props.taskId, 'page': 1 }) : this.props.actions.postApi({ "is_vip": null, 'task_id': this.props.taskId, 'page': 1 })
	}
	originWrite() {
		let originWrite = document.getElementById('originWrite')
		originWrite.checked == true ? this.props.actions.postApi({ "can_origin": 1, 'task_id': this.props.taskId, 'page': 1 }) : this.props.actions.postApi({ "can_origin": null, 'task_id': this.props.taskId, 'page': 1 })
	}
	render() {
		let { sortedInfo } = this.state;
		sortedInfo = sortedInfo || {};
		const paginationConf = {
			sina: this.props.filterParams["sinaPagination"],
			weixin: this.props.filterParams["wechatPagination"]
		}
		const pagination = paginationConf[this.props.platform]
		let paginationObj = {
			total: pagination.total,
			pageSize: 20,
			current: pagination.currentPage
		};
		let { FilterList, taskId } = this.props;
		const columnConfig = [
			{
				title: "账号",
				dataIndex: "accountInfo",
				key: "accountInfo",
				align: "left",
				width: '250px',
				render: (text, record) => {
					return (
						<div className="account-info">
							{/* 头像 */}
							<AccountFaceInfo
								account={record}
								isVipShow={false}
								ref={c => (this.AccountFaceInfo = c)}
							/>
							<div className="account-info-wrap">
								<div className="account-info-others">
									<p className="account-name">
										{/* 平台图标 */}
										<img className='accountR-platform' src={record.weibo_type == 1 ? weiboPlatfrom : weixinPlatfrom}></img>
										{/* 微信认证 */}
										{record.weibo_type == 9 && record.is_vip == 1 ?
											<span className='accountR-renzheng'></span>
											: null}
										{/* 账号名 */}
										<AccountNameInfo account={record} />
									</p>
									{record.weibo_type == 9 ?
										<em>
											<span>ID:{record.weibo_id}</span>
										</em>
										: null}
									{/* 账号标签 */}
									<AccountLabelIcon account={record} />
								</div>
							</div>
						</div>
					)
				}
			},
			{
				title: '粉丝数',
				dataIndex: "followers_count",
				key: "followers_count",
				align: "center",
				width: "110px",
				sorter: true,
				sortOrder: sortedInfo.columnKey === 'followers_count' && sortedInfo.order,
				render: (text, record) => {
					return <div>
						<span>{record.followers_count}</span>
					</div>
				}
			},
			{
				title: "参考报价",
				dataIndex: "price",
				key: "price",
				align: "left",
				minWidth: "420px",
				render: (text, record) => {
					return <ColumnReferencePrice account={record} />
				}
			},
			{
				title:
					(
						<span>
							<em style={{ fontStyle: 'normal' }}>SNBT</em>
							<Tooltip title="SNBT指的是社交媒体账号的影响力指数，是微博易独特的专利技术，数值范围：0~100，数值越高表示账号质量越好">
								<Icon style={{ fontSize: 16, cursor: 'pointer', marginLeft: 6 }} type="question-circle" />
							</Tooltip>
						</span>
					),
				dataIndex: "snbt",
				key: "snbt",
				align: "center",
				width: "100px",
				sorter: true,
				sortOrder: sortedInfo.columnKey === 'snbt' && sortedInfo.order,
				render: (text, record) => {
					return <div>
						<span>{record.snbt == "-" ? "-" : Number(record.snbt).toFixed(1)}</span>
					</div>
				}
			},
			{
				title: "关键词提及文章数",
				dataIndex: "keyword_article_count",
				key: "keyword_article_count",
				align: "center",
				width: "160px",
				sorter: true,
				sortOrder: sortedInfo.columnKey === 'keyword_article_count' && sortedInfo.order,
				render: (text, record) => {
					return <div>
						<span>{record.keyword_article_count}</span>
					</div>
				}
			},
			{
				title: "账号状态",
				dataIndex: "static",
				key: "static",
				align: "left",
				width: "140px",
				render: (text, record) => {
					return <div>
						<span>{record.online_status == 0 ? "不在库" : null}</span>
						<span>{record.online_status == 2 ? "下架" : null}</span>
						<span>{record.online_status == 1 ? "上架" : null}</span>
					</div>
				}
			},
		]
		const columns = columnConfig;
		const dataSource = this.props.FilterList ? this.props.FilterList.list : null
		const loading = this.props.loading || this.state.loading;
		return (
			<div className='accountList-result'>
				<div className="account-total clearfix">
					<span className="account-total-content">
						{/*<Icon className="account-tip-icon" type="exclamation-circle-o" />*/}
						<span>结合您的账号要求，推荐关键词提及次数最高的</span>
						<span className="color-high-light">
							{FilterList ? FilterList.total : null}
						</span>
						<span> 个账号</span>
					</span>
					{/*checkbox选择框*/}
					<span className='account-platform-checkout'>
						<input type="checkbox" id='putAwayAccount' onClick={this.putAwayAccount.bind(this)} /><em>上架账号</em>
						<input type="checkbox" id='weixinApprove' onClick={this.weixinApprove.bind(this)} /><em>认证账号</em>
						{this.props.platform == 'weixin' ? <a><input type="checkbox" id='originWrite' onClick={this.originWrite.bind(this)} /><em>原创写稿</em></a> : null}

					</span>
					{/*预约 微闪头选择*/}
					<span className='account-userSelect'>
						<em onClick={() => { this.props.actions.postApi({ "is_famous": 1, 'task_id': taskId, 'page': 1 }) }}>预约</em>
						<em onClick={() => { this.props.actions.postApi({ "is_famous": 2, 'task_id': taskId, 'page': 1 }) }}>v闪投</em>
						<em onClick={() => { this.props.actions.postApi({ "is_famous": null, 'task_id': taskId, 'page': 1 }) }}>不限</em>
					</span>
				</div>
				{/*table 表格 以上是账号统计*/}
				<div>
					<Table
						rowKey={record => record.account_id}
						columns={columns}
						dataSource={dataSource}
						onChange={this.handleChange}
						pagination={paginationObj}
						loading={loading}
					/>
				</div>
			</div>)
	}
}
const mapStateToProps = state => {
	return {
		filterParams: state.filterParams,
		postApi: state.postApi,
		getList: state.getList
	}
}
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...actions,
		...FilterAction
	}, dispatch)
})
export default (connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(AccountResultList)))
