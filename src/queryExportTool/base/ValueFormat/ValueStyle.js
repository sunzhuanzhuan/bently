import React from "react"
import './index.less'



const ValueStyle = ({ value: val = null, unit, type = 2, productOnShelfStatus }) => {
	//productOnShelfStatus  下架的Sku==2时显示为' — '
	const classNameMap = {
		1: "price-value-red",
		2: "large-value-dark",
		3: "price-value-dark"
	}
	const hasUnit = !!(unit && val && val != 0 && val != "-")
	const isEffect = type == 1 && productOnShelfStatus != 1//是否是有效数据
	return <div className={'value-format-display-container ' + classNameMap[type]}>
		<div className='value-format-display-value' style={{ fontSize: "13px" }}>
			{isEffect ? "-" :
				val ? val : "-"
			}</div>
		{hasUnit && <div className='value-format-display-unit'>{isEffect ? "" : unit}</div>}
	</div>
}

export default ValueStyle
