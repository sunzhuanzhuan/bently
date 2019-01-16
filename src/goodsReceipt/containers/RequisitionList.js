import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from '../actions/index'
import { RequisitionTable, RequisitionSearch } from "../components";
import { TitleLable } from "../base";
import { Spin } from 'antd';
import qs from "qs";
import BreadCrumbs from "../base/BreadCrumbs";
import { withRouter } from "react-router-dom";
class RequisitionList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: {},
			isLoading: true
		};
	}
	componentDidMount = () => {
		const { actions: { getGRList }, authVisibleList, goodsReceiptIsAEPermission } = this.props
		getGRList({
			status: goodsReceiptIsAEPermission ? 0 : 3,
			is_for_audit: goodsReceiptIsAEPermission ? 2 : 1,
			page_size: 50
		}).then(() => {
			this.setIsLoading()
		})
	}
	setIsLoading = (value = false) => {
		this.setState({
			isLoading: value
		})
	}
	//点击查询并保存查询条件到state
	getGRListAsync = (searchValue) => {
		const { actions: { getGRList }, goodsReceiptIsAEPermission } = this.props
		const data = { ...searchValue, is_for_audit: goodsReceiptIsAEPermission ? 2 : 1 }
		this.setIsLoading(true)
		getGRList(data).then(() => {
			this.setState({
				searchValue: data
			})
			this.setIsLoading()
		})
	}
	//分页查询
	getGRListByPage = (pagination) => {
		const { actions: { getGRList }, goodsReceiptIsAEPermission } = this.props
		const { searchValue } = this.state
		this.setIsLoading(true)
		getGRList({ ...searchValue, ...pagination, is_for_audit: goodsReceiptIsAEPermission ? 2 : 1 }).then(() => {
			this.setIsLoading()
		})
	}

	//操作后的查询
	getGRListOperateAfter = () => {
		const { actions: { getGRList }, goodsReceiptIsAEPermission } = this.props
		const { searchValue } = this.state
		const search = qs.parse(this.props.location.search.substring(1))
		this.setIsLoading(true)
		getGRList({ ...searchValue, ...search, is_for_audit: goodsReceiptIsAEPermission ? 2 : 1 }).then(() => {
			this.setIsLoading()
		})
	}
	render() {
		const { actions, goodsReceipt, goodsReceiptIsAEPermission, GReditUrl } = this.props
		const { goodsReceiptList } = goodsReceipt
		const { isLoading } = this.state
		const tableProps = {
			actions,
			goodsReceiptList,
			getGRListByPage: this.getGRListByPage,
			getGRListOperateAfter: this.getGRListOperateAfter,
			goodsReceiptIsAEPermission,
			GReditUrl
		}
		return (
			<div>
				<BreadCrumbs text={goodsReceiptIsAEPermission ? "GR申请单列表" : "GR申请单审核列表"} />
				<TitleLable title="筛选项">
					<RequisitionSearch
						actions={actions}
						getGRListAsync={this.getGRListAsync}
						goodsReceiptIsAEPermission={goodsReceiptIsAEPermission}
					/>
				</TitleLable>
				<TitleLable title="GR申请单列表">
					<Spin spinning={isLoading}>
						<RequisitionTable {...tableProps} />
					</Spin>
				</TitleLable>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		goodsReceipt: state.goodsReceipt,
		authVisibleList: state.authorizationsReducers.authVisibleList,
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(action, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(RequisitionList))
