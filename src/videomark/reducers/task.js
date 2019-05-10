import { handleActions } from 'redux-actions';

import {
    getPlatformList_success,
    getSaleList_success,
    getReservationList_success,
    getCampaignList_success,
    getVMIndustryList_success,
    getBrandList_success
} from '../actions/task'


//平台
export const platformList = handleActions({
    [getPlatformList_success]: (state, action) => {
        return [...action.payload.data]
    },
}, []);

//平台
export const saleList = handleActions({
    [getSaleList_success]: (state, action) => {
        return [...action.payload.data]
    },
}, []);

//预约订单列表
export const reservationList = handleActions({
    [getReservationList_success]: (state, action) => {
        return { ...action.payload.data }
    },
}, {});

//预约订单列表
export const campaignList = handleActions({
    [getCampaignList_success]: (state, action) => {
        return { ...action.payload.data }
    },
}, {});

//行业
export const industryList = handleActions({
    [getVMIndustryList_success]: (state, action) => {
        return [...action.payload.data].map((item) => {
            item.id = item.owner_admin_id
            item.value = item.real_name
            return item
        })
    },
}, []);

//品牌
export const brandList = handleActions({
    [getBrandList_success]: (state, action) => {
        return [...action.payload.data].map((item) => {
            item.id = item.owner_admin_id
            item.value = item.real_name
            return item
        })
    },
}, []);