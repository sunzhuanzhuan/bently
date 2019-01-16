import { combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions';
import * as videoActions from '../actions'
//getHeaderList
export const headerList = handleActions({
	[videoActions.getHeader_success]: (state, action) => {
		return {
			...action.payload.data
		}
	},
}, {})
//所属行业
export const industryList = handleActions({
	[videoActions.getIndustryList_success]: (state, action) => {
		const listNow = action.payload.data.list.map(one => {
			return {
				...one,
				id: one.code
			}
		})

		return listNow
	},
}, [])
//所属行业的reducer
export const industryMap = handleActions({
	[videoActions.getIndustryList_success]: (state, action) => {
		const industryMap = {}
		action.payload.data.list.map(one => {
			industryMap[one.code] = { ...one }

		})
		return industryMap
	},
}, {})
//热门分类
export const hotcategoryList = handleActions({
	[videoActions.getHotcategoryList_success]: (state, action) => {
		console.log([...action.payload.data.list])
		return [
			...action.payload.data.list
		]
	},
}, [])
export const hotcategoryMap = handleActions({
	[videoActions.getHotcategoryList_success]: (state, action) => {
		let listAll = []
		let listToOne = [...action.payload.data.list.map(one => {
			listAll.push(...one.children)
		})]
		let listToTwo = [...action.payload.data.list.map(one => {
			return listAll.push(one)
		})]
		return listAll.reduce((obj, product) => {
			obj[product.id] = product
			return obj
		}, {})
	},
}, [])
//证书	
export const imgList = handleActions({
	[videoActions.getImgList_success]: (state, action) => {
		return [
			...action.payload.data.list
		]
	},
}, [])
//获取活动
export const videoCampaignInfo = handleActions({
	[videoActions.getVideoCampaignInfo_success]: (state, action) => {
		const data = { ...action.payload.data }
		return {
			...data,
			weibo_type: data && parseInt(data.weibo_type),
			hot_category_id: data && parseInt(data.hot_category_id || 0)
		}
	},
}, {})
//修改活动	
export const updateVideoCampaign = handleActions({
	[videoActions.updateVideoCampaign_success]: (state, action) => {
		return {
			...action.payload.data.list
		}
	},
}, {})
//创建活动
export const addVideoCampaign = handleActions({
	[videoActions.addVideoCampaign_success]: (state, action) => {
		return {
			...action.payload.data.list
		}
	},
}, {})
//上传视频
export const uploadVideo = handleActions({
	[videoActions.uploadVideo_success]: (state, action) => {
		return {
			...action.payload.data.list
		}
	},
}, {})
//获取上传token
export const uploadToken = handleActions({
	[videoActions.getUploadToken_success]: (state, action) => {
		return {
			...action.payload.data
		}
	},
}, {})
export default combineReducers({
	headerList,
	industryList,
	hotcategoryList,
	imgList,
	videoCampaignInfo,
	uploadVideo,
	uploadToken,
	hotcategoryMap,
	industryMap
})
