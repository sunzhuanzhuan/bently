import Interface from '../constants/Interface'
// import { createHttpAction } from 'redux-action-extend'
import createHttpAction from '@/store/createHttpAction'
import api from '../../api/index'
//获取账号列表信息
const getGroupById = (groups, groupType) => {
	return groups.find(group => group.groupId == groupType)
}
const getCategory = (groupedCategories, groupType) => {
	return groupedCategories.map(item => ({
		id: item.itemKey,
		name: item.itemValue
	}))
}
const getOrderIndustryCategory = (orderIndustryCategory = []) => {
	return orderIndustryCategory.map(item => ({
		...item,
		id: item.code,
	}))
}
// let version = 0;
export const getFilters = (params) => (dispatch) => {
	const { groupType } = params;
	// version = params.version;
	return api.get(Interface.getFilters).then((data) => {
		data = data.data;
		const { groups, groupedCategories, orderIndustryCategory, groupedSkuTypes, kolProvinceList, kolInterestList, defaultHotCities } = data;
		const category = {
			name: '常见分类',
			options: getCategory(groupedCategories, groupType)
		}
		const operation_tag = data.operation_tags
		const group = getGroupById(groups, groupType)
		// if (version !== params.version) {
		// 	return;
		// }
		dispatch({
			type: getFilters_success,
			payload: {
				[groupType]: {
					category,
					operation_tag,
					group,
					grouped_sku_types: groupedSkuTypes,
					order_industry_category: getOrderIndustryCategory(orderIndustryCategory),
					industry_list_options: data.industry_list,
					kol_province_list_options: kolProvinceList,
					kol_interest_list_options: kolInterestList,
					default_hot_cities: defaultHotCities.map(item => ({
						"key": String(item.areaId),
						"title": item.areaName
					})),
					unit_play_price_types: data.unitPlayPriceTypes,
					unit_read_price_types: data.unitReadPriceTypes,
					verified_status: [
						{ value: "", name: "不限" },
						...data.verifiedStatus.map(item => ({ value: item.id, name: item.name }))
					]
				}
			}
		})
	})
}
export const {
	getFiltersMeta,
	getFiltersMeta_success
} = createHttpAction('getFiltersMeta', Interface.getFilters)

export const getFilters_success = 'getFilters_success';
