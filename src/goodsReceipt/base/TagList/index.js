import React from 'react'

import "./index.less";
const TagList = ({ list = [] }) => {
	return <div className="tag-list">{list.map((one, index) => <div key={index} className="item">{one}</div>)}</div>
}
export default TagList
