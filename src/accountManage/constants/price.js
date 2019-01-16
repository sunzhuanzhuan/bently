const priceKeys = {
	'key1': '直发报价1',
	'key2': '转发报价2',
	'key3': '发布报价3',
	'key4': '测试报价4',
	'key5': '未知报价5'
}

export const priceTitle = {
	'1': {
		title: '报价含税',
		desc: '含税的报价'
	},
	'2': {
		title: '报价不含税，提供发票',
		desc: '不含税的报价，微播易会自动算出含税的订单收入'
	},
	'3': {
		title: '报价不含税，不提供发票',
		desc: '不含税的报价，该价格即到手的订单收入.'
	}
}
const platformToPriceKeys = [
	{
		'platform': ['1', '2'],
		'priceKeys': {
			'famous': ['key1', 'key2', 'key4'], //预约
			'nameless': ['key1', 'key4'] // 派单
		}
	},
	{
		'platform': ['9'],
		'priceKeys': {
			'famous': ['key3', 'key4', 'key5'],
			'nameless': ['key1', 'key2']
		}
	}
]
export const priceKeysMap = platformToPriceKeys.reduce((obj, item) => {
	let _price = {}
	_price.famous = item['priceKeys']['famous'].map(key => ({ key: key, name: priceKeys[key] }))
	_price.nameless = item['priceKeys']['nameless'].map(key => ({ key: key, name: priceKeys[key] }))
	item['platform'].reduce((obj, item) => {
		obj[item] = _price
		return obj
	}, obj)
	return obj
}, {})

