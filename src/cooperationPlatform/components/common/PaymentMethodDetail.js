import React, { Component } from 'react'
import ShowDetailArr from "./ShowDetailArr";
class PaymentMethodDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { detailData = {} } = this.props
		const {
			bank, bankAgency, bankAgencyCity, bankAgencyProvince, cardNumber, realName,
			alipayAccountName, alipayAccount, paymentType } = detailData
		const bankArr = [
			{ title: "收款方式", content: paymentType == 1 ? "银行转账" : '支付宝' },
			{ title: "开户行", content: bank },
			{ title: "开户支行", content: bankAgency },
			{ title: "开户行所在省", content: bankAgencyProvince },
			{ title: "开户行所在市", content: bankAgencyCity },
			{ title: "帐号", content: cardNumber },
			{ title: "户名", content: realName },
		]
		const alipayArr = [
			{ title: "收款方式", content: "支付宝" },
			{ title: "帐号", content: alipayAccount },
			{ title: "收款方", content: alipayAccountName },]
		return (
			<ShowDetailArr arr={paymentType == 1 ? bankArr : alipayArr} />
		);
	}
}

export default PaymentMethodDetail;
