import React, { Component } from 'react'
import { Table, Modal, message, Button, Tooltip } from 'antd';
import { ModifyLinkModal, ModifyDataModal } from "../components/modals"
import { WBYTableFooter } from "wbyui"

const ButtonGroup = Button.Group;
const modals = {
	'link': {
		passConfirmTitle: '确定审核通过此执行链接吗?',
		modal: ModifyLinkModal
	},
	'data': {
		passConfirmTitle: '确定审核通过此执行数据吗?',
		modal: ModifyDataModal
	},
	'empty': null
}
function getModal(type = 'empty') {
	return (modals[type] && modals[type].modal) || null
}
const LinkText = ({ text, url, target = "_blank" }) => {
	return text ? <a href={url} target={target}>{text}</a> : <span>-</span>
}

let columns = [{
	title: '订单ID',
	dataIndex: 'order_id',
	align: 'center',
	render: (text, record) => <LinkText text={text} url={record['order_info_path']} />
}, {
	title: '需求名称',
	dataIndex: 'requirement_name',
	align: 'center',
	render: (text, record) => (
		<div>
			<LinkText text={text} url={record['requirement_path']} />
			<div>需求ID：{record['requirement_id'] || '-'}</div>
		</div>
	)
}, {
	title: '执行凭证编号',
	dataIndex: 'execution_evidence_code',
	align: 'center',
	render: (text, record) => <LinkText text={text} url={record['po_path']} />
}, {
	title: '所属项目/品牌',
	dataIndex: 'project_name',
	key: 'project_name',
	align: 'center',
	render: (text, record) => (
		<div>
			<div>项目：{text || '-'}</div>
			<div>品牌：{record.brand_name || '-'}</div>
		</div>
	)
}, {
	title: '账号名称',
	dataIndex: 'weibo_name',
	align: 'center'
}, {
	title: '平台',
	dataIndex: 'weibo_type_name',
	align: 'center'
}, {
	title: '厂商简称',
	dataIndex: 'company_name',
	align: 'center',
	width: 180,
}, {
	title: '销售经理',
	dataIndex: 'real_name',
	align: 'center'
}]

class ResultList extends Component {
	setModalType = (type = '', state = {}) => {
		this.setState({ modalType: type, ...state });
	}
	handleMultiplePass = (type) => () => {
		const { selected } = this.state
		const { map } = this.props.data
		let desc = selected.filter(key => map[key][`${type}_check_status_for_sale`] != 3)
		if (desc.length) {
			message.info(`有${desc.length}个不符合条件的订单, 已为您取消勾选!`,5)
			this.setState({
				selected: selected.filter(key => map[key][`${type}_check_status_for_sale`] == 3)
			})
		} else {
			this.handlePass({ order_ids: selected }, type)()
		}
	}
	handlePass = (params, type) => () => {
		const { ROCheckExecutionLink, ROCheckExecutionData } = this.props.actions
		type = type || this.state.modalType
		let { passConfirmTitle = '-' } = modals[type] || {}
		let action;
		if (type === 'link') {
			action = ROCheckExecutionLink
		} else if (type === 'data') {
			action = ROCheckExecutionData
		}
		Modal.confirm({
			title: passConfirmTitle,
			onOk: (close) => {
				const hide = message.loading('操作中...', 0)
				action && action(params)
					.then((data) => {
						hide()
						message.success('审核成功!')
						this.setModalType('',{selected: []})
						this.props.search()
					})
					.catch((err) => {
						hide()
						console.log(err);
					});
				close()
			}
		});
	}

	handleModify = (type, record) => () => {
		this.setModalType(type, { record })
	}

	constructor(props) {
		super(props);
		this.state = {
			modalType: '',
			selected: [],
			record: {}
		};
	}

	//
	render() {
		const { list, map, total, page, pageSize } = this.props.data
		const { modalType, selected } = this.state
		let canCheckList = []
		const dataSource = list.map(key => {
			if (map[key]["data_check_status_for_sale"] == 3 || map[key]["link_check_status_for_sale"] == 3) {
				canCheckList.push(key)
			}
			return map[key]
		})
		const CModal = getModal(modalType)
		const pagination = {
			current: page - 0,
			pageSize: pageSize - 0,
			total,
			onChange: this.props.onPageChange
		}
		const newColumns = columns.concat([{
			title: '执行链接',
			dataIndex: 'link_check_status_for_sale',
			align: 'center',
			width: 180,
			render: (status, record) => {
				const operateData = record['dispatched_platforms']
				return (status == 1 || status == 2 || status == 5) ? "-" : <div>
					{operateData.map(item => <div style={{textAlign: 'left',display: 'flex',justifyContent: 'space-between'}} key={item['weibo_type']}>
						<span>{item['weibo_type_name']}：</span>
						{(item['link_required'] == 1) ?
							<a target={"_blank"} href={item['link_for_sale']}>执行链接</a> : '-'}
					</div>)}
					{status == 3 ?
						<div className='actions'>
							<Button style={{ marginRight: '8px' }} size="small" type="primary" onClick={this.handlePass({ order_ids: [record['order_id']] }, 'link')}>审核通过</Button>
							<Button size="small" type="primary" onClick={this.handleModify('link', record)}>修改后通过</Button>
						</div> : <Tooltip placement="top" arrowPointAtCenter title={
							<div>{"审核人：" + (record['execution_link_of_sale_creator'] || '-')}
								<br />{"审核时间：" + (record['execution_link_of_sale_check_time'] || '-')}
							</div>}><a className='pass-status-text'>审核通过</a></Tooltip>}
				</div>
			}
		}, {
			title: '执行数据',
			width: 180,
			dataIndex: 'data_check_status_for_sale',
			align: 'center',
			render: (status, record) => {
				const operateData = record['dispatched_platforms']
				return (status == 1 || status == 2 || status == 5) ? "-" :<div>
					{operateData.filter(item => item['data_required'] == 1).map(item => <div style={{textAlign: 'left',display: 'flex',justifyContent: 'space-between'}} key={item['weibo_type']}>
							<span>{item['weibo_type_name']}：</span>
						<a target='_blank' href={`/salesAuditManage/dataDetail?id=${record['order_id']}&platform=${item['weibo_type']}`}>执行数据</a>
					</div>)}
					{status == 3 ?
						<div className='actions'>
							<Button style={{ marginRight: '8px' }} size="small" type="primary" onClick={this.handlePass({ order_ids: [record['order_id']] }, 'data')}>审核通过</Button>
							<Button type="primary"  size="small" onClick={this.handleModify('data', record)}>修改后通过</Button>
						</div> : <Tooltip placement="top" arrowPointAtCenter title={
							<div>{"审核人："+ (record['execution_data_of_sale_creator'] || '-')}
								<br />{"审核时间：" + (record['execution_data_of_sale_check_time'] || '-')}
							</div>}><a className='pass-status-text'>审核通过</a></Tooltip>}
				</div>
			}
		}])
		const rowSelection = {
			onChange: (selected) => {
				this.setState({ selected })
			},
			getCheckboxProps: record => ({
				disabled: !(record["data_check_status_for_sale"] == 3 || record["link_check_status_for_sale"] == 3)
			}),
			selectedRowKeys: selected
		};
		const { record } = this.state
		const tableFooter = () => <WBYTableFooter
			plainOptions={canCheckList}
			onChange={e => this.setState({
				selected: e.target.checked ? canCheckList : []
			})}
			selectedRowKeys={selected}
			title={'全选'}
			pagination={pagination}>
			<Button disabled={!selected.length} onClick={this.handleMultiplePass('link')} style={{ marginRight: '10px' }} type='primary'>批量审核通过链接</Button>
			<Button disabled={!selected.length} onClick={this.handleMultiplePass('data')} type='primary'>批量审核通过数据</Button>
		</WBYTableFooter>
		return (
			<div>
				<Table loading={this.props.loading} rowSelection={rowSelection} bordered
					pagination={false}
					dataSource={dataSource}
					columns={newColumns}
					footer={tableFooter} />
				{CModal &&
				<CModal data={record} onCancel={() => this.setModalType()} onOk={params => this.handlePass(params)()} actions={this.props.actions}/>}
			</div>
		);
	}
}

export default ResultList;

