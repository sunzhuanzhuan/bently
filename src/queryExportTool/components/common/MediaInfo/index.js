import React, { Component } from 'react'
import { Popover } from 'antd'
import './index.less'
import images from "../../../images"
import api from "../../../../api";
class MediaInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {}
		};
	}

	render() {
		const { isShowPopover = true, agentInfo = {} } = this.props
		const { name = '-', title = '-', cell_phone = '-', email = '-', qq = '-' } = agentInfo
		const content = <div>
			<div><img src={images.qqPng} width={14} /> {qq}</div>
			<div><img src={images.emailPng} width={14} /> {email}</div>
			<div><img src={images.phonePng} width={14} /> {cell_phone}</div>
			<div><img src={images.zhiweiPng} width={14} /> {title}</div>
		</div>
		return (
			isShowPopover ? <Popover placement="topLeft" content={content}>
				<div className='media-info'>
					媒介：{name}
				</div>
			</Popover> : <span>{name}</span>
		);
	}
}

export default MediaInfo;
