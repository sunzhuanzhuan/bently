import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import AuthModal from '../components/AuthModal'
import NavTypeForm from '../components/NavType'
import { Table, Button, Popconfirm, message, Divider, Upload, Alert } from 'antd';
import * as navTypeAction from '../actions/navType'
import { getVisibleSourceRule } from '../reducers/navType'
import api from '../../api/index'
import AppInfo from '../components/AppInfo'
import qs from "qs";
import './auth.less'
import Interface from '../constants/Interface';
import apiDownload from '@/api/apiDownload';
const Cookie = require('js-cookie');


class NavType extends Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			modalType: '',
			loading: false,
			appId: '',
			selected:[]
		}
		this.uploadMessage = null
	}
	async componentWillMount() {
		this.setState({ loading: true })
		await this.props.actions.getNavTypeList({ app_id: '', page: 1 });
		api.get('/rbac/getAppInfo').then((response) => {
			this.setState({
				loading: false,
				applist: response.data,
			});
		}).catch((error)=>{
			this.setState({ loading: false });
			message.error(error.errorMsg)
		});
	}
	edit(id) {
		this.setState({ loading: true })
		this.props.actions.getNavTypeParam({ type: 'edit', editId: id });
		this.props.actions.getNavTypeDetail(id).then(() => {
			this.setState({ loading: false })
			this.showModal('AuthModal');
		}).catch((error)=>{
			this.setState({ loading: false });
			message.error(error.errorMsg)
		})
	}
	newSourceRules() {
		this.props.actions.getNavTypeParam({ type: 'new', editId: '' });
		this.showModal('AuthModal');
	}
	showModal(modalType) {
		this.setState({ modalType });
	}
	handleCancel() {
		this.closeModal();
	}
	closeModal() {
		this.setState({ modalType: '' })
		this.form.resetFields()
	}
	handleCreate() {
		this.form.validateFields((err, values) => {
			if (err) {
				return;
			}
			this.setState({ loading: true })
			this.props.actions.addNavType(values).then((response) => {
				if (response.code == 200) {
					message.success(response.message)
					this.props.actions.getNavTypeList({ app_id: this.state.appId, page: 1 }).then((response) => {
						if (response.code == 200) {
							this.setState({ loading: false })
							this.closeModal();
						}
					})
				} else {
					message.error(response.message)
				}

			}).catch((error)=>{
				this.setState({ loading: false });
				message.error(error.errorMsg)
			});

		});
	}
	handleEdit() {
		this.form.validateFields((err, values) => {
			if (err) {
				return;
			}
			values.id = this.props.getNavTypeParam.editId;
			this.setState({ loading: true })

			this.props.actions.updateNavType(values).then((response) => {
				if (response.code == 200) {
					message.success(response.message)
					this.props.actions.getNavTypeList({ app_id: this.state.appId, page: 1 }).then((response) => {
						if (response.code == 200) {
							this.closeModal();
							this.setState({ loading: false })

						}
					})
				} else {
					message.error(response.message)
				}

			}).catch((error)=>{
				this.setState({ loading: false });
				message.error(error.errorMsg)
			});
		});
	}
	jump(href, record) {
		const params = {
			id: record.id,
			app_id: record.app_id
		}
		//修改了push的方式
		this.props.history.push({
			pathname: href,
			search: '?' + qs.stringify(params)
		})
	}
	async deleteNavTypeAction(id) {
		this.setState({ loading: true })
		this.props.actions.deleteNavType(id).then(()=>{
			this.props.actions.getNavTypeList({ app_id: this.state.appId, page: 1 })
			this.setState({ loading: false })
		}).catch((error)=>{
			this.setState({ loading: false });
			message.error(error.errorMsg)
		});

	}
	handleAppChange(value) {
		this.setState({
			appId: value,
		});
		this.props.actions.getNavTypeList({ app_id: value, page: 1 });
	}
	// 导出
	exportExcel = () => {
		const ids = this.state.selected
		if(ids.length === 0 ){
			return message.warning("请先选择导航!")
		}
		message.loading('正在导出...', 3)
		apiDownload({
			url: Interface.navGroupUrl.export + '?' + qs.stringify({navigationCateIds: this.state.selected}),
			method: 'GET',
		}, '导出导航分类.xlsx')
	}
	render() {
		const columns = [
			{
				title: '应用',
				dataIndex: 'app_name',
				key: 'app_name',
				width: '140px',
				render: (text, record) => (
					<div className="NavType_jump" type="primary" onClick={this.jump.bind(this, '/auth/navGroup', record)} style={{ color: '#1DA57A' }}>{text}</div>
				),
			}, {
				title: '导航名称',
				dataIndex: 'name',
				key: 'name',
				width: '200px'
			}, {
				title: '唯一名称',
				dataIndex: 'unique_name',
				key: 'unique_name',
				width: '200px'
			}, {
				title: '描述',
				dataIndex: 'description',
				key: 'description',
			}, {
				title: '操作',
				key: 'action',
				render: (text, record) => (
					<div>
						<Button type="primary" onClick={this.edit.bind(this, record.id)}>修改</Button>
						<Popconfirm title="确定要删除吗？" okText="Yes" cancelText="No" onConfirm={this.deleteNavTypeAction.bind(this, record.id)}>
							<Button className="NavGroup_delete" type="primary">删除</Button>
						</Popconfirm>
					</div>
				),
				width: '220px'
			}
		];
		const { navTypeList, getNavTypeDetail = {}, getNavTypeParam = {}, pagination } = this.props;
		let paginationObj = {
			onChange: (current) => {
				this.props.actions.getNavTypeList({ page: current, app_id: this.state.appId });
			},
			total: pagination.totalCount,
			pageSize: pagination.perPage,
			current: pagination.currentPage || 1,
		}

		const props = {
			name: 'file',
			action: Interface.navGroupUrl.import,
			headers: {
				"X-Access-Token" : Cookie.get('token') || '',
			},
			onChange:  (info) => {
				if (info.file.status === 'uploading' && !this.uploadMessage) {
					this.uploadMessage = message.loading('Loading...')
				}
				if (info.file.status === 'done') {
					this.uploadMessage()
					this.uploadMessage = null
					if(info.file.response.code === 1000){
						message.success(`上传成功!` );
					}else {
						message.error(info.file.response.msg || '上传失败');
					}
				} else if (info.file.status === 'error') {
					this.uploadMessage()
					this.uploadMessage = null
					message.error( `上传失败`);
				}
			},
			showUploadList: false
		};
		const rowSelection = {
			selectedRowKeys: this.state.selected,
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({
					selected: selectedRowKeys
				});
			}
		};

		return (
			<div className="sourceRules_box">
				<AppInfo applist={this.state.applist} onChange={this.handleAppChange.bind(this)} />
				<Button type="primary" style={{top: 0}} className="sourceRules_new" onClick={this.newSourceRules.bind(this)}>新增</Button>
				<Alert message={
					<div>
						已选 <b><a>{this.state.selected.length}</a></b> 项
						<span style={{float: 'right'}}>
							<a style={{marginRight: 10}} onClick={() => this.setState({selected: []})} >取消选择</a>
							<Divider type="vertical" />
							<Upload {...props}>
								<a style={{margin: "0 10px"}}  >导入</a>
							</Upload>
							<a onClick={this.exportExcel} >导出</a>
						</span>
					</div>
				} style={{marginBottom: 10}}/>
				<Table rowKey={record => record.id} dataSource={navTypeList} columns={columns} pagination={paginationObj} loading={this.state.loading} rowSelection={rowSelection}
				/>
				<AuthModal
					visible={this.state.modalType === 'AuthModal'}
					onCancel={this.handleCancel.bind(this)}
					onNew={this.handleCreate.bind(this)}
					onEdit={this.handleEdit.bind(this)}
					type={getNavTypeParam.type}
				>
					{
						getNavTypeParam.type === 'edit' ?
							<NavTypeForm
								ref={form => this.form = form}
								detail={getNavTypeDetail}
								type={getNavTypeParam.type}
								applist={this.state.applist}
							>
							</NavTypeForm> :
							<NavTypeForm
								ref={form => this.form = form}
								type={getNavTypeParam.type}
								applist={this.state.applist}
							>
							</NavTypeForm>
					}

				</AuthModal>
			</div>
		)
	}
}

// NavType.propTypes = {
// 	actions: PropTypes.shape({

// 	}),
// 	navTypeList: PropTypes.array.isRequired,
// 	getNavTypeDetail: PropTypes.object.isRequired,
// 	getNavTypeParam: PropTypes.object.isRequired,
// 	pagination: PropTypes.object.isRequired
// }

const mapStateToProps = (state) => ({
	navTypeList: getVisibleSourceRule(state.auth.navTypeList),
	getNavTypeDetail: state.auth.getNavTypeDetail,
	getNavTypeParam: state.auth.getNavTypeParam,
	pagination: state.auth.navTypePagination
})

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...navTypeAction
	}, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NavType)
