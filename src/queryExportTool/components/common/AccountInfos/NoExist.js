import React from 'react'
import "./NoExist.less"
import { Icon, Popover } from "antd";

const NoExist = ({ name }) => {
	return <div className="no-exist-box">
		<div className="no-exist-circle"><Icon type="exclamation-circle" /></div>
		{name.length > 12 ?
			<Popover content={name}>
				<div className="no-exist-name">
					{name.slice(0, 12)}...
				</div>
			</Popover>
			: <div className="no-exist-name">
				{name}
			</div>}
		<div className="no-exist-text">不在库</div>
	</div>
}
export default NoExist;
