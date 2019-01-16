export const videoParam = {
	//"美拍"传递的参数,
	25: {
		size: 1024 * 1024 * 300,
		durationMin: 3,
		durationMax: 5 * 60,
		accept: '.mp4,.mov',
		weibo_type: 25,
	},
	//"秒拍"
	24: {
		size: 1024 * 1024 * 300,
		durationMin: 3,
		durationMax: 15 * 60,
		accept: '.mp4,.mov',
		weibo_type: 24,
	},
	//“快手”
	103: {
		size: 1024 * 1024 * 300,
		durationMin: 3,
		durationMax: 57,
		accept: '.mp4,.mov',
		weibo_type: 103,
	},
	//抖音
	115: {
		size: 1024 * 1024 * 300,
		durationMin: 3,
		durationMax: 15,
		accept: '.mp4,.mov',
		weibo_type: 115,
	}
}
