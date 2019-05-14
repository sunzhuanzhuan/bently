
import { handleActions, createAction } from 'redux-actions';
import * as accoutActions from '../actions'
import * as goodsReceiptAction from '../actions'

//获取统计信息
export const GRItemListStatistic = handleActions({
	[goodsReceiptAction.removeSelectedOrderList]: (state, action) => {
		const { changeCount } = action.payload
		return {
			...state,
			countNumber: state.countNumber - changeCount
		}
	},
	[goodsReceiptAction.addSelectedOrderList]: (state, action) => {
		const { changeCount } = action.payload
		return {
			...state,
			countNumber: state.countNumber + changeCount
		}
	},
	[goodsReceiptAction.getGRItemListStatistic_success]: (state, action) => {
		const { reservation_items_total = 0,
			campaign_items_total = 0,
			extended_business_items_total = 0 } = action.payload.data.count
		const countNumber = reservation_items_total + campaign_items_total + extended_business_items_total
		return { ...action.payload.data, countNumber: countNumber }
	}
}, {})
const typeMap = {
	"1": "reservation_items",
	"2": "campaign_items",
	"3": "extended_business_items"
}
//GR申请单-第二步-获取GR关联的订单列表-预约
export const GRItemList = handleActions({
	[goodsReceiptAction.updateGRItemInfo_success]: (state, action) => {
		const { item_id, key, item_type, value, data } = action.payload
		const updateData = typeMap[item_type]
		return {
			...state,
			[updateData]: getUpdateList(state[updateData], item_id, key, value, data)
		}
	},
	[goodsReceiptAction.getGRItemList_success]: (state, action) => {
		const { item_type, data } = action.payload
		const updateData = typeMap[item_type]
		return {
			...state,
			[updateData]: data.items[updateData]
		}
	}
}, {
		reservation_items: [],
		campaign_items: [],
		extended_business_items: []
	})
const getUpdateList = (list, item_id, key, value, data) => {
	const dataModify = list.map(one => {
		if (one.item_id == item_id) {
			one[key] = value
			if (key == "purchase_price") {
				one.purchase_price_with_service_fee = data.purchase_price_with_service_fee
				one.purchase_price_with_service_fee_and_tax = data.purchase_price_with_service_fee_and_tax
			}
			return one
		} else {
			return one
		}
	})
	return [...dataModify]
}

//GR申请单->错误数据
export const errorList = handleActions({
	[goodsReceiptAction.editErrorList]: (state, action) => {
		console.log({ ...state, ...action.payload });
		return { ...state, ...action.payload }
	}
}, {})
