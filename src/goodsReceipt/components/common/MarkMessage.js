import React, { PureComponent } from 'react';
import { Popover, Icon } from "antd";
class MarkMessage extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { content, title = "", } = this.props
		return (
			<span style={{ marginLeft: 1 }}>
				<Popover
					content={{ content }} title={title}
					trigger="hover"
					getPopupContainer={() => document.querySelector('.goods-receipt-route-index')}
					{...this.props}>
					<Icon type="question-circle" theme="outlined" />
				</Popover>
			</span>
		);
	}
}

export default MarkMessage;
