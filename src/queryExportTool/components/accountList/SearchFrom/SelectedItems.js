/*
 * @Descripttion: 
 * @Author: wangxinyue
 * @Date: 2020-03-04 15:56:23
 */
import React from 'react';
import './index.less';
// import moment from 'moment';
import {Tag, DatePicker, Button, Popover, Icon, message} from 'antd';
import {objectToArray} from '@/util'
import qs from 'qs'

class SelectedItems extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedItems: {}
        }
    }

    clear = (id = '') => {
        const {clear} = this.props;
        // const _selectedItems = this.state.selectedItems;
        // delete _selectedItems[id];
        // this.setState({ selectedItems: _selectedItems })
        // this.MoreFilterNode && this.MoreFilterNode.clear(id);
        // this.props.resetFilter(id);
        // this.props.onFilter();
        clear && clear(id);
    }

    /**
     * 删除内容分类
     */
    delContent = (firstCode, item) => {
        let {delContent} = this.props;
        if (delContent && typeof delContent === 'function') {
            delContent(firstCode, item.code, item.isLevel2);
        }
    };

    renderArray = (item) => {
        let {id, value} = item;
        if (typeof value === 'string') {
            return value ? <Tag
                className='ant-tag-theme-thin ant-tag-checkable-checked'
                key={item.id}
                closable
                onClose={() => this.clear(id)}
            >{value}</Tag> : null
        } else if (Array.isArray(value)) {
            return (
                <label>
                    {
                        value.map(item => (
                            <div className='selected-items' key={item.firstId}>
                                {
                                    (item.children || []).map(cItem => (
                                        <span key={cItem.id}>
											<label>{cItem.namePath || ''}</label>
											<Icon type="close" onClick={this.delContent.bind(null, item.firstCode, cItem)}/>
										</span>
                                    ))
                                }
                            </div>
                        ))
                    }
                </label>
            );
        }
    }
    // clear = () => {
    // 	const { clear } = this.props;
    // 	this.setState({
    // 		selectedItems: {}
    // 	})
    // 	clear && clear();

    // 	// this.MoreFilterNode && this.MoreFilterNode.reset();
    // 	// this.props.resetFilter();
    // 	// this.props.onFilter();
    // }
    render() {
        const {selectedItems} = this.props;
        const selectedItemsArray = objectToArray(selectedItems);
        return selectedItemsArray.length > 0 && <div className="filter-common-selected-items">
            已选：{
            selectedItemsArray.map(item => this.renderArray(item))
        }
            <a href="javascript:void(0)"
               style={{marginLeft: '10px'}}
               onClick={() => this.clear()}
            >清空</a>
        </div>
    }
}

export default SelectedItems;
