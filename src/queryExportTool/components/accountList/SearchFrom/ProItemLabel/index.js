import React from 'react';
import MoreOperate from "../../../common/MoreOperate";
import {
    setBorderRadius,
    getFirstIsSelected,
    getSelectedInfo,
    getChildrenIsSelected,
    checkSelectNum,
    selectedToNames,
    del,
    selectedHandle
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
     */
    getCurItemData = (code) => {
        const {data = []} = this.props;
        return data.find(item => item.code === Number(code)) || {};
    };

    /**
     * 鼠标进入事件
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
     */
    setBorderRadius = (e, isHasRadius = true) => {
        const target = e.target;
        let id = target.getAttribute('id');
        setBorderRadius(id, isHasRadius);
    };

    /**
     * 获取一级菜单是否选中
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
     */
    selectedToNames = (selected = []) => {
        const {data} = this.props;
        return selectedToNames(selected, data);
    };

    /**
     * 删除某个一级菜单的选中项
     */
    del = (firstCode, code, isLevel2, selected) => {
        del(firstCode, code, isLevel2, selected);
    }

    /**
     * 选择单击事件
     */
    selected = (firstCode, level2Code, childData, isLevel2 = true, event) => {
        event.stopPropagation(); // 阻止冒泡
        const {selected = [], onChange} = this.props;
        selectedHandle(firstCode, level2Code, childData, isLevel2,selected);
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
