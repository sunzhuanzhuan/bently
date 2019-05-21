import React, { Component } from 'react'
import {
	Button,
	Form,
	Select,
	DatePicker,
	Table,
	Tooltip,
	message,
	Badge, Input
} from 'antd';
import moment from 'moment'

const Option = Select.Option;
//筛选
const FormItem = Form.Item;

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
				const timeList = ["startTime", "endTime"]
				timeList.forEach(item => {
					if (values[item]) {
						values[item] = values[item].format('YYYY-MM-DD')
					}
				})
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
		const { getFieldDecorator } = this.props.form;
		return (
			<Form layout="inline" onSubmit={this.submit} style={{ marginBottom: '16px' }}>
				<FormItem label="处理状态" >
					{getFieldDecorator('status')(
						<Select style={{ width: 130 }} placeholder={'请选择'} allowClear>
							<Option value="1">待处理</Option>
							<Option value="2">处理中</Option>
							<Option value="3">处理完成</Option>
							<Option value="4">处理失败</Option>
						</Select>
					)}
				</FormItem>
				<FormItem label="操作人" >
					{getFieldDecorator('createdBy')(
						<Input placeholder='请输入'/>
					)}
				</FormItem>
				<FormItem label="提交时间">
					{getFieldDecorator('startTime', {})(
						<DatePicker format='YYYY-MM-DD' placeholder="请选择开始时间"
							disabledDate={this.disabledStartDate}
							onChange={this.onStartChange}
						/>
					)}
				</FormItem>
				<FormItem label='~ ' colon={false}>
					{getFieldDecorator('endTime', {})(
						<DatePicker format='YYYY-MM-DD' placeholder="请选择结束时间"
							disabledDate={this.disabledEndDate}
							onChange={this.onEndChange}
						/>
					)}
				</FormItem>
				<FormItem>
					<Button
						type="primary"
						loading={this.props.loading}
						htmlType='submit'
					>
						筛选
					</Button>
				</FormItem>
			</Form>
		)
	}
}

const processStatus = {
	'1' : {
		status: 'default',
		text: '待处理'
	},
	'2' : {
		status: 'processing',
		text: '处理中'
	},
	'3' : {
		status: 'success',
		text: '处理完成'
	},
	'4' : {
		status: 'error',
		text: '处理失败'
	},
}

export default class ProcessResult extends Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			loading: true,
			params: {
				pageNum: 1,
				pageSize: 20
			}
		}
		this.columns = [
			{
				title: '文件名称',
				dataIndex: 'fileName',
				align: 'center',
				render: (text = '', record) =>
					<Tooltip title={text} arrowPointAtCenter>
						<a onClick={() => this.download(record.sourceUrl)}
						>{this.cut(text)}{text.length > 8 ? '...' : ''}</a>
					</Tooltip>
			}, {
				title: '涉及账号',
				dataIndex: 'accountNum',
				align: 'center',
				render: (text) => text || '--'
			}, {
				title: '操作人',
				dataIndex: 'createdBy',
				align: 'center'
			}, {
				title: '操作时间',
				dataIndex: 'createdAt',
				align: 'center',
				render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss')
			}, {
				title: '状态',
				dataIndex: 'status',
				align: 'center',
				render: (text) => {
					return <Badge status="success" {...processStatus[text]}/>
				}
			}, {
				title: '操作',
				align: 'center',
				render: (text, record) => {
					return record.status === 3 ?
						<a onClick={() => this.download(record.resultUrl)}>下载处理结果</a> : '-'
				}
			}
		];
	}


	componentDidMount() {
		this.search()
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
		this.props.actions.getWhitelistResult(newParams).finally(() => {
			this.setState({
				loading: false
			})
		})
	}
	//下载处理结果
	download = (url) => {
		this.props.actions.getFileRealPath({ downLoadUrl: url }).then((res) => {
			if (res.code === 1000) {
				window.location.href = res.data
			} else {
				message.error("下载地址获取失败")
			}
		}).catch(() => {
			message.error("下载地址获取失败")
		})
	}

	render() {

		const { data: { whitelistResult: source } } = this.props
		return (
			<div>
				<Filter
					search={this.search}
					loading={this.state.loading}
				/>
				<Table dataSource={source.list} columns={this.columns}
					bordered={true}
					loading={this.state.loading}
					rowKey='id'
					pagination={{
						current: source.pageNum,
						pageSize: source.pageSize,
						pageSizeOptions:['20','50','100'],
						showSizeChanger: true,
						total: source.total,
						onShowSizeChange: (current, pageSize) => {
							this.search({ pageSize })
						},
						onChange: (pageNum, pageSize) => {
							this.search({ pageNum, pageSize })
						},
						size: 'small'
					}}
				/>
			</div>
		)
	}
}
