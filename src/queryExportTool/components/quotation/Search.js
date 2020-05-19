import React, { Component } from 'react';
import { Form, Select, Row, Col, Input, Button } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
import { withRouter } from "react-router-dom";
import qs from 'qs'
import SelectCompany from "@/components/exportTemplate/components/SelectCompany";
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
		const { form, searchTab } = this.props
		form.validateFields((err, values) => {
			if (!err) {
				const { generationTime } = values
				const allValue = {
					...values,
					companyId: values.companyId && values.companyId.key,
					createdAtBegin: generationTime && generationTime[0] && generationTime[0].format("YYYY-MM-DD"),
					createdAtEnd: generationTime && generationTime[1] && generationTime[1].format("YYYY-MM-DD")
				}
				delete allValue.generationTime
				this.props.history.push({
					search: `?` + qs.stringify(allValue)
				})
				searchTab(allValue)

			}
		})
	}
	render() {
		const { isStencil, getCompanyList } = this.props
		const searchValue = qs.parse(this.props.location.search.substring(1))
		const { getFieldDecorator } = this.props.form
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 },
		};
		const formItemLayout2 = {
			labelCol: { span: 9 },
			wrapperCol: { span: 15 },
		};
		return (

			<Form>
				<Row>
					<Col span={6}>
						<FormItem
							{...formItemLayout}
							label="所属公司"
						>
							{getFieldDecorator('companyId', {
								initialValue: searchValue.companyId
							})(
								<SelectCompany style={{ width: '100%' }} action={getCompanyList} />
							)}
						</FormItem>
					</Col>
					<Col span={7}>
						<FormItem
							{...formItemLayout2}
							label={isStencil ? "模版名称/简介" : "报价单名称"}
						>
							{getFieldDecorator('name', {
								initialValue: searchValue.name
							})(
								<Input placeholder="请输入关键词" />
							)}
						</FormItem>
					</Col>
					{isStencil ? null : <Col span={7}>
						<FormItem
							{...formItemLayout}
							label="创建时间"
						>
							{getFieldDecorator('generationTime', {
								initialValue: isStencil ? "" : searchValue.createdAtBegin && [moment(searchValue.createdAtBegin), moment(searchValue.createdAtEnd)]
							})(
								<RangePicker format={dateFormat} />
							)}
						</FormItem>
					</Col>}
					<Col span={4}>
						<FormItem>
							<Button type="primary" onClick={this.searchClick} style={{ marginLeft: 20 }}>查询</Button>
							<Button style={{ marginLeft: 10 }} onClick={() => {
								this.props.form.resetFields()
								this.props.history.push({
									search: `?` + qs.stringify({})
								})
							}}>清空</Button>
						</FormItem>
					</Col>
					{isStencil ? <Col span={7} >
						<FormItem><Button type="primary" style={{ float: "right", marginRight: 20 }} onClick={() => this.props.setTypeShow(2, true)}>+新建模版</Button></FormItem>
					</Col> : null}
				</Row>

			</Form>
		);
	}
}
const SearchDownFrom = Form.create()(SearchDown);
export default withRouter(SearchDownFrom);
