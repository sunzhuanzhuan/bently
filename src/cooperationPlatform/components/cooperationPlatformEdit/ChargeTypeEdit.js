import React, { Component } from 'react'
import { Form, Input, Select, Button, message } from 'antd';
import qs from "qs";
const Option = Select.Option;
const { TextArea } = Input;
class QuotationEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			captureTollType: []
		};
	}

	onEdit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			const searchParam = qs.parse(window.location.search.substring(1))
			const { isEdit, addList, index, updateList, item,
				actions, setShowModal, updateBaseInfoState } = this.props
			if (!err) {
				console.log('Received values of form: ', values);
				if (searchParam.id > 0) {
					//在修改页面的新增和修改直接保存数据库
					actions.addOrUpdateTollType([{ ...values, trinityPlatformCode: searchParam.code, platformId: searchParam.platformId }]).then(() => {
						message.success('您的操作已保存成功！')
						actions.getTrinityTollTypeList({ trinityPlatformCode: searchParam.code }).then(({ data }) => {
							updateBaseInfoState({ trinityTollTypeVOS: data })
							setShowModal(false)

						})
					})
				} else {
					//新增页面操作页面缓存
					if (isEdit) {
						console.log('index', index);
						updateList(index, { ...item, ...values }, 'trinityTollTypeVOS')
					} else {
						addList(values, 'trinityTollTypeVOS')
					}
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
			callback('仅可输入0-100之间的正数！')
		} else {
			callback()
		}
	}
	changeTollType = (value) => {
		const { form: { setFieldsValue }, captureTollTypeSelect, } = this.props
		const item = captureTollTypeSelect.filter(one => value == one.tollTypeName)[0]
		setFieldsValue({
			trinityKey: item.trinityKey
		})
	}
	render() {
		const { formLayoutModal, form, setShowModal, item, isEdit, trinityTollTypeVOS = [], captureTollTypeSelect = [] } = this.props
		const captureTollTypeSelected = trinityTollTypeVOS.map(one => one.tollTypeName)
		//过滤已选ID
		const captureTollType = captureTollTypeSelect.filter(one => !captureTollTypeSelected.includes(one.tollTypeName))
		//判断是否还含有报价项/无则不能提交
		const isTollType = captureTollType && captureTollType[0]
		//默认选中第一个可用报价项
		const captureTollTypeFirst = isTollType || {}
		const { getFieldDecorator } = form
		return (
			<Form layout="horizontal">
				<Form.Item style={{ display: 'none' }}>
					{getFieldDecorator('id', {
						initialValue: item && item.id
					})(
						<Input />
					)}
				</Form.Item>
				<Form.Item label="平台收费类型名称" {...formLayoutModal}>
					{getFieldDecorator('tollTypeName', {
						initialValue: item && item.tollTypeName || captureTollTypeFirst.tollTypeName,
						rules: [
							{ required: true, message: '本项为必选项，请选择！' },
						],
					})(
						<Select placeholder={isTollType ? "请选择平台收费类型名称" : '无可用收费类型！'} style={{ width: 314 }} onChange={this.changeTollType} disabled={isEdit}>
							{captureTollTypeSelect.map(one => <Option
								disabled={captureTollTypeSelected.includes(one.tollTypeName)}
								key={one.tollTypeName}
								value={one.tollTypeName}
							>{one.tollTypeName}</Option>)}
						</Select>
					)}
				</Form.Item>
				<Form.Item style={{ display: 'none' }}>
					{getFieldDecorator('trinityKey', {
						initialValue: item && item.trinityKey || captureTollTypeFirst.trinityKey,
					})(
						<Input />
					)}
				</Form.Item>
				<Form.Item label="服务费比例" {...formLayoutModal}>
					{getFieldDecorator('serviceRatio', {
						initialValue: item && item.serviceRatio,
						validateFirst: true,
						rules: [
							{ required: true, message: '”本项为必选项，请输入！' },
							{ validator: this.vailPrice },
						],
					})(
						<Input placeholder="请输入正数" style={{ width: '80%' }} />
					)}<span style={{ paddingLeft: 4 }}>%</span>
				</Form.Item>
				<Form.Item label="描述"  {...formLayoutModal}>
					{getFieldDecorator('tollDescribe', {
						initialValue: item && item.tollDescribe,
						validateFirst: true,
						rules: [
							{ max: 50, message: "最多可输入50个字！" }
						],
					})(
						<TextArea placeholder="最多可输入50个字！" />
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
