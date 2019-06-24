import React, { PureComponent } from 'react';
import images from '../../images'
import { Popover, Icon } from "antd";
class MarkMessage extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { content, title = "", text = <Icon type="question-circle" theme="outlined" /> } = this.props
		return (
			<span style={{ marginLeft: 1 }}>
				<Popover content={content} title={title} trigger="hover" getPopupContainer={() => document.querySelector('.query-export-tool')}>
					{text}
				</Popover>
			</span>
		);
	}
}

export default MarkMessage;
