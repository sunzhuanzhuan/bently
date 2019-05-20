import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import { getClassifyFeedbackList_success } from '../actions'

const classifyFeedbackList = handleActions({
	[getClassifyFeedbackList_success]: (state, action) => ({
		...state,
		...action.payload.data
	})
}, {})

export default combineReducers({
	classifyFeedbackList
})
