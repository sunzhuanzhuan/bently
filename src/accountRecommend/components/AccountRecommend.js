import React, { Component } from 'react';
import { Row, Col, Input, Form, Select, Button, Table, Modal, message } from 'antd';
import './accountRecommend.less';
import { connect } from "react-redux"
import * as actions from "../actions/listApi"
import { bindActionCreators } from 'redux';
import FilterAction from '../actions/FilterAction'
const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;
class AccountRecommend extends Component {
	constructor(props) {
		super(props)
		this.state = {
			platformData: '',
			personTaskData: [],
			totalPage: '',
			current: 1,
			columns: [
				{
					title: 'ID',
					dataIndex: 'task_id',
					key: 'task_id',
					align: 'center',
					width: 45,
					render: (task_id) => {
						return task_id || '-'
					}
				}, {
					title: '任务名称(点击名称进入推荐结果页)',
					dataIndex: 'task_name',
					key: 'task_name',
					align: 'center',
					width: 108,
					render: (task_name, { task_id, weibo_type }) => {
						return <div style={{ cursor: 'pointer' }} onClick={this.pushResult.bind(this, task_id, weibo_type)}>
							{task_name || '-'}
						</div>
					}
				}, {
					title: '平台类型',
					dataIndex: 'weibo_type',
					key: "weibo_type",
					align: 'center',
					width: 70,
					render: (weibo_type) => {
						return <span>{weibo_type == 9 ? '微信' : '微博'}</span>
					}
				}, {
					title: '创建时间',
					dataIndex: 'created_at',
					key: 'created_at',
					align: 'center',
					width: 108,
					render: (created_at) => {
						return <div>
							<span>{created_at || '-'}</span>

						</div>
					}
				}, {
					title: '操作',
					dataIndex: '-',
					key: "action",
					align: 'center',
					width: 98,
					render: (item, { task_id }) => {
						return <Row>
							<Col span={12}>
								<Button type="primary" size='small' onClick={this.changeTask.bind(this, task_id)}>修改任务
						</Button></Col>
							<Col span={12}>
								<Button type="primary" size='small' onClick={this.delectTask.bind(this, task_id)}>删除任务
						</Button></Col>
						</Row>
					}
				}
			]
		}

	}

	async componentWillMount() {
		let personTaskData = await this.props.actions.getpersonTask({ page: this.state.current })
		let data = await this.props.actions.getTotalPlatform()
		this.setState({

			platformData: data['data'],
			personTaskData: personTaskData['data'].list,
			totalPage: personTaskData['data'].total
		})
	}
	searchSubmit = () => {
		this.props.form.validateFields(async (err, values) => {
			let newData = await this.props.actions.getpersonTask({ page: this.state.current = 1, ...values });
			this.setState({ personTaskData: newData['data'].list })
		})
	}

	//任务
	addTask = () => {
		this.props.history.push('/recommend/keyWordAccount/AccountTaskAdd')
	}
	pushResult = (taskId, weiboType) => {
		this.props.history.push('/recommend/keyWordAccount/AccountKeywordResult?task_id=' + taskId + '&weibo_type=' + weiboType)
	};
	changeTask = (taskId) => {
		this.props.actions.accountTaskChange(true)
		this.props.history.push('/recommend/keyWordAccount/AccountTaskAdd?task_id=' + taskId)
	}
	delectTask = (taskId) => {
		confirm({
			title: '删除后数据无法恢复，是否删除该任务?',
			onOk: () => {
				this.props.actions.delectTask({ task_id: taskId }).then(async response => {
					if (response.code == 200) {
						let personTaskData = await this.props.actions.getpersonTask({ page: this.state.current })
						this.setState({ personTaskData: personTaskData.data.list })
						message.success('删除任务成功');
					}
				},
				)
			},
			onCancel() { }
		});
	}
	async changePage(page) {
		let personTaskData = await this.props.actions.getpersonTask({ page: page })
		this.setState({
			current: page,
			personTaskData: personTaskData['data'].list
		});
	}

	render() {
		let { platformData, totalPage, } = this.state;
		const { getFieldDecorator } = this.props.form;
		let primary_key = 'key'
		let dataSoure = this.state.personTaskData
		return (
			<div>
				<div style={{ height: 'auto' }}>
					<Row>
						<Col>
							<div className="ant-col-5"><h2>关键词账号推荐</h2></div>
						</Col>
					</Row>
					<Row>
						<fieldset className='account-fieldset'>
							<legend>说明</legend>
							<p>*适用于有明确关键词发文历史的账号推荐。</p>
							<p>*推荐将依据KOL账号近段时间历史发文内容与关键词匹配情况进行推荐，可帮助用户精准选择KOL资源。</p>
						</fieldset>
					</Row>
					<Row>
						<Form layout="inline">
							<Row gutter={16} className='account-search'>
								<Col className="gutter-row" span={8} push={2}>
									<div className="gutter-box">
										{platformData ?
											<FormItem label="平台类型">
												{getFieldDecorator('weibo_type', {
												})(
													<Select allowClear placeholder='所有平台' style={{ width: 150 }}>
														{platformData.map((item, index) => {
															return <Option key={index} value={item['weibo_type']} >{item.name}</Option>
														})}
													</Select>
												)}
											</FormItem>
											: null}
									</div>
								</Col>
								<Col className="gutter-row" span={8}>
									<div className="gutter-box">
										<FormItem label='任务名称'>
											{getFieldDecorator('task_name', {
											})(
												<Input type="text" placeholder='单行输入' />
											)}
										</FormItem>
									</div>
								</Col>
								<Col className="gutter-row" span={4} pull={2}>
									<div className="gutter-box">
										<FormItem>
											<Button type="primary" htmlType="submit" onClick={this.searchSubmit}>
												搜索
							</Button>
										</FormItem>
									</div>
								</Col>
								<Col className="gutter-row" span={4} pull={4}>
									<div className="newCreateTask">
										<Button type="primary" htmlType="submit" onClick={this.addTask.bind(this)}>
											新建任务
										</Button>
									</div>
								</Col>
							</Row>
							<Row>
								<main>
									<Table
										pagination={{
											pageSize: 20,
											current: this.state.current,
											total: totalPage,
											onChange: this.changePage.bind(this)
										}}
										bordered columns={this.state.columns}
										rowKey={record => record[primary_key]}
										// loading={this.state.tableLoading}
										dataSource={dataSoure}
									/>
								</main>
							</Row>
						</Form>
					</Row>
				</div>

			</div>
		)
	}
}
const mapStateToProps = state => (

	{
		filterParams: state.filterParams,
		postApi: state.postApi,
		PersonHistory: state.PersonHistory,
	}

)
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...actions,
		...FilterAction
	}, dispatch)
})
export default (connect(
	mapStateToProps,
	mapDispatchToProps
)(Form.create()(AccountRecommend)))

