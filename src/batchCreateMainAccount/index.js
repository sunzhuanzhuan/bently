import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import lazyLoadComponent from '../components/LazyLoadComponent'


// 懒加载路由级组件
const BatchCreateMainAccount = lazyLoadComponent(() => import('./containers/BatchCreateMainAccount'))


class BatchCreateMainAccountIndex extends Component {
	state = {}
	render() {
		return (
			<div>
				<Route path='/tool/batchCreateMainAccount' component={BatchCreateMainAccount} />
			</div>
		);
	}
}

export default BatchCreateMainAccountIndex;
