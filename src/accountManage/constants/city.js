const citySource = [
	{
		"area_id": 1010101,
		"area_name": "北京",
		"area_level": 3
	},
	{
		"area_id": 1010201,
		"area_name": "安庆",
		"area_level": 3
	},
	{
		"area_id": 1010202,
		"area_name": "蚌埠",
		"area_level": 3
	},
	{
		"area_id": 1010203,
		"area_name": "巢湖",
		"area_level": 3
	},
	{
		"area_id": 1010204,
		"area_name": "池州",
		"area_level": 3
	},
	{
		"area_id": 1010205,
		"area_name": "滁州",
		"area_level": 3
	},
	{
		"area_id": 1010206,
		"area_name": "阜阳",
		"area_level": 3
	},
	{
		"area_id": 1010207,
		"area_name": "淮北",
		"area_level": 3
	},
	{
		"area_id": 1010208,
		"area_name": "淮南",
		"area_level": 3
	},
	{
		"area_id": 1010209,
		"area_name": "黄山",
		"area_level": 3
	},
	{
		"area_id": 1010210,
		"area_name": "六安",
		"area_level": 3
	},
	{
		"area_id": 1010211,
		"area_name": "马鞍山",
		"area_level": 3
	},
	{
		"area_id": 1010212,
		"area_name": "宿州",
		"area_level": 3
	},
	{
		"area_id": 1010213,
		"area_name": "铜陵",
		"area_level": 3
	},
	{
		"area_id": 1010214,
		"area_name": "芜湖",
		"area_level": 3
	},
	{
		"area_id": 1010215,
		"area_name": "宣城",
		"area_level": 3
	},
	{
		"area_id": 1010216,
		"area_name": "亳州",
		"area_level": 3
	},
	{
		"area_id": 1010217,
		"area_name": "合肥",
		"area_level": 3
	},
	{
		"area_id": 1010301,
		"area_name": "福州",
		"area_level": 3
	},
	{
		"area_id": 1010302,
		"area_name": "龙岩",
		"area_level": 3
	},
	{
		"area_id": 1010303,
		"area_name": "南平",
		"area_level": 3
	},
	{
		"area_id": 1010304,
		"area_name": "宁德",
		"area_level": 3
	},
	{
		"area_id": 1010305,
		"area_name": "莆田",
		"area_level": 3
	},
	{
		"area_id": 1010306,
		"area_name": "泉州",
		"area_level": 3
	},
	{
		"area_id": 1010307,
		"area_name": "三明",
		"area_level": 3
	},
	{
		"area_id": 1010308,
		"area_name": "厦门",
		"area_level": 3
	},
	{
		"area_id": 1010309,
		"area_name": "漳州",
		"area_level": 3
	},
	{
		"area_id": 1010401,
		"area_name": "兰州",
		"area_level": 3
	},
	{
		"area_id": 1010402,
		"area_name": "白银",
		"area_level": 3
	},
	{
		"area_id": 1010403,
		"area_name": "定西",
		"area_level": 3
	},
	{
		"area_id": 1010404,
		"area_name": "甘南",
		"area_level": 3
	},
	{
		"area_id": 1010405,
		"area_name": "嘉峪关",
		"area_level": 3
	},
	{
		"area_id": 1010406,
		"area_name": "金昌",
		"area_level": 3
	},
	{
		"area_id": 1010407,
		"area_name": "酒泉",
		"area_level": 3
	},
	{
		"area_id": 1010408,
		"area_name": "临夏",
		"area_level": 3
	},
	{
		"area_id": 1010409,
		"area_name": "陇南",
		"area_level": 3
	},
	{
		"area_id": 1010410,
		"area_name": "平凉",
		"area_level": 3
	},
	{
		"area_id": 1010411,
		"area_name": "庆阳",
		"area_level": 3
	},
	{
		"area_id": 1010412,
		"area_name": "天水",
		"area_level": 3
	},
	{
		"area_id": 1010413,
		"area_name": "武威",
		"area_level": 3
	},
	{
		"area_id": 1010414,
		"area_name": "张掖",
		"area_level": 3
	},
	{
		"area_id": 1010501,
		"area_name": "广州",
		"area_level": 3
	},
	{
		"area_id": 1010502,
		"area_name": "深圳",
		"area_level": 3
	},
	{
		"area_id": 1010503,
		"area_name": "潮州",
		"area_level": 3
	},
	{
		"area_id": 1010504,
		"area_name": "东莞",
		"area_level": 3
	},
	{
		"area_id": 1010505,
		"area_name": "佛山",
		"area_level": 3
	},
	{
		"area_id": 1010506,
		"area_name": "河源",
		"area_level": 3
	},
	{
		"area_id": 1010507,
		"area_name": "惠州",
		"area_level": 3
	},
	{
		"area_id": 1010508,
		"area_name": "江门",
		"area_level": 3
	},
	{
		"area_id": 1010509,
		"area_name": "揭阳",
		"area_level": 3
	},
	{
		"area_id": 1010510,
		"area_name": "茂名",
		"area_level": 3
	},
	{
		"area_id": 1010511,
		"area_name": "梅州",
		"area_level": 3
	},
	{
		"area_id": 1010512,
		"area_name": "清远",
		"area_level": 3
	},
	{
		"area_id": 1010513,
		"area_name": "汕头",
		"area_level": 3
	},
	{
		"area_id": 1010514,
		"area_name": "汕尾",
		"area_level": 3
	},
	{
		"area_id": 1010515,
		"area_name": "韶关",
		"area_level": 3
	},
	{
		"area_id": 1010516,
		"area_name": "阳江",
		"area_level": 3
	},
	{
		"area_id": 1010517,
		"area_name": "云浮",
		"area_level": 3
	},
	{
		"area_id": 1010518,
		"area_name": "湛江",
		"area_level": 3
	},
	{
		"area_id": 1010519,
		"area_name": "肇庆",
		"area_level": 3
	},
	{
		"area_id": 1010520,
		"area_name": "中山",
		"area_level": 3
	},
	{
		"area_id": 1010521,
		"area_name": "珠海",
		"area_level": 3
	},
	{
		"area_id": 1010601,
		"area_name": "南宁",
		"area_level": 3
	},
	{
		"area_id": 1010602,
		"area_name": "桂林",
		"area_level": 3
	},
	{
		"area_id": 1010603,
		"area_name": "百色",
		"area_level": 3
	},
	{
		"area_id": 1010604,
		"area_name": "北海",
		"area_level": 3
	},
	{
		"area_id": 1010605,
		"area_name": "崇左",
		"area_level": 3
	},
	{
		"area_id": 1010606,
		"area_name": "防城港",
		"area_level": 3
	},
	{
		"area_id": 1010607,
		"area_name": "贵港",
		"area_level": 3
	},
	{
		"area_id": 1010608,
		"area_name": "河池",
		"area_level": 3
	},
	{
		"area_id": 1010609,
		"area_name": "贺州",
		"area_level": 3
	},
	{
		"area_id": 1010610,
		"area_name": "来宾",
		"area_level": 3
	},
	{
		"area_id": 1010611,
		"area_name": "柳州",
		"area_level": 3
	},
	{
		"area_id": 1010612,
		"area_name": "钦州",
		"area_level": 3
	},
	{
		"area_id": 1010613,
		"area_name": "梧州",
		"area_level": 3
	},
	{
		"area_id": 1010614,
		"area_name": "玉林",
		"area_level": 3
	},
	{
		"area_id": 1010701,
		"area_name": "贵阳",
		"area_level": 3
	},
	{
		"area_id": 1010702,
		"area_name": "安顺",
		"area_level": 3
	},
	{
		"area_id": 1010703,
		"area_name": "毕节",
		"area_level": 3
	},
	{
		"area_id": 1010704,
		"area_name": "六盘水",
		"area_level": 3
	},
	{
		"area_id": 1010705,
		"area_name": "黔东南",
		"area_level": 3
	},
	{
		"area_id": 1010706,
		"area_name": "黔南",
		"area_level": 3
	},
	{
		"area_id": 1010707,
		"area_name": "黔西南",
		"area_level": 3
	},
	{
		"area_id": 1010708,
		"area_name": "铜仁",
		"area_level": 3
	},
	{
		"area_id": 1010709,
		"area_name": "遵义",
		"area_level": 3
	},
	{
		"area_id": 1010801,
		"area_name": "海口",
		"area_level": 3
	},
	{
		"area_id": 1010802,
		"area_name": "三亚",
		"area_level": 3
	},
	{
		"area_id": 1010803,
		"area_name": "白沙",
		"area_level": 3
	},
	{
		"area_id": 1010804,
		"area_name": "保亭",
		"area_level": 3
	},
	{
		"area_id": 1010805,
		"area_name": "昌江",
		"area_level": 3
	},
	{
		"area_id": 1010806,
		"area_name": "澄迈县",
		"area_level": 3
	},
	{
		"area_id": 1010807,
		"area_name": "定安县",
		"area_level": 3
	},
	{
		"area_id": 1010808,
		"area_name": "东方",
		"area_level": 3
	},
	{
		"area_id": 1010809,
		"area_name": "乐东",
		"area_level": 3
	},
	{
		"area_id": 1010810,
		"area_name": "临高县",
		"area_level": 3
	},
	{
		"area_id": 1010811,
		"area_name": "陵水",
		"area_level": 3
	},
	{
		"area_id": 1010812,
		"area_name": "琼海",
		"area_level": 3
	},
	{
		"area_id": 1010813,
		"area_name": "琼中",
		"area_level": 3
	},
	{
		"area_id": 1010814,
		"area_name": "屯昌县",
		"area_level": 3
	},
	{
		"area_id": 1010815,
		"area_name": "万宁",
		"area_level": 3
	},
	{
		"area_id": 1010816,
		"area_name": "文昌",
		"area_level": 3
	},
	{
		"area_id": 1010817,
		"area_name": "五指山",
		"area_level": 3
	},
	{
		"area_id": 1010818,
		"area_name": "儋州",
		"area_level": 3
	},
	{
		"area_id": 1010901,
		"area_name": "石家庄",
		"area_level": 3
	},
	{
		"area_id": 1010902,
		"area_name": "保定",
		"area_level": 3
	},
	{
		"area_id": 1010903,
		"area_name": "沧州",
		"area_level": 3
	},
	{
		"area_id": 1010904,
		"area_name": "承德",
		"area_level": 3
	},
	{
		"area_id": 1010905,
		"area_name": "邯郸",
		"area_level": 3
	},
	{
		"area_id": 1010906,
		"area_name": "衡水",
		"area_level": 3
	},
	{
		"area_id": 1010907,
		"area_name": "廊坊",
		"area_level": 3
	},
	{
		"area_id": 1010908,
		"area_name": "秦皇岛",
		"area_level": 3
	},
	{
		"area_id": 1010909,
		"area_name": "唐山",
		"area_level": 3
	},
	{
		"area_id": 1010910,
		"area_name": "邢台",
		"area_level": 3
	},
	{
		"area_id": 1010911,
		"area_name": "张家口",
		"area_level": 3
	},
	{
		"area_id": 1011001,
		"area_name": "郑州",
		"area_level": 3
	},
	{
		"area_id": 1011002,
		"area_name": "洛阳",
		"area_level": 3
	},
	{
		"area_id": 1011003,
		"area_name": "开封",
		"area_level": 3
	},
	{
		"area_id": 1011004,
		"area_name": "安阳",
		"area_level": 3
	},
	{
		"area_id": 1011005,
		"area_name": "鹤壁",
		"area_level": 3
	},
	{
		"area_id": 1011006,
		"area_name": "济源",
		"area_level": 3
	},
	{
		"area_id": 1011007,
		"area_name": "焦作",
		"area_level": 3
	},
	{
		"area_id": 1011008,
		"area_name": "南阳",
		"area_level": 3
	},
	{
		"area_id": 1011009,
		"area_name": "平顶山",
		"area_level": 3
	},
	{
		"area_id": 1011010,
		"area_name": "三门峡",
		"area_level": 3
	},
	{
		"area_id": 1011011,
		"area_name": "商丘",
		"area_level": 3
	},
	{
		"area_id": 1011012,
		"area_name": "新乡",
		"area_level": 3
	},
	{
		"area_id": 1011013,
		"area_name": "信阳",
		"area_level": 3
	},
	{
		"area_id": 1011014,
		"area_name": "许昌",
		"area_level": 3
	},
	{
		"area_id": 1011015,
		"area_name": "周口",
		"area_level": 3
	},
	{
		"area_id": 1011016,
		"area_name": "驻马店",
		"area_level": 3
	},
	{
		"area_id": 1011017,
		"area_name": "漯河",
		"area_level": 3
	},
	{
		"area_id": 1011018,
		"area_name": "濮阳",
		"area_level": 3
	},
	{
		"area_id": 1011101,
		"area_name": "哈尔滨",
		"area_level": 3
	},
	{
		"area_id": 1011102,
		"area_name": "大庆",
		"area_level": 3
	},
	{
		"area_id": 1011103,
		"area_name": "大兴安岭",
		"area_level": 3
	},
	{
		"area_id": 1011104,
		"area_name": "鹤岗",
		"area_level": 3
	},
	{
		"area_id": 1011105,
		"area_name": "黑河",
		"area_level": 3
	},
	{
		"area_id": 1011106,
		"area_name": "鸡西",
		"area_level": 3
	},
	{
		"area_id": 1011107,
		"area_name": "佳木斯",
		"area_level": 3
	},
	{
		"area_id": 1011108,
		"area_name": "牡丹江",
		"area_level": 3
	},
	{
		"area_id": 1011109,
		"area_name": "七台河",
		"area_level": 3
	},
	{
		"area_id": 1011110,
		"area_name": "齐齐哈尔",
		"area_level": 3
	},
	{
		"area_id": 1011111,
		"area_name": "双鸭山",
		"area_level": 3
	},
	{
		"area_id": 1011112,
		"area_name": "绥化",
		"area_level": 3
	},
	{
		"area_id": 1011113,
		"area_name": "伊春",
		"area_level": 3
	},
	{
		"area_id": 1011201,
		"area_name": "武汉",
		"area_level": 3
	},
	{
		"area_id": 1011202,
		"area_name": "仙桃",
		"area_level": 3
	},
	{
		"area_id": 1011203,
		"area_name": "鄂州",
		"area_level": 3
	},
	{
		"area_id": 1011204,
		"area_name": "黄冈",
		"area_level": 3
	},
	{
		"area_id": 1011205,
		"area_name": "黄石",
		"area_level": 3
	},
	{
		"area_id": 1011206,
		"area_name": "荆门",
		"area_level": 3
	},
	{
		"area_id": 1011207,
		"area_name": "荆州",
		"area_level": 3
	},
	{
		"area_id": 1011208,
		"area_name": "潜江",
		"area_level": 3
	},
	{
		"area_id": 1011209,
		"area_name": "神农架林区",
		"area_level": 3
	},
	{
		"area_id": 1011210,
		"area_name": "十堰",
		"area_level": 3
	},
	{
		"area_id": 1011211,
		"area_name": "随州",
		"area_level": 3
	},
	{
		"area_id": 1011212,
		"area_name": "天门",
		"area_level": 3
	},
	{
		"area_id": 1011213,
		"area_name": "咸宁",
		"area_level": 3
	},
	{
		"area_id": 1011214,
		"area_name": "襄樊",
		"area_level": 3
	},
	{
		"area_id": 1011215,
		"area_name": "孝感",
		"area_level": 3
	},
	{
		"area_id": 1011216,
		"area_name": "宜昌",
		"area_level": 3
	},
	{
		"area_id": 1011217,
		"area_name": "恩施",
		"area_level": 3
	},
	{
		"area_id": 1011301,
		"area_name": "长沙",
		"area_level": 3
	},
	{
		"area_id": 1011302,
		"area_name": "张家界",
		"area_level": 3
	},
	{
		"area_id": 1011303,
		"area_name": "常德",
		"area_level": 3
	},
	{
		"area_id": 1011304,
		"area_name": "郴州",
		"area_level": 3
	},
	{
		"area_id": 1011305,
		"area_name": "衡阳",
		"area_level": 3
	},
	{
		"area_id": 1011306,
		"area_name": "怀化",
		"area_level": 3
	},
	{
		"area_id": 1011307,
		"area_name": "娄底",
		"area_level": 3
	},
	{
		"area_id": 1011308,
		"area_name": "邵阳",
		"area_level": 3
	},
	{
		"area_id": 1011309,
		"area_name": "湘潭",
		"area_level": 3
	},
	{
		"area_id": 1011310,
		"area_name": "湘西",
		"area_level": 3
	},
	{
		"area_id": 1011311,
		"area_name": "益阳",
		"area_level": 3
	},
	{
		"area_id": 1011312,
		"area_name": "永州",
		"area_level": 3
	},
	{
		"area_id": 1011313,
		"area_name": "岳阳",
		"area_level": 3
	},
	{
		"area_id": 1011314,
		"area_name": "株洲",
		"area_level": 3
	},
	{
		"area_id": 1011401,
		"area_name": "长春",
		"area_level": 3
	},
	{
		"area_id": 1011402,
		"area_name": "吉林",
		"area_level": 3
	},
	{
		"area_id": 1011403,
		"area_name": "白城",
		"area_level": 3
	},
	{
		"area_id": 1011404,
		"area_name": "白山",
		"area_level": 3
	},
	{
		"area_id": 1011405,
		"area_name": "辽源",
		"area_level": 3
	},
	{
		"area_id": 1011406,
		"area_name": "四平",
		"area_level": 3
	},
	{
		"area_id": 1011407,
		"area_name": "松原",
		"area_level": 3
	},
	{
		"area_id": 1011408,
		"area_name": "通化",
		"area_level": 3
	},
	{
		"area_id": 1011409,
		"area_name": "延边",
		"area_level": 3
	},
	{
		"area_id": 1011501,
		"area_name": "南京",
		"area_level": 3
	},
	{
		"area_id": 1011502,
		"area_name": "苏州",
		"area_level": 3
	},
	{
		"area_id": 1011503,
		"area_name": "无锡",
		"area_level": 3
	},
	{
		"area_id": 1011504,
		"area_name": "常州",
		"area_level": 3
	},
	{
		"area_id": 1011505,
		"area_name": "淮安",
		"area_level": 3
	},
	{
		"area_id": 1011506,
		"area_name": "连云港",
		"area_level": 3
	},
	{
		"area_id": 1011507,
		"area_name": "南通",
		"area_level": 3
	},
	{
		"area_id": 1011508,
		"area_name": "宿迁",
		"area_level": 3
	},
	{
		"area_id": 1011509,
		"area_name": "泰州",
		"area_level": 3
	},
	{
		"area_id": 1011510,
		"area_name": "徐州",
		"area_level": 3
	},
	{
		"area_id": 1011511,
		"area_name": "盐城",
		"area_level": 3
	},
	{
		"area_id": 1011512,
		"area_name": "扬州",
		"area_level": 3
	},
	{
		"area_id": 1011513,
		"area_name": "镇江",
		"area_level": 3
	},
	{
		"area_id": 1011601,
		"area_name": "南昌",
		"area_level": 3
	},
	{
		"area_id": 1011602,
		"area_name": "抚州",
		"area_level": 3
	},
	{
		"area_id": 1011603,
		"area_name": "赣州",
		"area_level": 3
	},
	{
		"area_id": 1011604,
		"area_name": "吉安",
		"area_level": 3
	},
	{
		"area_id": 1011605,
		"area_name": "景德镇",
		"area_level": 3
	},
	{
		"area_id": 1011606,
		"area_name": "九江",
		"area_level": 3
	},
	{
		"area_id": 1011607,
		"area_name": "萍乡",
		"area_level": 3
	},
	{
		"area_id": 1011608,
		"area_name": "上饶",
		"area_level": 3
	},
	{
		"area_id": 1011609,
		"area_name": "新余",
		"area_level": 3
	},
	{
		"area_id": 1011610,
		"area_name": "宜春",
		"area_level": 3
	},
	{
		"area_id": 1011611,
		"area_name": "鹰潭",
		"area_level": 3
	},
	{
		"area_id": 1011701,
		"area_name": "沈阳",
		"area_level": 3
	},
	{
		"area_id": 1011702,
		"area_name": "大连",
		"area_level": 3
	},
	{
		"area_id": 1011703,
		"area_name": "鞍山",
		"area_level": 3
	},
	{
		"area_id": 1011704,
		"area_name": "本溪",
		"area_level": 3
	},
	{
		"area_id": 1011705,
		"area_name": "朝阳",
		"area_level": 3
	},
	{
		"area_id": 1011706,
		"area_name": "丹东",
		"area_level": 3
	},
	{
		"area_id": 1011707,
		"area_name": "抚顺",
		"area_level": 3
	},
	{
		"area_id": 1011708,
		"area_name": "阜新",
		"area_level": 3
	},
	{
		"area_id": 1011709,
		"area_name": "葫芦岛",
		"area_level": 3
	},
	{
		"area_id": 1011710,
		"area_name": "锦州",
		"area_level": 3
	},
	{
		"area_id": 1011711,
		"area_name": "辽阳",
		"area_level": 3
	},
	{
		"area_id": 1011712,
		"area_name": "盘锦",
		"area_level": 3
	},
	{
		"area_id": 1011713,
		"area_name": "铁岭",
		"area_level": 3
	},
	{
		"area_id": 1011714,
		"area_name": "营口",
		"area_level": 3
	},
	{
		"area_id": 1011801,
		"area_name": "呼和浩特",
		"area_level": 3
	},
	{
		"area_id": 1011802,
		"area_name": "阿拉善盟",
		"area_level": 3
	},
	{
		"area_id": 1011803,
		"area_name": "巴彦淖尔盟",
		"area_level": 3
	},
	{
		"area_id": 1011804,
		"area_name": "包头",
		"area_level": 3
	},
	{
		"area_id": 1011805,
		"area_name": "赤峰",
		"area_level": 3
	},
	{
		"area_id": 1011806,
		"area_name": "鄂尔多斯",
		"area_level": 3
	},
	{
		"area_id": 1011807,
		"area_name": "呼伦贝尔",
		"area_level": 3
	},
	{
		"area_id": 1011808,
		"area_name": "通辽",
		"area_level": 3
	},
	{
		"area_id": 1011809,
		"area_name": "乌海",
		"area_level": 3
	},
	{
		"area_id": 1011810,
		"area_name": "乌兰察布市",
		"area_level": 3
	},
	{
		"area_id": 1011811,
		"area_name": "锡林郭勒盟",
		"area_level": 3
	},
	{
		"area_id": 1011812,
		"area_name": "兴安盟",
		"area_level": 3
	},
	{
		"area_id": 1011901,
		"area_name": "银川",
		"area_level": 3
	},
	{
		"area_id": 1011902,
		"area_name": "固原",
		"area_level": 3
	},
	{
		"area_id": 1011903,
		"area_name": "石嘴山",
		"area_level": 3
	},
	{
		"area_id": 1011904,
		"area_name": "吴忠",
		"area_level": 3
	},
	{
		"area_id": 1011905,
		"area_name": "中卫",
		"area_level": 3
	},
	{
		"area_id": 1012001,
		"area_name": "西宁",
		"area_level": 3
	},
	{
		"area_id": 1012002,
		"area_name": "果洛",
		"area_level": 3
	},
	{
		"area_id": 1012003,
		"area_name": "海北",
		"area_level": 3
	},
	{
		"area_id": 1012004,
		"area_name": "海东",
		"area_level": 3
	},
	{
		"area_id": 1012005,
		"area_name": "海南",
		"area_level": 3
	},
	{
		"area_id": 1012006,
		"area_name": "海西",
		"area_level": 3
	},
	{
		"area_id": 1012007,
		"area_name": "黄南",
		"area_level": 3
	},
	{
		"area_id": 1012008,
		"area_name": "玉树",
		"area_level": 3
	},
	{
		"area_id": 1012101,
		"area_name": "济南",
		"area_level": 3
	},
	{
		"area_id": 1012102,
		"area_name": "青岛",
		"area_level": 3
	},
	{
		"area_id": 1012103,
		"area_name": "滨州",
		"area_level": 3
	},
	{
		"area_id": 1012104,
		"area_name": "德州",
		"area_level": 3
	},
	{
		"area_id": 1012105,
		"area_name": "东营",
		"area_level": 3
	},
	{
		"area_id": 1012106,
		"area_name": "菏泽",
		"area_level": 3
	},
	{
		"area_id": 1012107,
		"area_name": "济宁",
		"area_level": 3
	},
	{
		"area_id": 1012108,
		"area_name": "莱芜",
		"area_level": 3
	},
	{
		"area_id": 1012109,
		"area_name": "聊城",
		"area_level": 3
	},
	{
		"area_id": 1012110,
		"area_name": "临沂",
		"area_level": 3
	},
	{
		"area_id": 1012111,
		"area_name": "日照",
		"area_level": 3
	},
	{
		"area_id": 1012112,
		"area_name": "泰安",
		"area_level": 3
	},
	{
		"area_id": 1012113,
		"area_name": "威海",
		"area_level": 3
	},
	{
		"area_id": 1012114,
		"area_name": "潍坊",
		"area_level": 3
	},
	{
		"area_id": 1012115,
		"area_name": "烟台",
		"area_level": 3
	},
	{
		"area_id": 1012116,
		"area_name": "枣庄",
		"area_level": 3
	},
	{
		"area_id": 1012117,
		"area_name": "淄博",
		"area_level": 3
	},
	{
		"area_id": 1012201,
		"area_name": "太原",
		"area_level": 3
	},
	{
		"area_id": 1012202,
		"area_name": "长治",
		"area_level": 3
	},
	{
		"area_id": 1012203,
		"area_name": "大同",
		"area_level": 3
	},
	{
		"area_id": 1012204,
		"area_name": "晋城",
		"area_level": 3
	},
	{
		"area_id": 1012205,
		"area_name": "晋中",
		"area_level": 3
	},
	{
		"area_id": 1012206,
		"area_name": "临汾",
		"area_level": 3
	},
	{
		"area_id": 1012207,
		"area_name": "吕梁",
		"area_level": 3
	},
	{
		"area_id": 1012208,
		"area_name": "朔州",
		"area_level": 3
	},
	{
		"area_id": 1012209,
		"area_name": "忻州",
		"area_level": 3
	},
	{
		"area_id": 1012210,
		"area_name": "阳泉",
		"area_level": 3
	},
	{
		"area_id": 1012211,
		"area_name": "运城",
		"area_level": 3
	},
	{
		"area_id": 1012301,
		"area_name": "西安",
		"area_level": 3
	},
	{
		"area_id": 1012302,
		"area_name": "安康",
		"area_level": 3
	},
	{
		"area_id": 1012303,
		"area_name": "宝鸡",
		"area_level": 3
	},
	{
		"area_id": 1012304,
		"area_name": "汉中",
		"area_level": 3
	},
	{
		"area_id": 1012305,
		"area_name": "商洛",
		"area_level": 3
	},
	{
		"area_id": 1012306,
		"area_name": "铜川",
		"area_level": 3
	},
	{
		"area_id": 1012307,
		"area_name": "渭南",
		"area_level": 3
	},
	{
		"area_id": 1012308,
		"area_name": "咸阳",
		"area_level": 3
	},
	{
		"area_id": 1012309,
		"area_name": "延安",
		"area_level": 3
	},
	{
		"area_id": 1012310,
		"area_name": "榆林",
		"area_level": 3
	},
	{
		"area_id": 1012401,
		"area_name": "上海",
		"area_level": 3
	},
	{
		"area_id": 1012501,
		"area_name": "成都",
		"area_level": 3
	},
	{
		"area_id": 1012502,
		"area_name": "绵阳",
		"area_level": 3
	},
	{
		"area_id": 1012503,
		"area_name": "阿坝",
		"area_level": 3
	},
	{
		"area_id": 1012504,
		"area_name": "巴中",
		"area_level": 3
	},
	{
		"area_id": 1012505,
		"area_name": "达州",
		"area_level": 3
	},
	{
		"area_id": 1012506,
		"area_name": "德阳",
		"area_level": 3
	},
	{
		"area_id": 1012507,
		"area_name": "甘孜",
		"area_level": 3
	},
	{
		"area_id": 1012508,
		"area_name": "广安",
		"area_level": 3
	},
	{
		"area_id": 1012509,
		"area_name": "广元",
		"area_level": 3
	},
	{
		"area_id": 1012510,
		"area_name": "乐山",
		"area_level": 3
	},
	{
		"area_id": 1012511,
		"area_name": "凉山",
		"area_level": 3
	},
	{
		"area_id": 1012512,
		"area_name": "眉山",
		"area_level": 3
	},
	{
		"area_id": 1012513,
		"area_name": "南充",
		"area_level": 3
	},
	{
		"area_id": 1012514,
		"area_name": "内江",
		"area_level": 3
	},
	{
		"area_id": 1012515,
		"area_name": "攀枝花",
		"area_level": 3
	},
	{
		"area_id": 1012516,
		"area_name": "遂宁",
		"area_level": 3
	},
	{
		"area_id": 1012517,
		"area_name": "雅安",
		"area_level": 3
	},
	{
		"area_id": 1012518,
		"area_name": "宜宾",
		"area_level": 3
	},
	{
		"area_id": 1012519,
		"area_name": "资阳",
		"area_level": 3
	},
	{
		"area_id": 1012520,
		"area_name": "自贡",
		"area_level": 3
	},
	{
		"area_id": 1012521,
		"area_name": "泸州",
		"area_level": 3
	},
	{
		"area_id": 1012601,
		"area_name": "天津",
		"area_level": 3
	},
	{
		"area_id": 1012701,
		"area_name": "拉萨",
		"area_level": 3
	},
	{
		"area_id": 1012702,
		"area_name": "阿里",
		"area_level": 3
	},
	{
		"area_id": 1012703,
		"area_name": "昌都",
		"area_level": 3
	},
	{
		"area_id": 1012704,
		"area_name": "林芝",
		"area_level": 3
	},
	{
		"area_id": 1012705,
		"area_name": "那曲",
		"area_level": 3
	},
	{
		"area_id": 1012706,
		"area_name": "日喀则",
		"area_level": 3
	},
	{
		"area_id": 1012707,
		"area_name": "山南",
		"area_level": 3
	},
	{
		"area_id": 1012801,
		"area_name": "乌鲁木齐",
		"area_level": 3
	},
	{
		"area_id": 1012802,
		"area_name": "阿克苏",
		"area_level": 3
	},
	{
		"area_id": 1012803,
		"area_name": "阿拉尔",
		"area_level": 3
	},
	{
		"area_id": 1012804,
		"area_name": "巴音郭楞",
		"area_level": 3
	},
	{
		"area_id": 1012805,
		"area_name": "博尔塔拉",
		"area_level": 3
	},
	{
		"area_id": 1012806,
		"area_name": "昌吉",
		"area_level": 3
	},
	{
		"area_id": 1012807,
		"area_name": "哈密",
		"area_level": 3
	},
	{
		"area_id": 1012808,
		"area_name": "和田",
		"area_level": 3
	},
	{
		"area_id": 1012809,
		"area_name": "喀什",
		"area_level": 3
	},
	{
		"area_id": 1012810,
		"area_name": "克拉玛依",
		"area_level": 3
	},
	{
		"area_id": 1012811,
		"area_name": "克孜勒苏",
		"area_level": 3
	},
	{
		"area_id": 1012812,
		"area_name": "石河子",
		"area_level": 3
	},
	{
		"area_id": 1012813,
		"area_name": "图木舒克",
		"area_level": 3
	},
	{
		"area_id": 1012814,
		"area_name": "吐鲁番",
		"area_level": 3
	},
	{
		"area_id": 1012815,
		"area_name": "五家渠",
		"area_level": 3
	},
	{
		"area_id": 1012816,
		"area_name": "伊犁",
		"area_level": 3
	},
	{
		"area_id": 1012901,
		"area_name": "昆明",
		"area_level": 3
	},
	{
		"area_id": 1012902,
		"area_name": "怒江",
		"area_level": 3
	},
	{
		"area_id": 1012903,
		"area_name": "普洱",
		"area_level": 3
	},
	{
		"area_id": 1012904,
		"area_name": "丽江",
		"area_level": 3
	},
	{
		"area_id": 1012905,
		"area_name": "保山",
		"area_level": 3
	},
	{
		"area_id": 1012906,
		"area_name": "楚雄",
		"area_level": 3
	},
	{
		"area_id": 1012907,
		"area_name": "大理",
		"area_level": 3
	},
	{
		"area_id": 1012908,
		"area_name": "德宏",
		"area_level": 3
	},
	{
		"area_id": 1012909,
		"area_name": "迪庆",
		"area_level": 3
	},
	{
		"area_id": 1012910,
		"area_name": "红河",
		"area_level": 3
	},
	{
		"area_id": 1012911,
		"area_name": "临沧",
		"area_level": 3
	},
	{
		"area_id": 1012912,
		"area_name": "曲靖",
		"area_level": 3
	},
	{
		"area_id": 1012913,
		"area_name": "文山",
		"area_level": 3
	},
	{
		"area_id": 1012914,
		"area_name": "西双版纳",
		"area_level": 3
	},
	{
		"area_id": 1012915,
		"area_name": "玉溪",
		"area_level": 3
	},
	{
		"area_id": 1012916,
		"area_name": "昭通",
		"area_level": 3
	},
	{
		"area_id": 1013001,
		"area_name": "杭州",
		"area_level": 3
	},
	{
		"area_id": 1013002,
		"area_name": "湖州",
		"area_level": 3
	},
	{
		"area_id": 1013003,
		"area_name": "嘉兴",
		"area_level": 3
	},
	{
		"area_id": 1013004,
		"area_name": "金华",
		"area_level": 3
	},
	{
		"area_id": 1013005,
		"area_name": "丽水",
		"area_level": 3
	},
	{
		"area_id": 1013006,
		"area_name": "宁波",
		"area_level": 3
	},
	{
		"area_id": 1013007,
		"area_name": "绍兴",
		"area_level": 3
	},
	{
		"area_id": 1013008,
		"area_name": "台州",
		"area_level": 3
	},
	{
		"area_id": 1013009,
		"area_name": "温州",
		"area_level": 3
	},
	{
		"area_id": 1013010,
		"area_name": "舟山",
		"area_level": 3
	},
	{
		"area_id": 1013011,
		"area_name": "衢州",
		"area_level": 3
	},
	{
		"area_id": 1013101,
		"area_name": "重庆",
		"area_level": 3
	},
	{
		"area_id": 1013201,
		"area_name": "香港",
		"area_level": 3
	},
	{
		"area_id": 1013301,
		"area_name": "澳门",
		"area_level": 3
	},
	{
		"area_id": 1013401,
		"area_name": "台湾",
		"area_level": 3
	}
]
export const cityMap = citySource.reduce((obj, item) => {
	obj[item['area_id']] = item['area_name']
	return obj
}, {})
