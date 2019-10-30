import React, { Component } from 'react';
import { Form, Select, Row, Col, Input, Button } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
import { withRouter } from "react-router-dom";
import qs from 'qs'
import SelectCompany from "@/components/exportTemplate/components/SelectCompany";
import AuthVisbleIsBP from '@/queryExportTool/containers/AuthVisbleIsBP'
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const FormItem = Form.Item
const Option = Select.Option
class SearchDown extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	searchClick = () => {
		const { form, setValueSearch } = this.props
		form.validateFields((err, values) => {
			if (!err) {
				const { generation_time } = values
				const allValue = {
					...values,
					company_id: values.company_id && values.company_id.key,
					company_name: values.company_id && values.company_id.label,
					created_at_begin: generation_time && generation_time[0] && generation_time[0].format("YYYY-MM-DD"),
					created_at_end: generation_time && generation_time[1] && generation_time[1].format("YYYY-MM-DD")
				}
				delete allValue.generation_time
				setValueSearch(allValue)
			}
		})
	}

	render() {
		const { getCompanyList } = this.props
		const searchValue = qs.parse(this.props.location.search.substring(1))
		const { getFieldDecorator, setFieldsValue } = this.props.form
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 17 },
		};
		const formItemLayout3 = {
			labelCol: { span: 3 },
			wrapperCol: { span: 17 },
		};
		return (
			<Form layout="inline">
				<AuthVisbleIsBP noComponent={<FormItem
					{...formItemLayout}
					label="所属公司"
					style={{ width: "30%" }}
				>
					{getFieldDecorator('company_id', {
						initialValue: (searchValue && searchValue.company_id > 0) ? { key: searchValue.company_id, label: searchValue.company_name } : undefined
					})(
						<SelectCompany style={{ width: '100%' }} action={getCompanyList} />
					)}
				</FormItem>} isComponent={null} />
				<FormItem
					{...formItemLayout}
					label="报价单名称"
					style={{ width: "30%" }}
				>
					{getFieldDecorator('keyword', {
						initialValue: searchValue.keyword
					})(
						<Input placeholder="请输入关键词" />
					)}
				</FormItem>
				<FormItem
					{...formItemLayout3}
					label="状态"
					style={{ width: "25%" }}
				>
					{getFieldDecorator('process_status', {
						initialValue: searchValue.process_status
					})(
						<Select placeholder="请选择" allowClear>
							<Option value="1">处理中</Option>
							<Option value="2">已完成</Option>
							<Option value="3">失败</Option>
						</Select>
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="生成时间"
					style={{ width: "30%" }}
				>
					{getFieldDecorator('generation_time', {
						initialValue: searchValue.created_at_begin && [moment(searchValue.created_at_begin), moment(searchValue.created_at_end)]
					})(
						<RangePicker format={dateFormat} allowClear />
					)}
				</FormItem>
				<FormItem>
					<Button type="primary" onClick={this.searchClick}>查询</Button>
					<Button style={{ marginLeft: 10 }} onClick={() => {
						this.props.form.resetFields()
						this.props.history.push({
							search: `?` + qs.stringify({})
						})
					}}>清空</Button>
				</FormItem>
			</Form>
		);
	}
}
const SearchDownFrom = Form.create()(SearchDown);
export default withRouter(SearchDownFrom);
