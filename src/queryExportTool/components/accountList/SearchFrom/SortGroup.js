import React, { Component } from "react"
import { } from 'antd'
import SortBtn from "@/queryExportTool/components/accountList/SearchFrom/SortBtn";
import { Icon } from "antd";
import { Cascader } from "antd";
import SortCascader from "./SortCascader";
import { parseUrlQuery } from '@/util/parseUrl'

export default class SortGroup extends Component {
	dataToParams = (key, sort) => {
		const { onSort } = this.props
		let params = {
			order: sort
		}
		if (/:/i.test(key)) {
			let [w, f] = key.split(/:/i)
			key = w
			params = {
				...params,
				filter: {
					skuTypeId: f
				}
			}
		}

		onSort && onSort({ accountSort: sort && { [key]: params } })
	}
	constructor(props) {
		super(props)
		let keyword = parseUrlQuery()['keyword'];
		this.state = {
			sort: keyword ? {} : (props.sorter.default || {}),
		}
		this.setSort.bind(this)
		this.dataToParams.bind(this)
		this.handleChange.bind(this)
	}
	handleChange = (field, sort) => {
		this.setState({ sort: { [field]: sort } })
		this.dataToParams(field, sort)
	}
	setSort = (sort) => {
		this.setState(sort)
	}
	reset = (clear) => {
		console.log("TCL: SortGroup -> reset -> clear", clear)
		this.setState({
			sort: (clear ? undefined : this.props.sorter.default) || {},
		})
		return { accountSort: (clear ? undefined : this.props.sorter.default) }
	}
	render() {
		const { sorter = {} } = this.props
		const { buttons = [], more = [], priceGoodBadList = [] } = sorter
		const { sort, } = this.state
		const propsSortCascader = {
			sorter: sorter,
			setSort: this.setSort,
			dataToParams: this.dataToParams,
		}
		return <div className='sorter-container'>
			{buttons.map(({ field, title, tip }) =>
				<SortBtn key={field} tip={tip} field={field} title={title} sort={sort[field]} onChange={this.handleChange} />)}
			{/* <SortCascader list={priceGoodBadList} seletedText='价格优劣' {...propsSortCascader} /> */}
			<SortCascader list={more} seletedText='更多排序' {...propsSortCascader} />
		</div>
	}
}
