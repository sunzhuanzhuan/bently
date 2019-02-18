import React from "react";
import { Popover, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import numeral from 'numeral';

export const creditTitle = [
	{
		title: '额度（元）',
		dataIndex: 'credit_line',
		key: 'credit_line',
		width: 300,
		render: text => {
			return text ? numeral(text).format('0.00') : '0.00'
		}
	},
	{
		title: '余额（元）',
		dataIndex: 'credit_amount',
		key: 'credit_amount',
		width: 300,
		render: text => {
			return text ? numeral(text).format('0.00') : '0.00'
		}
	},
	{
		title: '可用余额（元）',
		dataIndex: 'credit_amount_available',
		key: 'credit_amount_available',
		render: text => {
			return text ? numeral(text).format('0.00') : '0.00'
		}
	}
]

export const cashTitle = [
	{
		title: '余额（元）',
		dataIndex: 'cash_amount',
		key: 'cash_amount',
		render: text => {
			return text ? numeral(text).format('0.00') : '0.00'
		}
	}
]

export const giftTitle = [
	{
		title: <div>余额（元）<Popover content={'余额=（总赠送金额-已使用金额）之差的绝对值'} title="" >
			<Icon type="question-circle-o" />
		</Popover></div>,
		dataIndex: 'balance',
		key: 'balance',
		width: 300,
		render: text => {
			return text ? numeral(text).format('0.00') : '0.00'
		}
	},
	{
		title: <div>已使用金额（元）<Popover content={'统计所有使用了赠送账户金额的总和'} title="" >
			<Icon type="question-circle-o" />
		</Popover></div>,
		dataIndex: 'spend_amount',
		key: 'spend_amount',
		width: 300,
		render: text => {
			return text ? numeral(text).format('0.00') : '0.00'
		}
	},
	{
		title: <div>总赠送金额（元）<Popover content={'统计赠送给该客户的金额总和'} title="" >
			<Icon type="question-circle-o" />
		</Popover></div>,
		dataIndex: 'total_amount',
		key: 'total_amount',
		render: text => {
			return text ? numeral(text).format('0.00') : '0.00'
		}
	}
]

export const compensationTitle = [
	{
		title: <div>余额（元）<Popover content={'余额=（总赔偿金额-已使用金额）之差的绝对值'} title="" >
			<Icon type="question-circle-o" />
		</Popover></div>,
		dataIndex: 'balance',
		key: 'balance',
		width: 300,
		render: text => {
			return text ? numeral(text).format('0.00') : '0.00'
		}
	},
	{
		title: <div>已使用金额（元）<Popover content={'统计所有使用了赔偿账户金额的总和'} title="" >
			<Icon type="question-circle-o" />
		</Popover></div>,
		dataIndex: 'spend_amount',
		key: 'spend_amount',
		width: 300,
		render: text => {
			return text ? numeral(text).format('0.00') : '0.00'
		}
	},
	{
		title: <div>总赔偿金额（元）<Popover content={'统计赔偿给该客户的金额总和'} title="" >
			<Icon type="question-circle-o" />
		</Popover></div>,
		dataIndex: 'total_amount',
		key: 'total_amount',
		render: text => {
			return text ? numeral(text).format('0.00') : '0.00'
		}
	}
];

export const coffersListFunc = (id) => {
	return [
		{
			title: <div>余额（元）<Popover content={'余额=总金额-已使用金额'} title="" >
				<Icon type="question-circle-o" />
			</Popover></div>,
			dataIndex: 'balance',
			key: 'balance',
			width: 300,
			render: text => {
				return text ? numeral(text).format('0.00') : '0.00'
			}
		},
		{
			title: <div>已使用金额（元）<Popover content={'统计使用小金库的金额总和'} title="" >
				<Icon type="question-circle-o" />
			</Popover></div>,
			dataIndex: 'spend_amount',
			key: 'spend_amount',
			width: 300,
			render: text => {
				return text ? numeral(text).format('0.00') : '0.00'
			}
		},
		{
			title: <div>总金额（元）<Popover content={'统计在该客户订单/拓展业务上加价金额的总和'} title="" >
				<Icon type="question-circle-o" />
			</Popover></div>,
			dataIndex: 'total_amount',
			key: 'total_amount',
			width: 300,
			render: text => {
				return text ? numeral(text).format('0.00') : '0.00'
			}
		},
		{
			title: '小金库明细',
			dataIndex: 'action',
			key: 'action',
			align: 'left',
			render: () => <Link to={`/finance/golden/detail?company_id=${id}`}>查看详情</Link>
		}
	]
}

export const companyAdjustFunc = (id) => {
	return [
		{
			title: <div>总金额（元）<Popover content={'统计财务审批调价订单的已使用的调价金额总和'} title="" >
				<Icon type="question-circle-o" />
			</Popover></div>,
			dataIndex: 'total_amount',
			key: 'total_amount',
			width: 300,
			render: text => {
				return text ? numeral(text).format('0.00') : '0.00'
			}
		},
		{
			title: '调价明细',
			dataIndex: 'action',
			key: 'action',
			render: () => <Link to={`/finance/golden/adjustDetail?company_id=${id}`}>查看详情</Link>
		}
	]
}

export const accountFlowFunc = (handleDetail, content, account_type) => {
	return [
		{
			title: '流水号',
			dataIndex: 'billing_id',
			key: 'billing_id',
		}, {
			title: '时间',
			dataIndex: 'created_at',
			key: 'created_at',
			aligin: 'center',
			width: 200,
		}, {
			title: '账户',
			dataIndex: 'account_type',
			key: 'account_type',
			aligin: 'center',
			render: text => {
				const value = account_type.find(item => item.id == text);
				return value ? value.display : '-'
			}
		}, {
			title: '流水明细',
			dataIndex: 'change_amount',
			key: 'change_amount',
			aligin: 'center',
		}, {
			title: '流水类型',
			dataIndex: 'billing_type_display',
			key: 'billing_type_display',
			aligin: 'center',
		}, {
			title: '操作',
			dataIndex: 'action',
			key: 'action',
			aligin: 'center',
			render: (text, record) => {
				if ((record.billing_type == 2) || (record.billing_type_display == '其他')) {
					return <span>-</span>
				} else {
					const node = content ? <div>{content.key}：<a target='_blank' href={content.link}>{content.value}</a></div> : '';
					return <Popover content={node}
						trigger="click">
						<a onClick={() => { handleDetail(record) }}>查看详情</a>
					</Popover >
				}
			},
		}
	]
}

export const freezeDetailFunc = (productLine) => {
	return [
		{
			title: '时间',
			dataIndex: 'created_at',
			key: 'created_at',
		}, {
			title: '冻结金额（元）',
			dataIndex: 'freeze_amount',
			key: 'freeze_amount',
		}, {
			title: '业务类型',
			dataIndex: 'product_line_display',
			key: 'product_line_display',
			render: (text, record) => {
				let productLineId = record.product_line
				let productLineDisplay = productLine.map(function (item) {
					if (item.id == productLineId) {
						return <span>{item.display}</span>
					}
				})
				return productLineDisplay
			},

		}, {
			title: '业务名称',
			key: 'biz_name',
			dataIndex: 'biz_name',
			render: text => {
				return text ? text : '-'
			}
		}, {
			title: '业务ID',
			dataIndex: 'order_id',
			key: 'order_id',
			render: (text, record) => {
				return text ? <a target='_blank' href={record.order_link}>{text}</a> : '-'
			}
		}
	]
}

export const goldenFlowConfig = [
	{
		title: '流水号',
		dataIndex: 'bill_id',
		key: 'bill_id',
		align: 'center',
		width: 200,
	}, {
		title: '时间',
		dataIndex: 'created_at',
		key: 'created_at',
		align: 'center',
		width: 200,
	}, {
		title: '流水明细（元）',
		dataIndex: 'change_amount',
		key: 'change_amount',
		align: 'center',
		width: 200,
	}, {
		title: '类型',
		dataIndex: 'display',
		key: 'display',
		align: 'center',
		width: 200,
	}, {
		title: '余额',
		dataIndex: 'after_amount',
		key: 'after_amount',
		align: 'center',
		width: 200,
	}, {
		title: '操作人',
		dataIndex: 'real_name',
		key: 'real_name',
		align: 'center',
		width: 200,
		render: text => {
			return text ? text : '-'
		}
	}, {
		title: '详情',
		align: 'center',
		width: 300,
		render: (text, record) => {
			if (record.product_line && (record.product_line === '3' || record.product_line === '7')) {
				const str = record.product_line === '3' ? '订单ID' : record.product_line === '7' ? '拓展业务ID' : null;
				return <div>{str}：<a target='_blank' href={record.link}>{record.order_id}</a></div>
			} else {
				return record.remark
			}
		},
	}
]

export const adjustApplyFunc = (application_status, handleJump) => {
	return [
		{
			title: '申请编号',
			dataIndex: 'id',
			key: 'id',
			align: 'center',
			width: 100,
		},
		{
			title: '申请状态',
			dataIndex: 'status',
			key: 'status',
			align: 'center',
			width: 120,
			render: (text) => {
				const value = application_status.find(item => item.id == text);
				return value ? value.display : null
			}
		},
		{
			title: '申请人',
			dataIndex: 'real_name',
			key: 'real_name',
			align: 'center',
			width: 120,
		},
		{
			title: '申请时间',
			dataIndex: 'created_at',
			key: 'created_at',
			align: 'center',
			width: 100
		},
		{
			title: '调价原因',
			dataIndex: 'reason',
			key: 'reason',
			align: 'center',
			width: 100,
			render: (text) => {
				return <Popover content={text} trigger="click">
					<a href='javascript:;'>查看</a>
				</Popover>
			}
		},
		{
			title: '邮件审批证明',
			dataIndex: 'attachment',
			key: 'attachment',
			align: 'center',
			width: 120,
			render: (text) => {
				const ary = text.split(',');
				const list = ary.map((item, index) => (<div className='thum-img-box' key={index}>
					<a href={item} target='_blank'><img src={item} /></a>
				</div>
				));
				const width = ary.length * 70;
				return text ? <Popover content={<div style={{ width: `${width}px`, height: '70px' }}>{list}</div>} trigger="click">
					<a href='javascript:;'>查看</a>
				</Popover> : '-'
			}
		},
		{
			title: '操作',
			dataIndex: 'action',
			key: 'action',
			align: 'center',
			width: 140,
			render: (text, record) => {
				return <a href='javascript:;' target='_blank' type='primary' onClick={() => {
					handleJump(record.id, record.company_id);
				}}>订单详情</a>
			}
		}
	]
}

export const adjustApplyListFunc = (application_status, handleJump, handleAction) => {
	return [
		{
			title: '申请编号',
			dataIndex: 'id',
			key: 'id',
			align: 'center',
			width: 100,
		},
		{
			title: '申请状态',
			dataIndex: 'status',
			key: 'status',
			align: 'center',
			width: 120,
			render: (text) => {
				const value = application_status.find(item => item.id == text);
				return value ? value.display : null
			}
		},
		{
			title: '申请人',
			dataIndex: 'real_name',
			key: 'real_name',
			align: 'center',
			width: 120,
		},
		{
			title: '申请时间',
			dataIndex: 'created_at',
			key: 'created_at',
			align: 'center',
			width: 100
		},
		{
			title: '调价原因',
			dataIndex: 'reason',
			key: 'reason',
			align: 'center',
			width: 100
		},
		{
			title: '邮件审批证明',
			dataIndex: 'attachment',
			key: 'attachment',
			align: 'center',
			width: 120,
			render: (text) => {
				const ary = text.split(',');
				const list = ary.map((item, index) => (<div className='thum-img-box' key={index}>
					<a href={item} target='_blank'><img src={item} /></a>
				</div>
				));
				const width = ary.length * 70;
				return text ? <Popover content={<div style={{ width: `${width}px`, height: '70px' }}>{list}</div>} trigger="click">
					<a href='javascript:;'>查看</a>
				</Popover> : '-'
			}
		},
		{
			title: '操作',
			dataIndex: 'action',
			key: 'action',
			align: 'center',
			width: 140,
			render: (text, record) => {
				return <div>
					<div>
						<Button type='primary' size='small' target='_blank' onClick={() => {
							handleJump(record.id, record.company_id);
						}}>订单详情</Button>
					</div>
					{record.status != '3' ? <div>
						<Button type='primary' size='small' style={{ marginTop: "10px" }} onClick={() => {
							handleAction('pass', record.id, record.quote_type);
						}}>审核通过</Button>
					</div> : null}
					{record.status != '3' ? <div>
						<Button type='primary' size='small' style={{ marginTop: "10px", width: '68px' }} onClick={() => {
							handleAction('reject', record.id);
						}}>驳回</Button>
					</div> : null}
					{record.status != '3' ? <div>
						<Button type='primary' size='small' style={{ marginTop: "10px", width: '68px' }}
							target='_blank' href={`/api/finance/readjust/export?readjust_application_id=${record.id}`}>导出</Button>
					</div> : null}
				</div >
			}
		}
	]
}

export const addAdjustApplyConfig = [
	{
		title: '订单ID',
		dataIndex: 'order_id',
		key: 'order_id',
		align: 'center',
		width: 100,
		fixed: 'left'
	},
	{
		title: '公司简称',
		dataIndex: 'company_name',
		key: 'company_name',
		align: 'center',
	},
	{
		title: '所属项目',
		dataIndex: 'project_name',
		key: 'project_name',
		align: 'center',
		render: (text) => {
			return text ? text : '-'
		}
	},
	{
		title: '需求ID',
		dataIndex: 'requirement_id',
		key: 'requirement_id',
		align: 'center',
	},
	{
		title: '需求名称',
		dataIndex: 'requirement_name',
		key: 'requirement_name',
		align: 'center',
	},
	{
		title: '平台',
		dataIndex: 'platform_name',
		key: 'platform_name',
		align: 'center',
	},
	{
		title: 'account id',
		dataIndex: 'account_id',
		key: 'account_id',
		align: 'center',
	},
	{
		title: '账号名称',
		dataIndex: 'weibo_name',
		key: 'weibo_name',
		align: 'center',
	},
	{
		title: '应约价',
		dataIndex: 'price',
		key: 'price',
		align: 'center',
		render: (text, { price }) => {
			return <div>
				{price.map((item, index) => {
					return <div key={index}>{`${item.price_label}:${item.quoted_price}`}</div>
				})}
			</div>
		}
	},
	{
		title: '最低售卖价',
		dataIndex: 'last_min_sell_price',
		key: 'last_min_sell_price',
		align: 'center',
		render: (text) => {
			const node = text ? <div>
				{text.map((item, index) => {
					return <div key={index}>{`${item.price_label}:${item.min_sell_price}`}</div>
				})}
			</div> : '-';
			return node;
		}
	},
]

export const readyCheckFunc = (handleDelete) => {
	return [
		{
			title: '订单ID',
			dataIndex: 'order_id',
			key: 'order_id',
			align: 'center',
			width: 80
		},
		{
			title: '公司简称',
			dataIndex: 'company_name',
			key: 'company_name',
			align: 'center',
			width: 120
		},
		{
			title: '所属项目',
			dataIndex: 'project_name',
			key: 'project_name',
			align: 'center',
			width: 80,
			render: (text) => {
				return text ? text : '-'
			}
		},
		{
			title: '需求名称',
			dataIndex: 'requirement_name',
			key: 'requirement_name',
			align: 'center',
			width: 260
		},
		{
			title: '应约价',
			dataIndex: 'price',
			key: 'price',
			align: 'center',
			render: (text, { price }) => {
				return <div>
					{price.map((item, index) => {
						return <div key={index}>{`${item.price_label}:${item.quoted_price}`}</div>
					})}
				</div>
			}
		},
		{
			title: '操作',
			dataIndex: 'action',
			key: 'action',
			align: 'left',
			width: 60,
			render: (text, record) => {
				return <a href='javascript:;' onClick={() => { handleDelete(record.order_id) }}>删除</a>
			}
		}
	]
}
export const adjustApplyDetailFunc = (rel_order_status) => {
	return ary => {
		const configMap = {
			'order_id': {
				title: '订单ID',
				dataIndex: 'order_id',
				key: 'order_id',
				align: 'center',
				width: 80,
				fixed: 'left'
			},
			'status': {
				title: '审批状态',
				dataIndex: 'status',
				key: 'status',
				align: 'center',
				width: 130,
				fixed: 'left',
				render: (text) => {
					const value = rel_order_status.find(item => item.id == text);
					return value ? value.display : null
				}
			},
			'company_name': {
				title: '公司简称',
				dataIndex: 'company_name',
				key: 'company_name',
				align: 'center',
				width: 200,
			},
			'project_name': {
				title: '所属项目',
				dataIndex: 'project_name',
				key: 'project_name',
				align: 'center',
				width: 160,
				render: (text) => {
					return text ? text : '-'
				}
			},
			'requirement_id': {
				title: '需求ID',
				dataIndex: 'requirement_id',
				key: 'requirement_id',
				align: 'center',
				width: 80,
			},
			'requirement_name': {
				title: '需求名称',
				dataIndex: 'requirement_name',
				key: 'requirement_name',
				align: 'center',
				width: 160,
			},
			'platform_name': {
				title: '平台',
				dataIndex: 'platform_name',
				key: 'platform_name',
				align: 'center',
				width: 160,
			},
			'account_id': {
				title: 'account id',
				dataIndex: 'account_id',
				key: 'account_id',
				align: 'center',
				width: 100,
			},
			'weibo_name': {
				title: '账号名称',
				dataIndex: 'weibo_name',
				key: 'weibo_name',
				align: 'center',
				width: 160,
			},
			'quoted_price': {
				title: '成本价',
				dataIndex: 'quoted_price',
				key: 'quoted_price',
				align: 'center',
				width: 240,
				render: (text, { price }) => {
					return <div>
						{price.map((item, index) => {
							return <div key={index}>{`${item.price_label}:${item.price}`}</div>
						})}
					</div>
				}
			},
			'price': {
				title: '应约价',
				dataIndex: 'price',
				key: 'price',
				align: 'center',
				width: 240,
				render: (text, { price }) => {
					return <div>
						{price.map((item, index) => {
							return <div key={index}>{`${item.price_label}:${item.quoted_price}`}</div>
						})}
					</div>
				}
			},
			'history_min_sell_price': {
				title: '历史审核最低售卖价',
				dataIndex: 'history_min_sell_price',
				key: 'history_min_sell_price',
				align: 'center',
				width: 240,
				render: (text) => {
					const item = text ? text.min_sell_price : [];
					const node = item.length > 0 ? <div>
						{item.map((item, index) => {
							return <div key={index}>{`${item.price_label}:${item.min_sell_price}`}</div>
						})}
					</div> : '-';
					return node;
				}
			},
			'history_rate': {
				title: '历史审核利润率/服务费率',
				dataIndex: 'history_rate',
				key: 'history_rate',
				align: 'center',
				width: 140,
				render: (text, record) => {
					const item = record.history_min_sell_price ? record.history_min_sell_price.min_sell_price : [];
					const value = record.quote_type === '1' ? record.history_min_sell_price.profit_rate : record.quote_type === '2' ? record.history_min_sell_price.service_rate : null;
					return item.length > 0 ? value : '-';
				}
			},
			'min_sell_price': {
				title: '本次最低售卖价',
				dataIndex: 'min_sell_price',
				key: 'min_sell_price',
				align: 'center',
				width: 240,
				render: (text) => {
					const node = text ? <div>
						{text.map((item, index) => {
							return <div key={index}>{`${item.price_label}:${item.min_sell_price}`}</div>
						})}
					</div> : '-';
					return node;
				}
			},
			'quote_type': {
				title: '本次利润率/服务费率',
				dataIndex: 'quote_type',
				key: 'quote_type',
				align: 'center',
				width: 140,
				render: (text, record) => {
					const value = text === '1' ? record.profit_rate : text === '2' ? record.service_rate : null;
					return record.min_sell_price ? value : '-';
				}
			},
			'pass_time': {
				title: '审核时间',
				dataIndex: 'pass_time',
				key: 'pass_time',
				align: 'center',
				width: 160,
				render: (text) => {
					const flag = text === '0000-00-00 00:00:00';
					return !flag ? text : '-';
				}
			},
			'remark': {
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
			}
		}
		const array = ary.map(item => configMap[item]);
		return array;
	}
}
