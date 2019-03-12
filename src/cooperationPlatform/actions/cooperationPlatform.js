import { createHttpAction } from '../../store/ajaxMiddleware'
import { createAction } from 'redux-actions';
import Interface from "../constants/Interface";
import api from "../../api";

//合作平台-管理列表接口
export const {
	getCooperationPlatformByPage,
	getCooperationPlatformByPage_success
} = createHttpAction('getCooperationPlatformByPage', Interface.getCooperationPlatformByPage)
//合作平台-新增接口
export const {
	insertCooperationPlatform,
	insertCooperationPlatform_success
} = createHttpAction('insertCooperationPlatform', Interface.insertCooperationPlatform, {
	method: 'post'
})
//合作平台-删除接口
export const {
	delPlatform,
	delPlatform_success
} = createHttpAction('delPlatform', Interface.delPlatform, {
	method: 'post'
})
//合作平台-查看详情接口
export const {
	getCooperationPlatformInfoById,
	getCooperationPlatformInfoById_success
} = createHttpAction('getCooperationPlatformInfoById', Interface.getCooperationPlatformInfoById)
//合作平台-修改接口
export const {
	updateCooperationPlatform,
	updateCooperationPlatform_success
} = createHttpAction('updateCooperationPlatform', Interface.updateCooperationPlatform, {
	method: 'post'
})
//合作平台-启用/禁用合作平台
export const {
	updatePlatformStatus,
	updatePlatformStatus_success
} = createHttpAction('updatePlatformStatus', Interface.updatePlatformStatus, {
	method: 'post'
})
//合作平台-设置默认报价项
export const {
	updatePlatformDefault,
	updatePlatformDefault_success
} = createHttpAction('updatePlatformDefault', Interface.updatePlatformDefault, {
	method: 'post'
})

