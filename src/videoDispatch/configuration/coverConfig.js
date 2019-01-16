import React from 'react'

export const coverParam = {
	//"美拍"传递的参数,
	25: {
		//标题内容长度设置
		coverLengthMin: 0,
		coverLengthMax: 20,
		//是否显示标题类型字段
		coverTypeShow: false,
		titlePromptText: <span>标题不超过20个字</span>,
		//标题内容
		coverWhat: {
			title: "什么是标题?",
			src: require("../img/beauty-cover-title.jpg"),
			desc: "标题显示在美拍短视频的封面上，好的标题更容易吸引点击和观看。如下示意，红色框内的为标题",
		},
	},
	//"秒拍"
	24: {
		coverLengthMin: 8,
		coverLengthMax: 30,
		//是否显示标题类型字段
		coverTypeShow: false,
		titlePromptText: "标题，8-30个字 ",
		coverWhat: {
			title: "什么是标题?",
			src: require("../img/second-video-title.jpg"),
			desc: "视频标题显示在秒拍短视频的封面上，如下示意，红色框内的为视频标题",
		},

	},
	//“快手”
	103: {
		id: 103,
		coverLengthMin: 0,
		coverLengthMax: 25,
		//是否显示标题类型字段
		coverTypeShow: true,
		titlePromptText: "标题不超过25个字",
		coverWhat: {
			title: "什么是标题?",
			src: require("../img/quick-cover-title.jpg"),
			desc: "标题显示在快手短视频的封面上，好的标题更容易吸引点击和观看。如下示意，红色框内的为标题",
		},

	},
	//“抖音”
	115: {
		coverLengthMin: 0,
		coverLengthMax: 55,
		//是否显示标题类型字段
		coverTypeShow: true,
		titlePromptText: <span>
			<span>标题不得超过55个字，若要添加话题可以“#话题”</span>
			<span style={{ color: "red" }}>（必须为英文输入法下的#符号，话题名称不得超过14个字，名称后需要留至少一个空格，否则将不能识别）</span>
			<span>形式添加在标题内容中</span>
		</span>,
		coverWhat: {
			title: "什么是标题?",
			src: require("../img/vibrato-video-title.jpg"),
			desc: "标题显示在抖音短视频左下角上。如下示意，红色框内的为标题"
		},
	}

}
