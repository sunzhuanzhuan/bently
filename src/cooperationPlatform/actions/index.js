import { createHttpAction } from '../../store/ajaxMiddleware'
import { createAction } from 'redux-actions';
import Interface from "../constants/Interface";
import api from "../../api";
export * from './cooperationPlatform'
export * from './agent'

//收费类型下拉框
export const {
	getCaptureTollType,
	getCaptureTollType_success
} = createHttpAction('getCaptureTollType', Interface.getCaptureTollType)

//添加或修改服务类型
export const {
	addOrUpdateTollType,
	addOrUpdateTollType_success
} = createHttpAction('addOrUpdateTollType', Interface.addOrUpdateTollType, {
	method: 'post'
})
//获取收费类型列表
export const {
	getTrinityTollTypeList,
	getTrinityTollTypeList_success
} = createHttpAction('getTrinityTollTypeList', Interface.getTrinityTollTypeList)
//平台抓取报价项名称下拉框接口
export const {
	getCaptureTrinitySkuType,
	getCaptureTrinitySkuType_success
} = createHttpAction('getCaptureTrinitySkuType', Interface.getCaptureTrinitySkuType)
//添加或修改三方报价类型:通过id存在即修改，不存在即添加，编号唯一
export const {
	addOrUpdateTrinitySkuType,
	addOrUpdateTrinitySkuType_success
} = createHttpAction('addOrUpdateTrinitySkuType', Interface.addOrUpdateTrinitySkuType, {
	method: 'post'
})
//',//合作平台-平台关联报价项下拉框接口
export const {
	getSkuTypeList,
	getSkuType_success
} = createHttpAction('getSkuTypeList', Interface.getSkuTypeList)
//合作平台-所属媒体平台下拉框接口
export const {
	getPlatform,
	getPlatform_success
} = createHttpAction('getPlatform', Interface.getPlatform)
//获取报价项列表
export const {
	getTrinitySkuTypeList,
	getTrinitySkuTypeList_success
} = createHttpAction('getTrinitySkuTypeList', Interface.getTrinitySkuTypeList)
//获取平台id&&启用状态&&非默认状态
export const {
	getCooperationPlatform,
	getCooperationPlatform_success
} = createHttpAction('getCooperationPlatform', Interface.getCooperationPlatform)
