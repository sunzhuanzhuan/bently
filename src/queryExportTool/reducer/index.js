import { combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions';
import * as accoutActions from '../actions'
import * as publicActions from '@/actions'
//账号列表
import * as filterOptions from './filter'
import * as selectCar from "./selectCar";
import * as quotation from "./quotation";
//账号列表的数据
export const accountList = handleActions({
	[accoutActions.addSelectStatic]: (state, action) => {
		const { is_select } = state

		if (is_select) {
			let is_select = [...state.is_select, ...action.payload]
			return { ...state, is_select }
		}
	},
	// [accoutActions.addToCart_success]: (state, action) => {
	// 	const { is_select } = state
	// 	if (is_select) {
	// 		let is_select = [...state.is_select, ...action.payload.data]
	// 		return { ...state, is_select }
	// 	}
	// },

	[accoutActions.removeFromCart_success]: (state, action) => {
		const { is_select } = state
		if (is_select) {
			const is_selectOld = [...state.is_select]
			const deleteData = [...action.payload.data]
			const is_select = is_selectOld.filter(one => !deleteData.includes(one))
			return { ...state, is_select }
		}
	},
	[accoutActions.clearCart_success]: (state, action) => {
		return {
			...state, is_select: []
		}
	},
	[accoutActions.getAccountList_success]: (state, action) => {
		const data = { ...action.payload.data }
		const { result, statistic } = data
		const is_select = result.list.filter(one => one.isSeleted == 1).map(one => one.accountId)
		return {
			...result,
			statistic: statistic,
			is_select: is_select
		}
	}
}, {})
//
export const historyData = handleAction('collectHistoryData', (state, action) => ({
	...state,
	...action.payload
}), {})
//批量查号的数据
export const batchSearchList = handleActions({
	[accoutActions.addSelectStatic]: (state, action) => {
		const { is_select } = state
		if (is_select) {
			let is_select = [...state.is_select, ...action.payload]
			return { ...state, is_select }
		}
	},
	// [accoutActions.addToCart_success]: (state, action) => {
	// 	const { is_select } = state
	// 	if (is_select) {
	// 		let is_select = [...state.is_select, ...action.payload.data]
	// 		return { ...state, is_select }
	// 	}
	// },
	[accoutActions.removeFromCart_success]: (state, action) => {
		const { is_select } = state
		if (is_select) {
			const is_selectOld = [...state.is_select]
			if (is_selectOld.length > 0) {
				const deleteData = [...action.payload.data]
				const is_select = is_selectOld.filter(one => !deleteData.includes(one))
				return { ...state, is_select }
			}
		}

	},
	[accoutActions.cleanBatchSearch]: (state, action) => {
		return { ...state, is_select: [] }
	},
	[accoutActions.getBatchSearch_success]: (state, action) => {
		const data = { ...action.payload.data }
		const { result, statistic } = data
		const is_select = result.list.filter(one => one.isSeleted == 1).map(one => one.accountId)
		return {
			...result,
			statistic: statistic,
			is_select: is_select
		}
	}
}, {})
//账号详情---基本信息
export const baseInfoList = handleActions({
	[accoutActions.getBaseInfo_success]: (state, action) => {
		return {
			...action.payload.data
		}
	}
}, {})
//账号详情---账号评价
export const degreeList = handleActions({
	[accoutActions.addGetDegreeList_success]: (state, action) => {
		const { rows } = state
		if (rows) {
			const rowsOld = [...state.rows]
			const rows = [...rowsOld, ...action.payload.data.rows]
			return { ...action.payload.data, rows }
		}
	},
	[accoutActions.getDegreeList_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})
//账号详情---最近应约价
export const recentReservationOrderPriceList = handleActions({
	[accoutActions.AddGetPriceList_success]: (state, action) => {

		return [
			...state, ...action.payload.data
		]
	},
	[accoutActions.getRecentReservationOrderPriceList_success]: (state, action) => {
		return [
			...action.payload.data
		]
	}
}, [])
//下载列表数据
export const downloadList = handleActions({
	[accoutActions.getDownloadList_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})
//获取公司下拉列表
export const companyList = handleActions({
	[publicActions.getCompanyList_success]: (state, action) => {
		return [
			...action.payload.data
		]
	}
}, [])

export const arrSelectExactQuery = handleActions({
	[accoutActions.addSelectExactQuery]: (state, action) => {
		return [...state, ...action.payload]
	},
	[accoutActions.removeSelectExactQuery]: (state, action) => {
		const arrSelectExactQuery = state.filter(one => !action.payload.includes(one))
		return [...arrSelectExactQuery]
	},
	[accoutActions.cleanSelectExactQuery]: (state, action) => {
		return []
	}
}, [])
export const addLookDetailOrIndexList = handleActions({
	[accoutActions.addLookDetailOrIndexList]: (state, action) => {

		const { detali = [], index = [] } = action.payload
		const { detali: detaliOld, index: indexOld } = state

		const data = {
			detali: [...detaliOld, ...detali],
			index: [...indexOld, ...index],
		}
		return data
	},
	[accoutActions.getAccountList_success]: (state, action) => {
		return {
			detali: [],
			index: []
		}
	}
}, {
		detali: [],
		index: []
	})

export default combineReducers({
	arrSelectExactQuery,
	companyList,
	accountList,
	batchSearchList,
	historyData,
	downloadList,
	baseInfoList,
	degreeList,
	addLookDetailOrIndexList,
	recentReservationOrderPriceList,
	...filterOptions,
	...selectCar,
	...quotation,
})
