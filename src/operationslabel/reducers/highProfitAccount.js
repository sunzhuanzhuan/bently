import { handleActions } from 'redux-actions';
import { getAccountList_success } from '../action/highProfitAccount';

/**
 * 账号信息
 */
export const accountInfo = handleActions({
	['getAccountList']: (state, action) => {
		return {count: {totalCount:3}, ok: 1, on: [], accountIds: [{accountId: 1, accountName: 'test',snsId:123, platformId: 3,groupType:1,appointmentCount:3,startTime:'2020-08-05',endTime:'2020-08-30'}]};
	}
}, {});

