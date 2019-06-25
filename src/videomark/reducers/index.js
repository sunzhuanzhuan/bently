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

export default combineReducers({
    platformList,
    saleList,
    reservationList,
    campaignList,
    industryList,
    brandList,
    brandListForModal,
})