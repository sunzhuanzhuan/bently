import React, { Component } from 'react';
import { Form, Select, Row, Col, Input, Button } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
import { withRouter } from "react-router-dom";
import qs from 'qs'
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const FormItem = Form.Item
const Option = Select.Option
class BatchSearch extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	searchClick = () => {
		const { form, setValueSearch } = this.props
		form.validateFields((err, values) => {
			if (!err) {
				const { generationTime } = values
				const allValue = {
					...values,
					currentPage: 1,
					pageSize: 20,
          createAtStartTime: generationTime && generationTime[0] && generationTime[0].format("YYYY-MM-DD"),
          createAtEndTime: generationTime && generationTime[1] && generationTime[1].format("YYYY-MM-DD")
				}
				delete allValue.generationTime
				setValueSearch(allValue)
			}
		})
	}
	render() {
		const { companyList } = this.props
		const searchValue = qs.parse(this.props.location.search.substring(1))
		const { getFieldDecorator } = this.props.form
		const formItemLayout = {
			labelCol: { span: 8 },
			wrapperCol: { span: 16 },
		};
		return (
			<Form>
				<Row>
					<Col span={5}>
						<FormItem
							{...formItemLayout}
							label="文件名称"
						>
							{getFieldDecorator('taskName', {
								initialValue: searchValue.taskName
							})(
                <Input placeholder="请输入关键词" autoComplete="off"/>
							)}
						</FormItem>
					</Col>
					<Col span={5}>
						<FormItem
							{...formItemLayout}
							label="状态"
						>
							{getFieldDecorator('processStatus', {
								initialValue: searchValue.processStatus
							})(
                <Select placeholder="请选择" style={{ width: 150 }} allowClear getPopupContainer={triggerNode => triggerNode.parentNode}>
									<Option value="1">处理中</Option>
									<Option value="2">已完成</Option>
									<Option value="3">失败</Option>
								</Select>
							)}
						</FormItem>
					</Col>

					<Col span={7}>
						<FormItem
							{...formItemLayout}
							label="生成时间"
						>
							{getFieldDecorator('generationTime', {
								initialValue: searchValue.createdAtBegin && [moment(searchValue.createdAtBegin), moment(searchValue.createdAtEnd)]
							})(
                <RangePicker format={dateFormat} getCalendarContainer={triggerNode => triggerNode.parentNode}/>
							)}
						</FormItem>
					</Col>
					<Col span={4}>
						<FormItem style={{ marginLeft: 20 }}>
							<Button type="primary" onClick={this.searchClick}>查询</Button>
							<Button style={{ marginLeft: 10 }} onClick={() => {
								this.props.form.resetFields()
								this.props.history.push({
									search: `?` + qs.stringify({})
								})
							}}>清空</Button>
						</FormItem>

					</Col>
				</Row>

			</Form>
		);
	}
}
const BatchSearchFrom = Form.create()(BatchSearch);
export default withRouter(BatchSearchFrom);

