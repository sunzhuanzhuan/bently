import React, { Component } from "react";
import {
	Form, Input, Button, Modal, Table, Divider, Radio, message
} from "antd";
// import { allSelect, platformTypesMap } from "../../constants/config";
import { connect } from "react-redux";
//全选按钮组件
import { WBYTableFooter } from 'wbyui'
import * as actions from '../../actions'
import FilterContainer from "../../components/FilterContainer";
import MediaManagerSelect from "../../base/MediaManagerSelect";
import './allocateTask.less';

const FormItem = Form.Item
const RadioGroup = Radio.Group;
const { TextArea } = Input;

@connect(state => ({
	mainAllotList: state.extensionNumber.mainAllotList,
	mediaManagerList: state.extensionNumber.mediaManagerList,
	authVisibleList: state.authorizationsReducers.authVisibleList
}), actions)
class AllocateTask extends Component {
	state = {
		filter: {
			// user_group_ids: [17]
		},
		currentPage: 1,
		selectedRowKeys: [],
		createModalShow: false,
		pagesize: 20,
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
		let { getMainAllotList } = this.props
		// let { filter } = this.state
		this.setState({ tableLoading: true })
		// await getMainAllotList({ ...filter, page: 1, ...query })
		let value = {}
		if (!(this.props.authVisibleList["extention.usershift.resource.select"] &&
			this.props.authVisibleList["extention.usershift.expand.select"])) {
			value.search_type = "1"
		}
		await getMainAllotList({ page: 1, ...value, ...this.state.filterValue, ...query })
		this.setState({
			filter: { ...query },
			tableLoading: false,
			currentPage: query.page || 1,
			selectedRowKeys: [],
			createModalShow: false
		})
	}

	componentWillMount() {
		// 获取拓号任务分配列表
		this.getList()
		this.props.getMediaManagerList()
	}

	showModal = (user_id) => {
		this.setState({
			createModalShow: true,
			selectedRowKeys: [user_id]
		});
	}
	//批量的申请转移弹框出现
	batchShowModal = () => {
		this.setState({
			createModalShow: true
		});
	}
	//全选
	onCheckAllChange = e => {
		const plainOptions = this.props.mainAllotList.list
		this.setState({
			selectedRowKeys: e.target.checked ? plainOptions : []
		});
	}
	render() {
		let { mainAllotList, postMainAccount, getMediaManagerList, mediaManagerList, authVisibleList } = this.props
		let { count = 0, page = 1, map, list } = mainAllotList || {}
		let columns = [
			{
				title: '主账号名称',
				dataIndex: 'identity_name',
				align: 'center'
			}, {
				title: '包含账号',
				dataIndex: 'include_account_num',
				align: 'center',
				render: (text, record) => {
					return <a target="_blank" className="include-account-num" href={record.account_index_url}>{text}</a>
				}
			}, {
				title: '媒介经理',
				dataIndex: 'real_name',
				align: 'center'
			}, {
				title: '操作',
				width: 100,
				align: 'center',
				render: (text, record) => (
					<Button type="primary" onClick={() => this.showModal(record.user_id)}>申请转移</Button>
				)
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
			showTotal: total => `共 ${Math.ceil(total / this.state.pagesize)} 页，${total} 条`,
			size: 'small',
			onChange: (current) => {
				this.getList({ page: current, pageNum: this.state.pagesize })
			},
			total: count,
			pageSize: this.state.pagesize,
			current: Number(page),
			showSizeChanger: true,
			showQuickJumper: true,
			pageSizeOptions: ["10", "20", "50", "100"],
			onShowSizeChange: (current, size) => {
				this.setState({
					pagesize: size
				}, () => {
					this.getList({ page: current, pageNum: size })
				})
			}
		}
		let primary_key = 'user_id'

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
					<Button type="primary"
						disabled={this.state.selectedRowKeys.length == 0 ? true : false}
						onClick={this.batchShowModal}
					>申请转移</Button>
				</WBYTableFooter>
			</div>
		}
		return (
			<div className='extension-number main-allocate-page'>
				<header className='page-content'>
					<FilterContainer>
						<FilterForm
							getList={this.getList}
							pageNum={this.state.pagesize}
							resource={authVisibleList["extention.usershift.resource.select"]}
							expand={authVisibleList["extention.usershift.expand.select"]}
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
				{this.state.createModalShow ?
					< Modal visible={true}
						className='extension-number-modal'
						width={500}
						footer={null}
						onCancel={() => {
							this.setState({
								createModalShow: false,
								selectedRowKeys: []
							})
						}}
					>
						<MediaForm
							selected={this.state.selectedRowKeys}
							wrappedComponentRef={node => this.formRef = node}
							getMediaManagerList={getMediaManagerList}
							mainAllotList={mainAllotList}
							mediaManagerList={mediaManagerList}
							postMainAccount={postMainAccount}
							getList={this.getList}
							pageNum={this.state.pagesize}
							onCancel={() => {
								this.setState({
									createModalShow: false,
									selectedRowKeys: []
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
			sourceMediaDisable: false,
			expendMediaDisable: false
		}
	}

	submitQuery = (e) => {
		let { getList, changeFilterValue } = this.props
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if (values.expendMedia !== undefined) {
					values.admin_user_id = values.expendMedia
				} else {
					values.admin_user_id = values.sourceMedia
				}
				values.pageNum = this.props.pageNum
				delete values.expendMedia
				delete values.sourceMedia
				changeFilterValue(values, getList)
			}
		});
	}
	//select的onChange事件
	changeEvent = (value, type) => {
		if (value == undefined) {
			this.setState({
				sourceMediaDisable: false,
				expendMediaDisable: false
			})
		} else {
			if (type == "sourceMedia") {
				this.setState({
					expendMediaDisable: true
				})
			} else if (type == "expendMedia") {
				this.setState({
					sourceMediaDisable: true
				})
			}
		}
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		return (<div><Form layout="inline" onSubmit={this.submitQuery}>
			{
				this.props.resource && this.props.expand ?
					<span>
						<FormItem label="资源媒介">
							{
								getFieldDecorator('sourceMedia')(
									<MediaManagerSelect
										getPopupContainer={() => document.querySelector('.main-allocate-page')}
										group='5'
										style={{ width: 120 }}
										disabled={this.state.sourceMediaDisable}
										onChange={value => this.changeEvent(value, 'sourceMedia')}
									/>
								)
							}
						</FormItem>
						<FormItem label="拓展媒介">
							{
								getFieldDecorator('expendMedia')(
									<MediaManagerSelect
										getPopupContainer={() => document.querySelector('.main-allocate-page')}
										group='4'
										style={{ width: 120 }}
										disabled={this.state.expendMediaDisable}
										onChange={value => this.changeEvent(value, 'expendMedia')}
									/>
								)
							}
						</FormItem>
					</span> : null
			}
			<FormItem label="主账号名称">
				{
					getFieldDecorator('identity_name', {})(
						<Input placeholder='主账号' />
					)
				}
			</FormItem>
			<FormItem>
				<Button type='primary' style={{ width: '80px' }}
					htmlType="submit"
					className='filter-button'>查询</Button>
			</FormItem>
		</Form>
		</div>)
	}
}

@Form.create({})
class MediaForm extends Component {
	state = {
		sourceMediaDisable: false,
		expendMediaDisable: true,
		title: "资源媒介",
		value: "1",
		display: 'none',
		btnLoading: false
	}
	submitQuery = (e) => {
		e.preventDefault();
		let { postMainAccount, getList, selected } = this.props;
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if (values.expendMedia == undefined && values.sourceMedia == undefined) {
					this.state.value == "1" ?
						this.setState({
							title: "资源媒介",
							display: 'block'
						}) :
						this.setState({
							title: "拓展媒介",
							display: 'block'
						})
				} else {
					this.setState({
						btnLoading: true
					})
					values.sourceMedia !== undefined ?
						values.owner_admin_id = values.sourceMedia : values.owner_admin_id = values.expendMedia
					values.user_ids = [...selected]
					delete values.sourceMedia
					delete values.expendMedia
					// 发送请求
					postMainAccount(values).then(() => {
						this.setState({
							btnLoading: false
						}, () => {
							message.success("提交申请成功")
							getList({ pageNum: this.props.pageNum })
						})
					})
				}
			}
		});
	}
	// 媒介的radio
	changeMedia = (e) => {
		if (e.target.value == "1") {
			this.props.form.setFieldsValue({ "expendMedia": undefined })
			this.setState({
				sourceMediaDisable: false,
				expendMediaDisable: true,
				value: "1",
				title: "资源媒介"
			})
		} else if (e.target.value == "2") {
			this.props.form.setFieldsValue({ "sourceMedia": undefined })
			this.setState({
				sourceMediaDisable: true,
				expendMediaDisable: false,
				value: "2",
				title: "拓展媒介"
			})
		}
	}
	//select的onChange事件
	changeMediaOption = () => {
		this.setState({
			display: "none"
		})
	}
	//转移主账号原因不超过200字
	validateAppealReason(rule, value, cb) {
		if (value == undefined) {
			cb()
		} else {
			let len = value.replace(/(^\s+)|(\s+$)/g, '').length;
			if (len > 200) {
				cb([new Error(rule.message)])
			} else {
				cb()
			}
		}
	}
	render() {
		const { getFieldDecorator } = this.props.form
		const radioStyle = {
			display: 'block',
			height: '40px',
			lineHeight: '40px',
		};
		return (
			<Form layout="inline" onSubmit={this.submitQuery} className="moadlBox">
				<h3>请选择媒介</h3>
				<Divider className="divider" />
				<RadioGroup onChange={this.changeMedia} defaultValue={1} >
					<Radio style={radioStyle} value={1}>
						<FormItem label="转移给资源媒介">
							{
								getFieldDecorator('sourceMedia', {})(
									<MediaManagerSelect
										group='2'
										style={{ width: 120 }}
										disabled={this.state.sourceMediaDisable}
										onChange={() => this.changeMediaOption()}
									/>)
							}
						</FormItem>
					</Radio>
					<Radio style={radioStyle} value={2}>
						<FormItem label="转移给拓展媒介">
							{
								getFieldDecorator('expendMedia', {})(
									<MediaManagerSelect
										group='1'
										style={{ width: 120 }}
										disabled={this.state.expendMediaDisable}
										onChange={() => this.changeMediaOption()}
									/>)
							}
						</FormItem>
					</Radio>
					<h4 className="error" style={{ display: this.state.display }}>请选择{this.state.title}</h4>
					<FormItem>
						{
							getFieldDecorator('comment', {
								rules: [{
									required: true, message: '请填写转移主账号原因',
								}, {
									validator: this.validateAppealReason, message: '转移主账号原因不能超过200个字'
								}]
							})(
								<TextArea placeholder="请填写转移主账号原因" autosize={{ minRows: 2, maxRows: 6 }} style={{ width: 400, marginTop: 10 }} />
							)
						}
					</FormItem>
				</RadioGroup>
				<div>
					<Button type='primary' style={{ width: '80px', float: 'right' }}
						className='filter-button'
						onClick={() => this.props.onCancel()}
						loading={this.state.btnLoading}
					>取消</Button>
					<Button type='primary' style={{ width: '80px', float: 'right', marginRight: 10 }}
						htmlType="submit"
						className='filter-button'
						loading={this.state.btnLoading}
					>提交</Button>
				</div>
			</Form>
		)
	}
}

export default AllocateTask;
