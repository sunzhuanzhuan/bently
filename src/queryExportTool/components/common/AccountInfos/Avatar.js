import React from "react"
import './Avatar.less'

let defaultPic = require('./img/default.jpg')
export const Avatar = ({ id, src = defaultPic, name = '', children }) => {

	return <div id={id} data-src={src ? `http://api-webroot.api.weiboyi.com/pic.php?picurl=${src}` : ""} className='account-avatar-wrapper'>
		<div className='pic'>
			<img src={src ? `http://api-webroot.api.weiboyi.com/pic.php?picurl=${src}` : require('./img/default.jpg')} alt={name} onError={(e) => e.target.src = require('./img/default.jpg')} />
		</div>
		<span className='avatar-suffix'>
			{children}
		</span>
	</div>
}


const presetTypes = {
	'famous': {
		color: 'rgba(244,61,61,0.8)',
		node: '预'
	},
	'micro': {
		color: 'rgba(114,99,255,0.8)',
		node: '微'
	},
	'default': {
		color: 'rgba(155,155,155,0.8)',
		node: '无'
	}
}

export const AvatarType = ({ type = 'default' }) => {
	const { color, node } = presetTypes[type]

	return <div className='tag' style={{ backgroundColor: color }}>{node}</div>
}


export default Avatar
