import React, { Component } from 'react'
import ShowDetailArr from "./ShowDetailArr";
class PaymentMethodDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const bankArr = [
			{ title: "收款方式", content: "银行转账" },
			{ title: "开户行", content: "" },
			{ title: "开户支行", content: "" },
			{ title: "开户行所在省", content: "" },
			{ title: "开户行所在市", content: "" },
			{ title: "帐号", content: "" },
			{ title: "户名", content: "" },
		]
		const alipayArr = [
			{ title: "收款方式", content: "支付宝" },
			{ title: "帐号", content: "" },
			{ title: "收款方", content: "" },]
		const { isPaymentBank } = this.props
		return (
			<ShowDetailArr arr={isPaymentBank ? bankArr : alipayArr} />
		);
	}
}

export default PaymentMethodDetail;
