import React, { Component } from 'react'

import { Route } from 'react-router-dom'
import lazyLoadComponent from '../components/LazyLoadComponent'

// 懒加载路由级组件
const CompanyDetail = lazyLoadComponent(() => import('./containers/companyDetail'))
const FreezeDetail = lazyLoadComponent(() => import('./containers/freezeDetail'))
const GoldenDetail = lazyLoadComponent(() => import('./containers/goldenDetail'))
const AdjustDetail = lazyLoadComponent(() => import('./containers/adjustDetail'))
const AdjustApply = lazyLoadComponent(() => import('./containers/adjustApply'))
const AddAdjustApply = lazyLoadComponent(() => import('./containers/addAdjustApply'))
const AdjustApplyDetail = lazyLoadComponent(() => import('./containers/adjustApplyDetail'))
const AdjustApplyInput = lazyLoadComponent(() => import('./containers/adjustApplyInput'))
// import SourceType from './containers/SourceType'
// import Sources from './containers/Sources'
// import NavType from './containers/NavType'
// import Nav from './containers/Nav'
// import NavGroup from './containers/NavGroup'
// import Roles from './containers/Roles'
// import Authority from './containers/Authority'
// import RoleRelation from './containers/RoleRelation'

class Company extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<dic>
				<Route path='/detail/company' component={CompanyDetail} />
				<Route path='/freeze/detail' component={FreezeDetail} />
				<Route path='/golden/detail' component={GoldenDetail} />
				<Route path='/golden/adjustDetail' component={AdjustDetail} />
				<Route path='/golden/adjustApply' component={AdjustApply} />
				<Route path='/golden/addAdjustApply' component={AddAdjustApply} />
				<Route path='/golden/adjustApplyDetail' component={AdjustApplyDetail} />
				<Route path='/golden/adjustApplyInput' component={AdjustApplyInput} />
			</dic>
		);
	}
}

export default Company;
