import { handleActions, createAction } from 'redux-actions';
import * as cooperationPlatformActions from '../actions'
//平台列表
export const cooperationPlatformByPageList = handleActions({
	[cooperationPlatformActions.getCooperationPlatformByPage_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})

//平台下拉框
export const platformSelect = handleActions({
	[cooperationPlatformActions.getPlatform_success]: (state, action) => {
		const arr = [...action.payload.data]
		const map = arr.reduce((obj, product) => {
			obj[product.id] = product
			return obj
		}, {})
		return { arr: arr || [], map: map }
	}
}, {})



