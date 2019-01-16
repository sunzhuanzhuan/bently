import React, { Component } from 'react'
import "./index.less"
export class AllNoFind extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="all-no-find">
				<div className="no-find-left-image"><img src={require("./images/grapText.png")} width="84" /></div>
				<div className="no-find-center-text"><span>未找到您要的账号</span></div>
			</div>
		);
	}
}

export class NowNoFind extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="list-zero-box">
				<div className="no-find-left-image"><img src={require("./images/grapText.png")} width="84" /></div>
				<div className="now-no-find-center-text">
					<span>未找到您要的账号</span>
					<p>试试其他平台哦</p>
				</div>
				<div className="now-no-find-right-image">
					<img src={require("./images/point-left.png")} width="150" /></div>
			</div>
		);
	}
}

export default class ListZero extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="list-zero-box">
				<div className="no-find-left-image"><img src={require("./images/grapText.png")} width="84" /></div>
				<div className="no-find-center-text"><span>还未添加账号哦</span></div>
				<div className="no-find-right-image"><img src={require("./images/point.png")} /></div>
			</div>
		);
	}
}


