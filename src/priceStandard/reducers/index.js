import { combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions';
import * as priceStandard from '../actions'

function objToListSystem(data = {}) {
	return {
		...data,
		list: [
			{
				name: '权益类型',
				value: data.equitiesTypeName,
				type: 'text'
			}, {
				name: '权益单/复选设置',
				value: data.equitiesTypeAttribute == 1 ? '单选' : '复选',
				type: 'text'
			}, {
				name: '权益单',
				value: data.equitiesList,
				type: 'tags'
			}
		]
	}
}
function objToListPlatform(data = {}) {
	return {
		...data,
		list: [
			{
				name: '权益类型',
				value: data.equitiesTypeName,
				type: 'text'
			}, {
				name: '权益单',
				value: data.equitiesList,
				type: 'tags'
			}
		]
	}
}
function objToListSku(data = {}) {
	return {
		...data,
		list: [
			{
				name: 'SKU类型',
				value: data.skuTypeName,
				type: 'text'
			}, {
				name: '权益',
				value: data.equitiesList,
				type: 'tags'
			}
		]
	}
}
function objToSkuUpdate(data = {}) {
	const isRequiredIds = data.equitiesList.filter(one => one.isRequired > 0).map(item => item.equitiesId)
	return {
		...objToListSku(data),
		isRequiredIds: isRequiredIds
	}
}
//获取系统权益池权益类型及权益
export const systemEquitiesList = handleActions({
	[priceStandard.getSystemEquities_success]: (state, action) => {
		const data = [...action.payload.data]
		return data.map(item => objToListSystem(item))
	}
}, [])
//查询系统权益池某项权益类型及权益
export const systemEquities = handleActions({
	[priceStandard.getSystemEquitiesById_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})
//获取媒体平台下sku权益配置
export const skuList = handleActions({
	[priceStandard.getPlatformSkuTypeEquities_success]: (state, action) => {
		const data = [...action.payload.data]
		return data.filter(item => item.isBasic != 1).map(item => objToListSku(item))
	}
}, [])
export const skuBaseList = handleActions({
	[priceStandard.getPlatformSkuTypeEquities_success]: (state, action) => {
		const data = [...action.payload.data]
		return data.filter(item => item.isBasic == 1).map(item => objToListSku(item))
	}
}, [])
//获取媒体平台下sku权益配置修改数据
export const skuUpdateList = handleActions({
	[priceStandard.getCanUpdateSkuTypeEquities_success]: (state, action) => {
		const data = [...action.payload.data]
		return data.map(item => objToSkuUpdate(item))
	}
}, [])
//通过groupTypeId获取平台组权益
export const platformList = handleActions({
	[priceStandard.getEquitiesByGroupTypeId_success]: (state, action) => {
		const data = [...action.payload.data]
		return data.map(item => objToListPlatform(item))
	}
}, [])
//通过groupTypeId获取平台组权益未使用
export const platformNoUsedList = handleActions({
	[priceStandard.getUnUseEquitiesByGroupTypeId_success]: (state, action) => {
		const data = [...action.payload.data]
		return data.map(item => objToListPlatform(item))
	}
}, [])
//获取媒体平台组平台信息
export const groupPlatformList = handleActions({
	[priceStandard.PSGetGroupPlatformList_success]: (state, action) => {
		return [...action.payload.data]
	}
}, [])
//获取新b端所有平台列表
export const newBPlatformsList = handleActions({
	[priceStandard.PSGetNewBPlatforms_success]: (state, action) => {
		return [...action.payload.data]
	}
}, [])
export default combineReducers({
	systemEquitiesList,
	systemEquities,
	platformList,
	skuList,
	skuUpdateList,
	skuBaseList,
	platformNoUsedList,
	groupPlatformList,
	newBPlatformsList
})
