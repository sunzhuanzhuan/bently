import React, { Component } from 'react'
import * as browserJudge from '../util/browserInfo'
import { Alert } from 'antd';
import './index.less'
import { getSysType, getSysBit } from "../util/detectOS";

// const Cookie = require('js-cookie');

class BrowserJudge extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		// let chromeLink = React.createElement('a', {
		//     'href': 'https://www.google.cn/chrome/',
		//     'target': '_blank'
		// }, 'Chrome浏览器');
		let chromeMessage = React.createElement('span', { id: 'ChromeTips' }, '为了您有更好的使用效果，请安装Chrome浏览器');
		let isOtherBrowser = (BrowserCore = {}) => {
			BrowserCore = browserJudge.default.versions;
			if (BrowserCore.trident || BrowserCore.presto || BrowserCore.weixin || BrowserCore.isDing || BrowserCore.isEdge) {
				return true
			} else if (BrowserCore.webKit || BrowserCore.gecko) {// 苹果、谷歌内核
				return false
			} else {
				return true
			}
		}
		let downloadLink = (function () {
			let linkList = [
				'//download.weiboyi.com/software/ChromeStandaloneSetup32.exe',
				'//download.weiboyi.com/software/ChromeStandaloneSetup64.exe',
				'//download.weiboyi.com/software/googlechrome.dmg'
			]
			let link = linkList[0]

			if (getSysType() === 'Mac') {
				link = linkList[2];
			} else if (getSysType() === 'Win') {
				if (getSysBit() === 'x64') {
					link = linkList[1]
				} else {
					link = linkList[0]
				}
			}
			return link
		})()
		return (
			<div>
				{
					isOtherBrowser() ? (
						<Alert
							message={
								<div>{chromeMessage}<a href={downloadLink} className={'judeg-download-link'}>点击立即下载</a>
								</div>}
							type="error"
							closable
							banner />
					) : null
				}
			</div>
		)
	}
}

export default BrowserJudge;
