import React, { Component } from "react"
import { Button, Form, Input, Radio, Select, Spin } from 'antd'
import { Modal, message } from "antd";
import SimpleTag from "../../base/SimpleTag";

@Form.create()
export class FeedbackCreate extends Component {
	state = { data: [] }

	submit = () => {
		this.props.form.validateFields((err, values) => {
			if (!err) {
				let hide = message.loading('处理中...')
				this.props.actions.addClassifyAuditInfo(values).then(() => {
					hide()
					message.success('我们将在5个工作日内给您反馈，请您耐心等待', 1.5, () => {
						this.props.setModal()
					})
				})
			}
		});
	};

	componentDidMount() {
		const { actions } = this.props
		console.log(actions, "========>");
		actions.getAllClassifyInfos().then(({ data }) => {
			this.setState({
				data
			})
		})
	}

	render() {
		const { form, hasReason, accountInfo } = this.props
		const { getFieldDecorator } = form
		const {
			accountId,
			snsName,
			platformId,
			url,
			classificationList
		} = accountInfo
		return <Modal
			visible
			title='分类错误反馈'
			onCancel={() => this.props.setModal()}
			onOk={() => {
				this.submit()
			}}
			maskClosable={false}
		>
			<Form style={{ position: 'relative' }}>
				<Form.Item label='请选择你期望的分类' colon={false}>
					{
						getFieldDecorator('newClassifyKey', {
							rules: [
								{ required: true, message: '请选择分类' }
							]
						})(
							<Select placeholder='请选择分类'>
								{
									(this.state.data || []).map(o =>
										<Select.Option key={o.classifyKey} value={o.classifyKey}>{o.classifyName}</Select.Option>)
								}
							</Select>
						)
					}
				</Form.Item>
				{hasReason ? <Form.Item label='请选择错误原因' colon={false}>
						{
							getFieldDecorator('wrongReasonType', {
								rules: [
									{ required: true, message: '请选择错误原因' }
								]
							})(
								<Radio.Group>
									<Radio value={1}>与现有业务/受众不一致</Radio>
									<br />
									<Radio value={2}>业务/受众变更</Radio>
								</Radio.Group>
							)
						}
					</Form.Item> :
					getFieldDecorator('wrongReasonType', { initialValue: 0 })(
						<input type="hidden" />)
				}
				<Form.Item label='请填写您的原因' colon={false}>
					{
						getFieldDecorator('description', {
							rules: [
								{ max: 100, message: '最多可输入100个字哦~' }
							]
						})(
							<Input.TextArea
								placeholder='例：博主主做母婴领域，平台分类错误，请尽快修正'
								autosize={{ minRows: 2, maxRows: 2 }}
							/>
						)
					}
				</Form.Item>
				<a
					style={{ position: "absolute", right: 0, top: '10px' }}
					onClick={() => this.props.setModal('mini')}
				>
					未找到分类名称?
				</a>
				{getFieldDecorator('accountId', { initialValue: accountId })(
					<input type="hidden" />)}
				{getFieldDecorator('snsName', { initialValue: snsName })(
					<input type="hidden" />)}
				{getFieldDecorator('platformId', { initialValue: platformId })(
					<input type="hidden" />)}
				{getFieldDecorator('url', { initialValue: url })(
					<input type="hidden" />)}
				{getFieldDecorator('originClassifyKey', { initialValue: classificationList[0].id })(
					<input type="hidden" />)}
			</Form>
		</Modal>
	}
}

@Form.create()
export class FeedbackMini extends Component {
	submit = () => {
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const { actions } = this.props
				let hide = message.loading('处理中...')
				actions.addCustomClassify(values).then(() => {
					hide()
					message.info('反馈成功，我们将尽快处理', 1.5, () => {
						this.props.setModal()
					})
				})
			}
		});
	};

	render() {
		const { form, accountInfo } = this.props
		const { getFieldDecorator } = form
		const {
			accountId,
			snsName,
			platformId,
			url
		} = accountInfo
		return <Modal
			visible
			title='没有找到你内容分类？填写告诉我们'
			onCancel={() => this.props.setModal()}
			onOk={() => {
				this.submit()
			}}
			maskClosable={false}
		>
			<Form colon={false}>
				<Form.Item>
					{
						getFieldDecorator('classifyName', {
							validateFirst: true,
							rules: [
								{
									pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/,
									message: '请填写中英文分类名称'
								},
								{ max: 10, min: 2, message: '最多可输入2~10个字' },
								{ required: true, message: '请填写分类名称' }
							]
						})(
							<Input placeholder='请填写2~10个字' />
						)
					}
				</Form.Item>
				{getFieldDecorator('accountId', { initialValue: accountId })(
					<input type="hidden" />)}
				{getFieldDecorator('snsName', { initialValue: snsName })(
					<input type="hidden" />)}
				{getFieldDecorator('platformId', { initialValue: platformId })(
					<input type="hidden" />)}
				{getFieldDecorator('url', { initialValue: url })(
					<input type="hidden" />)}
			</Form>
		</Modal>
	}
}

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

export class FeedbackView extends Component {
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
									<div className='category-history-item' key={n}>
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
						{auditTypeMap[auditType].desc}
						{auditType === 3 &&
						<a onClick={this.showContact} style={{ marginLeft: '6px' }}>联系客服</a>}
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
									<div className='category-history-item' key={n}>
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
			onOk: () => actions.passClassifyAuditInfo({ classifyAuditInfoId }).then(() => {
				message.success('提交成功', 1.5, () => {
					setModal()
					reload()
				})
			})

		})
	}
	reject = () => {
		this.setState({ reasonModal: true })
	}

	submit = () => {
		const { actions, classifyAuditInfoId, setModal, reload } = this.props
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({ reasonLoading: true })
				actions.rejectClassifyAuditInfo({
					classifyAuditInfoId,
					...values
				}).then(() => {
					this.setState({ reasonLoading: false, reasonModal: false })
					message.success('提交成功', 1.5, () => {
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
									<div className='category-history-item' key={n}>
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
				okButtonProps={{ loading: this.state.reasonLoading }}
				onCancel={() => this.setState({ reasonModal: false })}
				maskClosable={false}
			>
				<Form.Item>
					{getFieldDecorator('description', {
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

