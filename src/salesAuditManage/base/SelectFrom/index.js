import React, { Component } from 'react'
import { Form, Select } from 'antd';
import PropTypes from 'prop-types'

const Option = Select.Option;
const FormItem = Form.Item;

export default class SelectFrom extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		field: PropTypes.string.isRequired,
		listSelect: PropTypes.array,
		valueKey: PropTypes.string,
		labelKey: PropTypes.string
	}
	static defaultProps = {
		listSelect: [],
		valueKey: 'value',
		labelKey: 'label',
		placeholder: '请选择'
	}

	render() {
		const {
			title, field, getFieldDecorator, listSelect,
			valueKey, labelKey, initialValue,placeholder
		} = this.props
		return (
			<FormItem label={title}>
				{getFieldDecorator(field, {
					initialValue,
				})(
					<Select allowClear showSearch labelInValue optionFilterProp='children' placeholder={placeholder} style={{ minWidth: 150 }}>
						{listSelect.map(one => <Option key={one[valueKey]} value={one[valueKey]}>
							{one[labelKey]}
						</Option>)}
					</Select>
				)}
			</FormItem>
		);
	}
}

