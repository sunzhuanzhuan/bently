import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as goldenActions from "../../actions/goldenApply";
import { Input, Row, Form, Select, Button, Icon, message, Spin, Modal } from "antd";
import SearchSelect from '../search';
import qs from 'qs';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const FormItem = Form.Item;
const Option = Select.Option;


class ListQuery extends React.Component {
	constructor() {
		super();
		this.state = {
			projectLoading: false,
			weiboLoading: false,
			company_id: ''
		}
	}
	componentDidMount() {
		const search = qs.parse(this.props.location.search.substring(1));
		const { type } = this.props;
		let obj = {};
		let keys = search.keys || {};
		let labels = search.labels ? Object.keys(search.labels) : [];
		labels.length > 0 ? labels.forEach(item => {
			obj[item] = { key: search.keys[item], label: search.labels[item] }
		}) : null;
		if (type === 'add') {
			this.props.form.setFieldsValue({ ...keys, ...obj });
		} else if (type === 'detail') {
			delete search['readjust_application_id'];
			this.props.form.setFieldsValue({ ...keys, ...obj });
		}
		this.props.form.validateFields();
	}
	handleFetch = (obj) => {
		let company_id = '';
		if (this.props.type === 'add') {
			const item = this.props.form.getFieldValue('company_id');
			if (!item) {
				message.error('请先填写公司简称');
				return
			}
			company_id = item.key;
		} else if (this.props.type === 'detail') {
			const search = qs.parse(this.props.location.search.substring(1));
			company_id = search.company_id;
		}
		return this.props.actions.getRequirement({ ...obj, company_id })
	}
	fetchData = (name) => {
		let company_id = '';
		if (this.props.type === 'add') {
			const item = this.props.form.getFieldValue('company_id');
			if (!item) {
				message.error('请先填写公司简称');
				return
			}
			company_id = item.key;
		} else if (this.props.type === 'detail') {
			const search = qs.parse(this.props.location.search.substring(1));
			company_id = search.company_id;
		}
		const { getProject, getPlatform } = this.props.actions;
		if (name === 'project_id') {
			this.setState({ projectLoading: true });
			getProject({ company_id }).then(() => {
				this.setState({ projectLoading: false });
			})
		}
		if (name === 'weibo_type' && !this.props.platformList.length) {
			this.setState({ weiboLoading: true });
			getPlatform().then(() => {
				this.setState({ weiboLoading: false });
			})
		}
	}
	handleFunction = type => {
		const search = qs.parse(this.props.location.search.substring(1));
		const paramsMap = {
			'add': {
				params: { page: 1 }, func: (params) => {
					this.props.history.replace({
						pathname: '/golden/addAdjustApply',
						search: `?${qs.stringify(params)}`,
					})
				}
			},
			'detail': {
				params: { page: 1, readjust_application_id: search.readjust_application_id, company_id: search.company_id }, func: (params) => {
					this.props.history.replace({
						pathname: '/golden/adjustApplyDetail',
						search: `?${qs.stringify({ readjust_application_id: search.readjust_application_id, company_id: search.company_id, ...params })}`,
					})
				}
			}
		};
		return (action, params) => {
			const obj = { ...paramsMap[type].params, ...params.keys };
			const hide = message.loading('查询中，请稍候...');
			action({ ...obj }).then(() => {
				paramsMap[type].func(params)
				hide();
			}).catch(({ errorMsg }) => {
				message.error(errorMsg || '查询失败');
				hide();
			});
		}
	}
	handleSearch = (e) => {
		const { type, curSelectRowKeys, handleClear } = this.props;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if (type === 'add') {
					const item = this.props.form.getFieldValue('company_id');
					const company_id = item.key;
					if (this.state.company_id && this.state.company_id !== company_id && curSelectRowKeys.length > 0) {
						Modal.confirm({
							title: '提示',
							content: '你的已选订单中存在未提交的订单，切换公司将清空，是否继续？',
							onOk: () => {
								this.handleOnOk(values);
								handleClear();
								this.setState({ company_id });
							},
							onCancel: () => {
							},
						});
						return
					} else {
						this.handleOnOk(values);
						this.setState({ company_id });
						return
					}
				} else {
					this.handleOnOk(values);
				}
			}
		});
	}
	handleOnOk = values => {
		const search = qs.parse(this.props.location.search.substring(1));
		const { type, questAction } = this.props;
		let keys = {}, labels = {};
		for (let key in values) {
			if (Object.prototype.toString.call(values[key]) === '[object Object]') {
				if (values[key].key) {
					keys[key] = values[key].key;
					labels[key] = values[key].label;
				}
			} else {
				keys[key] = values[key]
			}
		}
		let params = {};
		if (type === 'add') {
			params = {
				keys: { ...keys },
				labels: { ...labels }
			}
		} else if (type === 'detail') {
			params = {
				keys: {
					...keys,
					readjust_application_id: search.readjust_application_id || '',
					company_id: search.company_id || ''
				},
				labels: { ...labels }
			}
		}
		Object.keys(params['keys']).forEach(item => { !params['keys'][item] && params['keys'][item] !== 0 ? delete params['keys'][item] : null });
		this.handleFunction(type)(questAction, params);
	}
	handleClear = () => {
		this.props.form.resetFields();
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const { projectLoading, weiboLoading } = this.state;
		const { type = 'add', projectList, platformList, rel_order_status } = this.props;
		return <div>
			<Form className='adjust-stat'>
				<Row type="flex" justify="start" gutter={16} style={{ padding: '10px 0' }}>
					<FormItem label='每页显示' className='left-gap'>
						{getFieldDecorator('page_size', { initialValue: 50 })(
							<Select style={{ width: 80 }}>
								<Option value={20}>20</Option>
								<Option value={50}>50</Option>
								<Option value={100}>100</Option>
								<Option value={200}>200</Option>
							</Select>
						)}
					</FormItem>
					{type === 'add' ?
						<FormItem className='left-gap'>
							{getFieldDecorator('company_id', {
								rules: [
									{ required: true, message: '请先输入公司简称!' },
								]
							})(
								<SearchSelect
									placeholder='公司简称'
									getPopupContainer={() => document.querySelector('.adjust-stat')}
									action={this.props.actions.getGoldenCompanyId}
									keyWord='company_name'
									dataToList={res => { return res.data }}
									item={['company_id', 'name']}
								/>
							)}
						</FormItem> : <FormItem className='left-gap'>
							{getFieldDecorator('status')(
								<Select style={{ width: 140 }} placeholder="审批状态" allowClear labelInValue>
									<Option value=''>全部</Option>
									{rel_order_status.map(({ id, display }) => (<Option key={id} value={id}>{display}</Option>))}
								</Select>
							)}
						</FormItem>}
					<FormItem className='left-gap'>
						{getFieldDecorator('project_id')(
							<Select
								id='project_id'
								className='query-multiple-select'
								style={{ width: 160 }}
								placeholder="所属项目"
								allowClear
								showSearch
								labelInValue
								getPopupContainer={() => document.getElementById('project_id')}
								filterOption={(input, option) => (
									option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
								)}
								onFocus={() => { this.fetchData('project_id') }}
								notFoundContent={projectLoading ? <Spin size="small" /> : null}
							>
								{
									projectList.map(({ id, name }) => (<Option key={id} value={id}>{name}</Option>))
								}
							</Select>
						)}
					</FormItem>
					<FormItem className='left-gap'>
						{getFieldDecorator('requirement_id')(
							<SearchSelect
								placeholder='需求名称'
								getPopupContainer={() => document.querySelector('.adjust-stat')}
								action={this.handleFetch}
								keyWord='requirement_name'
								dataToList={res => { return res.data }}
								item={['id', 'name']}
							/>
						)}
					</FormItem>
					<FormItem className='left-gap'>
						{getFieldDecorator('weibo_type')(
							<Select
								id='weibo_type'
								style={{ width: 160 }}
								placeholder="平台"
								allowClear
								showSearch
								labelInValue
								getPopupContainer={() => document.getElementById('weibo_type')}
								filterOption={(input, option) => (
									option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
								)}
								onFocus={() => { this.fetchData('weibo_type') }}
								notFoundContent={weiboLoading ? <Spin size="small" /> : null}
							>
								{
									platformList.map(({ pid, platform_name }) => (<Option key={pid} value={pid}>{platform_name}</Option>))
								}
							</Select>
						)}
					</FormItem>
					<FormItem className='left-gap'>
						{getFieldDecorator('order_id')(
							<Input placeholder='订单ID' style={{ width: 160 }} />
						)}
					</FormItem>
					<FormItem className='left-gap'>
						<Button type='primary' onClick={this.handleSearch}>查询</Button>
						<a className="reset-filter left-gap" onClick={this.handleClear}><Icon type="retweet" />重置搜索框</a>
					</FormItem>
				</Row>
			</Form>
		</div>
	}
}

const mapStateToProps = (state) => {
	return {
		projectList: state.companyDetail.projectList,
		platformList: state.companyDetail.platformList
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...goldenActions }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ListQuery))
