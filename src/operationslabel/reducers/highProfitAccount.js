import { handleActions } from 'redux-actions';
import { getSearchType_success, getAccountList_success } from '../action/highProfitAccount';

/**
 * 搜索类型
 */
export const searchType = handleActions({
	[getSearchType_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {});

/**
 * 账号信息
 */
export const accountInfo = handleActions({
	['getAccountList']: (state, action) => {
		return {count: 2, list: [{id: 1, accountId: 1, name: 'test', pla: '3'}]};
	}
}, {});

