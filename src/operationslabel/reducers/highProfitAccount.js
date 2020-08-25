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
		return {count: {totalAccount:3}, list: [{accountId: 1, accountName: 'test',snsId:123, platformId: '3',groupType:1,appointmentCount:3,startTime:'2020-08-05',endTime:'2020-08-30'}]};
	}
}, {});

