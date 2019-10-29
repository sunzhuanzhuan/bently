import { combineReducers } from "redux";
import {
	getWebsiteClueList_success
} from '../actions';
import { handleAction } from 'redux-actions';

export const clubInfo = handleAction(getWebsiteClueList_success, (state = {}, action) => {
	return action.payload.data
}, {});

export default combineReducers({
	clubInfo
});
