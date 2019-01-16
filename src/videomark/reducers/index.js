import { combineReducers } from 'redux'
import {
    platformList,
    saleList,
    reservationList,
    campaignList
} from './task'


export default combineReducers({
    platformList,
    saleList,
    reservationList,
    campaignList
})
