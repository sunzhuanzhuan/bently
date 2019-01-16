import React from "react"
import { Tooltip } from 'antd'
import './Name.less'
import ImgType from "./ImgType"

const Name = ({ name = '', type = 0, levalType = 0, platform_id = 0 }) => {
	const content = name.length > 10 ?
		<Tooltip placement="topLeft" title={name}><a href="">{name}</a></Tooltip>
		: <a href="">{name}</a>
	return <div className='account-name-wrapper'>
		{content}<ImgType type={type} levalType={levalType} platform_id={platform_id} />
	</div>
}

export default Name
