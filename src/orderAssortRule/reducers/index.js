import { combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions';
import * as orderAssortRule from '../actions'


export const listBP = handleActions({
	[orderAssortRule.getBPList_success]: (state, action) => {
		return { ...action.payload.result }
	}
}, {})


export default combineReducers({
	listBP,
})
