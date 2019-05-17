import { combineReducers } from 'redux'
import { handleAction, handleActions /*handleActions, combineActions*/ } from 'redux-actions';
import {
	getImportAccountList_success,
	getPlatformList_success,
	getDemandHistory_success,
	getAllotList_success,
	getMediaManagerList_success,
	getOrientationList_success,
	getAuditedList_success,
	getMainAllotList_success,
	getUsualAllotList_success,
	getRequirementlist_success,
	getRequirementStat_success,
	getAllPlatformList_success,
	getCategoryList_success
} from '../actions'
import {
	GET_SIMILAR_ACCOUNT, RESET_SIMILAR_ACCOUNT, FETCH_CHOOSE_SIMILAR_ACCOUNT,
	SEND_TOTAL_ACCOUNT, POST_SIMILAR_ACCOUNT
} from '../constants/ActionTypes'

// 处理列表数据为map表
function handleListToMap(primary_key) {
	return (state, action) => {
		let { count = 0, page = 1, pageNum = 100, rows: resultAry = [], search_flag = false } = action.payload.data.list,
			map = {},

			list = resultAry.map(item => {
				map[item[primary_key]] = item
				return item[primary_key]
			})
		return {
			count, page, pageNum, list, search_flag, map: { ...state.map, ...map },
			stat: action.payload.data.statistics || {}
		}
	}
}

// 初始化列表数据
function initList() {
	return { list: [], map: {}, count: 0, page: 1, pageNum: 100, stat: {}, search_flag: false }
}

// 已导入账号列表
// export const importAccountList = handleActions(getImportAccountList_success, handleListToMap('ext_account_id'), initList())

export const importAccountList = handleActions({
	'EXTENSION_NUMBER_UPDATE_ACCOUNT': (state, action) => {
		debugger
		console.log(state, action);

		return { ...state, map: { ...state.map, ...action.payload.data } };
	},
	'getImportAccountList_success': handleListToMap('ext_account_id')
}, initList())

// 平台列表
export const platformList = handleAction(getPlatformList_success, (state, action) => {
	return {
		...state,
		...action.payload.data
	}
}, {})

// 所有平台列表
export const allPlatformList = handleAction(getAllPlatformList_success, (state, action) => {
	return {
		...state,
		...action.payload.data
	}
}, {})

// 需求统计
export const requirementStat = handleAction(getRequirementStat_success, (state, action) => {
	return {
		...state,
		...action.payload.data
	}
}, {})

// 获取名下已有需求列表
export const requirementlist = handleAction(getRequirementlist_success, (state, action) => {
	return {
		...state,
		...action.payload.data
	}
}, {})



// 历史拓号需求列表
export const demandHistory = handleAction(getDemandHistory_success, handleListToMap('id'), initList())

// 拓号任务分配列表
export const allotList = handleAction(getAllotList_success, handleListToMap('id'), initList())

// 媒介经理列表
export const mediaManagerList = handleAction(getMediaManagerList_success, (state, action) => {
	let list = action.payload.data.admin_user || {}
	return { ...list }
}, {})

//分类

export const categoryList = handleAction(getCategoryList_success, (state, action) => {
	let list = action.payload.data.items || []
	return [...list]
}, [])

// 定向拓号任务列表
export const orientationList = handleAction(getOrientationList_success, handleListToMap('id'), initList())

//主账号审核
export const auditedList = handleAction(getAuditedList_success, handleListToMap('id'), initList())

//主账号分配列表
export const mainAllotList = handleAction(getMainAllotList_success, handleListToMap('user_id'), initList())

//日常拓号
export const usualAllotList = handleAction(getUsualAllotList_success, handleListToMap('key'), initList())


const similarAccount = (state = {}, action) => {
	switch (action.type) {
		case GET_SIMILAR_ACCOUNT:
			let newObj = { account_id: '00000', online_status: 0, weibo_name: "未找到匹配账号", weibo_id: "", weibo_type: 0 }
			let length = action.payload.data.rows.length
			let tempArray = [action.payload.data]
			var payload = tempArray.map((item) => {
				return {
					rows: [...item.rows, newObj],
					account_name: item.account_name,
					total: item.total,
					ext_account_id: item.ext_account_id
				}
			}).reduce((obj, item) => {
				if (item.rows.length > 1) {
					obj[item.ext_account_id] = item.rows
				}
				return obj;
			}, {})

			if (length != 0) {
				return { ...state, ...payload }
			} else {
				return state
			}
		case RESET_SIMILAR_ACCOUNT:
			return { paddingData: {}, total: {} }
		case SEND_TOTAL_ACCOUNT:
			let data = [...action.payload.data]
			let doneData = data.reduce((obj, item) => {
				//item.ext_account_id = { ...item }
				obj[item.ext_account_id] = { ...item }
				return obj;
			}, {})

			return { ...state, total: { ...state.total, ...doneData } }
		default:
			return state
	}
}
const similarAccountResult = (state = {}, action) => {
	switch (action.type) {
		case POST_SIMILAR_ACCOUNT:
			return action.payload.data
		default:
			return state
	}

}
const similarChooseAccount = (state = {}, action) => {
	switch (action.type) {
		case FETCH_CHOOSE_SIMILAR_ACCOUNT:
			return action.payload.data
		default:
			return state
	}
}


export default combineReducers({
	importAccountList,
	platformList,
	demandHistory,
	allotList,
	mediaManagerList,
	orientationList,
	requirementlist,
	requirementStat,
	auditedList,
	mainAllotList,
	usualAllotList,
	allPlatformList,
	similarAccount,
	similarAccountResult,
	similarChooseAccount,
	categoryList
})


/*export const loginConfig = handleActions({
    [combineActions(getLoginConfig_success, login_success, verifysms_success)]: (state, action) => {
        return {
            ...state,
            ...action.payload.data
        }
    },
    [resetNeed_verify]: (state) => ({
        ...state,
        need_verify: false
    })
}, {})*/
