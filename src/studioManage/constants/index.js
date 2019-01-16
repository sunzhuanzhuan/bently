import React from "react";
import { calcSum } from '../../util'
import numeral from "numeral";
export const studioConfigFunc = (handleStopStudio, handleStartStudio, history) => {
	return [
		{
			title: '工作室ID',
			dataIndex: 'id',
			key: 'id',
			align: 'center',
			width: 100,
			fixed: 'left'
		},
		{
			title: '状态',
			dataIndex: 'status_display',
			key: 'status_display',
			align: 'center',
			width: 120
		},
		{
			title: '名称',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			width: '244px',
			render: (text, { name }) => {
				if (name && name.length > 30) {
					return <div title={name}>
						{name.slice(0, 29) + '...'}
					</div>
				} else {
					return name
				}
			}
		},
		{
			title: '类型',
			dataIndex: 'type_display',
			key: 'type_display',
			align: 'center',
			width: 100
		},
		{
			title: '平台',
			dataIndex: 'supported_platforms_display',
			key: 'supported_platforms_display',
			align: 'center',
			width: 100
		},
		{
			title: '快易提',
			dataIndex: 'is_support_flash',
			key: 'is_support_flash',
			align: 'center',
			width: 120,
			render: (text) => {
				const value = text === 1 ? '支持' : '不支持';
				return value
			}
		},
		{
			title: '有效期',
			dataIndex: 'validity',
			key: 'validity',
			align: 'center',
			width: '300px',
			render: (text, record) => {
				return `${record.validity_start}~${record.validity_end}`
			}
		},
		{
			title: '支付方式',
			dataIndex: 'payment_type',
			key: 'payment_type',
			align: 'center',
			width: 140,
			render: (text, record) => {
				const isAlipay = record.is_support_alipay === 1;
				const isBank = record.payment_type_id !== 0;
				const value = isAlipay && isBank ? '支付宝&银行卡' : isAlipay ? '支付宝' : '银行卡';
				return value
			}
		},
		{
			title: '总限额',
			dataIndex: 'total_limit',
			key: 'total_limit',
			align: 'center',
			width: 140,
			render: (text) => {
				return numeral(text / 100).format('0,0.00');
			}
		},
		{
			title: '冻结额度',
			dataIndex: 'total_freeze',
			key: 'total_freeze',
			align: 'center',
			width: 140,
			render: (text) => {
				return numeral(text / 100).format('0,0.00');
			}
		},
		{
			title: '使用额度',
			dataIndex: 'total_occupy',
			key: 'total_occupy',
			align: 'center',
			width: 140,
			render: (text) => {
				return numeral(text / 100).format('0,0.00');
			}
		},
		{
			title: '剩余额度',
			dataIndex: 'total_residue',
			key: 'total_residue',
			align: 'center',
			width: 140,
			render: (text, record) => {
				const total_limit = parseFloat(record.total_limit / 100);
				const total_freeze = parseFloat(record.total_freeze / 100);
				const total_occupy = parseFloat(record.total_occupy / 100);
				const value = calcSum([total_limit, -total_freeze, -total_occupy]);
				return numeral(value).format('0,0.00');
			}
		},
		{
			title: '备注',
			dataIndex: 'remark',
			key: 'remark',
			align: 'center',
			width: '244px',
			render: (text, { remark }) => {
				if (remark && remark.length > 30) {
					return <div title={remark}>
						{remark.slice(0, 29) + '...'}
					</div>
				} else {
					return remark
				}
			}
		},
		{
			title: '修订时间',
			dataIndex: 'modified_at',
			key: 'modified_at',
			align: 'center',
			width: 160,
		},
		{
			title: '操作人',
			dataIndex: 'operator_real_name',
			key: 'operator_real_name',
			align: 'center',
			width: 100,
		},
		{
			title: '操作',
			dataIndex: 'action',
			key: 'action',
			align: 'center',
			width: 160,
			fixed: 'right',
			render: (Text, record) => {
				return <div>
					<a href='javascript:;' onClick={() => {
						history.push(`/studiomanage/new?postType=2&id=${record.id}&name=${record.name}`);
					}}>编辑</a>
					{record.status === 1 ? <a href='javascript:;' className='left-gap' onClick={() => {
						handleStopStudio(record);
					}}>停用</a> : null
					}
					{record.status === 0 || record.status === 2 ? <a href='javascript:;' className='left-gap' onClick={() => {
						handleStartStudio(record);
					}}>启用</a> : null}
					{/* <a href='javascript:;' className='left-gap'>使用详情</a> */}
				</div>
			}
		}
	]
}
export const detailConfig = [
	{
		title: '状态',
		dataIndex: 'source_status_display',
		key: 'source_status_display',
		align: 'center'
	},
	{
		title: '类型',
		dataIndex: 'source_type_display',
		key: 'source_type_display',
		align: 'center'
	},
	{
		title: '打款单ID',
		dataIndex: 'source_id',
		key: 'source_id',
		align: 'center',
		render: (text, record) => {
			return <a target='_blank' href={record.payment_link} >{text}</a>
		}
	},
	{
		title: '工作室ID',
		dataIndex: 'studio_id',
		key: 'studio_id',
		align: 'center',

	},
	{
		title: '工作室名称',
		dataIndex: 'name',
		key: 'name',
		align: 'center',

	},
	{
		title: '主账号名称',
		dataIndex: 'identity_name_list',
		key: 'identity_name_list',
		align: 'center',
		width: '244px',
		render: (text, { identity_name_list }) => {
			let nameList = identity_name_list.map((item, index) => {
				return index === identity_name_list.length - 1 ? item : item + ',';
			});
			if (nameList && nameList.length > 30) {
				return <div title={nameList}>
					{nameList.slice(0, 29) + '...'}
				</div>
			} else {
				return nameList
			}
		}
	},
	{
		title: '订单总金额',
		dataIndex: 'occupy_amount',
		key: 'occupy_amount',
		align: 'center',
		render: (text) => {
			return numeral(text / 100).format('0,0.00')
		}
	},
	{
		title: '提现时间',
		dataIndex: 'created_at',
		key: 'created_at',
		align: 'center'
	}
];
export const orderConfig = [
	{
		title: '状态',
		dataIndex: 'id',
		key: 'id',
		align: 'center',
		width: 100,
		fixed: 'left'
	},
	{
		title: '工作室ID',
		dataIndex: 'status',
		key: 'status',
		align: 'center'
	},
	{
		title: '工作室名称',
		dataIndex: 'user_id_count',
		key: 'user_id_count',
		align: 'center',
	},
	{
		title: '主账号名称',
		dataIndex: 'order_count',
		key: 'order_count',
		align: 'center',

	},
	{
		title: '订单ID',
		dataIndex: 'payment_amount',
		key: 'payment_amount',
		align: 'center',

	},
	{
		title: '订单名称',
		dataIndex: 'tax_amount',
		key: 'tax_amount',
		align: 'center',

	},
	{
		title: '订单总金额',
		dataIndex: 'admin_name',
		key: 'admin_name',
		align: 'center',
	},
	{
		title: '订单收入',
		dataIndex: 'created_time',
		key: 'created_time',
		align: 'center',
	},
	{
		title: '税收',
		dataIndex: 'tax',
		key: 'tax',
		align: 'center',
	}
];
export const bankList = {
	"7": {
		bankName: "招商银行",
		bankCode: "CMB",
		patterns: [{
			reg: /^(402658|410062|468203|512425|524011|622580|622588|622598|622609|95555|621286|621483|621485|621486|621299)\d{10}$/g,
			cardType: "DC"
		}, {
			reg: /^(690755)\d{9}$/g,
			cardType: "DC"
		}, {
			reg: /^(690755)\d{12}$/g,
			cardType: "DC"
		}, {
			reg: /^(356885|356886|356887|356888|356890|439188|439227|479228|479229|521302|356889|545620|545621|545947|545948|552534|552587|622575|622576|622577|622578|622579|545619|622581|622582|545623|628290|439225|518710|518718|628362|439226|628262|625802|625803)\d{10}$/g,
			cardType: "CC"
		}, {
			reg: /^(370285|370286|370287|370289)\d{9}$/g,
			cardType: "CC"
		}, {
			reg: /^(620520)\d{13}$/g,
			cardType: "PC"
		}]
	},
	"3": {
		bankName: "中国建设银行",
		bankCode: "CCB",
		patterns: [{
			reg: /^(621284|436742|589970|620060|621081|621467|621598|621621|621700|622280|622700|623211|623668)\d{13}$/g,
			cardType: "DC"
		}, {
			reg: /^(421349|434061|434062|524094|526410|552245|621080|621082|621466|621488|621499|622966|622988|622382|621487|621083|621084|620107)\d{10}$/g,
			cardType: "DC"
		}, {
			reg: /^(436742193|622280193)\d{10}$/g,
			cardType: "DC"
		}, {
			reg: /^(553242)\d{12}$/g,
			cardType: "CC"
		}, {
			reg: /^(625362|625363|628316|628317|356896|356899|356895|436718|436738|436745|436748|489592|531693|532450|532458|544887|552801|557080|558895|559051|622166|622168|622708|625964|625965|625966|628266|628366|622381|622675|622676|622677)\d{10}$/g,
			cardType: "CC"
		}, {
			reg: /^(5453242|5491031|5544033)\d{11}$/g,
			cardType: "CC"
		}, {
			reg: /^(622725|622728|436728|453242|491031|544033|622707|625955|625956)\d{10}$/g,
			cardType: "SCC"
		}, {
			reg: /^(53242|53243)\d{11}$/g,
			cardType: "SCC"
		}]
	}
};
export const isFlashConfig = [
	{ id: 1, display: '支持' },
	{ id: 2, display: '不支持' },
]
export const postTypeMap = {
	'create': '1',
	'modified': '2'
}
