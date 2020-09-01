// 高利润账号
import {createHttpAction} from 'redux-action-extend'
import {
	highProfitAccountImport,
	highProfitAccountImportCheck,
	highProfitAccountSearch,
	highProfitAccountBatchSearch,
	highProfitAccountDelete
} from "@/operationslabel/constants/API";

//批量导入高利润账号检查
export const {
	getAccountImportCheck,
	getAccountImportCheck_success
} = createHttpAction('getAccountImportCheck', highProfitAccountImportCheck, {
	method: 'post'
});
//批量导入高利润账号
export const {
	getAccountImport,
	getAccountImport_success
} = createHttpAction('getAccountImport', highProfitAccountImport, {
	method: 'post'
});
//查找高利润账号
export const {
	getAccountSearch,
	getAccountSearch_success
} = createHttpAction('getAccountSearch', highProfitAccountSearch, {
	method: 'post'
});
//批量查找高利润账号
export const {
	getBatchAccountSearch,
	getBatchAccountSearch_success
} = createHttpAction('getBatchAccountSearch', highProfitAccountBatchSearch, {
	method: 'post'
});

//删除高利润账号(批量)
export const {
	getAccountDelete
} = createHttpAction('getAccountDelete', highProfitAccountDelete, {
	method: 'post'
});

