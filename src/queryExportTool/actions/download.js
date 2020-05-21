import Interface from '../constants/Interface'
// import { createHttpAction } from 'redux-action-extend'
import createHttpAction from '@/store/createHttpAction'
//下载中心列表
export const {
	getDownloadList,
	getDownloadList_success
} = createHttpAction('getDownloadList', Interface.getDownloadList)

//下载链接
export const {
	download,
	download_success
} = createHttpAction('download', Interface.download, {
	isTrack: true, trackResult: (search, data) => ({ task_id: data.task_id })
})
//重新下载链接
export const {
	reDownload,
	reDownload_success
} = createHttpAction('reDownload', Interface.reDownload, {
	isTrack: true,
	method: 'post'
})

