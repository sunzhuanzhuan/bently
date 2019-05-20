import Interface from '../constants/Interface'
import { createHttpAction } from '../../store/ajaxMiddleware'

/**
 * 内容分类反馈
 */
	// 判断当前账号是否有内容分类反馈信息
export const {
		isExistClassify
	} = createHttpAction('isExistClassify', Interface.isExistClassify)
// 分类列表
export const {
	getAllClassifyInfos
} = createHttpAction('getAllClassifyInfos', Interface.getAllClassifyInfos)

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
