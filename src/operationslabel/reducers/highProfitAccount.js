import { handleActions } from 'redux-actions';
import { getSearchType_success, getAccountList_success, accountImportCheck_success, accountImport_success} from '../action/highProfitAccount';
/**
 * 搜索类型
 */
export const searchType = handleActions({
	[getSearchType_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {});
/**
 * 批量导入账号检查
 */
export const  accountImportCheck = handleActions({
	[accountImportCheck_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {});
/**
 * 批量导入账号
 */
export const  accountImport = handleActions({
	[accountImport_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {});

/**
 * 账号信息
 */
export const accountInfo = handleActions({
	['getAccountList']: (state, action) => {
		return {count: {totalCount:3}, ok: 1, on: [], accountIds: [{accountId: 1, accountName: 'test',snsId:123, platformId: 3,groupType:1,appointmentCount:3,startTime:'2020-08-05',endTime:'2020-08-30'}]};
	}
}, {});

