import React, { Component } from 'react'
import { Form, Input, Button, Select, DatePicker } from "antd";
import selectMap from "../../constants/SelectMap";
import SearchSelect from "@/base/SearchSelect";
import './RequisitionSearch.less';
const FormItem = Form.Item
const Option = Select.Option;
const { RangePicker } = DatePicker;
const InputGroup = Input.Group;
class RequisitionSearch extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	searchClick = (e) => {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {

			if (!err) {
				const { operated_at } = values
				values = this.handleQueryParams(values)
				const gr_ids = (values.gr_ids && values.gr_ids.split(/[\s]/) || []).join(",")
				const po_code = (values.po_code && values.po_code.split(/[\s]/) || []).join(",")
				if (po_code) {
					values.po_code = po_code
				}
				if (gr_ids) {
					values.gr_ids = gr_ids
				}
				const begin = operated_at && operated_at[0] && operated_at[0].format("YYYY-MM-DD")
				const end = operated_at && operated_at[1] && operated_at[1].format("YYYY-MM-DD")
				let operated_at_Now = null
				if (begin && end) {
					operated_at_Now = [begin, end]
				}
				this.props.getGRListAsync({
					...values,
					page_size: 50,
					operated_at: operated_at_Now

				})
			}
		});
	}
	/***
	 * 处理搜索参数
	 */
	handleQueryParams = (data) => {
		//处理输入框的前后空格
		['gr_serial_number', 'po_code'].forEach((item) => {
			if (data[item]) {
				data[item] = data[item].replace(/(^\s*)|(\s*$)/g, "")
			}
		});
		//处理带搜索的下拉筛选项的值
		['company_id', 'brand_id', 'creator_id', 'project_id'].forEach((item) => {
			if (data[item]) {
				data[item] = data[item].key
			}
		});
		return data
	}
	render() {
		const { form, actions, goodsReceiptIsAEPermission } = this.props
		const { getFieldDecorator } = form;
		const { getGRProjectList,
			getGRBrandList,
			getGRCreatorList,
			getGRCompanyList } = actions
		//内审人员没有GR申请单状态的筛选条件没有草稿 、已作废状态
		const grOrderStatusList = goodsReceiptIsAEPermission ?
			selectMap.grOrderStatusList :
			selectMap.grOrderStatusList.filter(one => one.value != "1" && one.value != "2")
		return (
			<Form layout="inline" className="requisition-search-form-flex">
				<FormItem
					label="公司简称"
				>
					{getFieldDecorator('company_id', {
						// rules: [{ required: true, message: 'Please input your username!' }],
					})(
						<SearchSelect style={{ width: 200 }} placeholder="请选择" action={getGRCompanyList} wordKey='name'
							mapResultItemToOption={({ company_id, name } = {}) => ({
								value: company_id,
								label: name
							})} />
					)}
				</FormItem>
				<FormItem
					label="创建人"
				>
					{getFieldDecorator('creator_id', {
						// rules: [{ required: true, message: 'Please input your username!' }],
					})(
						<SearchSelect placeholder="请选择" isEmptySearch={true} action={getGRCreatorList} wordKey='name'
							mapResultItemToOption={({ owner_admin_id, real_name } = {}) => ({
								value: owner_admin_id,
								label: real_name
							})}
						/>
					)}
				</FormItem>
				<FormItem
					label="时间"
				>
					<InputGroup compact>
						{getFieldDecorator('operation_type', {
							initialValue: "2"
							// rules: [{ required: true, message: 'Please input your username!' }],
						})(
							<Select style={{ minWidth: 120 }} className="time-left-select-box" >
								{selectMap.timeSelect.map(one => <Option
									key={one.value}
									value={one.value
									}>{one.name}</Option>)}
							</Select>
						)}

						{getFieldDecorator('operated_at')(
							<RangePicker />
						)}
					</InputGroup>
				</FormItem>
				<FormItem
					label="GR币种"
				>
					{getFieldDecorator('currency_type', {
						initialValue: "0"
						// rules: [{ required: true, message: 'Please input your username!' }],
					})(
						<Select style={{ minWidth: 100 }}>
							{selectMap.currentType.map(one => <Option
								key={one.value}
								value={one.value
								}>{one.name}</Option>)}
						</Select>
					)}
				</FormItem>
				<FormItem
					label="GR申请单状态"
				>
					{getFieldDecorator('status', {
						initialValue: goodsReceiptIsAEPermission ? "0" : "3"
						// rules: [{ required: true, message: 'Please input your username!' }],
					})(
						<Select style={{ minWidth: 200 }}>
							{grOrderStatusList.map(one => <Option
								key={one.value}
								value={one.value
								}>{one.name}</Option>)}
						</Select>
					)}
				</FormItem>

				<FormItem
					label="所属项目"
				>
					{getFieldDecorator('project_id', {
						// rules: [{ required: true, message: 'Please input your username!' }],
					})(
						<SearchSelect style={{ width: 150 }} placeholder="请选择" isEmptySearch={true} action={getGRProjectList} wordKey='name' />
					)}
				</FormItem>
				<FormItem
					label="所属品牌"
				>
					{getFieldDecorator('brand_id', {
						// rules: [{ required: true, message: 'Please input your username!' }],
					})(
						<SearchSelect style={{ width: 150 }} placeholder="请选择" isEmptySearch={true} action={getGRBrandList} wordKey='name'
							mapResultItemToOption={({ id, view_name } = {}) => ({
								value: id,
								label: view_name
							})} />)}
				</FormItem>
				<FormItem
					label="GR申请单号"
				>
					{getFieldDecorator('gr_ids', {
						// rules: [{ required: true, message: 'Please input your username!' }],
					})(
						<Input placeholder="请输入GR申请单号，多个以空格隔开" style={{ minWidth: 300 }} />
					)}
				</FormItem>
				<FormItem
					label="执行凭证号（PO号）"
				>
					{getFieldDecorator('po_code', {
						// rules: [{ required: true, message: 'Please input your username!' }],
					})(
						<Input placeholder="请输入PO单号，多个以空格隔开" style={{ minWidth: 300 }} />
					)}
				</FormItem>
				<FormItem>
					<Button type="primary" onClick={this.searchClick}>查询</Button>
				</FormItem>

			</Form>
		);
	}
}
const RequisitionSearchFrom = Form.create()(RequisitionSearch);

export default RequisitionSearchFrom;
