import React, { Component } from 'react'
import { Input } from 'antd';
class InputArr extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value
		};
	}
	componentDidMount = () => {
		this.setState({
			value: this.props.value && this.props.value.join(' ')
		})
	}
	componentWillReceiveProps(nextProps) {
		if ("value" in nextProps) {
			this.setState({
				value: nextProps.value && nextProps.value.join(' ') || undefined
			})
		}
	}
	changeInput = (e) => {
		const { onChange } = this.props
		const value = e.target.value.split(' ')
		this.setState({
			value: e.target.value
		})
		onChange && onChange(value)
	}
	render() {
		const { placeholder } = this.props
		return (
			<Input onChange={this.changeInput} placeholder={placeholder} value={this.state.value} />
		);
	}
}

export default InputArr;
