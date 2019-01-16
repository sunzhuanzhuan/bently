import React, { Component } from 'react';
import images from "../../images";
import "./NoPermiss.less";
class NoPermiss extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className='no-permiss-box'>
				<div className='no-permiss-img'>
					<img src={images.noPermissPng} width="80" />
				</div>
				<div className='no-permiss-text'>
					无权限访问
				</div>

			</div>
		);
	}
}

export default NoPermiss;
