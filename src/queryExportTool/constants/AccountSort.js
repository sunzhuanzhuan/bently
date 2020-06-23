//这里的key是需要和后台字段匹配
export const sortCheckArr = [
	[{
		key: 'weiChat',
		name: '微信认证',
	}, {
		key: 'original',
		name: '原创写稿'
	}],
	[{
		key: 'original',
		name: '可原创'
	}, {
		key: 'pb',
		name: '防屏蔽',
	}, {
		key: 'link',
		name: '可带@/话题/链接'
	}], [], [], []
];
export const sortDropDownArr = [
	{
		key: 'type',
		name: "执行类型",
		children: [{
			key: 'all',
			name: '不限'
		}, {
			key: "weishantou",
			name: '微闪投'
		}, {
			key: "yuyue",
			name: "预约"
		}]
	},
	{
		key: 'onSale',
		name: "上下架状态",
		children: [{
			key: "all",
			name: "不限"
		}, {
			key: "on",
			name: "上架"
		}, {
			key: "un",
			name: "下架"
		}]
	}
];
export const buttonSortArr = [
	[
		{
			name: "SNBT指数",
			key: "snbt",
		},
		{
			name: "粉丝数",
			key: "fans"
		},
		{
			name: "上架时间",
			key: "time"
		},
		{
			name: "真实阅读率",
			key: "rate"
		},
		{
			name: "头条阅读量",
			key: "redFirst"
		}
	],
	[
		{
			name: "SNBT指数",
			key: "snbt"
		},
		{
			name: "上架时间",
			key: "time"
		},
		{
			name: "粉丝数",
			key: "fans"
		},
		{
			name: "平均互动量",
			key: "ava"
		},
		{
			name: "真粉率",
			key: "rate"
		}
	],
	[
		{
			name: "SNBT指数",
			key: "snbt"
		},
		{
			name: "上架时间",
			key: "time"
		},
		{
			name: "粉丝数",
			key: "fans"
		},
		{
			name: "平均播放量",
			key: "ava"
		},
	],
	[
		{
			name: "SNBT指数",
			key: "snbt"
		},
		{
			name: "上架时间",
			key: "time"
		},
		{
			name: "粉丝数",
			key: "fans"
		},
		{
			name: "参考报价",
			key: "reference"
		},
	],
	[
		{
			name: "SNBT指数",
			key: "snbt"
		},
		{
			name: "上架时间",
			key: "time"
		},
		{
			name: "粉丝数",
			key: "fans"
		},
		{
			name: "参考报价",
			key: "reference"
		},
	],

];
export const sortMoreArr = [
	[
		{
			name: "价格",
			key: "price",
			children: [
				{
					name: "头条",
					key: "one",
					children: [
						{
							name: "由高到低",
							key: "desc"
						},
						{
							name: "由低到高",
							key: "asc"
						}

					]
				},
				{
					name: "次条",
					key: "second",
					children: [
						{
							name: "由高到低",
							key: "desc"
						},
						{
							name: "由低到高",
							key: "asc"
						}

					]
				},
				{
					name: "单图文",
					key: "single",
					children: [
						{
							name: "由高到低",
							key: "desc"
						},
						{
							name: "由低到高",
							key: "asc"
						}

					]
				}
			]
		}
	],
	[
		{
			name: "直发报价",
			key: "1",
			children: [
				{
					name: "由高到低",
					key: "desc"
				},
				{
					name: "由低到高",
					key: "asc"
				}
			]
		},
		{
			name: "转发报价",
			key: "2",
			children: [
				{
					name: "由高到低",
					key: "desc"
				},
				{
					name: "由低到高",
					key: "asc"
				}
			]
		},
		{
			name: "硬广",
			key: "3",
			children: [
				{
					name: "直发报价",
					key: "3-1",
					children: [
						{
							name: "由高到低",
							key: "desc"
						},
						{
							name: "由低到高",
							key: "asc"
						}
					]
				},
				{
					name: "直发报价",
					key: "3-2",
					children: [
						{
							name: "由高到低",
							key: "desc"
						},
						{
							name: "由低到高",
							key: "asc"
						}
					]
				}
			]
		},
		{
			name: "软广",
			key: "4",
			children: [
				{
					name: "直发报价",
					key: "4-1",
					children: [
						{
							name: "由高到低",
							key: "desc"
						},
						{
							name: "由低到高",
							key: "asc"
						}
					]
				},
				{
					name: "直发报价",
					key: "4-2",
					children: [
						{
							name: "由高到低",
							key: "desc"
						},
						{
							name: "由低到高",
							key: "asc"
						}
					]
				}
			]
		}
	],
	[
		{
			name: "视频发布",
			key: "1",
			children: [
				{
					name: "由高到低",
					key: "desc"
				},
				{
					name: "由低到高",
					key: "asc"
				}
			]
		},
		{
			name: "原创视频+发布",
			key: "2",
			children: [
				{
					name: "由高到低",
					key: "desc"
				},
				{
					name: "由低到高",
					key: "asc"
				}
			]
		},
		{
			name: "视频广告植入",
			key: "3",
			children: [
				{
					name: "由高到低",
					key: "desc"
				},
				{
					name: "由低到高",
					key: "asc"
				}
			]
		},
		{
			name: "活动现场直播",
			key: "4",
			children: [
				{
					name: "由高到低",
					key: "desc"
				},
				{
					name: "由低到高",
					key: "asc"
				}
			]
		},
		{
			name: "图文发布",
			key: "5",
			children: [
				{
					name: "由高到低",
					key: "desc"
				},
				{
					name: "由低到高",
					key: "asc"
				}
			]
		},
		{
			name: "原创图文+发布",
			key: "6",
			children: [
				{
					name: "由高到低",
					key: "desc"
				},
				{
					name: "由低到高",
					key: "asc"
				}
			]
		}
	],
	[],
	[]
]
