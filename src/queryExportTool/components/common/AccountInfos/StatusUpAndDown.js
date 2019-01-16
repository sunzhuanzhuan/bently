import React, { Component } from 'react'
import { Popover } from "antd";
class StatusUpAndDown extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	getData = () => {
		const { b_status, a_status, a_reason, b_reason } = this.props
		const data = {}

		if (b_status == 1) {
			if (a_status == 1) {
				data.text = "上架"
				data.content = <div>
					<div>A端可见</div>
					<div>B端可见</div>
				</div>
			}
			if (a_status == 2) {
				data.text = "B端上架"
				data.content = <div>
					<div>A端不可见</div>
					<div>B端可见</div>
				</div>
			}
		}
		if (b_status == 2) {
			if (a_status == 1) {
				data.text = "B端下架"
				data.content = <div>
					<div>A端可见</div>
					<div>B端不可见</div>
				</div>
			}
			if (a_status == 2) {
				data.text = "下架"
				data.content = <div>
					<div>A端下架原因：{a_reason.join("、")}</div>
					<div>B端下架原因：{b_reason.join("、")}</div>
				</div>
			}
		}
		return data
	}
	render() {
		const data = this.getData()
		return (
			<Popover content={data.content} trigger="hover">
				<h4 style={{ textAlign: "center" }}>
					{data.text}
				</h4>
			</Popover>
		);
	}
}

export default StatusUpAndDown;
