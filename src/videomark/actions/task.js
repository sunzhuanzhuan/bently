
import Interface from '../constants/Interface'
import { createHttpAction } from '../../store/ajaxMiddleware'

//获取平台列表
export const {
    getReservationList,
    getReservationList_success
} = createHttpAction('getReservationList', Interface.getReservationList, {
    method: 'get'
});

//获取平台列表
export const {
    getSaleList,
    getSaleList_success
} = createHttpAction('getSaleList', Interface.getSaleList, {
    method: 'get'
});


//获取预约订单列表
export const {
    getPlatformList,
    getPlatformList_success
} = createHttpAction('getPlatformList', Interface.getPlatformList, {
    method: 'get'
});
//获取微闪投订单列表
export const {
    getCampaignList,
    getCampaignList_success
} = createHttpAction('getCampaignList', Interface.getCampaignList, {
    method: 'get'
});

