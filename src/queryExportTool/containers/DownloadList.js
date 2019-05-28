import React, { Component } from 'react'
import { default as DownLoadBatchSearch } from "../components/downloadList/BatchSearch"
import { default as DownLoadBatchSearchTable } from "../components/downloadList/BatchSearchTable"
import { default as DownloadTable } from "../components/downloadList"
import { default as DownLoadSearch } from "../components/downloadList/Search"

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
			this.props.actions.getDownloadList({ page: 1, page_size: 20, ...data, type: selectKey, }).then(() => {
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
		this.props.actions.getDownloadList({ type: selectKey, ...params }).then(() => {
			this.setState({
				loading: false
			})
		})
	}
	searchDownload = (values) => {
		const search = qs.parse(this.props.location.search.substring(1))
		const newSearch = { ...search, ...values }
		this.props.history.push({
			search: `?` + qs.stringify(newSearch)
		})
		this.searchAndLoading(newSearch)
	}
	onChangePage = (pagination, pageSize) => {
		const param = { page: pagination, page_size: pageSize }
		this.searchDownload(param)
	}
	onShowSizeChange = (pagination, pageSize) => {
		const param = { page: pagination, page_size: pageSize }
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
			this.searchAndLoading()
		})
	}
	operateDownload = (id) => {
		this.props.actions.reDownload({ task_id: id }).then(() => {
			message.success("开始重新处理")
			this.searchDownload()
		})
	}
	downLoadById = (download_url, id) => {
		this.props.actions.download({ task_id: id }).then((res) => {
			this.searchDownload()
		})
		window.open(download_url)
	}
	render() {
		const { downloadList, companyList } = this.props.queryExportToolReducer;
		const { getDownloadList, getCompanyList } = this.props.actions
		const searchProps = {
			getDownloadList,
			setValueSearch: this.setValueSearch,
			companyList,
			getCompanyList
		}
		const { loading, selectKey } = this.state
		const search = qs.parse(this.props.location.search.substring(1))
		const paginationConfig = {
			showSizeChanger: true, showQuickJumper: true,
			total: downloadList.pagination && downloadList.pagination.total - 0,
			current: downloadList.pagination && downloadList.pagination.page - 0 || 1,
			pageSize: downloadList.pagination && downloadList.pagination.page_size - 0 || 20,
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
								downloadList={downloadList.rows}
								operateDownload={this.operateDownload}
								loading={loading}
								paginationConfig={paginationConfig}
								searchDownload={this.searchDownload}
								downLoadById={this.downLoadById}
							/>
						</div> : null}
					</TabPane>
					<TabPane tab="批量查号结果下载" key="2">
						{selectKey == 2 ? <div>
							<DownLoadBatchSearch {...searchProps} />
							<DownLoadBatchSearchTable
								downloadList={downloadList.rows}
								operateDownload={this.operateDownload}
								loading={loading}
								paginationConfig={paginationConfig}
								searchDownload={this.searchDownload}
								downLoadById={this.downLoadById}
							/>
						</div> : null}
					</TabPane>
				</Tabs>
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
	actions: bindActionCreators({ ...action, ...publicActions }, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DownloadList)
