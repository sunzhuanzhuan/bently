const baseUrl = '/operator-gateway/equities/v1'
export default {
	systemAddEquities: baseUrl + "/systemAddEquities",//系统权益池添加权益类型及权益
	systemUpdateEquities: baseUrl + "/systemUpdateEquities",//系统权益池修改权益类型及权益
	systemDeleteEquities: baseUrl + "/systemDeleteEquities",//删除系统配置的权益类型
	getSystemEquities: baseUrl + "/getSystemEquities",//获取系统权益池权益类型及权益

	groupTypeAddEquities: baseUrl + "/groupTypeAddEquities",//平台组添加权益类型及权益
	groupTypeUpdateEquities: baseUrl + "/groupTypeUpdateEquities",//平台组修改权益类型及权益
	deleteEquitiesTypeByGroupTypeId: baseUrl + "/deleteEquitiesTypeByGroupTypeId",//删除平台组权益类型
	getEquitiesByGroupTypeId: baseUrl + "/getEquitiesByGroupTypeId",//通过groupTypeId获取平台组权益

	platformSkuUpdateEquities: baseUrl + "/platformSkuUpdateEquities",//修改媒体平台sku与权益的配置
	getSystemEquitiesById: baseUrl + "/getSystemEquitiesById",//查询系统权益池某项权益类型及权益
	getEquitiesByPlatformId: baseUrl + "/getEquitiesByPlatformId",//获取媒体平台下sku权益配置
}
