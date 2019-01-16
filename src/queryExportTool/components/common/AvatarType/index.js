import React, { Component } from 'react';
import "./index.less"
import PropTypes from 'prop-types'
class Avatartype extends Component {
	static propTypes = {
		type: PropTypes.number.isRequired,
	}
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { srcImg = "",
			type = 1 } = this.props
		return (
			<div className="avatar-type-box">
				<div className="img-avatar"><img src={srcImg} width="64" height="64" /></div>
				<div className="text" style={{ background: type == 1 ? "#F43D3D" : "#7263FF" }}>
					{type == 1 ? "预" : "微"}
				</div>
			</div>
		);
	}
}

export default Avatartype;
