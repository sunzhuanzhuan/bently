import { GET_PROGRESS, ADD_BRAND, EDIT_BRAND, GET_BRAND_LIST } from "../constants/ActionTypes";
let listData = [], progress;
//品牌管理reducer
export function brandManageReducer(state = {}, action) {
    switch (action.type) {
        case GET_PROGRESS:
            return { ...state, progress: action.progress };

        case GET_BRAND_LIST: 
            const { brandList = [] } = action;
            listData = brandList;

            return { ...state, brandList, progress: action.progress};

        case ADD_BRAND:
            const { newItemInfo = {} } = action;
            progress = action.progress;

            if(progress === 'success')
                listData.unshift(newItemInfo);
            
            return { ...state, brandList: listData, progress };

        case EDIT_BRAND:
            const { editItemInfo = {} } = action;
            progress = action.progress;

            if(progress === 'success') {
                const editIndex = listData.findIndex( item => item.id === editItemInfo.id );
                if(editIndex > -1)
                    listData.splice(editIndex, 1, editItemInfo);
            }
            return { ...state, brandList: listData, progress };

        default:
            return state;
    }
}
