import { combineReducers } from 'redux'
import { handleActions, combineActions } from 'redux-actions';
import { allEditables } from '../constants/editables';
// import * as types from '../constants/ActionTypes'

import {
	getAccountInfo_success,
	fetchAccountBaseInfo_success,
	fetchAccountBaseInfo_request,
	fetchAccountBaseInfoByUpdate_request,
	updateFetchInfo,
	getSkuList_success,
	getSkuTypeList_success,
	getPrimaryAccountInfo_success,
	getUploadToken_success,
	getPlatformInfo_success,
	getRegionCode_success,
	getIndustryListForAccount_success,
	sensitiveWordsFilter_success,
	setAddSubmit
} from '../actions'

/**
 *
 *
 export const userLoginInfo = handleAction(getUserLoginInfo_success, (state, action) => {
		return {
			...state,
			...action.payload.data
		}
	}, {})

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
	}, {})

 */

const handleEdit = (data) => {
	for (let key in data) {
		if (!data.hasOwnProperty(key)) continue
		if (data[key] == 1 && Object.keys(allEditables).find(str => str === key)) {
			delete data[key]
			delete data[allEditables[key]]
		}
	}
	return data
}

export const accountInfo = handleActions({
	[combineActions(getAccountInfo_success)]: (state, action) => {
		return {
			...state,
			...action.payload.data
		}
	},
	[combineActions(fetchAccountBaseInfo_success,updateFetchInfo)]: (state, action) => {
		let data = { ...action.payload.data }
		data = handleEdit(data)
		return {
			...state,
			...data
		}
	},
	[combineActions(fetchAccountBaseInfo_request,fetchAccountBaseInfoByUpdate_request,setAddSubmit)]: (state) => {
		return {
			...state,
			hasAddSubmit: true
		}
	},
	[combineActions(getPrimaryAccountInfo_success)]: (state, action) => {
		return {
			...state,
			...action.payload.data
		}
	},
	[combineActions(getPlatformInfo_success)]: (state, action) => {
		return {
			...state,
			...action.payload.data
		}
	},
	[combineActions(getUploadToken_success)]: (state, action) => {
		return {
			...state,
			token: { ...action.payload.data }
		}
	}
}, {})

export const priceInfo = handleActions({
	[combineActions(getSkuList_success)]: (state, action) => {
		return {
			...state,
			...action.payload.data
		}
	}
}, {})

export const priceTypeList = handleActions({
	[combineActions(getSkuTypeList_success)]: (state, action) => {
		return [
			...state,
			...action.payload.data
		]
	}
}, [])

export const regionCode = handleActions({
	[combineActions(getRegionCode_success)]: (state, action) => {
		return [
			...state,
			...action.payload.data
		]
	}
}, [])

export const industryListForAccount = handleActions({
	[combineActions(getIndustryListForAccount_success)]:(state,action)=>{
		return[
			...state,
			...action.payload.data
		]
	}
},[])
export const sensitiveWordsFilter = handleActions({
	[combineActions(sensitiveWordsFilter_success)]:(state,action)=>{
		return{
			...state,
			...action.payload.data
		}
	}
},{})
export default combineReducers({
	accountInfo,
	priceInfo,
	priceTypeList,
	regionCode,
	industryListForAccount,
	sensitiveWordsFilter
})
