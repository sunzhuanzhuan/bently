import React from 'react'
import { } from '../../constants/config'
import { Button } from 'antd';
import './batchEditAccountPriceStep2.less'

export const batchEditAccountPriceStep2 = (props) => {
	return (
		<div className="batchEditAccountPriceStep2">
			<div className="batchEditAccountPriceStep2-box">
				<span>账号类型：</span>
				<Button type="primary"
					onClick={() => props.chooseProductionLineId("1")}
				>预约账号</Button>
				<Button type="primary" className="batchEditAccountPriceStep2-box-btn"
					onClick={() => props.chooseProductionLineId("2")}
				>派单账号</Button>
			</div>
			<Button className="batchEditAccountPriceStep2-return"
				onClick={() => props.jumpToStep1()}
			>返回上一步</Button>
		</div>
	)
}
