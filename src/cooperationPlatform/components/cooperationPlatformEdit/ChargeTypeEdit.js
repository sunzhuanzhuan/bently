import React, { Component } from 'react'
import { Form, Input, InputNumber, Select, Button, message } from 'antd';
import qs from "qs";
import { DeleteModal } from "../common";

const Option = Select.Option;
const { TextArea } = Input;
class QuotationEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			captureTollTypeSelect: []
		};
	}
	componentDidMount = async () => {
		const { actions: { getCaptureTollType }, cooperationPlatformKey, platformId } = this.props
		if (platformId) {
			//平台修改后，收费类型下拉框改变
			const toll = await getCaptureTollType({ cooperationPlatformKey: cooperationPlatformKey, platformId: platformId })
			this.setState({
				captureTollTypeSelect: toll.data,
			})
		}
	}
	onEdit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			const searchParam = qs.parse(window.location.search.substring(1))
			const { isEdit, addList, index, updateList, item,
				actions, setShowModal, updateBaseInfoState } = this.props
			if (!err) {
				console.log('Received values of form: ', values);
				//修改为页面保存数据
				// if (searchParam.id > 0) {
				// 	//在修改页面的新增和修改直接保存数据库
				// 	actions.addOrUpdateTollType([{ ...values, trinityPlatformCode: searchParam.code, platformId: searchParam.platformId }]).then(() => {
				// 		message.success('您的操作已保存成功！')
				// 		actions.getTrinityTollTypeList({ trinityPlatformCode: searchParam.code }).then(({ data }) => {
				// 			updateBaseInfoState({ trinityTollTypeVOS: data })
				// 			setShowModal(false)

				// 		})
				// 	})
				// } else {
				//新增页面操作页面缓存
				if (isEdit) {
					console.log('index', index);
					updateList(index, { ...item, ...values }, 'trinityTollTypeVOS')
				} else {
					addList(values, 'trinityTollTypeVOS')
				}
				// }

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
			callback('请输入100以内的正数，小数点后可保留两位！')
		} else {
			callback()
		}
	}
	changeTollType = (value, option) => {
		const { trinityKey } = option.props
		const { form: { setFieldsValue }, } = this.props
		setFieldsValue({
			trinityKey: trinityKey
		})
	}
	render() {
		const { formLayoutModal, form, setShowModal, item, isEdit, trinityTollTypeVOS = [],
			cooperationPlatformKey } = this.props
		const { captureTollTypeSelect = [], } = this.state
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
				<Form.Item label="收费类型ID" style={{ display: item && item.id ? 'bolock' : 'none' }} {...formLayoutModal}>
					{getFieldDecorator('id', {
						initialValue: item && item.id
					})(
						<span>{item && item.tollTypeCode}</span>
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
								key={one.trinityKey}
								trinityKey={one.trinityKey}
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
				<Form.Item style={{ display: 'none' }}>
					{getFieldDecorator('cooperationPlatformKey', {
						initialValue: item && item.cooperationPlatformKey || cooperationPlatformKey
					})(
						<Input />
					)}
				</Form.Item>
				<Form.Item label="服务费比例" {...formLayoutModal}>
					{getFieldDecorator('serviceRatio', {
						initialValue: item && item.serviceRatio,
						validateFirst: true,
						rules: [
							{ required: true, message: '本项为必填项，请输入！' },
							{ validator: this.vailPrice },
						],
					})(
						<InputNumber step={0.01} placeholder="请输入100以内的正数，小数点后可保留两位！" style={{ width: '94%' }} />
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
					<Button style={{ marginRight: 50 }}>
						<DeleteModal typeText={'取消'} messageType='cancle' onDelete={() => setShowModal(false, null)} />
					</Button>
					<Button type='primary' style={{ marginLeft: 20 }} onClick={this.onEdit}>提交</Button>
				</div>
			</Form>
		);
	}
}
const QuotationEditFrom = Form.create()(QuotationEdit);

export default QuotationEditFrom;
