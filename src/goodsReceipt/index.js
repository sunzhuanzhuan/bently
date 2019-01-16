import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import lazyLoadComponent from '../components/LazyLoadComponent'
import "./index.less"
// 懒加载路由级组件
const RequisitionList = lazyLoadComponent(() => import('./containers/RequisitionList'))
const RequisitionDetail = lazyLoadComponent(() => import('./containers/RequisitionDetail'))
const RequisitionEdit = lazyLoadComponent(() => import('./containers/RequisitionEdit'))


class GoodsReceipt extends Component {
	state = {}
	render() {
		const propsAE = {
			GReditUrl: "/goodsReceipt/AEedit",
			GRListUrl: "/goodsReceipt/AElist",
			GRDetailUrl: "/goodsReceipt/AEdetail",
			goodsReceiptIsAEPermission: true
		}
		const propsAudit = {
			GReditUrl: "/goodsReceipt/requisitionEdit",
			GRListUrl: "/goodsReceipt/requisitionList",
			GRDetailUrl: "/goodsReceipt/requisitionDetail",
		}
		return (
			<div style={{ height: '100%' }} className="goods-receipt-route-index">
				<Route path='/goodsReceipt/requisitionList' render={() => <RequisitionList {...propsAudit} />} />
				{/* <Route path='/goodsReceipt/requisitionEdit/:current' render={() => <RequisitionEdit {...propsAudit} />} /> */}
				<Route path='/goodsReceipt/requisitionDetail' render={() => <RequisitionDetail {...propsAudit} />} />
				<Route path='/goodsReceipt/AElist' render={() => <RequisitionList {...propsAE} />} />
				<Route path='/goodsReceipt/AEedit/:current'
					component={RequisitionEdit} />
				<Route path='/goodsReceipt/AEdetail' render={() => <RequisitionDetail {...propsAE} />}
				/>
			</div>
		);
	}
}
export default GoodsReceipt;

