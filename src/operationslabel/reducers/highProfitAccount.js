import { handleActions } from 'redux-actions';
import {
	getSearchType_success,
	getAccountList_success,
	getAccountImportCheck_success,
	getAccountImport_success,
	getAccountSearch_success,
	getAccountDelete_success
} from '../action/highProfitAccount';
/**
 * 搜索类型
 */
export const searchType = handleActions({
	[getSearchType_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {});
/**
 * 导入账号检查
 */
export const  accountImportCheck = handleActions({
	[getAccountImportCheck_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {});
/**
 * 导入账号
 */
export const  accountImport = handleActions({
	[getAccountImport_success]: (state, action) => {
		return { successList:[] ,failList:['123', '456']}
	}
}, {});
/**
 * 账号信息
 */
export const accountInfo = handleActions({
	['getAccountList']: (state, action) => {
		console.log('1111111111111111111111111111111111')
		return {count: {totalCount:3}, ok: 1, on: [], accountIds: [{accountId: 1, accountName: 'test',snsId:123, platformId: 3,groupType:1,appointmentCount:3,startTime:'2020-08-05',endTime:'2020-08-30'},
				{accountId: 2, accountName: 'test1',snsId:123, platformId: 3,groupType:1,appointmentCount:3,startTime:'2020-08-05',endTime:'2020-08-30'},
				{accountId: 3, accountName: 'test2',snsId:123, platformId: 3,groupType:1,appointmentCount:3,startTime:'2020-08-05',endTime:'2020-08-30'},
				{accountId: 4, accountName: 'test3',snsId:123, platformId: 3,groupType:1,appointmentCount:3,startTime:'2020-08-05',endTime:'2020-08-30'}]};
	}
}, {});

