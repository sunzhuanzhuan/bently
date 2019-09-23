import React, { Component } from 'react';
import { Form, Button, Select } from 'antd';
import SearchSelect from './SelectSearch'
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
		const { actions, form } = this.props
		const { getFieldDecorator } = form;

		return (
			<Form layout="inline" className='search-from'>
				<Form.Item label='BP'>
					{getFieldDecorator('bpName')(
						<SearchSelect
							searchDataList={actions.getAllBpList}
							desc='请输入并选择BP'
							keyWord='name'
							item={['bpId', 'bpName']} />
					)}
				</Form.Item>
				<Form.Item label='所属大区'>
					{getFieldDecorator('regionId')(
						<Select placeholder='请选择大区' style={{ width: 200 }}>
							<Option value={2}>大区1</Option>
							<Option value={2}>大区2</Option>
							<Option value={2}>大区3</Option>
						</Select>
					)}
				</Form.Item>
				<Form.Item label='是否参与随机分配'>
					{getFieldDecorator('isRandomAllocation')(
						<Select placeholder='请选择' style={{ width: 90 }}>
							<Option value={1}>是</Option>
							<Option value={2}>否</Option>
						</Select>
					)}
				</Form.Item>

				<Form.Item label='是否指定接单品牌'>
					{getFieldDecorator('isDesignBrand')(
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

