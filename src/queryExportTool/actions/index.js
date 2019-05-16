import Interface from '../constants/Interface'
// import { createHttpAction } from 'redux-action-extend'
import createHttpAction from '@/store/createHttpAction'
import { createAction } from 'redux-actions'
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
export const {
	getAccountList,
	getAccountList_success
} = createHttpAction('getAccountList', Interface.getAccountList, {
	isTrack: true,
	trackResult: (search, { accounts, statistic = {}, pagination = {} }) => {
		return {
			total: pagination.total || 0,
			statistic,
			search,
			accounts: accounts.map(item => item.account_id + ''),
			weibo_type: isNaN(parseInt(search.group_id)) ? '' : search.group_id
		}
	}
})
//批量查号列表
export const {
	getBatchSearch,
	getBatchSearch_success
} = createHttpAction('getBatchSearch', Interface.getBatchSearch, {
	isTrack: true, method: 'post',
	trackResult: (search, { pagination }) => {
		return {
			...search,
			total: pagination.total
		}
	}
})
//清空查询数据
export const cleanBatchSearch = createAction('cleanBatchSearch', () => {
	return {};
})
//批量查号下载
export const {
	batchAccountExport,
	batchAccountExport_success
} = createHttpAction('batchAccountExport', Interface.batchAccountExport, {
	method: 'post', isTrack: true,
	trackResult: (search, { task_id }) => {
		return {
			...search,
			accounts: search.accounts.map(item => item.account_id + ''),
			task_id
		}
	}
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
export const addLookDetailList = createAction('addLookDetailList', (value) => {
	return value
})

let collectHistoryData = createAction('collectHistoryData', history => history);
export { collectHistoryData };

