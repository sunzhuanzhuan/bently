
import Interface from "../constants/Interface"
import { createHttpAction } from "../../store/ajaxMiddleware"

//获取推荐结果筛选
export const {
	getFilterData,
	getFilterData_success
} = createHttpAction("getFilterData", Interface.getFilterData, {
	method: "get"
})
//获取筛选平台
export const {
	getAccountPlatform,
	getAccountPlatform_success
} = createHttpAction("getAccountPlatform", Interface.getAccountPlatform, {
	method: "get"
})
//所有平台
export const {
	getTotalPlatform,
	getTotalPlatform_success
} = createHttpAction("getTotalPlatform", Interface.getTotalPlatform, {
	method: "get"
})
//获取个人创建任务
export const {
	getpersonTask,
	getpersonTask_success
} = createHttpAction("getpersonTask", Interface.getpersonTask, {
	method: "get"
})
//获取预览数据接口
export const {
	getPreview,
	getPreview_success
} = createHttpAction("getPreview", Interface.getPreviewDate, {
	method: "get"

})
//创建任务post
export const {
	createTask,
	createTask_success
} = createHttpAction("createTask", Interface.createTask, {
	method: "post"


})
//删除任务
export const {
	delectTask,
	delectTask_success
} = createHttpAction("delectTask", Interface.delectTask, {
	method: "post"

})

//修改任务
export const {
	changeTask,
	changeTask_success
} = createHttpAction("changeTask", Interface.changeTask, {
	method: "post"

})
//获取已添加的任务
export const {
	OldAddTask,
	OldAddTask_success,
} = createHttpAction("OldAddTask", Interface.getOldAddTask, {
	method: "get"
})
//请求推荐结果页列表数据
export const {
	FilterList,
	FilterList_success,
} = createHttpAction("FilterList", Interface.getFilterListData, {
	method: "get"
})
//获取新浪微博数据 列表
	export const {
		sinaList,
		sinaList_success,
	} = createHttpAction("sinaList", Interface.getsinaList,{
		method: "get"
	})
//筛选数据
	export const {
		sinaFilter,
		sinaFilter_success,
	} = createHttpAction("sinaFilter", Interface.getsinaFilter,{
		method: "get"
	})
