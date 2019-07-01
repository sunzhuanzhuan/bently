import { combineReducers } from 'redux'
import { handleActions, combineActions, handleAction } from 'redux-actions';
import * as accoutActions from '../actions'
//报价单列表
export const quotationList = handleActions({
	[accoutActions.getQuotationList_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})
//处理数据
function getQuotationData(list) {
	return list.map(one => {
		const { account_count } = one
		let reserve_number = 0
		let micro_flash_number = 0
		account_count.map(item => {
			if (item.is_famous == 1) {
				reserve_number = item.account_id_count
				one.reserve_number = item.account_id_count
			}
			if (item.is_famous == 2) {
				micro_flash_number = item.account_id_count
				one.micro_flash_number = item.account_id_count
			}
		})
		one.number_sum = reserve_number + micro_flash_number
		return one
	})
}
//报价单详情
export const quotationDetail = handleActions({
	[accoutActions.getQuotationDetail_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})

//报价单模版
export const stencilList = handleActions({
	[accoutActions.getStencilList_success]: (state, action) => {
		return {
			...action.payload.data
		}
	}
}, {})
export const accountIdsByQuotation = handleActions({
	[accoutActions.getAccountIdsByQuotation_success]: (state, action) => {
		return [
			...action.payload.data
		]
	}
}, [])

//报价单详情账号列表
export const quotationAccountList = handleActions({
	[accoutActions.addSelectStatic]: (state, action) => {
		const { is_select } = state
		if (is_select) {
			let is_select = [...state.is_select, ...action.payload]
			return { ...state, is_select }
		}
	},
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
	[accoutActions.deleteFromCart_success]: (state, action) => {
		const { type, data, follower_count, numberType } = action.payload
		const accountsFilter = state.list.filter(one => !data.includes(one.account_id))
		return {
			...state,
			tabList: {
				...state.tabList,
				[type]: state.tabList[type] - 1

			},
			accountList: accountsFilter,
			total: state.total - 1,
			[numberType]: state[numberType] - 1,
			follower_count: state.follower_count - follower_count
		}
	},
	[accoutActions.getQuotationAccountSearch_success]: (state, action) => {
		const { data } = { ...action.payload }
		const { account_count, result, followerCount, parkAccountCount, reservationAccountCount } = data
		return {
			...result,
			is_select: result.list.filter(one => one.isSelected == 1).map(one => one.accountId),
			tabList: data.statistic,
			total: data.statistic.total,
			pagination: data.pagination,
			followerCount: followerCount || 0,
			parkAccountCount: parkAccountCount || 0,
			reservationAccountCount: reservationAccountCount || 0,
		}
	}
}, {
		total: 0,
		tabList: {},
		accountList: [],
		is_select: [],
	})

