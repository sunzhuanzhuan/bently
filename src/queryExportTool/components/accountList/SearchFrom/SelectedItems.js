/*
 * @Descripttion: 
 * @Author: wangxinyue
 * @Date: 2020-03-04 15:56:23
 */
import React from 'react';
// import moment from 'moment';
import { Tag, DatePicker, Button, Popover, Icon, message } from 'antd';
import { objectToArray } from '@/util'
import qs from 'qs'
class SelectedItems extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedItems: {}
		}
	}
	clear = (id = '') => {
		const { clear } = this.props;
		// const _selectedItems = this.state.selectedItems;
		// delete _selectedItems[id];
		// this.setState({ selectedItems: _selectedItems })
		// this.MoreFilterNode && this.MoreFilterNode.clear(id);
		// this.props.resetFilter(id);
		// this.props.onFilter();
		clear && clear(id);
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
		const { selectedItems } = this.props;
		const selectedItemsArray = objectToArray(selectedItems);
		return selectedItemsArray.length > 0 && <div className="filter-common-selected-items">
			已选：{
				selectedItemsArray.map(item => {
					return item.value ? <Tag
						className='ant-tag-theme-thin ant-tag-checkable-checked'
						key={item.id}
						closable
						onClose={() => this.clear(item.id)}
					>{item.value}</Tag> : null
				})
			}
			<a href="javascript:void(0)"
				style={{ marginLeft: '10px' }}
				onClick={() => this.clear()}
			>清空</a>
		</div>
	}
}

export default SelectedItems;
