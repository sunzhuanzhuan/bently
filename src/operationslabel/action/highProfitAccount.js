// 高利润账号
import { createHttpAction } from 'redux-action-extend'

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
