import React, { Component } from 'react'
import { Form, Input, Select, Radio, Col, Row } from 'antd';
import Quotation from "./Quotation";
import ChargeType from "./ChargeType";
import QuotationEdit from "./QuotationEdit";
import ChargeTypeEdit from "./ChargeTypeEdit";
import { PaymentCompany } from "../common/index";
import qs from "qs";
import numeral from "numeral"
const Option = Select.Option;
const RadioGroup = Radio.Group;
class BaseInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			trinitySkuTypeVOS: [],
			trinityCaptureTollTypeVOS: [],
			IDCount: 1,
			id: qs.parse(window.location.search.substring(1)).id,
		};
	}
	componentDidMount = () => {
		const { cooperationPlatformInfoDetail: { trinitySkuTypeVOS, trinityTollTypeVOS } } = this.props
		const { id } = this.state
		const data = {
			trinitySkuTypeVOS: trinitySkuTypeVOS,
			trinityCaptureTollTypeVOS: trinityTollTypeVOS,
		}
		if (id > 0) {
			this.setState(data, () => {
				this.props.form.setFieldsValue(data)
			})
		}
	}
	updateBaseInfoState = (data) => {
		this.setState(data)
	}
	addList = (item, type) => {
		const { IDCount } = this.state
		item.id = `${type}${numeral(IDCount).format('0000')}`
		item.isAddItem = true
		const data = { [type]: [...this.state[type], ...[item]], IDCount: IDCount + 1 }
		this.setState(data, () => {
			this.props.form.setFieldsValue(data)
		})
		this.props.setShowModal(false)
	}

	updateList = (index, item, type) => {
		this.state[type].splice(index, 1, item)
		const data = { [type]: this.state[type] }
		this.setState(data, () => {
			this.props.form.setFieldsValue(data)
		})
		this.props.setShowModal(false)
	}
	deleteList = (id, type) => {
		const data = { [type]: this.state[type].filter(one => one.id != id) }
		this.setState(data, () => {
			this.props.form.setFieldsValue(data)
		})
	}
	editQuotation = (params) => {
		const { actions, setShowModal, updateBaseInfoState } = this.props
		actions.addOrUpdateTrinitySkuType(params).then(() => {
			setShowModal(false)
			actions.getTrinitySkuTypeList({ trinityPlatformId: params.id }).then(({ data }) => {
				this.setState({ trinitySkuTypeVOS: data })
			})
		})
	}
	render() {
		const { form, formLayout, setShowModal, actions, platformSelect, cooperationPlatformInfoDetail } = this.props
		const { getFieldDecorator, getFieldValue } = form
		const formLayoutTable = {
			labelCol: { span: 4 },
			wrapperCol: { span: 20 },
		}
		const formLayoutModal = {
			labelCol: { span: 8 },
			wrapperCol: { span: 16 },
		}
		const { trinitySkuTypeVOS, trinityCaptureTollTypeVOS, id } = this.state
		const operateProps = {
			actions,
			addList: this.addList,
			updateList: this.updateList,
			deleteList: this.deleteList,
			formLayoutModal: formLayoutModal,
			trinitySkuTypeVOS,
			trinityCaptureTollTypeVOS,
			setShowModal,
			updateBaseInfoState: this.updateBaseInfoState,
			editQuotation: this.editQuotation
		}

		return (
			<div style={{ margin: "20px 0px" }}>
				<Form.Item label="所属媒体平台"{...formLayout} >
					{getFieldDecorator('platformId', {
						initialValue: cooperationPlatformInfoDetail && cooperationPlatformInfoDetail.platformId,
						rules: [
							{ required: true, message: '本项为必填项，请选择！' },
						],
					})(
						<Select placeholder="请选择" style={{ width: 200 }} >
							{platformSelect && platformSelect.map((one => <Option key={one.id} value={one.id} >{one.platformName}</Option>))}
						</Select>
					)}
				</Form.Item>
				<Form.Item label="下单平台名称"  {...formLayout}>
					{getFieldDecorator('platformName', {
						initialValue: cooperationPlatformInfoDetail && cooperationPlatformInfoDetail.platformName,
						validateFirst: true,
						rules: [
							{ required: true, message: '本项为必填项，请输入！' },
							{ max: 15, message: "最多可输入15个字！" }
						],
					})(
						<Input placeholder="最多可输入15个字！" />
					)}
				</Form.Item>
				<Form.Item label="下单截图是否必填"{...formLayout}>
					{getFieldDecorator('orderImageNeed', {
						initialValue: cooperationPlatformInfoDetail && cooperationPlatformInfoDetail.orderImageNeed,
						rules: [
							{ required: true, message: '本项为必选项，请选择！' },
						],
					})(
						<RadioGroup>
							<Radio value={1}>是</Radio>
							<Radio value={2}>否</Radio>
						</RadioGroup>
					)}
				</Form.Item>
				<PaymentCompany form={form} formLayout={formLayout} dataDefault={cooperationPlatformInfoDetail} />
				<Form.Item label="平台报价项" {...formLayoutTable}>
					<a onClick={() => setShowModal(true, {
						title: <div>新增报价项</div>,
						content: <QuotationEdit
							{...operateProps}
							platformId={getFieldValue('platformId')}
						/>
					})}>新增报价项</a>
					{getFieldDecorator('trinitySkuTypeVOS', {
						rules: [
							{ required: true, message: '请添加平台报价项' },
						],
					})(
						<Input style={{ display: "none" }} />
					)}

				</Form.Item>
				<Row>
					<Col span={2}></Col>
					<Col span={22}>
						<Quotation {...operateProps} />
					</Col>
				</Row>

				<Form.Item label="收费类型" {...formLayoutTable}>
					{getFieldDecorator('trinityCaptureTollTypeVOS')(
						<Input style={{ display: "none" }} />
					)}<a onClick={() => setShowModal(true,
						{
							title: <div>新增收费类型</div>,
							content: <ChargeTypeEdit {...operateProps} platformId={getFieldValue('platformId')} />
						})}>
						新增收费类型</a>
				</Form.Item>
				<Row>
					<Col span={2}></Col>
					<Col span={22}>
						<ChargeType {...operateProps} />
					</Col>
				</Row>

			</div>
		);
	}
}

export default BaseInfo;
