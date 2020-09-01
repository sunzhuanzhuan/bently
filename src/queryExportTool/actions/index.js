import Interface from '../constants/Interface'
// import { createHttpAction } from 'redux-action-extend'
import createHttpAction from '@/store/createHttpAction'
import { createAction } from 'redux-actions'
import api from "../../api";

export * from './filter'
export * from './selectCar'
export * from './quotation'
export * from './download'
//获取公司下拉列表
/*export const {
	getCompanyList,
	getCompanyList_success
} = createHttpAction('getCompanyList', Interface.getCompanyList)*/
//获取账号列表信息
export const getAccountList = (params) => (dispatch) => {
	const interfaceKey = {
		1: Interface.weixinSearch,//微信
		2: Interface.xinaSearch,//微博
		3: Interface.videoSearch,//视频
		4: Interface.smallRedBookSearch,//小红书
		5: Interface.otherPlatformSearch, //其他平台
        7: Interface.videoSearch, // 哔哩哔哩动画
        8: Interface.videoSearch // 抖音
	}

	return api.post(interfaceKey[params.groupType], params).then((response) => {
		const { data, } = response
		dispatch({
			type: getAccountList_success,
			payload: {
				data,
				...params,
			}
		})
		return { data }
	})
}
export const getAccountList_success = "getAccountList_success"

//批量查号列表
export const {
	getBatchSearch,
	getBatchSearch_success
} = createHttpAction('getBatchSearch', Interface.getBatchSearch, { method: 'post' })
//清空查询数据
export const cleanBatchSearch = createAction('cleanBatchSearch', () => {
	return {};
})
//批量查号下载
export const {
	batchAccountExport,
	batchAccountExport_success
} = createHttpAction('batchAccountExport', Interface.batchAccountExport, {
	method: 'post'
})

//账号详情
//账号详情---基本信息
export const {
	getBaseInfo,
	getBaseInfo_success
} = createHttpAction('getBaseInfo', Interface.getBaseInfo, { isTrack: true })
//账号详情---账号评价
export const {
	getDegreeList,
	getDegreeList_success
} = createHttpAction('getDegreeList', Interface.getDegreeList)
//账号详情--账号评价滚动条
export const {
	addGetDegreeList,
	addGetDegreeList_success
} = createHttpAction('addGetDegreeList', Interface.getDegreeList)

//账号详情---最近应约价
export const {
	getRecentReservationOrderPriceList,
	getRecentReservationOrderPriceList_success
} = createHttpAction('getRecentReservationOrderPriceList', Interface.getRecentReservationOrderPriceList)
//账号详情---获取最近应约价格数量
export const{
  getRecentReservationOrderPriceNum
} = createHttpAction('getRecentReservationOrderPriceNum',Interface.getRecentReservationOrderPriceNum)
//账号详情---最近应约价--滚动条
export const {
	AddGetPriceList,
	AddGetPriceList_success
} = createHttpAction('AddGetPriceList', Interface.getRecentReservationOrderPriceList)

//获取公共分类
export const {
	getCommonClassify,
	getCommonClassify_success
} = createHttpAction('getCommonClassify', Interface.getCommonClassify, {
	method: 'get',
	isHttp: true,
	ignoreLoading: true,
	ignoreToast: true,
})
//静态添加选中结果
export const addSelectStatic = createAction('addSelectStatic', (value) => {
	return value
})
//静态取消选中结果
export const removeSelectStatic = createAction('removeSelectStatic', (value) => {
	return value
})

//静态取消选中结果
export const removeListSelectStatic = createAction('removeListSelectStatic', (value) => {
  return value
})

//保存精确查询的值
export const addSelectExactQuery = createAction('addSelectExactQuery', (value) => {
	return value
})

export const removeSelectExactQuery = createAction('removeSelectExactQuery', (value) => {
	return value
})
export const cleanSelectExactQuery = createAction('cleanSelectExactQuery', (value) => {
	return value
})
//编辑点击查看详情统计
export const addLookDetailOrIndexList = createAction('addLookDetailOrIndexList', (value) => {
	return value
})

let collectHistoryData = createAction('collectHistoryData', history => history);
export { collectHistoryData };

