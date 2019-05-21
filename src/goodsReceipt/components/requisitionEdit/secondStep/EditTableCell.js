import React, { Component } from 'react'
import { Input, Icon, Form } from 'antd';
const FormItem = Form.Item
import "./EditTableCell.less";
class EditTableCell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value,
		};
	}

	handleChange = (e) => {
		const value = e.target.value;
		this.setState({ value });
	}
	check = () => {
		const { onChange } = this.props
		this.props.form.validateFields((err, values) => {
			if (!err) {
				onChange && onChange(values.price);
			}
		});
	}
	vailPrice = (rule, value, callback) => {
		const { actions, itemId, itemType } = this.props
		const parent = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d{1,2})$/
		actions.editErrorList({ [`${itemId}_${itemType}`]: false })
		if (!value) {
			return callback('请输入价格')
		} else if (value < 0) {
			return callback('价格必须 ≥0')
		} else if (!parent.test(value)) {
			return callback('保留两位小数')
		} else {
			callback()
			actions.editErrorList({ [`${itemId}_${itemType}`]: true })
		}


	}
	render() {
		const { isOperated } = this.props
		const disabledClassName = isOperated ? "editable-cell-value is-operated" : "editable-cell-value"
		const { value } = this.state;
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="editable-cell">
				<Form className="editable-cell-form">
					<div className="editable-cell-wrapper">
						<FormItem>
							{getFieldDecorator('price', {
								initialValue: value,
								validateFirst: true,
								rules: [
									{ validator: this.vailPrice }],
							})(
								<Input
									className={disabledClassName}
									onChange={this.handleChange}
									onPressEnter={this.check}
									onBlur={this.check}
								/>
							)}
						</FormItem>

					</div>
				</Form>
			</div>
		);
	}
}
const EditTableCellForm = Form.create()(EditTableCell);
export default EditTableCellForm;
