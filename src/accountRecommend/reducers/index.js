import { combineReducers } from "redux"
import { handleAction, handleActions } from "redux-actions"
import {
	getFilterData_success,
	getAccountPlatform_success,
	getpersonTask_success,
	changeTask_success,
	createTask_success,
	getPreview_success,
	OldAddTask_success,
	FilterList_success,
	sinaFilter_success,
	sinaList_success,
	delectTask_success,
	getTotalPlatform_success
} from "../actions/listApi"
import { filterParams, taskChange, postApi, getList, PersonHistory } from "./filterSelect"
//推荐结果筛选
export const accountFilter = handleActions({
	[getFilterData_success]: (state, action) => {
		return [...action.payload]
	},
}, [])
//筛选平台
export const accountPlatform = handleActions({
	[getAccountPlatform_success]: (state, action) => {
		return [...action.payload]
	},
}, [])
//全部筛选平台 
export const getTotalPlatform = handleActions({
	[getTotalPlatform_success]: (state, action) => {
		return [...action.payload]
	},
}, [])
//个人创建任务 
export const accountpersonTask = handleActions({

	[getpersonTask_success]: (state, action) => {
		return [...action.payload]
	},
}, [])
//获取预览数据接口

export const accountPreview = handleActions({
	[getPreview_success]: (state, action) => {
		return [...action.payload]
	},
}, [])
//创建任务接口
export const createTask = handleActions({
	[createTask_success]: (state, action) => {
		return {
			...action.payload.data
		}
	},
}, {})
//删除任务 post
export const delectTask = handleActions({
	[delectTask_success]: (state, action) => {
		return {
			...action.payload.data
		}
	},
}, {})
//修改任务接口

export const changeTask = handleActions({
	[changeTask_success]: (state, action) => {
		return {
			...action.payload.data
		}
	},
}, {})
//获取已经添加的任务
export const OldAddTask = handleActions({
	[OldAddTask_success]: (state, action) => {
		return [...action.payload]
	},
}, [])
//filter列表数据
export const FilterList = handleActions({
	[FilterList_success]: (state, action) => {
		return [...action.payload]
	},
}, [])
//page 分页
export const wechatPagination = handleAction(
	FilterList_success,
	(state, action) => {
		return {
			...state,
			total: parseInt(action.payload.data.total),
			currentPage: parseInt(action.payload.data.page)
		}
	},
	{}
)
export const sinaPagination = handleAction(
	sinaList_success,
	(state, action) => {
		return {
			...state,
			total: parseInt(action.payload.data.total),
			currentPage: parseInt(action.payload.data.page)
		}
	},
	{}
)

//新浪微博的 列表和筛选
export const sinaList = handleActions({
	[sinaList_success]: (state, action) => {
		return [...action.payload]

	},
}, [])

export const sinaFilter = handleActions({
	[sinaFilter_success]: (state, action) => {
		return [...action.payload]
	},
}, [])
export default combineReducers({
	accountPlatform,
	getTotalPlatform,
	accountFilter,
	accountpersonTask,
	filterParams,
	accountPreview,
	createTask,
	taskChange,
	changeTask,
	OldAddTask,
	FilterList,
	sinaList,
	sinaFilter,
	sinaPagination,
	wechatPagination,
	delectTask,
	postApi,
	getList,
	PersonHistory
})


