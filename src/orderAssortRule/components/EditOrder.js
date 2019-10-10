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
		const brandRelations = (data.brandRelations || []).map(one => (
			{
				key: one.companyBrandId,
				label: one.brandName + `（${one.companyName}）`
			}))
		this.setState({
			bpDetail: { ...data, brandRelations: brandRelations }
		})
	}
	handleSubmit = e => {
		e.preventDefault();
		const { setOrderState, actions, form } = this.props
		form.validateFields((err, values) => {
			const { bpDetail } = this.state
			if (!err) {
				setOrderState({ isLoading: true })
				const brandRelations = (values.brandList || []).map(one => ({ companyBrandId: one.key, }))
				actions.saveBpAllocation({
					bpId: bpDetail.bpId,
					...values, brandRelations: brandRelations
				}).then(() => {
					message.success('保存成功！')
					this.props.setModal()
				})
				setOrderState({ isLoading: false })
			}
		});
	};
	render() {
		const { bpDetail } = this.state
		const { regionNames = [], brandRelations = [] } = bpDetail
		console.log("TCL: SearchForm -> render -> brandRelations", brandRelations)
		const { form, isEdit, setModal, } = this.props
		const { getFieldDecorator, getFieldValue } = form;
		const formItemLayout = {
			labelCol: { span: 8 },
			wrapperCol: { span: 12 },
		};
		return (
			<Form layout='horizontal' className='search-from'>
				<Form.Item label='bp' {...formItemLayout} >
					{bpDetail.bpName}（{regionNames.map((one, index) => `${one}${index < regionNames.length - 1 ? '、' : ''}`)}）
				</Form.Item>
				<Form.Item label='是否参与随机分配'{...formItemLayout} >
					{getFieldDecorator('isCanDistributionInBrand', {
						initialValue: String(bpDetail.isCanDistributionInBrand) || "2",
					})(
						<Radio.Group placeholder='请选择' disabled={!isEdit}>
							<Radio value="1">是</Radio>
							<Radio value="2">否</Radio>
						</Radio.Group>
					)}
				</Form.Item>

				<Form.Item label='是否指定接单品牌'{...formItemLayout} >
					{getFieldDecorator('isCanDistributionInAll', {
						initialValue: String(bpDetail.isCanDistributionInAll) || "2",
					})(
						<Radio.Group placeholder='请选择' disabled={!isEdit}>
							<Radio value="1">是</Radio>
							<Radio value="2">否</Radio>
						</Radio.Group>
					)}
				</Form.Item>
				{JSON.stringify(bpDetail) != '{}' ? getFieldValue('isCanDistributionInAll') == 2 ? null : <Form.Item label='添加接单品牌'{...formItemLayout} >
					{getFieldDecorator('brandList', {
						initialValue: brandRelations,
						rules: [
							{
								required: true,
								message: '请添加接单品牌',
							},
						],
					})(
						<SearchSelect isEdit={isEdit} bpId={bpDetail.bpId} />
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

