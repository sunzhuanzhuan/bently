import React, { Component } from 'react'
import { Table, Modal, message, Popover } from "antd";
import AuditRejectionForm from "./AuditRejectionForm";
import ModalBox from "./ModalBox";
import { withRouter, Link } from "react-router-dom";
import selectMap from "../../constants/SelectMap";
import Operating from "../operating/index";
import Scolltable from "../../../components/Scolltable";
import qs from "qs";
class RequisitionTable extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	changePage = (pagination, pageSize) => {
		const valuesAll = { page: pagination, page_size: pageSize }
		this.props.getGRListByPage(valuesAll)
		this.props.history.push({
			search: `?` + qs.stringify(valuesAll),
		})
	}
	formateData = (data) => {
		return data || '-'
	}
	//状态处理
	handleStatus = (record) => {
		const status = record.status
		const ids = [2, 4, 6, 9];
		const { cancel_info = {}, refuse_reason = {} } = record
		if (ids.indexOf(status) == -1) {
			return selectMap.grOrderStatusMap[record.status]
		} else if (status == 2 || status == 4) {

			const content = <span>
				操作人：{cancel_info && cancel_info.operator_name}<br />
				操作时间：{cancel_info && cancel_info.created_at}<br />
			</span>
			return <Popover content={content}>
				<span style={{ color: "#1DA57A" }}>{selectMap.grOrderStatusMap[record.status]}</span>
			</Popover>
		} else if (status == 9 || status == 6) {
			const content = <span>
				原因：{refuse_reason && refuse_reason.comment}<br />
			</span>
			return <Popover content={<div style={{ width: 300, wordBreak: "break-all" }}>{content}</div>}>
				<span style={{ color: "red" }}>{selectMap.grOrderStatusMap[record.status]}</span>
			</Popover>
		}
	}
	render() {
		const { goodsReceiptList, getGRListOperateAfter, goodsReceiptIsAEPermission, GReditUrl } = this.props
		const columns = [
			{
				title: 'GR申请单号',
				dataIndex: 'gr_id',
				key: 'gr_id',
				fixed: 'left', width: 100,
				render: (text, record) => <Link
					target="_blank"
					to={`/goodsReceipt/${goodsReceiptIsAEPermission ? "AEdetail" : "requisitionDetail"}?id=${record.gr_id}`}>
					{record.gr_id}
				</Link>
			}, {
				title: '状态',
				dataIndex: 'status',
				key: 'status',
				fixed: 'left',
				width: 150,
				render: (text, record) => <div>
					{this.handleStatus(record)}
				</div>
			}, {
				title: '执行凭证号（PO号）',
				dataIndex: 'po_code',
				key: 'po_code',
				render: (text, record) => <a
					target="_blank"
					href={`${record.babysitter_host}/sale/executionevidence/detail?id=${record.po_id}`}
				>
					{record.po_code}
				</a>
			}, {
				title: '执行凭证总额',
				dataIndex: 'po_total_budget',
				key: 'po_total_budget',
				render: (text, record) => <span>
					{record.po_total_budget} CNY
				</span>
			}, {
				title: 'GR币种',
				dataIndex: 'currency_type',
				key: 'currency_type',
				render: (text, record) => <span>
					{record.currency_type == 1 ? "人民币" : "美元"}
				</span>
			}, {
				title: 'GR是否含税',
				dataIndex: 'is_tax_inclusive',
				key: 'is_tax_inclusive',
				render: (text, record) => <span>
					{record.is_tax_inclusive == 1 ? `含（${record.tax_rate}%）` : "不含"}
				</span>
			}, {
				title: 'GR总金额',
				dataIndex: 'total_amount',
				key: 'total_amount',
				render: (text, record) => <span>
					{record.currency_type == 1 ? `${record.total_amount} CNY` : `${record.total_amount_usd} USD`}
				</span>
			}, {
				title: '所属项目',
				dataIndex: 'project_name',
				key: 'project_name',
				render: (text, record) => <span>
					<a
						target="_blank"
						href={`${record.babysitter_host}/sale/project/detail?id=${record.project_id}`}
					>
						{record.project_name}
					</a>
				</span>

			},
			{
				title: '品牌',
				dataIndex: 'brand_name',
				key: 'brand_name',
			}, {
				title: '公司简称',
				dataIndex: 'company_name',
				key: 'company_name',
				render: (text, record) => <a
					target="_blank"
					href={`${record.babysitter_host}/sale/company/detail/company_id/${record.company_id}`}
				>
					{record.company_name}
				</a>

			}, {
				title: '创建人/内审人',
				dataIndex: 'creator_name',
				key: 'creator_name',
				render: (text, record) => <span>
					{
						this.formateData(record.creator_name)
					}
					/
					{
						this.formateData(record.internal_auditor_name)
					}
				</span>
			},
			{
				title: '时间',
				dataIndex: 'time',
				key: 'time',
				width: 300,
				render: (text, record) => <div>
					<div>创建时间：{record.created_at}</div>
					<div>提交时间：{record.submitted_at}</div>
					<div>内审审核时间：{record.internal_audited_at}</div>
					<div>品牌方审核时间：{record.brand_side_audited_at}</div>
				</div>
			}, {
				title: '操作',
				dataIndex: 'operate',
				key: 'operate',
				width: 100,
				align: "center",
				fixed: 'right',
				render: (text, record) => {
					const { available_operations = [] } = record
					const operateMap = {
						modify: <Operating
							operateType="modify"
							text={<a>修改</a>}
							gr_id={record.gr_id}
							GReditUrl={GReditUrl}
						/>,
						cancel: <Operating operateType="cancel"
							text={<a>作废</a>}
							gr_id={record.gr_id}
							getGRListOperateAfter={getGRListOperateAfter}
						/>,
						copy: <Operating operateType="copy"
							text={<a>复制</a>}
							gr_id={record.gr_id}
							GReditUrl={GReditUrl}
							getGRListOperateAfter={getGRListOperateAfter}
						/>,
						internal_audit:
							<Operating operateType="internal_audit"
								text={<a>审核通过</a>}
								gr_id={record.gr_id}
								getGRListOperateAfter={getGRListOperateAfter}
							/>,
						internal_refuse:
							<Operating operateType="internal_refuse"
								text={<a>审核拒绝</a>}
								gr_id={record.gr_id}
								getGRListOperateAfter={getGRListOperateAfter}
							/>
					}
					return < div>
						{available_operations.map(one => <span key={one}>{operateMap[one]}</span>)}
					</div >
				}
			}
		]
		const pageConfig = {
			pageSize: Number(goodsReceiptList.pagination && goodsReceiptList.pagination.page_size || 50),
			current: Number(goodsReceiptList.pagination && goodsReceiptList.pagination.page || 1),
			total: goodsReceiptList && goodsReceiptList.pagination && goodsReceiptList.pagination.total,
			onChange: this.changePage
		}
		return (
			<div>
				<Scolltable scrollClassName='.ant-table-body'>
					<Table rowKey={record => record.gr_id}
						columns={columns}
						dataSource={goodsReceiptList.items}
						scroll={{ x: 1850 }} pagination={pageConfig} />
				</Scolltable>
			</div >
		);
	}
}

export default withRouter(RequisitionTable);
