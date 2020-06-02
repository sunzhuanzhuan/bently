import React, { Component } from 'react'
import TitleLabel from "@/goodsReceipt/base/TitleLable";
import './RequisitionDetail.less'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as action from "../actions";
import { Button, Upload, Radio, Table, Icon, Divider, Popover, Spin } from 'antd'
import { parseUrlQuery } from '@/util/parseUrl'
import ErrorForPage from "@/base/ErrorForPage";
import { grOrderStatusMap as GRStatusMap } from '../constants/SelectMap'
import moment from 'moment'
import numeral from "numeral";
import MarkMessage from "@/goodsReceipt/components/common/MarkMessage";
import Operating from '../components/operating'
import { detectionUrl } from "../constants/urlPathMap";
import NumeralFormat from "../components/common/NumeralFormat";
import BreadCrumbs from "../base/BreadCrumbs";
const actions = {
	"modify": {
		title: "修改",
		component: Operating
	},
	"cancel": {
		title: "作废",
		component: Operating
	},
	"copy": {
		title: "复制",
		component: Operating
	},
	"internal_audit": {
		title: "内审通过",
		component: Operating
	},
	"internal_refuse": {
		title: "内审拒绝",
		component: Operating
	},
	"internal_export": {
		title: "导出为Excel",
		component: Operating
	}
}

class RequisitionDetail extends Component {
	changeCurrent = (current) => {
		this.setState({
			current,
			isLoading: true
		})
	}
	getBaseInfo = (params) => {
		const { goodsReceiptIsAEPermission, actions } = this.props
		const { getBaseDetail } = actions
		// 获取基础信息
		getBaseDetail({ gr_id: params.gr_id.toString().replace("#bbb", ""), with_purchase_statistic: 1, is_for_audit: goodsReceiptIsAEPermission ? 2 : 1 }).then(({ data }) => {
			this.setState({
				result: data.result,
				isLoading: false
			})
		})
	}
	getGRItemListInfo = (params = {}) => {
		const { getGRItemListStatistic, getGRItemList } = this.props.actions
		// 获取统计信息
		getGRItemListStatistic({ only_fro_count: 2, ...params }).then(({ data }) => {
			this.setState({
				statistic: data,
			})
		});
		// 获取已选订单列表
		[1, 2, 3].map(item_type => getGRItemList({ item_type, ...params }))
	}

	constructor(props) {
		super(props);
		this.state = { current: "1", result: {}, statistic: {} };
	}

	componentWillMount() {
		let params = parseUrlQuery()
		if (!params.id) {
			return this.setState({ error: true, errorMessage: '没有传递页面所需的参数!' })
		}

		// 获取统计信息, 获取已选订单列表
		this.getGRItemListInfo({ gr_id: params.id.replace("#bbb", "") })
		// 获取基础信息
		this.getBaseInfo({ gr_id: params.id })
	}

	render() {
		const { error, errorMessage, result: data, statistic, isLoading } = this.state
		let {
			old_b_host, po_id, project_id, status, creator_name, need_supplement_attachments,
			attachments, is_close_balance, available_operations = [], gr_id, currency_type, is_tax_inclusive,
			total_amount = 0, total_amount_usd = 0, service_fee_rate
		} = data
		const { goodsReceipt, actions: { exportOrderExcel }, GRListUrl, GReditUrl } = this.props
		const { GRItemList } = goodsReceipt
		const { purchase = {}, purchase_with_service_fee = {}, count = {} } = statistic
		let { supplement_attachments = [], common_attachments = [] } = attachments || {}
		const po_link = `${old_b_host}/sale/executionevidence/detail?id=${po_id}`
		const project_link = `${old_b_host}/sale/project/detail?id=${project_id}`
		// 预约订单列表link
		const reservationLink = {
			order: `${old_b_host}/pack/order/info/order_id/`,
			name: `${old_b_host}/pack/reservationrequirement/infoforsale?reservation_requirement_id=`
		}
		// 微闪投订单列表link
		const campaignLink = {
			order: `${old_b_host}/sale/detection/dispatchorderlistforsale/begin_time/1970-11-15/end_time/${moment().format("YYYY-MM-DD")}/order_id/$ID$/content_type//original_post_type//submit/true/`,
			name: `${old_b_host}/sale/company/orderlist/campaign_id/`
		}
		// 公司拓展业务列表link
		const extendedLink = {
			order: `${old_b_host}/pack/companyextendedbusiness/detail?business_id=`
		}
		//备注截取
		function getReamrk(value, isYellow) {
			return value ? value.length > 30 ? <Popover content={<div style={{ width: 200, wordBreak: "break-all" }}>{value}</div>} title="备注信息">
				<div className="is-yellow-box" >{value.slice(0, 15)}<br />{value.slice(15, 30)}...</div>
			</Popover>
				: <div className="is-yellow-box" >{value.slice(0, 15)}<br />{value.slice(15, 30)}</div> : null
		}
		let columns = [
			{
				category: 'baseInfo',
				name: '执行凭证基本信息',
				items: [{
					key: 'po_code',
					title: '执行凭证号(PO号)',
					render: (text, data) => <a target="_blank" href={po_link}>{text}</a>
				}, {
					key: 'project_name',
					title: '所属项目/品牌',
					render: (text, data) => {
						return <div>
							<a target="_blank" href={project_link}>{text}</a> / <span>{data['brand_name']}</span>
						</div>
					}
				}, {
					key: 'total_budget',
					title: '执行凭证总额',
					render: (text, data) => {
						return <div>{text} CNY</div>
					}
				}, {
					key: 'service_fee_rate',
					title: '服务费率',
					render: (text, data) => {
						return <div>{text} %</div>
					}
				}, {
					key: 'po_remaining_budget',
					title: '执行凭证可用余额',
					render: (text, data) => {
						return <div><NumeralFormat value={text} /> CNY</div>
					}
				}, {
					key: 'is_close_balance',
					title: '执行凭证余额是否关闭',
					render: (status) => {
						return <div>{status == 1 ? '是' : '否'}</div>
					}
				}]
			}, {
				category: 'GRAmountDetails',
				name: 'GR金额明细',
				items: [{
					key: 'reservation_items_total_money',
					title: '预约订单 GR金额（采购价+服务费）',
					render: (text, { purchase_with_service_fee: data = {} }) => <div>
						<span>{data['reservation_items_total_money'] || '00.00'} CNY</span>
						<Button type='primary' onClick={() => this.changeCurrent("1")} style={{ marginLeft: '20px' }} href="#bbb" size='small'>查看明细</Button>
					</div>
				}, {
					key: 'campaign_items_total_money',
					title: '微闪投订单 GR金额（采购价+服务费）',
					render: (text, { purchase_with_service_fee: data = {} }) => {
						return <div>
							<span>{data['campaign_items_total_money'] || '00.00'} CNY</span>
							<Button type='primary' onClick={() => this.changeCurrent("2")} style={{ marginLeft: '20px' }} href="#bbb" size='small'>查看明细</Button>
						</div>
					}
				}, {
					key: 'extended_business_items_total_money',
					title: '公司拓展业务 GR金额（采购价+服务费）',
					render: (text, { purchase_with_service_fee: data = {} }) => {
						return <div>
							<span>{data['extended_business_items_total_money'] || '00.00'} CNY</span>
							<Button type='primary' onClick={() => this.changeCurrent("3")} style={{ marginLeft: '20px' }} href="#bbb" size='small'>查看明细</Button>
						</div>
					}
				}, {
					key: 'currency_type',
					title: 'GR 总金额币种',
					render: (code) => {
						return <div>{code == 1 ? '人民币' : '美元'}</div>
					}
				}, {
					key: 'exchange_rate',
					title: '汇率',
					render: (rate) => {
						return <div>{rate} </div>
					}
				}, {
					key: 'is_tax_inclusive',
					title: 'GR 总金额是否含税',
					render: (code) => {
						return <div>{code == 1 ? '含税' : '不含'}</div>
					}
				}, {
					key: 'tax_rate',
					title: '税率',
					render: (rate) => {
						return <div>{rate} %</div>
					}
				}, {
					key: 'total_amount',
					title: 'GR 总金额',
					render: (total, { currency_type }) => {
						return <div> {currency_type == 1 ? `${total_amount} CNY` : `${total_amount_usd} USD`}</div>
					}
					//人民币不显示汇率，不含税不显示税率
				}].filter(one => !(one.key == "exchange_rate" && currency_type == 1))
					.filter(one => !(one.key == "tax_rate" && is_tax_inclusive == 2))
			}
		]
		const tables = [
			{
				key: "1",
				title: "预约订单",
				total: "reservation_items_total",
				data: "reservation_items",
				columns: [
					{
						title: '订单ID',
						dataIndex: 'item_id',
						align: 'center',
						render: (id) =>
							<a target="_blank"
								href={reservationLink.order + id}>{id}</a>
					}, {
						title: "需求名称",
						dataIndex: 'requirement_name',
						align: 'center',
						render: (name, { requirement_id: id }) =>
							<a target="_blank" href={reservationLink.name + id}>
								{name}
							</a>
					}, {
						title: "账号名称",
						dataIndex: 'weibo_name',
						align: 'center'
					}, {
						title: "平台",
						dataIndex: 'platform_name',
						align: 'center'
					}, {
						title: '所属项目',
						dataIndex: 'project_name',
						align: 'center'
					}, {
						title: '订单金额',
						dataIndex: 'money',
						align: 'center',
						width: "160",
						render: (text, record) => {
							const { accept_reservation_chosen_price, inspection_remaining_amount, inspection_deducted_amount } = record
							return <span style={{ textAlign: 'left' }}>
								<div>成本价：<div style={{ float: "right" }}><NumeralFormat value={accept_reservation_chosen_price && accept_reservation_chosen_price.open_cost_price} /></div></div>
								<div>执行价：<div style={{ float: "right" }}><NumeralFormat value={accept_reservation_chosen_price && accept_reservation_chosen_price.deal_price} /></div></div>
								<div>质检退款：<div style={{ float: "right" }}><NumeralFormat value={inspection_deducted_amount && inspection_deducted_amount.deal_price} /></div></div>
								<div>结算金额：<div style={{ float: "right" }}><NumeralFormat value={inspection_remaining_amount && inspection_remaining_amount.deal_price} /></div></div>
							</span>
						}
					}, {
						title: "采购价",
						dataIndex: 'purchase_price',
						align: 'center',
						render: (text, record) => {
							const { accept_reservation_chosen_price } = record
							const isYellow = accept_reservation_chosen_price && accept_reservation_chosen_price.open_cost_price != text
							return <span className={isYellow ? "is-yellow-box" : ""}> <NumeralFormat value={text} /></span>
						}
					}, {
						title: "采购价+服务费",
						dataIndex: 'purchase_price_with_service_fee',
						align: 'center',
						render: (text, record) => {
							const isYellow = record.purchase_price_with_service_fee != Math.round((service_fee_rate / 100 + 1) * record.purchase_price)

							return <span className={isYellow ? "is-yellow-box" : ""}>
								<NumeralFormat value={text} />
							</span>
						}
					}, {
						title: "采购价+服务费+税",
						dataIndex: 'purchase_price_with_service_fee_and_tax',
						align: 'center',
						render: (text, record) => <NumeralFormat value={text} />
					}, {
						title: "备注信息",
						dataIndex: 'comment',
						align: 'center',
						render: (comment, record) => getReamrk(comment)
					}
				]
			}, {
				key: "2",
				title: "微闪投订单",
				total: "campaign_items_total",
				data: "campaign_items",
				columns: [
					{
						title: '订单ID',
						dataIndex: 'item_id',
						align: 'center',
						render: (id, record) =>
							<a target="_blank"
								href={detectionUrl(old_b_host, record.order_id, record.formatted_start_time, record.formatted_end_time)}
							>
								{id}
							</a>
					}, {
						title: "活动名称",
						dataIndex: 'campaign_name',
						align: 'center',
						render: (name, { campaign_id }) =>
							<a target="_blank" href={campaignLink.name + campaign_id}>
								{name}
							</a>
					}, {
						title: "账号名称",
						dataIndex: 'weibo_name',
						align: 'center'
					}, {
						title: "平台",
						dataIndex: 'platform_name',
						align: 'center'
					}, {
						title: '所属项目',
						dataIndex: 'project_name',
						align: 'center'
					}, {
						title: '订单金额',
						dataIndex: 'money',
						align: 'center',
						width: "140",
						render: (text, record) => <span style={{ textAlign: 'left' }}>
							<div>成本价：<div style={{ float: "right" }}><NumeralFormat value={record.price} /></div></div>
						</span>
					}, {
						title: "采购价",
						dataIndex: 'purchase_price',
						align: 'center',
						render: (text, record) => <span className={record.price != text ? "is-yellow-box" : ""}><NumeralFormat value={text} /></span>
					}, {
						title: "采购价+服务费",
						dataIndex: 'purchase_price_with_service_fee',
						align: 'center',
						render: (text, record) => {
							const isYellow = record.purchase_price_with_service_fee != Math.round((service_fee_rate / 100 + 1) * record.purchase_price)

							return <span className={isYellow ? "is-yellow-box" : ""}>
								<NumeralFormat value={text} />
							</span>
						}
					}, {
						title: "采购价+服务费+税",
						dataIndex: 'purchase_price_with_service_fee_and_tax',
						align: 'center',
						render: (text, record) => <NumeralFormat value={text} />
					}, {
						title: "备注信息",
						dataIndex: 'comment',
						align: 'center',
						render: (comment, record) => getReamrk(comment)
					}
				]
			}, {
				key: "3",
				title: "公司拓展业务",
				total: "extended_business_items_total",
				data: "extended_business_items",
				columns: [
					{
						title: '活动ID',
						dataIndex: 'business_id',
						align: 'center',
						render: (id) => <a target="_blank" href={extendedLink.order + id}>
							{id}
						</a>
					}, {
						title: '活动名称',
						dataIndex: 'business_name',
						align: 'center',
						render: (name, { business_id: id }) =>
							<a target="_blank" href={extendedLink.order + id}>
								{name}
							</a>
					}, {
						title: '活动类型',
						dataIndex: 'business_type_display',
						align: 'center'
					}, {
						title: '所属项目',
						dataIndex: 'project_name',
						align: 'center'
					}, {
						title: '活动金额',
						dataIndex: 'money',
						align: 'center',
						width: "160",
						render: (text, record) => <span style={{ textAlign: 'left' }}>
							<div>成本价：<div style={{ float: "right" }}><NumeralFormat value={record.business_real_cost} /></div></div>
							<div>活动费用：<div style={{ float: "right" }}><NumeralFormat value={record.business_cost} /></div></div>
						</span>
					}, {
						title: "采购价",
						dataIndex: 'purchase_price',
						align: 'center',
						render: (text, record) => <span className={record.business_real_cost != text ? "is-yellow-box" : ""}><NumeralFormat value={text} /></span>
					}, {
						title: "采购价+服务费",
						dataIndex: 'purchase_price_with_service_fee',
						align: 'center',
						render: (text, record) => {
							const isYellow = record.purchase_price_with_service_fee != Math.round((service_fee_rate / 100 + 1) * record.purchase_price)

							return <span className={isYellow ? "is-yellow-box" : ""}>
								<NumeralFormat value={text} />
							</span>
						}
					}, {
						title: "采购价+服务费+税",
						dataIndex: 'purchase_price_with_service_fee_and_tax',
						align: 'center',
						render: (text, record) => <NumeralFormat value={text} />
					}, {
						title: "备注信息",
						dataIndex: 'comment',
						align: 'center',
						render: (comment, record) => getReamrk(comment)
					}
				]
			}
		]


		return (!error ? <div className='requisition-detail-container'>
			<div className='fixed-top-wrapper'>

				<BreadCrumbs
					linkUrl={GRListUrl}
					text="申请单详情"
					isIcon={true}
					lineAfter={<span className='fixed-top-info'>【GR申请单号：{gr_id}，状态：{GRStatusMap[status]}，创建人：{creator_name || '-'} 】</span>} />
				{available_operations.length ? <div className='fixed-top-actions'>
					{available_operations.map(action => {
						let { title, component: Action } = actions[action] || {}
						return <Action key={action} operateType={action}
							text={<Button type='primary' size='small'>{title}</Button>}
							gr_id={gr_id}
							getGRListOperateAfter={() => this.getBaseInfo({ gr_id: gr_id })}
							GReditUrl={GReditUrl}
						/>
					})}
				</div> : null}
			</div>
			{columns.map(({ name, category, items }) => <section key={category}>
				<TitleLabel title={name}>
					{items.map(({ key, title, render }) =>
						<dl key={key} className='detail-info-item'>
							<dt className='item-dt'>{title}</dt>
							<dd className='item-dd'>{(render ? render(data[key], data) : data[key]) || '-'}</dd>
						</dl>)}
				</TitleLabel>
			</section>)}
			{need_supplement_attachments == 1 ? <TitleLabel title={
				<span>补充结案附件<MarkMessage content='请上传需要补齐的结案数据，具体哪些订单/活动 需要补齐可以一键下载' /></span>}>
				<div style={{ marginTop: 20 }}>
					<div className="circle-number">1</div>
					<span style={{ color: "#f00" }}>一键下载需补齐结案数据的订单/活动ID</span>
					<div style={{ marginTop: 10, marginLeft: 40 }}>
						<Button onClick={() => { exportOrderExcel({ gr_id: gr_id }) }}><Icon type="download" />下载文件</Button>
					</div>
				</div>
				<div style={{ width: 300 }}>
					<Divider />
				</div>
				<div>
					<div className="circle-number">2</div>
					<span>结案附件</span>
					<div style={{ marginTop: 10, marginLeft: 40 }}>
						<Upload defaultFileList={supplement_attachments.map(({ id, name, absolute_file_path }) => ({
							uid: id,
							name: name,
							url: absolute_file_path
						}))} showUploadList={{ showRemoveIcon: false }} />
					</div>
				</div>
			</TitleLabel> : null}
			<section>
				<TitleLabel title='其他信息'>
					{common_attachments.length ? <dl className='detail-info-item'>
						<dt className='item-dt'>附件信息</dt>
						<dd className='item-dd'>
							<Upload defaultFileList={common_attachments.map(({ id, name, absolute_file_path }) => ({
								uid: id,
								name: name,
								url: absolute_file_path
							}))} showUploadList={{ showRemoveIcon: false }} />
						</dd>
					</dl> : null}
				</TitleLabel>
			</section>

			<TitleLabel title='执行凭证关联的订单/活动'>
				<div className='order-statistical-data-table'>
					<div>当前已选择的订单/活动统计</div>
					<table>
						<tbody>
							<tr>
								<th><b>采购价</b></th>
								<th>总计：</th>
								<td>￥{numeral(purchase['total_money']).format('0.00')}</td>
								<th>预约订单：</th>
								<td>{count['reservation_items_total']}个 /
								￥{numeral(purchase['reservation_items_total_money']).format('0.00')}</td>
								<th>微闪投订单：</th>
								<td>{count['campaign_items_total']}个 /
								￥{numeral(purchase['campaign_items_total_money']).format('0.00')}</td>
								<th>公司拓展业务：</th>
								<td>{count['extended_business_items_total']}个 /
								￥{numeral(purchase['extended_business_items_total_money']).format('0.00')}</td>
							</tr>
							<tr>
								<th><b>采购价 + 服务费</b></th>
								<th>总计：</th>
								<td>￥{numeral(purchase_with_service_fee['total_money']).format('0.00')}</td>
								<th>预约订单：</th>
								<td>{count['reservation_items_total']}个 /
								￥{numeral(purchase_with_service_fee['reservation_items_total_money']).format('0.00')}</td>
								<th>微闪投订单：</th>
								<td>{count['campaign_items_total']}个 /
								￥{numeral(purchase_with_service_fee['campaign_items_total_money']).format('0.00')}</td>
								<th>公司拓展业务：</th>
								<td>{count['extended_business_items_total']}个 /
								￥{numeral(purchase_with_service_fee['extended_business_items_total_money']).format('0.00')}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</TitleLabel>
			<main className='data-table' id='bbb'>
				<Radio.Group style={{ marginBottom: '20px' }} value={this.state.current} onChange={e => this.setState({ current: e.target.value })}>
					{tables.map(({ key, title, total }) =>
						<Radio.Button key={key} value={key}>{title}（{count[total]}）</Radio.Button>)}
				</Radio.Group>
				{tables.map(({ key, columns, data }) => key === this.state.current ?
					<Table pagination={false} rowKey='item_id' bordered key={key} columns={columns} dataSource={GRItemList[data] || []} /> : null)}
			</main>
		</div> : <ErrorForPage errorMessage={errorMessage} />);
	}
}

const mapStateToProps = (state) => {
	return {
		goodsReceipt: state.goodsReceipt
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(action, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(RequisitionDetail);
