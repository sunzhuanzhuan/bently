import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'
import { createAction } from 'redux-actions'

// 获取账号基本信息
export const {
	getAccountInfo,
	getAccountInfo_success
} = createHttpAction('getAccountInfo', Interface.getAccountInfo, {
	method: 'get',
	isHttp: true,
	ignoreToast: true,
	ignoreLoading: true
});
// 入库页获取账号信息
export const {
	getPrimaryAccountInfo,
	getPrimaryAccountInfo_success
} = createHttpAction('getPrimaryAccountInfo', Interface.getPrimaryAccountInfo, {
	method: 'get',
	isHttp: true,
	ignoreToast: true,
	ignoreLoading: true
});
// 获取上传图片token
export const {
	getUploadToken,
	getUploadToken_success
} = createHttpAction('getUploadToken', Interface.getUploadToken, {
	method: 'get',
	isHttp: true,
	ignoreToast: true,
	ignoreLoading: true
});

// 获取平台图片,名称
export const {
	getPlatformInfo,
	getPlatformInfo_success
} = createHttpAction('getPlatformInfo', Interface.getPlatformInfo, {
	method: 'get',
	isHttp: true,
	ignoreToast: true,
	ignoreLoading: true
});

// 编辑账号时，获取报价信息
export const {
	getSkuList,
	getSkuList_success
} = createHttpAction('getSkuList', Interface.getSkuList, {
	method: 'get',
	isHttp: true,
	ignoreToast: true,
	ignoreLoading: true
});

// 获取报价项信息
export const {
	getSkuTypeList,
	getSkuTypeList_success
} = createHttpAction('getSkuTypeList', Interface.getSkuTypeList, {
	method: 'get',
	isHttp: true,
	ignoreToast: true,
	ignoreLoading: true
});

// 抓取账号信息
export const {
	fetchAccountBaseInfo,
	fetchAccountBaseInfo_request,
	fetchAccountBaseInfo_success
} = createHttpAction('fetchAccountBaseInfo', Interface.fetchAccountBaseInfo, {
	method: 'get',
	isHttp: true,
	ignoreToast: true,
	ignoreLoading: true
});

// 更新页面抓取账号信息
export const {
	fetchAccountBaseInfoByUpdate,
	fetchAccountBaseInfoByUpdate_request
} = createHttpAction('fetchAccountBaseInfoByUpdate', Interface.fetchAccountBaseInfo, {
	method: 'get',
	isHttp: true,
	ignoreToast: true,
	ignoreLoading: true
});
// 修改数据
export const updateFetchInfo = createAction('updateFetchInfo', (data) => {
	return { data };
})

// 使得添加页面提交可用
export const setAddSubmit = createAction('setAddSubmit', (data) => {
	return data;
})

// 入库页面提交
export const {
	saveAccountInfo
} = createHttpAction('saveAccountInfo', Interface.saveAccountInfo, {
	method: 'post',
	isHttp: true,
	ignoreToast: true,
	ignoreLoading: true
});
// 维护页面提交
export const {
	updateAccountInfo,
	updateAccountInfo_success
} = createHttpAction('updateAccountInfo', Interface.updateAccountInfo, {
	method: 'post',
	isHttp: true,
	ignoreToast: true,
	ignoreLoading: true
});

// 维护页面报价信息提交
export const {
	saveSku,
	saveSku_success
} = createHttpAction('saveSku', Interface.saveSku, {
	method: 'post',
	isHttp: true,
	ignoreToast: true,
	ignoreLoading: true
});
//获取地域信息
export const {
	getRegionCode,
	getRegionCode_success
} = createHttpAction('getRegionCode', Interface.getRegionCode, {
	method: 'get',
	isHttp: true,
	ignoreToast: true,
	ignoreLoading: true
})
//获取行业信息
export const {
	getIndustryListForAccount,
	getIndustryListForAccount_success
} = createHttpAction('getIndustryListForAccount', Interface.getIndustryList, {
	method: 'get',
	isHttp: true,
	ignoreToast: true,
	ignoreLoading: true
})
//敏感词判别
export const {
	sensitiveWordsFilter,
	sensitiveWordsFilter_success
} = createHttpAction('sensitiveWordsFilter', Interface.sensitiveWordsFilter, {
	method: 'post',
	isHttp: true,
	ignoreLoading: true,
	ignoreToast: true
})
