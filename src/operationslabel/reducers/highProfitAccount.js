import { handleActions } from 'redux-actions';
import {
	getAccountImportCheck_success,
	getAccountImport_success,
	getAccountSearch_success,
	getBatchAccountSearch_success
} from '../action/highProfitAccount';

/**
 * 搜索类型
 */

/**
 * 导入账号检查
 */
export const highAccountImportCheck = handleActions({
	[getAccountImportCheck_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {});
/**
 * 导入账号
 */
export const highAccountImport = handleActions({
	[getAccountImport_success]: (state, action) => {
		return { successList:[] ,failList:['123', '456']}
	}
}, {});
/**
 * 账号信息
 */
export const accountInfo = handleActions({
	['getAccountList']: (state, action) => {
		return {count: {totalCount:3},list: [{accountId: '1', accountName: 'test',snsId:123, platformId: 3,groupType:1,appointmentCount:3,startTime:'2020-08-05',endTime:'2020-08-30'},
				{accountId: '2', accountName: 'test1',snsId:'123', platformId: 3,groupType:1,appointmentCount:3,startTime:'2020-08-05',endTime:'2020-08-30'},
				{accountId: '3', accountName: 'test1',snsId:'123', platformId: 3,groupType:1,appointmentCount:3,startTime:'2020-08-05',endTime:'2020-08-30'}
			]};
		// return { ...action.payload.data }
	},
	['getBatchAccountList']:(state, action) => {
		return {count: {totalCount:110}, ok: 30, on: ['123','6666'], list: [{accountId: '12', accountName: 'test',snsId:123, platformId: 3,groupType:1,appointmentCount:3,startTime:'2020-08-05',endTime:'2020-08-30'},
				{accountId: '22', accountName: 'test1',snsId:'123', platformId: 3,groupType:1,appointmentCount:3,startTime:'2020-08-05',endTime:'2020-08-30'},
				{accountId: '33', accountName: 'test1',snsId:'123', platformId: 3,groupType:1,appointmentCount:3,startTime:'2020-08-05',endTime:'2020-08-30'}
			]};

	},
}, {});

