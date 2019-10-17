import React from "react"
import './index.less'
import numeral from "numeral";
const InfoDIsplay = ({ title, value, suffix, afterLable, textColor, isString, format }) => {

	return <div className='item-footer-info-diaplay'>
		<span className='title'>{title}</span> :
		{isString ? <strong className='info-value'>{value > 0 || value == 0 ? <span>{numeral(value).format(format)}{afterLable}</span> : " - "}</strong> :
			<strong className='info-value'>{value > 0 || value == 0 ? <span>{value}{afterLable}</span> : " - "}</strong>
		}
	</div>
}

export default InfoDIsplay
