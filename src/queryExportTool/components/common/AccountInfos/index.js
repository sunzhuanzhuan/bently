import './index.less'

import React from "react"

const AccountInfos = ({ props, children }) => {

	return <div className='account-main-info-container'>
		{children}
	</div>
}

export default AccountInfos

export { default as Avatar, AvatarType } from './Avatar'
export { default as Name } from './Name'
export { default as Secondary } from './Secondary'
export { default as StatusUpAndDown } from './StatusUpAndDown'
export { default as ImgType, WeiboVip, PlatformVerified, LevalImg } from './ImgType'
export { default as StatusAB } from './StatusAB'
export { default as NoExist } from './NoExist'
