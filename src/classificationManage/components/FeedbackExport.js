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
import apiDownload from '@/api/apiDownload'
import Interface from '../constants/Interface'

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
					} else {
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
							{getFieldDecorator('identityName')(
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


const columns = [
	{
		title: 'account_id',
		dataIndex: 'accountId',
		align: 'center',
		render: (text, record) =>
			<a target='_blank' href={`/account/manage/update/${record.platformId}?account_id=${text}`}>{text}</a>
	}, {
		title: '平台',
		dataIndex: 'platformName',
		align: 'center'
	}, {
		title: '账号名称',
		dataIndex: 'snsName',
		align: 'center',
		render: (text, record) => <a href={record.url}>{text}</a>
	}, {
		title: '分类',
		dataIndex: 'classifyName',
		align: 'center'
	}, {
		title: '主账号名称',
		dataIndex: 'identityName',
		align: 'center'
	}, {
		title: '提交人',
		dataIndex: 'userName',
		align: 'center'
	}, {
		title: '端口',
		dataIndex: 'createdFromName',
		align: 'center'
	}, {
		title: '提交时间',
		dataIndex: 'createdAt',
		align: 'center',
		render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss')
	}
];
export default class FeedbackExport extends Component {
	state = {
		params: {
			pageNum: 1,
			pageSize: 20
		}
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
		this.props.actions.getCustomClassifyList(newParams).finally(() => {
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

	exportResult = () => {
		// this.props.actions.exportCustomClassifyList(this.state.params)
		apiDownload({
			url: Interface.exportCustomClassifyList,
			method: 'POST',
			data: this.state.params,
		}, '导出结果.xlsx')
	}

	render() {
		const { data: { customClassifyList: source }, platforms } = this.props
		return (
			<div>
				<Filter
					search={this.search}
					loading={this.state.loading}
					platforms={platforms}
				/>
				<div style={{ marginBottom: '10px' }} className='clearfix'>
					<span style={{ lineHeight: "32px" }}>筛选结果条数: {source.total || '-'} 条</span>
					<Button onClick={this.exportResult} style={{ float: 'right' }} type='primary'>导出</Button>
				</div>
				<Table dataSource={source.list} columns={columns}
					bordered={true}
					loading={this.state.loading}
					rowKey='id'
					pagination={{
						current: source.pageNum,
						pageSize: source.pageSize,
						total: source.total,
						onChange: (pageNum, pageSize) => {
							this.search({ pageNum, pageSize })
						}
					}}
				/>
			</div>
		)
	}
}
