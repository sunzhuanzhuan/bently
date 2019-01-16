import { createHttpAction } from '../../store/ajaxMiddleware'
import { createAction } from 'redux-actions';
import Interface from "../constants/Interface";
import api from "../../api";
export * from './firstStep'
export * from './secondStep'
//清除一个微信绑定多个账号的用户列表
// export const clearLoginUserList = createAction('clearLoginUserList', () => {
// 	return {};
// })
//获取token
export const {
	getGRUploadToken,
	getGRUploadToken_success
} = createHttpAction('getGRUploadToken', Interface.getUploadToken)
//附件上传
export const {
	addGRAttachment,
	addGRAttachment_success
} = createHttpAction('addGRAttachment', Interface.addGRAttachment, {
	method: 'post'
})
export const {
	uploadFileGR,
	uploadFileGR_success
} = createHttpAction('uploadFileGR', Interface.uploadFileGR, {
	method: 'post'
})
//
//获取GR申请单
export const {
	getGRList,
	getGRList_success
} = createHttpAction('getGRList', Interface.getGRList)
//申请单操作
//审核
export const {
	audit,
	audit_success
} = createHttpAction('audit', Interface.audit, {
	method: 'post'
})
//复制
export const {
	copyGR,
	copyGR_success
} = createHttpAction('copyGR', Interface.copyGR, {
	method: 'post'
})
//作废
export const {
	cancelApplyGR,
	cancelApplyGR_success
} = createHttpAction('cancelApplyGR', Interface.cancelApply, {
	method: 'post'
})

//筛选项-获取项目列表
export const {
	getGRProjectList,
	getGRProjectList_success
} = createHttpAction('getGRProjectList', Interface.getProjectList)
//筛选项-品牌列表
export const {
	getGRBrandList,
	getGRBrandList_success
} = createHttpAction('getGRBrandList', Interface.getBrandList)
//筛选项 - 获取创建人列表
export const {
	getGRCreatorList,
	getGRCreatorList_success
} = createHttpAction('getGRCreatorList', Interface.getCreatorList)
//筛选项 - 公司列表
export const {
	getGRCompanyList,
	getGRCompanyList_success
} = createHttpAction('getGRCompanyList', Interface.getCompanyList)
// GR详情基础信息
export const {
	getBaseDetail,
	getBaseDetail_success
} = createHttpAction('getBaseDetail', Interface.getBaseDetail)
//创建草稿
export const {
	createGR,
	createGR_success
} = createHttpAction('createGR', Interface.createGR, {
	method: 'post'
})
//GR申请单-第二步，第三步修改
export const updateBaseInfo = (params) => (dispatch) => {
	return api.post(Interface.updateBaseInfo, { ...params }).then((response) => {
		const { data, } = response
		dispatch({
			type: updateBaseInfo_success,
			payload: {
				data,
				...params,
			}
		})
		return { data, ...params, }
	})
}
export const updateBaseInfo_success = "updateBaseInfo_success"

export const {
	GRSubmit,
	GRSubmit_success
} = createHttpAction('GRSubmit', Interface.GRSubmit, {
	method: 'post'
})
