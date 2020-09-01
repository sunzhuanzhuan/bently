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
    this.platformIds = [];

	}
	state = {
		loading: true,
	}
	componentDidMount() {
		this._isMounted = true;
		const { params: { platformType: groupType } } = this.props.match
		const { getFilters, getAccountList } = this.props.actions
		getFilters({ groupType })
		this.serachStart()

	}
	serachStart = (searchSource, changeTab) => {
		const { getFilters, getAccountList } = this.props.actions
		const { params: { platformType: groupType } } = this.props.match
		const search = qs.parse(this.props.location.search.substring(1))
		const basePath = { defaultSort: search.keyword && search.keyword.length > 0 ? 2 : 1, platformIds: groupType == 5 ? [23] : [] }
    this.platformIds = basePath.platformIds;
		this.paramsAll = basePath
		getAccountList({
			groupType,
			currentPage: 1,
			searchSource: searchSource || 1,
			pageSize: search.pageSize || 20,
			keyword: search.keyword || '',
			...basePath
		}).then(results => {
			if (this._isMounted || changeTab) {
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
		const { skuOpenQuotePrice = [], operationTagIds = [], follower_count = [], isLowQuality, defaultSort } = params;
		const search = qs.parse(this.props.location.search.substring(1))
		let { platformType } = this.props.match.params;
		// const searchParamsString = qs.stringify(params);
		const urlAll = this.props.match.url
		let url = urlAll.slice(0, urlAll.lastIndexOf("/")) + "/" + platformType
		this.props.history.push({
			pathname: url,
			search: "?keyword=" + params.keyword || ''
		});
		this.setState({
			loading: true
		})
		//判断默认是否为默认排序1：默认选项，2：其他查询
		if (defaultSort == 1) {
			delete params.accountSort
			delete this.paramsAll.accountSort
		}
		if (isLowQuality == 1) {
			params.isLowQuality = 2
		}
		if (operationTagIds.length == 0) {
			params.operationTagIds = null
		}
		//添加了空数组不穿给后台
		if (!skuOpenQuotePrice[0]) {
			if (params.skuOpenQuotePrice) {
				params.skuOpenQuotePrice[0] = 0
			}
		}
		if (!skuOpenQuotePrice[1]) {
			if (params.skuOpenQuotePrice) {
				params.skuOpenQuotePrice = [params.skuOpenQuotePrice[0]]
			}
		}
		if (skuOpenQuotePrice[0] || skuOpenQuotePrice[1]) {
			params.skuOpenPrice = {
				openQuotePrices: params.skuOpenQuotePrice,
				skuTypeId: params.skuTypeId
			}
		} else {
			params.skuOpenPrice = null
		}
		//阅读单价和播放单价（java重构要求修改数据格式）
		if (params.skuUnitReadPrice) {
			params.skuUnitReadPrice = {
				skuTypeId: params.skuUnitReadPrice.name,
				unitPrices: params.skuUnitReadPrice.weight
			}
		}
		if (params.skuUnitPlayPrice) {
			params.skuUnitPlayPrice = {
				skuTypeId: params.skuUnitPlayPrice.name,
				unitPrices: params.skuUnitPlayPrice.weight
			}
		}

		delete this.paramsAll.isHighProfit;
		delete this.paramsAll.sortLabel;

		const { searchSource } = params;
		// searchSource === '3' 高利润账号
		if (searchSource && searchSource === '3') {
			const { onlineStatus, accountSort: { createdAt } = {} } = params;

			let sortLabel = 1; // 1 默认规则
			// 23 使用二三级规则
			(onlineStatus && !createdAt) && (sortLabel = 23);
			// 12 使用一二级规则
			(!onlineStatus && createdAt) && (sortLabel = 12);
			// 2 使用二级规则
			(onlineStatus && createdAt) && (sortLabel = 2);
			params.sortLabel = sortLabel;
			params.searchSource = '1';
			params.defaultSort = 2;
			params.isHighProfit = 1;
		}

		this.paramsAll = { ...this.paramsAll, ...params, groupType: platformType, currentPage: 1, pageSize: 20 }
		this.props.actions.getAccountList(this.paramsAll).then(() => {
			this.setState({
				loading: false
			})
		});
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
    this.props.actions.getAccountList({
      searchSource: 1,
      ...this.paramsAll,
      ...params,
      groupType: platformType,
      keyword: search.keyword || '',
    }).then(() => {
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
		const { selectedRowKeys, selectedRowKeysObject, quotationId } = this.props
		const { accountList, accountIdsByQuotation, addLookDetailOrIndexList } = queryExportToolReducer;
		let { platformType } = this.props.match.params;
		let ruleUrl = {
			2: "查看微博微任务/weiq &粉丝头条下单规则",
			3: "查看短视频平台下单规则",
			4: "查看小红书下单规则"
		}
		const { statistic = {} } = accountList
		const count = Object.values(statistic).reduce((prev, cur) => { return prev + cur }, 0)
		const header = <div className="table-title-wxy">
			<div>
				共<span>{search.keyword ? count : accountList.total}</span>个账号
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
				<div>微信公众号<span><a href="javascript:void(0)" onClick={() => this.onCountClick(1)}>{statistic[1] || 0}</a></span>个</div>
				<div>新浪微博<span><a href="javascript:void(0)" onClick={() => this.onCountClick(2)}>{statistic[2] || 0}</a></span>个</div>
				<div>视频/直播<span><a href="javascript:void(0)" onClick={() => this.onCountClick(3)}>{statistic[3] || 0}</a></span>个</div>
				<div>小红书<span><a href="javascript:void(0)" onClick={() => this.onCountClick(4)}>{statistic[4] || 0}</a></span>个</div>
				<div>其他平台<span><a href="javascript:void(0)" onClick={() => this.onCountClick(5)}>{statistic[5] || 0}</a></span>个</div>
			</div>}
		</div>
		return <div >
			<AccountSearch
				keyword={search.keyword || ''}
				onFilterSearch={this.onFilterSearch}
				{...this.props}
				serachStart={this.serachStart}
				defaultPlatformIds={this.platformIds}
			/>
			<Spin spinning={this.state.loading}>
				{/*quotationId>0代表走报价单选号车列表，已选的为选中不可编辑状态，选中值在前台保存。操作state
				另一个table的选中是后台返回isSelect，操作action*/}
				<div>
					{quotationId > 0 ?
						<AccountTable
							accountList={accountList}
							header={header}
							addSelectedRowKeysToCart={addSelectedRowKeysToCart}
							selectedRowKeys={selectedRowKeys}
							isShowDisable={quotationId > 0}
							serachAction={this.serachAction}
							selectedRowKeysObject={selectedRowKeysObject}
							isObject={true}
							accountIdsByQuotation={accountIdsByQuotation}
							removeCartAccount={removeCartAccount}

							isShowNoFind={true}
							isdBackUp={this.isdBackUp}
						/> : <AccountTableSelect
							actions={actions}
							accountList={accountList}
							serachAction={this.serachAction}
							header={header}
							isShowNoFind={true}
							isdBackUp={this.isdBackUp}
							addLookDetailOrIndexList={addLookDetailOrIndexList} />}
				</div>
			</Spin>
		</div >
	}
}
export default withRouter(DefaultChild)

