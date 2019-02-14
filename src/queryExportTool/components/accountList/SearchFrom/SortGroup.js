import React, { Component } from "react"
import { } from 'antd'
import SortBtn from "@/queryExportTool/components/accountList/SearchFrom/SortBtn";
import { Icon } from "antd";
import { Cascader } from "antd";


export default class SortGroup extends Component {
	dataToParams = (key, sort) => {
		const { onSort } = this.props
		if (/:/i.test(key)) {
			let [w, f] = key.split(/:/i)
			key = w
			sort = f + ":" + sort
		}
		onSort && onSort({ sort: sort && { [key]: sort } })
	}
	handleChange = (field, sort) => {
		this.setState({ sort: { [field]: sort }, moreText: '更多排序' })
		this.dataToParams(field, sort)
	}
	changeMoreText = (value, selectedOptions) => {
		let nameArray = selectedOptions.map(o => o.label)
		let valueArray = selectedOptions.map(o => o.value)
		this.setState({
			moreText: selectedOptions.length ? nameArray.join('') : '更多排序',
			sort: { [valueArray[0]]: valueArray[1] }
		})
		this.dataToParams(valueArray[0], valueArray[1])
	}
	reset = () => {
		this.setState({
			sort: this.props.sorter.default || {},
			moreText: '更多排序',
			isDrop: false
		})
		return { sort: this.props.sorter.default || {} }
	}

	constructor(props) {
		super(props)
		this.state = {
			sort: props.sorter.default || {},
			moreText: '更多排序',
			isDrop: false
		}
	}

	render() {
		const { sorter = {} } = this.props
		const { buttons = [], more = [] } = sorter
		const { sort, moreText } = this.state
		const selectOption = <span title={moreText} className='sorter-more-sort'><span>{moreText}</span> <Icon type={this.state.isDrop ? "up" : "down"} /></span>
		return <div className='sorter-container'>
			{buttons.map(({ field, title, tip }) =>
				<SortBtn key={field} tip={tip} field={field} title={title} sort={sort[field]} onChange={this.handleChange} />)}
			{more.length ? <Cascader
				onChange={this.changeMoreText}
				value={Object.entries(sort)[0]}
				getPopupContainer={() => document.querySelector('.query-export-tool')}
				options={more}
				expandTrigger={'hover'}
				popupClassName={'pop-more-sort'}
				onPopupVisibleChange={value => {
					this.setState({ isDrop: value })
					// value && setTimeout(() => document.querySelector('.pop-more-sort').style.left = 'auto')
				}}
			>
				{moreText != "更多排序" ? <a>{selectOption}</a> : selectOption}
			</Cascader> : null}
		</div>
	}
}
