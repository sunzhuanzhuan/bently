import { combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions';
import * as goodsReceiptAction from '../actions'
import * as firstStep from './firstStep'
import * as secondStep from './secondStep'
//获取token

export const uploadToken = handleActions({
	[goodsReceiptAction.getGRUploadToken_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})
export const goodsReceiptList = handleActions({
	[goodsReceiptAction.getGRList_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})
//获取基础信息
export const baseDetail = handleActions({
	[goodsReceiptAction.updateBaseInfo_success]: (state, action) => {
		const updateData = { ...action.payload }
		delete updateData.data
		return { ...state, ...updateData }
	},
	[goodsReceiptAction.getBaseDetail_success]: (state, action) => {
		return { ...action.payload.data.result }
	}
}, {})


export default combineReducers({
	baseDetail,
	goodsReceiptList,
	uploadToken,
	...firstStep,
	...secondStep
})
