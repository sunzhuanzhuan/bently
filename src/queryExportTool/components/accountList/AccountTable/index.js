/**
 * @param参数说明
 * setLoading loading方法
 * serachAction 查询的Action
 * accountList渲染的list 集合
 * header全选后的内容
 * addSelectedRowKeysToCart 多选框操作方法
 * isShowDisable 是否显示禁用
 */
import React, { Component } from 'react';
import MainItem from "../MainItem";
import { Row, Pagination, Table, Modal } from 'antd';
import { withRouter } from "react-router-dom";
import "./index.less"
import qs from 'qs'
import { NowNoFind, AllNoFind } from '../../../components/common/NoFind';
import CartFly from "@/components/CartFly"
import { sensors } from '@/util/sensor/sensors'
const { $, location } = window;

class AccountTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			checkedId: 0,
			modalContent: "",
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
		console.log("TCL: AccountTable -> onChangePageSize -> pageSize", pageSize)
		const { isdBackUp } = this.props
		isdBackUp && isdBackUp()
		const param = { currentPage: pagination, pageSize: pageSize }
		this.setState({
			pageSize: pageSize,
		})
		this.searchList(param)
	}
	onShowSizeChange = (pagination, pageSize) => {
		console.log("TCL: AccountTable -> onShowSizeChange -> pageSize", pageSize)
		const { isdBackUp } = this.props
		isdBackUp && isdBackUp()
		const param = { currentPage: pagination, pageSize: pageSize }
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
	//选择和取消选择
	onSelectChange = (key, seleced) => {
		const { selectedRowKeys = [], selectedRowKeysObject = [], isObject = false, isShowDisable, history = {} } = this.props;
		let selectedRowKeysNow = [...selectedRowKeys]
		//返回选中的字符串数组集合
		if (seleced) {
			selectedRowKeysNow.push(key.accountId)
		} else {
			selectedRowKeysNow = selectedRowKeysNow.filter(one => one != key.accountId)
			if (!isShowDisable && isObject) {
				this.props.removeCartAccount([key.accountId])
			}
		}
		//返回对象的数组集合
		if (isObject) {
			let selectObject = [...selectedRowKeysObject]
			if (seleced) {
				selectObject.push(key)
			} else {
				selectObject = selectObject.filter(one => one.accountId != key.accountId)
			}
			this.props.addSelectedRowKeysToCart({
				selectedRowKeys: selectedRowKeysNow,
				selectedRowKeysObject: selectObject
			}, seleced, [key])
		} else {
			this.props.addSelectedRowKeysToCart(selectedRowKeysNow)
		}
		let endOffset = $("#Js-select-car-click-id").offset()
		if (seleced && endOffset) {
			let faceImg = $("#avatar_" + key.accountId);
			CartFly.show({
				start: faceImg,
				image: faceImg.data("src")
			})
		}
	}
	//全选/取消全选
	onSelectAllChange = (seleced, list, changeRows) => {
		const { selectedRowKeys, selectedRowKeysObject = [], isObject = false, isShowDisable } = this.props;
		let selectedRowKeysNow = [...selectedRowKeys]
		const changeRowsArray = changeRows.map(one => one.accountId)
		if (seleced) {
			list.map(one => {
				if (!selectedRowKeys.includes(one.accountId)) {
					selectedRowKeysNow.push(one.accountId)
				}
			})

		} else {
			selectedRowKeysNow = selectedRowKeysNow.filter(item => !changeRowsArray.includes(item))
			if (!isShowDisable && isObject) {
				this.props.removeCartAccount(changeRows.map(one => one.accountId))
			}
		}
		//返回对象的数组集合
		if (isObject) {
			let selectObject = [...selectedRowKeysObject]
			if (seleced) {
				list.map(one => {
					if (!selectedRowKeys.includes(one.accountId)) {
						selectObject.push(one)
					}
				})
			} else {
				selectObject = selectObject.filter(item => !changeRowsArray.includes(item.accountId))
			}
			this.props.addSelectedRowKeysToCart({
				selectedRowKeys: selectedRowKeysNow,
				selectedRowKeysObject: selectObject
			}, seleced, list)

		} else {
			this.props.addSelectedRowKeysToCart(selectedRowKeysNow)
		}
	}
	render() {
		const { visible, modalContent } = this.state
		const search = qs.parse(this.props.location.search.substring(1))
		const { selectedRowKeys, isShowDisable = false, accountList = {},
			header, tableProps, isShowNoFind,
			accountIdsByQuotation = [], tablePageSize = 20 } = this.props;
    let arr = [];
    for(let i=0;i<selectedRowKeys.length;i++) { arr.push(selectedRowKeys[i].toString())
    }
		const rowSelection = {
			selectedRowKeys:arr,
			onSelect: this.onSelectChange,
			onSelectAll: this.onSelectAllChange,
			getCheckboxProps: record => (isShowDisable ? {
				disabled: accountIdsByQuotation.includes(record.accountId*1),
				name: record.name,
			} : {})
		};
		const pageConfig = {
			pageSize: Number(accountList && accountList.pageSize || tablePageSize),
			current: Number(accountList && accountList.pageNum || 1),
			total: accountList && accountList && accountList.total,
		}
		const columns = [{
			title: <div>
				<div>{header}</div>
				<div className='account-table-page'>
					<Pagination
						simple
						onChange={this.onChangePageSize}
						{...pageConfig} />
				</div>
			</div>,
			dataIndex: 'name',
			render: (text, record,index) => {
				return <MainItem accountListItem={record} setModalContent={this.setModalContent} isPreloading={index < 4} />
			}
		}];

		return (
			<div >
				{accountList.total <= 0 && isShowNoFind ?
					<div>
						<Row >{header}</Row>
						<AllNoFind />
					</div>
					: accountList.list && accountList.list.length <= 0 && isShowNoFind ?
						<div>
							<Row >{header}</Row>
							<NowNoFind />
						</div> : <div className="account-table-wxy">
							<Table
								rowKey={record => record.accountId}
								className="account-table-wxy-title"
								rowSelection={rowSelection}
								{...tableProps}
								columns={columns}
								dataSource={accountList.list}
								pagination={{
									...pageConfig,
									onChange: this.onChangePageSize,
									showSizeChanger: true,
									showQuickJumper: true,
									onShowSizeChange: this.onShowSizeChange,
									pageSizeOptions: ["20", "50", "100"]
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

export default withRouter(AccountTable);
