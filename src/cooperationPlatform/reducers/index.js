import { combineReducers } from 'redux'
import { handleActions, handleAction } from 'redux-actions';
import * as cooperationPlatformActions from '../actions'
import * as cooperationPlatform from './cooperationPlatform'
//获取token

// export const uploadToken = handleActions({
// 	[goodsReceiptAction.getGRUploadToken_success]: (state, action) => {
// 		return { ...action.payload.data }
// 	}
// }, {})


export default combineReducers({
	...cooperationPlatform
})
