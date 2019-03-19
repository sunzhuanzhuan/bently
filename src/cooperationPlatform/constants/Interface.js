const defaultUrl = 'operator-gateway/trinityPlatform/v1/'
const skuUrl = '/operator-gateway/trinitySku/v1/'
const agent = '/operator-gateway/trinityAgent/v1/'
export default {
	'getCooperationPlatformByPage': defaultUrl + 'getCooperationPlatformByPage',//合作平台-管理列表接口
	'insertCooperationPlatform': defaultUrl + 'insertCooperationPlatform',//合作平台-新增接口
	'delPlatform': defaultUrl + 'delPlatform',//合作平台-删除接口
	'getCooperationPlatformInfoById': defaultUrl + 'getCooperationPlatformInfoById',//合作平台-查看详情接口
	'updateCooperationPlatform': defaultUrl + 'updateCooperationPlatform',//合作平台-修改接口
	'updatePlatformStatus': defaultUrl + 'updatePlatformStatus',//合作平台-启用/禁用合作平台
	'updatePlatformDefault': defaultUrl + 'updatePlatformDefault',//合作平台-设置默认报价项
	'getPlatform': defaultUrl + 'getPlatform',//合作平台-所属媒体平台下拉框接口
	'getCooperationPlatform': defaultUrl + 'getCooperationPlatform',//获取除当前启用平台外是否还有其他启用平台

	'': defaultUrl + '',//合作平台-开户行下拉框接口
	'': defaultUrl + '',//合作平台-获取合作平台是否有启用的报价项

	'getAgentByPage': agent + 'getAgentByPage',//代理商列表
	'insertAgent': agent + 'insertAgent',//新增代理商
	'updateAgent': agent + 'updateAgent',//修改代理商
	'getAgentById': agent + 'getAgentById',//查看代理商
	'updateAgentStatus': agent + 'updateAgentStatus',//启用/停用代理商
	'delAgent': agent + 'delAgent',//删除代理商
	'existsAgentName': agent + 'existsAgentName',//删除代理商

	'addOrUpdateTrinitySkuType': skuUrl + 'addOrUpdateTrinitySkuType',//添加或修改三方报价类型:通过id存在即修改，不存在即添加，编号唯一
	'addOrUpdateTollType': skuUrl + 'addOrUpdateTollType',//添加或修改服务类型
	'getCaptureTollType': skuUrl + 'getCaptureTollType',//合作平台-平台收费类型名称下拉框接口
	'getCaptureTrinitySkuType': skuUrl + 'getCaptureTrinitySkuType',//合作平台-平台抓取报价项名称下拉框接口
	'getSkuTypeList': skuUrl + 'getSkuTypeList',//合作平台-平台关联报价项下拉框接口
	'getTrinitySkuTypeList': skuUrl + 'getTrinitySkuTypeList',//获取Sku列表
	'getTrinityTollTypeList': skuUrl + 'getTrinityTollTypeList',//获取收费类型列表


}
