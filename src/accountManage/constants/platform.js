import { AddDefaultChild, UpdateDefaultChild } from "../containers/children/DefaultChild";
import { AddSinaChild, UpdateSinaChild } from "../containers/children/SinaChild";
import { AddWeChatChild, UpdateWeChatChild } from "../containers/children/WeChatChild";
import { AddFriendsChild, UpdateFriendsChild } from "../containers/children/FriendsChild";
import { AddReadBookChild, UpdateReadBookChild } from "../containers/children/ReadBookChild";
import { AddHeadlineChild, UpdateHeadlineChild } from "../containers/children/HeadlineChild";
import { AddBeautyPatChild, UpdateBeautyPatChild } from "../containers/children/BeautyPatChild";
import { AddLikeYYChild, UpdateLikeYYChild } from "../containers/children/LikeYYChild";
// 平台源数据
const platformSource = [
	{
		"pid": 1,
		"platform_name": "新浪微博"
	},
	{
		"pid": 2,
		"platform_name": "腾讯微博"
	},
	{
		"pid": 3,
		"platform_name": "搜狐微博"
	},
	{
		"pid": 4,
		"platform_name": "网易微博"
	},
	{
		"pid": 5,
		"platform_name": "Qzone认证号"
	},
	{
		"pid": 6,
		"platform_name": "美丽说"
	},
	{
		"pid": 7,
		"platform_name": "蘑菇街"
	},
	{
		"pid": 8,
		"platform_name": "人人网"
	},
	{
		"pid": 9,
		"platform_name": "微信公众号"
	},
	{
		"pid": 10,
		"platform_name": "人人小站"
	},
	{
		"pid": 11,
		"platform_name": "豆瓣小站"
	},
	{
		"pid": 12,
		"platform_name": "点点"
	},
	{
		"pid": 13,
		"platform_name": "爱乐活"
	},
	{
		"pid": 14,
		"platform_name": "百度空间"
	},
	{
		"pid": 15,
		"platform_name": "花瓣"
	},
	{
		"pid": 16,
		"platform_name": "啪啪"
	},
	{
		"pid": 17,
		"platform_name": "微淘"
	},
	{
		"pid": 18,
		"platform_name": "微视（老）"
	},
	{
		"pid": 19,
		"platform_name": "Qzone个人号"
	},
	{
		"pid": 23,
		"platform_name": "朋友圈"
	},
	{
		"pid": 24,
		"platform_name": "秒拍"
	},
	{
		"pid": 25,
		"platform_name": "美拍"
	},
	{
		"pid": 26,
		"platform_name": "今日头条"
	},
	{
		"pid": 27,
		"platform_name": "NICE"
	},
	{
		"pid": 28,
		"platform_name": "IN"
	},
	{
		"pid": 29,
		"platform_name": "优酷"
	},
	{
		"pid": 30,
		"platform_name": "土豆视频"
	},
	{
		"pid": 31,
		"platform_name": "喜马拉雅"
	},
	{
		"pid": 32,
		"platform_name": "荔枝FM"
	},
	{
		"pid": 33,
		"platform_name": "QQ公众号"
	},
	{
		"pid": 93,
		"platform_name": "小红书"
	},
	{
		"pid": 94,
		"platform_name": "知乎"
	},
	{
		"pid": 100,
		"platform_name": "爱奇艺"
	},
	{
		"pid": 101,
		"platform_name": "搜狐视频"
	},
	{
		"pid": 102,
		"platform_name": "腾讯视频"
	},
	{
		"pid": 103,
		"platform_name": "快手"
	},
	{
		"pid": 104,
		"platform_name": "YY"
	},
	{
		"pid": 105,
		"platform_name": "映客"
	},
	{
		"pid": 106,
		"platform_name": "一直播"
	},
	{
		"pid": 107,
		"platform_name": "斗鱼"
	},
	{
		"pid": 108,
		"platform_name": "花椒"
	},
	{
		"pid": 109,
		"platform_name": "小咖秀"
	},
	{
		"pid": 110,
		"platform_name": "哔哩哔哩动画"
	},
	{
		"pid": 111,
		"platform_name": "AcFun"
	},
	{
		"pid": 112,
		"platform_name": "战旗直播"
	},
	{
		"pid": 113,
		"platform_name": "虎牙直播"
	},
	{
		"pid": 114,
		"platform_name": "熊猫直播"
	},
	{
		"pid": 115,
		"platform_name": "抖音"
	},
	{
		"pid": 116,
		"platform_name": "火山小视频"
	},
	{
		"pid": 117,
		"platform_name": "MOMO陌陌"
	},
	{
		"pid": 118,
		"platform_name": "西瓜视频"
	},
	{
		"pid": 119,
		"platform_name": "淘宝达人"
	},
	{
		"pid": 120,
		"platform_name": "微视"
	}
]
// 平台码表 id -> name
export const platformView = {
	'1': '新浪微博',
	'2': '腾讯微博',
	'3': '搜狐微博',
	'4': '网易微博',
	'5': 'Qzone认证号',
	'6': '美丽说',
	'7': '蘑菇街',
	'8': '人人网',
	'9': '微信公众号',
	'10': '人人小站',
	'11': '豆瓣小站',
	'12': '点点',
	'13': '爱乐活',
	'14': '百度空间',
	'15': '花瓣',
	'16': '啪啪',
	'17': '微淘',
	'18': '微视（老）',
	'19': 'Qzone个人号',
	'23': '朋友圈',
	'24': '秒拍',
	'25': '美拍',
	'26': '今日头条',
	'27': 'NICE',
	'28': 'IN',
	'29': '优酷',
	'30': '土豆视频',
	'31': '喜马拉雅',
	'32': '荔枝FM',
	'33': 'QQ公众号',
	'93': '小红书',
	'94': '知乎',
	'100': '爱奇艺',
	'101': '搜狐视频',
	'102': '腾讯视频',
	'103': '快手',
	'104': 'YY',
	'105': '映客',
	'106': '一直播',
	'107': '斗鱼',
	'108': '花椒',
	'109': '小咖秀',
	'110': '哔哩哔哩动画',
	'111': 'AcFun',
	'112': '战旗直播',
	'113': '虎牙直播',
	'114': '熊猫直播',
	'115': '抖音',
	'116': '火山小视频',
	'117': 'MOMO陌陌',
	'118': '西瓜视频',
	'119': '淘宝达人',
	'120': '微视'
}

// 平台码表 name -> id
export const platformMap = {
	'SINA': '1',
	'WECHAT': '9',
	'PENG_YOU_QUAN': '23',
	'RED_BOOK': '93'
}
// 视图大分类
const UIView = [
	1,
	9,
	[23, 33, 28, 32, 27, 31, 2, 5, 19, 117],
	93, 26,
	[115, 24, 103, 120, 111,117],
	[119, 118, 116],
	[30, 29, 110, 100, 101, 102, 114],
	25,
	[109, 106, 108, 105, 104, 113, 112, 107]
]
// 平台对应模块
export const viewTypeForPlatform = {
	"defaultChild": {
		involveForWeiboType: [115, 24, 103, 120, 111, 119, 118, 116, 30, 29, 110, 100, 101, 102, 114,117],
		component: {
			add: AddDefaultChild,
			update: UpdateDefaultChild
		}
	},
	"SinaChild": {
		involveForWeiboType: [1],
		component: {
			add: AddSinaChild,
			update: UpdateSinaChild
		}
	},
	"WeChatChild": {
		involveForWeiboType: [9],
		component: {
			add: AddWeChatChild,
			update: UpdateWeChatChild
		}
	},
	"FriendsChild": {
		involveForWeiboType: [23, 33, 28, 32, 27, 31, 2, 5, 19, 117],
		component: {
			add: AddFriendsChild,
			update: UpdateFriendsChild
		}
	},
	"ReadBookChild": {
		involveForWeiboType: [93],
		component: {
			add: AddReadBookChild,
			update: UpdateReadBookChild
		}
	},
	"HeadlineChild": {
		involveForWeiboType: [26],
		component: {
			add: AddHeadlineChild,
			update: UpdateHeadlineChild
		}
	},
	"BeautyPatChild": {
		involveForWeiboType: [25],
		component: {
			add: AddBeautyPatChild,
			update: UpdateBeautyPatChild
		}
	},
	"LikeYYChild": {
		involveForWeiboType: [109, 106, 108, 105, 104, 113, 112, 107],
		component: {
			add: AddLikeYYChild,
			update: UpdateLikeYYChild
		}
	}
}
// 平台对应模块码表
export const platformToType = Object.entries(viewTypeForPlatform).reduce((obj, [key, item]) => {
	item['involveForWeiboType'].forEach(i => obj[i] = key)
	return obj
}, {})
