
import { handleAction } from 'redux-actions';
import { getFilters_success, getFiltersMeta_success } from '../actions'
export const filterOptions = handleAction(getFilters_success, (state, action) => {
	return {
		...state,
		...action.payload
	}
}, {})
export const filtersMetaMap = handleAction(getFiltersMeta_success, (state, action) => {

	let gropusAfter = [...action.payload.data.groups_batch]
	gropusAfter.unshift({ id: 0, name: "不限", platform_id: 0 })
	const groups_batch = gropusAfter.map((one, index) => {
		const { grouped_platforms = [] } = one
		if (grouped_platforms.length <= 0) {
			delete one.grouped_platforms
		}
		if (one.platform_id <= 0) {
			one.platform_id = 0 - index
		}
		return one
	})
	return {
		...action.payload.data,
		groups_batch: groups_batch
	}
}, {})
