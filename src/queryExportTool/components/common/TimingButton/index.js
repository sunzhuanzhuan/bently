import React, { Component } from 'react';
import { Button } from "antd";
let times = 59
class TimingButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stateVerification: 'wei',//发送验证码状态（wei：获取验证码;over:重新发送;ing:倒计时）
			scoreNum: 60,//倒计时秒数
		};

	}
	startTiming = (token) => {
		// const { scoreNum, stateVerification } = this.state.scoreNum
		const that = this
		this.props.sendMessage()
		//设置初始默认值（防止按钮重复点击，造成计时器重复执行）
		that.setState({
			stateVerification: 'ing',
			scoreNum: times + 1
		})
		// this.props.actions.sendsms({ token }).then(() => {
		// })
		//设置验证计时开始
		setTimeout(() => {
			this.timer = window.setInterval(() => {
				//判断计时时间状态
				if (times == 0) {
					that.setState({
						stateVerification: 'over'//设置重新发送状态
					})
					times = 59;
					//清空计时
					window.clearTimeout(this.timer)
				} else {
					//设置时间变化
					that.setState({
						stateVerification: 'ing',//设置倒计时状态
						scoreNum: times--
					})
				}
			}, 1000)
		}, 0)
	}
	componentWillUnmount = () => {
		window.clearTimeout(this.timer)
	}
	render() {
		const { stateVerification,//发送验证码状态（wei：立即发送;over:重新发送;ing:倒计时）
			scoreNum } = this.state
		return (
			<Button type="primary" onClick={this.startTiming} disabled={stateVerification === 'ing' ? true : false} style={{ width: 82, marginLeft: 16 }}>
				{stateVerification === 'over' ? '重新发送'
					: stateVerification === 'ing' ? `${scoreNum}s`
						: '立即发送'}
			</Button>
		);
	}
}

export default TimingButton;
