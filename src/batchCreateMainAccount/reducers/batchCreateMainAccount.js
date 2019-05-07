import { handleActions } from 'redux-actions';
import {
	getUploadInfo_success,
	getDownloadLink_success,
	getNewDownloadLink_success,
	getBatchInstockPlatformList_success
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

// 批量入库获取平台列表
export const instockPlatformList = handleActions({
	[getBatchInstockPlatformList_success]: (state, action) => {
		let array = [...action.payload.data]
		const size = 6
		//获取数组的长度，如果你传入的不是数组，那么获取到的就是undefined
		const length = array.length
		//判断不是数组，或者size没有设置，size小于1，就返回空数组
		if (!length || !size || size < 1) {
			return []
		}
		//核心部分
		let index = 0 //用来表示切割元素的范围start
		let resIndex = 0 //用来递增表示输出数组的下标

		//根据length和size算出输出数组的长度，并且创建它。
		let result = new Array(Math.ceil(length / size))
		//进行循环
		while (index < length) {
			//循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
			result[resIndex++] = array.slice(index, (index += size))
		}
		//输出新数组
		return result
	}
}, [])
