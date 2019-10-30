import { combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions';
import * as orderAssortRule from '../actions'


export const listBP = handleActions({
	[orderAssortRule.getBPList_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})

export const regionList = handleActions({
	[orderAssortRule.getRegionList_success]: (state, action) => {
		return [...action.payload.data.list]
	}
}, [])


export default combineReducers({
	listBP, regionList
})
