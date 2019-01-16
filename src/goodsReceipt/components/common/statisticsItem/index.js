import React, { Component } from 'react'
import { Divider } from "antd";
import "./index.less"

class StatisticsItem extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { statisticsDate } = this.props
		return (
			<span className="item-box-flex">{statisticsDate.map((one, index) => {
				return <span key={index}>
					<span className="item-box">
						<span>{one.title}</span>
						<a>{one.number}个</a>
					</span>
					{index < statisticsDate.length ? <Divider type="vertical" className="right-divider" /> : null}
				</span>
			})}</span>
		);
	}
}

export default StatisticsItem;
