//Types常量获取
import {
	SELECTED_FILTER_LIST,
	SELECTED_REMOVE,
	SELECTED_SHOW,
	SELECTED_EMPTY,
	INPUT_PRICE,
	INPUT_FANS,
	ACCOUNT_TASKCHNAGE,
	ACCOUNT_APIPOST,
	GET_LIST,
	GET_PERSONTASKLIST,
	DELETE_PERSONTASK,
} from "../constants/ActionTypes"
//筛选 已经选则的项
export const filterParams = (state = {  }, action) => {
	let newState = { ...state }
	switch (action.type) {
		case SELECTED_FILTER_LIST:
			let payload = action.payload
			for (let i in action.payload) {
				if (action.payload[i].length && action.payload[i][0].id == "") {
					action.payload[i] = []
				}
			}
			return {
				...state,
				...payload
			}
		case SELECTED_REMOVE:
			return {
				...state,
				...action.payload
			}
		case SELECTED_EMPTY:
			return {
				...state,
				...action.payload
			}
		case INPUT_FANS:
			return {
				...state,
				...action.payload
			}
		case INPUT_PRICE:
			return {
				...state,
				...action.payload
			}

		default:
			return newState
	}
}
export const filterTrue = (state = { selected: false }, action) => {
	let State = { ...state }
	switch (action.type) {
		case SELECTED_SHOW:
			State.selected = action.payload
			return State
		default:
			return State
	}
}

export const taskChange = (state = { taskChange: false }, action) => {
	let State = { ...state }
	switch (action.type) {
		case ACCOUNT_TASKCHNAGE:
			State.taskChange = action.payload
			return State
		default:
			return State
	}
}
export const postApi = (state = { }, action) => {
	let newState = { ...state }
	switch (action.type) {
		case ACCOUNT_APIPOST:
			let payload = action.payload;
			return {
				...state,
				...payload
			}
		default:
			return newState
	}
}
export const getList = (state = [], action) => {
	let newState = { ...state }
	switch (action.type) {
		case GET_LIST:
			let payload = action.payload
			return {
				...state,
				...payload
			}
		default:
			return newState
	}
}
export const PersonHistory = (state = [], action) => {
	let newState = [...state]  
	switch (action.type) {
		case GET_PERSONTASKLIST:
			let payload = action.payload
			return [
				...state,
				...payload
			]
		case DELETE_PERSONTASK:
			let payloadId = action.payload
		
			return [				
                ...state.filter(v => v.task_id != payloadId)							
			]
			
		default:
			return newState

	}
}
