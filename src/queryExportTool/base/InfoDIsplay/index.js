import React from "react"
import './index.less'

const InfoDIsplay = ({ title, value, suffix, afterLable, textColor, isString }) => {

	return <div className='item-footer-info-diaplay'>
		<span className='title'>{title}</span> :
		{isString ? <strong className='info-value'>{value ? <span>{value}{afterLable}</span> : " - "}</strong> :
			<strong className='info-value'>{value > 0 ? <span>{value}{afterLable}</span> : " - "}</strong>
		}
	</div>
}

export default InfoDIsplay
