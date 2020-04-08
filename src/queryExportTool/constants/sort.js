import React from 'react'
import MarkMessage from "@/queryExportTool/base/MarkMessage";
import messageInfo from "@/queryExportTool/constants/messageInfo";
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
const defaultQuotePriceDiscount = {
	'title': <span>价格优劣<MarkMessage {...messageInfo['defaultQuotePriceDiscount']} /></span>,
	'name': 'defaultQuotePriceDiscount',
}
export function handleMoreList(list) {
	return list.map(one => {
		return {
			value: 'skuOpenQuotePrice:' + one.id,
			label: one.name + '价格',
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
// function priceGoodBadList(list) {
// 	return list.map(id => {
// 		return {
// 			value: 'defaultQuotePriceDiscount:' + id,
// 			label: skyType[id] + '价格',
// 			children: [{
// 				value: 'asc',
// 				label: '优势从大到小'
// 			}, {
// 				value: 'desc',
// 				label: '优势从小到大'
// 			}]
// 		}
// 	})
// }
const isLowQuality = {
	'title': '不含劣质号',
	'name': 'isLowQuality'
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
				},
				isLowQuality
				//价格优劣
				//defaultQuotePriceDiscount
			],
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
			],
			priceGoodBadList: [
				//...priceGoodBadList([1, 2, 3, 4, 5, 6, 7, 8])
			],
			default: {
				//snbt: 'desc' 
			}
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
					'name': 'trinityIsPreventShielding'
				},
				{
					'title': '可带@/话题/链接',
					'name': 'isSupportTopicAndLink'
				},
				isLowQuality
				//价格优劣
				//defaultQuotePriceDiscount
				// {
				// 	'title': '原创',
				// 	'name': 'canOrigin'
				// }
			],
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
			],
			priceGoodBadList: [
				//...priceGoodBadList([9, 10, 11, 12, 13, 14])
			],
			default: {
				//snbt: 'desc' 
			}
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
					'name': 'trinityIsPreventShielding'
				},
				{
					'title': '原创',
					'name': 'canOriginWrite'
				},
				isLowQuality
				//价格优劣
				//defaultQuotePriceDiscount
			],
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
			],
			priceGoodBadList: [
				//	...priceGoodBadList([16, 15, 19, 17, 26, 27])
			],
			default: {
				//snbt: 'desc', 
			}
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
					'name': 'trinityIsPreventShielding'
				},
				isLowQuality
				//价格优劣
				//defaultQuotePriceDiscount
			],
		},
		sorter: {
			buttons: [
				{
					field: 'snbt',
					title: 'SNBT'
				}, {
					field: 'followerCount',
					title: '粉丝数'
				},
				{
					field: 'createdAt',
					title: '入库时间'
				}, {
					field: 'skuOpenQuotePrice',
					title: '参考报价'
				}
			],
			priceGoodBadList: [
				{
					value: 'defaultQuotePriceDiscount',
					label: '参考报价',
					children: [{
						value: 'asc',
						label: '优势从大到小'
					}, {
						value: 'desc',
						label: '优势从小到大'
					}]
				}
			],
			default: {
				//followerCount: 'desc'
			}
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
					'name': 'trinityIsPreventShielding'
				},
				isLowQuality
				//价格优劣
				//defaultQuotePriceDiscount

			],
		},
		sorter: {
			buttons: [
				{
					field: 'snbt',
					title: 'SNBT'
				}, {
					field: 'followerCount',
					title: '粉丝数'
				},
				{
					field: 'createdAt',
					title: '入库时间'
				}, {
					field: 'skuOpenQuotePrice',
					title: '参考报价'
				}
			],
			priceGoodBadList: [
				{
					value: 'defaultQuotePriceDiscount',
					label: '参考报价',
					children: [{
						value: 'asc',
						label: '优势从大到小'
					}, {
						value: 'desc',
						label: '优势从小到大'
					}]
				}
			],
			default: {
				//followerCount: 'desc' 
			}
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
