import { GET_PROGRESS, ADD_BRAND, EDIT_BRAND, GET_BRAND_LIST, GET_MAIN_BRAND_LIST, GET_INDUSTRY_LIST } from "../constants/ActionTypes";
let listData = [], totalCount = 0, progress;
//品牌管理reducer
export function brandManageReducer(state = {}, action) {
    switch (action.type) {
        case GET_PROGRESS:
            return { ...state, progress: action.progress };

        case GET_BRAND_LIST:    //获取品牌列表
            const { brandList, total } = action;
            listData = brandList;
            totalCount = total

            return { ...state, brandList, totalCount, progress: action.progress};

        case GET_MAIN_BRAND_LIST:   //获取主品牌列表
            const { mainBrandList } = action;

            return { ...state, mainBrandList};

        case GET_INDUSTRY_LIST:   //获取行业列表
            const { IndustryList } = action;

            return { ...state, IndustryList};

        case ADD_BRAND:    //添加品牌
            const { newItemInfo = [] } = action;
            progress = action.progress;

            if(progress === 'success') {
                listData.unshift(newItemInfo[0]);
                totalCount += 1;
            }
            
            return { ...state, brandList: listData, totalCount, progress };

        case EDIT_BRAND:    //编辑品牌
            const { editItemInfo = [] } = action;
            progress = action.progress;

            if(progress === 'success') {
                const editIndex = listData.findIndex( item => item.id === editItemInfo[0].id );
                if(editIndex > -1)
                    listData.splice(editIndex, 1, editItemInfo[0]);
            }
            return { ...state, brandList: listData, progress };

        default:
            return state;
    }
}
