import { handleActions, createAction } from 'redux-actions';
import * as cooperationPlatformActions from '../actions'

//列表
export const agentByPageList = handleActions({
	[cooperationPlatformActions.getAgentByPage_success]: (state, action) => {
		return { ...action.payload.data }
	}
}, {})

