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
			const { account_id = "", platform_id = "", base: { sns_name = "", sns_id = "", account_id: accountNone = "" } } = one
			return { account_id: account_id ? account_id : accountNone, platform_id: platform_id, sns_name: sns_name, sns_id: sns_id }
		})
		const data = { ...value, accounts: exportArr, search_field: searchValue.field_type, platform_id: searchValue.platform_id }
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
		if (value.query_type == 1) {
			this.props.actions.getBatchSearch({ ...value, page_size: 20, page: 1, accoutName: total }).then((data) => {
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
				return getBatchSearch({ ...value, keyword: arr.map(one => one.trim()).join(","), accoutName: total })
			});

			Promise.all(promises).then((posts) => {
				const exactQueryData = posts.reduce((prev, cur, index) => {
					return {
						data: {
							accounts: [...prev.data.accounts, ...cur.data.accounts],
							is_select: [...(prev.data.is_select && prev.data.is_select || []), ...(cur.data.is_select && cur.data.is_select || [])],
							statistic: {
								a: {
									on_shelf: (prev.data.statistic && prev.data.statistic.a.on_shelf) + (cur.data.statistic && cur.data.statistic.a.on_shelf),
									off_shelf: (prev.data.statistic && prev.data.statistic.a.off_shelf) + (cur.data.statistic && cur.data.statistic.a.off_shelf)

								},
								b: {
									on_shelf: (prev.data.statistic && prev.data.statistic.b.on_shelf) + (cur.data.statistic && cur.data.statistic.b.on_shelf),
									off_shelf: (prev.data.statistic && prev.data.statistic.b.off_shelf) + (cur.data.statistic && cur.data.statistic.b.off_shelf)
								},
								not_exist: (prev.data.statistic && prev.data.statistic.not_exist) + (cur.data.statistic && cur.data.statistic.not_exist),
								total: (prev.data.statistic && prev.data.statistic.total) + (cur.data.statistic && cur.data.statistic.total)
							}
						}
					}
				})
				this.setState({
					loading: false,
					showList: true,
					exactQueryData: exactQueryData.data,
					searchValue: value
				})
				addSelectExactQuery(exactQueryData.data.is_select && exactQueryData.data.is_select || [])
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
		const { statistic = {} } = searchValue.query_type == 1 ? batchSearchList : exactQueryData
		const { a = {}, b = {} } = statistic
		const header = <div style={{ marginTop: 2, color: "#666", float: "left" }}>
			一共匹配到了符合条件的账号 <a>{statistic.total}</a> 个，
		其中在A端上架 <a>{a.on_shelf}</a>个/下架 <a>{a.off_shelf}</a>个，
		B端上架 <a>{b.on_shelf}</a>个/下架 <a>{b.off_shelf}</a> 个
		</div>
		const modalMap = {
			1: <CreateTask onExportOperate={this.onExportOperate} buttonLoaing={buttonLoaing} />,
			2: <ToDownLoadCenter title="正在导出，10分钟后，您可前往“下载中心”下载。" exportUrl="/accountList/downloadCenter?type=2" />
		}
		return (
			<div >
				<BatchSearchCode batchSearch={this.batchSearch} filtersMetaMap={filtersMetaMap} />
				<Row>
					{searchValue.query_type == 1 ?
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
												<Button type="primary" onClick={() => this.showModal(1)} disabled={exactQueryData && exactQueryData.accounts.length <= 0}>导出全部账号</Button>
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
														共查询账号 <a>{statistic.total}</a> 个，
														其中在A端上架 <a>{a.on_shelf}</a>个/下架 <a>{a.off_shelf}</a>个，
														B端上架 <a>{b.on_shelf}</a>个/下架 <a>{b.off_shelf}</a> 个，不在库：<a>{statistic.not_exist}</a>个
													</div>
												</div>
											</Col>
											{statistic.total ? <Col span={6} style={{ textAlign: "right" }}>
												<Pagination
													simple
													total={statistic.total}
													onChange={this.onChangePageSize}
													defaultPageSize={200}
													pageSizeOptions={["20", "50", "100"]} />
											</Col> : null}
										</Row>
										{statistic.total ? <div>
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
