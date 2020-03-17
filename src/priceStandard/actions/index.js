/*
 * @Descripttion: 
 * @Author: wangxinyue
 * @Date: 2020-03-17 10:25:38
 */
import { createHttpAction } from '../../store/ajaxMiddleware'
import { createAction } from 'redux-actions';
import Interface from "../constants/Interface";
import api from "../../api";
export * from './skuType'
//清除一个微信绑定多个账号的用户列表
// export const clearLoginUserList = createAction('clearLoginUserList', () => {
// 	return {};
// })
//获取token
// export const {
// 	getGRUploadToken,
// 	getGRUploadToken_success
// } = createHttpAction('getGRUploadToken', Interface.getUploadToken)
