import React, { Component } from 'react'
import { Form, Input, Select, Button } from 'antd';
const FormItem = Form.Item;
import qs from 'qs'
import { withRouter } from 'react-router-dom'
class SearchResourcesForm extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	submitForm = () => {
		const search = qs.parse(this.props.location.search.substring(1))
		this.props.form.validateFields((err, values) => {
			this.props.actions.getRoleList({
				app_id: search.app_id,
				resourceName: values.resourceName,
				page: 1
			})
		})
	}
	render() {
		const { form, } = this.props;
		const { getFieldDecorator } = form;
		return (
			<Form layout='inline' style={{ textAlign: "right" }}>
				<FormItem label="资源名称">
					{getFieldDecorator('resourceName')(
						<Input placeholder="请输入资源名称" />
					)}
				</FormItem>
				<FormItem >
					<Button type='primary' onClick={this.submitForm}>搜索</Button>
				</FormItem>
			</Form>
		)
	}
}

export default Form.create()(withRouter(SearchResourcesForm));
