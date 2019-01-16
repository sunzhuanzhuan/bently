import { createHttpAction } from '../../store/ajaxMiddleware'
import { createAction } from 'redux-actions';
import Interface from "../constants/Interface";
import api from "../../api";

//GR申请单-第一步-获取订单信息
export const getPoItemList = (params) => (dispatch) => {
	return api.get(Interface.getPoItemList, { params }).then((response) => {
		const { data, } = response
		dispatch({
			type: getPoItemList_success,
			payload: {
				data,
				...params,
			}
		})
		return { data, ...params, }
	})
}
export const getPoItemList_success = "getPoItemList_success"

//GR申请单-第一步-获取订单信息统计项
export const {
	getPOItemTotalStatistic,
	getPOItemTotalStatistic_success
} = createHttpAction('getPOItemTotalStatistic', Interface.getPOItemTotalStatistic)


//GR申请单->订单选择->静态添加
export const addSelectedOrderList = createAction('addSelectedOrderList', (value) => {
	return value
})
//GR申请单->订单选择->静态移除
export const removeSelectedOrderList = createAction('removeSelectedOrderList', (value) => {
	return value
})

//勾选订单保存草稿
export const {
	addOrders,
	addOrders_success
} = createHttpAction('addOrders', Interface.addOrders, {
	method: 'post'
})
//勾选订单保存草稿
export const {
	removeOrder,
	removeOrder_success
} = createHttpAction('removeOrder', Interface.removeOrder, {
	method: 'post'
})
