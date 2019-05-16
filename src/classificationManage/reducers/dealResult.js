import { handleActions } from 'redux-actions';
import {
	getDealResultList_success,
	getSelectionList_success,
	getNewDealResultList_success
} from '../actions/dealResult.js'

//获取getDealResultList
export const dealResultList = handleActions({
	[getDealResultList_success]: (state, action) => ({
		...state,
		...action.payload.data
	})
}, {})
//SelectionList
export const selectionList = handleActions({
	[getSelectionList_success]: (state, action) => ([
		...action.payload.data
	])
}, [])
//新java获取列表接口
export const newDealResultList = handleActions({
	[getNewDealResultList_success]: (state, action) => ({
		...state,
		...action.payload.data
	})
}, {})
