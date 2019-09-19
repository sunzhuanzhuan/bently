import React, { Component } from 'react';
import { Form, Button, Select } from 'antd';
const { Option } = Select;
class SearchForm extends Component {
	handleSubmit = e => {
		e.preventDefault();
		const { changeSearchParam, form } = this.props
		form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				changeSearchParam(values)
			}
		});
	};
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form layout="inline" className='search-from'>
				<Form.Item label='BP'>
					{getFieldDecorator('username')(
						<Select placeholder='请输入并选择BP' style={{ width: 200 }}>
							<Option key='1' value={2}>BP1</Option>
						</Select>
					)}
				</Form.Item>
				<Form.Item label='所属大区'>
					{getFieldDecorator('username')(
						<Select placeholder='请选择大区' style={{ width: 200 }}>
							<Option value={2}>BP1</Option>
						</Select>
					)}
				</Form.Item>
				<Form.Item label='是否参与随机分配'>
					{getFieldDecorator('username')(
						<Select placeholder='请选择' style={{ width: 90 }}>
							<Option value={1}>是</Option>
							<Option value={2}>否</Option>
						</Select>
					)}
				</Form.Item>

				<Form.Item label='是否指定接单品牌'>
					{getFieldDecorator('username')(
						<Select placeholder='请选择' style={{ width: 90 }}>
							<Option value={1}>是</Option>
							<Option value={2}>否</Option>
						</Select>
					)}
				</Form.Item>
				<Button type='primary' className='search-button' onClick={this.handleSubmit}>查询</Button>
			</Form>
		);
	}
}

const WrappedSearchForm = Form.create()(SearchForm);

export default WrappedSearchForm;

