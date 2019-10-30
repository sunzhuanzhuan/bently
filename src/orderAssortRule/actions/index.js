import { createHttpAction } from '../../store/ajaxMiddleware'
import Interface from "../constants/Interface";

//获取BP
export const {
	getBPList,
	getBPList_success
} = createHttpAction('getBPList', Interface.getBPList)
//查询品牌列表
export const {
	getRegionList,
	getRegionList_success
} = createHttpAction('getRegionList', Interface.getRegionList)

//获取详情BP
export const {
	getBpDetail,
	getBpDetail_success
} = createHttpAction('getBpDetail', Interface.getBpDetail)
export const {
	getAllBpList,
	getAllBpList_success
} = createHttpAction('getAllBpList', Interface.getAllBpList)
//查询品牌列表
export const {
	queryBrandList,
	queryBrandList_success
} = createHttpAction('queryBrandList', Interface.queryBrandList)

export const {
	saveBpAllocation,
	saveBpAllocation_success
} = createHttpAction('saveBpAllocation', Interface.saveBpAllocation, {
	method: 'post'
}
)



