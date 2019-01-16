import React from "react"
import '../base/SimpleTag.less'
import { Input, Button, Select } from 'antd';
import { cityMap } from '../constants/city'

const InputGroup = Input.Group;
const Option = Select.Option;

const fixStyle = {
	color: 'rgba(0, 0, 0, 0.65)',
	padding: '0 11px',
	background: '#fafafa'
}

class TopCity extends React.Component {
	state = {
		value: this.props.value || Array(3).fill(undefined)
	}

	handleSelect = index => n => {
		let _val = n || 0
		let value = [...this.state.value]
		value[index] = _val
		this.setState({ value }, () => {
			this.props.onChange(value)
		})
	}

	constructor(props) {
		super(props)
		this.cityList = Object.entries(cityMap)
	}

	render() {
		const { value } = this.state
		const [top1, top2, top3] = value
		const cityList = this.cityList.map(([id, text]) =>
			<Option disabled={!!value.find(key => String(id) === String(key))} key={id}>{text}</Option>)
		return <div>
			<InputGroup compact style={{ width: '186px', marginRight: '28px' }}>
				<Button disabled style={fixStyle}>TOP1</Button>
				<Select
					showSearch
					allowClear
					style={{ width: 120 }}
					placeholder="选择城市"
					defaultValue={cityMap[top1]}
					optionFilterProp="children"
					onChange={this.handleSelect(0)}
				>
					{cityList}
				</Select>
			</InputGroup>
			<InputGroup compact style={{ width: '186px', marginRight: '28px' }}>
				<Button disabled style={fixStyle}>TOP2</Button>
				<Select
					showSearch
					allowClear
					style={{ width: 120 }}
					placeholder="选择城市"
					defaultValue={cityMap[top2]}
					optionFilterProp="children"
					onChange={this.handleSelect(1)}
				>
					{cityList}
				</Select>
			</InputGroup>
			<InputGroup compact style={{ width: '186px', marginRight: '28px' }}>
				<Button disabled style={fixStyle}>TOP3</Button>
				<Select
					showSearch
					allowClear
					style={{ width: 120 }}
					placeholder="选择城市"
					defaultValue={cityMap[top3]}
					optionFilterProp="children"
					onChange={this.handleSelect(2)}
				>
					{cityList}
				</Select>
			</InputGroup>
		</div>
	}

}

export default TopCity
