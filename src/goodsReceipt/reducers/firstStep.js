import { handleActions, createAction } from 'redux-actions';
import * as accoutActions from '../actions'
import * as goodsReceiptAction from '../actions'
//GR申请单-第一步-获取订单信息
export const poItemList = handleActions({
	[goodsReceiptAction.getPoItemList_success]: (state, action) => {

		const typeMap = {
			"1": "poItemReserveList",
			"2": "poItemCampaignList",
			"3": "poItemExpandBusinessList"
		}
		const { item_list_type, data } = action.payload
		const updateData = typeMap[item_list_type]
		return {
			...state,
			[updateData]: data
		}
	}
}, {
		poItemReserveList: {},
		poItemCampaignList: {},
		poItemExpandBusinessList: {},
	})
const typeMap = {
	"1": "reserveList",
	"2": "campaignList",
	"3": "expandBusinessList",
}

export const POItemTotalStatistic = handleActions({
	[goodsReceiptAction.getPOItemTotalStatistic_success]: (state, action) => {
		return { ...action.payload.data.items }
	}
}, {})
//GR申请单->订单选择->订单列表-选中数据
export const orderSelectedList = handleActions({
	[goodsReceiptAction.getPoItemList_success]: (state, action) => {
		const { item_list_type } = action.payload
		return {
			...state,
			[typeMap[item_list_type]]: action.payload.data.selected_ids
		}
	},
	[goodsReceiptAction.addSelectedOrderList]: (state, action) => {
		const { id, type } = action.payload
		const updateData = typeMap[type]

		return {
			...state,
			[updateData]: [...state[updateData], ...id]
		}
	},
	[goodsReceiptAction.removeSelectedOrderList]: (state, action) => {
		const { id, type } = action.payload
		const updateData = typeMap[type]
		return {
			...state,
			[updateData]: [...state[updateData]].filter(one => !id.includes(one))
		}
	},
}, {
		reserveList: [],
		campaignList: [],
		expandBusinessList: []
	})
const getListArr = (items, key) => {
	const arr = []
	for (var i = 0; i < items.length; i++) {
		if (items[i].is_selected == 1) {
			arr.push(items[i][key])
		}
	}
	return arr
}

