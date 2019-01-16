import React, { Component } from 'react';
import "./index.less"
import PropTypes from 'prop-types'
class TitleLable extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { title } = this.props
		return (
			<div className='good-receipt'>
				<div className="title-lable-box-good-receipt">
					<div className="title-lable-title-line"></div>
					<div className="title-lable-title">{title}</div>
				</div>
				<div>
					<div className="title-lable-child">{this.props.children}</div>
				</div>
			</div>
		);
	}
}

export default TitleLable;
