export default {
	getAccountPlatform: "/recommend/get_app", // 获取筛选平台接口
	getTotalPlatform:'/recommend/get_total_app', //获取添加任务的筛选平台接口（全部选择）
	getpersonTask: "/recommend/search_task", // 获取个人创建任务
	getPreviewDate: '/recommend/top_thirty_article',//获取预览数据接口哦
	createTask: '/recommend/create_task',//创建任务
	changeTask: '/recommend/update_task',//修改任务
	getOldAddTask: '/recommend/get_user_task', //获取修改任务接口 首页已添加任务
	getFilterListData: '/recommend/getWeixinAccountList',//请求推荐结果页列表数据(微信)
	getFilterData: "/recommend/getWeixinAccountFilter", //获取筛选框数据（微信）
	getsinaList: '/recommend/getSinaAccountList',//请求推荐结果页列表数据(微博)
	getsinaFilter: "/recommend/getSinaAccountFilter", //获取筛选框数据（微博）
	delectTask: '/recommend/delete_task',//获取删除任务
}




