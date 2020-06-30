const baseUrl = '/operator-gateway/equities/v1'
export default {
	systemAddEquities: baseUrl + "/systemAddEquities",//系统权益池添加权益类型及权益
	systemUpdateEquities: baseUrl + "/systemUpdateEquities",//系统权益池修改权益类型及权益
	systemDeleteEquities: baseUrl + "/systemDeleteEquitiesType",//删除系统配置的权益类型
	getSystemEquities: baseUrl + "/getSystemEquities",//获取系统权益池权益类型及权益
	systemEquitiesTypeSort: baseUrl + '/systemEquitiesTypeSort',//系统权益类型排序

	groupTypeAddOrUpdateEquities: baseUrl + "/groupTypeAddOrUpdateEquities",//平台组添加或修改权益类型及权益
	deleteEquitiesTypeByGroupTypeId: baseUrl + "/deletePlatformGroupEquitiesType",//删除平台组权益类型
	getEquitiesByGroupTypeId: baseUrl + "/getEquitiesByGroupTypeId",//通过groupTypeId获取平台组权益
	getUnUseEquitiesByGroupTypeId: baseUrl + "/getUnUseEquitiesByGroupTypeId",//通过groupTypeId获取未配置的平台组权益类型及权益

	platformSkuUpdateEquities: baseUrl + "/platformSkuAddOrUpdateEquities",//修改媒体平台sku与权益的配置
	getSystemEquitiesById: baseUrl + "/getSystemEquitiesById",//查询系统权益池某项权益类型及权益
	getPlatformSkuTypeEquities: baseUrl + "/getPlatformSkuTypeEquities",//获取媒体平台下sku权益配置
	getCanUpdateSkuTypeEquities: baseUrl + "/getCanUpdateSkuTypeEquities",//获取媒体平台sku权益修改时的列表数据
	PSGetGroupPlatformList: '/operator-gateway/common/v1/getGroupPlatformList',//获取媒体平台组平台信息
	PSGetNewBPlatforms: '/operator-gateway/common/v1/getNewBPlatforms'//获取新b端所有平台列表
}
