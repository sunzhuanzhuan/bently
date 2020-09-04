import React from 'react';
import MoreOperate from "../../../common/MoreOperate";
import {
    setBorderRadius,
    getFirstIsSelected,
    getSelectedInfo,
    getChildrenIsSelected,
    checkSelectNum,
    selectedToNames,
    del
} from './utils';
import './index.less';

class ProItemLabel extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            scrollContainer: null, // 滚动容器
            itemData: {},
            popover: {
                show: false,
                width: 0,
                top: 0,
                left: 0
            }
        }
    }

    static LEVEL_2 = 'level2';
    static LEVEL_3 = 'level3';

    componentWillMount() {
        const scrollContainer = document.getElementById('app-content-children-id');
        this.setState({
            scrollContainer: scrollContainer
        });
        scrollContainer.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        this.state.scrollContainer.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        let show = this.state.popover.show;
        show && this.setState({
            popover: {
                show: false
            }
        });
    }


    /**
     * 获取item
     * @param id
     * @returns {*|*[]}
     */
    getCurItemData = (code) => {
        const {data = []} = this.props;
        return data.find(item => item.code === Number(code)) || {};
    };


    /**
     * 鼠标进入事件
     * @param e
     */
    onMouseEnter = (e) => {
        const target = e.target;
        // 一级菜单是否选中
        const id = target.getAttribute('id');
        let popover = {
            show: true
        };
        if (id) {
            let rect = target.getBoundingClientRect();
            let offsetWidth = target.offsetWidth;
            let top = rect.top;
            let left = rect.left;
            let height = target.offsetHeight;
            popover.top = top + height;
            popover.left = left;
            popover.width = offsetWidth;
        }
        this.setBorderRadius(e, false);
        this.setState({
            popover: popover
        }, () => {
            if (id) {
                // itemData 赋值
                const itemData = this.getCurItemData(id);
                this.setState({
                    itemData: itemData
                });
            }
        });
    }

    /**
     * 鼠标离开事件
     */
    onMouseLeave = (e) => {
        this.setBorderRadius(e, true);
        this.setState({
            popover: {
                show: false
            }
        });
    };

    /**
     * 设置一级label的border-radius样式
     * @param e
     * @param isHasRadius
     */
    setBorderRadius = (e, isHasRadius = true) => {
        const target = e.target;
        let id = target.getAttribute('id');
        setBorderRadius(id, isHasRadius);
    };

    /**
     * 获取一级菜单是否选中
     * @returns {boolean}
     */
    getFirstIsSelected = (code) => {
        let {selected = []} = this.props;
        return getFirstIsSelected(code, selected);
    }

    /**
     * 一级菜单单击事件
     */
    firstClick = (code) => {
        const {selected, onChange} = this.props;
        const selectedInfo = getSelectedInfo(code, selected);
        // info 存在说明该一级菜单已经存在选择项，则删除该一级菜单
        if (selectedInfo.info) {
            const index = selectedInfo.index;
            if (onChange && typeof onChange === 'function') {
                selected.splice(index, 1);
            }
        } else {
            if (!checkSelectNum(selected)) {
                return;
            }
            selected.push({[code]: {}});
        }
        onChange(selected, this.selectedToNames(selected));
    };

    /**
     * selected to names
     * @param selected
     */
    selectedToNames = (selected = []) => {
        const {data} = this.props;
        return selectedToNames(selected, data);
    };

    /**
     * 删除某个一级菜单的选中项
     * @param firstCode
     * @param code
     * @param isLevel2
     * @param selected
     */
    del = (firstCode, code, isLevel2, selected) => {
        del(firstCode, code, isLevel2, selected);
    }

    /**
     * 选择单击事件
     * @param firstCode - 一级菜单code
     * @param level2Code - 二级菜单code
     * @param childData - 子级菜单Data
     * @param isLevel2 - 是否是二级菜单
     */
    selected = (firstCode, level2Code, childData, isLevel2 = true, event) => {
        event.stopPropagation(); // 阻止冒泡
        const {selected = [], onChange} = this.props;
        let childCode = childData.code;
        let selectedInfo = getSelectedInfo(firstCode, selected);
        let info = selectedInfo.info;
        let level = isLevel2 ? ProItemLabel.LEVEL_2 : ProItemLabel.LEVEL_3;

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
                this.del(firstCode, childCode, isLevel2, selected);
            } else {
                // 没有被选中则添加到对应的level数组中
                levelData.push(childCode);

                if (isLevel2) {
                    let level2Children = childData.children || [];
                    level2Children.forEach(item => {
                        this.del(firstCode, item.code, false, selected);
                    });
                } else {
                    // isLevel3 如果二级有选中的话则删除该项二级
                    this.del(firstCode, level2Code, true, selected);
                }

            }
        }
        if (onChange && typeof onChange === 'function') {
            let names = this.selectedToNames(selected);
            onChange(selected, names);
        }
    };

    /**
     * 渲染二级
     */
    renderSecond = (data = {}) => {
        const {selected} = this.props;
        let children = data.children || [];
        return (
            <ul>
                {
                    children.map(item => <li
                        key={item.code}
                        className={getChildrenIsSelected(data.code, item.code, true, selected) ? 'selected' : ''}
                        onClick={this.selected.bind(null, data.code, item.code, item, true)}>
                        <span>{item.name || ''}</span>
                        {
                            item.children && this.renderThree(data, item)
                        }
                    </li>)
                }
            </ul>
        );
    };

    /**
     * 渲染三级菜单
     * @param firstData - 一级菜单data
     * @param data
     * @returns {*}
     */
    renderThree = (firstData, data = {children: []}) => {
        const {selected} = this.props;
        return (
            <ul>
                {
                    data.children.map(item => <li
                        key={item.code}
                        className={getChildrenIsSelected(firstData.code, item.code, false, selected) ? 'selected' : ''}
                        onClick={this.selected.bind(null, firstData.code, data.code, item, false)}
                    >{item.name || ''}</li>)
                }
            </ul>
        );
    };


    render() {
        let {data = []} = this.props;
        return (
            <div className='pro-item-label'>
                <MoreOperate lineHight={40}>
                    <ul className='pro-container'>
                        {
                            data.map(item => <li
                                key={item.code}
                                id={item.code}
                                className={this.getFirstIsSelected(item.code) ? 'selected' : ''}
                                onClick={this.firstClick.bind(null, item.code)}
                                onMouseEnter={this.onMouseEnter}
                                onMouseLeave={this.onMouseLeave}>
                                {item.name || ''}
                            </li>)
                        }
                    </ul>
                </MoreOperate>
                <div className='pro-item-label-popover' onMouseEnter={this.onMouseEnter} style={{
                    display: this.state.popover.show ? 'block' : 'none',
                    top: this.state.popover.top + 'px',
                    left: this.state.popover.left + 'px',
                }}>
                    <div className='item-container' onMouseLeave={this.onMouseLeave} style={{
                        minWidth: this.state.popover.width + 'px'
                    }}>
                        {
                            this.renderSecond(this.state.itemData)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ProItemLabel;
