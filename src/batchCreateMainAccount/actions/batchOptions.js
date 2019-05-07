import Interface from '../constants/Interface'
import { createHttpAction } from '../../store/ajaxMiddleware'
import {
	RESETDOWNLOADLINK
} from "../constants/ActionTypes";

//获取upload-info
export const {
	getUploadInfo,
	getUploadInfo_success
} = createHttpAction('getUploadInfo', Interface.getUploadInfo, {
	method: 'get'
});
//上传成功
export const {
	operateBatch
} = createHttpAction('operateBatch', Interface.operateBatch, {
	method: 'post'
});
//批量创建主账号获取下载地址
export const {
	getDownloadLink,
	getDownloadLink_success
} = createHttpAction('getDownloadLink', Interface.getDownloadLink, {
	method: 'post'
});
//批量获取下载地址---新
export const {
	getNewDownloadLink,
	getNewDownloadLink_success
} = createHttpAction('getNewDownloadLink', Interface.getNewDownloadLink, {
	method: 'get'
});
//resetdownloadLink
export const resetdownloadLink = () => {
	return {
		type: RESETDOWNLOADLINK,
		data: {}
	}
}
//点赞
export const {
	postAdviceAndLike
} = createHttpAction('postAdviceAndLike', Interface.postAdviceAndLike, {
	method: 'post'
});
//解析
export const {
	saveBatchOperate
} = createHttpAction('saveBatchOperate', Interface.saveBatchOperate, {
	method: 'post'
});

//获取批量入库平台列表
export const {
	getBatchInstockPlatformList,
	getBatchInstockPlatformList_success
} = createHttpAction('getBatchInstockPlatformList', Interface.getBatchInstockPlatformList, {
	method: 'get'
});
