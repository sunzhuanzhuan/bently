

import React, { Component } from 'react'
import { Form, Button, Modal, Input } from 'antd';
import { PaymentMethod, CooperationMethod, SettlementMethod, PaymentCompany } from "../components/common";
const { TextArea } = Input;
class AgentEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	onSearch = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			const { time } = values
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	}
	onClean = () => {
		this.props.form.resetFields()
	}
	agentVali = (rule, value, callback) => {
		const reg = /^[\u4e00-\u9fa5]+$/;
		if (reg.test(value)) {
			callback('代理商名称不可重复')
		} else {
			callback()
		}

	}
	render() {
		const { form } = this.props
		const { getFieldDecorator } = form
		const formLayout = {
			labelCol: { span: 4 },
			wrapperCol: { span: 20 },
		}
		const commonProps = {
			form,
			formLayout,
		}
		return (
			<Form layout="horizontal">
				<Form.Item label="代理商名称"{...formLayout}>
					{getFieldDecorator('select', {
						rules: [
							{ required: true, message: '请输入代理商名称' },
							{ max: 40, message: "最多可输入40个字符" },
							{ validator: this.agentVali }
						],
					})(
						<Input placeholder="请输入代理商名称" />
					)}
				</Form.Item>
				<CooperationMethod {...commonProps} />
				<PaymentCompany {...commonProps} />
				<SettlementMethod {...commonProps} isAgent={true} />
				<PaymentMethod  {...commonProps} />
				<div style={{ marginTop: 10 }}>
					<Form.Item label="备注"{...formLayout}>
						{getFieldDecorator('selectremark', {
							rules: [
								{ max: 100, message: "最多可输入100个字符" }
							],
						})(
							<TextArea rows={3} placeholder="最多100个字" />
						)}
					</Form.Item>
				</div>
				<div style={{ textAlign: "center", marginBottom: 10 }}>
					<Button onClick={() => { this.props.setShowModal(false, null) }}>取消</Button>
					<Button type="primary" onClick={this.onSearch} style={{ marginLeft: 30 }}>提交</Button>
				</div>
			</Form>
		);
	}
}
const AgentEditFrom = Form.create()(AgentEdit);

export default AgentEditFrom;

