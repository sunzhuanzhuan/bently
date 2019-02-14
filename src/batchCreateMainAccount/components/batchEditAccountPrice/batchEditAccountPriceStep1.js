import React from 'react'
import { platformIcon, batchEditAccountPricePlatformIconArray } from '../../constants/config'
import { Row, Col, Button } from 'antd';
import './batchEditAccountPriceStep1.less'

export const batchEditAccountPriceStep1 = (props) => {
	return (
		<div>
			{
				batchEditAccountPricePlatformIconArray.map((item, index) => {
					return < Row key={index} type="flex" justify="start"
						className="AccountPutAttributeStep1-row" >
						{
							item.map((it, itIndex) => {
								return <Col span={4} key={itIndex} onClick={() => props.jumpToStep2(platformIcon[it].operateType, it, platformIcon[it].remark["weibo_type"])}
									className="AccountPutAttributeStep1-col"
								>
									<div className="icon-img"
										style={{ backgroundImage: `url(${platformIcon[it].img})` }}
									></div>
									<div className="icon-title">{it}</div>
								</Col>
							})
						}
					</Row>
				})
			}
			<Button type="primary" className="returnTab1"
				onClick={() => props.returnHome()}
			>返回首页</Button>
		</div>
	)
}
