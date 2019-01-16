import React, { Component } from 'react';
import "./index.less"
import PropTypes from 'prop-types'
class TitleLable extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
	}
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { title } = this.props
		return (
			<div className="title-lable-box">
				<div className="title-lable-title">{title}</div>
				<div className="child">{this.props.children}</div>
			</div>
		);
	}
}

export default TitleLable;
