import React, { Component } from 'react'
import { Badge } from "antd";
import platform from '../../../constants/platform'
import "./ImgType.less"
export const PlatformVerified = ({ verified_status = 0, platform_id = 0 }) => {
	const platformId = platform_id.toString()
	let imgUrl = platform.platformTypeImg[platformId]
	return imgUrl && platform_id != 1 && verified_status && verified_status != 1 ? <img src={require(`./img/${imgUrl}`)} width="13" style={{ marginLeft: 5, marginBottom: 2 }} /> : null
}
export const WeiboVip = ({ verified_status = 0, platform_id = 0 }) => {
	let imgUrl = ""
	if (verified_status == 2) {
		imgUrl = platform.platformTypeImg['1000']
	}
	if (verified_status == 3) {
		imgUrl = platform.platformTypeImg['999']
	}
	if (verified_status == 6) {
		imgUrl = platform.platformTypeImg['998']
	}
	if (verified_status == 4) {
		imgUrl = platform.platformTypeImg['555']
	}
	return imgUrl && platform_id == 1 ? <img src={require(`./img/${imgUrl}`)} width="14" style={{ marginLeft: 2, marginTop: 4 }} /> : null
}
export const LevalImg = ({ leval = 0, platform_id = 0 }) => {
	return leval > 0 ? <span className="leval-text-box">等级{leval}</span> : null
}


export const ImgType = ({ verified_status = 0, level = 0, platform_id = 0, is_verified = 0, Is_Red, Is_Vidro }) => {
	return <span style={{ marginTop: 2 }}>
		<PlatformVerified verified_status={verified_status} platform_id={platform_id} />
		<WeiboVip verified_status={verified_status} platform_id={platform_id} />
		{Is_Red || Is_Vidro ? <LevalImg leval={level} platform_id={platform_id} /> : null}
	</span>
}

export default ImgType
