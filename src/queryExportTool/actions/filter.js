import Interface from '../constants/Interface'
// import { createHttpAction } from 'redux-action-extend'
import createHttpAction from '@/store/createHttpAction'
import api from '../../api/index'
//获取账号列表信息
const getGroupById = (groups, groupType) => {
    if (groupType === '7' || groupType === '8') {
        groupType = '3';
    }
    return groups.find(group => group.groupId == groupType)
}
const getCategory = (groupedCategories, groupType) => {
    return groupedCategories.map(item => ({
        id: item.itemKey,
        name: item.itemValue
    }))
}
const getOrderIndustryCategory = (orderIndustryCategory = []) => {
    return orderIndustryCategory.map(item => ({
        ...item,
        id: item.code,
    }))
}
// let version = 0;
export const getFilters = (params) => (dispatch) => {
    let {groupType} = params;
    // version = params.version;
    return api.get(Interface.getFilters).then((data) => {
        data = data.data;
        const {groups, groupedCategories, orderIndustryCategory, groupedSkuTypes, kolProvinceList, kolInterestList, defaultHotCities} = data;
        const category = {
            name: '常见分类',
            options: getCategory(groupedCategories, groupType)
        }
        const operationTags = data.operationTags
        const group = getGroupById(groups, groupType)
        // if (version !== params.version) {
        // 	return;
        // }
        dispatch({
            type: getFilters_success,
            payload: {
                [groupType]: {
                    category,
                    operationTags,
                    group,
                    groupedSkuTypes: groupedSkuTypes,
                    orderIndustryCategory: getOrderIndustryCategory(orderIndustryCategory),
                    industryList: data.industryList,
                    kolProvinceList: kolProvinceList,
                    kolInterestList: kolInterestList,
                    defaultHotCities: defaultHotCities.map(item => ({
                        "key": String(item.areaId),
                        "title": item.areaName
                    })),
                    unitPlayPriceTypes: data.unitPlayPriceTypes,
                    unitReadPriceTypes: data.unitReadPriceTypes,
                    verifiedStatus: [
                        {value: "", name: "不限"},
                        ...data.verifiedStatus.map(item => ({value: item.id, name: item.name}))
                    ]
                }
            }
        })
    })
}

export const {
    getClassifications,
    getClassifications_success
} = createHttpAction('getClassifications', Interface.getClassifications);


export const {
    getFiltersMeta,
    getFiltersMeta_success
} = createHttpAction('getFiltersMeta', Interface.getFilters)

export const getFilters_success = 'getFilters_success';
