import React, { Component } from 'react'
import { ShowDetailArr, PaymentMethodDetail, CooperationMethodDetail } from "../components/common";
import { Button } from 'antd';
class AgentDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const AgentInfo = [
			{ title: "代理商ID", content: "" },
			{ title: "代理商名称", content: "" },
		]
		const otherInfo = [
			{ title: "付款公司", content: "" },
			{ title: "结算方式", content: "" },
			{ title: "回票方式", content: "" },

		]
		const remark = [{ title: "备注", content: "" }]
		const { setShowModal } = this.props
		return (
			<div style={{ margin: "10px 0px" }}>
				<ShowDetailArr arr={AgentInfo} />
				<CooperationMethodDetail />
				<ShowDetailArr arr={otherInfo} />
				<PaymentMethodDetail />
				<ShowDetailArr arr={remark} />
				<div style={{ textAlign: "center" }}>
					<Button style={{ width: 100 }} onClick={() => setShowModal(false, null)}>返回</Button>
				</div>
			</div>
		);
	}
}

export default AgentDetail;
