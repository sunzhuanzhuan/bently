import Interface from '../constants/Interface'
import { createHttpAction } from '../../store/ajaxMiddleware'

//获取品牌列表
export const {
    getBrandManageList,
    getBrandManageList_success,

} = createHttpAction('getBrandManageList', Interface.getBrandManageList, {
    method: 'get'
});

//添加品牌接口
export const {
	addBrand,
	addBrand_success
} = createHttpAction('addBrand', Interface.addBrand, {
	method: 'post'
});

//修改品牌接口
export const {
	uodateBrand,
	uodateBrand_success
} = createHttpAction('uodateBrand', Interface.uodateBrand, {
	method: 'post'
});


