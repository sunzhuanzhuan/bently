import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import lazyLoadComponent from '../components/LazyLoadComponent'
import './style.less'
// 懒加载路由级组件
const OrderReview = lazyLoadComponent(() => import('./containers/OrderReview'))
const DataDetail = lazyLoadComponent(() => import('./containers/DataDetail'))
const Test = lazyLoadComponent(() => import('./containers/Test'))
class SalesAuditManage extends Component {
	state = {}
	render() {
		return (
			<div>
				<Route path='/salesAuditManage/orderReview' component={OrderReview} />
				<Route path='/salesAuditManage/dataDetail' component={DataDetail} />
				<Route path='/salesAuditManage/test' component={Test} />
			</div>
		);
	}
}
export default SalesAuditManage;
