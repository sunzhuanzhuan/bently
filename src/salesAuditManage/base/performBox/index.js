import React, { Component } from 'react'
import { Button } from 'antd';

class PerformBox extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { operateData = [], aduitPass, aduitRefuse } = this.props
		return (
			<div>
				{operateData.map((one, index) => <div key={index}>
					<span>{one.title}：</span>
					<a onClick={one.onClickUrl}>
						{one.clickName}
					</a>
				</div>)}
				<div>
					<Button type="primary" onClick={aduitPass} size="small">审核通过</Button>
					<Button type="primary" style={{ marginLeft: 4 }} onClick={aduitRefuse} size="small">审核拒绝</Button>
				</div>
			</div>
		);
	}
}

export default PerformBox;
