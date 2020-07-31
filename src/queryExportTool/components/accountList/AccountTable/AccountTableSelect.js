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
      selecedTable: [],
      isGetAllInfo:false,
      selectedRowKeys: []
		}
	}

  componentDidMount() {
    const {accountList = {}} = this.props;
    const {isSelect = []} = accountList;
    this.setState({
      selectedRowKeys: isSelect
    });
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
		const param = { currentPage: pagination, pageSize: pageSize }
		this.setState({
			pageSize: pageSize,
		})
		this.searchList(param)
	}
	onShowSizeChange = (pagination, pageSize) => {
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
    if (this.state.isGetAllInfo) {
      return
    }
    this.setState({isGetAllInfo: true})
		const { IsExactQuery, isShowTypeByList, actions, addLookDetailOrIndexList = {} } = this.props

		this.setState({
			selecedTable: [key.accountId]
		})
		const { detali = [], index = [] } = addLookDetailOrIndexList


		if (seleced) {
			//同步发一个立刻选中
			this.props.actions.addSelectStatic([key.accountId])
      this.setState({
        selectedRowKeys: [...this.state.selectedRowKeys, key.accountId]
      });
			//精确查询选中添加
			IsExactQuery && actions.addSelectExactQuery([key.accountId])
			//仅批量查号使用
			this.props.actions.addToCart({ itemTypeId: 1, accounts: this.getSaveCart([key]) })
				.catch(() => {
					this.props.actions.removeFromCart({ stagingIds: [key.accountId] })
					IsExactQuery && actions.removeSelectExactQuery([key.accountId])
				})
        .then(() => {
          this.setState({isGetAllInfo: false})
        })
		} else {
      let selectedRowKeys = this.state.selectedRowKeys || [];
      let newRowKey = selectedRowKeys.filter(item => item != key.accountId);
      this.setState({
        selectedRowKeys: newRowKey
      });
			this.props.actions.removeFromCart({ stagingIds: [key.accountId] })
        .then(() => {
          this.setState({isGetAllInfo: false})
        })
			IsExactQuery && actions.removeSelectExactQuery([key.accountId])
		}
		if (seleced) {
			let faceImg = $(`#avatar_${isShowTypeByList ? "list_" : ""}${key.accountId}`);
			CartFly.show({
				start: faceImg,
				image: faceImg.data("src")
			})
		}
	}
	getSaveCart = (list) => {
		return list.map(one => ({ accountId: one.accountId, platformId: one.platformId }))
	}
	//全选/取消全选
	onSelectAllChange = (seleced, list, changeRows) => {
    if (this.state.isGetAllInfo) {
      return
    }
    this.setState({isGetAllInfo: true});
		const { IsExactQuery, actions, addLookDetailOrIndexList = {} } = this.props
		const stagingIds = changeRows.map(one => one.accountId)
		const { detali = [], index = [] } = addLookDetailOrIndexList
		if (seleced) {
			//同步发一个立刻选中
			this.props.actions.addSelectStatic(stagingIds);
      this.setState({
        selectedRowKeys: [...this.state.selectedRowKeys, ...stagingIds]
      });
			//精确查询选中添加
			IsExactQuery && actions.addSelectExactQuery(stagingIds)
			this.props.actions.addToCart({ itemTypeId: 1, accounts: this.getSaveCart(list) })
				.catch(() => {
					this.props.actions.removeFromCart({ stagingIds: stagingIds })
					IsExactQuery && actions.removeSelectExactQuery(stagingIds)
				})
        .then(() => {
          this.setState({isGetAllInfo: false})
        })
		} else {
			const stagingIds = changeRows.map(one => one.accountId);
      this.setState({
        selectedRowKeys: []
      });
			this.props.actions.removeFromCart({ stagingIds })
        .then(() => {
          this.setState({isGetAllInfo: false})
        });
			IsExactQuery && actions.removeSelectExactQuery(stagingIds)
		}

	}
	render() {
		const { visible, modalContent, } = this.state
		const { accountList = {}, header, tableProps,
			isShowNoFind, IsExactQuery,
			isShowTypeByList, columnsTypeByList,
			arrSelectExactQuery,//精确查询的数组
			isDeleteAction, batchRemove, actions//专为删除而设计，是否有删除，删除方法
		} = this.props;
		const { isSelect = [] } = accountList
		const rowSelection = {
			selectedRowKeys: IsExactQuery ? arrSelectExactQuery : this.state.selectedRowKeys,
			onSelect: this.onSelectChange,
			onSelectAll: this.onSelectAllChange,
			getCheckboxProps: record => (IsExactQuery ? {
				disabled: record.notExist == 1,
				name: record.name,
			} : {})
		};
		const pageConfig = {
			pageSize: Number(accountList.pageSize || 20),
			current: Number(accountList.pageNum || 1),
			total: accountList.total,
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
			render: (text, record, index) => {
				return record.notExist == 1 ?
					<NoExist name={record.snsName || record.accountId || record.snsId} />
					: <MainItem isDeleteAction={isDeleteAction} batchRemove={batchRemove} accountListItem={record} setModalContent={this.setModalContent} actions={actions} isPreloading={index < 4} />
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
						</div> :
						isShowTypeByList ? <Table
							className="account-table-wxy-list account-table-disabled-none"
							columns={columnsTypeByList}
							dataSource={accountList.list}
							rowKey={(record, index) => record.accountId && record.accountId || index}
							pagination={false}
							rowSelection={rowSelection}
							rowClassName={(record, index) => {
								return record.notExist == 1 ? "no-not-exist-row-color" : ""
							}}
						/> :
							<div className="account-table-wxy">
								<Table
									rowKey={record => record.accountId}
									className="account-table-wxy-title account-table-disabled-none"
									rowSelection={rowSelection}
									{...tableProps}
									columns={columns}
									dataSource={accountList.list}
									pagination={IsExactQuery ? false : {
										...pageConfig,
										showSizeChanger: true,
										showQuickJumper: true,
										onChange: this.onChangePageSize,
										onShowSizeChange: this.onShowSizeChange,
										pageSizeOptions: ["20", "50", "100"]
									}}
									rowClassName={(record, index) => {
										return record.notExist == 1 ? "no-not-exist-row-color" : ""
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
