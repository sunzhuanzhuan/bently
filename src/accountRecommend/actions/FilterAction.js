import * as Types from "../constants/ActionTypes"
const action = {
	all(payload) {
		return {
			type: Types.SELECTED_FILTER_LIST,
			payload
		}
	},
	show(payload) {
		return {
			type: Types.SELECTED_SHOW,
			payload
		}
	},
	removeSelected(payload) {
		// payload {"category_filter": "3000"}
		return {
			type: Types.SELECTED_REMOVE,
			payload
		}
	},
	emptySelected(payload) {
		return {
			type: Types.SELECTED_EMPTY,
			payload
		}
	},

	//修改任务添加
	accountTaskChange(payload) {
		return {
			type: Types.ACCOUNT_TASKCHNAGE,
			payload
		}

	},
	postApi(payload){
		return {
			type: Types.ACCOUNT_APIPOST,
			payload
		}
	},
	getList(payload){
		return {
			type: Types.GET_LIST,
			payload
		}
	
	},
	PersonTask(payload){
		return {
			type:Types.GET_PERSONTASKLIST,
			payload
		}
	},
	deletePersonTask(payload){
		return {
			type:Types.DELETE_PERSONTASK,
			payload
		}
	}
}
export default action
