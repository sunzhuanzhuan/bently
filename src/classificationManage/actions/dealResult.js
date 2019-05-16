import Interface from '../constants/Interface'
import { createHttpAction } from '../../store/ajaxMiddleware'

//getDealResultList
export const {
	getDealResultList,
	getDealResultList_success
} = createHttpAction('getDealResultList', Interface.getDealResultList, {
	method: 'post'
})
//getSelectionList
export const {
	getSelectionList,
	getSelectionList_success
} = createHttpAction('getSelectionList', Interface.getSelectionList, {
	method: 'get'
})
//getNewDealResultList---新java获取列表接口
export const {
	getNewDealResultList,
	getNewDealResultList_success
} = createHttpAction('getNewDealResultList', Interface.getNewDealResultList, {
	method: 'post'
})
//下载处理结果
export const {
	downloadDealResult
} = createHttpAction('downloadDealResult', Interface.downloadDealResult, {
	method: 'get'
})
