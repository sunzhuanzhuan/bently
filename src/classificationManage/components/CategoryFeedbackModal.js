import React, { Component } from "react"
import { Button, Form, Input, Radio, Select, Spin } from 'antd'
import { Modal, message } from "antd";
import SimpleTag from "../../base/SimpleTag";

const auditTypeMap = {
	'1': {
		code: 1,
		text: '待处理',
		desc: '我们将尽快处理您提交的需求，请耐心等待'
	},
	'2': {
		code: 2,
		text: '已更新',
		desc: '感谢您的反馈，给您造成的不便我们深表歉意~'
	},
	'3': {
		code: 3,
		text: '已驳回',
		desc: '如您对反馈处理结果不满意，您可'
	}
}

export class FeedbackDetail extends Component {
	state = {
		loading: true
	}

	showContact = () => {
		Modal.info({
			title: '直接添加客服QQ号',
			content: '3460666273'
		})
	}

	componentDidMount() {
		const { actions, classifyAuditInfoId } = this.props
		actions.getAuditDialogInfo({ classifyAuditInfoId }).then(({ data }) => {
			this.setState({
				...data,
				loading: false
			})
		})
	}

	render() {
		const {
			loading,
			wrongReasonType,
			newClassifyKey,
			auditType = 1,
			classifyAuditDialogLogList = []
		} = this.state
		return <Modal
			visible
			title='查看反馈'
			onCancel={() => this.props.setModal()}
			footer={null}
			maskClosable={false}
		>
			<Spin spinning={loading}>
				<div className='category-feedback-detail-wrapper'>
					<header>
						当前反馈状态: {auditTypeMap[auditType].text}
					</header>
					<div className='category-content'>
						期望分类: <SimpleTag>{newClassifyKey}</SimpleTag>
					</div>
					<div className='category-desc'>
						{/*{auditTypeMap[auditType].desc}
						{auditType === 3 &&
						<a onClick={this.showContact} style={{ marginLeft: '6px' }}>联系客服</a>}*/}
					</div>
					<main>
						<header>协商历史</header>
						{
							classifyAuditDialogLogList.map((data, n) => {
								return data.sourceType === 2 ?
									<div className='category-history-item' key={n}>
										<div className='image-wrapper'>
											<img src="" alt="" />
										</div>
										<div className='content-wrapper'>
											<div className='info name'>
												系统
												<b>{data.createdAt}</b>
											</div>
											{
												auditType === 2 &&
												<div className='info'>
													内容分类更新为【{newClassifyKey}】
												</div>
											}
											{
												auditType === 3 &&
												<div className='info'>
													审核失败
												</div>
											}
											{
												auditType === 3 &&
												<div className='info'>
													审核失败原因: {data.description}
												</div>
											}
										</div>
									</div> :
									<div className='category-history-item'>
										<div className='image-wrapper'>
											<img src="" alt="" />
										</div>
										<div className='content-wrapper'>
											<div className='info name'>
												博主
												<b>{data.createdAt}</b>
											</div>
											<div className='info'>
												错误原因: {wrongReasonType === 1 ? "与现有业务/受众不一致" : wrongReasonType === 2 ? "业务/受众变更" : '--'}
											</div>
											<div className='info'>
												期望分类: {newClassifyKey}
											</div>
											<div className='info'>
												原因: {data.description}
											</div>
										</div>
									</div>
							})
						}
					</main>
				</div>
			</Spin>
		</Modal>
	}
}

@Form.create()
export class FeedbackReview extends Component {
	state = {
		loading: true
	}

	componentDidMount() {
		const { actions, classifyAuditInfoId } = this.props
		actions.getAuditDialogInfo({ classifyAuditInfoId }).then(({ data }) => {
			this.setState({
				...data,
				loading: false
			})
		})
	}

	agree = () => {
		const { actions, classifyAuditInfoId, setModal, reload } = this.props
		Modal.confirm({
			title: '是否确定更新分类',
			content: <SimpleTag>{this.state.newClassifyKey}</SimpleTag>,
			onOk: () => {
				// 发请求
				message.success('提交成功', 1.5, () => {
					setModal()
					reload()
				})

			}
		})
	}
	reject = () => {
		this.setState({ reasonModal: true })
	}

	submit = () => {
		const { actions, classifyAuditInfoId, setModal, reload } = this.props
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				// 发请求
				message.success('提交成功', 1.5, () => {
					this.setState({ reasonModal: false }, () => {
						setModal()
						reload()
					})
				})
			}
		})
	}

	render() {
		const {
			loading,
			wrongReasonType,
			newClassifyKey,
			auditType = 1,
			classifyAuditDialogLogList = [],
			reasonModal
		} = this.state

		const { getFieldDecorator } = this.props.form
		return <Modal
			visible
			title='处理反馈'
			onCancel={() => this.props.setModal()}
			footer={null}
			maskClosable={false}
		>
			<Spin spinning={loading}>
				<div className='category-feedback-detail-wrapper'>
					<header>
						当前反馈状态: {auditTypeMap[auditType].text}
					</header>
					<div className='category-content'>
						期望分类: <SimpleTag>{newClassifyKey}</SimpleTag>
					</div>
					<div style={{ textAlign: 'right', padding: '10px 0' }}>
						<Button type='primary' ghost onClick={this.agree} style={{ marginLeft: '6px' }}>通过</Button>
						<Button type='primary' ghost onClick={this.reject} style={{ marginLeft: '6px' }}>驳回</Button>
					</div>
					<main>
						<header>协商历史</header>
						{
							classifyAuditDialogLogList.map((data, n) => {
								return data.sourceType === 2 ?
									<div className='category-history-item' key={n}>
										<div className='image-wrapper'>
											<img src="" alt="" />
										</div>
										<div className='content-wrapper'>
											<div className='info name'>
												系统
												<b>{data.createdAt}</b>
											</div>
											{
												auditType === 2 &&
												<div className='info'>
													内容分类更新为【{newClassifyKey}】
												</div>
											}
											{
												auditType === 3 &&
												<div className='info'>
													审核失败
												</div>
											}
											{
												auditType === 3 &&
												<div className='info'>
													审核失败原因: {data.description}
												</div>
											}
										</div>
									</div> :
									<div className='category-history-item'>
										<div className='image-wrapper'>
											<img src="" alt="" />
										</div>
										<div className='content-wrapper'>
											<div className='info name'>
												博主
												<b>{data.createdAt}</b>
											</div>
											<div className='info'>
												错误原因: {wrongReasonType === 1 ? "与现有业务/受众不一致" : wrongReasonType === 2 ? "业务/受众变更" : '--'}
											</div>
											<div className='info'>
												期望分类: {newClassifyKey}
											</div>
											<div className='info'>
												原因: {data.description}
											</div>
										</div>
									</div>
							})
						}
					</main>
				</div>
			</Spin>
			<Modal
				visible={this.state.reasonModal}
				title='请填写驳回理由'
				width={380}
				centered
				onOk={this.submit}
				onCancel={() => this.setState({ reasonModal: false })}
				maskClosable={false}
			>
				<Form.Item>
					{getFieldDecorator('reason', {
						rules: [
							{ required: true, message: '请填写驳回原因' },
							{ max: 100, message: '最多可输入100字' }
						]
					})(
						<Input.TextArea
							placeholder='必填项, 最多可输入100字'
							autosize={{ minRows: 4, maxRows: 5 }}
						/>
					)}
				</Form.Item>
			</Modal>
		</Modal>
	}
}
