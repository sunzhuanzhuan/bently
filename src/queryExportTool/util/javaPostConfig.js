export const getPostFrom = (
	params = {},//查询参数
	pageKey = 'currentPage',//当前页的key
	pageSizeKey = 'pageSize'//一页多少条的key
) => {
	const paramsNew = { ...params }
	delete paramsNew[pageKey]
	delete paramsNew[pageSizeKey]
	return {
		page: {
			currentPage: params[pageKey] || 1,
			pageSize: params[pageSizeKey] || 20
		},
		form: { ...paramsNew }
	}
}
