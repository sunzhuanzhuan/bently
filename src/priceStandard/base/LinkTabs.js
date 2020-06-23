import React from 'react'
import { Tabs } from 'antd';
import { Link } from 'react-router-dom';
const { TabPane } = Tabs;
const tabList = [{
	key: '/priceStandard/skuType',
	tab: "平台SKU配置"
}, {
	key: '/priceStandard/platform',
	tab: "平台权益池配置"
}, {
	key: '/priceStandard/system',
	tab: "系统权益池管理"
}]
function callback(link) {
	window.location = link
}
function LinkTab(props) {
	return (
		<Tabs type="card"
			onChange={callback} defaultActiveKey={window.location.pathname}
		>
			{
				tabList.map(one => <TabPane tab={one.tab} key={one.key}>
				</TabPane>
				)
			}
		</Tabs>
	)
}

export default LinkTab
