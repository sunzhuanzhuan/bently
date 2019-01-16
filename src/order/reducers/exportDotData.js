import { handleActions } from 'redux-actions';
import {
	getExportDotDataList_success
} from '../actions/exportDotData'

//获取list
export const exportDotDataList = handleActions({
	[getExportDotDataList_success]: (state, action) => ({
		...state,
		...action.payload
	})
}, {})
