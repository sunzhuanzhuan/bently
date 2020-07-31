import React, { Component } from 'react';
import { Tabs, Pagination, Spin, Modal } from 'antd';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from '../actions/index'
import * as publicActions from '@/actions'
// import { QuotationTable, StencilTable, QuotationSearch, ApplyForExport, ToDownLoadCenter } from "../components";


//报价单表格
import { default as QuotationTable } from "../components/quotation/QuotationTable.js"
//报价单模版列表
import { default as StencilTable } from "../components/quotation/StencilTable"
//报价单查询
import { default as QuotationSearch } from "../components/quotation/Search"
//导出验证
import { default as ApplyForExport } from '../components/common/ApplyForExport';
//去下载中心
import { default as ToDownLoadCenter } from '../components/common/ToDownLoadCenter';


import qs from 'qs'
import "./QuotationManage.less"
import { CreateTemplate } from "../../components/exportTemplate";
const TabPane = Tabs.TabPane;
class QuotationManage extends Component {
  $search = React.createRef();
	constructor(props) {
		super(props);
		this.state = {
			pageSize: 20,
			selectKey: 1,
			isLoading: true,
			visible: false,
			exportUrl: "",
			exportId: 0,
			typeShow: 1,//modal展示哪个
			templateId: 0,
			messageInfo: {}
		};
	}
	//打开弹窗
	showModel = () => {
		this.setState({
			visible: true
		})
	}
	//关闭弹窗
	handleCancel = () => {
		this.setState({
			visible: false
		})
	}
	//设置展示类型
	setTypeShow = (type, isShow) => {
		this.setState({
			typeShow: type,
			visible: isShow
		})
	}
	//设置loading
	setLoading = () => {
		const { isLoading } = this.state
		this.setState({ isLoading: !isLoading })
	}
	componentDidMount = () => {
		this.props.actions.getQuotationList({ pageNum: 1, pageSize: 20 }).then(() => {
			this.setState({ isLoading: false })
		})
	}

	changeTab = (selectKey) => {
		this.setState({ selectKey }, () => {
			this.searchTab({})
			this.props.history.push({
				search: `?` + qs.stringify({ pageNum: 1, pageSize: 20 })
			})
		})
	}
	searchTab = (newSearch) => {
		const { selectKey } = this.state
		this.setLoading()
		if (selectKey == 1) {
			this.props.actions.getQuotationList({ ...newSearch, pageNum: 1, pageSize: 20 }).then(() => {
				this.setState({ isLoading: false })
			})
		} else {
			this.props.actions.getStencilList({ ...newSearch, pageNum: 1, pageSize: 20 }).then(() => {
				this.setState({ isLoading: false })
			})
		}
	}
	searchDownload = (values) => {
		const search = qs.parse(this.props.location.search.substring(1))
		const newSearch = { ...search, ...values }
		this.props.history.push({
			search: `?` + qs.stringify(newSearch)
		})
		const { selectKey } = this.state
		this.setLoading()
		if (selectKey == 1) {
			this.props.actions.getQuotationList({ ...newSearch }).then(() => {
				this.setLoading()
			})
		} else {
      this.props.history.push({
        search: `?` + qs.stringify({})
      });
      this.$search.current.resetFields();
      let search = newSearch;
      search.name = '';
      search.companyId = '';
			this.props.actions.getStencilList({ ...search }).then(() => {
				this.setLoading()
			})
		}
	}
	//分页
	onChange = (pagination, pageSize) => {
		const param = { pageNum: pagination, pageSize: pageSize }
		this.searchDownload(param)
	}
	onShowSizeChange = (pagination, pageSize) => {
		const param = { pageNum: pagination, pageSize: pageSize }
		this.setState({
			pageSize: pageSize
		})
		this.searchDownload(param)
	}
	//导出
	applyCodeOk = () => {
		const { exportId } = this.state
		this.props.actions.quotationExport({ quotationId: exportId })
		this.handleCancel()
		this.setTypeShow(4, true)
	}
	//导出最新
	exportNew = (exportId, exportUrl) => {
		this.setState({
			exportUrl,
			exportId
		})
		this.props.actions.preExportNumCheck({ exportType: 2, quotationId: exportId }).then((res) => {

			if (res.data.checkRes == 2) {
				const { accountNumber, upLevel, parentName } = res.data
				const messageInfo = {
					accountNumber, upLevel, parentName
				}
				this.setState({
					messageInfo: messageInfo
				})
				this.setTypeShow(1, true)
			} else {
				this.props.actions.quotationExport({ quotationId: exportId })
				this.setTypeShow(4, true)
			}
		})

	}

	//关闭页面操作
	handleClose = () => {
		this.handleCancel()
		this.searchDownload({ pageNum: 1, pageSize: 20 })
	}
	//修改页面操作
	editTemple = (id) => {
		this.setState({ templateId: id })
		this.setTypeShow(3, true)

	}
	render() {
		const { stencilList, quotationList, companyList } = this.props.queryExportToolReducer;
		const { quotationExport, codeCheck, getCompanyList } = this.props.actions
		const { isLoading, visible, templateId, typeShow, selectKey, messageInfo, exportUrl } = this.state
		const paginationConfig = {
			showSizeChanger: true,
			showQuickJumper: true,
			onChange: this.onChange,
			onShowSizeChange: this.onShowSizeChange,
		}
		const quotationProps = {
			quotationList,
			quotationExport,
			exportNew: this.exportNew,
			paginationConfig,
			isLoading
		}
		const stencilProps = {
			stencilList,
			editTemple: this.editTemple,
			paginationConfig,
			isLoading
		}

		const tablist = [
			{ tab: "报价单列表", key: "1", table: <QuotationTable {...quotationProps} />, searchProps: { isStencil: false }, list: quotationList },
			{ tab: "报价单模版", key: "2", table: <StencilTable {...stencilProps} />, searchProps: { isStencil: true, setTypeShow: this.setTypeShow }, list: stencilList }]

		return (
			<div >
				<h2>报价单管理</h2>
				<Tabs onChange={this.changeTab} animated={false}>
          {tablist.map((one, index) => {
						return <TabPane tab={one.tab} key={one.key}>
              <div>
                <QuotationSearch wrappedComponentRef={this.$search} {...one.searchProps} companyList={companyList} searchTab={this.searchTab} getCompanyList={getCompanyList}/>
                {one.table}
              </div>
						</TabPane>
					})}
				</Tabs>
				<Modal
					title={typeShow == 4 ? "" : "申请导出报价单"}
					visible={visible}
					onCancel={this.handleCancel}
					width={typeShow == 4 ? 340 : 540}
					footer={false}
				>
					<div>
						{visible ?

							typeShow == 1 ? <ApplyForExport codeCheck={codeCheck} applyCodeOk={this.applyCodeOk} handleCancel={this.handleCancel} messageInfo={messageInfo} /> :
								typeShow == 2 ? <CreateTemplate show={visible} close={this.handleClose} type={"create"} /> :
									typeShow == 3 ? <CreateTemplate show={visible} close={this.handleClose} type={"edit"} templateId={templateId} /> :
										typeShow == 4 ? <ToDownLoadCenter exportUrl={exportUrl} /> : null
							: null}
					</div>
				</Modal>
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
)(QuotationManage)
