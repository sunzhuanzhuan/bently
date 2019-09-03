import React, { Component } from "react"
import { } from 'antd'
import SortBtn from "@/queryExportTool/components/accountList/SearchFrom/SortBtn";
import { Icon } from "antd";
import { Cascader } from "antd";
import { parseUrlQuery } from '@/util/parseUrl'

export default class SortCascader extends Component {

	constructor(props) {
		super(props)
		this.state = {
			isDrop: false,
			moreText: props.seletedText
		}
	}

	changeMoreText = (value, selectedOptions) => {

		const text = selectedOptions[0].label + selectedOptions[1].label
		let valueArray = selectedOptions.map(o => o.value)
		this.setState({
			moreText: text
		})
		this.props.setSort({ sort: { [valueArray[0]]: valueArray[1] } })
		this.props.dataToParams(valueArray[0], valueArray[1])
	}

	render() {
		const { list = [], sort, isHighlight, seletedText } = this.props
		const { moreText } = this.state
		const selectOption = <span title={isHighlight ? moreText : seletedText} className='sorter-more-sort'><span>{isHighlight ? moreText : seletedText}</span> <Icon type={this.state.isDrop ? "up" : "down"} /></span>
		return <div className='sorter-container'>
			{list.length ? <Cascader
				onChange={this.changeMoreText}
				value={Object.entries(sort)[0]}
				getPopupContainer={() => document.querySelector('.query-export-tool')}
				options={list}
				expandTrigger={'hover'}
				popupClassName={'pop-more-sort'}
				onPopupVisibleChange={value => {
					this.setState({ isDrop: value })
					// value && setTimeout(() => document.querySelector('.pop-more-sort').style.left = 'auto')
				}}
			>
				{isHighlight ? <a>{selectOption}</a> : selectOption}
			</Cascader> : null}
		</div>
	}
}
