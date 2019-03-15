

import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from '../actions/index'
import { Form, Button, message, Input, Spin } from 'antd';
import { PaymentMethod, CooperationMethod, SettlementMethod, PaymentCompany } from "../components/common";
const { TextArea } = Input;
class AgentEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			agentByIdDetail: {}
		};
	}
	componentDidMount = () => {
		const { agentId, actions, form } = this.props
		this.props.form.resetFields()
		form.resetFields()
		if (agentId > 0) {
			this.setState({
				isLoading: true
			})
			actions.getAgentById({ id: agentId }).then(({ data }) => {
				this.setState({
					isLoading: false,
					agentByIdDetail: data
				})
			})
		}
	}
	onEditOk = (e) => {
		e.preventDefault();
		const { actions, agentId } = this.props
		const { insertAgent, updateAgent } = actions
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const data = { ...values, ...values.agentVo }
				if (agentId) {
					updateAgent(data).then(() => {
						this.commEditAction()
					})
				} else {
					insertAgent(data).then(() => {
						this.commEditAction()
					})
				}
			}
		});
	}
	commEditAction = () => {
		const { seachAgentByPage } = this.props
		seachAgentByPage()
		message.success('操作成功')
		this.onClean()
	}
	onClean = () => {
		const { setShowModal } = this.props
		setShowModal(false, null)
	}
	agentVali = (rule, value, callback) => {
		const reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
		if (reg.test(value)) {
			callback()
			//'代理商名称不可重复'
		} else {
			callback('最多可输入40个以内的中英文及数字！')
		}
	}

	render() {
		const { form, agentId } = this.props
		const { agentByIdDetail } = this.state
		const { getFieldDecorator } = form
		const formLayout = {
			labelCol: { span: 4 },
			wrapperCol: { span: 20 },
		}
		const commonProps = {
			form,
			formLayout,
			dataDefault: agentByIdDetail
		}
		return (
			<Spin spinning={this.state.isLoading}>
				<Form layout="horizontal">
					{agentId ? <Form.Item style={{ display: 'none' }}>
						{getFieldDecorator('id', {
							initialValue: agentByIdDetail && agentByIdDetail.id,
						})(
							<Input placeholder="请输入代理商名称" />
						)}
					</Form.Item> : null}
					<Form.Item label="代理商名称"{...formLayout}>
						{getFieldDecorator('agentName', {
							initialValue: agentByIdDetail && agentByIdDetail.agentName,
							rules: [
								{ required: true, message: '本项为必填项，请输入！' },
								{ max: 40, message: "最多可输入40个以内的中英文及数字！" },
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
							{getFieldDecorator('agentRemark', {
								initialValue: agentByIdDetail && agentByIdDetail.agentRemark,
								rules: [
									{ max: 100, message: "最多可输入100个字!" }
								],
							})(
								<TextArea rows={3} placeholder="最多100个字" />
							)}
						</Form.Item>
					</div>
					<div style={{ textAlign: "center", marginBottom: 10 }}>
						<Button onClick={this.onClean}>取消</Button>
						<Button type="primary" onClick={this.onEditOk} style={{ marginLeft: 30 }}>提交</Button>
					</div>
				</Form>
			</Spin>
		);
	}
}
const AgentEditFrom = Form.create()(AgentEdit);
const mapStateToProps = (state) => {
	return {
		cooperationPlatformReducer: state.cooperationPlatformReducer
	}
}
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(action, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(AgentEditFrom);
