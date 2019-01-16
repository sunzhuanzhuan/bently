import React, { Component } from 'react'
import { Icon, Button } from "antd";
import { Link } from "react-router-dom";
import qs from 'qs'
import "./index.less"
class ToDownLoadCenter extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { exportUrl, title = "正在导出，您可前往“报价单管理”页查看详情。也可10分钟后前往“下载中心”下载", buttonText = '去下载中心' } = this.props
		//const Url = `/accountList/downloadCenter${param ? "?" : ""}` + qs.stringify(param)
		return (
			<div className='to-download-center-box'>
				<div className='text-area'>
					<Icon type="check-circle" theme="outlined" className='icon-style' />
					{title}
				</div>
				<div className="button-down">
					<Link to={exportUrl} >
						<Button type="primary">{buttonText}</Button>
					</Link>
				</div>
			</div>
		);
	}
}

export default ToDownLoadCenter;
