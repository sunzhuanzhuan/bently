import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import commonReducers from './common'
import authReducers from '../auth/reducers'
import adminUserList from '../adminUser/reducers'
import orderReducers from '../order/reducers'
import reservationReducers from '../reservation/reducers'
import batchCreateMainAccountReducers from '../batchCreateMainAccount/reducers'
import companyDetail from '../companyDetail/reducers'
import invoice from '../invoice/reducers'
import accountUploadReducers from "../accountUpload/reducers";
import loginReducer from '../login/reducer/index'
import withdraw from '../extractCoin/reducers'
import extensionNumber from '../extensionNumber/reducers'
import siderMenuReducer from '../siderMenu/reducers'
import operationslabelReducers from '../operationslabel/reducers'
import saleCRMReducers from "../saleCRM/reducers";
import authorizationsReducers from './authorizations'
import minApp from '../minAppExcel/reducers'
import manage from '../manage/reducers'
import accountEnterReducers from '../accountEnter/reducers'
import videoDispatch from "../videoDispatch/reducers";
import saleIncome from '../saleIncome/reducers'
import studioManage from '../studioManage/reducers'
import filterParams from '../accountRecommend/reducers'
import goodsReceipt from '../goodsReceipt/reducers'
import salesAuditManage from "../salesAuditManage/reducers";
import queryExportToolReducer from '../queryExportTool/reducer'
import exportTemplateReducer from '../components/exportTemplate/reducer'
import videoMark from '../videomark/reducers'
export default combineReducers({
	commonReducers,
	routing: routerReducer,
	auth: authReducers,
	...adminUserList,
	orderReducers,
	reservationReducers,
	batchCreateMainAccountReducers,
	companyDetail,
	invoice,
	accountUploadReducers,
	loginReducer,
	withdraw,
	// remitOrder: withdraw.remitOrder,
	extensionNumber,
	siderMenuReducer,
	operationslabelReducers,
	saleCRMReducers,
	authorizationsReducers,
	minApp,
	manage,
	accountEnterReducers,
	videoDispatch,
	saleIncome,
	studioManage,
	filterParams,
	goodsReceipt,
	salesAuditManage,//销售审核管理
	queryExportToolReducer,
	exportTemplateReducer,
	videoMark
});
