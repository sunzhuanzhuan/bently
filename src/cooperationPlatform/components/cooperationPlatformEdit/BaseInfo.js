import React, { Component } from 'react'
import { Form, Input, Select, Radio, } from 'antd';
import Quotation from "./Quotation";
import ChargeType from "./ChargeType";
import QuotationEdit from "./QuotationEdit";
import ChargeTypeEdit from "./ChargeTypeEdit";
import { PaymentCompany } from "../common/index";
import numeral from "numeral"
const Option = Select.Option;
const RadioGroup = Radio.Group;
class BaseInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quotationList: [],
			IDCount: 1
		};
	}
	addQuotationList = (item) => {
		const { quotationList, IDCount } = this.state
		item.id = `SFBJ${numeral(IDCount).format('0000')}`
		this.setState({ quotationList: [...quotationList, ...[item]], IDCount: IDCount + 1 })
		this.props.setShowModal(false)
	}
	updateQuotationList = (index, item, isEnable, status) => {
		const { quotationList } = this.state
		console.log(index, item);
		if (isEnable) {
			item.status = status
		}
		quotationList.splice(index, 1, item)
		console.log('quotationListUpdate', quotationList);
		this.setState({ quotationList: quotationList })
		this.props.setShowModal(false)
	}
	deleteQuotationList = (id) => {
		const { quotationList } = this.state
		this.setState({ quotationList: quotationList.filter(one => one.id != id) })
	}

	render() {
		const { form, formLayout, setShowModal } = this.props
		const { getFieldDecorator } = form
		const formLayoutTable = {
			labelCol: { span: 4 },
			wrapperCol: { span: 20 },
		}
		const formLayoutModal = {
			labelCol: { span: 8 },
			wrapperCol: { span: 16 },
		}
		const { quotationList } = this.state
		return (
			<div style={{ margin: "20px 0px" }}>
				<Form.Item label="所属媒体平台"{...formLayout}>
					{getFieldDecorator('select', {
						rules: [
							{ required: true, message: '请选择所属媒体平台' },
						],
					})(
						<Select placeholder="请选择" style={{ width: 200 }}>
							<Option value="china">China</Option>
							<Option value="usa">U.S.A</Option>
						</Select>
					)}
				</Form.Item>
				<Form.Item label="下单平台名称"  {...formLayout}>
					{getFieldDecorator('name', {
						validateFirst: true,
						rules: [
							{ required: true, message: '请输入下单平台名称' },
							{ max: 50, message: "最多可输入50个字符" }
						],
					})(
						<Input placeholder="请输入下单平台名称" />
					)}
				</Form.Item>
				<Form.Item label="下单截图是否必填"{...formLayout}>
					{getFieldDecorator('picture', {
						rules: [
							{ required: true, message: '请选择下单截图是否必填' },
						],
					})(
						<RadioGroup>
							<Radio value={1}>是</Radio>
							<Radio value={2}>否</Radio>
						</RadioGroup>
					)}
				</Form.Item>
				<PaymentCompany form={form} formLayout={formLayout} />
				<Form.Item label="平台报价项" {...formLayoutTable}>
					{getFieldDecorator('quotation', {
						rules: [
							{ required: true, message: '请添加平台报价项' },
						],
					})(
						<Input style={{ display: "none" }} />
					)}
					<a onClick={() => setShowModal(true, { title: <div>新增报价项</div>, content: <QuotationEdit formLayoutModal={formLayoutModal} addQuotationList={this.addQuotationList} /> })}>新增报价项</a>
				</Form.Item>
				<Quotation
					quotationList={quotationList}
					setShowModal={setShowModal}
					updateQuotationList={this.updateQuotationList}
					formLayoutModal={formLayoutModal}
					deleteQuotationList={this.deleteQuotationList} />
				<Form.Item label="收费类型" {...formLayoutTable}>
					{getFieldDecorator('quotation', {
						rules: [
							{ required: true, message: '请添加平台报价项' },
						],
					})(
						<Input style={{ display: "none" }} />
					)}<a onClick={() => setShowModal(true, { title: <div>新增收费类型</div>, content: <ChargeTypeEdit formLayoutModal={formLayoutModal} /> })}>新增收费类型</a>
				</Form.Item>
				<ChargeType />
			</div>
		);
	}
}

export default BaseInfo;
