import React, { Component } from 'react';
import { Route } from "react-router-dom";
import lazyLoadComponent from '../components/LazyLoadComponent'

// 懒加载路由级组件
const StudioList = lazyLoadComponent(() => import("./containers/studioManage"))
const NewStudio = lazyLoadComponent(() => import("./containers/newStudio"))
const StudioDetail = lazyLoadComponent(() => import("./containers/studioDetail"))

class StudioManage extends Component {
	state = {}
	render() {
		return (
			<div>
				<Route exact path="/studioManage/list" component={StudioList} />
				<Route exact path="/studioManage/new" component={NewStudio} />
				<Route exact path="/studioManage/detail" component={StudioDetail} />
			</div>
		);
	}
}

export default StudioManage;
