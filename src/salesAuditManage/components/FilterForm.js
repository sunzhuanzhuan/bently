import React, { Component, PureComponent } from 'react'
import { Form, Input, Button, DatePicker, Select } from 'antd';
import PositiveNumber from "../base/PositiveNumber/index";
import SelectFrom from "../base/SelectFrom/index";
import moment from 'moment';
import SearchSelect from "@/base/SearchSelect";
import { linkStatus, dataStatus } from '../constans/config'

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD HH:mm:ss';
const FormItem = Form.Item;
function strDateAry(list = []) {
	return list.map(moment => moment && moment.toJSON())
}
function parseDateAry(list = []) {
	try {
		return list.map(str => moment(str))
	} catch (e) {
		return []
	}
}
const Option = Select.Option;

@Form.create()
export default class FilterForm extends Component {
	state = {}
	triggerChange = (changedValue) => {
		const search = this.props.search;
		search && search(changedValue);
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				let params = { ...values }
				params['execution_link_of_sale_check_time'] = strDateAry(values['execution_link_of_sale_check_time'])
				params['execution_data_of_sale_check_time'] = strDateAry(values['execution_data_of_sale_check_time'])
				console.log('formValues :', params);
				this.triggerChange({ page: 1, pageSize: 20, ...params })
			}
		});
	}

	constructor(props) {
		super(props)
		this.dataStatusList = Object.entries(dataStatus).map(([key, name]) => ({
			label: name,
			value: key
		}))
		this.linkStatusList = Object.entries(linkStatus).map(([key, name]) => ({
			label: name,
			value: key
		}))
	}

	render() {
		const { form, actions, platforms, initialValue } = this.props
		const {
			brand,
			company,
			data_check_status_for_sale,
			execution_data_of_sale_check_time,
			execution_evidence_code,
			link_check_status_for_sale,
			execution_link_of_sale_check_time,
			order_id,
			project,
			requirement_id,
			sale_manager,
			weibo_name,
			weibo_type
		} = initialValue
		const { getFieldDecorator } = form
		const { ROGetProject, ROGetCompanyName, ROGetBrand, ROGetSalesManager } = actions
		return (
			<Form layout="inline" onSubmit={this.handleSubmit}>
				<PositiveNumber title="订单ID" initialValue={order_id} field="order_id" {...form} />
				<PositiveNumber title="需求ID" initialValue={requirement_id} field="requirement_id" {...form} />
				<FormItem label='执行凭证编号'>
					{getFieldDecorator('execution_evidence_code', {
						initialValue: execution_evidence_code,
					})(<Input placeholder={`请输入执行凭证编号`} style={{width: '160px'}}/>)}
				</FormItem>
				<FormItem label="项目">
					{getFieldDecorator("project", {
						initialValue: project
					})(<SearchSelect placeholder="请选择" isEmptySearch={true} action={ROGetProject} wordKey='name' />)}
				</FormItem>
				<FormItem label="销售经理">
					{getFieldDecorator("sale_manager", {
						initialValue: sale_manager
					})(<SearchSelect placeholder="请选择" isEmptySearch={true} action={ROGetSalesManager} wordKey='name'
						mapResultItemToOption={({ owner_admin_id, real_name } = {}) => ({
							value: owner_admin_id,
							label: real_name
						})} />)}
				</FormItem>
				<FormItem label="品牌">
					{getFieldDecorator("brand", {
						initialValue: brand
					})(<SearchSelect placeholder="请选择"isEmptySearch={true}  action={ROGetBrand} wordKey='name'
						mapResultItemToOption={({ id, view_name } = {}) => ({
							value: id,
							label: view_name
						})} />)}
				</FormItem>
				<FormItem label="厂商简称">
					{getFieldDecorator("company", {
						initialValue: company
					})(
						<SearchSelect placeholder="请选择" action={ROGetCompanyName} wordKey='name'
							mapResultItemToOption={({ company_id, name } = {}) => ({
								value: company_id,
								label: name
							})} />)}
				</FormItem>
				<FormItem label="账号名称">
					{getFieldDecorator("weibo_name", {
						initialValue: weibo_name
					})(
						<Input placeholder={`请输账号名称`} />
					)}
				</FormItem>
				<SelectFrom title="平台" field="weibo_type" initialValue={weibo_type} {...form} listSelect={platforms} />
				<FormItem label="链接审核时间">
					{getFieldDecorator("execution_link_of_sale_check_time", {
						initialValue: parseDateAry(execution_link_of_sale_check_time)
					})(
						<RangePicker format={dateFormat} showTime />)}
				</FormItem>
				<FormItem label="数据审核时间">
					{getFieldDecorator("execution_data_of_sale_check_time", {
						initialValue: parseDateAry(execution_data_of_sale_check_time)
					})(
						<RangePicker format={dateFormat} showTime />)}
				</FormItem>
				<FormItem label='链接审核状态'>
					{getFieldDecorator('link_check_status_for_sale', {
						initialValue: link_check_status_for_sale || {
							key: '3',
							label: '未审核'
						}
					})(
						<Select showSearch labelInValue optionFilterProp='children' placeholder='请选择' style={{ width: '120px' }}>
							{this.linkStatusList.map(({label, value}) => <Option key={value}> {label} </Option>)}
						</Select>
					)}
				</FormItem>
				<FormItem label='数据审核状态'>
					{getFieldDecorator('data_check_status_for_sale', {
						initialValue: data_check_status_for_sale || {
							key: '0',
							label: '全部订单'
						}
					})(
						<Select showSearch labelInValue optionFilterProp='children' placeholder='请选择' style={{ width: '120px' }}>
							{this.dataStatusList.map(({label, value}) => <Option key={value}> {label} </Option>)}
						</Select>
					)}
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit">搜索</Button>
				</FormItem>
			</Form>
		);
	}
}
