import React from "react"
import './SimpleTag.less'

const SimpleTag = props => {

	return <div className='simple-tag'>
		{props.children}
	</div>
}

export default SimpleTag
