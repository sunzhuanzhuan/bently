import React, { Component } from "react"
import { Menu, Dropdown, Icon } from 'antd'
import { sortDropTypes } from '@/queryExportTool/constants/sort'

export function createMenuTree(list, sources) {
	return list.map(key => {
		let { name, child = [] } = sources[key]
		return child.length ? <Menu.SubMenu title={name} key={key}>
			{createMenuTree(child)}
		</Menu.SubMenu> : <Menu.Item key={key}>{name}</Menu.Item>
	})
}

export default class SortDrop extends Component {
	state = {
		value: '0',
		isDrop: false
	}

	reset = () => {
		this.setState({
			value: '0',
			isDrop: false
		})
		return { [this.props.field]: undefined }
	}

	render() {
		const { title = '上下架类型', prefix = 'shelf', lists, field } = this.props
		const types = sortDropTypes[prefix + 'Type'] || {}
		const list = lists ? lists : sortDropTypes[prefix + 'DefaultList'] || []
		const { value } = this.state
		const menu = (
			<Menu onClick={({ key }) => {
				this.setState({ value: key }, () => {
					this.props.onSelect && this.props.onSelect(field, key)
				})
			}} selectedKeys={[value]}>
				{createMenuTree(list, types)}
			</Menu>)

		const selectOption = <span>{types[value]['name']} <Icon type={this.state.isDrop ? "up" : "down"} /></span>
		return <div className='sort-drop-down-wrap'>
			<span>{title}</span>：
			<Dropdown overlay={menu} trigger={['click']} onVisibleChange={visible => this.setState({ isDrop: visible })}>
				<span className='sort-drop-down-tap'>
					{types[value]['name'] != '不限' ? <a>{selectOption}</a> : selectOption}
				</span>
			</Dropdown>
		</div>
	}
}
