/*
 * @Descripttion: 价格标准化
 * @Author: wangxinyue
 * @Date: 2020-03-17 10:24:25
 */
import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import lazyLoadComponent from '../components/LazyLoadComponent'
import LinkTabs from './base/LinkTabs'
// 懒加载路由级组件
const SkuType = lazyLoadComponent(() => import('./containers/SkuType'))
const PlatformConfig = lazyLoadComponent(() => import('./containers/PlatformConfig'))
const SystemConfig = lazyLoadComponent(() => import('./containers/SystemConfig'))
class PriceStandard extends Component {
	state = {}

	render() {
		console.log();
		return (
			<div>
				{/* <LinkTabs /> */}
				<Route path='/priceStandard/skuType' component={SkuType} />
				<Route path='/priceStandard/platform' component={PlatformConfig} />
				<Route path='/priceStandard/system' component={SystemConfig} />
			</div>
		);
	}
}
export default PriceStandard;

