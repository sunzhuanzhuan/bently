import React, { Component } from "react"
import { Tabs, Badge, Form, Divider, Icon, Tooltip, Skeleton, Button, message, Modal } from 'antd'
import moment from 'moment'
import { AccountInfos, AudiencePortraitForm } from '../UpdateChild'
import { BaseInfo } from '../../../components/BaseInfo'
import { FetchInfo } from '../../../components/FetchInfo'
import {
	QCCodeUpload,
	AccountType,
	AccountDesc,
	ContentCategory,
	AccountIsNameless, AccountID, Orderable, PriceInclude, OrderStrategy
} from '../../../components/Unique'
import { Fans } from '../../../components/Fans'
import { FansCount } from '../../../components/FansCount'
import { WrapPanel, WrapPanelForm } from "../../../components/index";
import { FamousPrice, NamelessPrice } from "../../../components/AccountPrice";
import { ProfitLevel, ReferencePrice } from "../../../components/Unique";
import AccountState from "../../../components/AccountState";
import { AccountFeature } from "../../../components/AccountFeature";
import { CooperateInfo } from "../../../components/CooperateInfo";
import { OnSaleInfo } from '../../../components/OnSaleInfo'
import { OrderTakeStrategy } from "../../../components/OrderTakeStrategy";
import { OtherInfo } from "../../../components/OtherInfo";
import { platformMap, platformView } from '../../../constants/platform'
import { fansColumnsKeys } from '../../../constants/index'

const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;
function uploadUrl(file) {
	return (file && file[0]) ? file[0].url : ''
}
function checkVal(value) {
	if (typeof value === "boolean") {
		return value ? "1" : "2"
	}
	return value
}
// 时间转moment对象
function data2moment(data) {
	return !!data && moment(data)
}
// 红点逻辑
const hasRedDot = (now_end) => {
	let nowDate = moment()
	let nowEnd = data2moment(now_end)
	return nowDate >= moment(nowEnd).endOf('d')
}
const FetchHead = (<span>信息自动抓取</span>)

export default class UpdateChild extends Component {
	state = {
		isLoading: false
	}
	saveFans = (values) => {
		const { data: { accountInfo } } = this.props.params;
		const {
			user_id,
			account_id,
			token = {}
		} = accountInfo
		values['account_id'] = account_id
		values['user_id'] = user_id
		values['follower_count_screenshot_url'] = uploadUrl(values['follower_count_screenshot_url'])
		return values
	}

	getSkuActions = () => {
		const { params, platform_id } = this.props
		const { actions: { getSkuList }, data: { accountInfo } } = params
		const {
			account_id,
			is_famous,
			user_id
		} = accountInfo
		this.setState({ isLoading: true })
		return getSkuList({ is_famous, account_id, user_id, platform_id }).then(() => {
			this.setState({ isLoading: false })
		}).catch(() => {
			this.setState({ isLoading: false })
		})
	}

	componentWillMount() {
		this.getSkuActions()
	}

	render() {
		const { params, addQuote } = this.props
		const { pid, data: { accountInfo, priceInfo }, actions: { updateAccountInfo } } = params;
		const {
			is_allow_order_status,
			price_valid_to
		} = priceInfo
		const {
			is_famous,
			is_reject_order_off_shelf,
			is_online, offline_reason, a_status, a_reason, b_status, b_reason
		} = accountInfo
		const orderStatus = [
			{ code: is_online, reason: offline_reason },
			{ code: a_status, reason: a_reason },
			{ code: b_status, reason: b_reason }
		]
		//FansCount 要展示的列；
		const columnsKeys = fansColumnsKeys[platformView[pid] || ''] || []

		return (Object.keys(priceInfo).length) ?
			<Tabs defaultActiveKey={addQuote ? '2' : '1'} animated={false} tabBarExtraContent={
				// 是否下架 是否可接单 是否预约账号
				<AccountState state={orderStatus} />
			}>
				<TabPane tab="帐号信息" key="1">
					<AccountInfos params={params}>
						<FetchInfoForm params={params} />
						<BaseInfoForm params={params} />
						<WrapPanelForm onSave={this.saveFans} navId='fansInfos' header='粉丝信息' action={updateAccountInfo}>
							<Fans {...params}
								isFansNumberImg={true}
								isDisableFollowersCount={pid != platformMap.WECHAT}
							>
								<FansCount {...params} columnsKeys={columnsKeys} />
							</Fans>
						</WrapPanelForm>
						<AccountFeatureForm params={params} />
						<CooperateInfoForm params={params} />
						<OnSaleInfoForm params={params} />
						<OrderTakeStrategyfoForm params={params} />
						<OtherInfoForm params={params} />
					</AccountInfos>
				</TabPane>
				<TabPane key="2" tab={
					<span>报价信息{((is_famous == 1) && hasRedDot(price_valid_to)) ?
						<Badge dot><b style={{ visibility: 'hidden' }}>_</b></Badge> : null}</span>}>
					{!this.state.isLoading ?
						<AccountPriceForm params={params} getSkuActions={this.getSkuActions} /> :
						<Skeleton active />}
				</TabPane>
				<TabPane tab="受众画像" key="3">
					<AudiencePortraitForm params={params} />
				</TabPane>
			</Tabs> : <Skeleton active />
	}
}

/**
 * 抓取信息表单
 */
@Form.create()
export class FetchInfoForm extends Component {
	render() {
		const { form, params } = this.props
		const { data: { accountInfo } } = params
		const {
			fetched_time
		} = accountInfo
		const rightC = <div className='wrap-panel-right-content'>
			<span className='gray-text'>最近成功抓取时间 : {fetched_time || '--'}</span>
		</div>
		return <WrapPanel navId='getAccountInfos' right={rightC} header={FetchHead}>
			<FetchInfo {...params} {...form} isUpdate={true} />
		</WrapPanel>
	}
}

/**
 * 基础信息表单
 */
@Form.create()
export class BaseInfoForm extends Component {
	state = {
		submitLoading: false
	}
	handleValues = (values) => {
		const { data: { accountInfo } } = this.props.params;
		const {
			user_id,
			account_id,
			platform_id,
			token = {}
		} = accountInfo
		const { upload_token } = token
		values['account_id'] = account_id
		values['platform_id'] = platform_id
		values['user_id'] = user_id
		values['upload_token'] = upload_token
		values['avatar_url'] = uploadUrl(values['avatar_url'])
		values['qr_code_url'] = uploadUrl(values['qr_code_url'])
		return values
	}
	submit = (e) => {
		e.preventDefault();
		const { actions: { updateAccountInfo } } = this.props.params;
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.setState({
					submitLoading: true
				})
				values = this.handleValues(values)
				updateAccountInfo(values).then((data) => {
					this.setState({
						submitLoading: false
					})
					message.success(data.msg || '保存成功')
				}).catch(({ errorMsg }) => {
					message.error('保存出错:' + errorMsg)
					this.setState({
						submitLoading: false
					})
				})
			}
		});
	}

	allSubmit = () => {
		return new Promise((resolve, reject) => {
			this.props.form.validateFieldsAndScroll((err, values) => {
				if (!err) {
					values = this.handleValues(values)
					resolve(values)
				} else {
					reject()
				}
			});
		})

	}

	componentWillMount() {
		window.updateForms['baseInfo'] = this.props.form
		window.allSubmit.store['baseInfo'] = this.allSubmit
	}

	render() {
		const { form, params } = this.props
		const { data: { priceTypeList = [], accountInfo } } = params;
		const { platform_name, platform_icon } = accountInfo
		const baseInfoLeft = <div className='wrap-panel-left-content'>
			<img style={{
				position: "relative",
				top: '-3px'
			}} src={platform_icon} alt={platform_name} />
			<span>{platform_name}</span>
		</div>
		const baseInfoRight = <div className='wrap-panel-left-content'>
			<Button loading={this.state.submitLoading} size='small' type='primary' onClick={this.submit}>{'保存'}</Button>
		</div>
		return <Form>
			<WrapPanel header='基础信息' navId='baseInfos' left={baseInfoLeft} right={baseInfoRight}>
				<BaseInfo {...params} {...form}>
					<QCCodeUpload  {...params} {...form} />
					<AccountID  {...params} {...form} />
					<Divider dashed />
					{/*<AccountType {...params} {...form} />*/}
					<AccountDesc {...params} {...form} />
					<AccountIsNameless {...params} {...form} />
					<Divider dashed />
					<ContentCategory {...params} {...form} tags={['美食', '游戏']} />
				</BaseInfo>
			</WrapPanel>
		</Form>
	}
}

/**
 * 账号报价表单
 */
@Form.create()
export class AccountPriceForm extends Component {
	handlePrice = (price_item_list, price_now = {}, price_next = {}) => {
		return price_item_list.map(item => {
			let obj = { ...item }
			let key = obj['sku_type_id']
			obj.cost_price_raw = price_now[key] || ''
			obj.next_cost_price_raw = price_next[key] || ''
			return obj
		})
	}
	submit = (e) => {
		e.preventDefault();
		const { data: { priceInfo, accountInfo } } = this.props.params
		const {
			price_item_list
		} = priceInfo
		const {
			account_id,
			is_famous,
			user_id,
			platform_id,
			token = {}
		} = accountInfo
		const { upload_token } = token
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				let { price_now, price_next } = values
				values['price_item_list'] = this.handlePrice(price_item_list, price_now, price_next)
				values['is_prevent_shielding'] = checkVal(values['is_prevent_shielding'])
				values['is_support_topic_and_link'] = checkVal(values['is_support_topic_and_link'])
				values['is_flowunit_off_shelf'] = checkVal(values['is_flowunit_off_shelf'])
				values['force_sale_status'] = checkVal(values['force_sale_status'])
				values['is_accept_hard_ad'] = checkVal(values['is_accept_hard_ad'])
				delete values['price_now']
				delete values['price_next']
				this.showConfirm({ ...values, account_id, is_famous, user_id, platform_id })
			}
		});
	}
	showConfirm = (values) => {
		const { actions: { saveSku }, data: { accountInfo } } = this.props.params
		const { getSkuActions } = this.props
		const { is_famous } = accountInfo
		confirm({
			title: '提交价格信息?',
			content: (is_famous == 1) ? '提交成功后，下个价格有效期和报价将无法修改' : '',
			onOk() {
				return saveSku(values).then((data) => {
					console.log(data, '=====');
					message.success(data.msg || '提交成功')
					getSkuActions()
				}).catch(({ errorMsg }) => {
					message.error("提交失败: " + errorMsg)
				})
			},
			onCancel() { }
		});
	}

	render() {
		const { form, params } = this.props
		const { data: { accountInfo, priceInfo } } = params
		const {
			is_famous
		} = accountInfo
		const {
			price_item_list,
			modified_at
		} = priceInfo
		const peiceKeys = price_item_list ? price_item_list.map(({ sku_type_id, sku_type_name }) => ({
			key: sku_type_id, name: sku_type_name
		})) : []

		const isFamous = is_famous === 1;
		const rightC = <div className='wrap-panel-right-content'>
			<span className='gray-text'>信息更新时间 : {modified_at || '--'}</span>
			<Button size='small' type='primary' onClick={this.submit}>{'保存'}</Button>
		</div>
		return <Form>
			<WrapPanel header='账号报价' right={rightC}>
				{isFamous ?
					<FamousPrice {...params} {...form} priceKeys={peiceKeys}>
						<OrderStrategy {...params} {...form} />
					</FamousPrice>
					:
					<NamelessPrice isUpdate={true} {...params} {...form} priceKeys={peiceKeys}>
						<OrderStrategy {...params} {...form} />
					</NamelessPrice>
				}
			</WrapPanel>
		</Form>
	}
}

/**
 * 账号特征
 */
export class AccountFeatureForm extends Component {
	webpackExtraFormData = (values) => {
		let has_car = values.has_car;
		let has_house = values.has_house;
		let has_baby = values.has_baby;
		let area_array = values.area_id ? ((values.area_id).length > 0 ? [...values.area_id] : 0) : 0;
		let area_id = area_array ? area_array.pop() : 0
		values.has_car = has_car ? 1 : 2;
		values.has_house = has_house ? 1 : 2;
		values.has_baby = has_baby ? 1 : 2;
		values.area_id = area_id;
		values.birth_date = values.birth_date && values.birth_date.format('YYYY-MM-DD')
		return values;
	}

	constructor(props) {
		super(props)
		this.onSave = this.onSave.bind(this)
	}

	onSave(values) {
		return this.webpackExtraFormData(values)
	}

	render() {
		const { form, params } = this.props
		const { actions: { updateAccountInfo } } = params
		return <WrapPanelForm header='账号特征' navId='featureInfos' onSave={this.onSave} action={updateAccountInfo}>
			<AccountFeature {...params} {...form} />
		</WrapPanelForm>
	}
}

/**
 * 合作信息
 */
export class CooperateInfoForm extends Component {
	webpackExtraFormData = (values) => {
		console.log(values, 'webpackExtraFormData-values')
		let tempTargetArr = [];
		let tempObject = {};
		let index = 0;
		let flag = 1;
		for (let [key, value] of Object.entries(values)) {
			if (key.includes('cooperation_cases_')) {
				let tempKey;
				if (key.includes('_account_id')) {
					tempKey = key.substr(key.indexOf('_account') + 1)
				} else {
					tempKey = key.substr(key.lastIndexOf('_') + 1);
				}
				Object.defineProperty(tempObject, tempKey.substr(0, tempKey.length - 1), {
					value: value,
					enumerable: true
				})
				delete values[key]
				if (flag == 5) {
					let objContainer = JSON.parse(JSON.stringify(tempObject))
					tempTargetArr.push(objContainer)
					tempObject = {}
					index++;
					flag = 1;
				} else {
					flag++;
				}
			}
		}
		return tempTargetArr
	}
	onSave = (values) => {
		values.cooperation_case = this.webpackExtraFormData(values)
		return values;
	}

	constructor(props) {
		super(props)
		this.onSave = this.onSave.bind(this)
	}

	render() {
		const { form, params } = this.props
		const { actions: { updateAccountInfo } } = params
		return <WrapPanelForm header='合作信息' navId='cooperationInfos' onSave={this.onSave} action={updateAccountInfo}>
			<CooperateInfo {...params} {...form} />
		</WrapPanelForm>
	}
}

/**
 * 上下架信息
 */
export class OnSaleInfoForm extends Component {
	webpackExtraFormData = (values) => {
		return values;
	}

	constructor(props) {
		super(props)
		this.onSave = this.onSave.bind(this)
	}

	onSave(values) {
		return this.webpackExtraFormData(values)
	}

	render() {
		const { form, params } = this.props;
		const { actions: { updateAccountInfo } } = params
		return <WrapPanelForm header="上下架信息" navId='shelfInfos' onSave={this.onSave} action={updateAccountInfo}>
			<OnSaleInfo {...params} {...form} />
		</WrapPanelForm>
	}
}

/**
 * 接单策略
 */
export class OrderTakeStrategyfoForm extends Component {
	webpackExtraFormData = (values) => {
		let tempTargetObj = {};
		for (let [key, value] of Object.entries(values)) {
			if (key.includes('strategy_')) {
				let tempKey = key.substr(key.indexOf('_') + 1);
				Object.defineProperty(tempTargetObj, tempKey, {
					value: value,
					writable: true,
					enumerable: true
				})
				delete values[key]
			}
		}
		let startTime = tempTargetObj.start_time_of_time;
		let endTime = tempTargetObj.end_time_of_time;
		let otherTime = tempTargetObj.otherTime;
		let startDate;
		let endDate;
		otherTime && otherTime.length > 0 && otherTime.map((item, index, array) => {
			if (index == 0) {
				startDate = item.format('YYYY-MM-DD')
				tempTargetObj.start_time_of_time = item.format('HH:mm:ss')
			} else {
				endDate = item.format('YYYY-MM-DD');
				tempTargetObj.end_time_of_time = item.format('HH:mm:ss');
			}
		})

		if (startTime) {
			tempTargetObj.start_time_of_time = startTime.format('HH:mm:ss');
		}
		if (endTime) {
			tempTargetObj.end_time_of_time = endTime.format('HH:mm:ss');
		}
		if (startDate) {
			tempTargetObj.start_time_of_date = startDate;

		}
		if (endDate) {
			tempTargetObj.end_time_of_date = endDate;
		}

		// delete tempTargetObj.otherTime;
		console.log(tempTargetObj, 'tempTargetObjtempTargetObjtempTargetObj')
		return tempTargetObj
	}

	constructor(props) {
		super(props)
		this.onSave = this.onSave.bind(this)
	}

	onSave(values) {
		values.strategy = this.webpackExtraFormData(values)
		values.is_accept_hard_ad = values.is_accept_hard_ad ? 1 : 2;
		if (!values.fake_key_max) {
			values.max_order_count = 0;
			values.max_order_count_note = '';
		}
		if (!values.fake_key) {
			values.strategy = {};
		}
		return values
	}

	render() {
		const { form, params } = this.props
		const { actions: { updateAccountInfo } } = params
		return <WrapPanelForm header='接单策略' navId='strategyInfos' onSave={this.onSave} action={updateAccountInfo}>
			<OrderTakeStrategy {...params} {...form} />
		</WrapPanelForm>
	}
}

/**
 * 其他信息
 */
export class OtherInfoForm extends Component {
	constructor(props) {
		super(props)
		this.onSave = this.onSave.bind(this)
	}

	onSave(values) {
		return values
	}

	render() {
		const { form, params } = this.props
		const { actions: { updateAccountInfo } } = params
		return <WrapPanelForm header='其他信息' navId='otherInfos' onSave={this.onSave} action={updateAccountInfo}>
			<OtherInfo {...params} {...form} />
		</WrapPanelForm>
	}
}
