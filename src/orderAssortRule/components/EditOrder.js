import React, { Component } from 'react';
import { Form, Button, Select, Radio, Modal } from 'antd';
import SearchSelect from './SearchSelect'
const { Option } = Select;
class SearchForm extends Component {
	state = { visible: false };

	showModal = () => {
		this.setState({
			visible: true,
		});
	};
	handleCancel = () => {
		this.setState({
			visible: false,
		});
	}
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	};
	render() {
		const { text, form, isEdit } = this.props
		const { getFieldDecorator, getFieldValue } = form;
		const formItemLayout = {
			labelCol: { span: 8 },
			wrapperCol: { span: 12 },
		};
		return (
			<span>
				<a onClick={this.showModal}>{text}</a>
				<Modal
					title={text + 'BP/订单分配规则'}
					footer={null}
					visible={this.state.visible}
					onCancel={this.handleCancel}
				>
					<Form layout='horizontal' className='search-from'>
						<Form.Item label='bpName' {...formItemLayout} >
							小李（萨达收到）
						</Form.Item>
						<Form.Item label='是否参与随机分配'{...formItemLayout} >
							{getFieldDecorator('is_random', {
								initialValue: 2,
							})(
								<Radio.Group placeholder='请选择' disabled={!isEdit}>
									<Radio value={1}>是</Radio>
									<Radio value={2}>否</Radio>
								</Radio.Group>
							)}
						</Form.Item>

						<Form.Item label='是否指定接单品牌'{...formItemLayout} >
							{getFieldDecorator('is_point', {
								initialValue: 2,
							})(
								<Radio.Group placeholder='请选择' disabled={!isEdit}>
									<Radio value={1}>是</Radio>
									<Radio value={2}>否</Radio>
								</Radio.Group>
							)}
						</Form.Item>
						{getFieldValue('is_point') == 2 ? null : <Form.Item label='添加接单品牌'{...formItemLayout} >
							{getFieldDecorator('brand', {
								initialValue: [{
									key: "redwolf679"
									, label: "itat"
								}],
								rules: [
									{
										required: true,
										message: '请添加接单品牌',
									},
								],
							})(
								<SearchSelect isEdit={isEdit} />
							)}
						</Form.Item>}
						<div style={{ textAlign: 'center', marginTop: 40 }}>
							{isEdit ? <Button type='primary' style={{ width: 150 }} onClick={this.handleSubmit}>提交</Button> : <Button type='primary' style={{ width: 150 }} onClick={this.handleCancel}>好的</Button>}
						</div>
					</Form>
				</Modal>
			</span>

		);
	}
}

const WrappedSearchForm = Form.create()(SearchForm);

export default WrappedSearchForm;

