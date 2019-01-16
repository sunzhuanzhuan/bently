import { handleActions } from 'redux-actions';

import {
    getPlatformList_success,
    getSaleList_success,
    getReservationList_success,
    getCampaignList_success
} from '../actions/task'


//平台
export const platformList = handleActions({
    [ getPlatformList_success ]: (state, action) => {
        return [ ...action.payload.data ]
    },
}, []);

//平台
export const saleList = handleActions({
    [ getSaleList_success ]: (state, action) => {
        return [ ...action.payload.data ]
    },
}, []);

//预约订单列表
export const reservationList = handleActions({
    [ getReservationList_success ]: (state, action) => {
        return { ...action.payload.data }
    },
}, {});

//预约订单列表
export const campaignList = handleActions({
    [ getCampaignList_success ]: (state, action) => {
        return { ...action.payload.data }
    },
}, {});














