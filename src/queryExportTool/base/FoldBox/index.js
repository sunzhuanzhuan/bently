import React, { useState } from 'react'
import './index.less'
import { Icon } from 'antd'
function FoldBox({ isFold = true, height, children }) {
	const [isShow, setIsShow] = useState(false)
	return (
		<div className='fold-box'>
			{isFold ? <div className={isShow ? 'fold-container' : ''}>
				<div className='fold-content' style={{ height: isShow ? '' : height }}>
					{children}
				</div>
				<div onClick={() => setIsShow(!isShow)}>
					{isShow ? <div className='close'>收起 <Icon type="up" /></div>
						: <div className='look-more'> 查看更多 <Icon type="down" />
						</div>}
				</div>
			</div> : children}
		</div>
	)
}

export default FoldBox
