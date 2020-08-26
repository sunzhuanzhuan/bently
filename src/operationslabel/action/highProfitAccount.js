// 高利润账号
import { createHttpAction } from 'redux-action-extend'
import { tagDetailSearchType, importTagCheck, importTagInsert } from "@/operationslabel/constants/API";
import {RESETDOWNLOADLINK} from "@/batchCreateMainAccount/constants/ActionTypes";

export const {
	getSearchType,
	getSearchType_success
} = createHttpAction('getSearchType', tagDetailSearchType, {
	method: 'get'
});
//批量导出高利润账号检查
export const {
	accountImportCheck,
	accountImportCheck_success
} = createHttpAction('accountImportCheck', importTagCheck, {
	method: 'post'
});
//批量导入高利润账号
export const {
	accountImport,
	accountImport_success
} = createHttpAction('accountImport', importTagInsert, {
	method: 'post'
});

export const getAccountList = () => {
	return {
		type: 'getAccountList',
		data: {}
	}
}

// export const {
// 	getAccountList,
// 	getAccountList_success
// } = createHttpAction('getAccountList');
