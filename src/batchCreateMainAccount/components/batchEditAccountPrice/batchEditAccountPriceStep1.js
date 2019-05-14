import React from 'react'
import { Row, Col, Button } from 'antd';
import './batchEditAccountPriceStep1.less'

export const batchEditAccountPriceStep1 = (props) => {
	return (
		<div>
			{
				props.batchSkuPlatformList.map((item, index) => {
					return < Row key={index} type="flex" justify="start"
						className="AccountPutAttributeStep1-row" >
						{
							item.map((it, itIndex) => {
								return <Col span={4} key={itIndex} onClick={() => props.jumpToStep2('', '', it.platformId)}
									className="AccountPutAttributeStep1-col"
								>
									<div className="icon-img"
										style={{ backgroundImage: `url(${it.platformIcon})` }}
									></div>
									<div className="icon-title">{it.platformName}</div>
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
