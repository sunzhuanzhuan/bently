import React, { Component } from 'react'
import ShowDetailArr from "./ShowDetailArr";
import numeral from "numeral";
class CooperationMethodDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { detailData: { cooperationType, refundRate, cooperationRemark } } = this.props
		const weekArr = [
			{ title: "合作方式", content: "周期付款" },
			{ title: "返款比例", content: `${numeral(refundRate || 0).format('0.00')} %` }
		]
		const otherArr = [
			{ title: "合作方式", content: "其他" },
			{ title: "说明", content: cooperationRemark },
		]

		return (
			<ShowDetailArr arr={cooperationType == 1 ? weekArr : otherArr} />
		);
	}
}

export default CooperationMethodDetail;
