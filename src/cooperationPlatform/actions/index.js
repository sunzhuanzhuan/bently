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
	getSkuType,
	getSkuType_success
} = createHttpAction('getSkuType', Interface.getSkuType)
//合作平台-所属媒体平台下拉框接口
export const {
	getPlatform,
	getPlatform_success
} = createHttpAction('getPlatform', Interface.getPlatform, {
	method: 'post'
})
