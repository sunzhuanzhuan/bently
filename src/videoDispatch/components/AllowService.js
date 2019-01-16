import React, { Component } from 'react';
import { Checkbox, Form } from "antd";
const FormItem = Form.Item
class AllowService extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//是否同意协议
			isAllowService: true,
		};

	}
	//是否同意
	changeCheckBox = (e) => {
		this.setState({
			isAllowService: e.target.checked
		})
		this.props.setFieldsValue({
			is_allow_service: e.target.checked ? true : null
		})
	}
	//是否同意验证
	vailIsAllowService = (rule, value, callback) => {
		if (value) {
			callback()
		} else {
			callback("您未同意账号服务协议")
		}
	}
	render() {
		const { formItemLayout, getFieldDecorator } = this.props
		const { isAllowService } = this.state
		return (
			<FormItem  {...formItemLayout} >
				{getFieldDecorator('is_allow_service', {
					initialValue: true,
					validateFirst: true,
					rules: [{
						validator: this.vailIsAllowService
					}],
				})(
					<Checkbox checked={isAllowService} style={{ fontSize: 12 }} onChange={this.changeCheckBox}>同意微播易 </Checkbox>
				)}
				<a href='/hwrule' style={{ fontSize: 12 }}>（原微播易）服务协议</a>
			</FormItem>
		);
	}
}

export default AllowService;
