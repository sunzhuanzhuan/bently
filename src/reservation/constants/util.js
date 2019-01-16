// 处理字符串-转变成英文,隔开的字符串
export function transformCommaString(string) {
	let strings = string.replace(/[^(\d,，\s)]/g, "").replace(/\s+|，\s*/g, ',').replace(/,+/g, ',')
	if (strings == ",") {
		return ""
	} else {
		if (strings.charAt(0) == ",") {
			strings = strings.substr(1, strings.length)
		}
		if (strings.charAt(strings.length - 1) == ",") {
			strings = strings.substr(0, strings.length - 1)
		}
		return strings
	}
}
