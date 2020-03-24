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
				value: data.equitiesList.filter(item => item.isUsed == 1),
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
	[priceStandard.getEquitiesByPlatformId_success]: (state, action) => {
		const data = [...action.payload.data]
		return data.filter(item => item.isBasic != 1).map(item => objToListSku(item))
	}
}, [])
export const skuBaseList = handleActions({
	[priceStandard.getEquitiesByPlatformId_success]: (state, action) => {
		const data = [...action.payload.data]
		return data.filter(item => item.isBasic == 1).map(item => objToListSku(item))
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
	[priceStandard.getEquitiesNoUsed_success]: (state, action) => {
		const data = [...action.payload.data]
		return data.map(item => objToListPlatform(item))
	}
}, [])

export default combineReducers({
	systemEquitiesList,
	systemEquities,
	platformList,
	skuList,
	skuBaseList,
	platformNoUsedList
})
