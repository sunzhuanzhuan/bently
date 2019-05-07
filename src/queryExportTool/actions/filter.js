import Interface from '../constants/Interface'
// import { createHttpAction } from 'redux-action-extend'
import createHttpAction from '@/store/createHttpAction'
import api from '../../api/index'
//获取账号列表信息
const getGroupById = (groups, group_id) => {
	return groups.find(group => group.group_id == group_id)
}
const getCategory = (grouped_categories, group_id) => {
	return grouped_categories.map(item => ({
		id: item.itemKey,
		name: item.itemValue
	}))
}

// let version = 0;
export const getFilters = (params) => (dispatch) => {
	const { group_id } = params;
	// version = params.version;
	return api.get(Interface.getFilters).then((data) => {
		data = data.data;
		const { groups, grouped_categories, grouped_sku_types, kol_province_list, kol_interest_list, default_hot_cities } = data;
		const category = {
			name: '常见分类',
			options: getCategory(grouped_categories, group_id)
		}
		const operation_tag = data.operation_tags
		const group = getGroupById(groups, group_id)
		// if (version !== params.version) {
		// 	return;
		// }
		dispatch({
			type: getFilters_success,
			payload: {
				[group_id]: {
					category,
					operation_tag,
					group,
					grouped_sku_types,
					industry_list_options: data.industry_list,
					kol_province_list_options: kol_province_list,
					kol_interest_list_options: kol_interest_list,
					default_hot_cities: default_hot_cities.map(item => ({
						"key": String(item.area_id),
						"title": item.area_name
					})),
					unit_play_price_types: data.unit_play_price_types,
					unit_read_price_types: data.unit_read_price_types,
					verified_status: [
						{ value: "", name: "不限" },
						...data.verified_status.map(item => ({ value: item.id, name: item.name }))
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
