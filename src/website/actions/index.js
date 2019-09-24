import Interface from "../constants/Interface";
import { createHttpAction } from 'redux-action-extend';

export const {
	getWebsiteClueList,
	getWebsiteClueList_success
} = createHttpAction('getWebsiteClueList', Interface.getWebsiteClueList, {
	method: 'post'
});
