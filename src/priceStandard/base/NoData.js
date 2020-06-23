import React from 'react'
import './NoData.less'
function NoData(props) {
	return (
		<div className='no-data'>
			<img src={require('../img/grapText.png')} />
			{props.text || '暂无权益'}
			{props.children}
		</div>
	)
}

export default NoData
