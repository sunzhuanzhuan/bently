import React, { Component } from 'react'
import { Popover, Divider } from 'antd'
import './index.less'
import AuthVisbleIsBP from '@/queryExportTool/containers/AuthVisbleIsBP';
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
		const { isShowPopover = true, agentInfo = {}, userId } = this.props
		const { name = '-', group = '-', phone = '-', email = '-', qq = '-', userName } = agentInfo

		const oldBUrl = window.bentleyConfig.babysitter_host.value
		const content = <div>
			<div><img src={images.qqPng} width={14} /> {qq}</div>
			<div><img src={images.emailPng} width={14} /> {email}</div>
			<div><img src={images.phonePng} width={14} /> {phone}</div>
			<div><img src={images.zhiweiPng} width={14} /> {group}</div>
		</div>
		return (
			isShowPopover ? <Popover placement="topLeft" content={content}>
				<div className='media-info'>
					媒介：{name} <AuthVisbleIsBP isComponent={userName ? <span className='info-user-name'>
						<Divider type="vertical" /> 主账号：
						<a href={`${oldBUrl}/user/updatebp/user_id/${userId}`}
							target="_blank"
						>
							<b>{userName}</b>
						</a>
					</span> : null} noComponent={null} />
				</div>
			</Popover> : <span>{name}</span>
		);
	}
}

export default MediaInfo;
