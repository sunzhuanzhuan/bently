import React, { Component } from 'react';
import { Input } from 'antd'
import './AccountKeyWord.less'
export default class Demo extends Component {
	constructor(props) {
		super(props)
		this.state = {
			value: props.value || []
		}
	}
	handleChange = (n) => (e) => {
		let val = e.target.value
		let newValue = [...this.state.value]
		newValue[n] = val
		this.setState({
			value: newValue
		}, () => {
			this.props.onChange && this.props.onChange(newValue)
		})
	}
	render() {
		const { value } = this.state
		return <div>
			<Input className='keyWord-input-or' type="text" value={value[0]}
				placeholder='包含这一行中任意关键词,词之间为“或关系”,用空格分隔（例 祛斑 提亮 美白）' onChange={this.handleChange(0)} />
			<Input className='keyWord-input-and' type="text" value={value[1]}
				placeholder='包含这一行中所有关键词,词之间为“且关系”,用空格分隔（例 澳洲 胶原蛋白）' onChange={this.handleChange(1)} />
		</div>
	}
}

