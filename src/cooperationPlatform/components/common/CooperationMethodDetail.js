import React, { Component } from 'react'
import ShowDetailArr from "./ShowDetailArr";
class CooperationMethodDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const weekArr = [
			{ title: "合作方式", content: "周期付款" },
			{ title: "返款比例", content: "" },
		]
		const otherArr = [
			{ title: "合作方式", content: "其他" },
			{ title: "说明", content: "" },
		]
		const { isWeek } = this.props
		return (
			<ShowDetailArr arr={isWeek ? weekArr : otherArr} />
		);
	}
}

export default CooperationMethodDetail;
