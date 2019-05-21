import React from 'react'
import { Button, Row, Col } from 'antd';
import './AccountPutAttributeStep1.less'

export const AccountPutAttributeStep1 = (props) => {
	return (
		<div className="AccountPutAttributeStep1-box">
			{
				props.instockPlatformList.map((item, index) => {
					return < Row key={index} type="flex" justify="start"
						className="AccountPutAttributeStep1-row" >
						{
							item.map((it, itIndex) => {
								return <Col span={4} key={itIndex} onClick={() => props.jumpToTab2(it.operateKey, it.platformName, it.platformId)}
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
			<Button type="primary" className="returnTab1" onClick={() => props.return()}>返回首页</Button>
		</div>
	)
}
