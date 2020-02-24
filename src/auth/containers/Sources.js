import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'

import AuthModal from '../components/AuthModal'
import SourcesForm from '../components/Sources'
import { Table, Button, Popconfirm, Input, message, Select, Alert , Divider, Upload} from 'antd';
import * as sourceAction from '../actions/source'
import { getVisibleSourceRule } from '../reducers/source'
import AppInfo from '../components/AppInfo'
import api from '../../api/index'
import SearchSelect from '@/base/SearchSelect'
import './auth.less'
import qs from 'qs'
import apiDownload from '@/api/apiDownload';
import Interface from '../constants/Interface';
const Search = Input.Search;
const Cookie = require('js-cookie');


class Sources extends Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			modalType: '',
			appId: '',
			search_value: '',
			loading: false,
			resourceTypeSelect: [],
			selectValue: '',
			selected: []
		}
	}
	async componentWillMount() {
		this.setState({ loading: true })
		await this.props.actions.getSourceList({ app_id: '', page: 1, value: this.state.search_value });
		await this.props.actions.getSourceTypeList();
		this.getResourceTypeSelect()
		api.get('/rbac/getAppInfo').then((response) => {
			this.setState({
				loading: false,
				applist: response.data,
			});
		}).catch((error) => {
			this.setState({ loading: false });
			message.error(error.errorMsg)
		})
	}
	//资源类型查询
	getResourceTypeSelect = async () => {
		const { data } = await api.get('/rbac/getResourceTypeList')
		this.setState({ resourceTypeSelect: data.rows })
	}
	async edit(id) {
		this.props.actions.getSourceDetail(id).then(() => {
			this.showModal('AuthModal');
		}).catch((error) => {
			message.error(error.errorMsg)
		});
		this.setState({ loading: true })
		await this.props.actions.getSourceParam({ type: 'edit', editId: id })
		this.setState({ loading: false })
	}
	newSourceRules() {
		this.props.actions.getSourceParam({ type: 'new', editId: '' })
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
		this.form.resetFields();
	}
	handleCreate() {
		this.form.validateFields((err, values) => {
			if (err) {
				return;
			}
			this.setState({ loading: true })
			this.props.actions.addSource(values).then((response) => {
				if (response.code == 200) {
					this.setState({ loading: false })
					this.closeModal();
					document.getElementById('search').value = ''
					this.props.actions.getSourceList({ app_id: '', page: 1, value: '' });
				}
			}).catch((error) => {
				this.setState({ loading: false });
				message.error(error.errorMsg)
			})
		});
	}
	handleEdit() {
		const { appId, search_value, selectValue } = this.state
		this.form.validateFields((err, values) => {
			if (err) {
				return;
			}
			if (values.type_id == this.props.sourceDetail.resourceType_name) {
				values.type_id = this.props.sourceDetail.type_id
			}
			values.id = this.props.sourceParam.editId;
			this.props.actions.updateSource(values).then((res) => {
				if (res.code === 200) {
					this.closeModal();
					this.props.actions.getSourceList({ app_id: appId, page: 1, value: search_value, type_id: selectValue });
				}

			}).catch((error) => {
				message.error(error.errorMsg)
			});

		});
	}
	// 删除
	async deleteSourceItem(id) {
		this.setState({ loading: true })
		await this.props.actions.deleteSource(id)
		this.setState({ loading: false })
	}
	async handleAppChange(value) {
		const { selectValue, search_value } = this.state
		this.setState({
			appId: value,
		});
		this.setState({ loading: true })
		await this.props.actions.getSourceList({ app_id: value, page: 1, value: search_value, type_id: selectValue });
		this.setState({ loading: false })
	}
	//修改资源类型
	async searchSourceList(value) {
		const { appId, search_value } = this.state
		this.setState({ loading: true, selectValue: value })
		await this.props.actions.getSourceList({
			app_id: appId, page: 1, value: search_value, type_id: value
		});
		this.setState({ loading: false })
	}
	//搜索的方法
	async search(value) {
		this.setState({ loading: true })
		const { appId, selectValue } = this.state
		await this.props.actions.getSourceList({ app_id: appId, page: 1, value: value, type_id: selectValue });
		this.setState({ loading: false })
	}
	//搜索
	handleSearch(value) {
		this.search(value);
		this.setState({ search_value: value })
	}
	//回车事件
	handleSearchEnter(e) {
		this.search(e.target.value);
		this.setState({ search_value: e.target.value })
	}
	// 导出
	exportExcel = () => {
		const ids = this.state.selected
		if(ids.length === 0 ){
			return message.warning("请先选择资源!")
		}
		message.loading('正在导出...', 3)
		apiDownload({
			url: Interface.sourceRulesUrl.export + '?' + qs.stringify({resourceIds: this.state.selected}),
			method: 'GET',
		}, '导出资源.xlsx')
	}

	render() {
		const columns = [
			{
				title: '应用',
				dataIndex: 'app_name',
				key: 'app_name',
				width: '140px'
			}, {
				title: '资源名称',
				dataIndex: 'name',
				key: 'name',
				width: '140px'
			}, {
				title: '唯一标识',
				dataIndex: 'unique_name',
				key: 'unique_name',
				width: '140px'
			}, {
				title: '值',
				dataIndex: 'value',
				key: 'value',
				width: '140px'
			}, {
				title: '资源类型',
				dataIndex: 'resourceType_name',
				key: 'resourceType_name',
				width: '140px'
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
						<Popconfirm title="确定要删除吗？" okText="确定" cancelText="取消" onConfirm={this.deleteSourceItem.bind(this, record.id)}>
							<Button type="primary" className="NavGroup_delete">删除</Button>
						</Popconfirm>
					</div>
				),
				width: '220px'
			}
		];
		const { sourceList, sourceTypeList, sourceDetail = {}, sourceParam = {}, pagination } = this.props;
		const { appId, search_value, selectValue, resourceTypeSelect } = this.state
		let paginationObj = {
			onChange: (current) => {
				this.props.actions.getSourceList({ app_id: appId, page: current, value: search_value, type_id: selectValue });
			},
			total: pagination.totalCount,
			pageSize: pagination.perPage,
			current: pagination.currentPage,
		}
		const rowSelection = {
			selectedRowKeys: this.state.selected,
			onChange: (selectedRowKeys, selectedRows) => {
				console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
				this.setState({
					selected: selectedRowKeys
				});
			},
			getCheckboxProps: record => ({
				disabled: record.name === 'Disabled User', // Column configuration not to be checked
				name: record.name,
			}),
		};
		const props = {
			name: 'file',
			action: Interface.sourceRulesUrl.import,
			headers: {
				"X-Access-Token" : Cookie.get('token') || '',
				"Content-Type" : 'charset=utf-8',
			},
			onChange(info) {
				let hide = () => {};
				if (info.file.status !== 'uploading') {
					hide = message.loading('Loading...')
				}
				if (info.file.status === 'done') {
					console.log('2');
					hide()
					message.success(`${info.file.name} file uploaded successfully` );
				} else if (info.file.status === 'error') {
					hide()
					message.error( `上传失败`);
				}
			},
			showUploadList: false
		};
		return (
			<div className="sourceRules_box">
				<AppInfo applist={this.state.applist} onChange={this.handleAppChange.bind(this)} style={{ width: 200 }}
				/>
				<span>
					资源类型：
					<Select style={{ width: 200, }} onChange={this.searchSourceList.bind(this)} placeholder='请选择资源' allowClear={true}>
						{resourceTypeSelect.map(one => <Select.Option key={one.id} value={one.id}>
							{one.name}
						</Select.Option>)}
					</Select>
				</span>
				<div style={{ float: 'right', marginBottom: '10px' }}>
					<Button type="primary" style={{ marginRight: 10 }} onClick={this.newSourceRules.bind(this)}>新增</Button>
					<Search
						id='search'
						placeholder="搜索地址"
						onSearch={this.handleSearch.bind(this)}
						onPressEnter={this.handleSearchEnter.bind(this)}
						style={{ width: 200 }}
						enterButton
					/>
				</div>
				<Alert message={
					<div>
						已选 <b><a>{this.state.selected.length}</a></b> 项
						<span style={{float: 'right'}}>
							<a style={{marginRight: 10}} onClick={() => this.setState({selected: []})} >取消选择</a>
							<Divider type="vertical" />
							<Upload {...props}>
								<a style={{margin: "0 10px"}}  >导入</a>
								{}
							</Upload>
							<a onClick={this.exportExcel} >导出</a>
						</span>
					</div>
				} style={{marginBottom: 10}}/>
				<Table
					rowSelection={rowSelection}
					rowKey={record => record.id}
					dataSource={sourceList}
					columns={columns}
					pagination={paginationObj}
					loading={this.state.loading}
				/>
				<AuthModal
					visible={this.state.modalType === 'AuthModal'}
					onCancel={this.handleCancel.bind(this)}
					onNew={this.handleCreate.bind(this)}
					onEdit={this.handleEdit.bind(this)}
					type={sourceParam.type}
				>
					{
						sourceParam.type === 'edit' ?
							<SourcesForm
								ref={form => this.form = form}
								detail={sourceDetail}
								type={sourceParam.type}
								sourceTypeList={sourceTypeList}
								applist={this.state.applist}
							>
							</SourcesForm> :
							<SourcesForm
								ref={form => this.form = form}
								type={sourceParam.type}
								sourceTypeList={sourceTypeList}
								applist={this.state.applist}
							>
							</SourcesForm>
					}

				</AuthModal>
			</div>
		)
	}
}

// Sources.propTypes = {
// 	actions: PropTypes.shape({

// 	}),
// 	sourceList: PropTypes.array.isRequired,
// 	sourceTypeList: PropTypes.object.isRequired,
// 	sourceDetail: PropTypes.array.isRequired,
// 	sourceParam: PropTypes.array.isRequired,
// 	pagination: PropTypes.object.isRequired
// }

const mapStateToProps = (state) => ({
	sourceList: getVisibleSourceRule(state.auth.sourceList),
	sourceTypeList: state.auth.sourceTypeList,
	sourceDetail: state.auth.sourceDetail,
	sourceParam: state.auth.sourceParam,
	pagination: state.auth.sourcesPagination
})

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...sourceAction
	}, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Sources)
