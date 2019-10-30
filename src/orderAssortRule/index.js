import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import lazyLoadComponent from '../components/LazyLoadComponent'
// 懒加载路由级组件
const OrderAssortRuleIndex = lazyLoadComponent(() => import('./containers/OrderAssortRule'))
class OrderAssortRule extends Component {
	state = {}
	render() {
		return (
			<div>
				<Route path='/assortOrder/rule' component={OrderAssortRuleIndex} />
			</div>
		);
	}
}
export default OrderAssortRule;

