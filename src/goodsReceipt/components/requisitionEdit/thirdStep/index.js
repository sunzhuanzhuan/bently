import React, { Component } from 'react'
import { Form, Row, Col, Radio, Spin, InputNumber } from "antd";
import { TitleLable } from "../../../base";
import "./index.less";
import WbyGRUploadFile from "../WbyGRUploadFile";
import EditInputNumber from "./EditInputNumber";
import EditInputNumberBlur from "./EditInputNumberBlur";
import qs from "qs";
import NumeralFormat from "../../common/NumeralFormat";
const LEFT_COl_Span = 10
const ROGHT_COl_Span = 14
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import { scientificToNumber } from '@/util';
class ThirdStep extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			fileAttachment: [],
			fileList: [],
			totalAmountLoading: false
		};
	}
	setStateThird = (data) => {
		this.setState(data)
	}
	componentDidMount = () => {
		this.props.actions.getGRUploadToken()
		this.props.actions.getGRItemListStatistic({ gr_id: qs.parse(window.location.search.slice(1)).gr_id })
		this.props.actions.getBaseDetail({
			gr_id: qs.parse(window.location.search.slice(1)).gr_id,
			with_purchase_statistic: 1
		})
			.then((res) => {
				const { attachments = {}, is_close_balance } = res.data.result
				const { common_attachments = [] } = attachments
				const fileList = common_attachments.map(one => ({
					name: one.name,
					url: one.absolute_file_path,
					filepath: one.file_path
				}))
				const commonAttachments = fileList.map(one => ({
					name: one.name,
					file_path: one.filepath
				}))
				this.props.setEditState({ commonAttachments: commonAttachments })
				this.setState({ isLoading: false, fileList })
			})
	}
	//验证数字是否大于0
	vailPrice = (rule, value, callback) => {
		const parent = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d{1,2})$/
		if (!parent.test(value) || value < 0 || value > 100) {
			callback('请确认填写的是0-100，小数点后最多2位的数字')
		} else {
			callback()
		}
	}
	//汇率
	vailExchang = (rule, value, callback) => {
		const parent = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d{1,3})$/
		if (!parent.test(value) || value <= 0 || value > 99999999) {
			callback('请确认填写的是0-99999999，小数点后最多3位的数字')
		} else {
			callback()
		}
	}
	//GR总金额
	vailTotalAmount = (rule, value, callback) => {
		const parent = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d{1,2})$/
		if (!parent.test(value) || value > 99999999) {
			callback('请确认填写的是0-99999999，小数点后最多2位的数字')
		} else {
			callback()
		}
	}
	//修改方法
	updateOnBlur = (labelKey) => {
		this.setState({
			totalAmountLoading: true
		})
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const isUsd = values.currency_type == 2
				this.props.actions.updateBaseInfo({
					gr_id: qs.parse(window.location.search.slice(1)).gr_id,
					continue_submit: 2,//是否保存后继续提
					[labelKey]: values[labelKey]
				}).then((res) => {
					this.setState({
						value: values[labelKey],
						editable: false,
						totalAmountLoading: false
					})
					const total_amount = isUsd ? res.data.total_amount_usd : res.data.total_amount
					this.props.form.setFieldsValue({ total_amount: total_amount })//修改总金额
					this.props.form.setFieldsValue({ total_amount_rate: total_amount })//修改总金额
				})
				this.props.setEditState({ errorIsExist: false })
			} else {
				this.props.setEditState({ errorIsExist: true })
				this.setState({
					totalAmountLoading: false
				})
			}
		});
	}
	updateBaseInfoActions = (value, isShowLoading = false) => {
		if (isShowLoading) {
			this.setState({ totalAmountLoading: true })
		}
		this.props.actions.updateBaseInfo(
			{
				gr_id: qs.parse(window.location.search.slice(1)).gr_id,//GR申请单id
				continue_submit: 2,//是否保存后继续提
				...value
			}).then((res) => {
				const total_amount = this.props.form.getFieldValue("currency_type") == 1 ? res.data.total_amount : res.data.total_amount_usd
				this.props.form.setFieldsValue({ total_amount: total_amount })//修改总金额
				if (isShowLoading) {
					this.setState({ totalAmountLoading: false })
				}
			})
	}
	changeFile = (attachments, filelist) => {
		this.props.setEditState({ commonAttachments: attachments })
		this.setState({ fileList: filelist })
	}
	render() {
		const { form, actions: { updateBaseInfo },
			goodsReceipt: { baseDetail = {}, uploadToken = {} }, setEditState } = this.props
		const { fileList, totalAmountLoading } = this.state
		const { attachments,
			tax_rate,
			currency_type, // '1'  '总金额币种 1人民币，2美元',
			exchange_rate, //'0'  '汇率',
			is_tax_inclusive, // '1'  '是否含税：1含税，2不含',
			total_amount, // '总金额（含税和服务费）',
			purchase_with_service_fee = {},
			is_close_balance, // '执行凭证余额是否关闭 1-是 2-否',
			service_fee_rate,
			po_remaining_budget,
			total_amount_usd
		} = baseDetail
		const { getFieldDecorator, getFieldValue } = form;
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: LEFT_COl_Span },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: ROGHT_COl_Span },
			},
		};
		const BaseInfo = [{
			title: "服务费率",
			value: `${scientificToNumber(Number(service_fee_rate))}%`
		}, {
			title: "执行凭证可用余额",
			value: `${po_remaining_budget}  CNY`
		}]
		const GRDetail = [{
			title: "预约订单 GR金额（采购价+服务费）",
			value: purchase_with_service_fee.reservation_items_total_money
		}, {
			title: "微闪投订单 GR金额（采购价+服务费）",
			value: purchase_with_service_fee.campaign_items_total_money
		}, {
			title: "公司拓展业务 GR金额（采购价+服务费）",
			value: purchase_with_service_fee.extended_business_items_total_money
		}]
		return (

			this.state.isLoading ? null : <Form style={{ width: 900, margin: "20px auto" }} className="third-form">
				<Spin spinning={this.state.isLoading}>
					<div className="red-start">*为必填项</div>
					<TitleLable title="执行凭证基本信息" >
						{BaseInfo.map((one, index) => {
							return <Row key={index}>
								<Col span={LEFT_COl_Span}>
									<div className="row-form">{one.title}：</div>
								</Col>
								<Col span={ROGHT_COl_Span} style={{ marginLeft: -6 }}>
									<div className="row-form">{one.value}</div>
								</Col>
							</Row>
						})}
						<FormItem
							{...formItemLayout}
							label="执行凭证余额是否关闭"
						>
							{getFieldDecorator('is_close_balance', {
								initialValue: Number(is_close_balance || 0),
								rules: [{ required: true, message: '请选择执行凭证余额是否关闭' }],
							})(
								<RadioGroup name="radiogroup" onChange={(e) => { this.updateBaseInfoActions({ is_close_balance: e.target.value }) }}>
									<Radio value={1}>是</Radio>
									<Radio value={2}>否</Radio>
								</RadioGroup>
							)}
						</FormItem>
					</TitleLable>
					<TitleLable title="GR金额明细" >
						<div style={{ height: 354 }}>
							{GRDetail.map((one, index) => {
								return <Row key={index}>
									<Col span={LEFT_COl_Span}>
										<div className="row-form">{one.title}：</div>
									</Col>
									<Col span={ROGHT_COl_Span} style={{ marginLeft: -6 }}>
										<div className="row-form"><NumeralFormat value={one.value} /> CNY</div>
									</Col>
								</Row>
							})}
							<FormItem

								{...formItemLayout}
								label="GR总金额币种"
							>
								{getFieldDecorator('currency_type', {
									initialValue: Number(currency_type || 1),
									rules: [{ required: true, message: '请选择GR总金额币种' }],
								})(
									<RadioGroup onChange={(e) => { this.updateBaseInfoActions({ currency_type: e.target.value }, true) }}>
										<Radio value={1}>人民币</Radio>
										<Radio value={2}>美元</Radio>
									</RadioGroup>
								)}
							</FormItem>
							{getFieldValue("currency_type") == 2 ? <FormItem
								{...formItemLayout}
								label="汇率"
							>
								{getFieldDecorator('exchange_rate', {
									initialValue: exchange_rate || 6.511,
									validateFirst: true,
									rules: [{ required: true, message: "请填写汇率" },
									{ validator: this.vailExchang }],
								})(
									<InputNumber
										step={0.001}
										className="edit-service-number"
										onBlur={() => this.updateOnBlur("exchange_rate")}
									/>

								)}
							</FormItem> : null}
							<FormItem
								{...formItemLayout}
								label="GR总金额是否含税"
							>
								{getFieldDecorator('is_tax_inclusive', {
									initialValue: Number(is_tax_inclusive || 1),
									rules: [{ required: true, message: '请选择GR总金额是否含税' }],
								})(
									<RadioGroup name="radiogroup" onChange={(e) => { this.updateBaseInfoActions({ is_tax_inclusive: e.target.value }, true) }}>
										<Radio value={1}>含</Radio>
										<Radio value={2}>不含</Radio>
									</RadioGroup>
								)}
							</FormItem>
							{getFieldValue("is_tax_inclusive") == 1 ? <FormItem
								{...formItemLayout}
								label="税率"
							>
								{getFieldDecorator('tax_rate', {
									initialValue: tax_rate || 6,
									validateFirst: true,
									rules: [{ required: true, message: "请填写税率" },
									{ validator: this.vailPrice }],
								})(
									<InputNumber
										step={0.01}
										className="edit-service-number"
										onBlur={() => this.updateOnBlur("tax_rate")}
									/>
								)}%
							</FormItem> : null}
							<FormItem
								{...formItemLayout}
								label="GR总金额"
							>
								{getFieldDecorator('total_amount', {
									initialValue: currency_type == 1 ? total_amount : total_amount_usd,
									rules: [{ required: true, message: '请填写GR总金额' }],
								})(
									<EditInputNumber
										setEditState={setEditState}
										setStateThird={this.setStateThird}
										totalAmountLoading={totalAmountLoading}
										labelKey="total_amount"
										messageError="请填写GR总金额"
										form={this.props.form}
										vailPrice={this.vailTotalAmount}
										updateBaseInfo={updateBaseInfo}
										unit={getFieldValue("currency_type") == 2 ? "USD" : "CNY"}
									/>
								)}
							</FormItem>
						</div>
					</TitleLable>
					<div style={{ clear: "both" }} ></div>
					<TitleLable title="其他信息" >
						<Row>
							<Col span={8}>
								<div className="row-form">附件信息</div>
							</Col>
							<Col span={16}>
								<div className="row-form-upload" style={{ marginTop: 12 }}>
									<WbyGRUploadFile changeFile={this.changeFile} fileList={fileList} uploadToken={uploadToken} textTop={-4} />
								</div>
							</Col>
						</Row>
					</TitleLable>
				</Spin>
			</Form>
		);
	}
}
const ThirdStepFrom = Form.create()(ThirdStep);
export default ThirdStepFrom;
