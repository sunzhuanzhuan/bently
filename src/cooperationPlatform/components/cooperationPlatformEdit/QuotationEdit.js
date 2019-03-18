import React, { Component } from 'react'
import { Form, Input, Select, Button } from 'antd';
import qs from "qs";
const Option = Select.Option;
const { TextArea } = Input;
class QuotationEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}
	componentDidMount = () => {

	}
	onAdd = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			const data = qs.parse(window.location.search.substring(1))
			const { isEdit, addList, index, updateList, item, editQuotation } = this.props
			if (!err) {
				console.log('Received values of form: ', values);
				if (data.id > 0) {
					//在修改页面的新增和修改直接保存数据库
					editQuotation([{
						...values,
						trinityPlatformCode: data.code,
						platformId: data.platformId
					}])
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
	//选择时设置相关数据
	changeTrinityType = (value) => {
		const { form: { setFieldsValue } } = this.props
		const item = this.props.captureTrinitySkuType.filter(one => value == one.id)[0]
		setFieldsValue({
			trinityTypeName: item.trinityTypeName,
			trinityKey: item.trinityKey
		})
	}
	//选择时设置相关数据
	skuTypeChange = (value) => {
		const { form: { setFieldsValue } } = this.props
		const item = this.props.skuTypeList.filter(one => value == one.skuTypeId)[0]
		setFieldsValue({
			skuTypeName: item.skuTypeName,
		})
	}
	render() {
		const { formLayoutModal, form, item, setShowModal, platformId, trinitySkuTypeVOS = [], skuTypeList, captureTrinitySkuType = [] } = this.props
		const { getFieldDecorator } = form
		//已选的ID
		const trinityKeyIsSelected = trinitySkuTypeVOS.map(one => one.trinityTypeName)
		//过滤已选ID
		const filterSkuType = captureTrinitySkuType.filter(one => !trinityKeyIsSelected.includes(one.trinityTypeName))
		//判断是否还含有报价项/无则不能提交
		const isSkuType = filterSkuType && filterSkuType[0]
		//默认选中第一个可用报价项
		const filterSkuTypeFirst = isSkuType || {}
		return (
			<Form layout="horizontal" >

				<Form.Item label="平台抓取报价项名称" {...formLayoutModal}>
					{getFieldDecorator('trinityPlatformId', {
						initialValue: item && item.trinityPlatformId || filterSkuTypeFirst.id,
						rules: [
							{ required: true, message: '请选择平台抓取报价项名称' },
						],
					})(
						<Select placeholder={isSkuType ? '请选择平台抓取报价项名称' : '无可用报价项！'} style={{ width: 314 }} onChange={this.changeTrinityType} disabled={!isSkuType}>
							{filterSkuType.map(one => <Option key={one.id} value={one.id}>{one.trinityTypeName}</Option>)}
						</Select>
					)}
				</Form.Item>
				<Form.Item style={{ display: 'none' }}>
					{getFieldDecorator('trinityTypeName', {
						initialValue: item && item.trinityTypeName || filterSkuTypeFirst.trinityTypeName
					})(
						<Input />
					)}
				</Form.Item>
				<Form.Item style={{ display: 'none' }}>
					{getFieldDecorator('trinityKey', {
						initialValue: item && item.trinityKey || filterSkuTypeFirst.trinityKey
					})(
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
				{platformId == 1 ? <Form.Item label="关联预设报价项" {...formLayoutModal} >
					{
						getFieldDecorator('skuTypeId', {
							initialValue: item && item.skuTypeId,
							rules: [
								{ required: true, message: '本项为必选项，请选择！' },
							],
						})(
							<Select placeholder="请选择关联预设报价项" style={{ width: 314 }} onChange={this.skuTypeChange}>
								{skuTypeList.map(one => <Option key={one.skuTypeId} value={one.skuTypeId}>{one.skuTypeName}</Option>)}
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
					<Button type='primary' onClick={this.onAdd} style={{ marginLeft: 20 }} disabled={!isSkuType}>提交</Button>
				</div>
			</Form >
		);
	}
}
const QuotationEditFrom = Form.create()(QuotationEdit);

export default QuotationEditFrom;
