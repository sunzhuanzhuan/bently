import React, { Component } from 'react';
import { Badge, Popover } from "antd";
class StatusAB extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { status, reason = [], title = "A" } = this.props
		const isStatus = status == 1
		return (
			<span>
				{status ? <Badge status={isStatus ? "success" : "error"} text={isStatus ?
					`${title}端上架` :
					<Popover
						content={`${title}端下架原因：` + reason.join("、")}
						trigger="hover"
						getPopupContainer={() => document.querySelector('.query-export-tool')}
						overlayStyle={{ width: '300px', textAlign: 'center' }}
					>
						{`${title}端下架`}
					</Popover>
				}
				/> : null}
			</span>
		);
	}
}

export default StatusAB;
