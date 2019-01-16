import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as studioActions from "../actions";
import { message } from "antd";
import { detailConfig } from "../constants";
import StudioDetailQuery from '../components/studioDetail/detailQuery'
import StudioDetailTable from '../components/studioDetail/detailTable'
import StudioModal from '../components/studioModal'
import "./studioManage.less";
import numeral from "numeral";
import qs from 'qs';

class StudioDetail extends React.Component {
	constructor() {
		super();
		this.state = {
			newModalVisible: false,
			pageSize: '',
			filterParams: {},
			isClick: false,
			curSelectRowKeys: [],
			curSelectRows: []
		}
	}
	componentDidMount() {
		const { getStudioMetadata, getAllocationListStat } = this.props.actions;
		getStudioMetadata();
		getAllocationListStat({ page: 1, page_size: 20 });
	}
	pageChange = (page, page_size) => {
		const { filterParams } = this.state;
		this.props.actions.getAllocationListStat({ ...filterParams, page, page_size });
	}
	sizeChange = (page, page_size) => {
		const { filterParams } = this.state;
		this.props.actions.getAllocationListStat({ ...filterParams, page, page_size });
	}
	handlefilterParams = (filterParams) => {
		this.setState({ filterParams });
	}
	handleCurRowsChange = (curSelectRowKeys = [], curSelectRows = []) => {
		this.setState({ curSelectRowKeys, curSelectRows });
	}
	handleVisible = () => {
		const { getStudioNameCheck } = this.props.actions;
		const hide = message.loading('处理中，请稍候...');
		getStudioNameCheck({ status: 1, page: 1, page_size: 100 }).then(() => {
			this.setState({ newModalVisible: true }, () => {
				hide();
			});
		}).catch(({ errorMsg }) => {
			hide();
			message.error(errorMsg || '请求失败，请重试');
		});
	}
	handleSubmit = (values) => {
		const { postTransferPayment, getAllocationList } = this.props.actions;
		const { pageSize, curSelectRows, filterParams } = this.state;
		this.setState({ isClick: true });
		let payment = curSelectRows.map(item => {
			return { 'source_type': item.source_type, 'source_id': item.source_id }
		});
		let params = { expect_studio_id: values.to_studio_id, payment };
		const hide = message.loading('操作中，请稍候...');
		postTransferPayment(qs.stringify({ ...params })).then(() => {
			this.handleOnCancel();
			getAllocationList({ ...filterParams, page: 1, page_size: pageSize });
			this.handleCurRowsChange();
			hide();
			message.success('操作成功！');
			this.setState({ isClick: false });
		}).catch(({ errorMsg }) => {
			hide();
			message.error(errorMsg || '操作失败！');
			this.setState({ isClick: false });
		})
	}
	handleOnCancel = () => {
		this.setState({ newModalVisible: false })
	}
	handlePageSize = (pageSize) => {
		this.setState({ pageSize });
	}
	render() {
		const { newModalVisible, record, pageSize, filterParams, isClick, curSelectRowKeys, curSelectRows } = this.state;
		const { allocationData: { rows, total, page }, studioMetadata: { source_type = [], source_status = [] }, studioNameCheck, allocationStatData: { payment_count, user_count, occupy_amount_sum } } = this.props;
		return <div className='studio-manage'>
			<fieldset className='fieldset_css'>
				<legend>查询</legend>
				<StudioDetailQuery
					sourceType={source_type}
					sourceStatus={source_status}
					page={page}
					pageSize={pageSize}
					questAction={this.props.actions.getAllocationList}
					searchAction={this.props.actions.getAllocationListStat}
					handlefilterParams={this.handlefilterParams}
					handleCurRowsChange={this.handleCurRowsChange}
				></StudioDetailQuery>
			</fieldset>
			<fieldset className='fieldset_css'>
				<legend>查询结果</legend>
				<QueryStatistics
					payment_count={payment_count}
					user_count={user_count}
					occupy_amount_sum={occupy_amount_sum}
				></QueryStatistics>
			</fieldset>
			<div className='top-gap'>
				<StudioDetailTable
					columns={detailConfig}
					dataSource={rows}
					rowKey='id'
					questAction={this.props.actions.getAllocationList}
					total={total}
					current={parseInt(page)}
					pageSize={parseInt(pageSize)}
					pageChange={this.pageChange}
					sizeChange={this.sizeChange}
					filterParams={filterParams}
					handlePageSize={this.handlePageSize}
					handleVisible={this.handleVisible}
					handleCurRowsChange={this.handleCurRowsChange}
					curSelectRowKeys={curSelectRowKeys}
				></StudioDetailTable>
			</div>
			<div>
				{newModalVisible ? <StudioModal
					visible={newModalVisible}
					type='change'
					onCancel={this.handleOnCancel}
					record={record}
					page={page}
					page_size={pageSize}
					studioNameCheck={studioNameCheck}
					sourceType={source_type}
					curSelectRows={curSelectRows}
					handleSubmit={this.handleSubmit}
					isClick={isClick}
				></StudioModal> : null}
			</div>
		</div>
	}
}

const mapStateToProps = (state) => {
	return {
		studioMetadata: state.studioManage.studioMetadata,
		allocationData: state.studioManage.allocationData,
		studioNameCheck: state.studioManage.studioNameCheck,
		allocationStatData: state.studioManage.allocationStatData,
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...studioActions }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(StudioDetail)

const QueryStatistics = ({ payment_count, user_count, occupy_amount_sum }) => {
	return <div className='left-gap'>
		<div>
			打款单：<span className='red-font'>{payment_count}</span>个;
			主账号：<span className='red-font'>{user_count}</span>个;
			总金额：<span className='red-font'>{numeral(occupy_amount_sum / 100).format('0,0.00')}</span>元;
		</div>
	</div>
}
