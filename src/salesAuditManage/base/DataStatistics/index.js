import React from "react"
import './index.less'
const DataStatistics = ({ data = [] }) => {

	return data.length ? <ul className='data-statistics-container'>
		{data.map(node => <li key={node}>{node}</li>)}
	</ul> : null
}

export default DataStatistics
