import React, { useState } from 'react'
import './PlatformHeader.less'
import HCPopover from './HCPopover'
const groupTypeId = [
	{ name: '微信公众号', platformId: '1' },
	{ name: '新浪微博', platformId: '2' },
	{ name: '视频/直播', platformId: '3' },
	{ name: '小红书', platformId: '4' },
	{ name: '其他平台', platformId: '5' },
]
function PlatformHeader({ list = groupTypeId, setId, }) {
	const [checkedPlat, setCheckedPlat] = useState('1')
	function clickPlat(plat) {
		setCheckedPlat(plat)
		setId && setId(plat)
	}
	return (
		<div className='platform-header'>
			<div className='box'>平台：</div>
			{list.map(item => <div
				className={`platform-item ${checkedPlat == item.platformId ? ' active' : ''}`}
				key={item.platformId}
				onClick={() => clickPlat(item.platformId)}
			>
				{item.name}
			</div>)}
		</div>
	)
}
export function GroupHeader({ list, setId, }) {
	const [checkedGroup, setCheckedGroup] = useState('1')
	function clickPlat(plat) {
		setCheckedGroup(plat)
		setId && setId(plat)
	}
	return (
		<div className='platform-header'>
			<div className='box'>平台：</div>
			{list.map(item => <div
				className={`platform-item ${checkedGroup == item.groupTypeId ? ' active' : ''}`}
				key={item.groupTypeId}
				onClick={() => clickPlat(item.groupTypeId)}
			>
				{item.platformResVOS.length > 0 ? <HCPopover
					trigger="click"
					content={item.platformResVOS.map(one => one.platformName).join('、')}
				>
					{item.groupTypeName}
				</HCPopover> : item.groupTypeName}
			</div>)}
		</div>
	)
}

export default PlatformHeader
