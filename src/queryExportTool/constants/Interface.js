export default {
	//获取公司列表
	getCompanyList: "/export/account/getCompanyList",
	//账号列表
	getAccountList: '/export/account/search',
	//批量查找账号列表
	getBatchSearch: "export/account/batchSearch",
	//批量查号下载
	batchAccountExport: "export/account/batchAccountExport",
	//账号详情
	getBaseInfo: "/export/account/getBaseInfo",
	getDegreeList: "/export/account/getDegreeList",
	getRecentReservationOrderPriceList: "/export/account/getRecentReservationOrderPriceList",
	//获取购物车
	getAccountListFromCart: '/export/account/getAccountListFromCart',
	//获取购物车列表
	getCartSearchAll: "/export/account/cartSearch",
	//删除购物车数据
	removeFromCart: "/export/account/removeFromCart",
	//添加购物车数据
	addToCart: "/export/account/addToCart",
	//全部清空
	clearCart: "/export/account/clearCart",
	//下载中心列表
	getDownloadList: '/export/account/getQuotationDownloadList',
	//下载
	download: "/export/account/download",
	//重新下载
	reDownload: "/export/account/reDownload",
	//报价单列表
	getQuotationList: "/export/account/getQuotationList",
	//报价单模版
	getStencilList: "/export/account/getTemplateList",
	//报价单详情
	getQuotationDetail: "/export/account/getQuotationDetail",
	//报价单详情账号列表
	getQuotationAccountSearch: "/export/account/quotationAccountSearch",
	//添加报价单
	saveQuotation: "/export/account/saveQuotation",
	//报价单详情批量删除
	deleteFromCart: "/export/account/deleteFromQuotation",
	//报价单导出全部账号
	quotationExport: "/export/account/quotationExport",
	//报价单导出验证
	preExportNumCheck: "/export/account/preExportNumCheck",
	//获取报价单ID
	getAccountIdsByQuotation: "/export/account/getAccountIdsByQuotation",
	//验证码验证是否正确
	codeCheck: "/export/account/codeCheck",
	//将账号添加进报价单
	addToQuotation: "/export/account/addToQuotation",

	getCommonClassify: '/accountList/api/getCommonClassify',
	//获取查询项
	getFilters: '/export/account/getFiltersMeta'

}
