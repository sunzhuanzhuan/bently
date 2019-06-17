import React, { Component } from 'react'
import { Input } from 'antd';
class InputArr extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	changeInput = (e) => {
		const { onChange } = this.props
		const value = e.target.value.split(' ')
		onChange && onChange(value)
	}
	render() {
		const { placeholder } = this.props
		return (
			<Input onChange={this.changeInput} placeholder={placeholder} />
		);
	}
}

export default InputArr;
