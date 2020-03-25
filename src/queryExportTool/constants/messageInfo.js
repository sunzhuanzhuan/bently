import React from 'react';

const getVideo = (isStart) => {
	return {
		title: "数据",
		content: <div>
			平均播放数：最近30条视频的播放量的平均值{isStart ? '（抖音为取自星图平台数据）' : ''}<br />
			平均点赞数：最近30条视频的点赞数的平均值 <br />
			平均评论数：最近30条视频的评论数的平均值<br />
			平均在线观众数：最近30条直播的在看观看人数的平均值<br />
			最高在线观众数：最近30条直播内容中最高在线观看人数<br />
		</div>
	}
}

const getLine = (title, content) => {
	const styleLine = {
		width: 100,
		textAlign: 'right'
	}
	const flexDisplay = {
		display: 'flex',
	}
	return < div style={flexDisplay}>
		<div style={styleLine}>{title}</div>
		{content}
	</div >
}

const nounDescription = <div>
	<div><b>&nbsp;&nbsp;名词说明：</b></div>
	<div>【参考价】：微播易参考报价</div>
	<div>【渠道价】：博主授权渠道方，给渠道方的底价</div>
	<div>【刊例价】：博主公开的底价 </div>
	<div> &nbsp;&nbsp;ps：以上报价均为参考价</div>
</div>
export default {
	snbt: { title: "SNBT值", content: "SNBT指的是社交媒体账号的影响力指数，是微播易的发明专利（专利名称：广告精准投放方法和系统、专利号：ZL2015 1 0958772.0）的简称，数值范围：0~100，数值越高表示账号质量越好。" },
	yudu: { title: "真实阅读率", content: "指的是账号真实阅读比例，数值范围：0~100%，数值越高表示账号质量越好。" },
	zhenfen: { title: "真粉率", content: "指的是账号粉丝中真实粉丝占比，数值范围：0~100 %，数值越高表示账号真实粉丝数越多" },
	week: { title: "周平均推送", content: "最近90天平均每周文章推送的次数" },
	day: { title: "近7天推送", content: "最近7天的图文消息推送次数" },
	some: { title: "被约次数", content: "账号的历史预约订单之和，包含A、B端所有状态的预约订单" },
	weekdan: { title: "周订单", content: "微闪投类型账号最近一周已回填链接的订单数量（包含A、B端）" },
	fabu: {
		title: "报价/阅读单价",
		content: <div>
			展示该账号的参考报价、阅读单价；<br />
			阅读单价是该账号对应价格的单人阅读参考成本；<br />
			公式：阅读单价 = 参考报价 / 平均阅读量；<br />
			<span style={{ color: "red" }}>说明：</span>平均阅读量超过100000+ 的时候，按照100000来计算阅读单价
	</div>
	},
	zhuanfa: {
		title: "价格",
		content: <div>
			展示对应的的参考报价、播放单价<br />
			公式：播放单价 = 参考报价 / 平均播放数，不足0.1的时候展示为不足0.1
		</div>,

	},
	yuduTable: {
		title: "数据",
		content: <div>
			多一 / 二 / 3-N 阅读量：最近30条相应位置发布文章的阅读量的平均值<br />
			多一 / 二 / 3-N 点赞量：最近30条相应位置发布文章的点赞量的平均值
		</div>,
	},
	xinlang: {
		title: "数据",
		content: <div>
			直发平均转发：最近30条直发类型微博转发量的平均值<br />
			直发平均评论：最近30条直发类型微博评论量的平均值<br />
			直发平均点赞：最近30条直发类型微博点赞量的平均值<br />
			转发平均转发：最近30条转发类型微博转发量的平均值<br />
			转发平均评论：最近30条转发类型微博评论量的平均值<br />
			转发平均点赞：最近30条转发类型微博点赞量的平均值
		</div>,

	},
	redVideo: {
		title: "视频",
		content: <div>
			平均播放数：最近30条发布视频的播放量的平均值 <br />
			平均收藏数：最近30条发布内容的收藏数数的平均值<br />
			平均转发数：最近30条发布内容的转发数的平均值<br />
			平均评论数：最近30条发布内容的评论数的平均值<br />
			平均点赞数：最近30条发布内容的点赞数的平均值<br />
		</div>
	},
	redBook: {
		title: "文章",
		content: <div>
			平均收藏数：最近30条发布内容的收藏数数的平均值<br />
			平均转发数：最近30条发布内容的转发数的平均值<br />
			平均评论数：最近30条发布内容的评论数的平均值<br />
			平均点赞数：最近30条发布内容的点赞数的平均值<br />
		</div>
	},
	video: getVideo(false),
	videoStart: getVideo(true),


	degree: {
		title: "",
		content: <div>
			好评：响应速度+配合度+效果满意度 评分求和大于等于12分<br />
			中评：响应速度+配合度+效果满意度 评分求和 大于6分小于12分<br />
			差评：响应速度+配合度+效果满意度 评分求和  小于等于6分<br />
		</div>
	},
	isShielding: {
		title: "",
		content: '该参考报价为含防屏蔽的报价'
	},
	exampleTable: {
		title: "",
		content: nounDescription
	},
	descriptionDiscoun: {
		title: '',
		content: <div>
			<div><b>&nbsp;&nbsp;规则说明：</b></div>
			<div>{`【参考价】<【渠道价/刊例价】则标记【优势（例：7折）】`}</div>
			<div>{`【参考价】>【渠道价/刊例价】则标记【劣势（例：高10%）】`}</div>
			<div>【参考价】=【渠道价/刊例价】则标记【平价】</div>
			{nounDescription}
		</div>
	},
	defaultQuotePriceDiscount: {
		title: '',
		content: <div>
			<div>【参考价】＜【渠道价/刊例价】则为优势报价</div>
			{nounDescription}
		</div>
	},

}

