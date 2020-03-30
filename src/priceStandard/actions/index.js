import { createHttpAction } from '../../store/ajaxMiddleware'
import { createAction } from 'redux-actions';
import Interface from "../constants/Interface";
import api from "../../api";

export const {
	systemAddEquities,
	systemAddEquities_success
} = createHttpAction('systemAddEquities', Interface.systemAddEquities, { method: 'post' })
//系统权益池修改权益类型及权益
export const {
	systemUpdateEquities,
	systemUpdateEquities_success
} = createHttpAction('systemUpdateEquities', Interface.systemUpdateEquities, { method: 'post' })
//删除系统配置的权益类型
export const {
	systemDeleteEquities,
	systemDeleteEquities_success
} = createHttpAction('systemDeleteEquities', Interface.systemDeleteEquities, { method: 'post' })
//获取系统权益池权益类型及权益
export const {
	getSystemEquities,
	getSystemEquities_success
} = createHttpAction('getSystemEquities', Interface.getSystemEquities)

//平台组添加权益类型及权益
export const {
	groupTypeAddEquities,
	groupTypeAddEquities_success
} = createHttpAction('groupTypeAddEquities', Interface.groupTypeAddEquities, { method: 'post' })
//平台组修改权益类型及权益
export const {
	groupTypeUpdateEquities,
	groupTypeUpdateEquities_success
} = createHttpAction('groupTypeUpdateEquities', Interface.groupTypeUpdateEquities, { method: 'post' })
//删除平台组权益类型
export const {
	deleteEquitiesTypeByGroupTypeId,
	deleteEquitiesTypeByGroupTypeId_success
} = createHttpAction('deleteEquitiesTypeByGroupTypeId', Interface.deleteEquitiesTypeByGroupTypeId, { method: 'post' })
//通过groupTypeId获取平台组权益
export const {
	getEquitiesByGroupTypeId,
	getEquitiesByGroupTypeId_success
} = createHttpAction('getEquitiesByGroupTypeId', Interface.getEquitiesByGroupTypeId)
//",//通过groupTypeId获取未配置的平台组权益类型及权益

export const {
	getUnUseEquitiesByGroupTypeId,
	getUnUseEquitiesByGroupTypeId_success
} = createHttpAction('getUnUseEquitiesByGroupTypeId', Interface.getUnUseEquitiesByGroupTypeId)

//修改媒体平台sku与权益的配置
export const {
	platformSkuUpdateEquities,
	platformSkuUpdateEquities_success
} = createHttpAction('platformSkuUpdateEquities', Interface.platformSkuUpdateEquities, { method: 'post' })
//查询系统权益池某项权益类型及权益
export const {
	getSystemEquitiesById,
	getSystemEquitiesById_success
} = createHttpAction('getSystemEquitiesById', Interface.getSystemEquitiesById)
//获取媒体平台下sku权益配置
export const {
	getPlatformSkuTypeEquities,
	getPlatformSkuTypeEquities_success
} = createHttpAction('getPlatformSkuTypeEquities', Interface.getPlatformSkuTypeEquities)
//获取媒体平台下sku权益配置
export const {
	getCanUpdateSkuTypeEquities,
	getCanUpdateSkuTypeEquities_success
} = createHttpAction('getCanUpdateSkuTypeEquities', Interface.getCanUpdateSkuTypeEquities)

