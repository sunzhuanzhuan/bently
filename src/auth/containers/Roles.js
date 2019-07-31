import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import api from '../../api/index'
import AuthModal from '../components/AuthModal'
import RoleForm from '../components/RoleForm'
import { getVisibleRoles } from '../reducers/roles'
import * as rolesAction from '../actions/roles'
import { Table, Button, message } from 'antd';
import AppInfo from '../components/AppInfo'
import './auth.less'
import CommonModal from '../components/CommonModal';
import AuthorityForm from "../components/authority/AuthorityForm";
import qs from "qs";
class Roles extends Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			roleList: [],
			modalType: '',
			type: '',
			detail: {},
			applist: [],
			app_id: [],
			//批量id
			roleID: [],
			//persimise
			permission_box: [],
			isRoute: '',
			selectedRowKeys: [],
			loading: false
		}
	}

	componentWillMount() {
		this.setState({ loading: true })
		this.props.actions.getRoleList({ app_id: '', page: 1 });
		api.get('/rbac/getAppInfo').then((response) => {
			this.setState({
				loading: false,
				applist: response.data,
			});
		}).catch((error) => {
			this.setState({
				loading: false
			});
			message.error(error.errorMsg)
		});
		//修复路由类型Bug，添加Push
		this.props.history.push({
			search: '?' + qs.stringify({ app_id: 1 })
		})
	}

	addRole() {
		this.setState({
			type: 'new',
			detail: {}
		});
		this.showModal('AuthModal');
	}

	edit(record) {
		api.get('/rbac/getAppInfo').then((response) => {
			this.setState({
				type: 'edit',
				applist: response.data,
				detail: record
			});
			this.showModal('AuthModal');
		}).catch((error) => {
			message.error(error.errorMsg)
		});
	}

	showModal(modalType) {
		this.setState({ modalType });
	}
	handleCancel() {
		this.closeModal();
	}
	closeModal() {
		this.form.resetFields();
		this.setState({ modalType: '' });

	}
	handleAdd() {
		this.form.validateFields((err, values) => {
			if (err) {
				return;
			}
			this.setState({ loading: true })
			this.props.actions.addRoleAction(values).then(() => {
				this.setState({ loading: false })
				this.props.actions.getRoleList({ app_id: '', page: 1 });
			}).catch((error) => {
				this.setState({ loading: false })
				message.error(error.errorMsg)
			});
			this.closeModal();
		});
	}
	handleEdit() {
		this.form.validateFields((err, values) => {
			if (err) {
				return;
			}
			values.id = this.state.detail.id;
			this.props.actions.updateRoleAction(values).then(() => {

			}).catch((error) => {
				message.error(error.errorMsg)
			});
		});
		this.closeModal();
	}
	jump(href, record) {
		const params = {
			id: record.id,
			app_id: record.app_id
		};
		//修改了push的方式
		this.props.history.push({
			pathname: href,
			search: '?' + qs.stringify(params)
		})
	}
	handleAppChange(value) {
		this.setState({
			//修复路由类型Bug，修改appId->app_id
			app_id: value,
		});
		//修复路由类型Bug，添加路径push
		this.props.history.push({
			search: '?' + qs.stringify({ app_id: value })
		})
		this.props.actions.getRoleList({ app_id: value, page: 1 });
	}
	//批量添加
	addRoleBatch() {
		if (this.state.roleID.length != 0) {
			let arr_id_role = []
			for (let value of this.state.roleID) {
				arr_id_role.push(value && value.id)
			}
			//修复路由类型Bug删除默认值app_id:1的设置
			this.setState({ roleID: arr_id_role })
			api.get('/rbac/getResourceTypeList').then((response) => {
				this.setState({
					type: 'add',
					title: '添加权限',
					okText: '提交',
					detail: {},
					resourceList: [],
					checkedFields: {},
					permissionFields: [],
					typeList: response.data.rows
				});
				this.showModal('CommonModal')
			});
		} else {
			message.warning('请选中之后再进行批量操作')
		}
	}
	// 设置选中
	onTableSelectChange = (selectedRowKeys, selectedRows) => {
		this.setState({ roleID: selectedRows, selectedRowKeys: selectedRowKeys })
	}
	// 提交
	handleAddBatch() {
		let params = {
			role_id: this.state.roleID
		}
		if (this.state.isRoute) {
			let arr = []
			for (const value of this.state.permission_box) {
				arr.push(value.form[0].options[0].permission_id)
			}
			params.permission_id = [...arr];
			this.props.actions.addRoleAuthorityAction(params).then((response) => {
				if (response.code == 200) {
					message.success(response.message);
					this.closeModal();
					this.props.actions.getRoleList({ app_id: '', page: 1 });
					api.get('/rbac/getAppInfo').then((response) => {
						this.setState({
							applist: response.data,
							selectedRowKeys: []
						});
					});
				} else {
					message.error(response.message)
				}
			});

		} else {
			this.form.validateFields((err, values) => {
				if (err) {
					return;
				}
				if (this.props.permissionId.type === "option" || this.props.permissionId.type === "hidden") {
					params.permission_id = [...this.props.permissionId.permissionId];
					this.props.actions.addRoleAuthorityAction(params).then((response) => {
						if (response.code == 200) {
							message.success(response.message);
							this.closeModal();
							this.props.actions.getRoleList({ app_id: '', page: 1 });
							api.get('/rbac/getAppInfo').then((response) => {
								this.setState({
									applist: response.data,
									selectedRowKeys: []
								});
							});
						} else {
							message.error(response.message)
						}

					}).catch((error) => {
						message.error(error.errorMsg)
					});
				} else {
					let arr = values.functions.concat(values.scopes);
					params.permission_id = [...arr];
					this.props.actions.addRoleAuthorityAction(params).then((response) => {
						if (response.code == 200) {
							message.success(response.message);
							this.closeModal();
							this.props.actions.getRoleList({ app_id: '', page: 1 });
							api.get('/rbac/getAppInfo').then((response) => {
								this.setState({
									applist: response.data,
									selectedRowKeys: []
								});
							});
						} else {
							message.error(response.message)
						}

					}).catch((error) => {
						message.error(error.errorMsg)
					});
				}
			});
		}

	}
	handleUpdateBatch() {
		// console.log(12332)
		let params = {
			role_id: this.state.role_id
		}
		this.form.validateFields((err, values) => {
			if (err) {
				return;
			}
			params.permission_id = this.handleData(values);
			this.props.actions.addRoleAuthorityAction(params);
			this.closeModal();
		});
	}
	//得到promise
	handlePermise(value) {
		this.setState({ permission_box: value })
	}
	//判断是不是路由点击过来的
	handleFlag(flag) {
		this.setState({ isRoute: flag })
	}
	render() {
		const { roleList, pagination } = this.props;
		// let paginationObj = {
		// 	onChange: (current) => {
		// 		this.props.actions.getRoleList({ app_id: this.state.appId, page: current });
		// 	},
		// 	total: pagination.totalCount,
		// 	pageSize: pagination.perPage,
		// 	current: pagination.currentPage || 1,
		// }
		const columns = [
			{
				title: '应用',
				dataIndex: 'app_name',
				key: 'app_name',
				align: 'center',
				width: '200px'
			}, {
				title: 'ID',
				dataIndex: 'id',
				align: 'center',
				width: '200px',
				sorter: (a, b) => {
					return a.id - b.id;
				}
			}, {
				title: '名称标识',
				dataIndex: 'identity_name',
				key: 'identity_name',
				align: 'center',
				width: '200px',
				sorter: (a, b) => {
					return a.identity_name.localeCompare(b.identity_name, "zh");
				}
			}, {
				title: '中文标识',
				dataIndex: 'zh_name',
				key: 'zh_name',
				align: 'center',
				width: '200px',
				sorter: (a, b) => {
					return a.zh_name.localeCompare(b.zh_name, "zh");
				}
			}, {
				title: '描述',
				dataIndex: 'description',
				key: 'description'
			}, {
				title: '操作',
				key: 'action',
				align: 'center',
				width: '200px',
				render: (text, record) => (
					<div>
						<Button type="primary" onClick={this.jump.bind(this, '/auth/roleAuthority', record)}>查看权限</Button>
						<Button className="NavGroup_delete" type="primary" onClick={this.edit.bind(this, record)}>修改</Button>
					</div>
				)
			}
		];
		const { selectedRowKeys, roleID } = this.state;
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onTableSelectChange,
		};
		return (

			<div className="roles_box">
				<AppInfo applist={this.state.applist} onChange={this.handleAppChange.bind(this)} />
				<Button type="primary" style={{ margin: '0px 20px' }}
					disabled={!roleID.length > 0}//选中才可添加
					onClick={this.addRoleBatch.bind(this)}>批量添加权限</Button>
				<Button type="primary" style={{ marginBottom: '10px' }} onClick={this.addRole.bind(this)}>添加角色</Button>
				<Table
					dataSource={roleList}
					columns={columns}
					rowKey={record => record.id}
					pagination={false}
					rowSelection={rowSelection}
					loading={this.state.loading}
				/>
				<AuthModal
					visible={this.state.modalType === 'AuthModal'}
					onCancel={this.handleCancel.bind(this)}
					onNew={this.handleAdd.bind(this)}
					onEdit={this.handleEdit.bind(this)}
					type={this.state.type}
				>
					<RoleForm
						ref={form => this.form = form}
						applist={this.state.applist}
						detail={this.state.detail}
						type={this.state.type}
					>
					</RoleForm>
				</AuthModal>
				{
					this.state.modalType === 'CommonModal' ?
						<CommonModal
							visible={true}
							onCancel={this.handleCancel.bind(this)}
							onNew={this.handleAddBatch.bind(this)}
							onEdit={this.handleUpdateBatch.bind(this)}
							type={this.state.type}
							title={this.state.title}
							okText={this.state.okText}
						>
							<AuthorityForm
								ref={form => this.form = form}
								type={this.state.type}
								detail={this.state.detail}
								resourceList={this.state.resourceList}
								checkedFields={this.state.checkedFields}
								permissionFields={this.state.permissionFields}
								typeList={this.state.typeList}
								app_id={this.state.app_id || 1}
								handlePermise={this.handlePermise.bind(this)}
								handleFlag={this.handleFlag.bind(this)}
							>
							</AuthorityForm>
						</CommonModal> : null
				}
			</div>
		)
	}
}

// Roles.propTypes = {
// 	actions: PropTypes.shape({
// 		getRoleList: PropTypes.func.isRequired,
// 	}),
// 	roleList: PropTypes.array.isRequired,
// 	pagination: PropTypes.object.isRequired
// }

const mapStateToProps = (state) => ({
	roleList: getVisibleRoles(state.auth.roleList),
	pagination: state.auth.rolesPagination,
	permissionId: state.auth.permissionId
})

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...rolesAction
	}, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Roles)
