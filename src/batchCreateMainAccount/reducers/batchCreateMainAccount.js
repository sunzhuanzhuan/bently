import { handleActions } from 'redux-actions';
import {
	getUploadInfo_success,
	getDownloadLink_success,
	getNewDownloadLink_success
} from '../actions/batchOptions'
import {
	RESETDOWNLOADLINK
} from "../constants/ActionTypes";

//获取upload-info
export const uploadInfo = handleActions({
	[getUploadInfo_success]: (state, action) => ({
		...state,
		...action.payload.data
	})
}, {})
//批量创建主账号获取下载地址
export const downloadLink = handleActions({
	[getDownloadLink_success]: (state, action) => action.payload.data.list,
	[getNewDownloadLink_success]: (state, action) => action.payload.data.templateUrl,
	[RESETDOWNLOADLINK]: () => ""
}, "")
