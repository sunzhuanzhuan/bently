import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import lazyLoadComponent from 'lazy-load-component'
import moment from 'moment'
// moment.fn.toJSON = function () {return moment(this).format("YYYY-MM-DD HH:mm:ss")}

// 懒加载路由级组件
const TestContainer = lazyLoadComponent(() => import('./TestContainer'))


class ExportTemplate extends Component {
	state = {}

	render() {
		return (
			<div>
				<Route path='/exportTemplate/create' component={TestContainer} />
				{/*<Route path='/exportTemplate/list' component={} />*/}
			</div>
		);
	}
}

export default ExportTemplate;
