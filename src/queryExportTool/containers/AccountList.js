import React, { Component } from "react"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import { StickyContainer, Sticky } from 'react-sticky';
import * as action from '../actions/index'
import { Tabs, Spin, BackTop, message } from "antd"
import qs from "qs";
import DefaultChild from './children/DefaultChild'
import "./AccountList.less"
import { WBYPlatformIcon } from "wbyui"
import AccountListBatch from "./AccountListBatch"
import { default as SelectCar, CarContent } from '../components/accountList/SelectCar';
import platform from "../constants/platform";
import debounce from 'lodash/debounce';
import MaskBox from "../base/MaskBox";

const TabPane = Tabs.TabPane;
// const renderTabBar = (props, DefaultTabBar) => (
// 	<Sticky bottomOffset={80}>
// 		{({ style }) => (
// 			<DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff' }} />
// 		)}
// 	</Sticky>
// );
class AccountList extends Component {

	constructor(props) {
		super(props);
		this.loaded = false
		this.onTabsChange = debounce(this.onTabsChange, 100);
	}
	state = {
		selectedRowKeys: [],
		selectedRowKeysObject: [],
		selectCartInterimList: {},
		selectLoading: false,
		quotationId: 0,
		quotationName: "",
	}
	componentDidMount = () => {
		const { getAccountListFromCart } = this.props.actions
		const search = qs.parse(this.props.location.search.substring(1))
		const { getAccountIdsByQuotation } = this.props.actions
		/* 此处quotationId > 0是走报价单添加账号，把已选在table里勾选 */
		if (search.quotationId > 0) {
			getAccountIdsByQuotation({ quotationId: search.quotationId }).then((res) => {
				this.setState({
					selectedRowKeys: res.data && res.data.accountIds || [],
					quotationId: search.quotationId,
					quotationName: search.quotationName
				})
			})
		} else {
			getAccountListFromCart({
				groupType: '',
				startPageSize: 1,
				endPageSize: 10
			})

		}
	}
	//切换Tab标签
	onTabsChange = (activeKey = "1") => {
		const search = qs.parse(this.props.location.search.substring(1))
		//是否是报价单
		const urlAll = this.props.match.url
		let url = urlAll.slice(0, urlAll.lastIndexOf("/")) + "/" + activeKey
		let queryParams = {
			pageSize: search.pageSize,
		}
		const { quotationId, quotationName } = this.state
		if (quotationId > 0) {
			queryParams = {
				quotationId: quotationId,
				quotationName: quotationName
			}
		}
		url += "?" + qs.stringify(queryParams)
		this.props.history.push(url);
	}

	//设置
	setAccountState = (object) => {
		this.setState({ ...object })
	}
	//报价单的选中添加账号逻辑
	addSelectedRowKeysToCart = (object, selected, list) => {
		const { quotationAccountList = {} } = this.props.queryExportToolReducer
		const { accountList = [] } = quotationAccountList
		const quotationAccountId = accountList.map(one => one.accountId)
		this.setState({
			...object
		})
		const filterData = object.selectedRowKeysObject.filter(one => !quotationAccountId.includes(one.accountId))
		this.setState({
			selectedRowKeysObject: filterData
		}, () => {
			this.getSelectCartInterimList()
		})
	}
	//删除方法
	removeCartAccount = (value) => {
		this.props.actions.removeFromCart({ stagingIds: value })
		// .then(() => {
		// 	this.props.actions.getAccountListFromCart()
		// })
	}
	getSaveCart = (list) => {
		return list.map(one => ({ accountId: one.accountId, platformId: one.platformId }))
	}
	//报价单的保存
	addQuotation = () => {
		const quotationId = this.state.quotationId
		const { selectedRowKeysObject } = this.state
		const accounts = this.getSaveCart(selectedRowKeysObject)
		if (accounts.length > 0) {
			this.props.actions.addToQuotation({
				quotationId, accounts
			}).then(() => {
				window.location.href = `/accountList/quotationManage/detail?quotationId=${quotationId}`
			})
		}
	}
	//报价单的删除
	deleteCart = (ids, group_type) => {
		const isQuotation = this.state.quotationId > 0
		const { selectedRowKeysObject, selectedRowKeys } = this.state
		if (isQuotation) {
			this.setState({
				selectedRowKeysObject: selectedRowKeysObject.filter(one => one.accountId != ids),
				selectedRowKeys: selectedRowKeys.filter(one => one != ids)
			}, () => {
				this.getSelectCartInterimList(group_type)
			})
		}
	}
	//报价单的清空
	cleanCart = () => {
		const isQuotation = this.state.quotationId > 0
		this.setState({
			selectedRowKeysObject: [],
			selectedRowKeys: [],
			selectCartInterimList: {
				total: 0,
				tabList: {},
				data: []
			}
		})
		if (!isQuotation) {
			this.props.actions.clearCart()
			this.props.actions.cleanBatchSearch()
		}
	}
	//选号车查询
	searchCart = (group_type) => {
		const isQuotation = this.state.quotationId > 0
		if (isQuotation) {
			this.getSelectCartInterimList(group_type)
		}
	}
	//处理临时数据（报价单添加账号选号车数据）
	getSelectCartInterimList = (type) => {
		const { selectedRowKeysObject = [] } = this.state
		//微信
		const weChatList = this.getWeiboTypeList(platform.platform.weChat, selectedRowKeysObject)
		//新浪微博
		const sinaList = this.getWeiboTypeList(platform.platform.sina, selectedRowKeysObject)
		//视频
		const videoList = this.getWeiboTypeList(platform.platform.video, selectedRowKeysObject)
		//小红书
		const redList = this.getWeiboTypeList(platform.platform.redBook, selectedRowKeysObject)
		//其他            
		const otherList = this.getWeiboTypeList(platform.platform.other, selectedRowKeysObject)
		const dataList = { "1": weChatList, "2": sinaList, "3": redList, "4": videoList, "5": otherList }
		const tabList = {
			1: weChatList.length,
			2: sinaList.length,
			3: redList.length,
			4: videoList.length,
			5: otherList.length,
		}
		const total = { total: selectedRowKeysObject.length }
		//此处是处理选好车需要的数据项
		const data = (type > 0 ? dataList[type] : selectedRowKeysObject).map(one => ({
			"id": one.accountId,
			"accountId": one.accountId,
			"stagingId": one.accountId,
			"snsName": one.snsName,
			"followerCount": one.followerCount,
			"platformId": one.platformId,
			"avatarUrl": one.avatarUrl,
			"isFamous": one.isFamous
		}))
		const selectCartInterimList = {
			...total, data: data, tabList: tabList
		}
		this.setState({ selectCartInterimList })
	}
	//根据全量数据过滤接口传递数据
	getWeiboTypeList = (type, list, isInclude) => {
		const data = list.filter(item => type.includes(item.platformId))
		return data.length > 0 ? data : []
	}

	render() {

		const { match, queryExportToolReducer, actions } = this.props;
		let { platformType } = match.params;
		const { selectedRowKeys, selectedRowKeysObject, selectCartInterimList, selectLoading } = this.state
		const { quotationName, quotationId } = this.state
		const isQuotation = quotationId > 0
		const { selectCartData, } = queryExportToolReducer;
		//获取平台图标
		function getShowImg(type, key) {
			return <span className="tab-icon-style"><WBYPlatformIcon
				weibo_type={type}
				icon_type={key == platformType ? "default" : "gray"}
				widthSize={14}
			/></span>
		}
		function getTabsGrops() {
			let tabsGrops = [
				{ name: <div>{getShowImg(9, 1)}微信公众号</div>, group_type: 1 },
				{ name: <div>{getShowImg(1, 2)}新浪微博</div>, group_type: 2 },
				{ name: <div>{getShowImg(9000, 3)}视频/直播</div>, group_type: 3 },
				{ name: <div>{getShowImg(93, 4)}小红书</div>, group_type: 4 },
				{ name: <div>{getShowImg(10000, 5)}其他平台</div>, group_type: 5 }]
			if (!isQuotation) {
				tabsGrops.push({ name: "批量找号", group_type: 6 })
			}
			return tabsGrops
		}
		//账号列表参数
		const tableProps = {
			removeCartAccount: this.removeCartAccount,
			addSelectedRowKeysToCart: this.addSelectedRowKeysToCart,
			selectedRowKeysObject,
			selectedRowKeys,
			quotationId: quotationId,
		}
		//选号车参数
		const selectProps = {
			selectCartData: isQuotation ? selectCartInterimList : selectCartData,
			cleanCart: this.cleanCart,
			quotationId: quotationId,
			addQuotation: this.addQuotation,
			deleteCart: this.deleteCart,
			searchCart: this.searchCart,
			selectLoading: selectLoading,
			isAsync: !isQuotation,
			cleanSelectExactQuery: actions.cleanSelectExactQuery
		}

		const heardText = <h2>{quotationId > 0 ? `请为【${quotationName}】报价单，选择您心仪的账号` : "账号列表"}</h2>
		return <div >
			<MaskBox />
			<div id="Js-select-car-no-click-id">
				<BackTop />
				{heardText}
				<Tabs onChange={this.onTabsChange} animated={false} activeKey={platformType.toString()}>
					{
						getTabsGrops().map((item, index, array) => {
							return <TabPane tab={item.name} key={item.group_type} style={index == 0 ? { minHeight: 1000 } : null}>
								{
									item.group_type != 6 && platformType == item.group_type ?
										<DefaultChild
											{...this.props}
											{...tableProps}
											setAccountState={this.setAccountState}
										/>
										: platformType == 6 ? <AccountListBatch {...tableProps} /> : null
								}
							</TabPane>
						})
					}
				</Tabs>
			</div>
			{isQuotation && platformType == 6 ? null :
				<SelectCar number={isQuotation ? selectCartInterimList.total : selectCartData.total}
					selectLoading={selectLoading}
					isAsync={!isQuotation}

				>
					<CarContent {...selectProps} actions={actions} />
				</SelectCar>
			}
		</div>
	}
}

const mapStateToProps = (state) => {
	return {
		queryExportToolReducer: state.queryExportToolReducer,
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(action, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountList)

