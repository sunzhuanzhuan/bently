import { combineReducers } from 'redux'
import {
	uploadInfo,
	downloadLink,
	instockPlatformList
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
	newDealResultList,
	instockPlatformList
})
