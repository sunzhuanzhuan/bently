import Interface from '../constants/Interface'
import api from "../../api";
import createHttpAction from '@/store/createHttpAction'
//报价单列表
export const {
	getQuotationList,
	getQuotationList_success
} = createHttpAction('getQuotationList', Interface.getQuotationList)

//添加报价单
export const {
	saveQuotation,
	saveQuotation_success
} = createHttpAction('saveQuotation', Interface.saveQuotation, {
	method: 'post'
})

//报价单模版
export const {
	getStencilList,
	getStencilList_success
} = createHttpAction('getStencilList', Interface.getStencilList)

//获取报价单详情
export const {
	getQuotationDetail,
	getQuotationDetail_success
} = createHttpAction('getQuotationDetail', Interface.getQuotationDetail)
//报价单详情账号列表
export const {
	getQuotationAccountSearch,
	getQuotationAccountSearch_success
} = createHttpAction('getQuotationAccountSearch', Interface.getQuotationAccountSearch, {
	method: 'post'
})
//报价单详情删除
export const deleteFromCart = (params) => (dispatch) => {
	return api.post(Interface.deleteFromCart, params).then((response) => {
		const { data, } = response
		dispatch({
			type: deleteFromCart_success,
			payload: {
				data,
				...params,
			}
		})
		return { data }
	})
}
export const deleteFromCart_success = "deleteFromCart_success"



//报价单导出全部账号
export const {
	quotationExport,
	quotationExport_success
} = createHttpAction('quotationExport', Interface.quotationExport, {
	isTrack: true, trackResult: ({ quotation_id }, { task_id }) => ({
		quotation_id, task_id
	})
})
//报价单导出验证
export const {
	preExportNumCheck,
	preExportNumCheck_success
} = createHttpAction('preExportNumCheck', Interface.preExportNumCheck)
//将账号添加进报价单
export const {
	addToQuotation,
	addToQuotation_success
} = createHttpAction('addToQuotation', Interface.addToQuotation, {
	method: 'post'
})
//验证码是否正确
export const {
	codeCheck,
	codeCheck_success
} = createHttpAction('codeCheck', Interface.codeCheck)
//Applications
export const {
	getAccountIdsByQuotation,
	getAccountIdsByQuotation_success
} = createHttpAction('getAccountIdsByQuotation', Interface.getAccountIdsByQuotation)
