import React, { Component } from 'react'
import {
	Button,
	Form,
	Select,
	DatePicker,
	Table,
	Tooltip,
	message,
	Badge, Input, Row, Col
} from 'antd';
import moment from "moment";
import EmSpan from "../../base/EmSpan";
import { WBYPlatformIcon } from "wbyui";
import { FeedbackView, FeedbackReview } from "./CategoryFeedbackModal";

const Option = Select.Option;

const FormItem = Form.Item;

const { RangePicker } = DatePicker;

//筛选
@Form.create()
class Filter extends Component {
	constructor(props) {
		super(props)
		this.state = {
			startValue: null,
			endValue: null
		}
	}

	componentDidMount() {
		this.submit()
	}

	submit = (e) => {
		e && e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				const timeList = ["startTime", "endTime"]
				timeList.forEach((item, n) => {
					if (values['time'] && values['time'][n]) {
						values[item] = values['time'][n].format('YYYY-MM-DD HH:mm:ss')
					}else {
						values[item] = undefined
					}
				})
				delete values['time']
				this.props.search({ ...values, pageNum: 1 })
			}
		});
	}

	disabledStartDate = (startValue) => {
		const endValue = this.state.endValue;
		if (!startValue || !endValue) {
			return false;
		}
		return startValue.valueOf() > endValue.valueOf();
	}

	disabledEndDate = (endValue) => {
		const startValue = this.state.startValue;
		if (!endValue || !startValue) {
			return false;
		}
		return endValue.valueOf() <= startValue.valueOf();
	}
	onChange = (field, value) => {
		this.setState({
			[field]: value
		});
	}

	onStartChange = (value) => {
		this.onChange('startValue', value);
	}

	onEndChange = (value) => {
		this.onChange('endValue', value);
	}

	render() {
		const formItemLayout = {
			labelCol: { span: 7 },
			wrapperCol: { span: 17 }
		};
		const statusFormItemLayout = {
			labelCol: { span: 8 },
			wrapperCol: { span: 16 }
		};
		const { getFieldDecorator } = this.props.form;
		return (
			<Form
				className={'filter-form-layout-flex'}
				layout="inline"
				onSubmit={this.submit}
				style={{ marginBottom: '16px' }}
			>
				<Row gutter={20}>
					<Col span={6}>
						<FormItem label="主账号名称">
							{getFieldDecorator('userIdentityName')(
								<Input placeholder='请输入' />
							)}
						</FormItem>
					</Col>
					<Col span={6}>
						<FormItem label="account_id">
							{getFieldDecorator('accountId')(
								<Input placeholder='请输入' />
							)}
						</FormItem>
					</Col>
					<Col span={6}>
						<FormItem label="平台">
							{getFieldDecorator('platformId')(
								<Select placeholder={'请选择'} allowClear>
									{
										this.props.platforms.map(item =>
											<Option key={item.id} value={item.id}>{item.platformName}</Option>)
									}
								</Select>
							)}
						</FormItem>
					</Col>
					<Col span={6}>
						<FormItem label="账号名称">
							{getFieldDecorator('snsName')(
								<Input placeholder='请输入' />
							)}
						</FormItem>
					</Col>
					<Col span={12}>
						<FormItem label={<EmSpan length={5}>提交时间</EmSpan>}>
							{getFieldDecorator('time', {})(
								<RangePicker
									format='YYYY-MM-DD HH:mm:ss'
									showTime
									style={{ width: "100%" }}
								/>
							)}
						</FormItem>
					</Col>
					<Col span={6}>
						<FormItem label="状态">
							{getFieldDecorator('auditType', {
								initialValue: '1'
							})(
								<Select placeholder={'请选择'}>
									<Option value="1">待处理</Option>
									<Option value="2">已更新</Option>
									<Option value="3">已驳回</Option>
								</Select>
							)}
						</FormItem>
					</Col>
					<Col span={6}>
						<FormItem>
							<Button
								type="primary"
								loading={this.props.loading}
								htmlType='submit'
							>
								查询
							</Button>
							<Button style={{ marginLeft: "10px" }} onClick={() => this.props.form.resetFields()}>
								重置
							</Button>
						</FormItem>
					</Col>
				</Row>
			</Form>
		)
	}
}

const processStatus = {
	'1': {
		status: 'warning',
		text: '待处理'
	},
	'2': {
		status: 'success',
		text: '已更新'
	},
	'3': {
		status: 'error',
		text: '已驳回'
	}
}
export default class ClassificationReview extends Component {
	state = {
		modal: '',
		classifyAuditInfoId: '',
		params: {
			pageNum: 1,
			pageSize: 20
		}
	}

	constructor(props, context) {
		super(props, context);
		this.columns = [
			{
				title: '状态',
				dataIndex: 'auditType',
				align: 'center',
				render: (text = 1, record) => {
					return <Badge status="success" {...processStatus[text]} />
				}
			},
			{
				title: 'account_id',
				dataIndex: 'accountId',
				render: (text, record) => <a target='_blank' href={`/account/manage/update/${record.platformId}?account_id=${text}`}>{text}</a>
			}, {
				title: '平台/账号名称',
				dataIndex: 'platformId',
				render: (text, record) => <div className='platform-icon-text'>
					<WBYPlatformIcon weibo_type={text} widthSize={22} />
					<a target='_blank' href={record.url} className='text' style={{ maxWidth: 120 }} title={record.snsName}>{record.snsName || '--'}</a>
				</div>

			}, {
				title: '主账号名称',
				dataIndex: 'userIdentityName',
				align: 'center'
			}, {
				title: '原分类',
				dataIndex: 'originClassifyName',
				align: 'center'
			}, {
				title: '期望分类',
				dataIndex: 'newClassifyName',
				align: 'center'
			}, {
				title: '提交人(端口)/处理人',
				dataIndex: 'createdByName',
				align: 'center',
				render: (text, record) => <div>
					{text}({record.createdFrom === 1 ? 'B' : 'C'})/{record.modifiedByName || '-'}
				</div>
			}, {
				title: '处理时间',
				dataIndex: 'createdAt',
				align: 'center',
				render: (text, record) => <div>
					{text && <div>提交时间: {moment(text).format('YYYY-MM-DD HH:mm:ss')}</div>}
					{record.modifiedAt && <div>处理时间: {moment(record.modifiedAt).format('YYYY-MM-DD HH:mm:ss')}</div>}
				</div>
			}, {
				title: '操作',
				dataIndex: 'id',
				fixed: 'right',
				align: 'center',
				width: 100,
				render: (text, record) => <div>
					{record.auditType === 1 ?
					<a onClick={() => this.setModal('review', text)}>处理反馈</a> :
					<a onClick={() => this.setModal('view', text)}>查看详情</a>}
				</div>
			}
		];
	}

	//截取8个字
	cut = (text) => {
		let txt = text.substring(0, 8)
		return txt
	}

	//查询
	search = (params) => {
		let newParams = {
			...this.state.params,
			...params
		}
		this.setState({
			loading: true,
			params: newParams
		})
		this.props.actions.getClassifyFeedbackList(newParams).finally(() => {
			this.setState({
				loading: false
			})
		})
	}
	//下载处理结果
	downloadDealResult = (url) => {
		this.props.actions.downloadDealResult({ downLoadUrl: url }).then((res) => {
			if (res.code === 1000) {
				window.location.href = res.data
			} else {
				message.error("下载地址获取失败")
			}
		}).catch(() => {
			message.error("下载地址获取失败")
		})
	}

	setModal = (type, id) => {
		this.setState({ modal: type, classifyAuditInfoId: id })
	}

	render() {
		const { classifyAuditInfoId, modal } = this.state
		const { data: { classifyFeedbackList: source }, platforms } = this.props
		return (
			<div>
				<Filter
					search={this.search}
					loading={this.state.loading}
					platforms={platforms}
				/>
				<div style={{ marginBottom: '10px' }} className='clearfix'>
					<span style={{ lineHeight: "32px" }}>筛选结果条数: {source.total || '-'} 条</span>
				</div>
				<Table dataSource={source.list} columns={this.columns}
					scroll={{ x: 1500 }}
					loading={this.state.loading}
					rowKey='id'
					pagination={{
						current: source.pageNum,
						pageSize: source.pageSize || 20,
						pageSizeOptions: ['20', '50', '100'],
						showSizeChanger: true,
						total: source.total,
						onShowSizeChange: (current, pageSize) => {
							this.search({ pageSize })
						},
						onChange: (pageNum, pageSize) => {
							this.search({ pageNum, pageSize })
						}
					}}
				/>
				{modal === 'view' && <FeedbackView
					setModal={this.setModal}
					actions={this.props.actions}
					reload={this.search}
					classifyAuditInfoId={classifyAuditInfoId}
				/>}
				{modal === 'review' && <FeedbackReview
					setModal={this.setModal}
					actions={this.props.actions}
					reload={this.search}
					classifyAuditInfoId={classifyAuditInfoId}
				/>}
			</div>
		)
	}
}
