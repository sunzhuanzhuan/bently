import { combineReducers } from 'redux'
import {
    platformList,
    saleList,
    reservationList,
    campaignList,
    industryList,
    brandList,
    brandListForModal
} from './task'
import {
    brandManageList,
    addBrandManage,
    editBrandManage,
} from './brandManage'

export default combineReducers({
    platformList,
    saleList,
    reservationList,
    campaignList,
    industryList,
    brandList,
    brandListForModal,
    brandManageList,
    addBrandManage,
    editBrandManage,
})