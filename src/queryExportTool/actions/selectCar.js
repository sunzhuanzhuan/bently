import Interface from '../constants/Interface'
// import { createHttpAction } from 'redux-action-extend'
import createHttpAction from '@/store/createHttpAction'
import { createAction } from 'redux-actions'
//新增购物车账号
export const {
	addToCart,
	addToCart_success
} = createHttpAction('addToCart', Interface.addToCart, {
	method: 'post', isTrack: true,
	trackResult: (search, data) => {
		return {
			account_id: data && data[0]
		}
	}
})
//获取侧边栏购物车信息
export const {
	getAccountListFromCart,
	getAccountListFromCart_success
} = createHttpAction('getAccountListFromCart', Interface.getAccountListFromCart)
//获取购物车列表
export const {
	getCartSearchAll,
	getCartSearchAll_success
} = createHttpAction('getCartSearchAll', Interface.getCartSearchAll)
//清空购物车
export const {
	clearCart,
	clearCart_success
} = createHttpAction('clearCart', Interface.clearCart)
//批量删除购物车
export const {
	removeFromCart,
	removeFromCart_success
} = createHttpAction('removeFromCart', Interface.removeFromCart, {
	method: 'post'
})
//static
export const {
	addCarSynchronizeSearch,
	addCarSynchronizeSearch_success
} = createHttpAction('addCarSynchronizeSearch', Interface.getAccountListFromCart)

export const changeTypeCountSelect = createAction('changeTypeCountSelect', (value) => {
	return value
})
