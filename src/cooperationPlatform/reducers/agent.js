import { handleActions, createAction } from 'redux-actions';
import * as cooperationPlatformActions from '../actions'

//列表
export const agentByPageList = handleActions({
	[cooperationPlatformActions.getAgentByPage_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})
//开户行下拉框
export const paymentTypeList = handleActions({
	[cooperationPlatformActions.getPaymentTypeList_success]: (state, action) => {
		return [...action.payload.data.payment_type_list]
	}
}, [])
