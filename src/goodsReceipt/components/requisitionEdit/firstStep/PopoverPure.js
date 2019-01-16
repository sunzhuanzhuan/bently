import React, { PureComponent } from 'react'
import { Popover, Button } from "antd";
class PopoverPure extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { cannot_gr_reason = [] } = this.props
		return (
			<Popover
				trigger="click"
				content={<div style={{ width: 200 }}>{cannot_gr_reason && cannot_gr_reason.map((one, index) => <div key={index}>{one}</div>)}</div>}
				getPopupContainer={() => document.querySelector('.goods-receipt-route-index')}
			>
				<Button type="primary" size="small" className="small-botton-text">查看原因</Button>
			</Popover>
		);
	}
}
export default PopoverPure;
