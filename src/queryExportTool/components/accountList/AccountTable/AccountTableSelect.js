/*
 * @Author: wangxinyue 
 * @Date: 2019-05-20 11:37:46 
 * @Last Modified by: wangxinyue
 * @Last Modified time: 2019-05-22 17:27:19
 */
/**
 * @param参数说明
 * setLoading loading方法
 * serachAction 查询的Action
 * accountList渲染的list 集合
 * header全选后的内容
 * addSelectedRowKeysToCart 多选框操作方法
 * 
 */
import React, { Component } from 'react';
import MainItem from "../MainItem";
import { Row, Pagination, Table, Modal } from 'antd';
import { withRouter } from "react-router-dom";
import { NowNoFind, AllNoFind } from '../../common/NoFind'
import { NoExist } from "../../common/AccountInfos";
import "./index.less"
import qs from 'qs'
import CartFly from "@/components/CartFly"
import { sensors } from '@/util/sensor/sensors'
const { $, location } = window;


class AccountTableSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			checkedId: 0,
			modalContent: "",
			selecedTable: []
		}
	}
	showModal = () => {
		this.setState({
			visible: true
		})
	}
	handleCancel = () => {
		this.setState({
			visible: false
		})
	}
	setModalContent = (modalContent) => {
		this.setState({
			modalContent: modalContent,
			visible: true
		})
	}

	onChangePageSize = (pagination, pageSize) => {
		const { isdBackUp } = this.props
		isdBackUp && isdBackUp()
		const param = { page: pagination, page_size: pageSize }
		this.setState({
			pageSize: pageSize,
		})
		this.searchList(param)
	}
	onShowSizeChange = (pagination, pageSize) => {
		const { isdBackUp } = this.props
		isdBackUp && isdBackUp()
		const param = { page: pagination, page_size: pageSize }
		this.setState({
			pageSize: pageSize,
		})
		this.searchList(param)
	}

	searchList = (values) => {
		const search = qs.parse(this.props.location.search.substring(1))
		const valuesAll = { ...search, ...values, }
		this.props.history.push({
			search: `?` + qs.stringify(valuesAll),
		})
		const { serachAction } = this.props
		serachAction && serachAction({ ...valuesAll })
	}
	//神策添加
	track = (is_visit_detail, is_visit_homepage, operation_type, deal_type, account_ids) => {
		const urlAll = this.props.match.url
		let url = urlAll.slice(0, urlAll.lastIndexOf("/")) + "/"
		if (url == '/accountList/list/') {
			sensors.track('AccountToCart', {
				app_id: 101,
				is_visit_detail: is_visit_detail,
				is_visit_homepage: is_visit_homepage,
				operation_type: operation_type,
				deal_type: deal_type,//批量加入batch。单个加入single
				position: '列表',
				account_ids: account_ids.join(','),
			});
		}
	}


	//选择和取消选择
	onSelectChange = (key, seleced) => {
		const { IsExactQuery, isShowTypeByList, actions, addLookDetailOrIndexList = {} } = this.props

		this.setState({
			selecedTable: [key.account_id]
		})
		const { detali = [], index = [] } = addLookDetailOrIndexList

		this.track(
			detali.includes(key.account_id) ? key.account_id : '',
			index.includes(key.account_id) ? key.account_id : '',
			seleced ? '加入' : '取消',
			'single',
			[key.account_id]
		)
		if (seleced) {
			//同步发一个立刻选中
			this.props.actions.addSelectStatic([key.account_id])
			//精确查询选中添加
			IsExactQuery && actions.addSelectExactQuery([key.account_id])
			//仅批量查号使用
			this.props.actions.addToCart({ item_type_id: 1, accounts: this.getSaveCart([key]) })
				.catch(() => {
					this.props.actions.removeFromCart({ staging_ids: [key.account_id] })
					IsExactQuery && actions.removeSelectExactQuery([key.account_id])
				})
		} else {
			this.props.actions.removeFromCart({ staging_ids: [key.account_id] })
			IsExactQuery && actions.removeSelectExactQuery([key.account_id])
		}
		if (seleced) {
			let faceImg = $("#avatar_" + (isShowTypeByList ? "list" : "") + key.account_id);
			CartFly.show({
				start: faceImg,
				image: faceImg.data("src")
			})
		}
	}
	getSaveCart = (list) => {
		return list.map(one => ({ account_id: one.account_id, platform_id: one.platform_id }))
	}
	//全选/取消全选
	onSelectAllChange = (seleced, list, changeRows) => {
		const { IsExactQuery, actions, addLookDetailOrIndexList = {} } = this.props
		const staging_ids = changeRows.map(one => one.account_id)
		const { detali = [], index = [] } = addLookDetailOrIndexList

		this.track(
			detali.join(','),
			index.join(','),
			seleced ? '加入' : '取消',
			'batch',
			staging_ids
		)

		if (seleced) {
			//同步发一个立刻选中
			this.props.actions.addSelectStatic(staging_ids)
			//精确查询选中添加
			IsExactQuery && actions.addSelectExactQuery(staging_ids)
			this.props.actions.addToCart({ item_type_id: 1, accounts: this.getSaveCart(list) })
				.catch(() => {
					this.props.actions.removeFromCart({ staging_ids: staging_ids })
					IsExactQuery && actions.removeSelectExactQuery(staging_ids)
				})
		} else {
			const staging_ids = changeRows.map(one => one.account_id)
			this.props.actions.removeFromCart({ staging_ids })
			IsExactQuery && actions.removeSelectExactQuery(staging_ids)
		}

	}
	render() {
		const { visible, modalContent, } = this.state
		const { accountList, header, tableProps,
			isShowNoFind, countNum, IsExactQuery,
			isShowTypeByList, columnsTypeByList,
			arrSelectExactQuery,//精确查询的数组
			isDeleteAction, batchRemove, actions//专为删除而设计，是否有删除，删除方法
		} = this.props;
		const { is_select = [] } = accountList
		const rowSelection = {
			selectedRowKeys: IsExactQuery ? arrSelectExactQuery : is_select,
			onSelect: this.onSelectChange,
			onSelectAll: this.onSelectAllChange,
			getCheckboxProps: record => (IsExactQuery ? {
				disabled: record.base.not_exist == 1,
				name: record.name,
			} : {})
		};
		const pageConfig = {
			pageSize: Number(accountList.pagination && accountList.pagination.page_size || 20),
			current: Number(accountList.pagination && accountList.pagination.page || 1),
			total: accountList && accountList.pagination && accountList.pagination.total,
		}
		const columns = [{
			title: <div>
				<div >{header}</div>
				<div className='account-table-page'>
					<Pagination
						simple

						onChange={this.onChangePageSize}
						{...pageConfig}
					/>
				</div>
			</div>,
			dataIndex: 'name',

			render: (text, record) => {
				const { base } = record
				return base.not_exist == 1 ?
					<NoExist name={base.sns_name || base.account_id || base.sns_id} />
					: <MainItem isDeleteAction={isDeleteAction} batchRemove={batchRemove} accountListItem={record} setModalContent={this.setModalContent} actions={actions} />

			}
		}];
		return (
			<div >
				{countNum <= 0 && isShowNoFind ?
					<div>
						<Row >{header}</Row>
						<AllNoFind />
					</div>
					: accountList.accounts.length <= 0 && isShowNoFind ?
						<div>
							<Row >{header}</Row>
							<NowNoFind />
						</div> :
						isShowTypeByList ? <Table
							className="account-table-wxy-list account-table-disabled-none"
							columns={columnsTypeByList}
							dataSource={accountList.accounts}
							rowKey={(record, index) => record.base.account_id && record.base.account_id || index}
							pagination={false}
							rowSelection={rowSelection}
							rowClassName={(record, index) => {
								const { base } = record
								return base.not_exist == 1 ? "no-not-exist-row-color" : ""
							}}
						/> :
							<div className="account-table-wxy">
								<Table
									rowKey={record => record.base.account_id}
									className="account-table-wxy-title account-table-disabled-none"
									rowSelection={rowSelection}
									{...tableProps}
									columns={columns}
									dataSource={accountList.accounts}
									pagination={IsExactQuery ? false : {
										...pageConfig,
										showSizeChanger: true,
										showQuickJumper: true,
										onChange: this.onChangePageSize,
										onShowSizeChange: this.onShowSizeChange,
										pageSizeOptions: ["20", "50", "100"]
									}}
									rowClassName={(record, index) => {
										const { base } = record
										return base.not_exist == 1 ? "no-not-exist-row-color" : ""
									}}
								/>
							</div>}
				<Modal
					title={"查看账号详情"}
					visible={visible}
					onCancel={this.handleCancel}
					width={820}
					footer={false}
				>
					{visible ? modalContent : null}
				</Modal>
			</div>
		);
	}
}

export default withRouter(AccountTableSelect);
