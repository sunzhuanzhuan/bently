import Interface from '../constants/Interface'
import { createHttpAction } from '../../store/ajaxMiddleware'

//获取列表
export const {
	getExportDotDataList,
	getExportDotDataList_success
} = createHttpAction('getExportDotDataList', Interface.getExportDotDataList, {
	method: 'get'
});

//获取下载地址
export const {
	downloadDotData
} = createHttpAction('downloadDotData', Interface.downloadDotData, {
	method: 'get'
});
