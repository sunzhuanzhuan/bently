
import { createHttpAction } from '../../store/ajaxMiddleware'
import { createAction } from 'redux-actions';
import Interface from "../constants/Interface";
import api from "../../api";

//GR申请单-获取GR关联的订单列表
export const getGRItemList = (params) => (dispatch) => {
	return api.get(Interface.getGRItemList, { params }).then((response) => {
		const { data, } = response
		dispatch({
			type: getGRItemList_success,
			payload: {
				data,
				...params,
			}
		})
		return { data, ...params, }
	})
}
export const getGRItemList_success = "getGRItemList_success"
//获取统计信息的接口
export const {
	getGRItemListStatistic,
	getGRItemListStatistic_success
} = createHttpAction('getGRItemListStatistic', Interface.getGRItemListStatistic)
//GR申请单-第二步采购价修改
export const updateGRItemInfo = (params) => (dispatch) => {
	const dataParam = { ...params }
	delete dataParam.key
	delete dataParam.value
	return api.post(Interface.updateGRItemInfo, dataParam).then((response) => {
		const { data, code, message } = response
		dispatch({
			type: updateGRItemInfo_success,
			payload: {
				data,
				...params,
			}
		})
		return { data, code, ...params, msg: message }
	})
}
//一键下载
export const {
	exportOrderExcel,
	exportOrderExcel_success
} = createHttpAction('exportOrderExcel', Interface.exportOrderExcel)

export const updateGRItemInfo_success = "updateGRItemInfo_success"

//GR申请单->第二步->静态添加错误信息
export const editErrorList = createAction('editErrorList', (value) => {
	return value
})

//GR申请单->第二步->清空错误信息
export const clearErrorList = createAction('clearErrorList', (value) => {
	return value
})
