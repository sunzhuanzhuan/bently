import React, { Component } from 'react'
import { Form, Input, Select, Button, message } from 'antd';
import qs from "qs";
import { DeleteModal } from "../common";
const Option = Select.Option;
const { TextArea } = Input;
class QuotationEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			captureTrinitySkuType: [],
			skuTypeList: []
		};
	}
	componentDidMount = async () => {
		const { actions: { getCaptureTrinitySkuType, getSkuTypeList, }, cooperationPlatformKey, platformId } = this.props
		if (platformId) {
			//平台修改后，sku下拉框改变
			const sku = await getCaptureTrinitySkuType({ cooperationPlatformKey: cooperationPlatformKey, platformId: platformId })
			let skuType = {}
			//如果微博平台则查询关联报价项
			if (platformId == 1) {
				skuType = await getSkuTypeList({ platformId: platformId, productLineId: 1 })
			}
			this.setState({
				captureTrinitySkuType: sku.data,
				skuTypeList: skuType.data
			})
		}

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
					}], () => { message.success('您的操作已保存成功！') })
				} else {
					//新增页面操作页面缓存
					if (isEdit) {
						//在新增页面的修改

						updateList(index, { ...item, ...values }, 'trinitySkuTypeVOS')
						console.log("TCL: QuotationEdit -> onAdd -> { ...item, ...values }", { ...item, ...values })
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
	changeTrinityType = (value, option) => {
		const { trinityKey } = option.props
		const { form: { setFieldsValue } } = this.props
		setFieldsValue({
			trinityKey: trinityKey
		})
	}
	//选择时设置相关数据
	skuTypeChange = (value, option) => {
		const { form: { setFieldsValue } } = this.props
		const { skuTypeName } = option.props
		setFieldsValue({
			skuTypeName: skuTypeName,
		})
	}
	//
	chinaAndNumberVali = (rule, value, callback) => {
		const reg = /^[0-9\u4e00-\u9fa5]+$/;
		if (reg.test(value)) {
			callback()
		} else {
			callback("最多可输入20个字以内的汉字及数字！")
		}
	}
	render() {
		const { formLayoutModal, form, item, setShowModal,
			platformId, trinitySkuTypeVOS = [],
			cooperationPlatformKey,
			isEdit } = this.props
		const { getFieldDecorator } = form
		const { captureTrinitySkuType = [], skuTypeList = [] } = this.state
		//已选的ID
		const trinityKeyIsSelected = trinitySkuTypeVOS.map(one => one.trinityTypeName)
		//过滤已选ID
		const filterSkuType = captureTrinitySkuType.filter(one => !trinityKeyIsSelected.includes(one.trinityTypeName))
		//判断是否还含有报价项/无则不能提交
		const isSkuType = filterSkuType && filterSkuType[0]
		//默认选中第一个可用报价项
		const filterSkuTypeFirst = isSkuType || {}
		const isCancle = qs.parse(window.location.search.substring(1)).code

		return (
			<Form layout="horizontal" >
				<Form.Item label="报价项ID" style={{ display: item && item.id ? 'bolock' : 'none' }} {...formLayoutModal}>
					{getFieldDecorator('id', {
						initialValue: item && item.id
					})(
						<span>{item && item.trinityCode}</span>
					)}
				</Form.Item>
				<Form.Item label="平台抓取报价项名称" {...formLayoutModal}>
					{getFieldDecorator('trinityTypeName', {
						initialValue: item && item.trinityTypeName || filterSkuTypeFirst.trinityTypeName,
						rules: [
							{ required: true, message: '请选择平台抓取报价项名称' },
						],
					})(
						<Select placeholder={isSkuType ? '请选择平台抓取报价项名称' : '无可用报价项！'} style={{ width: 314 }} onChange={this.changeTrinityType} disabled={isEdit}>
							{captureTrinitySkuType.map(one => {
								const { trinityTypeName } = one
								return <Option key={one.trinityTypeName}
									trinityKey={one.trinityKey}
									value={trinityTypeName}
									disabled={trinityKeyIsSelected.includes(trinityTypeName)}>
									{trinityTypeName}</Option>
							})}
						</Select>
					)}
				</Form.Item>

				<Form.Item style={{ display: 'none' }}>
					{getFieldDecorator('cooperationPlatformKey', {
						initialValue: item && item.cooperationPlatformKey || cooperationPlatformKey
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
							{ required: true, message: '本项为必填项，请输入' },
							{ max: 20, message: "最多可输入20个字！", },
							{ validator: this.chinaAndNumberVali },
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
								{skuTypeList.map(one => <Option
									key={one.skuTypeId}
									skuTypeName={one.skuTypeName}
									value={one.skuTypeId}>{one.skuTypeName}</Option>)}
							</Select>
						)}
				</Form.Item > : null}
				<Form.Item style={{ display: 'none' }}>
					{getFieldDecorator('skuTypeName', {
						initialValue: item && item.skuTypeName
					})(
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
					<Button style={{ marginRight: 50 }}>
						<DeleteModal typeText={'取消'} messageType='cancle' onDelete={() => setShowModal(false, null)} />
					</Button>
					<Button type='primary' onClick={this.onAdd} style={{ marginLeft: 20 }} >提交</Button>
				</div>
			</Form >
		);
	}
}
const QuotationEditFrom = Form.create()(QuotationEdit);

export default QuotationEditFrom;
