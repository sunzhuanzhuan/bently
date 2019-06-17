import { handleActions } from 'redux-actions';

import {
    getBrandManageList_success,
    addBrand_success,
    uodateBrand_success,
} from '../actions/brandManage'

//获取品牌列表
export const brandManageList = handleActions({
    [getBrandManageList_success]: (state, action) => {
        return [...action.payload.data]
    },
}, []);

//新建品牌列表
export const addBrandManage = handleActions({
    [addBrand_success]: (state, action) => {
        return [...action.payload.data]
    },
}, []);

//编辑品牌列表
export const editBrandManage = handleActions({
    [uodateBrand_success]: (state, action) => {
        return [...action.payload.data]
    },
}, []);
