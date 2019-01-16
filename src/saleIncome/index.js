import React from 'react';
import { Route } from "react-router-dom";
import lazyLoadComponent from '../components/LazyLoadComponent'

const MissionList = lazyLoadComponent(() => import("./container/missionList"))
const MissionInput = lazyLoadComponent(() => import("./container/missionInput"))
const MissionOutput = lazyLoadComponent(() => import("./container/missionOutput"))
const BusinessList = lazyLoadComponent(() => import("./container/businessIncome"))
const ExceedList = lazyLoadComponent(() => import("./container/exceedPayment"))
const LongAging = lazyLoadComponent(() => import("./container/longAging"))
const CompletePercent = lazyLoadComponent(() => import("./container/completePercent"))
const ClientPayment = lazyLoadComponent(() => import("./container/clientPayment"))
const PersonInfo = lazyLoadComponent(() => import("./container/personInfo"))
const CompanyIncome = lazyLoadComponent(() => import("./container/companyIncome"))
const BusinessAccounting = lazyLoadComponent(() => import("./container/businessAccounting"))

class SaleIncomeRoute extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<Route path='/saleIncome/missionList' component={MissionList} />
				<Route path='/saleIncome/missionInput' component={MissionInput} />
				<Route path='/saleIncome/missionOutput' component={MissionOutput} />
				<Route path='/saleIncome/businessIncome' component={BusinessList} />
				<Route path='/saleIncome/exceedPayment' component={ExceedList} />
				<Route path='/saleIncome/longAging' component={LongAging} />
				<Route path='/saleIncome/completePercent' component={CompletePercent} />
				<Route path='/saleIncome/clientPayment' component={ClientPayment} />
				<Route path='/saleIncome/personInfo' component={PersonInfo} />
				<Route path='/saleIncome/companyIncome' component={CompanyIncome} />
				<Route path='/saleIncome/businessAccounting' component={BusinessAccounting} />
			</div>
		);
	}
}
export default SaleIncomeRoute;
