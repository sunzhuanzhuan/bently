import React, { Component } from 'react'
import { Form, Input } from 'antd';
import PropTypes from 'prop-types'

const FormItem = Form.Item;

class PositiveNumber extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		field: PropTypes.string.isRequired
	}
	//正整数认证
	vailPositiveNumber = (rule, value, callback) => {
		const parent = /^[1-9][0-9]*$/
		if (!value || parent.test(value)) {
			callback();
		} else {
			callback(`${this.props.title}必须为正整数`);
		}
	}

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { title, field, getFieldDecorator,initialValue } = this.props
		return (
			<FormItem label={title}>
				{getFieldDecorator(field, {
					initialValue,
					rules: [{ validator: this.vailPositiveNumber }]
				})(<Input placeholder={`请输入${title}`} style={{width: '160px'}}/>)}
			</FormItem>
		);
	}
}

export default PositiveNumber;
