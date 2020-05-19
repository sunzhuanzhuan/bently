const baseUrl = 'operator-gateway/search/export'//java重构接口
const branchUrl = 'operator-gateway/search/export/branch'
const quotationUrl = "operator-gateway/export/account/quotation"
export default {
	//获取公司列表
	getCompanyList: "/export/account/getCompanyList",
	//账号列表
	//getAccountList: '/export/account/search',
	//其他平台搜索
	otherPlatformSearch: baseUrl + '/otherPlatformSearch',
	//小红书
	smallRedBookSearch: baseUrl + '/smallRedBookSearch',
	//视频/直播
	videoSearch: baseUrl + '/videoSearch',
	//新浪
	xinaSearch: baseUrl + '/xinaSearch',
	//微信
	weixinSearch: baseUrl + '/weiXinSearch',
	//批量查找账号列表
	getBatchSearch: baseUrl + '/batchSearch',

	//报价单详情账号列表
	getQuotationAccountSearch: baseUrl + '/quotationList',
	//获取sku价格及平均价格
	getAccountPrice: baseUrl + '/account/price',
	//获取购物车列表
	getCartSearchAll: baseUrl + '/cartList',

	//批量查号下载
	batchAccountExport: branchUrl + "/batchAccountExport",
	//账号详情
	getBaseInfo: "/export/account/getBaseInfo",
	//账号详情---账号评价
	getDegreeList: "/export/account/getDegreeList",
	//账号详情---最近应约价
	getRecentReservationOrderPriceList: "/export/account/getRecentReservationOrderPriceList",
	//获取购物车
	getAccountListFromCart: branchUrl + '/getAccountListFromCart',
	//报价单列表
	getQuotationList: quotationUrl+"/list",
	//删除购物车数据
	removeFromCart: branchUrl + "/removeFromCart",
	//添加购物车数据
	addToCart: branchUrl + "/addToCart",
	//全部清空
	clearCart: branchUrl + "/clearCart",
	//下载中心列表
	getDownloadList: branchUrl + '/getQuotationDownloadList',
	//下载
	download: branchUrl + "/download",
	//重新下载
	reDownload: "/export/account/reDownload",

	//报价单模版
	getStencilList: quotationUrl + "/templateList",
	//报价单详情
	getQuotationDetail: quotationUrl + "/detail",

	//添加报价单
	saveQuotation: branchUrl + "/saveQuotation",
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
	//获取公共分类
	getCommonClassify: '/accountList/api/getCommonClassify',
	//获取查询项
	getFilters: '/export/account/getFiltersMeta'

}
