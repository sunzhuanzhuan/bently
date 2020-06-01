import { combineReducers } from 'redux'
import { handleAction, handleActions, combineActions } from 'redux-actions';
import update from 'immutability-helper'


import {
	getTemplateAllColumns_success,
	selectColumns,
	changeColumnsAlias,
	resetColumnsToDefault,
	clearColumns,
	selectPriceType,
	getTemplateInfo_success
} from '../actions'

// 处理组内数据
function handleColumns(data) {
	// data = JSON.parse(JSON.stringify(data))
	let ids, sources = {}, defaultSelected = []
	ids = data.map(({ name, columns }) => ({
		name,
		"columns": columns.map(item => {
			// 生成map数据
			sources[item.id] = item
			// 处理选中的项
			if (/*item['is_selected'] == 1 || */item['removeableStatus'] == 2) defaultSelected.push(item.id)
			return item.id
		})
	}))
	return { ids, sources, defaultSelected }
}

// 处理组选择为默认模板
function resetColumns(data) {
	let newData = { ...data }
	for (let key in newData) {
		if (!newData.hasOwnProperty(key)) continue
		const { defaultIds } = newData[key]
		newData[key] = update(newData[key], {
			"sources": {
				$apply: sources => {
					return Object.entries(sources).reduce((obj, [key, item]) => {
						obj[key] = { ...item, alias: undefined }
						return obj
					}, {})
				}
			},
			"choosedIds": { $set: defaultIds },
			"selected": { $set: defaultIds }
		})

	}
	return newData
}
// 处理分组列表为码表
function handleColumnsWrapToMap(group) {
	let obj = {}
	obj[group['groupType']] = {
		...group,
		...handleColumns([...group['allColumns']]),
		selected: group['choosedIds'],
		priceTypes: group['skuPriceType'] || [1]
	}
	return obj
}

export const templateAllColumns = handleActions({
	[getTemplateAllColumns_success]: (state, action) => {
		let data = action.payload.data
		// handleColumns({...data})
		data = handleColumnsWrapToMap(data)
		return {
			...state,
			...data
		}
	},
	[changeColumnsAlias]: (state, action) => {
		let { groupId, id, val, key = 'alias' } = action.payload
		return update(state, {
			[groupId]: {
				"sources": {
					[id]: { [key]: { $set: val } }
				}
			}
		})
	},
	[resetColumnsToDefault]: (state) => {
		return resetColumns(state)
	},
	[selectColumns]: (state, action) => {
		let { groupId, value } = action.payload
		return update(state, {
			[groupId]: {
				"choosed_ids": { $set: [...value] },
				"selected": { $set: [...value] }
			}
		})
	},
	[selectPriceType]: (state, action) => {
		let { groupId, priceTypes } = action.payload
		return update(state, {
			[groupId]: {
				"priceTypes": { $set: [...priceTypes] }
			}
		})
	},
	[clearColumns]: () => {
		return {}
	}
}, {})

export const templateInfos = handleActions({
	[getTemplateInfo_success]: (state, action) => {
		return {
			...state,
			...action.payload.data
		}
	},
	[clearColumns]: () => {
		return {}
	}
}, {})
/*
export const loginConfig = handleActions({
	[combineActions(getLoginConfig_success, login_success, verifysms_success)]: (state, action) => {
		return {
			...state,
			...action.payload.data
		}
	},
	[resetNeed_verify]: (state) => ({
		...state,
		need_verify: false
	})
}, {})*/

// export const qrViewInfo = handleAction(qrViewInfo_success, (state, action) => {
// 	return {
// 		...state, ...action.payload.data
// 	}
// }, {})


export default combineReducers({
	templateAllColumns,
	templateInfos
})
