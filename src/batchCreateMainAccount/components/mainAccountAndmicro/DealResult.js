import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Form, Select, DatePicker, Table, Tooltip } from 'antd';
import * as dealResultAction from '../../actions/dealResult.js'
import { statusDotColor } from '../../constants/config'
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
				{getFieldDecorator('operateType', {
					initialValue: '0'
				})(
					<Select style={{ width: 210 }}>
						<Option value='0' key='0'>请选择</Option>
						{
							props.selectionList.map(item =>
								<Option value={item.operate_key} key={item.operate_key}>{item.file_name}</Option>
							)
						}
					</Select>
				)}
			</FormItem>
			<FormItem
				label="提交时间"
				className="startTime"
			>
				{getFieldDecorator('startTime', {

				})(
					<DatePicker format='YYYY-MM-DD' placeholder="请选择开始时间"
						disabledDate={props.disabledStartDate}
						onChange={props.onStartChange}
					/>
				)}
			</FormItem>
			<span className="dealResult-center">~</span>
			<FormItem>
				{getFieldDecorator('endTime', {

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
class DealResult extends Component {
	constructor(props) {
		super(props)
		this.state = {
			startValue: null,
			endValue: null,
			loading: false
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
		this.props.actions.getSelectionList()
	}
	//截取15个字
	cut = (text) => {
		let txt = text.substring(0, 15)
		return txt
	}
	render() {
		const columns = [
			{
				title: '文件名称',
				dataIndex: 'fileName',
				align: 'center',
				render: (text, record) =>
					<Tooltip title={text} arrowPointAtCenter>
						<a href={record.file_name}>{this.cut(text)}{text.length > 15 ? '...' : ''}</a>
					</Tooltip>
			}, {
				title: '批量操作类型',
				dataIndex: 'operateType',
				align: 'center'
			}, {
				title: '操作人',
				dataIndex: 'operateUserName',
				align: 'center'
			}, {
				title: '操作时间',
				dataIndex: 'created_time',
				align: 'center'
			}, {
				title: '状态',
				dataIndex: 'statusName',
				align: 'center',
				render: (text, record) => {
					return <div>
						<span className="statusDot" style={{ backgroundColor: statusDotColor[record.status] }}></span>
						<span>{text}</span>
					</div>
				}
			}, {
				title: '操作',
				align: 'center',
				render: (text, record) => {
					return record.status == "3" ?
						<a href={record.downloadUrl}>下载处理结果</a> : null
				}
			}
		];
		const { selectionList, dealResultList, loading } = this.props
		return (
			<div>
				<h3>处理结果</h3>
				<Filter
					form={this.props.form}
					selectionList={Object.keys(selectionList).length !== 0 ? selectionList.list : []}
					search={this.props.search}
					disabledStartDate={this.disabledStartDate}
					disabledEndDate={this.disabledEndDate}
					onStartChange={this.onStartChange}
					onEndChange={this.onEndChange}
					loading={loading}
				></Filter>
				<Table dataSource={Object.keys(dealResultList).length !== 0 ?
					dealResultList.list.rows : []} columns={columns}
					className="dealResult-table"
					bordered={true}
					loading={loading}
					rowKey='id'
					pagination={{
						current: Object.keys(dealResultList).length !== 0 ? dealResultList.list.page : '',
						pageSize: 50,
						showQuickJumper: true,
						total: Object.keys(dealResultList).length !== 0 ? dealResultList.list.count : '',
						onChange: (page) => {
							this.props.actions.getDealResultList({
								page: page,
								...this.props.filterValue
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
	dealResultList: state.batchCreateMainAccountReducers.dealResultList
})
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...dealResultAction
	}, dispatch)
})

export default connect(
	mapStateToProps,//redux和react连接起来
	mapDispatchToProps
)(DealResult)
