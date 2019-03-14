import React, { Component } from 'react'
import { Form, Input, Select, Button } from 'antd';
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
	componentDidMount = () => {
		const { platformId, actions } = this.props
		actions.getCaptureTollType({ platformId: platformId }).then(({ data }) => {
			this.setState({ captureTollType: data })
		})
	}
	onEdit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			const id = qs.parse(window.location.search.substring(1)).id
			const { isEdit, addList, index, updateList, item,
				actions, setShowModal, updateBaseInfoState } = this.props
			if (!err) {
				console.log('Received values of form: ', values);
				if (id > 0) {
					//在修改页面的新增和修改直接保存数据库
					actions.addOrUpdateTollType({ ...values, id: id }).then(() => {
						actions.getTrinityTollTypeList({ trinityPlatformId: id }).then(({ data }) => {
							updateBaseInfoState({ trinityCaptureTollTypeVOS: data })
							setShowModal(false)
						})
					})
				} else {
					//新增页面操作页面缓存
					if (isEdit) {
						console.log('index', index);
						updateList(index, { ...item, ...values }, 'trinityCaptureTollTypeVOS')
					} else {
						addList(values, 'trinityCaptureTollTypeVOS')
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
		const { form: { setFieldsValue } } = this.props
		setFieldsValue({ tollTypeName: this.state.captureTollType.filter(one => value == one.trinityKey)[0].tollTypeName })
	}
	render() {
		const { formLayoutModal, form, setShowModal, item } = this.props
		const { getFieldDecorator } = form
		const { captureTollType } = this.state
		return (
			<Form layout="horizontal">
				<Form.Item label="平台收费类型名称" {...formLayoutModal}>
					{getFieldDecorator('trinityKey', {
						initialValue: item && item.trinityKey,
						rules: [
							{ required: true, message: '本项为必选项，请选择！' },
						],
					})(
						<Select placeholder="请选择平台收费类型名称" style={{ width: 314 }} onChange={this.changeTollType}>
							{captureTollType.map(one => <Option key={one.trinityKey} value={one.trinityKey}>{one.tollTypeName}</Option>)}
						</Select>
					)}
				</Form.Item>
				<Form.Item style={{ display: 'none' }}>
					{getFieldDecorator('tollTypeName')(
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
					{getFieldDecorator('description', {
						initialValue: item && item.description,
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
