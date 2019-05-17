import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import lazyLoadComponent from '../components/LazyLoadComponent'
import './index.less'


// 懒加载路由级组件
const Whitelist = lazyLoadComponent(() => import('./containers/Whitelist'))


class BatchCreateMainAccountIndex extends Component {
	state = {}
	render() {
		return (
			<div>
				<Route path='/classificationManage/whitelist/:key' component={Whitelist} />
				<Route path='/classificationManage/feedback/:key' component={Whitelist} />
			</div>
		);
	}
}

export default BatchCreateMainAccountIndex;
