import React from "react"
import './index.less'
import ValueFormat from "@/queryExportTool/base/ValueFormat";
import images from "../../images"
import { Tooltip, Icon } from "antd";
import MarkMessage from '../../base/MarkMessage'

const FansCount = ({ value, status, time, IS_WEiXin, isfollowerCount }) => {
	return <div className='fans-count-item'>
		<div className='title'>粉丝数
		{isfollowerCount && <MarkMessage content={'粉丝数下方的百分数为近28天的粉丝增长率'} />}
		</div>
		<div className='value'>
			<ValueFormat value={value} format='large' />
		</div>
	</div>
}

export default FansCount
