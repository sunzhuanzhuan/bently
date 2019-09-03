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

	return <div className={'value-format-display-container ' + classNameMap[type]}>
		<div className='value-format-display-value' style={{ fontSize: "13px" }}>{type == 1 && productOnShelfStatus != 1 ? "-" : val ? val : "-"}</div>
		{hasUnit && <div className='value-format-display-unit'>{type == 1 && productOnShelfStatus != 1 ? "" : unit}</div>}
	</div>
}

export default ValueStyle
