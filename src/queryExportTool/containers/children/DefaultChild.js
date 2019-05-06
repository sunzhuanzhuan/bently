import React, { Component } from "react"
import { withRouter } from 'react-router-dom'
import qs from "qs"
import AccountSearch from '../../components/accountList/SearchFrom/AccountSearch'
import AccountTable from '../../components/accountList/AccountTable'
import AccountTableSelect from '../../components/accountList/AccountTable/AccountTableSelect';
import { Spin } from "antd"
import { sensors } from '../../../util/sensor/sensors'
class DefaultChild extends Component {
	constructor(props) {
		super(props);
		this._isMounted = false;
		this.paramsAll = {};
	}
	state = {
		loading: true
	}
	componentDidMount() {
		this._isMounted = true;
		const { params: { platformType: group_id } } = this.props.match
		const { getFilters, getAccountList } = this.props.actions
		getFilters({ group_id })
		const search = qs.parse(this.props.location.search.substring(1))
		getAccountList({ group_id, page: 1, page_size: search.page_size || 20, keyword: search.keyword || '' }).then(results => {
			if (this._isMounted) {
				this.setState({
					loading: false
				})
			}
		});

	}
	componentWillUnmount() {
		this._isMounted = false;
	}

	onFilterSearch = (params) => {
		const { sku_open_quote_price = [], follower_count = [] } = params;
		const search = qs.parse(this.props.location.search.substring(1))
		let { platformType } = this.props.match.params;
		// const searchParamsString = qs.stringify(params);
		const urlAll = this.props.match.url
		let url = urlAll.slice(0, urlAll.lastIndexOf("/")) + "/" + platformType
		this.props.history.push({
			pathname: url,
			// search: searchParamsString,
			search: "?keyword=" + params.keyword || ''
		});
		this.setState({
			loading: true
		})
		//添加了空数组不穿给后台
		// const isShowSkuPrice = !sku_open_quote_price[0];
		// const isShowfollowerCount = follower_count[1] > 0 && follower_count[0] > 0
		// if (!isShowfollowerCount) {
		// 	delete params.follower_count
		// 	delete this.paramsAll.follower_count
		// }
		// if (!sku_open_quote_price[0]) {
		// 	delete params.sku_open_quote_price
		// 	delete this.paramsAll.sku_open_quote_price
		// }
		if (!sku_open_quote_price[0]) {
			if (params.sku_open_quote_price) {
				params.sku_open_quote_price[0] = ""
			}
		}
		if (!sku_open_quote_price[1]) {
			if (params.sku_open_quote_price) {
				params.sku_open_quote_price[1] = ""
			}
		}
		this.paramsAll = { ...this.paramsAll, ...params, group_id: platformType, page: 1, page_size: 20 }
		this.props.actions.getAccountList(this.paramsAll).then(() => {
			this.setState({
				loading: false
			})
		});
		sensors.track('accountSearchEvent', { platformType });
	}
	//关键字查询
	onCountClick = (activeKey) => {
		const search = qs.parse(this.props.location.search.substring(1))
		const urlAll = this.props.match.url
		let url = urlAll.slice(0, urlAll.lastIndexOf("/")) + "/" + activeKey
		this.props.history.push({
			pathname: url,
			search: "?keyword=" + search.keyword || '',

		});
	}
	//账号table分页查询方法
	serachAction = (params) => {
		this.setState({
			loading: true
		})
		const search = qs.parse(this.props.location.search.substring(1))
		let { platformType } = this.props.match.params;
		this.props.actions.getAccountList({ ...this.paramsAll, ...params, group_id: platformType, keyword: search.keyword || '', }).then(() => {
			this.setState({
				loading: false
			})
		});
	}

	isdBackUp = (isdBackUp) => {
		document.getElementById('app-content-children-id').scrollTop = 0
	}
	ruleUrlAddTrack = () => {
		let { platformType } = this.props.match.params;
		sensors.track('AccountSearchEvent', { app_id: 101, platformType: platformType, click_url: "https://wby-download-storage.oss-cn-beijing.aliyuncs.com/trinity/%E7%9F%AD%E8%A7%86%E9%A2%91%E5%B9%B3%E5%8F%B0%E6%94%BF%E7%AD%96%26%E8%A7%84%E5%88%99%E6%A6%82%E8%A7%88.pdf" });
	}
	render() {
		const search = qs.parse(this.props.location.search.substring(1))
		const { queryExportToolReducer, removeCartAccount, addSelectedRowKeysToCart, actions } = this.props;
		const { selectedRowKeys, selectedRowKeysObject, quotation_id } = this.props
		const { accountList, accountIdsByQuotation } = queryExportToolReducer;
		let { platformType } = this.props.match.params;
		let ruleUrl = {
			2: "查看微博微任务/weiq &粉丝头条下单规则",
			3: "查看短视频平台下单规则",
			4: "查看小红书下单规则"
		}
		const { statistic = {} } = accountList
		const countNum = statistic && Object.values(statistic).reduce((total, one) => total + one, 0)
		const header = <div className="table-title-wxy">
			<div>
				共<span>{countNum}</span>个账号
				&nbsp;&nbsp;&nbsp;
				{
					ruleUrl[platformType] ?
						<a href="https://wby-download-storage.oss-cn-beijing.aliyuncs.com/trinity/%E7%9F%AD%E8%A7%86%E9%A2%91%E5%B9%B3%E5%8F%B0%E6%94%BF%E7%AD%96%26%E8%A7%84%E5%88%99%E6%A6%82%E8%A7%88.pdf"
							target="_blank"
							onClick={this.ruleUrlAddTrack}
						>
							{ruleUrl[platformType]}
						</a> : null
				}
			</div>
			{search.keyword && <div>
				<div>微信公众号<span><a href="javascript:void(0)" onClick={() => this.onCountClick(1)}>{statistic[1]}</a></span>个</div>
				<div>新浪微博<span><a href="javascript:void(0)" onClick={() => this.onCountClick(2)}>{statistic[2]}</a></span>个</div>
				<div>视频/直播<span><a href="javascript:void(0)" onClick={() => this.onCountClick(3)}>{statistic[3]}</a></span>个</div>
				<div>小红书<span><a href="javascript:void(0)" onClick={() => this.onCountClick(4)}>{statistic[4]}</a></span>个</div>
				<div>其他平台<span><a href="javascript:void(0)" onClick={() => this.onCountClick(5)}>{statistic[5]}</a></span>个</div>
			</div>}
		</div>
		return <div >
			<AccountSearch keyword={search.keyword || ''} onFilterSearch={this.onFilterSearch} {...this.props} />
			<Spin spinning={this.state.loading}>
				{/*quotation_id>0代表走报价单选号车列表，已选的为选中不可编辑状态，选中值在前台保存。操作state
				另一个table的选中是后台返回is_select，操作action*/}
				<div>
					{quotation_id > 0 ?
						<AccountTable
							accountList={accountList}
							header={header}
							addSelectedRowKeysToCart={addSelectedRowKeysToCart}
							selectedRowKeys={selectedRowKeys}
							isShowDisable={quotation_id > 0}
							serachAction={this.serachAction}
							selectedRowKeysObject={selectedRowKeysObject}
							isObject={true}
							accountIdsByQuotation={accountIdsByQuotation}
							removeCartAccount={removeCartAccount}
							countNum={countNum}
							isShowNoFind={true}
							isdBackUp={this.isdBackUp}
						/> : <AccountTableSelect
							actions={actions}
							accountList={accountList}
							serachAction={this.serachAction}
							header={header}
							countNum={countNum}
							isShowNoFind={true}
							isdBackUp={this.isdBackUp} />}
				</div>
			</Spin>
		</div >
	}
}
export default withRouter(DefaultChild)

