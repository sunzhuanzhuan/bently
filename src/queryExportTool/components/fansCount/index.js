import React from "react"
import './index.less'
import ValueFormat from "@/queryExportTool/base/ValueFormat";
import numeral from "numeral";

import MarkMessage from '../../base/MarkMessage'

const FansCount = ({ value, isfollowerCount, followerCountGrowthRate28d }) => {
	return <div className='fans-count-item'>
		<div className='title'>粉丝数
		{isfollowerCount && followerCountGrowthRate28d ? <span>/增长率 <MarkMessage content={'粉丝数下方的百分数为近28天的粉丝增长率'} /></span> : null}
		</div>
		<div className='value'>
			<ValueFormat value={value} format='large' />{isfollowerCount ?
				<span>/
				<span className='growth-rate'>{numeral(followerCountGrowthRate28d).format("0.0%")}</span>
				</span>
				: null}
		</div>

	</div>
}

export default FansCount
