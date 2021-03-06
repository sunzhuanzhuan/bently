
import { handleAction } from 'redux-actions';
import { getFilters_success, getFiltersMeta_success, getClassifications_success } from '../actions'
import {getAccountImport_success} from "@/operationslabel/action/highProfitAccount";
export const filterOptions = handleAction(getFilters_success, (state, action) => {
	return {
		...state,
		...action.payload
	}
}, {})
export const filtersMetaMap = handleAction(getFiltersMeta_success, (state, action) => {

	let gropusAfter = [...action.payload.data.groups]
	gropusAfter.unshift({ id: 0, name: "不限", platformId: 0 })
	const groups = gropusAfter.map((one, index) => {
		const { groupedPlatforms = [] } = one
		if (groupedPlatforms.length <= 0) {
			delete one.groupedPlatforms
		}
		if (one.platformId <= 0) {
			one.platformId = 0 - index
		}
		return one
	})
	return {
		...action.payload.data,
		groups: groups
	}
}, {})

/**
 * 内容分类、人设分类和风格分类options
 */
export const classificationOptions = handleAction(getClassifications_success, (state, action) => {
    return {
        ...action.payload.data
    }
}, {});
