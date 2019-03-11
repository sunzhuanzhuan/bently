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
			chargeTypeList: [],
			IDCount: 1
		};
	}
	componentDidMount = () => {
		const dataSource = [{
			ID: '1',
			name: '胡彦斌',
			remark: 'addasdasdasd',
			address: '西湖区湖底公园1号'
		}, {
			ID: '2',
			name: '胡彦祖',
			remark: 'asdasdasd',
			address: '西湖区湖底公园1号'
		}];
		this.setState({
			quotationList: dataSource,
			chargeTypeList: dataSource,
		})
	}
	addList = (item, type) => {
		const { IDCount } = this.state
		item.id = `${type}${numeral(IDCount).format('0000')}`
		item.isAddItem = true
		this.setState({ [type]: [...this.state[type], ...[item]], IDCount: IDCount + 1 })
		this.props.setShowModal(false)
	}
	updateList = (index, item, type) => {
		this.state[type].splice(index, 1, item)
		this.setState({ [type]: this.state[type] })
		this.props.setShowModal(false)
	}
	deleteList = (id, type) => {
		this.setState({ [type]: this.state[type].filter(one => one.id != id) })
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

		const { quotationList, chargeTypeList } = this.state
		const operateProps = {
			addList: this.addList,
			updateList: this.updateList,
			deleteList: this.deleteList,
			formLayoutModal: formLayoutModal,
			quotationList,
			chargeTypeList,
			setShowModal
		}
		return (
			<div style={{ margin: "20px 0px" }}>
				<Form.Item label="所属媒体平台"{...formLayout}>
					{getFieldDecorator('select', {
						initialValue: 1,
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
						initialValue: 1,
						rules: [
							{ required: true, message: '请输入下单平台名称' },
							{ max: 15, message: "最多可输入15个字符" }
						],
					})(
						<Input placeholder="请输入下单平台名称" />
					)}
				</Form.Item>
				<Form.Item label="下单截图是否必填"{...formLayout}>
					{getFieldDecorator('picture', {
						initialValue: 1,
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
					<a onClick={() => setShowModal(true, {
						title: <div>新增报价项</div>,
						content: <QuotationEdit
							{...operateProps}
						/>
					})}>新增报价项</a>
					<Quotation {...operateProps} />
					{getFieldDecorator('quotation', {
						initialValue: 1,
						rules: [
							{ required: true, message: '请添加平台报价项' },
						],
					})(
						<Input style={{ display: "none" }} />
					)}

				</Form.Item>

				<Form.Item label="收费类型" {...formLayoutTable}>
					{getFieldDecorator('quotation', {
						initialValue: 1,
						rules: [
							{ required: true, message: '请添加平台报价项' },
						],
					})(
						<Input style={{ display: "none" }} />
					)}<a onClick={() => setShowModal(true,
						{
							title: <div>新增收费类型</div>,
							content: <ChargeTypeEdit {...operateProps} />
						})}>
						新增收费类型</a>
				</Form.Item>
				<ChargeType {...operateProps} />
			</div>
		);
	}
}

export default BaseInfo;
