import { combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions';

import { ROGetOrderList_success } from '../actions'
// 处理列表数据为map表
function handleListToMap(primary_key) {
	return (state, action) => {
		let { total = 0, page = 1, pageSize = 20, rows: resultAry = [] } = action.payload.data,
			map = {},
			list = resultAry.map(item => {
				item.key = item[primary_key]
				map[item[primary_key]] = item
				return item[primary_key]
			})
		return {
			total, page, pageSize, list, map: { ...state.map, ...map }
		}
	}
}
// 初始化列表数据
function initList() {
	return { list: [], map: {}, total: 0, page: 1, pageSize: 20 }
}

// 订单列表
export const orderList = handleAction(ROGetOrderList_success, handleListToMap('order_id'), initList())
export default combineReducers({
	orderList
})
/*export const headerList = handleActions({
	[ROGetOrderList_success]: (state, action) => {
		return {
			...action.payload.data
		}
	}
}, {})*/
