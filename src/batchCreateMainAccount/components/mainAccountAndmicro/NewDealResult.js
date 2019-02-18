import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Form, Select, DatePicker, Table, Tooltip, message } from 'antd';
import * as dealResultAction from '../../actions/dealResult.js'
import { statusDotColor, operateType, statusName } from '../../constants/config'
import './DealResult.less'

const Option = Select.Option;
//筛选
const FormItem = Form.Item;
const Filter = (props) => {
	const formItemLayout = {
		labelCol: { span: 7 },
		wrapperCol: { span: 17 }
	};
	const statusFormItemLayout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 }
	};
	const { getFieldDecorator } = props.form;
	return (
		<div className="filter-box">
			<FormItem
				{...statusFormItemLayout}
				label="处理状态"
				className="form-item-marginLeft"
			>
				{getFieldDecorator('status', {
					initialValue: '0'
				})(
					<Select style={{ width: 130 }}>
						<Option value="0">请选择</Option>
						<Option value="1">待处理</Option>
						<Option value="2">处理中</Option>
						<Option value="3">处理完成</Option>
						<Option value="4">处理失败</Option>
					</Select>
				)}
			</FormItem>
			<FormItem
				{...formItemLayout}
				label="批量操作类型"
				className="form-item-marginLeft"
			>
				{getFieldDecorator('operateClass', {
					initialValue: '0'
				})(
					<Select style={{ width: 210 }}>
						<Option value='0' key='0'>请选择</Option>
						{
							props.selectionList.map(item =>
								<Option value={item.classNameKey} key={item.classNameKey}>{item.classNameValue}</Option>
							)
						}
					</Select>
				)}
			</FormItem>
			<FormItem
				label="提交时间"
				className="startTime"
			>
				{getFieldDecorator('queryStartTime', {

				})(
					<DatePicker format='YYYY-MM-DD' placeholder="请选择开始时间"
						disabledDate={props.disabledStartDate}
						onChange={props.onStartChange}
					/>
				)}
			</FormItem>
			<span className="dealResult-center">~</span>
			<FormItem>
				{getFieldDecorator('queryEndTime', {

				})(
					<DatePicker format='YYYY-MM-DD' placeholder="请选择结束时间"
						disabledDate={props.disabledEndDate}
						onChange={props.onEndChange}
					/>
				)}
			</FormItem>
			<FormItem>
				<Button type="primary" onClick={() => props.search()}
					loading={props.loading}
				>查询</Button>
			</FormItem>
		</div>
	)
}

//主页面
class NewDealResult extends Component {
	constructor(props) {
		super(props)
		this.state = {
			startValue: null,
			endValue: null,
			searchLoading: true,
			tableLoading: true
		}
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
			[field]: value,
		});
	}

	onStartChange = (value) => {
		this.onChange('startValue', value);
	}

	onEndChange = (value) => {
		this.onChange('endValue', value);
	}
	componentWillMount() {
		this.props.actions.getSelectionList().then(() => {
			this.setState({
				searchLoading: false
			})
			this.dealSearchValues(this.props.actions.getNewDealResultList, { currentPage: 1, pageSize: 50 })
		}).catch(() => {
			message.error("筛选数据加载失败")
			this.setState({
				searchLoading: false,
				tableLoading: false
			})
		})
	}
	componentWillReceiveProps(props) {
		if (props.tab3Update == true) {
			this.props.cancelTab3Update()
			this.props.form.resetFields()
			this.setState({
				tableLoading: true
			})
			this.dealSearchValues(
				this.props.actions.getNewDealResultList, { currentPage: 1, pageSize: 50 }
			)
		}
	}
	//截取15个字
	cut = (text) => {
		let txt = text.substring(0, 15)
		return txt
	}
	//处理查询条件
	dealSearchValues = (fun, page) => {
		let values = this.props.form.getFieldsValue();
		Object.keys(values).forEach(item => {
			if (values[item] == "0" || !values[item]) {
				delete values[item]
			}
		})
		const timeList = ["queryStartTime", "queryEndTime"]
		timeList.forEach(item => {
			if (values[item]) {
				values[item] = values[item].format('YYYY-MM-DD')
			}
		})
		let trueValue = {
			page: { ...page },
			form: { ...values }
		}
		fun({ ...trueValue }).then(() => {
			this.setState({
				tableLoading: false
			})
		}).catch(() => {
			message.error("列表数据加载失败")
			this.setState({
				tableLoading: false
			})
		})
	}
	//查询
	search = () => {
		this.setState({
			tableLoading: true
		})
		this.dealSearchValues(
			this.props.actions.getNewDealResultList, { currentPage: 1, pageSize: 50 }
		)
	}
	//下载处理结果
	downloadDealResult = (url) => {
		this.props.actions.downloadDealResult({ downLoadUrl: url }).then((res) => {
			if (res.code == 1000) {
				window.location.href = res.data
			} else {
				message.error("下载地址获取失败")
			}
		}).catch(() => {
			message.error("下载地址获取失败")
		})
	}
	render() {
		const columns = [
			{
				title: '文件名称',
				dataIndex: 'originalFileName',
				align: 'center',
				render: (text, record) =>
					<Tooltip title={text} arrowPointAtCenter>
						<a href={record.urlName}>{this.cut(text)}{text.length > 15 ? '...' : ''}</a>
					</Tooltip>
			}, {
				title: '批量操作类型',
				dataIndex: 'operateClassName',
				align: 'center'
			}, {
				title: '操作人',
				dataIndex: 'createdByName',
				align: 'center'
			}, {
				title: '操作时间',
				dataIndex: 'createdAt',
				align: 'center'
			}, {
				title: '状态',
				dataIndex: 'status',
				align: 'center',
				render: (text, record) => {
					return <div>
						<span className="statusDot" style={{ backgroundColor: statusDotColor[record.status] }}></span>
						<span>{statusName[text]}</span>
					</div>
				}
			}, {
				title: '操作',
				align: 'center',
				render: (text, record) => {
					return record.status == "3" ?
						<a onClick={() => this.downloadDealResult(record.downloadUrl)}>下载处理结果</a> : null
				}
			}
		];
		const { selectionList, newDealResultList } = this.props
		return (
			<div>
				<h3>处理结果</h3>
				<Form layout="inline">
					<Filter
						form={this.props.form}
						selectionList={selectionList}
						search={this.search}
						disabledStartDate={this.disabledStartDate}
						disabledEndDate={this.disabledEndDate}
						onStartChange={this.onStartChange}
						onEndChange={this.onEndChange}
						loading={this.state.searchLoading}
					></Filter>
				</Form>
				<Table dataSource={Object.keys(newDealResultList).length !== 0 ?
					newDealResultList.list : []} columns={columns}
					className="dealResult-table"
					bordered={true}
					loading={this.state.tableLoading}
					rowKey='id'
					pagination={{
						current: Object.keys(newDealResultList).length !== 0 ? newDealResultList.pageNum : '',
						pageSize: 50,
						showQuickJumper: true,
						total: Object.keys(newDealResultList).length !== 0 ? newDealResultList.total : '',
						onChange: (page) => {
							this.setState({
								tableLoading: true
							}, () => {
								this.dealSearchValues(
									this.props.actions.getNewDealResultList, { currentPage: page, pageSize: 50 }
								)
							})
						},
						size: 'small'
					}}
				/>
			</div>
		)
	}
}
const mapStateToProps = (state) => ({
	selectionList: state.batchCreateMainAccountReducers.selectionList,
	newDealResultList: state.batchCreateMainAccountReducers.newDealResultList
})
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...dealResultAction
	}, dispatch)
})

export default connect(
	mapStateToProps,//redux和react连接起来
	mapDispatchToProps
)(Form.create()(NewDealResult))
