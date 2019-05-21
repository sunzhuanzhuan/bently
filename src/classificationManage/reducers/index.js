import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import {
	getClassifyFeedbackList_success,
	getCustomClassifyList_success
} from '../actions'

const classifyFeedbackList = handleActions({
	[getClassifyFeedbackList_success]: (state, action) => ({
		...state,
		...action.payload.data
	})
}, {})

const customClassifyList = handleActions({
	[getCustomClassifyList_success]: (state, action) => ({
		...state,
		...action.payload.data
	})
}, {})

export default combineReducers({
	classifyFeedbackList,
	customClassifyList
})
