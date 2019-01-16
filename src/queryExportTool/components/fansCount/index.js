import React from "react"
import './index.less'
import ValueFormat from "@/queryExportTool/base/ValueFormat";
import images from "../../images"
import { Popover } from "antd";

const FansCount = ({ value, status, time, IS_WEiXin }) => {
	return <div className='fans-count-item'>
		<div className='title'>粉丝数</div>
		<div className='value'>
			<ValueFormat value={value} format='large' />
		</div>
	</div>
}

export default FansCount
