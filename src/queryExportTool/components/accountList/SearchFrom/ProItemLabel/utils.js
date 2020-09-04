/**
 * 获取当前选中的itemData
 * @param code
 * @param data
 * @returns {*|{}}
 */
export const getCurItemData = (code, data = []) => {
    return data.find(item => item.code === Number(code)) || {};
};