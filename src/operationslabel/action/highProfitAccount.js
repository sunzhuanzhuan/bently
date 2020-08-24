// 高利润账号
import { createHttpAction } from 'redux-action-extend'
import { tagDetailSearchType } from "@/operationslabel/constants/API";
import {RESETDOWNLOADLINK} from "@/batchCreateMainAccount/constants/ActionTypes";

export const {
	getSearchType,
	getSearchType_success
} = createHttpAction('getSearchType', tagDetailSearchType, {
	method: 'get'
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
