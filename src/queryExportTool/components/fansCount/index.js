import React from "react"
import './index.less'
import ValueFormat from "@/queryExportTool/base/ValueFormat";
import numeral from "numeral";

import MarkMessage from '../../base/MarkMessage'

const formatWNumberDefult = (value) => {
  let unit = ''
  if (value == 0 || value > 0) {
    if (Math.abs(value) > 100000000 || Math.abs(value) == 100000000) {
      value = numeral(value / 100000000).format('0.0')
      unit = '亿'
    } else if (Math.abs(value) > 10000 || Math.abs(value) == 10000) {
      value = numeral(value / 10000).format('0.0')
      unit = '万'
    } else {
      value = numeral(value || 0).format('0')
    }
  } else {
    return {value: '-', unit: ''}
  }
  return {value, unit}
}


const FansCount = ({ value, isfollowerCount, followerCountGrowthRate28d }) => {
  value = formatWNumberDefult(value);
  let val = value.value;
  if (!val || val === '0' || val === 0) {
    val = '-';
  }
  return <div className='fans-count-item'>
		<div className='title'>粉丝数
		{isfollowerCount && followerCountGrowthRate28d ? <span>/增长率 <MarkMessage content={'增长率为近28天的粉丝增长率'} /></span> : null}
		</div>
    <div className='value'>
      <div className='value-format-display-container large-value-dark'>
        <div className='value-format-display-value'>{val}{value.unit}</div>
      </div>
      {isfollowerCount ?
        <span>/
				<span className='growth-rate'>{numeral(followerCountGrowthRate28d).format("0.0%")}</span>
				</span>
        : null}
    </div>

	</div>
}

export default FansCount
