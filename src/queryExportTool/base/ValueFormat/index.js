import React from "react"
import numeralExpand from '@/util/numeralExpand'
import './index.less'


const types = {
	'price': {
		className: 'price-value-red',
		format: '0,0',
		unit: '元'
	},
	'univalent': {
		className: 'price-value-dark',
		format: '0.00',
		unit: '元'
	},
	'oneUnivalent': {
		className: 'price-value-dark',
		format: '0.0',
		unit: '元'
	},
	'large': {
		className: 'large-value-dark',
		format: '0aw',
		unit: ''
	}
}
const ValueFormat = ({ value: val = null, unit: un = '', format: fm = 'price', fontSize }) => {
	const { className = '', format, unit = un } = types[fm]
	const hasUnit = !!(unit && val && val != 0 && val != "-")
	const value = numeralExpand(val)
	return <div className={'value-format-display-container ' + className}>
		<div className='value-format-display-value' style={{ fontSize: fontSize }}>{val == 0 ? "-" : value.format(format)}</div>
		{hasUnit && <div className='value-format-display-unit'>{unit}</div>}
	</div>
}

export default ValueFormat
