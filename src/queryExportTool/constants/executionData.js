import React, { Component } from 'react'
const like = { name: '点赞数', value: 'media_like_num' }
const comment = { name: '评论数', value: 'media_comment_num' }
const forward = { name: '转发数', value: 'media_repost_num' }
const read = { name: '阅读数', value: 'media_read_num' }
const views = { name: '播放数', value: 'media_play_num' }
const collect = { name: '收藏数', value: 'media_collect_num' }
const barrage = { name: '弹幕数', value: 'media_barrage_num' }
const share = { name: '分享数', value: 'media_repost_num' }
const liveLook = { name: '直播观看数', value: 'live_play_num' }
const liveLike = { name: '直播点赞数', value: 'live_like_num' }
const liveComment = { name: '直播评论数', value: 'live_comment_num' }
export const executionMap = {
	1: { name: '新浪微博', list: [like, comment, forward] },
	9: { name: '微信公众号', list: [read, like, comment] },
	25: { name: '美拍', list: [read, like, comment, liveLook, liveLike, liveComment] },
	93: { name: '小红书', list: [views, like, comment, collect] },
	110: { name: '哔哩哔哩动画', list: [views, like, comment, barrage] },
	106: { name: '一直播', list: [liveLook, liveLike, liveComment] },
	103: { name: '快手', list: [views, like, comment,] },
	115: { name: '抖音', list: [like, comment, share] },
}
export const executionList = Object.keys(executionMap)

