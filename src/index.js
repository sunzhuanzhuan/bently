
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
// import { Router, Route, IndexRedirect } from 'react-router';
import store, { history } from './store';
import "babel-polyfill";
//登录login
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import './index.less'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import moment from 'moment';
import 'moment/locale/zh-cn';
import numeral from 'numeral';
import 'numeral/locales/chs';
//顶级根目录页面
import App from './containers/App'
import lazyLoadComponent from 'lazy-load-component'
import { WBYUploadFile } from 'wbyui'
//懒加载
import Order from './order/index'
import AuthRoute from './auth/index'
import ReservationRoute from './reservation/index'
import BatchCreateMainAccountRoute from './batchCreateMainAccount/index'
import SaleCRMRoute from './saleCRM/index'
// import Detail from './companyDetail/index'
// import Invoice from './invoice/index'
import AccountUploadRoute from "./accountUpload/index";
// import ExtractCoin from './extractCoin/index'
import OperationslabelRoute from './operationslabel/index'
import ExtensionNumber from './extensionNumber/index'
import ManageRoute from './manage/index'
import KeyWordIndex from './accountRecommend/index'
import LoginSuccess from './loginIndex/index'
import VideoMark from './videomark/index'
import AccountEnter from './accountEnter/index'
// import SaleIncomeRoute from './saleIncome/index'
// import FormTest from './components/Form/FormTest'
// import StudioManage from './studioManage'
import SalesAuditManage from "./salesAuditManage/index";

import ExportTemplate from './exportTemplate/index'
import AccountList from './queryExportTool/index'
//404错误页面
import ErrorIndex from './containers/error'
import Login from './login/container/Login'
import videoDispatch from "./videoDispatch";
//404错误页面
// import AccountManage from './accountManage'
import GoodsReceipt from "./goodsReceipt";
numeral.locale('chs')
moment.locale('zh-cn');
// const AccountList = lazyLoadComponent(() => import('./queryExportTool/index'))
const redirectToOtherProjects = ({ location: { pathname = '/error', search = '' }, history }) => {
	/** 新B端测试环境地址 @namespace process.env.REACT_APP_TRUNK_BENTLEY_ADDRESS **/
	if(/^\/(account|finance)+\/.+/.test(pathname)){
		if (process.env.NODE_ENV === 'development') {
			window.location.replace(process.env.REACT_APP_TRUNK_BENTLEY_ADDRESS + pathname)
			return null;
		}
		window.location.replace(pathname + search)
	}else{
		return <Redirect to={'/error'} />;
	}
	return null
}
  
render(
	<LocaleProvider locale={zhCN}>
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					{/* <Route exact path='/test' component={FormTest} /> */}
					<Route exact path='/' render={() => (<Redirect to="/loginSuccess" />)} />
					<Route path='/login' component={Login} />
					{/* <Route path='/finance/remitOrder/paymentOrder' component={ExtractCoin} /> */}
					<App history={history}>
						<Switch>
							<Route path='/orderTools' component={Order} />
							<Route path='/toolbox' component={AccountUploadRoute} />
							<Route path='/qc' component={ReservationRoute} />
							<Route path='/tool' component={BatchCreateMainAccountRoute} />
							<Route path='/auth' component={AuthRoute} />
							<Route path='/manage' component={ManageRoute} />
							<Route path='/recommend' component={KeyWordIndex} />
							<Route path='/sale' component={SaleCRMRoute} />
							{/* <Route path='/finance/detail' component={Detail} />
							<Route path='/finance/freeze' component={Detail} />
							<Route path='/finance/golden' component={Detail} />
							<Route path='/finance/invoice' component={Invoice} />
							<Route path='/finance/contractManage' component={ExtractCoin} />
							<Route path='/finance/extractManage' component={ExtractCoin} />
							<Route path='/finance/remitOrder' component={ExtractCoin} />
							<Route path='/finance/saleIncome' component={SaleIncomeRoute} />
							<Route path='/finance/studioManage' component={StudioManage} /> */}
							<Route path='/goodsReceipt' component={GoodsReceipt} />
							<Route path='/ol' component={OperationslabelRoute} />
							<Route path='/extensionNumber' component={ExtensionNumber} />
							<Route path='/loginSuccess' component={LoginSuccess} />
							<Route path='/vm' component={VideoMark} />
							<Route path='/accountEnter' component={AccountEnter} />
							<Route path='/videoDispatch' component={videoDispatch} />
							{/* <Route path='/account/manage' component={AccountManage} /> */}
							<Route path='/loginSuccess' component={LoginSuccess} />
							<Route path='/accountList' component={AccountList} />
							<Route path='/globalAccountSearch' component={AccountList} />
							<Route path='/error' component={ErrorIndex} />
							<Route path='/exportTemplate' component={ExportTemplate} />
							<Route path='/salesAuditManage' component={SalesAuditManage} />
							{/* <Redirect to={'/error'} /> */}
							<Route render={redirectToOtherProjects} />
						</Switch>
					</App>
				</Switch>
			</BrowserRouter>
		</Provider></LocaleProvider >,
	document.getElementById('root')
)
