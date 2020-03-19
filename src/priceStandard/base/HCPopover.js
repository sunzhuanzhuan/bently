import React, { PureComponent } from 'react';
import { Popover } from "antd";
class HCPopover extends PureComponent {
	render() {
		return (
			<Popover {...this.props} trigger="hover" getPopupContainer={() => document.querySelector('.price-standard-container')}>
				{this.props.children}
			</Popover>
		);
	}
}
export default HCPopover;
