import BatchCreateMainAccount from '../components/mainAccountAndmicro/BatchCreateMainAccount'
import { ChooseType } from '../components/ChooseType'
import AccountPutAttribute from '../components/accountPutAttribute/AccountPutAttribute'
import { AccountPutAttributeStep1 } from '../components/accountPutAttribute/AccountPutAttributeStep1'
import { AccountPutAttributeStep2 } from '../components/accountPutAttribute/AccountPutAttributeStep2'
import { AccountPutAttributeStep3 } from '../components/accountPutAttribute/AccountPutAttributeStep3'
import BatchEditAccountPrice from '../components/batchEditAccountPrice/BatchEditAccountPrice'
import { batchEditAccountPriceStep1 } from '../components/batchEditAccountPrice/batchEditAccountPriceStep1'
import { batchEditAccountPriceStep2 } from '../components/batchEditAccountPrice/batchEditAccountPriceStep2'
import { batchEditAccountPriceStep3 } from '../components/batchEditAccountPrice/batchEditAccountPriceStep3'
import { batchEditAccountPriceStep4 } from '../components/batchEditAccountPrice/batchEditAccountPriceStep4'

export const operateType = {
	"addMicroPutAttribute": "账号批量操作-标记微闪投账号",
	"addSelfmediaUser": "主账号批量操作-创建主账号",
	"addAccountForHomeLink": "账号批量操作-账号入库",
	"addAccountForOnline": "账号批量操作-账号批量上下架",
	"addAccountForChangeMainAccount": "账号批量操作-账号批量更换主账号"
}
export const statusName = {
	"1": "待处理",
	"2": "处理中",
	"3": "处理完成",
	"4": "处理失败"
}
export const typeConfig = {
	"tab1": ChooseType,
	"tab2": BatchCreateMainAccount,
	"tab3": AccountPutAttribute,
	"tab4": BatchEditAccountPrice
}

export const statusDotColor = {
	"1": "#FFC900",
	"2": "blue",
	"3": "green",
	"4": "red"
}

export const step2Title = {
	//批量创建主账号
	"addSelfmediaUser": "批量创建主账号",
	//创建微闪投
	"addMicroPutAttribute": "批量标记微闪投账号",
	//账号上下架
	"addAccountForOnline": "账号批量上下架",
	//更换主账号
	"addAccountForChangeMainAccount": "更换主账号"
}

export const uploadAccountMessage = {
	//批量创建主账号
	"addSelfmediaUser": {
		uploadBtn: "上传主账号信息",
		tips2: "按要求将添加的主账号的信息填写在模板中"
	},
	//创建微闪投
	"addMicroPutAttribute": {
		uploadBtn: "上传账号信息",
		tips2: "按要求将需要标记的账号信息填写在模板中"
	},
	//账号批量上下架
	"addAccountForOnline": {
		uploadBtn: "上传账号信息",
		tips2: "按要求将需要处理上下架的账号信息填写在模板中"
	},
	//更换主账号
	"addAccountForChangeMainAccount": {
		uploadBtn: "上传账号信息",
		tips2: "按要求将需要更换主账号的账号信息填写在模板中"
	}
}

export const finishMessage = {
	//批量创建主账号
	"addSelfmediaUser": {
		tips1: "上传主账号信息成功！"
	},
	//创建微闪投
	"addMicroPutAttribute": {
		tips1: "上传账号信息成功！"
	},
	//账号上下架
	"addAccountForOnline": {
		tips1: "上传账号信息成功！"
	},
	//更换主账号
	"addAccountForChangeMainAccount": {
		tips1: "上传账号信息成功！"
	}
}

export const stepMessage = {
	//批量创建主账号
	"addSelfmediaUser": {
		step1Title: "上传主账号信息",
		step1Message: "上传需要添加的主账号信息",
		step2Message: "主账号信息上传成功"
	},
	//创建微闪投
	"addMicroPutAttribute": {
		step1Title: "上传账号信息",
		step1Message: "上传需要标记的账号account_id",
		step2Message: "账号信息上传成功"
	},
	//账号批量上下架
	"addAccountForOnline": {
		step1Title: "上传账号信息",
		step1Message: "上传需要处理的账号account_id",
		step2Message: "账号信息上传成功"
	},
	//更换主账号
	"addAccountForChangeMainAccount": {
		step1Title: "上传账号信息",
		step1Message: "上传需要更换主账号的账号account_id",
		step2Message: "账号信息上传成功"
	}
}

export const AccountPutAttributeSteps = {
	"0": AccountPutAttributeStep1,
	"1": AccountPutAttributeStep2,
	"2": AccountPutAttributeStep3
}

export const platformIcon = {
	"淘宝达人": {
		img: require('../constants/platfornIconImgs/taobao.png'),
		operateType: "addAccountForHomeLink",
		remark: { "weibo_type": "119" }
	},
	"抖音": {
		img: require('../constants/platfornIconImgs/douyin.png'),
		operateType: "addAccountForHomeLink",
		remark: { "weibo_type": "115" }
	},
	"小红书": {
		img: require('../constants/platfornIconImgs/xiaohongshu.png'),
		operateType: "addAccountForRedBook",
		remark: { "weibo_type": "93" }
	},
	"秒拍": {
		img: require('../constants/platfornIconImgs/miaopai.png'),
		operateType: "addAccountForHomeLink",
		remark: { "weibo_type": "24" }
	},
	"微视": {
		img: require('../constants/platfornIconImgs/weishi.png'),
		operateType: "addAccountForHomeLink",
		remark: { "weibo_type": "120" }
	},
	"Acfun": {
		img: require('../constants/platfornIconImgs/ACFUN.png'),
		operateType: "addAccountForHomeLink",
		remark: { "weibo_type": "111" }
	},
	"西瓜视频": {
		img: require('../constants/platfornIconImgs/xiguashipin.png'),
		operateType: "addAccountForHomeLink",
		remark: { "weibo_type": "118" }
	},
	"快手": {
		img: require('../constants/platfornIconImgs/kuaishou.png'),
		operateType: "addAccountForHomeLink",
		remark: { "weibo_type": "103" }
	},
	"火山小视频": {
		img: require('../constants/platfornIconImgs/huoshan.png'),
		operateType: "addAccountForHomeLink",
		remark: { "weibo_type": "116" }
	},
	"陌陌": {
		img: require('../constants/platfornIconImgs/momo.png'),
		operateType: "addAccountForHomeLink",
		remark: { "weibo_type": "117" }
	},
	"哔哩哔哩": {
		img: require('../constants/platfornIconImgs/bilibili.png'),
		operateType: "addAccountForHomeLink",
		remark: { "weibo_type": "110" }
	},
	"优酷": {
		img: require('../constants/platfornIconImgs/youku.png'),
		operateType: "addAccountForHomeLink",
		remark: { "weibo_type": "29" }
	},
	"土豆视频": {
		img: require('../constants/platfornIconImgs/tudoushipin.png'),
		operateType: "addAccountForHomeLink",
		remark: { "weibo_type": "30" }
	},
	"爱奇艺": {
		img: require('../constants/platfornIconImgs/aiqiyi.png'),
		operateType: "addAccountForHomeLink",
		remark: { "weibo_type": "100" }
	},
	"搜狐视频": {
		img: require('../constants/platfornIconImgs/souhu.png'),
		operateType: "addAccountForHomeLink",
		remark: { "weibo_type": "101" }
	},
	"腾讯视频": {
		img: require('../constants/platfornIconImgs/tengxun.png'),
		operateType: "addAccountForHomeLink",
		remark: { "weibo_type": "102" }
	},
	"微信": {
		img: require('../constants/platfornIconImgs/weixin.png'),
		operateType: "addAccountForWeChat",
		remark: { "weibo_type": "9" }
	},
	"新浪微博": {
		img: require('../constants/platfornIconImgs/xinlang.png'),
		operateType: "addAccountForWeiBo",
		remark: { "weibo_type": "1" }
	},
	"美拍": {
		img: require('../constants/platfornIconImgs/meipai.png'),
		operateType: "addAccountForAccountId",
		remark: { "weibo_type": "25" }
	},
	"小咖秀": {
		img: require('../constants/platfornIconImgs/xiaokaxiu.png'),
		operateType: "addAccountForAccountId",
		remark: { "weibo_type": "109" }
	},
	"一直播": {
		img: require('../constants/platfornIconImgs/yizhibo.png'),
		operateType: "addAccountForAccountId",
		remark: { "weibo_type": "106" }
	},
	"花椒": {
		img: require('../constants/platfornIconImgs/huajiao.png'),
		operateType: "addAccountForAccountId",
		remark: { "weibo_type": "108" }
	},
	"映客": {
		img: require('../constants/platfornIconImgs/yingke.png'),
		operateType: "addAccountForAccountId",
		remark: { "weibo_type": "105" }
	},
	"YY": {
		img: require('../constants/platfornIconImgs/yy.png')
	},
	"虎牙": {
		img: require('../constants/platfornIconImgs/huya.png')
	},
	"战旗": {
		img: require('../constants/platfornIconImgs/zhanqi.png')
	},
	"斗鱼": {
		img: require('../constants/platfornIconImgs/douyu.png')
	},
	"熊猫直播": {
		img: require('../constants/platfornIconImgs/xiongmao.png'),
		operateType: "addAccountForPanda",
		remark: { "weibo_type": "114" }
	}
}

export const bizzCode = {
	//创建微闪投
	"addMicroPutAttribute": "B_EXCEL_0001",
	//账号批量上下架
	"addAccountForOnline": "B_EXCEL_0003",
	//更换主账号
	"addAccountForChangeMainAccount": "B_EXCEL_0002"
}

export const batchEditAccountPrice_steps = {
	"step1": batchEditAccountPriceStep1,
	"step2": batchEditAccountPriceStep2,
	"step3": batchEditAccountPriceStep3,
	"step4": batchEditAccountPriceStep4
}

export const operateClass = {
	"addMicroPutAttribute": "BatchOperateMicroPut",
	"addSelfmediaUser": "BatchOperateAddSelfmediaUser",
	"addAccountForHomeLink": "BatchOperateAddAccount",
	"addAccountForAccountId": "BatchOperateAddAccount",
	"addAccountForWeChat": "BatchOperateAddAccount",
	"addAccountForWeiBo": "BatchOperateAddAccount",
	"addAccountForOnline": "BatchOperateIsOnline",
	"addAccountForRedBook": "BatchOperateAddAccount",
	"addAccountForPanda": "BatchOperateAddAccount",
	"addAccountForChangeMainAccount": "BatchOperateChangeMainAccount",
	"batchOperateUpdateSkuPrice": "BatchOperateUpdateSkuPrice"
}
