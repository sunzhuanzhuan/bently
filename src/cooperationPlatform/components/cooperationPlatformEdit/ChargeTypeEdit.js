import React, { Component } from 'react'
import { Form, Input, Select, Button } from 'antd';
const Option = Select.Option;
const { TextArea } = Input;
class QuotationEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	onEdit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			const { isEdit, addList, index, updateList, item } = this.props
			if (!err) {
				console.log('Received values of form: ', values);
				if (isEdit) {
					console.log('index', index);
					updateList(index, { ...item, ...values }, 'chargeTypeList')
				} else {
					addList(values, 'chargeTypeList')
				}
			}
		});
	}
	onClean = () => {
		this.props.form.resetFields()
	}
	//服务费比例验证
	vailPrice = (rule, value, callback) => {
		const parent = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d{1,2})$/
		if (!parent.test(value) || value < 0 || value > 100) {
			callback('请确认填写的是0-100，最多可以输入两位小数')
		} else {
			callback()
		}
	}
	render() {
		const { formLayoutModal, form, setShowModal } = this.props
		const { getFieldDecorator } = form
		return (
			<Form layout="horizontal">
				<Form.Item label="平台收费类型名称" {...formLayoutModal}>
					{getFieldDecorator('name', {
						rules: [
							{ required: true, message: '请选择平台收费类型名称' },
						],
					})(
						<Select placeholder="请选择平台收费类型名称" style={{ width: 314 }}>
							<Option value="china">China</Option>
							<Option value="usa">U.S.A</Option>
						</Select>
					)}
				</Form.Item>
				<Form.Item label="服务费比例" {...formLayoutModal}>
					{getFieldDecorator('platform', {
						validateFirst: true,
						rules: [
							{ required: true, message: '请输入服务费比例' },
							{ max: 30, message: "最多可输入30个字符" }
						],
					})(
						<Input placeholder="请输入" style={{ width: '80%' }} />
					)}<span style={{ paddingLeft: 4 }}>%</span>
				</Form.Item>
				<Form.Item label="描述"  {...formLayoutModal}>
					{getFieldDecorator('remark', {
						validateFirst: true,
						rules: [
							{ max: 50, message: "最多可输入50个字符" }
						],
					})(
						<TextArea placeholder="最多可输入50个字" />
					)}
				</Form.Item>
				<div style={{ textAlign: "center" }}>
					<Button onClick={() => setShowModal(false, null)}>取消</Button>
					<Button type='primary' style={{ marginLeft: 20 }} onClick={this.onEdit}>提交</Button>
				</div>
			</Form>
		);
	}
}
const QuotationEditFrom = Form.create()(QuotationEdit);

export default QuotationEditFrom;
