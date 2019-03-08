import { combineReducers } from 'redux'
import {
	uploadInfo,
	downloadLink
} from './batchCreateMainAccount'
import {
	dealResultList,
	selectionList,
	newDealResultList
} from './dealResult'

export default combineReducers({
	uploadInfo,
	dealResultList,
	selectionList,
	downloadLink,
	newDealResultList
})
