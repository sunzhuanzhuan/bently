import { handleActions, createAction } from 'redux-actions';
import * as cooperationPlatformActions from '../actions'
//平台列表
export const cooperationPlatformByPageList = handleActions({
	[cooperationPlatformActions.getCooperationPlatformByPage_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})
//平台详情
export const cooperationPlatformInfoByIdDetail = handleActions({
	[cooperationPlatformActions.getCooperationPlatformInfoById_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})
//平台下拉框
export const platformSelect = handleActions({
	[cooperationPlatformActions.getPlatform_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})
//收费类型下拉框
export const captureTollType = handleActions({
	[cooperationPlatformActions.getCaptureTollType_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})
//抓取报价项
export const captureTrinitySkuType = handleActions({
	[cooperationPlatformActions.getCaptureTrinitySkuType_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})
//关联报价项
export const skuType = handleActions({
	[cooperationPlatformActions.getSkuType_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})

