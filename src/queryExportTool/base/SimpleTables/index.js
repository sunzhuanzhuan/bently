import React, { Component } from "react"
import { Table } from 'antd'
import './index.less'
import numeral from "numeral";
import ValueStyle from "@/queryExportTool/base/ValueFormat/ValueStyle";
import MarkMessage from "../MarkMessage";
import messageInfo from "../../constants/messageInfo"
import { getUnitPrice, getQuoteNumber, getWeixinAvg, getOtherAllAvg } from "./unit";
const Shielding = ({ isShielding }) => {
	return <MarkMessage {...messageInfo['isShielding']} text={<span className='shielding-box'>
		防
</span>} />

}
export default class SimpleTables extends Component {
	componentWillMount() { }

	render() {
		const { data = [], columsNum = ['fabu'], Is_wei, dataTime, tableFooterText, isLeft, isShielding } = this.props
		const config = {
			pagination: false,
			size: "middle",
			//footer: () => <span>价格有效期：{dataTime}</span> 
		}
		//微信平台-公共列项
		const WeChat = [{
			title: <span>报价/阅读单价</span>,
			dataIndex: 'sku_type_name',
			key: "sku_type_name",
			align: 'center',
		}, {
			title: <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发布<MarkMessage {...messageInfo['fabu']} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>,
			dataIndex: 'price_1',
			key: 'price_1',
			align: 'center',
			render: (text, record) => {
				return <span><ValueStyle value={Is_wei ? numeral(record.price_1).format('0,0') : getQuoteNumber(record.price_1)} type="1" product_on_shelf_status={record.product_on_shelf_status} unit="元" />/<ValueStyle value={getUnitPrice(record.avg_price_1)} format='oneUnivalent' /></span>
			}
		}]
		const cloumsMap = {
			//微信平台-微闪投数据项
			"fabu-wei": [...WeChat],
			//微信平台-预约数据项
			"fabu-yuyue": [...WeChat, {
				title: <span>原创+发布<MarkMessage {...messageInfo['yuanchuangFabu']} /></span>,
				dataIndex: 'price_2',
				key: 'price_2',
				align: 'center',
				render: (text, record) => {
					return <span><ValueStyle value={Is_wei ? numeral(record.price_2).format('0,0') : getQuoteNumber(record.price_2)} type="1" product_on_shelf_status={record.product_on_shelf_status} unit="元" />/<ValueStyle value={getUnitPrice(record.avg_price_2)} format='oneUnivalent' /></span>
				}
			}],
			//微信平台-阅读点赞量列
			"yuedu": [{
				title: <span>数据<MarkMessage {...messageInfo['yuduTable']} /></span>,
				dataIndex: 'name',
				key: 'name',
				align: 'center',
				width: "33.3%",
			}, {
				title: '阅读量',
				dataIndex: 'value_1',
				key: 'value_1',
				align: 'center',
				width: "33.3%",
				render: (text, record) => {
					return <ValueStyle value={getWeixinAvg(record.value_1)} fontSize="13px" />
				}
			}, {
				title: '点赞量',
				dataIndex: 'value_2',
				key: "value_2",
				align: 'center',
				width: "33.3%",
				render: (text, record) => {
					return <ValueStyle value={getWeixinAvg(record.value_2)} fontSize="13px" />
				}
			}],
			//包含报价和价格，价格无平均数据列（新浪，视频）
			'baojia': [{
				title: '报价',
				dataIndex: 'sku_type_name',
				key: 'sku_type_name',
				align: 'center',
				width: "50%",
			}, {
				title: <span>价格	{isShielding ? <Shielding /> : null}</span>,
				dataIndex: 'price_1',
				key: 'price_1',
				align: 'center',
				width: "50%",
				render: (text, record) => {
					return <span>
						<ValueStyle value={Is_wei ? numeral(record.price_1).format('0,0') :
							getQuoteNumber(record.price_1)} type="1" product_on_shelf_status={record.product_on_shelf_status}
							unit="元" />

					</span>
				}
			}],
			//包含报价和价格，价格有平均数据列（视频）
			'baojiatwo': [{
				title: <span>报价/播放单价<MarkMessage {...messageInfo['zhuanfa']} /></span>,
				dataIndex: 'sku_type_name',
				key: "sku_type_name",
				align: 'center',
				width: "60%",
			}, {
				title: <span>价格{isShielding ? <Shielding /> : null}</span>,
				dataIndex: 'price_1',
				key: 'price_1',
				align: 'center',
				width: "40%",
				render: (text, record) => {
					return <span><ValueStyle value={Is_wei ? numeral(record.price_1).format('0,0') : getQuoteNumber(record.price_1)} type="1" product_on_shelf_status={record.product_on_shelf_status} unit="元" />/<ValueStyle value={getUnitPrice(record.avg_price_1)} format='univalent' /></span>
				}
			}],
			//新浪直发
			'zhifa': [{
				title: <span>数据<MarkMessage {...messageInfo['xinlang']} /></span>,
				dataIndex: 'name',
				key: "name",
				align: 'center',
				width: "33.3%",
			}, {
				title: '直发',
				dataIndex: 'value_1',
				key: "value_1",
				align: 'center',
				width: "33.3%",
				render: (text, record) => {
					return <span><ValueStyle value={getOtherAllAvg(record.value_1)} fontSize="13px" /></span>
				}
			}, {
				title: '转发',
				dataIndex: 'value_2',
				key: "value_2",
				align: 'center',
				width: "33.3%",
				render: (text, record) => {
					return <span><ValueStyle value={getOtherAllAvg(record.value_2)} fontSize="13px" /></span>
				}
			}],
			//视频转发
			'video': [{
				title: <span>数据项<MarkMessage {...messageInfo['video']} /></span>,
				dataIndex: 'name',
				key: "name",
				align: 'center',
				width: "60%",
			}, {
				title: '数据',
				dataIndex: 'value_1',
				key: "value_1",
				align: 'center',
				width: "40%",
				render: (text, record) => {
					return <span><ValueStyle value={getOtherAllAvg(record.value_1)} fontSize="13px" /></span>
				}
			}],
			//小红书视频文章列
			"red": [{
				title: "数据项",
				dataIndex: 'name',
				key: "name",
				align: 'center',
				width: "33.3%",
			}, {
				title: <span>视频<MarkMessage {...messageInfo['redVideo']} /></span>,
				dataIndex: 'value_1',
				key: "value_1",
				align: 'center',
				width: "33.3%",
				render: (text, record) => {
					return <span><ValueStyle value={getOtherAllAvg(record.value_1)} fontSize="13px" /></span>
				}
			}, {
				title: <span>文章<MarkMessage {...messageInfo['redBook']} /></span>,
				dataIndex: 'value_2',
				key: "value_2",
				align: 'center',
				width: "33.3%",
				render: (text, record) => {
					return <span><ValueStyle value={getOtherAllAvg(record.value_2)} fontSize="13px" /></span>
				}
			}],
			"otherAvg": [{
				title: <span>平均数据</span>,
				dataIndex: 'otherAvg',
				key: "otherAvg",
				align: 'center',
				render: (text, record) => {
					//return <span><ValueStyle value={getOtherAllAvg(record.value_1)} fontSize="13px" /></span>
				}
			},]
		}
		const columns = cloumsMap[columsNum];
		const dataTimeNew = dataTime && dataTime || ""
		return <div className={isLeft ? "simple-tables-container-left" : "simple-tables-container-right"}>
			{columsNum ?
				<div>
					<Table {...config} columns={columns} dataSource={data} rowKey={(record, index) => index} />
					<div className="time-table-footer">{tableFooterText ? `${tableFooterText}：${dataTimeNew}` : null}</div>
				</div> :
				<div className='no-columns-text'>暂无数据</div>}

		</div>
	}
}
