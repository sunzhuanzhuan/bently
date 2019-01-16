import React, { Component } from "react"
import { Select } from 'antd'
import { connect } from "react-redux";
import * as actions from '../../actions'

const Option = Select.Option

@connect(state => state.extensionNumber, actions)
export default class MediaManagerSelect extends Component {
	// componentWillMount() {
	// 	let { getMediaManagerList, mediaManagerList } = this.props
	// 	if (mediaManagerList <= 0) {
	// 		getMediaManagerList()
	// 	}
	// }


	// filterGroup = val => {
	// 	const { group } = this.props
	// 	if (!isNaN(group)) {
	// 		return parseInt(val) === parseInt(group)
	// 	} else if (Array.isArray(group)) {
	// 		return group.some(item => val.some(i => parseInt(item) === parseInt(i)))
	// 	} else {
	// 		return true
	// 	}
	// }

	render() {
		const { mediaManagerList, group } = this.props
		let mediaManagerListArray = mediaManagerList[group]
		return (
			<Select allowClear
				optionFilterProp="children"
				showSearch
				placeholder={this.props.exnum ? this.props.exnum : '选择媒介经理'}
				className='w130' {...this.props}
			>
				{
					Object.keys(mediaManagerList).length !== 0 ?
						mediaManagerListArray.map(({ user_id, real_name }) => {
							return <Option key={user_id}>{real_name}</Option>
						}) : null
				}
			</Select>
		)
	}
}

