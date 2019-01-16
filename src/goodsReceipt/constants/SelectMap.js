export const grOrderStatusMap = {
	"0": "全部",
	"1": "草稿",
	"2": "已作废",
	"3": "待内审",
	"4": "已作废",
	"5": "内审通过，待提交品牌方审核",
	"6": "内审被拒",
	"7": "待品牌方审核",
	"8": "GR完成",
	"9": "品牌方审核被拒"
}
export const grOrderStatusList = Object.entries(grOrderStatusMap).map(
	([value, name]) => ({
		value,
		name
	})).filter(one => one.value != 4)
export const applystateGR = {
	"0": "",
	"1": "可申请GR",
	"2": "不可申请GR",
	"3": "GR申请审核中",
	"4": "GR申请审核通过"
}
export const applyStateGRArr = [
	{ value: "0", name: "全部" },
	{ value: "1", name: "可申请GR" },
	{ value: "2", name: "不可申请GR" },
	{ value: "3", name: "GR申请审核中" },
	{ value: "4", name: "GR申请审核通过" }
]
export const timeSelect = [
	{ name: "创建时间", value: "1" },
	{ name: "提交时间", value: "2" },
	{ name: "内审审核时间", value: "3" },
	{ name: "品牌方审核时间", value: "4" }
]
export const currentType = [
	{ value: "0", name: "全部" },
	{ value: "1", name: "人民币" },
	{ value: "2", name: "美元" }
]

export default {
	grOrderStatusList,
	grOrderStatusMap,
	applystateGR,
	applyStateGRArr,
	timeSelect,
	currentType
}
