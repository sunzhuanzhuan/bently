import React from 'react'
import StatisticsItem from "../statisticsItem";
export const StatisticsAll = ({ sum1 = 22, sum2 = 99, statisticsDate, statisticsDate2 }) => {
	return <div className="checked-order-count-box">
		<div className="title">当前已选择的订单/活动统计</div>
		<div >
			<div className="title flex-width" >采购价</div>
			<span>总计：<a>¥{sum1}</a></span>
			<StatisticsItem statisticsDate={statisticsDate} />
		</div>
		<div >
			<div className="title flex-width" >采购价+服务费</div>
			<span>总计：<a>¥{sum2}</a></span>
			<StatisticsItem statisticsDate={statisticsDate2} />
		</div>
	</div>
}
export default StatisticsAll
