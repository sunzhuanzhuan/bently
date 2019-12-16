import React, { Component } from 'react'
import ShowDetailArr from "./ShowDetailArr";
import numeral from "numeral";
class CooperationMethodDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.invoiceArr = {
			1: '增值税专用发票',
			2: '增值税普通发票'
		}
	}
	render() {
		const { detailData: { cooperationType, refundRate, cooperationRemark, invoiceType, agentTaxRate } } = this.props
		const weekArr = [
			{ title: "合作方式", content: "周期付款" },
			{ title: "回票类型", content: this.invoiceArr[invoiceType] },
			{ title: "发票税率", content: `${Number(agentTaxRate || 0) * 100} %`, isHide: invoiceType != 1  },

			{ title: "返款比例", content: `${numeral(refundRate || 0).format('0.00')} %` }
		]
		const otherArr = [
			{ title: "合作方式", content: "其他" },
			{ title: "回票类型", content: this.invoiceArr[invoiceType] },
			{ title: "发票税率", content: `${Number(agentTaxRate || 0) * 100} %`, isHide: invoiceType != 1 },
			{ title: "说明", content: cooperationRemark },
		]
		const dealArr = cooperationType == 1 ? weekArr : otherArr;

		return (
			<ShowDetailArr arr={dealArr.filter(item => !(item.isHide))} />
		);
	}
}

export default CooperationMethodDetail;
