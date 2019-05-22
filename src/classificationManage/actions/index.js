import Interface from '../constants/Interface'
import { createHttpAction } from '../../store/ajaxMiddleware'

/**
 * 内容分类反馈
 */
	// 判断当前账号是否有内容分类反馈信息
export const {
	isExistClassify
} = createHttpAction('isExistClassify', Interface.isExistClassify)

// 查看分类反馈进度
export const {
	getAuditDialogInfo
} = createHttpAction('getAuditDialogInfo', Interface.getAuditDialogInfo)

// 提交内容分类反馈
export const {
	addClassifyAuditInfo
} = createHttpAction('addClassifyAuditInfo', Interface.addClassifyAuditInfo, {
	method: 'post'
})

// 提交自定义分类
export const {
	addCustomClassify
} = createHttpAction('addCustomClassify', Interface.addCustomClassify, {
	method: 'post'
})

/**
 * 反馈审核
 */
// 查询分类反馈信息列表
export const {
	getClassifyFeedbackList,
	getClassifyFeedbackList_success,
} = createHttpAction('getClassifyFeedbackList', Interface.getClassifyFeedbackList)

// 同意账号分类反馈信息
export const {
	passClassifyAuditInfo,
} = createHttpAction('passClassifyAuditInfo', Interface.passClassifyAuditInfo, {
	method: 'post'
})

// 驳回账号分类反馈信息
export const {
	rejectClassifyAuditInfo,
} = createHttpAction('rejectClassifyAuditInfo', Interface.rejectClassifyAuditInfo, {
	method: 'post'
})


// 查询自定义分类列表
export const {
	getCustomClassifyList,
	getCustomClassifyList_success,
} = createHttpAction('getCustomClassifyList', Interface.getCustomClassifyList)

// 导出自定义分类列表
export const {
	exportCustomClassifyList,
} = createHttpAction('exportCustomClassifyList', Interface.exportCustomClassifyList)

// 白名单处理结果
export const {
	getWhitelistResult,
	getWhitelistResult_success,
} = createHttpAction('getWhitelistResult', Interface.getWhitelistResult)

// 获取excel模板
export const {
	getExcelTemplate,
} = createHttpAction('getExcelTemplate', Interface.getExcelTemplate)

// 添加白名单记录
export const {
	addWhitelistRecord,
} = createHttpAction('addWhitelistRecord', Interface.addWhitelistRecord, {
	method: 'post',
	ignoreToast: true
})
