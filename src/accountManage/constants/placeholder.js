export const AccountDescPlaceholder = [
	{
		'text': '知名微信公众号媒体，“学最好的穿搭，做最好的女人”。专注时尚穿搭，拥有XX万粉丝，粉丝多为高黏性的女性白领群体，具有较高的商业转化价值；合作过多个时尚美妆品牌，紧抓客户要点，撰稿经验丰富。若您不接受原创合作，可写：帐号支持客户给稿直发，可添加二维码、原文链接等',
		'pid': [9]
	},
	{
		'text': '微博知名段子手/大V/星座达人，致力于网络新起事物、热点事件、热门电影等相关的创作，内容有自己的独特视角；出版作品《xxxx》等。若您不接受原创合作，可写：帐号支持转发，可支持下微任务防屏蔽，可购买粉丝头条等',
		'pid': [1]
	},
	{
		'text': '美女主播，自带90后美女coser属性，微博月流量百万金v用户。善于表达，接地气打破传统女神形象，多才多艺满足粉丝的多重胃口，知识+正能量打破以往的美女花瓶界限；拥有微博，直播，QQ粉丝群，粉丝粘滞性互动性强； 参加过XXX等品牌的线下发布活动，直播平台专题直播策划活动等。可支持直播活动前在微博上进行预热。',
		'pid': [105,108,106,114,112,113,107]
	},
	{
		'text': '搞笑视频达人，视频风格犀利独到，容易引起话题性传播；曾创作过“xxxx”系列节目，取得xxx万播放量。在XXX等多个视频平台均可发布若您不接受原创合作，可写：帐号支持发布客户的指定视频，支持多平台发布等',
		'pid': [25,24,102,100,101 ,109,29,30,111,110]
	}
]
// 平台对应描述
export const platformToDesc = AccountDescPlaceholder.reduce((obj, {text, pid}) => {
	pid.forEach(i => obj[i] = text)
	return obj
}, {})
// 抓取信息提示
export const fetchPlaceholder = [
	{
		'text': '请输入账号ID',
		'pid': [25, 109, 106,108,26,105]
	},
	{
		'text': '请输入YY号',
		'pid': [104,113]
	},
	{
		'text': '请输入房间号',
		'pid': [107]
	},
	{
		'text': '请输入直播间URL',
		'pid': [114]
	}
]
// 平台对应抓取提示描述
export const platformToFetch = fetchPlaceholder.reduce((obj, {text, pid}) => {
	pid.forEach(i => obj[i] = text)
	return obj
}, {})

//合作信息-placeholder -url
export const CooperateURLPlaceHolder =[
	{
		'text':'请填写曾经合作的广告案例链接',
		'pid':[9,1,23,26,33]
	},
	{
		'text':'请填写曾合作的广告案例链接；若无案例可添加曾发布的视频、直播回放或微博链接',
		'pid':[105,108,106,114,112,113,107,25,102,2,100,3,101,109,29,30,111,]
	}
]
export const platformToCooperUrl = CooperateURLPlaceHolder.reduce((obj, {text, pid}) => {
	pid.forEach(i => obj[i] = text)
	return obj
}, {})
//合作信息-placeholder -brand
export const CooperateBrandPlaceHolder =[
	{
		'text':'该链接所涉及的品牌名称',
		'pid':[9,1,26]
	},
	{
		'text':'品牌：该链接所涉及的品牌名称 主题：如某品牌的线上直播活动、原创视频作品；或该视频的主要内容。',
		'pid':[105,108,106,114,112,113,107,25,102,2,100,3,101,109,29,30,111,]
	}
]
//合作信息-placeholder-content
export const platformToCooperBrand = CooperateBrandPlaceHolder.reduce((obj, {text, pid}) => {
	pid.forEach(i => obj[i] = text)
	return obj
}, {})

export const CooperateContentPlaceHolder =[
	{
		'text':'如：原创多图文第一条发布，按照帐号一贯的专业风格，围绕xx产品的促销活动进行创作和发布。因为帐号调性匹配，精准针对目标用户，推广效果良好。阅读量100W+，点赞量3W+，评论量1000W+等；',
		'pid':[9]
	},
	{
		'text':'在微博活跃的时间段，通过抽奖的形式进行微博图文直发，使xxx剃须刀曝光在广大男性用户的视野中，通过网页链接，直接跳转到京东店铺购买。阅读量100W+，点赞量3W+，评论量1000W+等；',
		'pid':[1]
	},
	{
		'text':'请填写合作案例的数据情况或案例亮点',
		'pid':[26]
	},
	{
		'text':'1.播放量100w，点赞量3w，转发量1w、观看量3W等等；2.以关爱女性为主题，搭配浪漫温馨风格，完美植入了XX产品或进行了xx主题视频发布；	3.促进了产品销售，达到了推广效果，登上平台热门推荐，取得良好效果。',
		'pid':[105,108,106,114,112,113,107,25,102,2,100,3,101,109,29,30,111,]
	}
]
export const platformToCooperContent = CooperateContentPlaceHolder.reduce((obj, {text, pid}) => {
	pid.forEach(i => obj[i] = text)
	return obj
}, {})
