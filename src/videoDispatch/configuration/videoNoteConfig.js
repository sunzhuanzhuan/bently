import React from 'react'

export const videoNoteParam = {
	//"美拍"传递的参数,
	25: {
		//简介提示信息
		notePromptText: <span>
			<span>简介不超过140个字，若要添加话题或者@好友，可以“#话题#”</span>
			<span style={{ color: 'red' }}>（必须为英文输入法下的#符号，否则将不能识别）</span>
			、“@好友名称”
			<span style={{ color: "red" }}>（好友名称后需要留至少一个空格，否则将不能识别）</span>
			<span>形式添加在标题中</span>
		</span>,
		//简介内容长度设置
		minVideoLength: 0,
		maxVideoLength: 140,
		//简介内容
		videoWhat: {
			title: "什么是简介?",
			src: require("../img/beauty-video-title.jpg"),
			desc: "简介显示在美拍短视频的详情页上，如下示意，红色框内的为简介",
		},
	},
	103: {
		notePromptText: "简介不得超过500个字，若要添加话题可以“#话题#”形式添加在简介中",
		minVideoLength: 0,
		maxVideoLength: 500,
		videoWhat: {
			title: "什么是简介?",
			src: require("../img/quick-video-title.jpg"),
			desc: "简介显示在快手短视频的详情页下方，如下示意，红色框内的为简介",
		},
	},
}
