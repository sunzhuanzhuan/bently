import React, { Component } from "react";
import {
	Select, Form, Input, Button, Modal, Table, Divider, DatePicker,
	message, Spin, Affix
} from "antd";
//import { browserHistory } from 'react-router'
import moment from 'moment'
import {
	accountStatusMap,
	areaMap, requirementPlanMap, sourceMap
} from "../../constants/config";
import { connect } from "react-redux";
import numeral from 'numeral';
import { withRouter } from 'react-router-dom'

import * as actions from '../../actions'
import HeaderStep from '../../components/HeaderStep'
import FilterContainer from "../../components/FilterContainer";
import StausView from '../../base/StatusView'
import './selectNumber.less';
import PlatformSelect from "../../base/PlatformSelect";
import debounce from 'lodash/debounce';
import FindSameAccount from '../../components/FindSameAccount'
import Modalinfo from '../../components/Modalinfo'
import {throttle} from 'lodash/throttle'


const { RangePicker } = DatePicker;
const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input;

// 区间选择时间
/*function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}*/

// 禁用日期当前
function disabledDate(current) {
	return current && current <= moment().startOf('day');
}

// 禁用日期24小时后
function disabledDate24H(current) {
	return current && current <= moment().endOf('day');
}

// 禁用准确时间
/*function disabledDateTime() {
    return {
        disabledHours: () => [],
        disabledMinutes: () => range(0, 60).filter(n => n % 5),
        disabledSeconds: () => range(1, 60),
    };
}*/

// 处理需求数据同步
function handleDemandSync(demand) {
	let _obj = {}
	for (let key in demand) {
		if (!demand.hasOwnProperty(key)) continue
		if (!demand[key]) {
			_obj[key] = undefined
		} else {
			_obj[key] = demand[key].toString()
		}
	}
	_obj['promotion_time'] = [moment(_obj['promotion_start_at']), moment(_obj['promotion_end_at'])]
	_obj['launched_before'] = moment(_obj['launched_before'])
	_obj['requirement_name'] = undefined
	return _obj
}

numeral.locale('chs')

@connect(state => state.extensionNumber, actions)

class SelectNumber extends Component {
	state = {
		filter: {},
		currentPage: 1,
		selectedRowKeys: [],
		step: 1,
		createModalShow: false,
		tableLoading: false,
		isContainFail: false,
		checkSameAccount: false,
		sameAccountList: [],
		similarAcccountCurrent: 1,
		c: true,
		Modalinfo: false,
		restNun:1000, //相似账号还剩下几个账号未操作
		actionNum: 0,//剩余请求后端的数据
		postDataToAction:[],
		bottom:0,

	}
	constructor(props){
		super(props)
		this.isCloseModal = true//请求的时候，用户关闭弹框
		this.num = 0
		this.onlineStatusNumber = {}
		this.filterOnlineStatus = []
		this.updatedAccount = {}
		this.thisCurrent = 0
	}
	feedBack(selectedAccount) {
		
		let flag = true
		this.percentNum= 0
		this._index = 0;
		this.num = 0;

		if (this.isCloseModal==true){
			this._timer = window.setInterval(() => {
				let maxLength = selectedAccount.length - 1
				if (this._index > maxLength) {
					window.clearInterval(this._timer)
				}
				this._index <= maxLength && this.props.getSimilarAccount({
					account_name: selectedAccount[this._index].account_name,
					weibo_type: selectedAccount[this._index].weibo_type,
					ext_account_id: selectedAccount[this._index].ext_account_id
				}).then((data) => {
					
					if (flag == true && data.rows.length > 0) {
						this.setState({ checkSameAccount: true, Modalinfo: false, similarAcccountLoading: false, createModalShow: false })
						flag = false;
					}

					if (flag == true && this.num >= selectedAccount.length - 1 && data.rows.length == 0 ){
						this.setState({
							createModalShow: true,
							Modalinfo: false,
							checkSameAccount: false,
							restNun: 1000
						})	
						flag = false;
						this.num = 0;
					}
					this.num++;
					this.setState({
						actionNum: selectedAccount.length - this.num
					})
				}).catch((error) => {
					console.log("error:", error)
					message.error(error.message || error.msg || '请重新点击填写拓号需求')
					this._index = 0;
					this.num = 0
					this.setState({
						Modalinfo: false
					})
					window.clearInterval(this._timer)
				})
				this._index++;
				// this.percentNum++
				this.cardLoading = true
				
			}, 200);
		}else{
			//
		}

	}
	// 处理创建需求
	handleCreateModal = () => {
		// 其他处理	
		//判断数据请求回来的有没有相似账号
		// this.props.sendTotalAccount(this.fetchRowSelectedTotal)
		this._index = 0;
		this.num = 0
		this.resetHasSimilarAccount();
		const selectedAccount = this.getSelectedAccount();

		if (selectedAccount.length != 0) {
			this.setState({
				checkSameAccount: false,
				createModalShow: false,
				step: 1,
				Modalinfo: true
			})
			this.feedBack(selectedAccount)
		}else{
			this.setState({
				createModalShow: true,
				checkSameAccount: false,
				step: 1,
				Modalinfo: false
			})
		}
	}
	handHeckSameAccount = () => {
		this.isCloseModal == false
		window.clearInterval(this._timer)
		this.setState({
			restNun: 1000,
			actionNum:0,
			checkSameAccount: false
		},()=>{
			// this.props.resetPaddingData()
		})
		//this.props.resetSimilarAccount()
		// this.getList()
	}
	//关闭弹框

	updateHasSimilarAccount = (id, _obj) => {
		this.updatedAccount[id] = _obj;
		window.updatedAccount = this.updatedAccount
		this.setState({});
		//console.log(window.updatedAccount)
	}
	resetHasSimilarAccount = () => {
		this.updatedAccount = {};
		this.setState({})
		window.updatedAccount = this.updatedAccount
	}
	//获取选中的账号
	getSelectedAccount = () => {
		let {
			importAccountList
		} = this.props
		let { map, list } = importAccountList || {}
	
		const selectedRowKeys = this.state.selectedRowKeys;
		let selectedAccount = selectedRowKeys.map(item => {
			return map[item];
		}).filter((item) => {
			if(!item){debugger;}
			//5是抓取失败，1 未入库,3 // 已下架
			return ((item.status == 5 || item.status == 1) && item.account_name !='' )	
		});
		return selectedAccount
	}
	getSelectedAccountAll=()=>{
		let {
			importAccountList
		} = this.props
		let { map, list } = importAccountList || {}
		const selectedRowKeys = this.state.selectedRowKeys;
		let selectedAccount = selectedRowKeys.map(item => {
			return map[item];
		})
		return selectedAccount
	}
	getSelectedAccountHasSimilar = () => {
		const { similarAccount } = this.props;
		const selectedAccount = this.getSelectedAccount();
		const selectedAccountHasSimilar = selectedAccount.filter(item => {
			const _a = similarAccount[item.ext_account_id];
			return _a && _a.length > 0;
		})
		
		return selectedAccountHasSimilar;
	}
	//获取未更新账号的长度
	getUpdatingAccountLength = () => {
		const selectedAccountHasSimilar = this.getSelectedAccountHasSimilar();

		const updatedAccountLength = Object.keys(this.updatedAccount).length;
		const updatingAccountLength = selectedAccountHasSimilar.length - updatedAccountLength;

		
		return {
			updatedAccountLength, 
			updatingAccountLength, 
			selectedAccountHasSimilarLength:selectedAccountHasSimilar.length,
			selectedAccountHasSimilar
		}
	}
	
	closeCheckSimilar = () => {
		const selectedAccountHasSimilar = this.getSelectedAccountHasSimilar();
		let { importAccountList } = this.props;

		let { selectedRowKeys}=this.state
		this.selectedAccountFilter={}
		const _updatedSimilarAccount = selectedAccountHasSimilar.map(item => {
			const choose_account = this.updatedAccount[item.ext_account_id]
			if (choose_account){
				let choose_status = choose_account.choose_status
				return {
					account_name: item.account_name,
					weibo_type: item.weibo_type,
					weibo_type_name: item.weibo_type_name,
					status_name: item.status_name,
					followers_count: item.followers_count,
					weibo_id: item.weibo_id,
					ext_account_id: item.ext_account_id,
					url: item.url,
					choose_account,
					choose_status
				}
			}
		})
		let onlineAccountLength = Object.values(this.updatedAccount).filter((item, index) => {
			return item.online_status == 1
		}).length;
		let onlineAccount = Object.values(this.updatedAccount).filter((item, index) => {
			return item.online_status == 1
		})
		let getSelectedAccountAll = this.getSelectedAccountAll()
		this.selectedAccount = this.getSelectedAccount();
		const { 
			updatedAccountLength,
			updatingAccountLength,
			selectedAccountHasSimilarLength
		} = this.getUpdatingAccountLength();

		if (this.state.actionNum!=0){
			message.warning(`还有${this.state.actionNum}个数据加载中~`)
			return
		}		
		if (updatingAccountLength > 0) {
			//系统未处理完所有数据的时候
			message.warning(`还有${updatingAccountLength}个账号未处理呢~`);
			return;
		}
		if(updatedAccountLength == 0){
			message.warning(`您尚未对账号进行处理呢~`);
			return
		}else{
			if (updatedAccountLength == selectedAccountHasSimilarLength){
				this.setState({//state初始值是是1，没有点击的话，没有传值过来
					createModalShow: onlineAccountLength != this.selectedAccount.length,
					checkSameAccount: false,
					step: 1
				})
			} else{
				message.warning(`您还有${updatingAccountLength}个账号未处理呢~`);
				return
			}
		}
		//我需要从总共选择的账号过滤掉选择已上架的账号
		let onlineAccountMap = onlineAccount.reduce((obj,item)=>{
			obj[item['ext_account_id']] = item
			return obj
		},{})

		this.selectedAccountFilter = getSelectedAccountAll.filter((item,index)=>{
			return onlineAccountMap[item['ext_account_id']] == undefined
		})
		this.selectedAccountFilterRowKey=this.selectedAccountFilter.map((item,index)=>{
			return item['ext_account_id']
		})
		this.props.postSimilarAccount(_updatedSimilarAccount).then(() => {
			this.afterSimilarAccount()
		})
	}
	// 处理步骤
	handleStep = step => {
		this.setState({ step })
	}
	//选择完相似账号后，获取列表的方法
	afterSimilarAccount = async (query = {})=>{
		let { getImportAccountList } = this.props
		this.setState({ tableLoading: true })
		let { filter } = this.state
		if(this.currentPage == 0){
			await getImportAccountList({ page: 1, ...filter, ...query})	
		}else{
			await getImportAccountList({ page: this.thisCurrent, ...filter, ...query})	
		}
		this.setState({
			tableLoading: false,
			selectedRowKeys: this.selectedAccountFilterRowKey
		})
	}
	// 获取列表方法
	getList = async (query = {}) => {
		let { getImportAccountList } = this.props
		let { filter } = this.state

		this.setState({ tableLoading: true })
		await getImportAccountList({ ...filter, page: 1, ...query })
		this.setState({
			currentPage: query.page || 1,
			selectedRowKeys: [],
			filter: { ...filter, ...query },
			tableLoading: false,

		})

	}

	componentWillMount() {
		// 获取已导入账号列表
		this.getList()
	}
	

	render() {
		let {
			importAccountList, queryRequirement, validateRequirementName,
			postCreateDemand, similarAccount={}
		} = this.props
		let { count = 0, page = 1, pageNum = 100, map, list } = importAccountList || {}
		let rowSelection = {
			getCheckboxProps: (record) => ({
				disabled: record.status == '4' || record.status == '2'
			}),
			selectedRowKeys: this.state.selectedRowKeys,
			onChange: (selectedRowKeys) => {
				this.setState({ selectedRowKeys })
			},
		};
		//获取选中的选中的数据 
		const selectedAccount = this.getSelectedAccount();
		let pagination = {
			position: 'top',
			showTotal: total => `共 ${Math.ceil(total / pageNum)} 页，${total} 条`,
			size: 'small',
			hideOnSinglePage: true,
			onChange: (current) => {
				this.getList({ page: current })
				this.setState({ currentPage: current, selectedRowKeys:[]});
				this.thisCurrent = current
			},
			total: count,
			pageSize: pageNum,
			current: Number(page)
		}
		let columns = [
			{
				title: 'ID',
				dataIndex: 'weibo_id',
				// dataIndex:'ext_account_id',
				align: 'center',
				render: (id) => {
					return id ? id : '-';
					//靠id抓取，并且抓取成功或者不成功的，都需要显示id
					//不靠链接抓取，如果抓取失败的情况下，显示'-'
				}
			}, {
				title: '平台',
				dataIndex: 'weibo_type_name',
				align: 'center',
				render: (type) => {
					return type
				}
			}, {
				title: '账号名',
				dataIndex: 'account_name',
				align: 'center',
				render: (text) => {
					return text
				}
			}, {
				title: '链接',
				dataIndex: 'url',
				align: 'center',
				width: 48,
				render: (url, record) => {
					let linkList = [119, 25, 24, 103, 115, 118, 116, 110, 93, 9]//通过链接获取
					let showUrl = () => {
						if (url == '') {
							return '-'
						} else {
							if (linkList.indexOf(record.weibo_type) !== -1) {
								return <a href={url} target='_blank'>URL</a>
							} else {
								if (linkList.indexOf(record.weibo_type) == -1 && record.status !== 5) {
									return <a href={url} target='_blank'>URL</a>
								} else {
									return '-'
								}
							}
						}
					}
					return (
						showUrl()
						//靠链接抓取，并且抓取成功或者不成功的，都需要显示链接
						//不靠链接抓取，如果抓取失败的情况下，显示'-'
					)
				}
			}, {
				title: '粉丝数',
				dataIndex: 'followers_count',
				align: 'center',
				render: (num) => num ? numeral(num).format('0,0') : '0'
			}, {
				title: '导入时间',
				dataIndex: 'created_at',
				align: 'center',
				render: (text) => text || '-'
			}, /*{
                title: '最后更新(发文)时间',
                dataIndex: 'last_online_at',
                align: 'center',
                render: (time) => time || '-'
            },*/ {
				title: '账号状态',
				dataIndex: 'status',
				align: 'center',
				render: (status, record) => <StausView status={record.status_name}/>
			}, /*{
                title: '报价',
                dataIndex: 'price',
                align: 'center',
                render: (price) => price || '-'
            }*/
		]
		let primary_key = 'ext_account_id'

		let dataSoure = list.map(item => map[item])
		let bottom = 0;
		// let { dataMap } = this.props,
		// let selectedAccount = [];
		// this.state.selectedRowKeys.forEach(item => {
		// 	selectedAccount.push(map[item]);
		// 	// id.push(dataMap[item].account_id);
		// });
		// console.log("selectedAccount", this.props)
		
		// const selectedAccountHasSimilar = selectedAccount.filter(item => {
		// 	const _a = similarAccount[item.ext_account_id];
		// 	return _a && _a.length > 0;
		// })

		const { 
			updatedAccountLength,
			updatingAccountLength,
			selectedAccountHasSimilar,
			selectedAccountHasSimilarLength
		} = this.getUpdatingAccountLength();
		return (
			<div className='extension-number select-number-page' style={{paddingBottom:80}}>


				<Modalinfo visible={this.state.Modalinfo} 
					rest={this.state.actionNum}
					total={selectedAccount.length} />

				<header className='page-content'>
					<FilterContainer>
						<FilterForm tableLoading={this.state.tableLoading} getList={this.getList} 
						
						/>
					</FilterContainer>
				</header>
				<main>
					<Table rowSelection={rowSelection} pagination={pagination}
						bordered columns={columns}
						rowKey={record => record[primary_key]}
						loading={this.state.tableLoading}
						dataSource={dataSoure}
						//onRow={}
					/>
				</main>
				<div className='import-number-footer'>
					<Button type='primary' disabled={this.state.selectedRowKeys.length <= 0}
						className='next-button' onClick={this.handleCreateModal}>填写拓号需求</Button>
				</div>

				{this.state.createModalShow ?
					<Modal visible={true}
						maskClosable={false}
						title='微播易提醒您：请创建拓号需求'
						wrapClassName='extension-number-modal modal-select-number-page'
						width={800}
						footer={null}
						onCancel={() => {
							this.setState({
								createModalShow: false,
								step: 1
							})
							
							
							// this.getList()
						}}
					>
						<CreateForm 
							selected={this.state.selectedRowKeys}
							queryRequirement={queryRequirement}
							validateName={validateRequirementName}
							postCreateDemand={postCreateDemand}
							dataMap={map}

							// onlineStatusNumberRest={onlineStatusNumberRest}
							
						/>
					</Modal> : null}
				{
					this.state.checkSameAccount == true ?
						<Modal
							width={1200}
							height={500}
							visible={true}
							onCancel={this.handHeckSameAccount}
							okText='下一步'
							onOk={this.closeCheckSimilar}
							maskClosable={false}
							destroyOnClose={true}
						>
							<FindSameAccount visible={true}
								fetchFailAccount={this.fetchFailAccount}
								onCancel={this.handHeckSameAccount}
								similarCurrentAccount={this.state.similarCurrentAccount}
								total={this.fetchFailAccount}
								similarAcccountLoading={this.state.similarAcccountLoading}
								similarAccount={similarAccount}
								rest={this.state.actionNum}
								checkSameAccount={this.state.checkSameAccount}
								createModalShow={this.state.createModalShow}
								selectedAccountHasSimilar={selectedAccountHasSimilar}
								updateHasSimilarAccount={this.updateHasSimilarAccount}
								updatingAccountLength={updatingAccountLength}
								resetHasSimilarAccount={this.resetHasSimilarAccount}
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
	// 查询提交
	submitQuery = (e) => {
		let { getList } = this.props
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if (values.created_at) values.created_at = values.created_at.map(moment => {
					return moment.format('YYYY-MM-DD HH:mm:ss')
				})
				// 查询请求
				getList(values)
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form
		let accountStatusKeys = [1, 2, 3, 5]
		let accountStatusAry = accountStatusKeys.map(i => accountStatusMap[i])

		return (<Form layout="inline" onSubmit={this.submitQuery}>
			<FormItem label="平台">
				{
					getFieldDecorator('weibo_type', {})(
						<PlatformSelect getPopupContainer={() => document.querySelector('.select-number-page')} />)
				}
			</FormItem>
			<FormItem label="账号名称">
				{
					getFieldDecorator('account_name', {})(
						<Input placeholder='账号名称' />)
				}
			</FormItem>
			<FormItem label="链接">
				{
					getFieldDecorator('url', {
						rules: [{ type: 'url', message: '请填写正确的链接' }]
					})(<Input placeholder='链接' />)
				}
			</FormItem>
			<FormItem label="id">
				{
					getFieldDecorator('weibo_id', {
						rules: [{ pattern: /\d/, message: '请输入正确的id号' }]
					})(<Input placeholder='id' />)
				}
			</FormItem>
			<FormItem label="账号状态">
				{
					getFieldDecorator('status', {})(
						<Select allowClear
							getPopupContainer={() => document.querySelector('.select-number-page')}
							placeholder='选择状态' style={{ width: 120 }}>
							{accountStatusAry.map(({ id, text }) =>
								<Option key={id}>{text}</Option>)}
						</Select>)
				}
			</FormItem>
			<FormItem label="账号导入时间">
				{
					getFieldDecorator('created_at', {})(
						<RangePicker format='YYYY-MM-DD HH:mm:ss' showTime={{
							defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
						}} />)
				}
			</FormItem>
			<FormItem>
				<Button type='primary' style={{ width: '100px' }}
					htmlType="submit"
					loading={this.props.tableLoading}
					
					className='filter-button'>查询</Button>
			</FormItem>
		</Form>)
	}
}

@connect(state => ({
	userLoginInfo: state.loginReducer.userLoginInfo
}), actions)
@withRouter
@Form.create({})
class CreateForm extends Component {
	state = {
		demandNameType: 0,
		createLoading: false,
		requermentList: [],
		value: [],
		searchLoading: false,
	}

	constructor() {
		super()
		this.lastFetchId = 0;
		this.searchRequerment = debounce(this.searchRequerment, 800);
	}

	// 模糊查询需求列表
	searchRequerment = (value) => {
		let { queryRequirement } = this.props
		this.lastFetchId += 1;
		const fetchId = this.lastFetchId;
		this.setState({ requermentList: [], searchLoading: true });
		queryRequirement({ requirement_name: value })
			.then(res => res.data)
			.then((data) => {
				if (fetchId !== this.lastFetchId) {
					return;
				}
				this.setState({ requermentList: data || [], searchLoading: false });
			});
	}

	// 提交创建需求表单
	submitCreate = (e) => {
		let { similarAccountResult, similarAccount, onlineStatusNumberRest, selected } = this.props
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({ createLoading: true })
				// 处理表单参数
				let body = Object.entries(values).reduce((pre, [key, value]) => {
					if (key === 'promotion_time') {
						pre['promotion_start_at'] = value[0].format()
						pre['promotion_end_at'] = value[1].format()
					} else if (key === 'launched_before') {
						pre['launched_before'] = value.format()
					} else {
						pre[key] = value
					}
					return pre
				}, {})
				// 处理选择项
				let { dataMap } = this.props;
				let account_id = selected.filter(item => {
					return dataMap[item].online_status != 1
				});
				let account_name = account_id.map(item => dataMap[item].account_name)
				//获取当前时间，销售提交时间超过当天的21:00则给出提示
				let thisDate = new Date()
				let nowHour = parseInt(thisDate.getHours())
				// 提交表单
				nowHour > 20 ? Modal.warning({
					title: '提示',
					content: '因提交需求时间过晚，最晚上架时间可能会顺延一个工作日哟~',
				}) : null
			
				this.props.postCreateDemand({
					...body,
					account_name,
					account_id,
				}).then(({ msg }) => {
					message.success(msg, 1.2, () => {
						//修改了push的方式
						this.props.history.push('/extensionNumber/seller/demandHistory')
						//browserHistory.push('/extensionNumber/seller/demandHistory')
					});
				}).catch(({ msg }) => {
					message.error(msg || '提交失败', 1.2);
					this.setState({ createLoading: false, })
				})

			}
		});
	}
	// 处理选择已有需求,需求描述跟随修改
	handleDemandName = (value) => {
		if (!value) return this.setState({ value })
		let demand = this.state.requermentList.find(item => item.requirement_id == value.key) || {};
		this.props.form.setFieldsValue(handleDemandSync(demand))
		this.setState({
			value,
			requermentList: [],
			searchLoading: false,
		});
	}
	// 检验新建需求名称是否重复
	checkDemandName = (rule, value, callback) => {
		// let { validateName } = this.props;
		// console.log(validateName);
        /*if (Object.values(this.existingDemandMap).find(({ requirement_name }) => requirement_name === value)) {
            callback('需求名称不能重复')
        }*/
		callback()
	}
	// 检查预计推广时间
	checkPromotionTime = (rule, value, callback) => {
		if (value) {
			let [start, end] = value;
			if (start >= end) {
				callback('结束日期必须晚于开始日期')
			}
			if (start < moment()) {
				callback('开始时间必须大于当前时间')
			} else if (end < (moment() + 24 * 60 * 60 * 1000)) {
				callback('结束时间必须晚于当前时间的24小时')
			}
			callback()
		}
	}
	// 检查最晚上架时间
	checkdDeadline = (rule, value, callback) => {
		if (value < (moment() + 48 * 60 * 60 * 1000)) {
			callback('请选择距离当前时间48小时以后的上架时间')
		}
		callback()
	}

	render() {
		const { getFieldDecorator } = this.props.form
		let areaKeys = [1, 2, 3, 4],
			requirementPlanKeys = [1, 2],
			sourceKeys = [1, 2],
			areaAry = areaKeys.map(key => areaMap[key])
		// requirementPlanAry = requirementPlanKeys.map(key => requirementPlanMap[key]),
		// sourceAry = sourceKeys.map(key => sourceMap[key])
		const { searchLoading, requermentList, value } = this.state;
		//let cell_phone = user_info.cell_phone;
		return (<Form layout="inline" onSubmit={this.submitCreate}>
			<div>
				<FormItem label="需求名称">
					{
						getFieldDecorator('requirement_name', {
							validateFirst: true,
							validateTrigger: 'onBlur',
							rules: [{
								required: true,
								message: '填写需求名称',
							}, {
								validator: this.checkDemandName,
							}]
						})(
							<Input placeholder='填写需求名称' />)
					}
				</FormItem>
				<FormItem label="选择需求模板">
					<Select className='w170 mr10'
						showSearch
						allowClear
						labelInValue
						filterOption={false}
						value={value}
						notFoundContent={searchLoading ?
							<Spin size="small" /> : null}
						onSearch={this.searchRequerment}
						style={{ width: '200px' }}
						placeholder='(选填)选择填充需求内容'
						optionFilterProp="children"
						onChange={this.handleDemandName}
					>
						{requermentList.map(d =>
							<Option key={d.requirement_id}>{d.requirement_name}</Option>)}
					</Select>
					{/*<span className='g9'>同步已有需求信息</span>*/}
				</FormItem>
			</div>
			<FormItem label="创建人区域">
				{
					getFieldDecorator('creator_area', {
						initialValue: '1',
						rules: [
							{
								required: true,
								message: '请选择创建人区域'
							}
						]
					})(
						<Select className='w120' showSearch
						>
							{areaAry.map(({ id, text }) =>
								<Option key={id}>{text}</Option>)}
						</Select>)
				}
			</FormItem>
			<FormItem label="项目组名称">
				{
					getFieldDecorator('project_team_name', {})(
						<Input style={{ width: '200px' }} placeholder='(选填)项目组名称' />)
				}
			</FormItem>

			<FormItem label="创建人联系方式">
				{
					getFieldDecorator('creator_mobile', {
						initialValue: this.props.userLoginInfo.user_info.cell_phone,
						rules: [
							{
								required: true,
								pattern: /\d/,
								message: '请输入正确的联系方式'
							}
						]
					})(
						<Input placeholder='手机号/座机' />)
				}
			</FormItem>
			<FormItem label="推广产品" className='mr0'>
				{
					getFieldDecorator('promoted_product', {
						rules: [
							{
								required: true,
								message: '请输入推广产品'
							}
						]
					})(
						<Input placeholder='请输入推广产品' />)
				}
			</FormItem>
			<FormItem label="预计推广时间">
				{
					getFieldDecorator('promotion_time', {
						validateFirst: true,
						rules: [
							{
								required: true,
								message: '请选择预计推广时间'
							}, {
								validator: this.checkPromotionTime,
							}
						]
					})(
						<RangePicker style={{ width: '450px' }}
							disabledDate={disabledDate}
							// disabledTime={disabledDateTime}
							showTime={{
								hideDisabledOptions: true,
								defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
							}}
							format="YYYY-MM-DD HH:mm:ss"
						/>)
				}
			</FormItem>
			<FormItem label="最晚上架时间">
				{
					getFieldDecorator('launched_before', {
						rules: [
							{
								required: true,
								message: '请选择最晚上架时间'
							}, {
								validator: this.checkdDeadline
							}
						]
					})(
						<DatePicker style={{ width: '200px' }}
							showTime={{
								disabled: true,
								hideDisabledOptions: true,
								defaultValue: moment('23:59:59', 'HH:mm:ss')
							}}
							format="YYYY-MM-DD HH:mm:ss"
							disabledDate={disabledDate24H}
						// disabledTime={disabledDateTime}
						/>)
				}
			</FormItem>
			<div className='d-fl'>
				<FormItem label="需求描述">
					<div className='textarea-box'>
						{
							getFieldDecorator('desc', {
								rules: [{
									max: 1000,
									message: '最多可输入1000字',
								},
								{
									required: true,
									message: '请填写需求描述'
								}
								]
							})(
								<TextArea placeholder="需求描述" autosize={{
									minRows: 2,
									maxRows: 4
								}} />
							)
						}
						<p>需求描述越详细，越有助于拓号成功和拓号效率哦</p>
					</div>
				</FormItem>
				<FormItem label="备注">
					<div className='textarea-box'>
						{
							getFieldDecorator('comment', {
								rules: [{ max: 1000, message: '最多可输入1000字' }]
							})(
								<TextArea placeholder="备注" autosize={{
									minRows: 2,
									maxRows: 4
								}} />
							)
						}
					</div>
				</FormItem>
			</div>
			<footer className='tac'>
				<FormItem>
					<Button type='primary' style={{ padding: '0 26px' }}
						htmlType="submit"
						className='filter-button'
						loading={this.state.createLoading}
					>提交</Button>
				</FormItem>
			</footer>
		</Form>)
	}
}

export default SelectNumber;

