import React, { Component } from "react"
import { Dropdown, Cascader, Checkbox, Divider, Icon } from 'antd'
import './AccountSort.less'
import SortDrop from "@/queryExportTool/components/accountList/SearchFrom/SortDrop";
import SortGroup from "@/queryExportTool/components/accountList/SearchFrom/SortGroup";
import { groupBySorter } from '../../../constants/sort'


export default class AccountSort extends Component {
	selectDrop = (key, val) => {
		this.setState({ [key]: val })
		this.sendParams({ [key]: val })
	}
	checked = e => {
		let key = e.target.name
		let val = e.target.checked ? 1 : 0
		this.setState({ [key]: val })
		this.sendParams({ [key]: val })
	}
	sort = (a) => {
		this.setState(a)
		this.sendParams(a)
	}
	sendParams = params => {
		const { onChange } = this.props
		let newParams = { ...this.state, ...params }
		// 过滤0的值
		for (let key in newParams) {
			if (!newParams.hasOwnProperty(key)) continue
			newParams[key] = (newParams[key] == 0) ? undefined : newParams[key]
		}
		onChange && onChange(newParams)
	}

	componentWillMount() { }

	render() {
		const { group = '1' } = this.props
		const { filter, sorter } = groupBySorter[group]
		const { drop, check } = filter
		return <div className='account-header-sort-container'>
			<section className='sort-base-items'>
				{drop.map(item =>
					<SortDrop key={item.field} {...item} onSelect={this.selectDrop} />)}
				{/*<SortDrop title='执行类型' prefix='comply' field='is_famous' onSelect={this.selectDrop} />*/}
				{check.map(({ title, name }) =>
					<Checkbox key={name} name={name} onChange={this.checked}>{title}</Checkbox>)}
			</section>
			<Divider type="vertical" />
			<section className='sort-diff-items'>
				<SortGroup sorter={sorter} onSort={this.sort} />
			</section>
		</div>
	}
}
