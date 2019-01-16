
export const getQuoteNumber = (value) => {
	if (value) {
		if (value > 99) {
			const valueNew = Math.ceil(value / 100) * 100
			return valueNew.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
		}
		else if (value > 9) {
			const valueNew = Math.ceil(value / 10) * 10
			return valueNew.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
		} else {
			const valueNew = value
			return valueNew.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
		}
	} else {
		return "-"
	}


}
export const getUnitPrice = (value) => {
	if (value) {
		if (0 < value && value < 0.1) {
			return "不足0.1"
		} else {
			return value.toFixed(1)
		}
	} else {
		return "-"
	}
}
export const getWeixinAvg = (value) => {
	if (value) {
		let unit = ""
		let valueTransform = value || 0
		if (value > 10000) {
			valueTransform = Math.round(value)
		}
		if (value > 100000) {
			unit = "+"
			valueTransform = 100000
		}
		valueTransform = valueTransform.toFixed(0).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
		if ((valueTransform.split(".")[1]) == 0) {
			valueTransform = valueTransform.split(".")[0]
		}
		return valueTransform + unit
	} else {
		return "-"
	}
}
export const getOtherAllAvg = (value) => {
	if (value) {
		let unit = ""
		let valueTransform = value || 0

		if (value > 10000) {
			unit = "万"
			valueTransform = value / 10000
		}
		if (value > 10000 * 10000) {
			unit = "亿"
			valueTransform = value / (10000 * 10000)
		}
		valueTransform = valueTransform.toFixed(0).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
		if ((valueTransform.split(".")[1]) == 0) {
			valueTransform = valueTransform.split(".")[0]
		}
		return valueTransform + unit
	} else {
		return "-"
	}
}
