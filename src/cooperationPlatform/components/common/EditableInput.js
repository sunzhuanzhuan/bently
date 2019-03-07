import React, { Component } from 'react'
import { Input, Icon, Form } from 'antd';
const FormItem = Form.Item
import "./EditTableCell.less";
class EditableInput extends Component {
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
	chinaAndNumberVali = (rule, value, callback) => {
		const reg = /^[0-9\u4e00-\u9fa5]+$/;
		if (reg.test(value)) {
			callback()
		} else {
			callback("仅可输入汉字及数字")
		}

	}
	render() {
		const { isOperated } = this.props
		const disabledClassName = isOperated ? "edit-table-input is-operated" : "edit-table-input"
		const { value } = this.state;
		const { getFieldDecorator } = this.props.form;
		return (
			<Form className="edit-table-form">
				<FormItem>
					{getFieldDecorator('price', {
						initialValue: value,
						validateFirst: true,
						rules: [{ required: true, message: '请输入微播易展示报价项名称!' },
						{ validator: this.chinaAndNumberVali },
						{ max: 30, message: "最多可输入30个字符" }
						],
					})(
						<Input
							className={disabledClassName}
							onChange={this.handleChange}
							onPressEnter={this.check}
							onBlur={this.check}
						/>
					)}
				</FormItem>
			</Form>
		);
	}
}
const EditableInputForm = Form.create()(EditableInput);
export default EditableInputForm;
