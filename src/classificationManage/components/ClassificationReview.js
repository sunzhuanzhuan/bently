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
import EmSpan from "../../base/EmSpan";
import { WBYPlatformIcon } from "wbyui";
import { FeedbackDetail, FeedbackReview } from "./CategoryFeedbackModal";

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

	submit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				const timeList = ["queryStartTime", "queryEndTime"]
				timeList.forEach((item, n) => {
					if (values['time'] && values['time'][n]) {
						values[item] = values['time'][n].format('YYYY-MM-DD')
					}
				})
				this.props.search({ ...values, page: 1 })
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
							{getFieldDecorator('name')(
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
							{getFieldDecorator('status')(
								<Select placeholder={'请选择'} allowClear>
									<Option value="1">待处理</Option>
									<Option value="2">处理中</Option>
									<Option value="3">处理完成</Option>
									<Option value="4">处理失败</Option>
								</Select>
							)}
						</FormItem>
					</Col>
					<Col span={6}>
						<FormItem label="账号名称">
							{getFieldDecorator('name2')(
								<Input placeholder='请输入' />
							)}
						</FormItem>
					</Col>
					<Col span={12}>
						<FormItem label={<EmSpan length={5}>提交时间</EmSpan>}>
							{getFieldDecorator('time', {})(
								<RangePicker
									format='YYYY-MM-DD'
									style={{ width: "100%" }}
								/>
							)}
						</FormItem>
					</Col>
					<Col span={6}>
						<FormItem label="状态">
							{getFieldDecorator('status2')(
								<Select placeholder={'请选择'} allowClear>
									<Option value="1">待处理</Option>
									<Option value="2">处理中</Option>
									<Option value="3">处理完成</Option>
									<Option value="4">处理失败</Option>
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
		loading: true,
		modal: '',
		classifyAuditInfoId: '',
		params: {
			page: 1,
			pageSize: 20,
		}
	}

	componentDidMount() {
		this.search()
	}

	constructor(props, context) {
		super(props, context);
		this.columns = [
			{
				title: '状态',
				dataIndex: 'accountId2',
				align: 'center',
				render: (text = 1, record) => {
					return <Badge status="success" {...processStatus[text]} />
				}
			},
			{
				title: 'account_id',
				dataIndex: 'accountId',
				render: (text, record) => <a>{text}</a>
			}, {
				title: '平台/账号名称',
				dataIndex: 'platformId',
				render: (text, record) => <div className='platform-icon-text'>
					<WBYPlatformIcon weibo_type={text || '9'} widthSize={22} />
					<a className='text' style={{ maxWidth: 120 }} title={record.weiboName}>{record.weiboName || '账号名称账号名称账号名称'}</a>
				</div>

			}, {
				title: '主账号名称',
				dataIndex: 'status',
				align: 'center'
			}, {
				title: '原分类',
				dataIndex: 'createdAt',
				align: 'center'
			}, {
				title: '期望分类',
				dataIndex: 'createdAt2',
				align: 'center'
			}, {
				title: '提交人(端口)/处理人',
				dataIndex: 'statu2s',
				align: 'center'
			}, {
				title: '处理时间',
				dataIndex: 'statu3s',
				align: 'center',
				render: text => 'YYYY-MM-DD HH:mm:ss'
			}, {
				title: '操作',
				dataIndex: 'statu4s',
				fixed: 'right',
				width: 100,
				render: (text, record) => <div>
					{record.status === 1 &&  <a onClick={() => this.setModal('review', record.classifyAuditInfoId)}>处理反馈</a>}
					{record.status === 2 &&  <a onClick={() => this.setModal('detail', record.classifyAuditInfoId)}>查看详情</a>}
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
		console.log(newParams, '---->>>>>');
		setTimeout(() => {
			this.setState({
				loading: false
			})
		}, 1000);
		/*this.props.actions.getNewDealResultList(newParams).finally(() => {
			this.setState({
				loading: false
			})
		})*/
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

	setModal = (type,id) => {
		this.setState({ modal: type, classifyAuditInfoId: id })
	}

	render() {
		const { classifyAuditInfoId, modal } = this.state
		return (
			<div>
				<Filter
					search={this.search}
					loading={this.state.loading}
				/>
				<div style={{ marginBottom: '10px' }} className='clearfix'>
					<span style={{ lineHeight: "32px" }}>筛选结果条数: 50条</span>
				</div>
				<Table dataSource={[{ status: 1 }, { status: 2 }]} columns={this.columns}
					scroll={{ x: 1500 }}
					loading={this.state.loading}
					rowKey='id'
					pagination={{
						current: this.state.params.page,
						pageSize: this.state.params.pageSize,
						pageSizeOptions: ['20', '50', '100'],
						showSizeChanger: true,
						total: 100,
						onShowSizeChange: (current, pageSize) => {
							this.search({ pageSize })
						},
						onChange: (page, pageSize) => {
							this.search({ page, pageSize })
						}
					}}
				/>
				{modal === 'detail' && <FeedbackDetail
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
