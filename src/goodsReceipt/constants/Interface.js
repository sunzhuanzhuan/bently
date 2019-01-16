export default {
	//获取gr基础信息-新增修改头部信息	
	addGRAttachment: "/gr/addGRAttachment",	//上传附件	
	delGRAttachment: "/gr/delGRAttachment",	//删除附件	
	cancelApply: "/gr/cancelApply",//	gr作废	
	getGRList: "/gr/getGRList",	//获取gr列表	
	getGRItemList: "/gr/getGRItemList",	//获取GR关联的订单列表	
	copyGR: "/gr/copy",	//gr复制	
	getProjectList: "/gr/getProjectList",//	筛选项-获取项目列表	
	getBrandList: "/gr/getBrandList",//筛选项-品牌列表	
	getCreatorList: "/gr/getCreatorList",//筛选项-获取创建人列表	
	getCompanyList: "/gr/getCompanyList",	//筛选项-公司列表	
	audit: "/gr/audit",	//gr审核	
	updateGRItemInfo: "/gr/updateGRItemInfo",	//更新订单等item信息(采购价)	
	removeOrder: "/gr/removeOrders",	//移除order（暂不提供）	
	addOrders: "/gr/addOrders",	//添加order	
	updateBaseInfo: "/gr/updateBaseInfo",	//gr更新(基础信息修改(保存))	
	getPoItemList: "/gr/getPoItemList",	//获取po的预约、派单、拓展业务列表
	getPOItemTotalStatistic: "/gr/getPOItemTotalStatistic",////获取po的预约、派单、拓展业务列表统计数
	getBaseDetail: "/gr/getBaseDetail",	//gr详情(获取基础信息)	
	createGR: "/gr/create",	//gr创建(草稿)
	getUploadToken: "/gr/getUploadToken",//获取token
	getGRItemListStatistic: "/gr/getGRItemListStatistic",//获取统计
	GRSubmit: "/gr/submit",//√gr-提交
	exportOrderExcel: "/gr/exportOrderExcel"//一键下载
}
