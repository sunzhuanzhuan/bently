import { createHttpAction } from '../../store/ajaxMiddleware'
import { createAction } from 'redux-actions';
import Interface from "../constants/Interface";
import api from "../../api";

//代理商列表
export const {
	getAgentByPage,
	getAgentByPage_success
} = createHttpAction('getAgentByPage', Interface.getAgentByPage, {
	method: 'post'
})
//查看代理商
export const {
	getAgentById,
	getAgentById_success
} = createHttpAction('getAgentById', Interface.getAgentById)

//新增代理商
export const {
	insertAgent,
	insertAgent_success
} = createHttpAction('insertAgent', Interface.insertAgent, {
	method: 'post'
})
//删除代理商
export const {
	delAgent,
	delAgent_success
} = createHttpAction('delAgent', Interface.delAgent, {
	method: 'post'
})
//启用/停用代理商
export const {
	updateAgentStatus,
	updateAgentStatus_success
} = createHttpAction('updateAgentStatus', Interface.updateAgentStatus, {
	method: 'post'
})
//修改代理商
export const {
	updateAgent,
	updateAgent_success
} = createHttpAction('updateAgent', Interface.updateAgent, {
	method: 'post'
})
