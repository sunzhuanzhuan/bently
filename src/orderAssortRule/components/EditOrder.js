import React, { Component } from 'react';
import { Form, Button, Select, Radio, message, } from 'antd';
import SearchSelect from './SearchSelect'
const { Option } = Select;
class SearchForm extends Component {
	state = {
		bpDetail: {}
	}
	componentDidMount = async () => {
		const { actions, bpId } = this.props
		const { data } = await actions.getBpDetail({ bpId: bpId })
		const designBrandList = (data.designBrandList || []).map(one => (
			{
				key: one.companyBrandId,
				label: one.brandName
			}))
		this.setState({
			bpDetail: { ...data, designBrandList: designBrandList }
		})
	}
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const designBrandList = (values.brandList || []).map(one => ({ companyBrandId: one.key, brandName: one.label }))
				this.props.actions.saveBpAllocation({
					...values, designBrandList: designBrandList
				}).then(() => {
					message.success('保存成功！')
					this.props.setModal()
				})

			}
		});
	};
	render() {
		const { bpDetail } = this.state
		const { form, isEdit, setModal, } = this.props
		const { getFieldDecorator, getFieldValue } = form;
		const formItemLayout = {
			labelCol: { span: 8 },
			wrapperCol: { span: 12 },
		};
		return (
			<Form layout='horizontal' className='search-from'>
				<Form.Item label='BP' {...formItemLayout} >
					{bpDetail.bpName}（{bpDetail.regionName}）
				</Form.Item>
				<Form.Item label='是否参与随机分配'{...formItemLayout} >
					{getFieldDecorator('isDesignBrand', {
						initialValue: bpDetail.isDesignBrand || 2,
					})(
						<Radio.Group placeholder='请选择' disabled={!isEdit}>
							<Radio value={1}>是</Radio>
							<Radio value={2}>否</Radio>
						</Radio.Group>
					)}
				</Form.Item>

				<Form.Item label='是否指定接单品牌'{...formItemLayout} >
					{getFieldDecorator('isRandomAllocation', {
						initialValue: bpDetail.isRandomAllocation || 2,
					})(
						<Radio.Group placeholder='请选择' disabled={!isEdit}>
							<Radio value={1}>是</Radio>
							<Radio value={2}>否</Radio>
						</Radio.Group>
					)}
				</Form.Item>
				{JSON.stringify(bpDetail) != '{}' ? getFieldValue('isRandomAllocation') == 2 ? null : <Form.Item label='添加接单品牌'{...formItemLayout} >
					{getFieldDecorator('brandList', {
						initialValue: bpDetail.designBrandList || undefined,
						rules: [
							{
								required: true,
								message: '请添加接单品牌',
							},
						],
					})(
						<SearchSelect isEdit={isEdit} />
					)}
				</Form.Item> : null}
				<div style={{ textAlign: 'center', marginTop: 40 }}>
					{isEdit ? <Button type='primary' style={{ width: 150 }} onClick={this.handleSubmit}>提交</Button> : <Button type='primary' style={{ width: 150 }} onClick={() => setModal(false)}>好的</Button>}
				</div>
			</Form>
		);
	}
}

const WrappedSearchForm = Form.create()(SearchForm);

export default WrappedSearchForm;

