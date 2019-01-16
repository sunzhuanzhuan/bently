import React, { Component } from 'react'
import { FirstStep, FirstStatistics, SecondStep, SecondStatistics, ThirdStep, ThirdStatistics, BaseInfo } from "../components";
import { Steps, message } from 'antd';
import "./RequisitionEdit.less";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from '../actions/index'
import BreadCrumbs from "../base/BreadCrumbs";
import { withRouter } from "react-router-dom";
import qs from 'qs'
const Step = Steps.Step;
class RequisitionEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			offsetWidthBox: 0,
			supplementAttachmentsList: [],//结案附件数组
			commonAttachments: [],//其他附件数组
			editServiceRateStatus: false,//第二步-服务税率编辑态，编辑状态下不能进入下一步
			editTotalMountDStatus: false,//第三步GR总金额编辑态，编辑状态下不能进入下一步,
			errorIsExist: false//第三步点击是否有反应
		};
	}
	setEditState = (value) => {
		this.setState(value)
	}
	componentDidMount = () => {
		const { actions: { getBaseDetail, createGR, getGRUploadToken } } = this.props
		const search = qs.parse(window.location.search.substring(1))
		if (search.gr_id > 0) {//修改和复制页面逻辑
			getBaseDetail({ gr_id: search.gr_id, with_purchase_statistic: 1 }).then((res) => {
				if (res.data.result.status != 1) {
					//此处只为路径操作添加验证跳转，页面操作不触发，草稿状态才可以修改
					message.error("该订单已提交审核，不支持修改", 2)
					this.props.history.push({
						pathname: "/goodsReceipt/AElist",
					})
				}
			})
		} else {//创建页面逻辑
			createGR({ po_id: search.po_id }).then((res) => {
				this.props.history.push({
					search: `?` + qs.stringify({
						po_id: search.po_id,
						gr_id: res.data.gr_id,
						typeOperate: search.typeOperate
					})
				})
				getBaseDetail({ gr_id: res.data.gr_id })//获取基础详情头部信息
			})
		}
		getGRUploadToken()//获取上传token
	}

	//push操作操作页面步骤跳转
	setHistoryPush = (current) => {
		const search = qs.parse(window.location.search.substring(1))
		this.props.history.push({
			pathname: `/goodsReceipt/AEedit/${current}`,
			search: `?` + qs.stringify({ po_id: search.po_id, gr_id: search.gr_id, typeOperate: search.typeOperate })
		})
		this.setState({
			editServiceRateStatus: false,
			editTotalMountDStatus: false,
			errorIsExist: false
		})
	}
	render() {
		const { editServiceRateStatus, editTotalMountDStatus, supplementAttachmentsList, commonAttachments, errorIsExist } = this.state
		const { match, actions, goodsReceipt, } = this.props
		const { baseDetail } = goodsReceipt
		const GRListUrl = "/goodsReceipt/AElist"
		const commonProps = {
			actions,
			goodsReceipt,
			setHistoryPush: this.setHistoryPush,
			setEditState: this.setEditState,
			commonAttachments,
			supplementAttachmentsList,
			editServiceRateStatus,
			editTotalMountDStatus,
			GRListUrl,
			errorIsExist
		}
		const steps = [{
			title: '选择需要GR的订单 / 活动',
			content: FirstStep,
			statistics: FirstStatistics
		}, {
			title: '确认订单 / 活动的GR信息',
			content: SecondStep,
			statistics: SecondStatistics
		}, {
			title: '填写GR申请单信息并提交审核',
			content: ThirdStep,
			//此处仅供占位使用无意义
			statistics: ThirdStatistics

		}];
		const current = match.params.current
		const Content = steps[current].content
		const Statistics = steps[current].statistics
		const search = qs.parse(window.location.search.substring(1))
		const IsShowIcon = search.typeOperate == "copy" || search.typeOperate == "modify"
		return (
			search.gr_id > 0 ? <div className="requisition-edit"  >
				<div className="requisition-contains">

					<BreadCrumbs linkUrl={GRListUrl} isIcon={IsShowIcon} text={search.typeOperate == "modify" ? "修改GR申请单" : "创建GR申请单"} />
					<BaseInfo baseDetail={baseDetail} />
					<div className="requisition-edit-step">
						<Steps current={Number(current)} >
							{steps.map(item => <Step key={item.title} title={item.title} />)}
						</Steps>
					</div>

					<div className="steps-content">
						<Content key={steps[current].title} {...commonProps} />
					</div>

				</div>
				<div className="footer-fixd" >
					{/* 当确认已选的时候才显示此区域信息 */}
					<div className="footer-fixd-botton-box">
						<Statistics  {...commonProps} />
					</div>
				</div>
			</div> : null
		);
	}
}

const mapStateToProps = (state) => {
	return {
		goodsReceipt: state.goodsReceipt
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(action, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RequisitionEdit)
