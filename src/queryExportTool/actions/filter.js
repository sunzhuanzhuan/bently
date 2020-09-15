import Interface from '../constants/Interface'
// import { createHttpAction } from 'redux-action-extend'
import createHttpAction from '@/store/createHttpAction'
import api from '../../api/index'

// 视频/直播平台类型
const VIDEO_PLATFORM_TYPE = "3";
// b站平台类型
const BILI_PLATFORM_TYPE = '7';
// 抖音平台类型
const DOUYIN_PLATFORM_TYPE = "8";

//获取账号列表信息
const getGroupById = (groups, groupType) => {
    if (groupType === BILI_PLATFORM_TYPE || groupType === DOUYIN_PLATFORM_TYPE) {
        groupType = VIDEO_PLATFORM_TYPE;
    }
    return groups.find(group => group.groupId == groupType)
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
    return api.get(Interface.getFilters, {
        params:params
    }).then((data) => {
        data = data.data;
        const {groups, groupedCategories, orderIndustryCategory, groupedSkuTypes = {}, kolProvinceList, kolInterestList, defaultHotCities} = data;
        // B站和抖音默认成视频/直播的skuTypes
        groupedSkuTypes[BILI_PLATFORM_TYPE] = groupedSkuTypes[VIDEO_PLATFORM_TYPE];
        groupedSkuTypes[DOUYIN_PLATFORM_TYPE] = groupedSkuTypes[VIDEO_PLATFORM_TYPE];
        const operationTags = data.operationTags
        const group = getGroupById(groups, groupType)
        // if (version !== params.version) {
        // 	return;
        // }
        dispatch({
            type: getFilters_success,
            payload: {
                [groupType]: {
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
