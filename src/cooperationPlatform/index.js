import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import lazyLoadComponent from '../components/LazyLoadComponent'
// 懒加载路由级组件
const CooperationPlatformList = lazyLoadComponent(() => import('./containers/CooperationPlatform'))
const CooperationPlatformEdit = lazyLoadComponent(() => import('./containers/CooperationPlatformEdit'))
const CooperationPlatformDetail = lazyLoadComponent(() => import('./containers/CooperationPlatformDetail'))
const AgentList = lazyLoadComponent(() => import('./containers/Agent'))
const AgentEdit = lazyLoadComponent(() => import('./containers/AgentEdit'))
const AgentDetail = lazyLoadComponent(() => import('./containers/AgentDetail'))


class cooperationPlatform extends Component {
	state = {}
	render() {

		return (
			<div style={{ height: '100%' }}>
				<Route path='/config/platform/list' component={CooperationPlatformList} />
				<Route path='/config/platform/edit' component={CooperationPlatformEdit} />
				<Route path='/config/platform/detail' component={CooperationPlatformDetail} />
				<Route path='/config/platform/agentList' component={AgentList} />
				<Route path='/config/platform/agentEdit' component={AgentEdit} />
				<Route path='/config/platform/agentDetail' component={AgentDetail} />

			</div>
		);
	}
}
export default cooperationPlatform;

