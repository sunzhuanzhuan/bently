import { handleActions, createAction } from 'redux-actions';
import * as accoutActions from '../actions'

//侧边栏购物车数据
export const selectCartData = handleActions({
	[accoutActions.addToCart_success]: (state, action) => {
		const addNumber = [...action.payload.data].length
		const total = state.total + addNumber
		return { ...state, total }
	},
	[accoutActions.removeFromCart_success]: (state, action) => {
		const deleteData = [...action.payload.data]
		const dataOld = [...state.data]
		const addNumber = deleteData.length
		const total = state.total - addNumber
		const data = dataOld.filter(one => !deleteData.includes(one.account_id))
		return { ...state, total, data }
	},
	[accoutActions.changeTypeCountSelect]: (state, action) => {
		const { group_type } = action.payload
		if (group_type) {

			let tabList = { ...state.tabList }
			tabList[group_type] = tabList[group_type] - 1
			return { ...state, tabList }
		}
		return { ...state }
	},
	[accoutActions.addCarSynchronizeSearch_success]: (state, action) => {
		const dataOld = state.data
		const dataNew = { ...action.payload.data }
		const { count = {} } = dataNew
		let data = [...dataOld]
		if (dataNew.accounts.length > 0) {
			data = [...dataOld, ...dataNew.accounts]
		}
		return {
			tabList: { ...count }, total: count.total, data
		}

	},
	[accoutActions.clearCart_success]: (state, action) => {
		const data = {
			total: 0,
			tabList: {},
			data: []
		}
		return {
			...data,
		}
	},
	[accoutActions.getAccountListFromCart_success]: (state, action) => {
		const data = { ...action.payload.data }
		const { count = {} } = data
		return { data: [...data.accounts], tabList: { ...count }, total: count && count.total || 0, }
	}
}, {
		total: 0,
		tabList: {},
		data: []
	})
//购物车列表数据
export const selectCarList = handleActions({
	// [accoutActions.addToCart_success]: (state, action) => {
	// 	return { ...action.payload }
	// },
	// [accoutActions.removeFromCart_success]: (state, action) => {
	// 	return { ...action.payload }
	// },
	[accoutActions.clearCart_success]: (state, action) => {
		const data = {
			total: 0,
			tabList: {},
			data: []
		}
		return {
			...data
		}
	},
	[accoutActions.getCartSearchAll_success]: (state, action) => {
		const data = { ...action.payload.data }
		const { statistic = {}, result = {} } = data
		return {
			group_type_name: data.group_type_name,
			tabList: { ...statistic },
			total: Object.values(statistic).reduce((pre, next) => pre + next),
			pagination: data.pagination,
			...result
		}
	}
}, {
		total: 0,
		tabList: {},
		data: []
	})



