import Interface from "../constans/Interface";
import { createHttpAction } from '../../store/ajaxMiddleware'
import { createAction } from 'redux-actions';
// 获取公司简称 ROGetCompanyName:
export const {
	ROGetCompanyName
} = createHttpAction('ROGetCompanyName', Interface.ROGetCompanyName)
// 获取品牌 ROGetBrand:
export const {
	ROGetBrand
} = createHttpAction('ROGetBrand', Interface.ROGetBrand)
// 销售经理 ROGetSalesManager:
export const {
	ROGetSalesManager
} = createHttpAction('ROGetSalesManager', Interface.ROGetSalesManager)
// 获取项目 ROGetProject:
export const {
	ROGetProject
} = createHttpAction('ROGetProject', Interface.ROGetProject)
// 获取订单列表 ROGetOrderList:
export const {
	ROGetOrderList,
	ROGetOrderList_success,
} = createHttpAction('ROGetOrderList', Interface.ROGetOrderList)
// 审核执行链接
export const {
	ROCheckExecutionLink,
} = createHttpAction('ROCheckExecutionLink', Interface.ROCheckExecutionLink, {
	method: 'post'
})
// 审核执行数据
export const {
	ROCheckExecutionData,
} = createHttpAction('ROCheckExecutionData', Interface.ROCheckExecutionData, {
	method: 'post'
})
// 获取修改执行数据信息
export const {
	ROGetExecutionBackFillDataScreenShot,
} = createHttpAction('ROGetExecutionBackFillDataScreenShot', Interface.ROGetExecutionBackFillDataScreenShot)
// 获取单个执行数据信息
export const {
	ROGetExecutionDataInfo,
} = createHttpAction('ROGetExecutionDataInfo', Interface.ROGetExecutionDataInfo)

export const cleanBoInfo = createAction('cleanBoInfo', () => {
	return {};
})



