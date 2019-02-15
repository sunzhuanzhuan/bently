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
