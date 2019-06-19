import Interface from '../constants/Interface'
import { GET_PROGRESS, ADD_BRAND, EDIT_BRAND, GET_BRAND_LIST, GET_MAIN_BRAND_LIST, GET_INDUSTRY_LIST } from '../constants/ActionTypes';
import api from '../../api/index';
//获取品牌列表
export function getBrandManageList(param) {
	return dispatch =>
    {
		dispatch({ type:GET_PROGRESS, progress: 'loading' });

        return api.get(`${Interface.getBrandManageList}?${param}`)
            .then( result => {
				const { data: { list = [], total } } = result;

                dispatch({
                    type:GET_BRAND_LIST,
                    brandList: list,
                    total,
					progress: 'success'
                })
            })
            .catch( () => {
                dispatch({
                    type:GET_BRAND_LIST,
                    brandList: [],
                    total: 0,
					progress: 'fail'
                })
            });
    }
}

//获取主品牌列表
export function getMainBrandList() {
	return dispatch =>
    {
        return api.get(Interface.getMainBrandList)
            .then( result => {
                const { data = [] } = result;
                const mainBrandList = data.map(item => ({id: item.brand_parent_code, value: item.brand_name, industry: item.industry_code}));

                dispatch({
                    type:GET_MAIN_BRAND_LIST,
					mainBrandList
                })
            });
    }
}

//获取行业列表
export function getIndustryList() {
	return dispatch =>
    {
        return api.get(Interface.getIndustryList)
            .then( result => {
                const { data: { list = [] } } = result;
                const IndustryList = list.map(item => ({id: item.code, value: item.name}));
                dispatch({
                    type:GET_INDUSTRY_LIST,
					IndustryList
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
				const { data:newItemInfo } = result;

                dispatch({
                    type:ADD_BRAND,
					newItemInfo,
					progress: 'success'
                })
            })
            .catch( () => {
                dispatch({
                    type:ADD_BRAND,
					progress: 'fail'
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
				const { data:editItemInfo = [] } = result;

                dispatch({
                    type:EDIT_BRAND,
                    editItemInfo,
                    progress: 'success'
                })
            })
            .catch( () => {
                dispatch({
                    type:EDIT_BRAND,
					progress: 'fail'
                })
            });
    }
}
