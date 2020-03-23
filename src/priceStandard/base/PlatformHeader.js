import React, { useState } from 'react'
import './PlatformHeader.less'

const groupTypeId = [
	{ name: '微信公众号', platformId: '1' },
	{ name: '新浪微博', platformId: '2' },
	{ name: '视频/直播', platformId: '3' },
	{ name: '小红书', platformId: '4' },
	{ name: '其他平台', platformId: '5' },
]
function PlatformHeader({ list = groupTypeId, setId }) {
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

export default PlatformHeader
