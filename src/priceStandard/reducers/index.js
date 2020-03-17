import { combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions';
import * as goodsReceiptAction from '../actions'
import * as skuType from './skuType'

// export const goodsReceiptList = handleActions({
// 	[goodsReceiptAction.getGRList_success]: (state, action) => {
// 		return { ...action.payload.data }
// 	}
// }, {})



export default combineReducers({
	...skuType
})
