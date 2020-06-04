import React, { Component, useEffect } from "react"
import { Table, Tag } from 'antd'
import './index.less'
import numeral from "numeral";
import ValueStyle from "@/queryExportTool/base/ValueFormat/ValueStyle";
import MarkMessage from "../MarkMessage";
import messageInfo from "../../constants/messageInfo"
import moment from 'moment'
import ExampleTable from './ExampleTable'
import FoldBox from '../FoldBox'
import Equity from './Equity'


import { getUnitPrice, getQuoteNumber, getWeixinAvg, getOtherAllAvg, getPriceGoodBad } from "./unit";
const Shielding = ({ isShielding }) => {
	return <MarkMessage {...messageInfo['isShielding']} text={<span className='shielding-box'>
		防
</span>} />
}


export default class SimpleTables extends Component {

	render() {
		const { data = [], columsNum = ['fabu'], ISWEiXin, dataTime, tableFooterText, isLeft,
			isShielding, platformId, accountId, isFamous } = this.props
		const config = {
			pagination: false,
			size: "middle",
			//footer: () => <span>价格有效期：{dataTime}</span> 
		}
		const videoKey = platformId == 115 ? 'videoStart' : 'video'
		//微信平台-公共列项
		function getPriceColumn(title, messageInfoKey, isShowUnitPrice = true) {
			return [
				{
					title: title,
					dataIndex: 'skuTypeName',
					key: "skuTypeName",
					align: 'left',
					render: (text, record) => {
						return <span>	{text}
							{record.isSpecial == 1 ? <img src={require('./isSpecial.png')} width='16px' style={{ marginLeft: 5 }} /> : null}
						</span>
					}
				}, {
					title: <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价格
						{messageInfoKey ?
							<MarkMessage {...messageInfo[messageInfoKey]} />
							: null}
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>,
					dataIndex: 'price1',
					key: 'price1',
					align: 'right',
					render: (text, record) => {

						return <div className='flex-around'>
							{getPriceGoodBad(record.defaultQuotePriceDiscount1, record.productOnShelfStatus == 1)}
							<div>
								<ValueStyle
									value={numeral(record.price1).format('0,0')}
									type="1"
									productOnShelfStatus={record.productOnShelfStatus}
									unit="元" />
								{isShowUnitPrice ? <span>
									/ <ValueStyle
										value={getUnitPrice(record.avgPrice1)}
										type="1"
										productOnShelfStatus={record.productOnShelfStatus}
									/>
								</span> : null}
							</div>

						</div>
					}
				},
				{
					title: '',
					dataIndex: 'skuTypeName2',
					key: "skuTypeName2",
					align: 'left',
					render: (text, record) => {
						const { equitiesIdList = [] } = record
						return <span>
							{equitiesIdList.length > 0 ? <Equity equitiesIdList={equitiesIdList} /> : null}
						</span>
					}
				},
			]
		}
		const cloumsMap = {
			//微信平台-微闪投数据项
			"fabu-wei": getPriceColumn('报价/阅读单价', 'fabu'),
			//微信平台-阅读点赞量列
			"yuedu": [{
				title: <span>数据<MarkMessage {...messageInfo['yuduTable']} /></span>,
				dataIndex: 'name',
				key: 'name',
				align: 'center',
				width: "33.3%",
			}, {
				title: '阅读量',
				dataIndex: 'value1',
				key: 'value1',
				align: 'center',
				width: "33.3%",
				render: (text, record) => {
					return <ValueStyle value={getWeixinAvg(record.value1)} fontSize="13px" />
				}
			}, {
				title: '点赞量',
				dataIndex: 'value2',
				key: "value2",
				align: 'center',
				width: "33.3%",
				render: (text, record) => {
					return <ValueStyle value={getWeixinAvg(record.value2)} fontSize="13px" />
				}
			}],
			//包含报价和价格，价格无平均数据列（新浪，视频）
			'baojia': getPriceColumn('报价', '', false),
			//包含报价和价格，价格有平均数据列（视频）
			'baojiatwo': getPriceColumn('报价/播放单价', 'zhuanfa'),
			//新浪直发
			'zhifa': [{
				title: <span>数据<MarkMessage {...messageInfo['xinlang']} /></span>,
				dataIndex: 'name',
				key: "name",
				align: 'center',
				width: "33.3%",
			}, {
				title: '直发',
				dataIndex: 'value1',
				key: "value1",
				align: 'center',
				width: "33.3%",
				render: (text, record) => {
					return <span><ValueStyle value={getOtherAllAvg(record.value1)} fontSize="13px" /></span>
				}
			}, {
				title: '转发',
				dataIndex: 'value2',
				key: "value2",
				align: 'center',
				width: "33.3%",
				render: (text, record) => {
					return <span><ValueStyle value={getOtherAllAvg(record.value2)} fontSize="13px" /></span>
				}
			}],
			//视频转发
			'video': [{
				title: <span>数据项<MarkMessage {...messageInfo[videoKey]} /></span>,
				dataIndex: 'name',
				key: "name",
				align: 'center',
				width: "60%",
			}, {
				title: '数据',
				dataIndex: 'value1',
				key: "value1",
				align: 'center',
				width: "40%",
				render: (text, record) => {
					return <span><ValueStyle value={getOtherAllAvg(record.value1)} fontSize="13px" /></span>
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
				dataIndex: 'value1',
				key: "value1",
				align: 'center',
				width: "33.3%",
				render: (text, record) => {
					return <span><ValueStyle value={getOtherAllAvg(record.value1)} fontSize="13px" /></span>
				}
			}, {
				title: <span>文章<MarkMessage {...messageInfo['redBook']} /></span>,
				dataIndex: 'value2',
				key: "value2",
				align: 'center',
				width: "33.3%",
				render: (text, record) => {
					return <span><ValueStyle value={getOtherAllAvg(record.value2)} fontSize="13px" /></span>
				}
			}],
			"otherAvg": [{
				title: <span>平均数据</span>,
				dataIndex: 'otherAvg',
				key: "otherAvg",
				align: 'center',
				render: (text, record) => {
					//return <span><ValueStyle value={getOtherAllAvg(record.value1)} fontSize="13px" /></span>
				}
			},]
		}
		const columns = cloumsMap[columsNum];
		const dataTimeNew = dataTime && moment(dataTime).format('YYYY-MM-DD') || ""
		const jsId = `js-table-fold-id-${accountId}`
		return <div className={isLeft ? "simple-tables-container-left" : "simple-tables-container-right"}>
			{columsNum ?
				<div>
					<FoldBox height={137} isFold={isLeft && data.length > 4 ? true : false} foldId={jsId}>
						<Table {...config} columns={columns} dataSource={data}
							rowKey={(record, index) => index}
							id={jsId}
						/>
					</FoldBox>
					<div className='bottom-two' >
						<div className="time-table-footer">{tableFooterText ? `${tableFooterText}：${dataTimeNew}` : null}
						</div>
						{data.length > 0 && isFamous ? < ExampleTable
							dataTimeNew={dataTimeNew}
							data={data} isFamous={isFamous}
							ISWEiXin={ISWEiXin} /> : null}
					</div>
				</div> :
				<div className='no-columns-text'>暂无数据</div>}

		</div>
	}
}

