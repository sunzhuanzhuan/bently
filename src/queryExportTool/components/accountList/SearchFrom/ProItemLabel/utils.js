import { message } from 'antd';
const LEVEL_2 = 'level2';
const LEVEL_3 = 'level3';


/**
 * 通过id给目前元素设置Radius样式
 */
export const setBorderRadius = (id, isHasRadius = true) => {
    if (!id) {
        return;
    }
    const ele = document.getElementById(id);
    if (!ele) {
        return;
    }
    if (isHasRadius) {
        ele.style.borderRadius = '4px';
    } else {
        ele.style.borderRadius = '0';
    }
};

/**
 * 获取一级菜单是否选中
 * @returns {boolean}
 */
export const getFirstIsSelected = (code, selected = []) => {
    if (!code) {
        return false;
    }
    let item = selected.find(item => {
        let key = Number(Object.keys(item)[0]);
        return key === code;
    });
    return !!item;
}

/**
 * 通过一级code获取选中的信息
 */
export const getSelectedInfo = (code, selected = []) => {
    let index = selected.findIndex(item => {
        let key = Object.keys(item)[0];
        return Number(key) === code;
    });
    return index < 0 ? {index: -1, info: null} : {index: index, info: selected[index]};
};

/**
 * 获取子级菜单是否选中
 * @param firstCode - 一级菜单code
 * @param childrencode - 子级菜单code
 * @param isLevel2 - 是否是二级菜单
 */
export const getChildrenIsSelected = (firstCode, childrenCode, isLevel2, selected = []) => {
    let info = getSelectedInfo(firstCode, selected).info;
    if (!info) {
        return false;
    }
    let codes = [];
    if (isLevel2) {
        codes = info[firstCode][LEVEL_2];
    } else {
        codes = info[firstCode][LEVEL_3];
    }
    return codes && codes.includes(childrenCode);
};

/**
 * 验证选择数量
 */
export const checkSelectNum = (selected = []) => {
    let maxSelectNum = 3;
    if (selected.length >= 3) {
        message.error('内容标签最多选择三个');
        return false;
    }
    return true;
};

/**
 * 树形数据结构转换为对象
 */
export const treeDataToObj = (code, data = []) => {
    let info = data.find(item => item.code === code);
    if (info) {
        let result = {};
        let firstName = info.name;
        result[code] = firstName;
        let level2Data = info.children || [];
        // 二级菜单
        level2Data.forEach(item => {
            let level2Code = item.code;
            let level2Name = item.name;
            let level3Data = item.children;
            result[level2Code] = `${firstName}:${level2Name}`;
            if (level3Data) {
                level3Data.forEach(l3Item => {
                    let level3Code = l3Item.code;
                    let level3Name = l3Item.name;
                    result[level3Code] = `${firstName}:${level2Name}:${level3Name}`;
                });
            }
        });
        return result;
    }
    return null;
}

/**
 * selected to names
 */
export const selectedToNames = (selected = [], data = []) => {
    let result = [];
    selected.forEach(item => {
        let firstCode = Number(Object.keys(item)[0]);
        let resultInfo = {firstCode: firstCode, children: []};
        let namesInfo = treeDataToObj(firstCode, data) || {};
        let level2Data = item[firstCode][LEVEL_2];
        if (level2Data) {
            level2Data.forEach(code => {
                let childInfo = {isLevel2: true, code: code, namePath: namesInfo[code]};
                resultInfo.children.push(childInfo);
            });
        }
        let level3Data = item[firstCode][LEVEL_3];
        if (level3Data) {
            level3Data.forEach(code => {
                let childInfo = {isLevel2: false, code: code, namePath: namesInfo[code]};
                resultInfo.children.push(childInfo);
            });
        }

        // level2 和 level3 都不存在
        if (!level2Data && !level3Data) {
            resultInfo.children.push({code: firstCode, namePath: namesInfo[firstCode]});
        }

        result.push(resultInfo);
    });
    return result;
};

/**
 * 删除某一个选中项
 */
export const del = (firstCode, code, isLevel2, selected) => {
    let selectedInfo = getSelectedInfo(firstCode, selected);
    let info = selectedInfo.info;
    let selectedIndex = selectedInfo.index;
    if (!info) {
        return;
    }
    // 说明只是选中了一级菜单
    if (firstCode === code) {
        selected.splice(selectedIndex, 1);
        return;
    }
    let level = isLevel2 ? LEVEL_2 : LEVEL_3;
    let item = info[firstCode];
    let levelData = item[level] || [];
    let index = levelData.findIndex(cCode => cCode === code);
    if (index < 0) {
        return;
    }
    // 取消该项的选中
    levelData.splice(index, 1);
    // 说明该一级菜单中对应级别已没有选中项
    if (levelData.length <= 0) {
        // 删除某个level
        delete item[level];
        // level2 和 level3 都不存在说明该一级菜单已没有选中的项
        if (!item[LEVEL_2] && !item[LEVEL_3]) {
            // 从selected中删除该一级菜单
            selected.splice(selectedIndex, 1);
        }
    }
}

/**
 * 选择单击事件处理逻辑
 */
export const selectedHandle = (firstCode, level2Code, childData = {}, isLevel2 = true, selected = []) => {
    let childCode = childData.code;
    let selectedInfo = getSelectedInfo(firstCode, selected);
    let info = selectedInfo.info;
    let level = isLevel2 ? LEVEL_2 : LEVEL_3;

    // info 不存在说明此一级菜单下还没有选中的项
    if (!info) {
        if (!checkSelectNum(selected)) {
            return;
        }
        let item = {[firstCode]: {[level]: [childCode]}};
        selected.push(item);
    } else {
        let item = info[firstCode];
        let levelData = item[level];
        if (!levelData) {
            levelData = [];
            item[level] = levelData;
        }

        // 说明该项已经被选中
        if (levelData.includes(childCode) > 0) {
            del(firstCode, childCode, isLevel2, selected);
        } else {
            // 没有被选中则添加到对应的level数组中
            levelData.push(childCode);

            if (isLevel2) {
                let level2Children = childData.children || [];
                level2Children.forEach(item => {
                    del(firstCode, item.code, false, selected);
                });
            } else {
                // isLevel3 如果二级有选中的话则删除该项二级
                del(firstCode, level2Code, true, selected);
            }
        }
    }
};