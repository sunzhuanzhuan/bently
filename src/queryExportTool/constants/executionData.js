import React, { Component } from 'react'
const like = { name: '点赞数', value: '' }
const comment = { name: '评论数', value: '' }
const forward = { name: '转发数', value: '' }
const read = { name: '阅读数', value: '' }
const views = { name: '播放数', value: '' }
const collect = { name: '收藏数', value: '' }
const barrage = { name: '弹幕数', value: '' }
const share = { name: '分享数', value: '' }
const liveLook = { name: '直播观看数', value: '' }
const liveLike = { name: '直播点赞数', value: '' }
const liveComment = { name: '直播评论数', value: '' }
const live = {
	liveLook,
	liveLike,
	liveComment
}
export const executionMap = {
	1: { name: '新浪微博', list: [like, comment, forward] },
	9: { name: '微信公众号', list: [read, like, comment] },
	25: { name: '美拍', list: [read, like, comment, ...live] },
	93: { name: '小红书', list: [views, like, comment, collect] },
	110: { name: '哔哩哔哩动画', list: [views, like, comment, collect, barrage] },
	106: { name: '一直播', list: [...live] },
	103: { name: '快手', list: [views, like, comment,] },
	115: { name: '抖音', list: [like, comment, share] },
}
const executionList = Object.keys(executionMap)

export default {
	executionList,
	executionMap
}
