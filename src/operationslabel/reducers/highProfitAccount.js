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
		return { ...action.payload.data }
	}
}, {});
/**
 * 账号信息
 */
export const accountInfo = handleActions({
	[getAccountSearch_success]: (state, action) => {
		return { ...action.payload.data }
	},
	[getBatchAccountSearch_success]:(state, action) => {
		return { ...action.payload.data }
	}
}, {});



