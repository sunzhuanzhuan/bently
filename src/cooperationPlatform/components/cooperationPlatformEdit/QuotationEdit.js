import React, { Component } from 'react'
import { Form, Input, Select, Button } from 'antd';
import qs from "qs";
const Option = Select.Option;
const { TextArea } = Input;
class QuotationEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			captureTrinitySkuType: [],
			skuType: []
		};
	}
	componentWillMount = () => {
		const { platformId, actions } = this.props
		actions.getCaptureTrinitySkuType({ platformId: platformId }).then(({ data }) => {
			this.setState({ captureTrinitySkuType: data })
		})
		actions.getSkuType({ platformId: platformId, productLineId: 1 }).then(({ data }) => {
			this.setState({ skuType: data })
		})
	}

	onAdd = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			const id = qs.parse(window.location.search.substring(1)).id
			const { isEdit, addList, index, updateList, item, editQuotation } = this.props
			if (!err) {
				console.log('Received values of form: ', values);
				if (id > 0) {
					//在修改页面的新增和修改直接保存数据库
					editQuotation({ ...values, trinityPlatformId: id })
				} else {
					//新增页面操作页面缓存
					if (isEdit) {
						//在新增页面的修改
						updateList(index, { ...item, ...values }, 'trinitySkuTypeVOS')
					} else {
						//在新增页面新增报价项
						addList(values, 'trinitySkuTypeVOS')
					}
				}

			}
		});
	}
	onClean = () => {
		this.props.form.resetFields()
	}
	changeTrinityType = (value) => {
		const { form: { setFieldsValue } } = this.props
		setFieldsValue({
			trinityTypeName: this.state.captureTrinitySkuType.filter(one => value == one.trinityKey)[0].trinityTypeName
		})
	}

	render() {
		const { formLayoutModal, form, item, setShowModal, isWeiBo, trinitySkuTypeVOS } = this.props
		const { getFieldDecorator } = form
		const { captureTrinitySkuType } = this.state
		const trinityKeyIsSelected = trinitySkuTypeVOS.map(one => one.trinityPlatformId)
		return (
			<Form layout="horizontal" >

				<Form.Item label="平台抓取报价项名称" {...formLayoutModal}>
					{getFieldDecorator('trinityPlatformId', {
						initialValue: item && item.trinityPlatformId,
						rules: [
							{ required: true, message: '请选择平台抓取报价项名称' },
						],
					})(
						<Select placeholder="请选择平台抓取报价项名称" style={{ width: 314 }} onChange={this.changeTrinityType}>
							{captureTrinitySkuType.map(one => trinityKeyIsSelected.includes(one.id) ? null : <Option key={one.id} value={one.id}>{one.trinityTypeName}</Option>)}
						</Select>
					)}
				</Form.Item>
				<Form.Item style={{ display: 'none' }}>
					{getFieldDecorator('trinityTypeName')(
						<Input />
					)}
				</Form.Item>
				<Form.Item label="微播易展示报价项名称" {...formLayoutModal}>
					{getFieldDecorator('wbyTypeName', {
						initialValue: item && item.wbyTypeName,
						validateFirst: true,
						rules: [
							{ required: true, message: '本项为必选项，请输入' },
							{ max: 20, message: "最多可输入20个字！" }
						],
					})(
						<Input placeholder="最多可输入20个字！" />

					)}
				</Form.Item>
				{isWeiBo ? <Form.Item label="关联预设报价项" {...formLayoutModal} >
					{
						getFieldDecorator('skuTypeId', {
							initialValue: item && item.skuTypeId,
							rules: [
								{ required: true, message: '本项为必选项，请选择！' },
							],
						})(
							<Select placeholder="请选择关联预设报价项" style={{ width: 314 }}>
								<Option value="china">China</Option>
								<Option value="usa">U.S.A</Option>
							</Select>
						)}
				</Form.Item > : null}
				<Form.Item style={{ display: 'none' }}>
					{getFieldDecorator('skuTypeName')(
						<Input />
					)}
				</Form.Item>
				<Form.Item label="描述"  {...formLayoutModal}>
					{getFieldDecorator('description', {
						initialValue: item && item.description,
						validateFirst: true,
						rules: [
							{ max: 50, message: "最多可输入50个字！" }
						],
					})(
						<TextArea placeholder="最多可输入50个字" />
					)}
				</Form.Item>
				<div style={{ textAlign: "center" }}>
					<Button onClick={() => setShowModal(false, null)}>取消</Button>
					<Button type='primary' onClick={this.onAdd} style={{ marginLeft: 20 }}>提交</Button>
				</div>
			</Form >
		);
	}
}
const QuotationEditFrom = Form.create()(QuotationEdit);

export default QuotationEditFrom;
