import React, { Component } from 'react'
import { Button, Modal, Row, Tabs, Radio, Col, Checkbox, Skeleton, message, Popconfirm } from 'antd';
import "./SelectCarList.less";
// import { ExportAllAccout, ApplyForExport, AccountTable, ListZero, ToDownLoadCenter } from "../components";

//选号车保存模版
import { default as ExportAllAccout } from "../components/selectCarList/ExportAllAccout"
//导出验证
import { default as ApplyForExport } from '../components/common/ApplyForExport';
//账号列表
import { default as AccountTable } from '../components/accountList/AccountTable';
//选好号无数据
import { default as ListZero, NowNoFind, AllNoFind } from '../components/common/NoFind';
//去下载中心
import { default as ToDownLoadCenter } from '../components/common/ToDownLoadCenter';

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from '../actions/index'
import * as publicActions from '@/actions'
import Link from 'react-router-dom/Link';
import { CreateTemplate } from "../../components/exportTemplate";
import qs from 'qs'
import { getPostFrom } from '../util/javaPostConfig'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;

class SelectCarList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			typeShow: 1,
			cheackedKey: 10,
			isLoading: false,
			selectedRowKeys: [],
			messageInfo: {},
			createTemplateData: {},
		};
	}
	//打开弹窗
	showModel = () => {
		this.setState({
			visible: true,
		})
	}
	//关闭弹窗
	handleCancel = () => {
		const { typeShow } = this.state
		this.setState({ visible: false })
		if (typeShow == 4) {
			this.props.actions.clearCart()
		}
	}
	//设置显示模版
	setTypeShow = (typeShow, isShow) => {
		this.setState({
			typeShow: typeShow,
			visible: isShow
		})
	}
	componentDidMount() {
		this.setLoading()
		const { getCartSearchAll, getFilters } = this.props.actions
		getCartSearchAll(getPostFrom()).then(() => {
			this.setState({ isLoading: false })
		})
		getFilters({ groupType: 1 })
	}

	//根据导出账号个数显示不同弹窗内容
	checkResult = () => {
		this.props.actions.preExportNumCheck({ exportType: 1 }).then((res) => {
			if (res.data.checkRes) {
				const { accountNumber, upLevel, parentName } = res.data
				const messageInfo = {
					accountNumber, upLevel, parentName
				}
				this.setState({
					messageInfo: messageInfo
				})

			}
			this.showModel()
			this.setState({ typeShow: res.data.checkRes == 1 ? 2 : 1 })
		})
	}
	//设置table选中值
	addSelectedRowKeysToCart = (selectedRowKeys) => {
		this.setState({ selectedRowKeys: [...selectedRowKeys] })
		//执行保存
	}
	//设置loading
	setLoading = () => {
		const { isLoading } = this.state
		this.setState({ isLoading: !isLoading })
	}
	//调用查询执行函数
	searchTab = (param) => {
		this.setLoading()
		if (param.groupType == 10) {
			param.groupType = 0
		}
		const search = qs.parse(this.props.location.search.substring(1))
		this.props.history.push({
			search: `?` + qs.stringify({ ...param, pageSize: search.pageSize || 20 })
		})
		this.props.actions.getCartSearchAll(
			getPostFrom({ ...search, ...param })
		).then(() => {
			this.setState({ isLoading: false })
		})
	}
	//切换tab
	onChangeTab = (key) => {
		this.setState({
			cheackedKey: key,
			selectedRowKeys: []
		})
		const search = qs.parse(this.props.location.search.substring(1))
		this.props.history.push({
			search: `?` + qs.stringify({ groupType: key == 10 ? 0 : key, pageSize: search.pageSize || 20 })
		})
		this.setLoading()
		this.props.actions.getCartSearchAll(
			getPostFrom({
				groupType: key == 10 ? 0 : key,
				pageSize: search.pageSize,
			})
		).then(() => {
			this.setState({ isLoading: false })
		})
	}
	//切换执行类型
	changeRadio = (e) => {
		const { cheackedKey } = this.state
		this.searchTab({ groupType: cheackedKey, isFamous: e.target.value })
	}
	//批量删除
	remove = () => {
		const { cheackedKey, selectedRowKeys } = this.state
		this.props.actions.removeFromCart({ stagingIds: [...selectedRowKeys] }).then((res) => {
			this.setState({
				selectedRowKeys: []
			})
			message.success('删除成功', 2);
			this.searchTab({ groupType: cheackedKey })
		})
	}
	//清空全部
	cleanAll = () => {
		const { cheackedKey } = this.state
		this.props.actions.clearCart({ groupType: cheackedKey == 10 ? 0 : cheackedKey }).then((res) => {
			message.success('清空成功', 2);
			this.searchTab({ groupType: cheackedKey })
		})
	}
	//申请通过函数
	applyCodeOk = (values) => {
		this.setState({ typeShow: 1 })
	}
	serachAction = (value) => {
		this.setLoading()
		this.props.actions.getCartSearchAll(getPostFrom(value)).then(() => {
			this.setState({ isLoading: false })
		})
	}
	//到处账号新建模版操作
	addTemplate = () => {
		this.setTypeShow(3, true)
	}
	//关闭窗口
	handleClose = () => {
		this.props.actions.getStencilList().then(() => {
			this.setTypeShow(1, true)
		})

	}
	//保存操作
	saveQuota = (value) => {
		this.props.actions.saveQuotation({ ...value }).then((res) => {
			if (res.data > 0) {
				this.props.actions.quotationExport({ quotationId: res.data })
			}
			this.handleCancel()
			this.setTypeShow(4, true)
		})
	}
	onCreateTemple = (value) => {
		this.setState({
			createTemplateData: value
		})
	}
	render() {
		const { selectCarList } = this.props.queryExportToolReducer;
		const { codeCheck, getCompanyList, getStencilList } = this.props.actions
		const { visible, selectedRowKeys, typeShow, messageInfo, createTemplateData, cheackedKey } = this.state
		const countSum = selectCarList.tabList && selectCarList.tabList.total || 0
		const search = qs.parse(this.props.location.search.substring(1))

		console.log("TCL: render -> countSum", selectCarList)
		const tabList = [
			{ key: 10, tab: `全部 ${countSum}` },
			{ key: 1, tab: `微信公众号 ${selectCarList.tabList && selectCarList.tabList[1] || 0}` },
			{ key: 2, tab: `新浪微博 ${selectCarList.tabList && selectCarList.tabList[2] || 0}` },
			{ key: 3, tab: `视频/直播 ${selectCarList.tabList && selectCarList.tabList[3] || 0}` },
			{ key: 4, tab: `小红书 ${selectCarList.tabList && selectCarList.tabList[4] || 0}` },
			{ key: 5, tab: `其他平台 ${selectCarList.tabList && selectCarList.tabList[5] || 0}` },
		]
		const header = <div className="list-button">
			<Button onClick={this.remove} disabled={selectedRowKeys.length <= 0}>批量删除</Button>
			<Popconfirm placement="top" title={"你确定清空全部账号吗？"} onConfirm={this.cleanAll}>
				<Button disabled={selectCarList.list && selectCarList.list.length <= 0}>清空全部</Button>
			</Popconfirm>
			{search.isFamous > 0 ? <span style={{ marginLeft: 20, color: "#666" }}>
				共{selectCarList.total}个账号
			</span> : null}
		</div>
		const headerDisable = <Row className="list-button">
			<Checkbox disabled={true}>全选</Checkbox>
			<Button disabled={true}>批量删除</Button>
			<Button disabled={true}> 清空全部</Button>
		</Row>

		const accountProps = {
			accountList: selectCarList, header, serachAction: this.serachAction,
			addSelectedRowKeysToCart: this.addSelectedRowKeysToCart,
			selectedRowKeys,
			tablePageSize: 20
		}
		console.log("TCL: selectCarList", selectCarList)

		const showTypeMap = {
			1: <ExportAllAccout handleCancel={this.handleCancel}
				saveQuota={this.saveQuota}
				addTemplate={this.addTemplate}
				getCompanyList={getCompanyList}
				getStencilList={getStencilList}
				createTemplateData={createTemplateData}
				groupTypeName={selectCarList && selectCarList.groupTypeName} />,
			2: <ApplyForExport codeCheck={codeCheck} applyCodeOk={this.applyCodeOk}
				handleCancel={this.handleCancel} messageInfo={messageInfo} />,
			3: <CreateTemplate show={visible} close={this.handleClose} type={"create"} onCreate={this.onCreateTemple} />,
			4: <ToDownLoadCenter exportUrl={"/accountList/downloadCenter"} />
		}
		return (
			<div className="select-car-list-containers">
				<div className="list-heard">
					<div className="heard-title">
						<h2>选号车</h2>
					</div>
					<div className="heard-button">
						<Link to={'/accountList/list/1'}>
							<Button>添加账号</Button>
						</Link>
						<Button type="primary" onClick={this.checkResult} disabled={countSum == 0}>导出全部账号</Button>
					</div>
				</div>
				<div className="list-content">


					<div className="components-select-car-manager">

						<Tabs animated={false} defaultActiveKey="10" onChange={this.onChangeTab}>

							{tabList.map(one => {
								return <TabPane tab={one.tab} key={one.key}>
									<Row>
										<Col span={2} style={{ width: 70, paddingTop: 6 }}>
											<div>执行类型：</div>
										</Col>
										<Col span={22}>
											<RadioGroup value={search.isFamous > 0 ? Number(search.isFamous) : 0} disabled={countSum < 0} onChange={this.changeRadio}>
												<RadioButton key={0} value={0}>不限</RadioButton>
												<RadioButton key={1} value={1}>预约</RadioButton>
												<RadioButton key={2} value={2}>微闪投</RadioButton>
											</RadioGroup>
										</Col>
									</Row>
									<Skeleton loading={this.state.isLoading} paragraph={{ rows: 14 }} active title={false} >
										{countSum > 0 ? <AccountTable {...accountProps} />
											: <div>
												<Row style={{ marginTop: 24 }}>{headerDisable}</Row>
												<ListZero />
											</div>}
									</Skeleton>
								</TabPane>
							})}

						</Tabs>
					</div>


				</div>
				<div>
					<Modal
						title={typeShow == 1 ? "填写报价单信息" : typeShow == 4 ? "" : "申请导出报价单"}
						visible={visible}
						onCancel={this.handleCancel}
						width={typeShow == 1 ? 700 : typeShow == 4 ? 340 : 540}
						footer={false}
						maskClosable={false}
						destroyOnClose={true}
					>
						{showTypeMap[typeShow]}
					</Modal>

				</div>
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
)(SelectCarList)
