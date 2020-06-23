import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Input, Form, Select, Modal, Button, AutoComplete, TreeSelect, message } from 'antd';
import { addAdminUserList, editAdminUserList, getUserGroup, getSelectMemberp, getJobList, getJobTypeList, cleanJobList, cleanSelectMemberp, getSupportSeller } from '../actions/adminUser'
import { SaleSupportGroupId } from '../constants'
import ContactInfoForm from '../components/ContactInfoForm'
import BaseForm from '../components/BaseForm'
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = TreeSelect.TreeNode;
/**
 * 本js是用户管理的新增和修改
 * isEditAciton：true是修改
 * 本js岗位的下拉框是部门和岗位类型的筛选项（部门和岗位是没有关系的哦）
 * 本js的用户组下拉框，选择不同项会返回不同数据，根据数据返回显示上级用户 销售大区什么的 （估计2期要给本js销掉本js就能瘦好多哈哈哈）
 * 本js的修改数据是通过list的record获取过来的
 */
class AddAdminUser extends Component {
	constructor(props) {
		super(props)
		const { adminUserOne = {} } = props;
		this.state = {
			visible: false,
			parentUserData: [],
			serchMemberParams: {},
			isTrue: false,
			deptvalue: undefined,
			jobvalue: undefined,
			isSaleSupport: adminUserOne.user_group_id === SaleSupportGroupId,  //用户组是否是销售支持
		}
	}
	componentWillReceiveProps(nextProps) {
		const { adminUserOne = {} } = nextProps;
		const { user_group_id } = this.state;
		if (adminUserOne.user_group_id === user_group_id) {
			this.setState({
				isSaleSupport: adminUserOne.user_group_id === SaleSupportGroupId
			})
		}
	}
	//确认按钮提交数据
	handleOk = () => {
		this.props.form.validateFields((err, values) => {
			delete values.dept
			delete values.relpassword
			if (!err) {
				if (this.props.isEditAciton) {
					this.props.actions.editAdminUserList(values).then(response => {
						const { msg } = response
						message.success(msg)
						this.closeModal()
					}).catch((error) => {
						message.error(error.errorMsg)
					})
				} else {
					this.props.actions.addAdminUserList(values).then(response => {
						const { msg } = response
						message.success(msg)
						this.closeModal()
					}).catch((error) => {
						message.error(error.errorMsg)
					})
				}
			}
		})
	}

	//部门change事件
	deptonChange = (value) => {
		this.setState({ deptvalue: value });
		const job_type_id = this.props.form.getFieldValue('job_type_id')
		this.jobSeach(value, job_type_id)
	}
	//部门类型字段
	jobTypeChange = (value) => {
		const { deptvalue } = this.state
		this.setState({
			jobvalue: undefined
		})
		this.jobSeach(deptvalue, value)
	}
	//岗位查询
	jobSeach = (dept, jobType) => {
		const { adminUserOne } = this.props
		this.props.form.setFieldsValue({
			job_id: undefined
		});
		if (dept && jobType) {
			this.props.actions.getJobList({ ownership_id: dept, is_show_department: 1, job_type_id: jobType, unused: adminUserOne && adminUserOne.user_id || 0 })
		}
	}
	//岗位change事件
	jobChange = (value) => {
		this.setState({ jobvalue: value });
	}
	//关闭弹窗
	closeModal = () => {
		const { adminUserOne = {} } = this.props
		const { user_group_id } = adminUserOne;
		this.setState({ visible: false, jobvalue: undefined, deptvalue: undefined, isSaleSupport: false, user_group_id })
		//this.props.actions.getJobList({ is_show_department: 1 })
		this.props.form.resetFields()
	}
	//d打开弹窗
	showModal = async () => {
		const { isSaleSupport } = this.state;
		const { isEditAciton, actions, adminUserOne } = this.props
		this.setState({
			visible: true
		})
		actions.cleanJobList()
		actions.cleanSelectMemberp()
		//查询岗位类型
		//actions.getJobTypeList()
		if (isEditAciton) {
			//修改查询岗位
			const { department_id = [], job_type_id = [], jobs_id, support_seller_id = [], user_group_id } = adminUserOne

			if (department_id.length !== 0 && job_type_id.length !== 0) {
				actions.getJobList({ ownership_id: department_id, is_show_department: 1, job_type_id: job_type_id, unused: adminUserOne && adminUserOne.user_id || 0, }).then(() => {
					this.setState({
						deptvalue: department_id,
						jobvalue: jobs_id,
						serchMemberParams: { user_group_id }
					})
				}).catch((error) => {
					message.error(error.errorMsg)
				})
			}
			if (isSaleSupport) {
				this.props.actions.getSupportSeller({ user_group_id })
			}
			const selectData = { user_group_id: adminUserOne.user_group_id }
			await actions.getSelectMemberp(selectData)
			await actions.getSelectMemberp({ ...selectData, region_id: adminUserOne.salesman_region })

			//设置数据
			this.issetFieldsValue("salesmanRegion", adminUserOne.salesman_region)
			this.issetFieldsValue("salesmanTeam", adminUserOne.salesman_team)
			this.issetFieldsValue("parentId", adminUserOne.parent_id)

		}
	}
	//是否设置数据
	issetFieldsValue = (name, value) => {
		if (value) {
			this.props.form.setFieldsValue({
				[name]: value,
			});
		}

	}

	//用户组带的下拉选项
	onselectMember = async (type, value) => {
		const { serchMemberParams } = this.state;
		const isSaleSupport = value == SaleSupportGroupId;
		if (type === 'group') {
			this.setState({
				serchMemberParams: { user_group_id: value },
				isTrue: true
			})
			await this.props.actions.getSelectMemberp({ user_group_id: value })
			//重置信息项
			this.props.form.setFieldsValue({
				salesmanRegion: '',
				parentId: '',
				salesmanTeam: '',
			});
			this.setState({ isSaleSupport, user_group_id: value })
			isSaleSupport && this.props.actions.getSupportSeller({ user_group_id: value });

		}
		if (type === 'region') {
			await this.props.actions.getSelectMemberp({ ...serchMemberParams, region_id: value })
			//重置信息项
			this.props.form.setFieldsValue({
				salesmanTeam: '',
			});
		}
		const { adminUserOne = {} } = this.props
		const { user_group_id, salesman_region } = adminUserOne
		//BP用户修改大区，提示
		if (user_group_id == 78 || user_group_id == 79) {
			if (this.props.adminUserOne.salesman_region != value) {
				Modal.warning({
					title: '警告',
					okText: '确认',
					content: '如果BP绑定了公司，请先找BP主管做解绑操作之后再更换大区，否则会导致原大区部分订单无BP处理！',
				});
			}
		}
		//销售用户修改大区，提示
		if (user_group_id == 32 || user_group_id == 33 || user_group_id == 34) {
			if (this.props.adminUserOne.salesman_region != value) {
				Modal.warning({
					title: '警告',
					okText: '确认',
					content: '请确保名下的公司和原大区BP之间的关系已解绑，否则订单还会分配给原大区BP，导致新大区BP无法处理！',
				});
			}
		}

	}

	//构建数据
	renderTreeNodes = (data) => {
		return data.map((item) => {
			if (item.subs) {
				return (
					<TreeNode
						title={item.zh_name}
						key={item.id}
						value={item.id}
					//dataRef={item}
					>
						{this.renderTreeNodes(item.subs)}
					</TreeNode>
				);
			}
			return <TreeNode
				key={item.id}
				title={item.zh_name}
				value={item.id} />;
		});
	}

	render() {
		let { isSaleSupport } = this.state;

		const { form, adminUserOne = {},
			isEditAciton,
			departmentList,
			jobList,
			userGroupOption,
			jobTypeList,
			supportSeller,
			selectMemberpList } = this.props;
		const { getFieldDecorator } = form;

		const { isTrue, deptvalue, jobvalue } = this.state;

		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 },
		}
		const { data_for_parent_user = [], data_for_region, data_for_team, sales_region_tag } = selectMemberpList
		//部门树形图参数
		const deptProps = {
			onChange: this.deptonChange,
			searchPlaceholder: '请选择部门',
		};
		//岗位树形图参数
		const jobProps = {
			onChange: this.jobChange,
			searchPlaceholder: '请选择岗位',
		}
		const formItemProps = {
			formItemLayout, getFieldDecorator, adminUserOne, isEditAciton, form
		}
		return (
			<span>
				{isEditAciton ?
					<a onClick={this.showModal}>编辑</a>
					:
					<Button
						type="primary"
						onClick={this.showModal}
					>添加用户</Button>}
				<Modal
					title={isEditAciton ? '编辑用户信息' : '添加用户信息'}
					visible={this.state.visible}
					onCancel={this.closeModal}
					onOk={this.handleOk}
					maskClosable={false}
					width='700px'
					destroyOnClose={true}
				>

					<Form layout='horizontal'>

						{/* 用户基本信息 */}
						<BaseForm {...formItemProps} />
						<FormItem label="用户组" {...formItemLayout}>
							{getFieldDecorator('userGroupId', {
								initialValue: adminUserOne && adminUserOne.user_group_id,
								rules: [{ required: true, message: '请选择用户组' }],
							})(
								<Select
									showSearch
									style={{ width: '100%' }}
									onChange={this.onselectMember.bind(null, 'group')}
									placeholder='请选择用户组'
									// filterOption={selectFilterOption}
									optionFilterProp='children'
								>
									{userGroupOption.map(one => {
										const desc = one.user_group_name_desc
										return <Option key={one.user_group_id} value={one.user_group_id}>
											{`${one.user_group_name} ${desc == null ? "" : desc}`}
										</Option>
									})}
								</Select>
							)}
						</FormItem>
						{data_for_region && (isTrue || adminUserOne && adminUserOne.salesman_region) ? <FormItem label="所属大区" {...formItemLayout}>
							{getFieldDecorator('salesmanRegion', {
								initialValue: adminUserOne && adminUserOne.salesman_region,
								rules: [{
									required: true,
									message: '请选择所属大区',
								}],
							})(
								<Select
									showSearch
									optionFilterProp='children'
									style={{ width: '100%' }}
									placeholder="请选择所属大区"
									onChange={this.onselectMember.bind(null, 'region')}
								>
									{data_for_region.map(one => {
										return <Option key={one.region_team_id} value={one.region_team_id}>{one.region_team_name}</Option>
									})}
								</Select>
							)}
						</FormItem> : ''}
						{data_for_team && (isTrue || adminUserOne && adminUserOne.salesman_team) ? <FormItem label="销售所属分组" {...formItemLayout}>
							{getFieldDecorator('salesmanTeam', {
								initialValue: adminUserOne && adminUserOne.salesman_team,
								rules: [{
									required: true,
									message: '请选择销售所属分组',
								}],
							})(
								<Select
									showSearch
									optionFilterProp='children'
									style={{ width: '100%' }}
									placeholder="请选择销售所属分组"
								>
									{data_for_team.map(one => {
										return <Option key={one.region_team_id} value={one.region_team_id}>{one.region_team_name}</Option>
									})}
								</Select>
							)}
						</FormItem> : ''}
						<FormItem label="部门" {...formItemLayout}>
							{getFieldDecorator('dept', {
								initialValue: deptvalue,
								rules: [{ required: true, message: '请选择部门' }],
							})(
								<TreeSelect
									{...deptProps} multiple allowClear showSearch treeNodeFilterProp='title' className='tree-admin-select'
								>
									{this.renderTreeNodes(departmentList)}
								</TreeSelect>
							)}
						</FormItem>
						<FormItem label="岗位类型" {...formItemLayout}>
							{getFieldDecorator('job_type_id', {
								initialValue: adminUserOne && adminUserOne.job_type_id,
								rules: [{ required: true, message: '请选择岗位类型' }],
							})(
								<Select
									showSearch
									optionFilterProp='children'
									mode="multiple"
									style={{ width: '100%' }}
									placeholder="请选择岗位类型"
									onChange={this.jobTypeChange}
									className='tree-admin-select'
									allowClear
								>
									{jobTypeList && jobTypeList.map(one => <Option key={one.id} value={one.id}>{one.zh_name}</Option>)}
								</Select>
							)}
						</FormItem>

						<FormItem label="岗位" {...formItemLayout}>
							{getFieldDecorator('job_id', {
								initialValue: jobvalue,
								rules: [{ required: true, message: '请选择岗位' }],
							})(

								<TreeSelect {...jobProps} multiple showSearch treeNodeFilterProp='title' className='tree-admin-select'>
									{this.renderTreeNodes(jobList)}
								</TreeSelect>
							)}
						</FormItem>

						{/* 用户联系方式 */}
						<ContactInfoForm  {...formItemProps} />
						{data_for_parent_user && (isTrue || adminUserOne && adminUserOne.parent_id) && (JSON.stringify(data_for_parent_user) !== '[]') ?
							<FormItem label="上级用户" {...formItemLayout}>
								{getFieldDecorator('parentId', {
									initialValue: adminUserOne && adminUserOne.parent_id,
									rules: [{
										required: true,
										message: '请选择上级用户(只适用同组用户)',
									}],
								})(

									<Select
										showSearch
										optionFilterProp='children'
										style={{ width: '100%' }}
									>
										{data_for_parent_user.map(one => {
											return <Option key={one.userId} value={one.userId}>{one.realName}</Option>
										})}
									</Select>

								)}
							</FormItem> : ''
						}
						{
							/*isSaleSupport 如果用户组为销售支持，增加选择支持的销售列表*/
							isSaleSupport && <FormItem label="支持销售" {...formItemLayout}>
								{getFieldDecorator('support_seller_id', {
									initialValue: adminUserOne && adminUserOne.support_seller_id,
									rules: [{ required: false, message: '请选择支持的销售' }],
								})(
									<Select
										showSearch
										mode="multiple"
										style={{ width: '100%' }}
										placeholder="请选择支持的销售"
										// onChange={this.jobTypeChange}
										className='tree-admin-select'
										allowClear
										optionFilterProp='children'
									>
										{supportSeller && supportSeller.map(one => <Option key={one.user_id} value={one.user_id}>{one.real_name}</Option>)}
									</Select>
								)}
							</FormItem>
						}
						{sales_region_tag ? <FormItem
							label="用户大区" {...formItemLayout}>
							{getFieldDecorator('salesRegionTag', {
								initialValue: adminUserOne && adminUserOne.sales_region_tag || undefined,
								rules: [{
									required: true,
									message: '请选择用户所在大区',
								}],
							})(

								<Select style={{ width: '100%' }} placeholder='请选择用户所在大区'>
									{sales_region_tag.map(one => {
										return <Option key={one.id} value={one.id}>{one.region_tag}</Option>
									})}
								</Select>

							)}
						</FormItem> : null}
					</Form>
				</Modal>
			</span>
		)
	}
}
const AddAdminUserFrom = Form.create()(AddAdminUser)
const mapStateToProps = (state) => ({
	// adminUserList: getVisibleAdminUser(state.adminUserList)
	userGroupOption: state.adminUserList.userGroupOption,
	selectMemberpList: state.adminUserList.selectMemberpList,
	jobList: state.adminUserList.jobList,
	departmentList: state.adminUserList.departmentList,
	jobTypeList: state.adminUserList.jobTypeList,
	supportSeller: state.adminUserList.supportSeller
})

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		addAdminUserList,
		editAdminUserList,
		getUserGroup,
		getSelectMemberp,
		getJobList,
		cleanJobList,
		cleanSelectMemberp,
		getJobTypeList,
		getSupportSeller
	}, dispatch)
})
export default (connect(
	mapStateToProps,
	mapDispatchToProps
)(AddAdminUserFrom))
// export default (Form.create()(AddAdminUser))
