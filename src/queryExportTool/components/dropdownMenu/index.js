import React from 'react';
import { Dropdown, Icon, Menu } from 'antd';
//下拉框和文本框组件
import { default as SelectAndInput } from '../accountList/SearchFrom/SelectAndInput';
//树形穿梭框组件
import { default as TreeTransfer } from '../accountList/SearchFrom/TreeTransfer';

import WBYSelect from './WBYSelect'
import FilterNumberRangePicker from './FilterNumberRangePicker'

import { cityData } from '../../constants'
import * as util from '../../../util'
import './index.less'
const _map = {
	SelectAndInput,
	TreeTransfer,
	WBYSelect
}
class DropdownMenu extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			visible: false
		}
	}
	onVisibleChange = (visible) => {
		this.setState({ visible })
	}
	onMenuItemClick = (values, close = true) => {
		const { optionsValues, optionsNames } = values;
		const { id, name } = this.props;
		close && this.onVisibleChange(false);
		//处理业务逻辑
		this.props.onChange({ [id]: optionsValues }, { [id]: `${name}:${optionsNames}` })
	}
	render() {
		const { id, name, options = [], className, component = {} } = this.props;
		const { type } = component;
		const { visible } = this.state;
		const defaultMenu = (
			<Menu>
				{
					options.map((item) =>
						<Menu.Item
							onClick={() => this.onMenuItemClick({ optionsValues: item.value, optionsNames: item.name })}
							key={item.value}
						>{item.name}</Menu.Item>)
				}
			</Menu>
		);
		const C = util.type(type) == '[object Function]' ? type : _map[type];
		const menu = C ? <div className='dropdown-menu-content'>
			<C
				onChange={this.onMenuItemClick}
				onCancel={this.onVisibleChange}
				id={id}
				name={name}
				cityData={cityData}
				options={options} />
		</div> : defaultMenu;
		return <div className={className}>
			<Dropdown overlay={menu} visible={visible} trigger={['click']} onVisibleChange={this.onVisibleChange}>
				<span>{name}<Icon style={{ paddingLeft: '10px' }} type={visible ? 'up' : "down"} /></span>
			</Dropdown>
		</div>
	}
}
DropdownMenu.WBYSelect = WBYSelect;
DropdownMenu.FilterNumberRangePicker = FilterNumberRangePicker;

// export default DropdownMenu
