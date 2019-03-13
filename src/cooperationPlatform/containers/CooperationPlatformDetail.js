import React, { Component } from 'react'
import { ShowDetailArr, DividingBox, PaymentMethodDetail, CooperationMethodDetail } from "../components/common";
import Quotation from "../components/cooperationPlatformEdit/Quotation";
import ChargeType from "../components/cooperationPlatformEdit/ChargeType";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from '../actions/index'
import { Spin, Button } from 'antd';
import { Link } from 'react-router-dom';
class CooperationPlatformDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			cooperationPlatformInfoDetail: {}
		};
	}
	componentDidMount = () => {
		const { actions: { getCooperationPlatformInfoById } } = this.props
		getCooperationPlatformInfoById({ currentPage: 1, pageSize: 10 }).then(({ data }) => {
			this.setState({
				isLoading: false,
				cooperationPlatformInfoDetail: data
			})
		})
	}
	render() {
		const { cooperationPlatformInfoDetail } = this.state
		const { settleType, paymentCompanyName, isNeedScreenshot, returnInvoiceType, agentVO } = cooperationPlatformInfoDetail
		const baseInfo = [
			{ title: "所属媒体平台", content: "131" },
			{ title: "下单平台名称", content: '下单平台名称' },
			{ title: "下单截图是否必填", content: isNeedScreenshot },
			{ title: "付款公司", content: paymentCompanyName },
		]
		const payInfo = [
			{ title: "结算方式", content: settleType == 1 ? '预付款' : '周期结算' },
			{ title: "回票方式", content: returnInvoiceType == 1 ? '全部回款' : returnInvoiceType == 2 ? '部分回款' : '不回款' },
		]
		const { isLoading } = this.state
		return (
			<Spin spinning={isLoading}>
				<DividingBox text="平台基本信息" />
				<div style={{ margin: "30px 0px" }}>
					<ShowDetailArr arr={baseInfo} />
					<ShowDetailArr arr={[{ title: "平台报价项", content: "" }]} />
					<Quotation isEdit={true} noLast={true} />
					<ShowDetailArr arr={[{ title: "收费类型", content: "" }]} />
					<ChargeType isEdit={true} noLast={true} />
				</div>
				<DividingBox text="平台合作信息" />
				<div style={{ margin: "30px 0px" }}>
					<CooperationMethodDetail detailData={agentVO} />
					<ShowDetailArr arr={payInfo} />
					<PaymentMethodDetail detailData={agentVO} />
				</div>
				<div style={{ textAlign: "center", marginBottom: 20 }}>
					<Link to="/config/platform/list">
						<Button >返回</Button>
					</Link>
				</div>
			</Spin>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cooperationPlatformReducer: state.cooperationPlatformReducer
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(action, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(CooperationPlatformDetail);
