import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import * as exportDotDataAction from '../actions/exportDotData'
import { Table, Button, message } from 'antd';
import './ExportDotData.less'

class ExportDotData extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tableLoading: true
		}
	}
	loading = (bool) => {
		this.setState({
			tableLoading: bool
		})
	}
	//获取列表
	getExportDotDataList = (page) => {
		this.props.actions.getExportDotDataList({ pageNo: page, pageSize: 30 }).then(() => {
			this.loading(false)
		}).catch(() => {
			message.error("请求失败")
			this.loading(false)
		})
	}
	componentWillMount() {
		this.getExportDotDataList(1)
	}
	//分页
	changePage = (page) => {
		this.loading(true)
		this.getExportDotDataList(page)
	}
	// 下载
	download = (id, userId) => {
		this.props.actions.downloadDotData({ id: id, userId: userId }).then((res) => {
			window.location.href = res.data
		}).catch(() => {
			message.error("下载地址获取失败")
		})
	}
	render() {
		const columns = [
			{
				title: '文件名称',
				dataIndex: 'excelName',
				key: 'excelName',
				width: 400,
				render: text => <div className="overflow-ellipsis">{text}</div>
			}, {
				title: '提交人',
				dataIndex: 'userName',
				key: 'userName',
				width: 200,
				render: text => <div className="overflow-ellipsis">{text}</div>
			}, {
				title: '提交时间',
				dataIndex: 'exportTime',
				key: 'exportTime',
				width: 250,
				render: text => <span>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>
			}, {
				title: '数据导出时间',
				dataIndex: 'exportFinishTime',
				key: 'exportFinishTime',
				width: 250,
				render: text => <span>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>
			}, {
				title: '操作',
				dataIndex: 'action',
				key: 'action',
				width: 100,
				render: (text, record) =>
					<Button type="primary" onClick={() => this.download(record.id, record.userId)}>下载</Button>
			}
		];
		const { exportDotDataList } = this.props
		const { data } = exportDotDataList
		return (
			<div className="exportDotData">
				<div className="exportDotData-title">打点数据导出</div>
				<Table
					dataSource={data ? data.list : []}
					columns={columns}
					loading={this.state.tableLoading}
					pagination={{
						current: data ? data.pageNum : 1,
						pageSize: data ? data.pageSize : 30,
						total: data ? data.total : 0,
						onChange: (page) => this.changePage(page)
					}}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		exportDotDataList: state.orderReducers.exportDotDataList
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...exportDotDataAction
	}, dispatch)
})

export default connect(
	mapStateToProps,//redux和react连接起来
	mapDispatchToProps
)(ExportDotData)

