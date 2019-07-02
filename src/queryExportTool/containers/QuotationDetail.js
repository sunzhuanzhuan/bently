import React, { Component } from 'react'
import { default as ToDownLoadCenter } from '../components/common/ToDownLoadCenter';
//报价单详情信息展示列表
import { default as DetailMessage } from "../components/quotationDetail/DetailMessage"
//标题左边的竖线组件
import { default as TitleLable } from '../components/common/TitleLable';
//导出验证
import { default as ApplyForExport } from '../components/common/ApplyForExport';
//无权限页面
import { default as NoPermiss } from "../components/quotationDetail/NoPermiss"
import { default as SelectCar, CarContent } from '../components/accountList/SelectCar';
import AccountTableSelect from '../components/accountList/AccountTable/AccountTableSelect';
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as action from '../actions/index'
import { Button, Row, Skeleton, Tabs, Modal, message, Icon } from 'antd';
import qs from "qs";
import ValueFormat from "@/queryExportTool/base/ValueFormat";
import { getPostFrom } from '../util/javaPostConfig'

const TabPane = Tabs.TabPane;
class QuotationDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			selectKey: 10,
			selectedRowKeys: [],//表格checkoutBox集合
			visible: false,
			detailLoading: false,
			messageInfo: {},//保存审核码信息给后台接口传递
			typeShow: 1,
			isShowNoPermiss: 1//展示页面内容类型1:null 2:列表数据 3:无权限页面
		};
	}
	componentDidMount = () => {
		const search = qs.parse(this.props.location.search.substring(1))
		this.setState({
			isLoading: true,
			detailLoading: true
		})
		const { getQuotationAccountSearch, getQuotationDetail } = this.props.actions
		const quotation_id = search.quotation_id
		getQuotationDetail({ quotation_id: quotation_id }).then((res) => {
			this.setState({
				detailLoading: false,
				isShowNoPermiss: 2
			})
		}).catch((error) => {
			//验证是否有权限
			if (error.data && error.data.code == 403) {
				this.setState({
					detailLoading: false,
					isLoading: false,
					isShowNoPermiss: 3
				})
			}
		})
		getQuotationAccountSearch(
			getPostFrom({ quotationId: parseInt(quotation_id) })
		).then(results => {
			this.setState({
				isLoading: false,
			})
		});
		//获取选号车的数据
		const { getAccountListFromCart } = this.props.actions
		getAccountListFromCart()
	}
	//打开弹窗
	showModel = () => {
		this.setState({
			visible: true
		})
	}
	//导出方法
	exportNew = () => {
		const search = qs.parse(this.props.location.search.substring(1))
		this.props.actions.preExportNumCheck({ type: "quotation", quotation_id: search.quotation_id }).then((res) => {
			if (res.data.check_result) {
				const { account_number, up_level, parent_name } = res.data
				const messageInfo = {
					account_number, up_level, parent_name
				}
				this.setState({
					messageInfo: messageInfo
				})
				this.setTypeshow(1, true)
			} else {
				this.exportOperate()
			}
		})
	}
	exportOperate = () => {
		const { quotationDetail = {} } = this.props.queryExportToolReducer
		const { id } = quotationDetail
		this.props.actions.quotationExport({ quotation_id: id })
		this.setState({
			typeShow: 4,
			visible: true
		})
	}
	setTypeshow = (typeShow, visible) => {
		this.setState({
			typeShow: typeShow,
			visible: visible
		})
	}
	//关闭弹窗
	handleCancel = () => {
		this.setState({
			visible: false
		})
	}
	setLoading = () => {
		const { isLoading } = this.state
		this.setState({
			isLoading: !isLoading
		})
	}
	onChangeTab = (key) => {
		this.setState({
			selectKey: key,
			selectedRowKeys: [],
			isLoading: true
		})
		const search = qs.parse(this.props.location.search.substring(1))
		const data = { ...search, groupType: key, quotationId: search.quotation_id }
		this.props.history.push({
			search: `?` + qs.stringify(data)
		})
		this.setLoading()
		if (key == 10) {
			delete data.groupType
		}
		this.props.actions.getQuotationAccountSearch(getPostFrom(data)).then(() => {
			this.setState({
				isLoading: false
			})
		})
	}

	addSelectedRowKeysToCart = (selectedRowKeys) => {
		this.setState({ selectedRowKeys })
	}
	batchRemove = (id, type, numberType, follower_count) => {
		//selectedRowKeys,
		const { selectKey } = this.state
		const search = qs.parse(this.props.location.search.substring(1))
		//this.props.actions.deleteFromCart({ account_ids: selectedRowKeys, quotation_id: search.quotation_id }).then((res) => {
		this.props.actions.deleteFromCart(
			{
				account_ids: [id],
				quotation_id: search.quotation_id,
				type: type,
				numberType: numberType,
				follower_count: follower_count
			}).then((res) => {
				message.success('删除成功', 2);
				let data = { groupType: selectKey, ...search }
				if (selectKey == 10) {
					data.groupType = 0
				}
				//暂时搜索
				this.props.actions.getQuotationAccountSearch(getPostFrom(data))
			})

	}
	applyCodeOk = () => {
		const { exportUrl, exportId } = this.state
		this.exportOperate(exportUrl, exportId)
		this.props.actions.quotationExport({ quotation_id: exportId })
		this.setState({
			typeShow: 4,
			visible: true
		})
	}
	serachAction = (value) => {
		const { selectKey } = this.state
		if (selectKey == 10) {
			value.groupType = 0
		}
		this.setLoading()
		this.props.actions.getQuotationAccountSearch(getPostFrom(value)).then(() => {
			this.setLoading()
		})
	}
	//清空购物车
	cleanCart = () => {
		this.props.actions.clearCart()
		this.props.actions.cleanBatchSearch()
	}

	render() {
		const { actions, queryExportToolReducer } = this.props
		const { quotationDetail, quotationAccountList, selectCartData } = queryExportToolReducer
		const { selectedRowKeys, visible, detailLoading,
			isLoading, messageInfo, typeShow, isShowNoPermiss, selectKey } = this.state
		const { codeCheck } = actions
		const { followerCount, parkAccountCount = 0, reservationAccountCount = 0 } = quotationAccountList
		const accountSum = reservationAccountCount + parkAccountCount
		const countSum = quotationAccountList.total || 0
		const tabList = [
			{ key: 10, tab: `全部${countSum}` },
			{ key: 1, tab: `微信公众号${quotationAccountList.tabList && quotationAccountList.tabList[1] || 0}` },
			{ key: 2, tab: `新浪微博${quotationAccountList.tabList && quotationAccountList.tabList[2] || 0}` },
			{ key: 3, tab: `视频/直播${quotationAccountList.tabList && quotationAccountList.tabList[3] || 0}` },
			{ key: 4, tab: `小红书${quotationAccountList.tabList && quotationAccountList.tabList[4] || 0}` },
			{ key: 5, tab: `其他平台${quotationAccountList.tabList && quotationAccountList.tabList[5] || 0}` },
		]

		const search = qs.parse(this.props.location.search.substring(1))
		const accountProps = {
			actions,
			queryExportToolReducer,
			addSelectedRowKeysToCart: this.addSelectedRowKeysToCart,
			accountList: quotationAccountList,
			isDeleteAction: true,
			tablePageSize: 20,
			batchRemove: this.batchRemove,
			serachAction: this.serachAction
		}
		const exportUrl = `/accountList/downloadCenter`
		const modelTypeMap = {
			1: <ApplyForExport codeCheck={codeCheck} applyCodeOk={this.applyCodeOk} handleCancel={this.handleCancel} messageInfo={messageInfo} />,
			4: <ToDownLoadCenter exportUrl={exportUrl} />
		}
		//选号车参数
		const selectProps = {
			actions,
			selectCartData: selectCartData,
			cleanCart: this.cleanCart,
			isAsync: true,
			searchCart: this.searchCart,
			cleanSelectExactQuery: actions.cleanSelectExactQuery
		}
		return (
			isShowNoPermiss == 3 ? <NoPermiss />
				: isShowNoPermiss == 2 ? <div id="Js-select-car-no-click-id">
					<Row>
						<h2 style={{ float: "left" }}>
							<Icon type="left-circle" style={{ marginRight: 4, cursor: "pointer" }} onClick={() => this.props.history.push("/accountList/quotationManage")} />
							报价单详情
						</h2>
						<div style={{ float: "right", marginRight: 60 }}>
							<Link to={`/accountList/quotaList/1?quotation_id=${search.quotation_id}&&quotation_name=${quotationDetail.name}`}>
								<Button style={{ marginRight: 20 }}>添加账号</Button>
							</Link>
							<Button type="primary" onClick={this.exportNew}>导出报价单</Button>
						</div>
					</Row>
					<TitleLable title="详细信息">
						<Skeleton loading={detailLoading} paragraph={{ rows: 6 }} active title={false}>
							<div>
								<DetailMessage quotationDetail={quotationDetail} />
							</div>
						</Skeleton >
					</TitleLable>
					<TitleLable title="账号信息" >
						<div>
							<div style={{ background: "#f5f5f5", padding: "8px 4px" }}>
								<span>账号总数：<span style={{ color: "#33CC00" }}>{accountSum}</span> （预约：{reservationAccountCount}   微闪投：{parkAccountCount}）    粉丝数：
							<ValueFormat value={followerCount > 0 ? followerCount : 0} format='large' />
									<span style={{ color: "#33CC00" }}>{quotationDetail.followers_count}</span></span>
							</div>
							<Tabs onChange={this.onChangeTab} defaultActiveKey="10">

								{tabList.map(one => {
									return <TabPane tab={one.tab} key={one.key}>
										<Skeleton loading={isLoading} paragraph={{ rows: 6 }} active >
											<div>
												<AccountTableSelect
													{...accountProps}

												/>
											</div>
										</Skeleton>
									</TabPane>
								})}
							</Tabs>
							<SelectCar number={selectCartData.total} isAsync={true}>
								<CarContent {...selectProps} />
							</SelectCar>
						</div>

					</TitleLable>
					<Modal
						title={typeShow == 4 ? "" : "申请导出报价单"}
						visible={visible}
						onCancel={this.handleCancel}
						width={typeShow == 4 ? 340 : 540}
						footer={false}
					>
						{modelTypeMap[typeShow]}
					</Modal>
				</div > : null

		);
	}
}

const mapStateToProps = (state) => {
	return {
		queryExportToolReducer: state.queryExportToolReducer,
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({ ...action }, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(QuotationDetail)
