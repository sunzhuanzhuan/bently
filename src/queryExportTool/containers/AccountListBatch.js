import React, { Component } from 'react'
import { Button, Modal, Row, Col, Pagination, Spin } from "antd"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from '../actions/index'
import { withRouter } from "react-router-dom";
import qs from "qs";
import images from '../images'
import "./AccountListBatch.less";
// import {
// 	BatchTable, BatchSearchCode,
// 	CreateTask, AccountTableSelect, ToDownLoadCenter
// } from "../components";

import { default as BatchTable } from "../components/accountList/BatchTable"
//批量找号查询组件
import { default as BatchSearchCode } from '../components/accountList/SearchFrom/BatchSearchCode';
//文件名称
import { default as CreateTask } from "../components/accountList/CreateTask"
import { default as AccountTableSelect } from '../components/accountList/AccountTable/AccountTableSelect';
//去下载中心
import { default as ToDownLoadCenter } from '../components/common/ToDownLoadCenter';

import { sensors } from '@/util/sensor/sensors'
const { location } = window;

class AccountListBatch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showTypeList: 2,
			visible: false,
			loading: false,
			showList: false,
			searchValue: {},
			showModalType: 1,
			buttonLoaing: false,
			getBatchSearch: {},
			exactQueryData: {}
		};
	}
	componentDidMount = () => {
		const { getFiltersMeta, getAccountListFromCart } = this.props.actions
		getFiltersMeta()
	}
	//点击关闭弹窗
	handleCancel = () => {
		this.setState({
			visible: false
		})
	}
	//打开弹窗
	showModal = (type) => {
		this.setState({
			visible: true,
			showModalType: type
		})
	}
	//导出
	onExportOperate = (value) => {
		const { searchValue } = this.state
		const { exactQueryData } = this.state
		const { accounts = [] } = exactQueryData
		const exportArr = accounts.map(one => {
			const { accountId = "", platformId = "", snsName = "", snsId = "", accountId: accountNone = "" } = one
			return {
				account_id: accountId ? accountId : accountNone,
				platform_id: platformId,
				sns_name: snsName,
				sns_id: snsId
			}
		})
		const data = {
			...value,
			accounts: exportArr,
			search_field: searchValue.fieldType,
			platform_id: searchValue.platformId
		}
		this.setState({
			buttonLoaing: true
		})
		this.props.actions.batchAccountExport(data).then((res) => {
			this.setState({ buttonLoaing: false, showModalType: 2 })
		})

	}
	//批量找号的分页
	onChangePageSize = (pagination, pageSize) => {
		const param = { page: pagination, limit: pageSize }
		this.searchList(param)
	}
	//切换分页
	onShowSizeChange = (pagination, pageSize) => {
		const param = { page: pagination, limit: pageSize }
		this.setState({
			pageSize: pageSize
		})
		this.searchList(param)
	}

	searchList = (param) => {
		const { searchValue } = this.state

		this.props.history.push({
			search: `?` + qs.stringify({ ...param }),
		})
		this.setLoading({ loading: true })
		this.props.actions.getBatchSearch({ ...param, ...searchValue, accoutName: null }).then((data) => {
			this.setState({
				loading: false,
				showList: true
			})

		})

	}

	//批量查询
	batchSearch = (value) => {
		const total = value.accoutName.length
		this.setLoading()
		const { getBatchSearch, addSelectExactQuery } = this.props.actions
		if (value.queryType == 1) {
			this.props.actions.getBatchSearch({ ...value, pageSize: 20, currentPage: 1, accoutName: total }).then((data) => {
				this.setState({
					loading: false,
					showList: true,
					searchValue: value
				})
			})
		} else {

			const pageSize = 40
			const lastNum = total % pageSize
			const promisesArr = []
			for (var i = 0; i < parseInt(total / pageSize); i++) {
				promisesArr.push(value.accoutName.slice(i * pageSize, (i + 1) * pageSize))
			}
			if (lastNum) {
				promisesArr.push(value.accoutName.slice(total - lastNum, total))
			}
			const promises = promisesArr.map(function (arr) {
				return getBatchSearch({ ...value, accoutName: total })
			});

			Promise.all(promises).then((posts) => {
				const exactQueryData = posts.reduce((prev, cur, index) => {
					return {
						data: {
							result: {
								list: [...prev.data.result.list, ...cur.data.result.list],

							},
							statistic: {
								aOnShelf: (prev.data.statistic && prev.data.statistic.aOnShelf) + (cur.data.statistic && cur.data.statistic.aOnShelf),
								aOffShelf: (prev.data.statistic && prev.data.statistic.aOffShelf) + (cur.data.statistic && cur.data.statistic.aOffShelf),
								bOnShelf: (prev.data.statistic && prev.data.statistic.bOnShelf) + (cur.data.statistic && cur.data.statistic.bOnShelf),
								bOffShelf: (prev.data.statistic && prev.data.statistic.bOffShelf) + (cur.data.statistic && cur.data.statistic.bOffShelf),
								notExist: (prev.data.statistic && prev.data.statistic.notExist) + (cur.data.statistic && cur.data.statistic.notExist),
								total: (prev.data.statistic && prev.data.statistic.total) + (cur.data.statistic && cur.data.statistic.total)
							}
						}
					}
				})
				const exactQueryDataUpdate = {
					list: exactQueryData.data.result.list,
					...exactQueryData.data
				}
				this.setState({
					loading: false,
					showList: true,
					exactQueryData: exactQueryDataUpdate,
					searchValue: value
				})
				addSelectExactQuery(exactQueryData.data.result.list.filter(one => one.isSelected == 1).map(one => one.accountId))
			})
		}
	}

	//设置loading
	setLoading = () => {
		const { loading } = this.state
		this.setState({
			loading: !loading
		})
	}
	//设置显示modal的内容
	setShowTypeList = (type) => {
		this.setState({ showTypeList: type })
	}
	serachAction = (params) => {
		this.setState({
			loading: true,
		})
		const { searchValue } = this.state
		this.props.actions.getBatchSearch({ ...params, ...searchValue, accoutName: null }).then((res) => {
			this.setState({
				loading: false,
			})
		})
	}
	isdBackUp = () => {
		document.getElementById('app-content-children-id').scrollTop = 0
	}
	render() {
		const search = qs.parse(this.props.location.search.substring(1))
		const { showTypeList, visible, loading, showList, searchValue, showModalType, buttonLoaing, exactQueryData = {} } = this.state
		const { queryExportToolReducer, actions } = this.props;
		const { batchSearchList, filtersMetaMap, arrSelectExactQuery, addLookDetailOrIndexList } = queryExportToolReducer;
		//精确查询使用exactQueryData拼接数据，模糊查询直接使用batchSearchList
		const { statistic = {}, } = searchValue.queryType == 1 ? batchSearchList : exactQueryData
		const { aOffShelf = 0, aOnShelf = 0, bOffShelf = 0, bOnShelf = 0, notExist = 0 } = statistic
		//精确查询在statistic取，模糊查询在result里取
		let total = searchValue.queryType == 1 ? batchSearchList.total : statistic.total
		const header = <div style={{ marginTop: 2, color: "#666", float: "left" }}>
			一共匹配到了符合条件的账号 <a>{total}</a> 个，
		其中在A端上架 <a>{aOnShelf}</a>个/下架 <a>{aOffShelf}</a>个，
		B端上架 <a>{bOnShelf}</a>个/下架 <a>{bOffShelf}</a> 个
		</div>
		const modalMap = {
			1: <CreateTask onExportOperate={this.onExportOperate} buttonLoaing={buttonLoaing} />,
			2: <ToDownLoadCenter title="正在导出，10分钟后，您可前往“下载中心”下载。" exportUrl="/accountList/downloadCenter?type=2" />
		}
		return (
			<div >
				<BatchSearchCode batchSearch={this.batchSearch} filtersMetaMap={filtersMetaMap} />
				<Row>
					{searchValue.queryType == 1 ?
						<Spin spinning={loading} >
							<AccountTableSelect
								addLookDetailOrIndexList={addLookDetailOrIndexList}
								isdBackUp={this.isdBackUp}
								accountList={batchSearchList}
								header={header}
								actions={actions}
								serachAction={this.serachAction}

							/>
						</Spin>
						:
						<Spin spinning={loading} >
							<div style={{ height: 40 }}>
								{showList ?
									<div>
										<div className="batch-search-middle-line">
											<div className="button-export">
												<Button type="primary" onClick={() => this.showModal(1)} disabled={exactQueryData && exactQueryData.list && exactQueryData.list.length <= 0}>导出全部账号</Button>
											</div>
											<div className="img-action">
												<img src={showTypeList == 1 ? images.cardActivePng : images.cardPng} width="14" onClick={() => { this.setShowTypeList(1) }} />
												<img src={showTypeList == 2 ? images.listActivePng : images.listPng} width="14" onClick={() => { this.setShowTypeList(2) }} />
											</div>
										</div>

										<Row className='batch-search-title-message'>
											<Col span={18} >
												<div className="title">
													<div style={{ marginTop: 2, color: "#666" }}>
														共查询账号 <a>{total}</a> 个，
														其中在A端上架 <a>{aOnShelf}</a>个/下架 <a>{aOffShelf}</a>个，
														B端上架 <a>{bOnShelf}</a>个/下架 <a>{bOffShelf}</a> 个，不在库：<a>{notExist}</a>个
													</div>
												</div>
											</Col>
											{total ? <Col span={6} style={{ textAlign: "right" }}>
												<Pagination
													simple
													total={total}
													onChange={this.onChangePageSize}
													defaultPageSize={200}
													pageSizeOptions={["20", "50", "100"]} />
											</Col> : null}
										</Row>
										{total ? <div>
											<BatchTable
												addLookDetailOrIndexList={addLookDetailOrIndexList}
												accountList={exactQueryData}
												type={showTypeList}
												actions={actions}
												arrSelectExactQuery={arrSelectExactQuery}
											/>
											<Row style={{ float: "right", margin: 10 }}>
												<Pagination
													total={statistic.total}
													defaultPageSize={200}
													current={search && search.page || 1}
													onChange={this.onChangePageSize}
													onShowSizeChange={this.onShowSizeChange}
													pageSizeOptions={["20", "50", "100"]}
												/>
											</Row>
										</div> : null}
										<Modal
											title={showModalType == 1 ? "创建导出任务" : ""}
											visible={visible}
											onOk={this.handleOk}
											onCancel={this.handleCancel}
											footer={false}
											width={showModalType == 1 ? 540 : 320}
										>
											{modalMap[showModalType]}
										</Modal>
									</div> : null}
							</div>
						</Spin>}
				</Row>

			</div>
		);
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
)(withRouter(AccountListBatch))
