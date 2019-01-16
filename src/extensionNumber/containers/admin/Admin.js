import React, { Component } from "react";
import {
	Select, Form, Input, Button, Modal, Table, message, Tooltip, DatePicker
} from "antd";
import moment from 'moment';
// import { allSelect, platformTypesMap } from "../../constants/config";
//全选按钮组件
import { WBYTableFooter } from 'wbyui'
import { connect } from "react-redux";
import * as actions from '../../actions'

import FilterContainer from "../../components/FilterContainer";
import MediaManagerSelect from "../../base/MediaManagerSelect";
import './allocateTask.less';


const FormItem = Form.Item
const Option = Select.Option
const { RangePicker } = DatePicker;


@connect(state => state.extensionNumber, actions)
class AllocateTask extends Component {
	state = {
		filter: { status: 1, page_size: 20 },
		currentPage: 1,
		selectedRowKeys: [],
		createModalShow: false,
		submitAllocateLoading: false,
		returnModalShow: false,
		filterValue: {}
	}
	//改变this.state.filterValue
	changeFilterValue = (values, fun) => {
		this.setState({
			filterValue: { ...values }
		}, fun)
	}
	// 获取列表方法
	getList = async (query = {}) => {
		let { getAuditedList } = this.props
		let { filter } = this.state
		this.setState({ tableLoading: true })
		getAuditedList({ ...filter, page: 1, ...query, ...this.state.filterValue }).then(() => {
			this.setState({
				selectedRowKeys: [],
				filter: { ...filter, ...query },
				tableLoading: false,
				currentPage: query.page || 1
			})
		}).catch(() => {
			this.setState({
				tableLoading: false,
			})
		})
	}

	componentWillMount() {
		// 获取拓号任务分配列表
		this.getList()
		this.props.getMediaManagerList()
	}

	confirm = () => {
		Modal.confirm({
			title: '是否驳回主账号转移申请?',
			okText: '驳回',
			cancelText: '取消',
			onOk: this.handleReturn
		});
	}
	showModal = () => {
		this.setState({ createModalShow: true });
	}
	handleSelect = () => {
		this.setState({ selectedRowKeys: [] });

	}
	handleReturn = () => this.handleAction(4)
	// 同意或驳回
	handleAction = async (status) => {
		let { postAgree } = this.props;
		// 处理发送数据
		let body = {
			ids: this.state.selectedRowKeys,
			status
		};
		this.setState({ submitAllocateLoading: true })
		// 发送请求
		await postAgree(body).then(({ msg }) => {
			message.success(msg, 1.2)
			// 重新拉取数据 + 复位
			this.getList()
			this.setState({
				allocateModalShow: false,
				submitAllocateLoading: false,
				selectedRowKeys: [],
			})
				;
		})
			.catch(() => {
				message.error('操作失败', 1.2)
				this.setState({
					submitAllocateLoading: false
				})
			})
	}
	//全选
	onCheckAllChange = e => {
		const plainOptions = this.props.auditedList.list
		this.setState({
			selectedRowKeys: e.target.checked ? plainOptions : []
		});
	}
	render() {
		let { auditedList, mediaManagerList = [], postAllotMediaManagerAdmin } = this.props
		let { count = 0, page = 1, map, list } = auditedList || {}
		let columns = [
			{
				title: '主账号',
				dataIndex: 'identity_name',
				align: 'center',
				width: 210
			}, {
				title: '包含账号数',
				dataIndex: 'include_account_num',
				align: 'center',
				render: (text, record) =>
					<a target="_blank" className="underLine" href={record.include_account_index_url}>{text}</a>,
				width: 80
			}, {
				title: '原媒介',
				dataIndex: 'old_owner_admin_name',
				align: 'center',
				width: 120
			}, {
				title: '现需转移到',
				dataIndex: 'owner_admin_name',
				align: 'center',
				width: 120
			}, {
				title: '新媒介的主账号数',
				dataIndex: 'user_count',
				align: 'center',
				render: (text, record) =>
					<a target="_blank" className="underLine" href={record.new_admin_user_index_url}>{text}</a>,
				width: 150
			}, {
				title: '新媒介的子账号数',
				dataIndex: 'account_count',
				align: 'center',
				render: (text, record) =>
					<a target="_blank" className="underLine" href={record.new_admin_account_index_url}>{text}</a>,
				width: 150
			},
			{
				title: '转移原因',
				dataIndex: 'comment',
				align: 'center',
				render: (text) => <Tooltip title={text} overlayClassName="comment-tips">
					<div className="comment-wordSpacing">{text}</div>
				</Tooltip>,
				width: 120
			},
			{
				title: '申请时间',
				dataIndex: 'created_at',
				align: 'center',
				width: 200
			}
		]
		let rowSelection = {
			getCheckboxProps: (/* record */) => ({
				disabled: false
			}),
			selectedRowKeys: this.state.selectedRowKeys,
			onChange: (selectedRowKeys) => {
				this.setState({ selectedRowKeys })
			},
		};
		let pagination = {
			position: 'top',
			showTotal: total => `共 ${Math.ceil(total / this.state.filter.page_size)} 页，${total} 条`,
			size: 'small',
			onChange: (current) => {
				this.getList({ page: current })
			},
			total: count,
			pageSize: this.state.filter.page_size,
			current: Number(page),
			showSizeChanger: true,
			showQuickJumper: true,
			pageSizeOptions: ["10", "20", "50", "100"],
			onShowSizeChange: (current, size) => {
				this.setState({
					filter: { status: 1, page_size: size }
				}, () => {
					this.getList({ page: current, ...this.state.filter })
				})
			}
		}
		let primary_key = 'id'
		let dataSoure = list.map(item => map[item])
		//table底部
		const footer = () => {
			return <div>
				<WBYTableFooter
					plainOptions={dataSoure}
					selectedRowKeys={this.state.selectedRowKeys}
					onChange={this.onCheckAllChange}
					title={'全选'}
					pagination={false}
				>
				</WBYTableFooter>
			</div>
		}
		return (
			<div className='extension-number admin-page'>
				<header className='page-content'>
					<FilterContainer>
						<FilterForm getList={this.getList} tableLoading={this.state.tableLoading}
							changeFilterValue={this.changeFilterValue}
						/>
					</FilterContainer>
				</header>
				<main>
					<Table rowSelection={rowSelection} pagination={pagination}
						bordered columns={columns}
						rowKey={record => record[primary_key]}
						loading={this.state.tableLoading}
						dataSource={dataSoure}
						footer={footer}
					/>
				</main>
				<footer className='page-footer'>
					<Button type='primary' style={{ width: '120px' }} loading={this.state.submitAllocateLoading}
						className='next-button' disabled={this.state.selectedRowKeys.length <= 0} onClick={() => {
							this.handleAction(2)
						}}>同意转移</Button>
					<Button type='primary' style={{ width: '120px' }} loading={this.state.submitAllocateLoading}
						className='next-button' disabled={this.state.selectedRowKeys.length <= 0} onClick={this.showModal}>重新转移</Button>
					<Button type='primary' style={{ width: '120px' }} loading={this.state.submitAllocateLoading}
						className='next-button' disabled={this.state.selectedRowKeys.length <= 0} onClick={this.confirm}>驳回申请</Button>
				</footer>
				{this.state.createModalShow ?
					< Modal visible={true} className='extension-number-modal'
						title='微播易提醒您：请选择转移主账号媒介'
						width={800}
						footer={null}
						onCancel={() => {
							this.setState({
								createModalShow: false
							})
						}}
					>
						<MediaForm
							selected={this.state.selectedRowKeys}
							wrappedComponentRef={node => this.formRef = node}
							mediaManagerList={mediaManagerList}
							auditedList={auditedList}
							postAllotMediaManagerAdmin={postAllotMediaManagerAdmin}
							getList={this.getList}
							handleSelect={this.handleSelect}
							close={() => {
								this.setState({
									createModalShow: false
								})
							}}
						/>
					</Modal>
					: null
				}
			</div>
		);
	}
}

@Form.create({})
class FilterForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			updated_at_start: "",
			updated_at_end: ""
		}
	}

	submitQuery = (e) => {
		let { getList, changeFilterValue } = this.props
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				// values['sort[user_count]'] = undefined
				// values['sort[account_count]'] = undefined
				// if (values['sort']) {
				// 	values['sort[' + values['sort'] + ']'] = 'asc'
				// }
				// values['sort'] = undefined
				if (values.updated_at) {
					values.updated_at_start = this.state.updated_at_start
					values.updated_at_end = this.state.updated_at_end
				} else {
					values.updated_at_start = ""
					values.updated_at_end = ""
				}
				delete values.updated_at
				changeFilterValue(values, getList)
			}
		});
	}
	//选择时间
	changeTime = (date, dateString) => {
		this.setState({
			updated_at_start: dateString[0],
			updated_at_end: dateString[1]
		})
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		return (<div><Form layout="inline" onSubmit={this.submitQuery}>
			<FormItem label="原媒介">
				{
					getFieldDecorator('old_owner_admin_id', {})(
						<MediaManagerSelect getPopupContainer={() => document.querySelector('.admin-page')}
							group='3'
							style={{ width: 120 }} />)
				}
			</FormItem>
			<FormItem label="新媒介">
				{
					getFieldDecorator('admin_id', {})(
						<MediaManagerSelect getPopupContainer={() => document.querySelector('.admin-page')}
							group='3'
							style={{ width: 120 }} />)
				}
			</FormItem>
			<FormItem label="主账号名称">
				{
					getFieldDecorator('username', {})(
						<Input placeholder='主账号' />
					)
				}
			</FormItem>
			{/* <FormItem label="排序">
				{
					getFieldDecorator('sort', {})(
						<Select style={{ width: 160 }}
							allowClear
							getPopupContainer={() => document.querySelector('.admin-page')}
							placeholder='选择排序'>
							<Option value="user_count">主账号总量从低到高</Option>
							<Option value="account_count">子账号总量从低到高</Option>
						</Select>)
				}
			</FormItem> */}
			<FormItem label="操作时间">
				{
					getFieldDecorator('updated_at', {})(
						<RangePicker onChange={this.changeTime}
							format="YYYY-MM-DD HH:mm:ss"
							showTime={{
								defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
							}}
						/>
					)
				}
			</FormItem>
			<FormItem>
				<Button ghost type='primary' style={{ width: '80px' }}
					htmlType="submit"
					loading={this.props.tableLoading}
					className='filter-button'>查询</Button>
			</FormItem>
		</Form>
		</div>)
	}
}

@Form.create({})
class MediaForm extends Component {
	state = {
		current: 1,
		order: '',
		userIdFilter: null,
		tableLoading: true,
		sourceMediaDisable: false,
		expendMediaDisable: false
	}
	// 分配媒介
	handleAllocate = (data) => {
		let { postAllotMediaManagerAdmin, getList, selected, auditedList, handleSelect, close } = this.props;
		let { map } = auditedList || {}
		let body = {
			owner_admin_id: data.user_id,
			record_ids: selected.map(key => map[key]['id'])
		};
		this.setState({ tableLoading: true })
		// 发送请求
		postAllotMediaManagerAdmin(body).then(({ msg }) => {
			this.setState({ tableLoading: false })
			message.success(msg, 1.2)
			// 重新拉取数据 + 复位
			getList();
			close();
			handleSelect()
		})
	}
	submitQuery = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				// 查询
				if (values.expendMedia !== undefined) {
					values.userIdFilter = values.expendMedia
				} else {
					values.userIdFilter = values.sourceMedia
				}
				delete values.expendMedia
				delete values.sourceMedia
				this.setState(values)
			}
		});
	}
	//选择媒介
	changeMedia = (value, type) => {
		if (value) {
			type == "sourceMedia" ?
				this.setState({
					sourceMediaDisable: false,
					expendMediaDisable: true
				}) :
				this.setState({
					sourceMediaDisable: true,
					expendMediaDisable: false
				})
		} else {
			this.setState({
				sourceMediaDisable: false,
				expendMediaDisable: false
			})
		}
	}
	render() {
		const { order, userIdFilter } = this.state
		const { mediaManagerList } = this.props
		const { getFieldDecorator } = this.props.form
		// 查询
		let dataSource = [...mediaManagerList['3']]
		// dataSource = dataSource.filter(item => [32, 33, 34, 38].some(d => item.user_group_id.some(i => d == i)))
		if (userIdFilter) {
			dataSource = dataSource.filter(item => item.user_id == userIdFilter)
		}
		if (order) {
			dataSource.sort((a, b) => a[order] - b[order])
		}
		const columns = [
			{
				title: '媒介经理',
				dataIndex: 'real_name'
			}, {
				title: '主账号数量',
				dataIndex: 'user_count',
			}, {
				title: '子账号数量',
				dataIndex: 'account_count',
			}, {
				title: '操作',
				dataIndex: '1',
				render: (n, item) => {
					return <Button onClick={this.handleAllocate.bind(this, item)}>分配</Button>
				}
			}];
		let pagination = {
			position: 'top',
			showTotal: total => `共 ${Math.ceil(dataSource.length / 8)} 页，${dataSource.length} 条`,
			size: 'small',
			hideOnSinglePage: true,
			onChange: (current) => {
				this.setState({ current: current })
			},
			total: dataSource.length,
			pageSize: 8,
			current: this.state.current
		}
		return (
			<div>
				<Form layout="inline" onSubmit={this.submitQuery}>
					<FormItem label="资源媒介">
						{
							getFieldDecorator('sourceMedia', {})(
								<MediaManagerSelect
									group='2'
									style={{ width: 120 }}
									disabled={this.state.sourceMediaDisable}
									onChange={(value) => this.changeMedia(value, "sourceMedia")}
								/>)
						}
					</FormItem>
					<FormItem label="拓展媒介">
						{
							getFieldDecorator('expendMedia', {})(
								<MediaManagerSelect
									group='1'
									style={{ width: 120 }}
									disabled={this.state.expendMediaDisable}
									onChange={(value) => this.changeMedia(value, "expendMedia")}
								/>)
						}
					</FormItem>
					<FormItem label="排序方式">
						{
							getFieldDecorator('order', {})(
								<Select
									allowClear
									placeholder='选择排序方式'
									style={{ width: 180 }}>
									<Option value="user_count">主账号总量从低到高</Option>
									<Option value="account_count">子账号总量从低到高</Option>
								</Select>
							)
						}
					</FormItem>
					<FormItem>
						<Button ghost type='primary' style={{ width: '80px' }}
							htmlType="submit"
							className='filter-button'>查询</Button>
					</FormItem>
				</Form>
				<Table columns={columns} rowKey={record => record['user_id']} dataSource={dataSource} bordered={true} pagination={pagination} />
			</div>
		)
	}
}

export default AllocateTask;
