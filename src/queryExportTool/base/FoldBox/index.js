import React, { useState } from 'react'
import './index.less'
import { Icon } from 'antd'
function FoldBox({ isFold = true, height, children, foldId }) {
	const [isShow, setIsShow] = useState(false)
	const showStyle = { height: height + 24 }
	function getHeight() {
		const foldDiv = document.getElementById(foldId)
		return foldDiv.offsetHeight;
	}

	return (
		isFold ? <div className={`fold-box ${isShow ? 'z-index-up' : ''}`} style={showStyle} >
			<div className='fold-container'>
				<div className='fold-content' style={{ height: isShow ? getHeight() : height }} >
					{children}
				</div>
				<div onClick={() => setIsShow(!isShow)}>
					{isShow ? <div className='close'>收起 <Icon type="up" /></div>
						: <div className='look-more'> 查看更多 <Icon type="down" />
						</div>}
				</div>
			</div>
		</div > : children
	)
}

export default FoldBox
