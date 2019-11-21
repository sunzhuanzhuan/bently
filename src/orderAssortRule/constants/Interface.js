const baseUrl = 'order/allocate/'//java重构接口
export default {
	//获取所有
	getAllBpList: baseUrl + 'getAllBpList',
	//获取大区
	getRegionList: baseUrl + 'getRegionList',
	//查询品牌列表
	queryBrandList: baseUrl + "queryBrandList",
	//查询厂商列表
	queryCompanyList: baseUrl + "queryCompanyList",
	//获取BP列表
	getBPList: baseUrl + "getBpAllocationRuleList",
	//获取BP详情
	getBpDetail: baseUrl + "getBpAllocationRuleDetail",
	//设置BP
	saveBpAllocation: baseUrl + "saveBpAllocationRule",
}
