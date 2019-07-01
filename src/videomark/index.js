import React, { Component } from 'react'

import { Route } from 'react-router-dom'
import lazyLoadComponent from '../components/LazyLoadComponent'

const Excel = lazyLoadComponent(() => import('./containers/Excel'))
const OrderTask = lazyLoadComponent(() => import('./containers/Task'))
const BrandManage = lazyLoadComponent(() => import('./containers/BrandManage'))

class videoMarkIndex extends Component {
	state = {}
	render() {
		return (
			<div>
				<Route path='/vm/videomark' component={ Excel } />
				<Route path='/vm/orderMark/task' component={ OrderTask } />
				<Route path='/vm/orderMark/brand' component={ BrandManage } />
			</div>
		);
	}
}

export default videoMarkIndex;
