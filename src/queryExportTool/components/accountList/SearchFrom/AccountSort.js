/*
 * @Descripttion: 
 * @Author: wangxinyue
 * @Date: 2019-11-11 11:23:55
 */
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
	//点击其他排序操作
	sort = (a) => {
		//defaultSort==1其他查询 --U+新增
		const params = { ...a, defaultSort: 1 }
		this.setState(params)
		this.sendParams(params)
	}
	//点击默认排序操作
	checkDefult = () => {
		//0：默认选项，1：其他查询 --U+新增
		const { defaultSort } = this.state
		let params = { defaultSort: defaultSort == 1 ? 0 : 1 }
		//默认排序,清空其他排序
		if (defaultSort) {
			params = { ...params, accountSort: {} }
			this.reset()
		}
		this.setState(params)
		this.sendParams(params)
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
	reset = (clear) => {
		let params = {}
		const { filter } = groupBySorter[this.props.group || '1']
		const { check } = filter
		check.forEach(({ name }) => params[name] = undefined)
		for (let key in this.child) {
			if (!this.child.hasOwnProperty(key)) continue
			params = { ...params, ...this.child[key].reset(clear) }
		}
		this.setState(params)
		return params
	}

	constructor(props) {
		super(props);
		this.state = { ...groupBySorter[props.group || 1].filter.default }
		this.child = {}
		window.TEST = this.resetState
	}

	render() {
		const { group = '1', changTabNumber } = this.props
		const { filter, sorter } = groupBySorter[group]
		const changeSorter = sorter
		//changTabNumber == 1 ? sorter : { ...sorter, default: {},}
		const { drop, check } = filter
		const { defaultSort } = this.state
		return <div className='account-header-sort-container'>
			<section className='sort-base-items'>
				{drop.map(item =>
					<SortDrop ref={node => this.child['drop_' + item.field] = node} key={item.field} {...item} onSelect={this.selectDrop} />)}
				{/*<SortDrop title='执行类型' prefix='comply' field='is_famous' onSelect={this.selectDrop} />*/}
				{check.map(({ title, name }) =>
					<Checkbox checked={this.state[name] === 1} key={name} name={name} onChange={this.checked}>{title}</Checkbox>)}
			</section>
			<Divider type="vertical" />
			<section className='sort-diff-items'>
				<a onClick={this.checkDefult}
					style={{
						minWidth: 28, paddingTop: 1,
						color: defaultSort ? '#666' : ''
					}}>
					默认
				</a>
				<SortGroup ref={node => this.child.sortGroup = node} sorter={changeSorter} onSort={this.sort} />
			</section>
		</div>
	}
}
