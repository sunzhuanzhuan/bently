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
	method: 'post'
})
