import React, { Component } from "react"
import { InputNumber, Popover } from 'antd'
import './index.less'
export default class CInputNumber extends Component {
	formatter = (value) => {
		if (/^(0?|[1-9][0-9]*)+(\.[0-9]*)?$/.test(value)) {
			this.preValue = value
			return value
		}
		return this.preValue
	}
	onChange = value => {

		const { max } = this.props
		this.setState({ isShowFalse: value > max });
		const _value = value > max ? max : value
		if (!('value' in this.props)) {
			this.setState({ value: _value });
		}
		this.props.onChange && this.props.onChange(_value);

	}

	constructor(props) {
		super(props)
		const value = props.value || 0
		this.preValue = value
		this.state = {
			value,
			isShowFalse: false
		}
	}

	componentWillReceiveProps(nextProps) {
		if ('value' in nextProps) {
			this.setState({ value: nextProps.value })
		}
	}

	render() {
		const { showFalseMessage } = this.props
		const { isShowFalse } = this.state
		return showFalseMessage && isShowFalse ?
			<Popover content={showFalseMessage} defaultVisible={true} overlayClassName='red-color'>
				<InputNumber {...this.props} formatter={this.formatter} onChange={this.onChange} value={this.state.value} />
			</Popover>
			: <InputNumber {...this.props} formatter={this.formatter} onChange={this.onChange} value={this.state.value} />
	}
}
