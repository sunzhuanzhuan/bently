import React, { Component } from 'react'
import { Form, Input, Button, Popconfirm } from "antd";
const FormItem = Form.Item
const { TextArea } = Input;
class AuditRejection extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.refuseReasonLength = false
	}
	onConfirm = () => {
		const { form, auditOperate } = this.props
		auditOperate({ audit_type: 2, refuse_reason: form.getFieldValue("refuse_reason") })
	}
	vailRefuseReason = (rule, value, callback) => {
		if (value) {
			if (value.length > 100) {
				callback('最多不能超过100个字')
			} else {
				callback()
			}
		} else {
			callback()
		}
	}
	render() {
		const { form, onCancel } = this.props
		const { getFieldDecorator, getFieldValue } = form;
		const refuseReasonLength = (getFieldValue("refuse_reason") && getFieldValue("refuse_reason") || "").length
		return (
			<Form>
				<div style={{ height: 100 }}>
					<FormItem
						label="填写拒绝原因"
					>
						{getFieldDecorator('refuse_reason', {
							rules: [{ required: true, message: '填写拒绝原因' }
								, { validator: this.vailRefuseReason }],
						})(
							<TextArea rows={4} placeholder="请填写拒绝原因，不超过100个字" />
						)}
					</FormItem>
				</div>
				<div style={{ textAlign: "right", marginTop: 45 }}>
					<Button onClick={onCancel}>
						取消
					</Button>
					{refuseReasonLength > 100 || refuseReasonLength < 1 ?
						<Button type="primary" style={{ marginLeft: 20 }} onClick={() => this.props.form.validateFields()}>
							确定
					</Button> :
						<Popconfirm title="是否确认审核拒绝该GR申请单" okText="确定" cancelText="取消" onConfirm={this.onConfirm}>
							<Button type="primary" style={{ marginLeft: 20 }}>
								确定
							</Button>
						</Popconfirm>}
				</div>
			</Form>
		);
	}
}
const AuditRejectionForm = Form.create()(AuditRejection);
export default AuditRejectionForm;
