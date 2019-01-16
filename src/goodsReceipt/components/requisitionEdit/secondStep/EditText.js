import React, { Component } from 'react'
import { Input, Icon, Form, Popover } from 'antd';
import "./EditText.less";
const { TextArea } = Input;
const FormItem = Form.Item
class EditText extends Component {
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
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if (this.props.onChange) {
					this.props.onChange(values.price);
				}
			}
		});
	}

	vailIntroduction = (rule, value, callback) => {
		if (value) {
			if (value.length > 200) {
				callback('字数最多200字')
			} else {
				callback()
			}
		} else {
			callback()
		}
	}
	render() {
		const { isOperated } = this.props
		const disabledClassName = isOperated ? "editable-text-value is-operated" : "editable-text-value"
		const { value, } = this.state;
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="editable-text-area">
				<Form className="editable-text-area-form">
					<div className="editable-cell-wrapper">
						<FormItem>
							{getFieldDecorator('price', {
								initialValue: value,
								rules: [{ validator: this.vailIntroduction }],
							})(
								<TextArea
									rows={2}
									onChange={this.handleChange}
									onPressEnter={this.check}
									className={disabledClassName}
									onBlur={this.check} />
							)}
						</FormItem>
					</div>
				</Form>
			</div>
		);
	}
}
const EditTextForm = Form.create()(EditText);
export default EditTextForm;
