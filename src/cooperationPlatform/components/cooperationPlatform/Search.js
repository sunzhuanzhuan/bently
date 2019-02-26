import React, { Component } from 'react'
import { Form, Input, Select, DatePicker, Button } from 'antd';
const Option = Select.Option;
const defultTime = "YYYY:MM:DD HH:mm:ss"
class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	onSearch = (e) => {
		e.preventDefault();
		const { searchAsync, form } = this.props
		form.validateFields((err, values) => {
			const { time } = values
			if (!err) {
				const begin = time && time[0] && time[0].format(defultTime)
				const end = time && time[0] && time[0].format(defultTime)
				searchAsync({ ...values, begin, end })
			}
		});
	}
	onClean = () => {
		this.props.form.resetFields()
	}
	render() {
		const { getFieldDecorator } = this.props.form
		return (
			<Form layout="inline">
				<Form.Item label="下单平台" >
					{getFieldDecorator('platform')(
						<Input placeholder="请输入" />
					)}
				</Form.Item>
				<Form.Item label="平台状态">
					{getFieldDecorator('select')(
						<Select placeholder="请选择" style={{ width: 200 }}>
							<Option value="china">China</Option>
							<Option value="usa">U.S.A</Option>
						</Select>
					)}
				</Form.Item>
				<div style={{ marginTop: 10 }}>
					<Form.Item label="创建时间">
						{getFieldDecorator('time')(
							<DatePicker.RangePicker showTime format={defultTime} />
						)}
					</Form.Item>
					<div style={{ float: "right" }}>
						<Button onClick={this.onClean}>重置</Button>
						<Button type="primary" onClick={this.onSearch} style={{ margin: "0px 20px" }}>查询</Button>
					</div>
				</div>
			</Form>
		);
	}
}
const SearchFrom = Form.create()(Search);

export default SearchFrom;
