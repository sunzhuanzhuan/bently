import React from 'react'
import MarkMessage from "@/queryExportTool/base/MarkMessage";
import messageInfo from "@/queryExportTool/constants/messageInfo";

const skyType = {
	"1": "多图文第一条(原创+发布)",
	"2": "多图文第二条(原创+发布)",
	"3": "多图文第3~N条(原创+发布)",
	"4": "单图文(原创+发布)",
	"5": "多图文1发布",
	"6": "多图文2发布",
	"7": "多图文3+条发布",
	"8": "单图文发布",
	"9": "直发报价",
	"10": "转发报价",
	"11": "硬广直发",
	"12": "硬广转发",
	"13": "软广直发",
	"14": "软广转发",
	"15": "原创视频+发布",
	"16": "视频发布",
	"17": "活动现场直播",
	"18": "直播广告植入",
	"19": "视频广告植入",
	"20": "供图+拍摄",
	"21": "供图",
	"22": "原创视频+发布",
	"23": "视频发布",
	"24": "活动现场直播",
	"25": "直播广告植入",
	"26": "图文发布",
	"27": "原创图文+发布",
	"28": "预约参考价",
	"29": "账号报价",
	"30": "硬广直发报价",
	"31": "账号报价",
	"32": "预约参考价"
}
//
//
//
const complyType = {
	'0': {
		name: '不限'
	},
	'2': {
		name: '微闪投'
	},
	'1': {
		name: '预约'
	}
}
const shelfType = {
	'0': {
		name: '不限'
	},
	'1': {
		name: 'AB端上架'
	},
	'2': {
		name: 'AB端下架'
	},
	'3': {
		name: '仅B端上架'
	}
}
function handleMoreList(list) {
	return list.map(id => {
		return {
			value: 'skuOpenQuotePrice:' + id,
			label: skyType[id] + '价格',
			children: [{
				value: 'desc',
				label: '从高到低'
			}, {
				value: 'asc',
				label: '从低到高'
			}]
		}
	})
}
export const groupBySorter = {
	'1': {
		filter: {
			drop: [
				{
					'title': '上下架状态',
					'prefix': 'shelf',
					'field': 'onlineStatus'
				},
				{
					'title': '执行类型',
					'prefix': 'comply',
					'field': 'isFamous'
				}
			],
			check: [
				{
					'title': '微信认证',
					'name': 'isVerified'
				},
				{
					'title': '原创',
					'name': 'canOriginWrite'
				}
			]
		},
		sorter: {
			buttons: [
				{
					field: 'snbt',
					title: 'SNBT'
				}, {
					field: 'followerCount',
					title: '粉丝数'
				}, {
					field: 'trueReadRatio',
					title: '真实阅读率',
					tip: <MarkMessage {...messageInfo['yudu']} />
				}, {
					field: 'mediaIndexOneAvgReadNum',
					title: '多图文第一条阅读量'
				}
			],
			more: [
				{
					value: 'createdAt',
					label: '入库时间',
					children: [{
						value: 'desc',
						label: '由近及远'
					}, {
						value: 'asc',
						label: '由远及近'
					}]
				},
				...handleMoreList([1, 2, 3, 4, 5, 6, 7, 8])
			],
			default: { snbt: 'desc' }
		}
	},
	'2': {
		filter: {
			drop: [
				{
					'title': '上下架状态',
					'prefix': 'shelf',
					'field': 'onlineStatus'
				},
				{
					'title': '执行类型',
					'prefix': 'comply',
					'field': 'isFamous'
				}
			],
			check: [
				{
					'title': '防屏蔽',
					'name': 'skuIsPreventShielding'
					//'name': 'trinity_is_prevent_shielding'
				},
				{
					'title': '可带@/话题/链接',
					'name': 'isSupportTopicAndLink'
				},
				// {
				// 	'title': '原创',
				// 	'name': 'canOrigin'
				// }
			]
		},
		sorter: {
			buttons: [
				{
					field: 'snbt',
					title: 'SNBT'
				}, {
					field: 'followerCount',
					title: '粉丝数'
				}, {
					field: 'directMediaInteractionAvg',
					title: '平均互动量'
				}, {
					field: 'trueFansRate',
					title: '真粉率'
				}
			],
			more: [
				{
					value: 'createdAt',
					label: '入库时间',
					children: [{
						value: 'desc',
						label: '由近及远'
					}, {
						value: 'asc',
						label: '由远及近'
					}]
				},
				...handleMoreList([9, 10, 11, 12, 13, 14])
			],
			default: { snbt: 'desc' }
		}
	},
	'3': {
		filter: {
			drop: [
				{
					'title': '上下架状态',
					'prefix': 'shelf',
					'field': 'onlineStatus'
				},
				{
					'title': '执行类型',
					'prefix': 'comply',
					'field': 'isFamous'
				}
			],
			check: [
				{
					'title': '防屏蔽',
					'name': 'trinity_is_prevent_shielding'
				},
				{
					'title': '原创',
					'name': 'canOriginWrite'
				}
			]
		},
		sorter: {
			buttons: [
				{
					field: 'snbt',
					title: 'SNBT'
				}, {
					field: 'followerCount',
					title: '粉丝数'
				}, {
					field: 'mediaPlayAvg',
					title: '平均播放量'
				}
			],
			more: [
				{
					value: 'createdAt',
					label: '入库时间',
					children: [{
						value: 'desc',
						label: '由近及远'
					}, {
						value: 'asc',
						label: '由远及近'
					}]
				},
				...handleMoreList([16, 15, 19, 17, 26, 27])
			],
			default: { snbt: 'desc' }
		}
	},
	'4': {
		filter: {
			drop: [
				{
					'title': '上下架状态',
					'prefix': 'shelf',
					'field': 'onlineStatus'
				},
				{
					'title': '执行类型',
					'prefix': 'comply',
					'field': 'isFamous'
				}
			],
			check: [
				{
					'title': '防屏蔽',
					'name': 'trinity_is_prevent_shielding'
				},
			]
		},
		sorter: {
			buttons: [
				{
					field: 'snbt',
					title: 'SNBT'
				}, {
					field: 'followerCount',
					title: '粉丝数'
				}, {
					field: 'skuOpenQuotePrice',
					title: '参考报价'
				}, {
					field: 'createdAt',
					title: '入库时间'
				}
			],
			default: { followerCount: 'desc' }
		}
	},
	'5': {
		filter: {
			drop: [
				{
					'title': '上下架状态',
					'prefix': 'shelf',
					'field': 'onlineStatus'
				},
				{
					'title': '执行类型',
					'prefix': 'comply',
					'field': 'isFamous'
				}
			],
			check: [
				{
					'title': '防屏蔽',
					'name': 'trinity_is_prevent_shielding'
				},
			]
		},
		sorter: {
			buttons: [
				{
					field: 'snbt',
					title: 'SNBT'
				}, {
					field: 'followerCount',
					title: '粉丝数'
				}, {
					field: 'skuOpenQuotePrice',
					title: '参考报价'
				}, {
					field: 'createdAt',
					title: '入库时间'
				}
			],
			default: { followerCount: 'desc' }
		}
	}
}
export const sortDropTypes = {
	complyType,
	shelfType,
	complyDefaultList: Object.keys(complyType),
	shelfDefaultList: Object.keys(shelfType)
}
export const platformSort = {}
