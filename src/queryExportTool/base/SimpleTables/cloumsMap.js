// import React, { Component } from 'react';
// import ValueFormat from "@/queryExportTool/base/ValueFormat";
// import MarkMessage from "../MarkMessage";
// import messageInfo from "../../constants/messageInfo"
// import { getUnitPrice, getQuoteNumber, getWeixinAvg, getXinLangAvg } from "./unit";
// //微信平台-公共列项
// const WeChat = [{
// 	title: '报价',
// 	dataIndex: 'sku_type_name',
// 	key: "sku_type_name",
// 	align: 'center',
// }, {
// 	title: <span>发布<MarkMessage {...messageInfo['fabu']} /></span>,
// 	dataIndex: 'price_1',
// 	key: 'price_1',
// 	align: 'center',
// 	render: (text, record) => {
// 		return <span><ValueFormat value={record.price_1} />/<ValueFormat value={getWeixinAvg(record.avg_price_1)} format='oneUnivalent' /></span>
// 	}
// }]
// export default {
// 	//微信平台-微闪投数据项
// 	"fabu-wei": [...WeChat],
// 	//微信平台-预约数据项
// 	"fabu-yuyue": [...WeChat, {
// 		title: <span>原创+发布<MarkMessage {...messageInfo['yuanchuangFabu']} /></span>,
// 		dataIndex: 'price_2',
// 		key: 'price_2',
// 		align: 'center',
// 		render: (text, record) => {
// 			return <span><ValueFormat value={record.price_2} />/<ValueFormat value={getWeixinAvg(record.avg_price_2)} format='oneUnivalent' /></span>
// 		}
// 	}],
// 	//微信平台-阅读点赞量列
// 	"yuedu": [{
// 		title: <span>数据<MarkMessage {...messageInfo['yuduTable']} /></span>,
// 		dataIndex: 'name',
// 		key: 'name',
// 		align: 'center',
// 	}, {
// 		title: '阅读量',
// 		dataIndex: 'value_1',
// 		key: 'value_1',
// 		align: 'center',
// 		render: (text, record) => {
// 			return <ValueFormat value={record.value_1} format='large' fontSize="13px" />
// 		}
// 	}, {
// 		title: '点赞量',
// 		dataIndex: 'value_2',
// 		key: "value_2",
// 		align: 'center',
// 		render: (text, record) => {
// 			return <ValueFormat value={record.value_2} format='large' fontSize="13px" />
// 		}
// 	}],
// 	//包含报价和价格，价格无平均数据列（新浪，视频）
// 	'baojia': [{
// 		title: '报价',
// 		dataIndex: 'sku_type_name',
// 		key: 'sku_type_name',
// 		align: 'center',
// 	}, {
// 		title: '价格',
// 		dataIndex: 'price_1',
// 		key: 'price_1',
// 		align: 'center',
// 		render: (text, record) => {
// 			return <span><ValueFormat value={record.price_1} /></span>
// 		}
// 	}],
// 	//包含报价和价格，价格有平均数据列（小红书）
// 	'baojiatwo': [{
// 		title: '报价',
// 		dataIndex: 'sku_type_name',
// 		key: "sku_type_name",
// 		align: 'center',
// 	}, {
// 		title: '价格',
// 		dataIndex: 'price_1',
// 		key: 'price_1',
// 		align: 'center',
// 		render: (text, record) => {
// 			return <span><ValueFormat value={record.price_1} />/<ValueFormat value={record.avg_price_1} format='univalent' /></span>
// 		}
// 	}],
// 	//新浪直发
// 	'zhifa': [{
// 		title: <span>数据<MarkMessage {...messageInfo['xinlang']} /></span>,
// 		dataIndex: 'name',
// 		key: "name",
// 		align: 'center',
// 	}, {
// 		title: '直发',
// 		dataIndex: 'value_1',
// 		key: "value_1",
// 		align: 'center',
// 		render: (text, record) => {
// 			return <span><ValueFormat value={record.value_1} format='large' fontSize="13px" /></span>
// 		}
// 	}, {
// 		title: '转发',
// 		dataIndex: 'value_2',
// 		key: "value_2",
// 		align: 'center',
// 		render: (text, record) => {
// 			return <span><ValueFormat value={record.value_2} format='large' fontSize="13px" /></span>
// 		}
// 	}],
// 	//视频转发
// 	'video': [{
// 		title: <span>数据<MarkMessage {...messageInfo['video']} /></span>,
// 		dataIndex: 'name',
// 		key: "name",
// 		align: 'center',
// 	}, {
// 		title: '转发',
// 		dataIndex: 'value_1',
// 		key: "value_1",
// 		align: 'center',
// 		render: (text, record) => {
// 			return <span><ValueFormat value={record.value_1} format='large' fontSize="13px" /></span>
// 		}
// 	}],
// 	//小红书视频文章列
// 	"red": [{
// 		title: "数据项",
// 		dataIndex: 'name',
// 		key: "name",
// 		align: 'center',
// 	}, {
// 		title: <span>视频<MarkMessage {...messageInfo['redVideo']} /></span>,
// 		dataIndex: 'value_1',
// 		key: "value_1",
// 		align: 'center',
// 		render: (text, record) => {
// 			return <span><ValueFormat value={record.value_1} format='large' fontSize="13px" /></span>
// 		}
// 	}, {
// 		title: <span>文章<MarkMessage {...messageInfo['redBook']} /></span>,
// 		dataIndex: 'value_2',
// 		key: "value_2",
// 		align: 'center',
// 		render: (text, record) => {
// 			return <span><ValueFormat value={record.value_2} format='large' fontSize="13px" /></span>
// 		}
// 	}],
// 	"otherAvg": [{ßß
// 		title: <span>平均数据<MarkMessage {...messageInfo['redVideo']} /></span>,
// 		dataIndex: 'value_1',
// 		key: "value_1",
// 		align: 'center',
// 		render: (text, record) => {
// 			return <span><ValueFormat value={record.value_1} format='large' fontSize="13px" /></span>
// 		}
// 	},]
// }
