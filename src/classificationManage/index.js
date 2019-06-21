import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import lazyLoadComponent from '../components/LazyLoadComponent'
import './index.less'


// 懒加载路由级组件
const Whitelist = lazyLoadComponent(() => import('./containers/Whitelist'))
const Feedback = lazyLoadComponent(() => import('./containers/Feedback'))


class BatchCreateMainAccountIndex extends Component {
	state = {}
	render() {
		return (
			<div>
				<Route path='/classificationManage/whitelist' component={Whitelist} />
				<Route path='/classificationManage/feedback' component={Feedback} />
			</div>
		);
	}
}

export default BatchCreateMainAccountIndex;
