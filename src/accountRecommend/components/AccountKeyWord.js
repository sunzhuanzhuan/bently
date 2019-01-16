import React, { Component } from 'react';
import { Row, Col, Modal, Button, Input, Form, Tooltip, Icon, Radio, Spin } from 'antd';
import { DatePicker } from "antd";
import { bindActionCreators } from 'redux'
import head from '../base/image/icon_head.jpg'
import moment from 'moment';
import { connect } from "react-redux"
import * as actions from "../actions/listApi"
import FilterAction from '../actions/FilterAction'
import Demo from './demo'
import './AccountKeyWord.less'
import qs from 'qs'
const confirm = Modal.confirm;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const dateFormat = 'YYYY-MM-DD';
class AccountKeyWord extends Component {
	state = {
		platformShow: false,
		selectRequire: {},
		loading: true
	}
	constructor(props) {
		super(props);
		this.setCurrentIndex = this.setCurrentIndex.bind(this)
		this.task_id = null
	}
	state = {
		platformData: '',
		DataHistory: '',
		start_time: moment().format('YYYY-MM-DD'),
		end_time: moment().format('YYYY-MM-DD'),
		currentIndex: 0,
		all: false,
		PreviewDate: '',
		arr: [],
	};
	async componentWillMount() {
		let loc = qs.parse(window.location.search.substring(1))
		this.task_id = loc.task_id
		let data = await this.props.actions.getAccountPlatform();
		//请求已经添加的任务
		let DataHistory = this.task_id ? await this.props.actions.OldAddTask({
			task_id: this.task_id
		}) : null
		this.setState({
			platformData: data['data'],
			DataHistory: DataHistory ? DataHistory['data'] : null
		})
	}

	onChangeDate(dates, dateStrings) {
		this.setState({ start_time: dateStrings[0], end_time: dateStrings[1] })
	}
	setCurrentIndex(event) {
		event.currentTarget.className = 'account-platform-select'
		var parent = event.currentTarget.parentNode;
		/*获得父节点的所有孩子节点*/
		var childs = parent.children;
		for (var i = 0; i < childs.length; i++) {
			if (childs[i] !== event.currentTarget) {
				childs[i].className = ''
			}
		}
	}
	// 任务名称效验
	compareName = (rul, value, callback) => {
		if (value == undefined) {
			callback('请录入任务名字');
		}
		else if (value == "") {
			callback('请录入任务名字');
		}
		else if (value.length > 40) {
			callback('任务名称过长，请简洁填写');
		}
		callback()
	};
	handleFormLayoutChange = (e) => {
		this.setState({ formLayout: e.target.value });
	}
	handlePreviewSubmit = async (e) => {
		let self = this
		await this.props.form.validateFields(async (err, values) => {
			if (!err) {
				this.setState({ loading: true })
				let { PreviewDate } = self.state
				!self.task_id ? (
					//创建任务发的请求				
					PreviewDate = await self.props.actions.getPreview({
						...values,
						task_keyword_or: values.task_keyword_or[0],
						task_keyword_and: values.task_keyword_or[1],
						publish_start_time: moment(values.rangePicker[0]['_d']).format('YYYY-MM-DD'),
						publish_end_time: moment(values.rangePicker[1]['_d']).format('YYYY-MM-DD'),
					}).then(response => {
						if (response.code == 200) {
							self.setState({
								PreviewDate: response.data.article_info,
								platformShow: true
							})
						}
						else {
							confirm({
								title: '没有搜到符合的任务请重新填写关键词',
								onOk: () => { }
							})
						}
					})

				) : (
						//修改任务发的请求						
						PreviewDate = await self.props.actions.getPreview({
							task_keyword_or: values.task_keyword_or[0],
							task_keyword_and: values.task_keyword_or[1],
							task_keyword_no: values.task_keyword_no,
							publish_start_time: moment(values.rangePicker[0]['_d']).format('YYYY-MM-DD'),
							publish_end_time: moment(values.rangePicker[1]['_d']).format('YYYY-MM-DD'),
							weibo_type: values.weibo_type
						}).then(response => {
							if (response.code == 200) {
								self.setState({
									PreviewDate: response.data.article_info,
									platformShow: true
								})
							}
							else {
								confirm({
									title: '没有搜到符合的任务请重新填写关键词',
									onOk: () => { }
								})
							}
						})
					)
			}
			this.setState({ loading: false })
		})
	}
	handleSubmit = (e) => {
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const allValue = {
					...values,
					task_keyword_or: values.task_keyword_or[0],
					task_keyword_and: values.task_keyword_or[1],
					publish_start_time: moment(values.rangePicker[0]['_d']).format('YYYY-MM-DD'),
					publish_end_time: moment(values.rangePicker[1]['_d']).format('YYYY-MM-DD')
				}

				!this.task_id ? (
					//创建任务发的请求
					this.props.actions.createTask({ ...allValue }).then(response => {
						if (response.code == 200) {
							this.props.history.push('/recommend/keyWordAccount')
						}
						else {
							confirm({
								title: '没有搜到符合的任务请重新填写关键词',
								onOk: () => { }
							})
						}
					})
				) : (
						//修改任务发的请求
						confirm({
							title: '是否确认对原任务修改？',
							onOk: () => {
								this.props.actions.changeTask({
									...values,
									task_name: values.task_name,
									weibo_type: values.weibo_type,
									task_keyword_or: values.task_keyword_or[0],
									task_keyword_and: values.task_keyword_or[1],
									task_keyword_no: values.task_keyword_no,
									publish_start_time: moment(values.rangePicker[0]['_d']).format('YYYY-MM-DD'),
									publish_end_time: moment(values.rangePicker[1]['_d']).format('YYYY-MM-DD'),
									task_id: this.task_id
								}).then(response => {
									if (response.code == 200) {
										this.props.history.push('/recommend/keyWordAccount')
									}
									else {
										confirm({
											title: '没有搜到符合的任务请重新填写关键词',
											onOk: () => { }
										})
									}
								})
							},
							onCancel() { },
						})
					)
			}
		});
	}

	validatRequired = (rule, value = [], callback) => {
		let val = value.filter(Boolean)
		if (val.length) {
			return callback()
		}
		callback('第二行或第一行请务必填写一行')
	}

	render() {
		let { platformData, DataHistory, PreviewDate } = this.state;
		const { getFieldDecorator } = this.props.form;
		const rangeConfig = !this.task_id ?
			{
				rules: [{ type: 'array', required: true, message: <em style={{ marginLeft: 75, fontStyle: 'normal' }}>请选择您要查询的时间周期</em> }],
			}
			: {
				initialValue: [moment(DataHistory ? DataHistory.publish_start_time : null), moment(DataHistory ? DataHistory.publish_end_time : null)]
			}
		const buttonConfig = {
			rules: [{ required: true, message: <em style={{ fontStyle: 'normal' }}>请选择平台类型</em> }],
			initialValue: DataHistory && this.task_id ? DataHistory.weibo_type : null
		};

		const orConfig = {
			initialValue: [this.task_id && DataHistory.task_keyword_or, this.task_id && DataHistory.task_keyword_and],
			rules: [{ validator: this.validatRequired }]
		};

		const noConfig = {
			initialValue: DataHistory && this.task_id ? DataHistory.task_keyword_no : null
		};
		const formItemLayout = {
			labelCol: { span: 3 },
			wrapperCol: { span: 16 },
		};
		return (
			<div className='account-KeyWord-All clearfix'>
				<div className='account-KeyWord-first'>
					<Row>
						<Col>
							<div className="ant-col-9">
								<h2>{!this.task_id ? '关键词账号推荐>创建任务' : '关键词账号推荐>修改任务'}</h2>
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<div className="ant-col-9"><h3>信息录入</h3></div>
						</Col>
					</Row>
					<Row>
						<div className='form-content'>
							{
								<Form>
									<Row>
										<Col>
											<FormItem {...formItemLayout} label='任务名称'>
												{getFieldDecorator('task_name', {
													initialValue: DataHistory && this.task_id ? DataHistory.task_name : null,
													rules: [{
														validator: this.compareName
													}],
												})(
													<Input className='keyWord-input tackName' type='text' placeholder='单行输入'></Input>
												)}
											</FormItem>
										</Col>
									</Row>
									<Row>
										<Col>
											{platformData ?
												<FormItem
													{...formItemLayout}
													label="平台"
												>
													{getFieldDecorator('weibo_type', buttonConfig)(
														<Radio.Group onChange={this.handleFormLayoutChange} ref={(c) => this.all = c}>
															{
																platformData.map((item, index) => {
																	return <Radio.Button key={index} value={item["weibo_type"]}>{item.name}</Radio.Button>
																})
															}
														</Radio.Group>
													)}
												</FormItem>
												: null}
										</Col>
									</Row>
									<Row>
										<Col push={1} span={23}>
											<FormItem>
												关键词:&nbsp;&nbsp;以下输入框第一行和第二行请务必填写一行，第三行可填可不填
									<Tooltip title="每行最多录入约100个汉字,行与行之间为”且关系“">
													<Icon className='icon-tip' type="question-circle" />
												</Tooltip>
											</FormItem>
										</Col>
									</Row>
									<Row>
										<Col span={16} push={3}>
											{((this.task_id && (orConfig.initialValue[0] || orConfig.initialValue[1])) || !this.task_id) && <FormItem>
												{getFieldDecorator('task_keyword_or', orConfig)(
													<Demo />
												)}
											</FormItem>}
										</Col>
										<Col span={16} push={3}>
											<FormItem>
												{getFieldDecorator('task_keyword_no', noConfig, {
												})(
													<Input className='keyWord-input' type="text"
														placeholder='不能包含任意关键词,用空格分隔（例 保健品）' />
												)}
											</FormItem>
										</Col>
									</Row>
									<Row>
										<Col>
											<FormItem {...formItemLayout}
												label='时间周期:'
											>
												{getFieldDecorator('rangePicker', rangeConfig)(
													<RangePicker
														format={dateFormat}
														ranges={{
															// '今天': [moment(), moment()],
															'昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
															'近一周': [moment().subtract(7, 'days'), moment()],
															'近一月': [moment().subtract(31, 'days'), moment()],
															'近三月': [moment().subtract(93, 'days'), moment()]
														}}
														onChange={this.onChangeDate.bind(this)}
													/>
												)}
											</FormItem>
										</Col>
									</Row>
									<Row className='account-submit-button'>
										<FormItem>
											<Col span={10} pull={1}>
												<Button className='submit-task-button' type="primary" htmlType="submit" onClick={this.handleSubmit}>
													{this.task_id ? '修改任务' : '提交任务'}
												</Button>
											</Col>
											<Col span={10}>
												<Button className='submit-look-button' type="primary" htmlType="submit" onClick={this.handlePreviewSubmit}>
													预览数据
									</Button>
											</Col>
										</FormItem>
									</Row>
								</Form>
							}
						</div>
					</Row>
				</div>
				{/*结果列表*/}
				{this.state.platformShow == true ?
					<div className='account-KeyWord-second'>
						<Row>
							<Col>
								<div className="ant-col-9" style={{ paddingTop: 43 }}><h3 onClick={this.checkResult}>预览结果</h3>
								</div>
							</Col>
						</Row>
						<Row>
							{/* <Col className='account-result'>

								<span>共计文章:{PreviewDate ? PreviewDate["total_account"] : null}篇</span>
								<span style={{ marginLeft: 36 }}>涉及账号:{PreviewDate ? PreviewDate["total_article"] : null}</span>
							</Col> */}
							<Col>
								<h4 style={{ color: 'black' }}>
									以下为部分数据文章预览，请查看以便确认关键词录入的正确性
								</h4>
							</Col>
						</Row>
						<Row className='account-result-article clearfix'>
							<Spin spinning={this.state.loading}>
								{
									PreviewDate ?
										PreviewDate.map((item, index) => {
											return (

												<div key={index} className='result-keyword'>
													<span className='account-result-head'>
														<img src={item['face_url'] ? item['face_url'] : head} alt="" />
													</span>
													<span className='account-result-text clearfix'>
														<em>
															<b>
																{item['weibo_name'] ? item['weibo_name'] : null}

															</b>
															<b className='result-time'>发文日期:{item['publish_time'] ? item['publish_time'] : null}</b>
														</em>
														<a href={item.media_url} target='_blank'>
															<em dangerouslySetInnerHTML={{ __html: item.keyword }}>
															</em>
														</a>
													</span>
												</div>
											)
										})
										: null}
								{/*文章账号详情*/}
							</Spin>
						</Row>
					</div>
					: null}
			</div>)
	}
}
const mapStateToProps = state => (
	{
		...state,
		taskChange: state.taskChange
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
)(Form.create()(AccountKeyWord)))

