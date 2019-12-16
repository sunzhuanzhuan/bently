import React, { Component } from 'react'
import { ShowDetailArr, PaymentMethodDetail, CooperationMethodDetail } from "../components/common";
import { Button, Spin } from 'antd';
class AgentDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			agentByIdDetail: {}
		};
	}
	componentDidMount = () => {
		const { agentId, actions } = this.props
		actions.getAgentById({ id: agentId }).then(({ data }) => {
			this.setState({
				isLoading: false,
				agentByIdDetail: data
			})
		})
	}
	render() {

		const { agentByIdDetail } = this.state
		const { agentName, id, paymentCompanyName, settleType, returnInvoiceType, agentRemark, invoiceType, agentTaxRate } = agentByIdDetail
		const showInfo = [
			{ title: "代理商ID", content: id },
			{ title: "代理商名称", content: agentName },
		]
		const invoiceArr = {
			1: '增值税专用发票',
			2: '增值税普通发票'
		}
		const otherInfo = [
			{ title: "付款公司", content: paymentCompanyName },
			{ title: "结算方式", content: settleType == 1 ? '预付' : '周期结算' },
			{ title: "回票方式", content: returnInvoiceType == 1 ? '全部回款' : returnInvoiceType == 2 ? '部分回款' : '不回款' },
			{ title: "回票类型", content: invoiceArr[invoiceType] },
			{ title: "发票税率", content: `${Number(agentTaxRate || 0) * 100} %`, isHide: invoiceType != 1  },
		]

		const remark = [{ title: "备注", content: agentRemark }]
		const { setShowModal } = this.props
		return (
			<Spin spinning={this.state.isLoading} style={{ margin: "10px 0px" }}>
				<ShowDetailArr arr={showInfo} />
				<CooperationMethodDetail detailData={agentByIdDetail} />
				<ShowDetailArr arr={otherInfo.filter(item => !(item.isHide))} />
				<PaymentMethodDetail detailData={agentByIdDetail} />
				<ShowDetailArr arr={remark} />
				<div style={{ textAlign: "center", marginTop: 30 }}>
					<Button style={{ width: 100 }} onClick={() => setShowModal(false, null)}>返回</Button>
				</div>
			</Spin>
		);
	}
}

export default AgentDetail;
