import Interface from '../constants/Interface'
import { GET_PROGRESS, ADD_BRAND, EDIT_BRAND, GET_BRAND_LIST } from '../constants/ActionTypes';
import api from '../../api/index';
//获取品牌列表
export function getBrandManageList() {
	return dispatch =>
    {
		dispatch({ type:GET_PROGRESS, progress: 'loading' });

        return api.get(Interface.getBrandManageList)
            .then( result => {
				const {code, data:brandList = []} = result;
				const progress = code === 200 ? 'success' : 'fail';

                dispatch({
                    type:GET_BRAND_LIST,
					brandList,
					progress
                })
            });
    }
}

//添加品牌接口
export function addBrand(payload) {
	return dispatch =>
    {
		dispatch({ type:GET_PROGRESS, progress: 'loading' });
        return api.post(Interface.addBrand, payload)
            .then( result => {
				const {code, data:newItemInfo = {}} = result;
				const progress = code === 200 ? 'success' : 'fail';

                dispatch({
                    type:ADD_BRAND,
					newItemInfo,
					progress
                })
            });
    }
}

//修改品牌接口
export function editBrand(payload) {
	return dispatch =>
    {
		dispatch({ type:GET_PROGRESS, progress: 'loading' });
        return api.post(Interface.uodateBrand, payload)
            .then( result => {
				const {code, data:editItemInfo = {}} = result;
				const progress = code === 200 ? 'success' : 'fail';

                dispatch({
                    type:EDIT_BRAND,
                    editItemInfo: payload,
                    progress
                })
            });
    }
}
