import { combineReducers } from 'redux'
// import { handleAction, handleActions, combineActions } from 'redux-actions';
import { handleAction, handleActions } from 'redux-actions';
import { getAllPlatform_success, getAvailablePlatformList_success } from '@/actions'

export const platforms = handleAction(getAllPlatform_success, (state, action) => {
	return [
		...action.payload.data
	]
}, [])

export const availablePlatforms = handleAction(getAvailablePlatformList_success, (state, action) => {
	return [
		...action.payload.data
	]
}, [])


export default combineReducers({
	platforms,
	availablePlatforms
})
