import React, { Component } from 'react'
import { Form, Input, Select, Button } from 'antd';
const Option = Select.Option;
const { TextArea } = Input;
class QuotationEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	onAdd = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			const { time } = values
			const { isEdit, addList, index, updateList, item } = this.props
			if (!err) {
				console.log('Received values of form: ', values);
				if (isEdit) {
					console.log('index', index);
					updateList(index, { ...item, ...values }, 'quotationList')
				} else {
					addList(values, 'quotationList')
				}
			}
		});
	}
	onClean = () => {
		this.props.form.resetFields()
	}
	render() {
		const { formLayoutModal, form, item, setShowModal } = this.props
		const { getFieldDecorator } = form
		return (
			<Form layout="horizontal">
				<Form.Item label="平台抓取报价项名称" {...formLayoutModal}>
					{getFieldDecorator('select', {
						initialValue: item && item.select,
						rules: [
							{ required: true, message: '请选择平台抓取报价项名称' },
						],
					})(
						<Select placeholder="请选择平台抓取报价项名称" style={{ width: 314 }}>
							<Option value="china">China</Option>
							<Option value="usa">U.S.A</Option>
						</Select>
					)}
				</Form.Item>
				<Form.Item label="微播易展示报价项名称" {...formLayoutModal}>
					{getFieldDecorator('name', {
						initialValue: item && item.name,
						validateFirst: true,
						rules: [
							{ required: true, message: '请输入微播易展示报价项名称' },
							{ max: 30, message: "最多可输入30个字符" }
						],
					})(
						<Input placeholder="请输入" />

					)}
				</Form.Item>
				<Form.Item label="关联预设报价项" {...formLayoutModal}>
					{getFieldDecorator('associa', {
						initialValue: item && item.associa,
						rules: [
							{ required: true, message: '请选择关联预设报价项' },
						],
					})(
						<Select placeholder="请选择关联预设报价项" style={{ width: 314 }}>
							<Option value="china">China</Option>
							<Option value="usa">U.S.A</Option>
						</Select>
					)}
				</Form.Item>

				<Form.Item label="描述"  {...formLayoutModal}>
					{getFieldDecorator('remark', {
						initialValue: item && item.remark,
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
					<Button type='primary' onClick={this.onAdd} style={{ marginLeft: 20 }}>提交</Button>
				</div>
			</Form>
		);
	}
}
const QuotationEditFrom = Form.create()(QuotationEdit);

export default QuotationEditFrom;
