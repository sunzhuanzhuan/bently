import React from "react"
import '../base/SimpleTag.less'
import { Input, Button, InputNumber } from 'antd';

const InputGroup = Input.Group;
const fixStyle = {
	color: 'rgba(0, 0, 0, 0.65)',
	padding: '0 11px',
	background: '#fafafa'
}

class GenderPercent extends React.Component {
	state = {
		value: this.props.value || [50, 50]
	}

	handleChange = index => n => {
		console.log(n);
		if (isNaN(parseFloat(n))) return
		let _val = parseFloat(n)
		let value = [...this.state.value]
		value[index] = _val
		// value[1 - index] = 100 - _val
		this.setState({ value }, () => {
			this.props.onChange(value)
		})
	}

	render() {
		let [male, female] = this.state.value
		return <div>
			<InputGroup compact style={{ width: '162px', marginRight: '28px' }}>
				<Button disabled style={fixStyle}>男</Button>
				<InputNumber max={100} min={0} precision={0} value={male} step={1} onChange={this.handleChange(0)} />
				<Button disabled style={fixStyle} className='right-fix-btn'>%</Button>
			</InputGroup>
			<InputGroup compact style={{ width: '162px' }}>
				<Button disabled style={fixStyle}>女</Button>
				<InputNumber max={100} min={0} precision={0} step={1} value={female}  onChange={this.handleChange(1)}/>
				<Button disabled style={fixStyle} className='right-fix-btn'>%</Button>
			</InputGroup>
		</div>
	}

}

export default GenderPercent
