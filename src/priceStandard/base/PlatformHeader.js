import React, { useState } from 'react'
import './PlatformHeader.less'

const defaultList = [
	{ name: '微信公众号', platformId: '9' },
	{ name: '新浪微博', platformId: '1' }
]
function PlatformHeader({ list = defaultList, onSearch }) {
	const [checkedPlat, setCheckedPlat] = useState('9')
	function clickPlat(plat) {
		setCheckedPlat(plat)
		onSearch && onSearch(plat)
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
