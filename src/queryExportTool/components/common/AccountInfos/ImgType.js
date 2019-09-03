import React, { Component } from 'react'
import { Badge } from "antd";
import platform from '../../../constants/platform'
import "./ImgType.less"
export const PlatformVerified = ({ verifiedStatus = 0, platformId = 0 }) => {
	const _platformId = platformId.toString()
	let imgUrl = platform.platformTypeImg[_platformId]
	return imgUrl && platformId != 1 && verifiedStatus && verifiedStatus == 1 ? <img src={require(`./img/${imgUrl}`)} width="13" style={{ marginLeft: 5, marginBottom: 2 }} /> : null
}
export const WeiboVip = ({ verifiedStatus = 0, platformId = 0, marginTop = 4 }) => {
	let imgUrl = ""
	if (verifiedStatus == 2) {
		imgUrl = platform.platformTypeImg['1000']
	}
	if (verifiedStatus == 3) {
		imgUrl = platform.platformTypeImg['999']
	}
	if (verifiedStatus == 6) {
		imgUrl = platform.platformTypeImg['998']
	}
	if (verifiedStatus == 4) {
		imgUrl = platform.platformTypeImg['555']
	}
	return imgUrl && platformId == 1 ? <img src={require(`./img/${imgUrl}`)} width="14" style={{ marginLeft: 2, marginTop: marginTop }} /> : null
}
export const LevalImg = ({ leval = 0, platformId = 0 }) => {
	return leval > 0 ? <span className="leval-text-box">等级{leval}</span> : null
}


export const ImgType = ({ verifiedStatus = 0, level = 0, platformId = 0, isVerified = 0, IsRed, IsVidro }) => {
	return <span style={{ marginTop: 2 }}>
		<PlatformVerified verifiedStatus={verifiedStatus} platformId={platformId} />
		<WeiboVip verifiedStatus={verifiedStatus} platformId={platformId} />
		{IsRed || IsVidro ? <LevalImg leval={level} platformId={platformId} /> : null}
	</span>
}

export default ImgType
