import React, { Component } from 'react'
import "./DividingBox.less"
class DividingBox extends Component {
	render() {
		const { text = '' } = this.props
		return (
			<div className="dividing-box">
				<div className="left-line"></div>
				<div className="centet-text">{text}</div>
				<div className="right-line" style={{ width: `calc(100% - ${text.length * 16 + 14}px)` }}></div>
			</div>
		);
	}
}
export default DividingBox;
