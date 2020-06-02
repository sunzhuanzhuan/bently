import React, { Component } from 'react'
import { default as DownLoadBatchSearch } from "../components/downloadList/BatchSearch"
import { default as DownLoadBatchSearchTable } from "../components/downloadList/BatchSearchTable"
import { default as DownloadTable } from "../components/downloadList"
import { default as DownLoadSearch } from "../components/downloadList/Search"
import AuthVisbleIsBP from './AuthVisbleIsBP'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from '../actions/index'
import * as publicActions from '@/actions'
import { Tabs, message } from 'antd';
import qs from 'qs'
const TabPane = Tabs.TabPane;
class DownloadList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pageSize: 20,
			loading: true,
			selectKey: 1
		};
	}
	setValueSearch = (valueSearch) => {
		const search = qs.parse(this.props.location.search.substring(1))
		this.props.history.push({
			search: `?` + qs.stringify(valueSearch)
		})

		this.searchAndLoading({ ...search, ...valueSearch })

	}
	componentDidMount = () => {
		const search = qs.parse(this.props.location.search.substring(1))
		const data = { ...search, type: search && search.type || 1 }
		const selectKey = search && search.type || 1
		this.setState({
			selectKey
		}, () => {
			this.props.actions.getDownloadList({ currentPage: 1, pageSize: 20, ...data, taskType: selectKey, }).then(() => {
				this.setState({
					loading: false
				})
			})
		})
	}

	searchAndLoading = (params) => {
		const { selectKey } = this.state
		this.setState({
			loading: true
		})
		this.props.actions.getDownloadList({ taskType: selectKey, ...params }).then(() => {
			this.setState({
				loading: false
			})
		})
	}
	searchDownload = (values) => {
		const search = qs.parse(this.props.location.search.substring(1))
		const newSearch = {
			currentPage: 1,
			pageSize: 20,
			...search, ...values
		}
		this.props.history.push({
			search: `?` + qs.stringify(newSearch)
		})
		this.searchAndLoading(newSearch)
	}
	onChangePage = (pagination, pageSize) => {
		const param = { currentPage: pagination, pageSize: pageSize }
		this.searchDownload(param)
	}
	onShowSizeChange = (pagination, pageSize) => {
		const param = { currentPage: pagination, pageSize: pageSize }
		this.setState({
			pageSize: pageSize
		})
		this.searchDownload(param)
	}
	onChangeTab = (type) => {
		this.setState({ selectKey: type }, () => {
			this.props.history.push({
				search: `?` + qs.stringify(type)
			})
			this.searchAndLoading({ currentPage: 1, pageSize: 20, })
		})
	}
	operateDownload = (id) => {
		this.props.actions.reDownload({ taskId: id }).then(() => {
			message.success("开始重新处理")
			this.searchDownload()
		})
	}
	downLoadById = (download_url, id) => {
		this.props.actions.download({ taskId: id }).then((res) => {
			this.searchDownload()
		})
		window.open(download_url)
	}
	render() {
		const { authorizationsReducers, queryExportToolReducer } = this.props
		const { downloadList, companyList } = queryExportToolReducer
		const { getDownloadList, getCompanyList } = this.props.actions
		const searchProps = {
			getDownloadList,
			setValueSearch: this.setValueSearch,
			companyList,
			getCompanyList
		}
		//是否BP角色
		const isBPAuthVisble = authorizationsReducers.authVisibleList['is.bp']
		const { loading, selectKey } = this.state
		const search = qs.parse(this.props.location.search.substring(1))
		const paginationConfig = {
			showSizeChanger: true, showQuickJumper: true,
			total: downloadList.pagination && downloadList.pagination.total - 0,
			current: downloadList.pagination && downloadList.pagination.page - 0 || 1,
			pageSize: downloadList.pagination && downloadList.pagination.pageSize - 0 || 20,
			onChange: this.onChangePage,
			onShowSizeChange: this.onShowSizeChange
		}
		return (
			<div>
				<h2>下载中心</h2>
				<Tabs onChange={this.onChangeTab} defaultActiveKey={search && search.type || "1"} animated={false}>
					<TabPane tab="报价单下载" key="1">
						{selectKey == 1 ? <div>
							<DownLoadSearch {...searchProps} />
							<DownloadTable
								isBPAuthVisble={isBPAuthVisble}
								downloadList={downloadList.list}
								operateDownload={this.operateDownload}
								loading={loading}
								paginationConfig={paginationConfig}
								searchDownload={this.searchDownload}
								downLoadById={this.downLoadById}
							/>
						</div> : null}
					</TabPane>
					{isBPAuthVisble ? null : <TabPane tab="批量查号结果下载" key="2">
						{selectKey == 2 ? <div>
							<DownLoadBatchSearch {...searchProps} />
							<DownLoadBatchSearchTable
								downloadList={downloadList.list}
								operateDownload={this.operateDownload}
								loading={loading}
								paginationConfig={paginationConfig}
								searchDownload={this.searchDownload}
								downLoadById={this.downLoadById}
							/>
						</div> : null}
					</TabPane>}

				</Tabs>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		queryExportToolReducer: state.queryExportToolReducer,
		authorizationsReducers: state.authorizationsReducers
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({ ...action, ...publicActions }, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DownloadList)
