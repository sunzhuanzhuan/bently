import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as goldenActions from "../actions/goldenApply";
import { Button, Row, Modal, message, Input } from "antd";
import ListQuery from '../components/addAdjustApply/listQuery';
import ApplyTable from '../components/addAdjustApply/applyTable';
import ApplyModal from '../components/addAdjustApply/applyModal';
import { adjustApplyDetailFunc } from "../constants";
import "./golden.less";
import qs from 'qs';
import difference from 'lodash/difference';
const { TextArea } = Input;

class AdjustApplyDetail extends React.Component {
	constructor() {
		super();
		this.state = {
			tipVisible: false,
			rejectVisible: false,
			loading: false,
			flag: false,
			curSelectRowKeys: [],
			curSelectRows: [],
			rowsMap: {},
		}
	}
	componentDidMount() {
		const search = qs.parse(this.props.location.search.substring(1));
		const { getCompanyDetailAuthorizations, getGoldenMetadata } = this.props.actions;
		getCompanyDetailAuthorizations().then(() => {
			const { companyDetailAuthorizations } = this.props
			const flag = companyDetailAuthorizations[0].permissions['readjust.finance.operation'];
			this.setState({ flag });
		})
		getGoldenMetadata();
		this.queryData({ page: 1, ...search.keys });
	}
	queryData = (obj, func) => {
		this.setState({ loading: true });
		return this.props.actions.getApplicationDetail({ ...obj }).then(() => {
			if (func && Object.prototype.toString.call(func) === '[object Function]') {
				func();
			}
			this.setState({ loading: false })
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false });
			message.error(errorMsg || '列表加载失败，请重试！');
		})
	}
	handleSelected = (selectedRowKeys, selectedRows) => {
		const { rowsMap } = this.state;
		let curKeys = [], rows = {};
		selectedRows.forEach(item => {
			curKeys.push(item.order_id);
			rows[item.order_id] = item;
		});
		let otherKeys = difference(selectedRowKeys, curKeys);
		otherKeys.forEach(item => rows[item] = rowsMap[item]);
		let rowsAry = Object.values(rows);
		this.setState({ curSelectRowKeys: selectedRowKeys, rowsMap: rows, curSelectRows: rowsAry });
	}
	handleClear = () => {
		this.setState({ curSelectRowKeys: [], curSelectRows: [], rowsMap: {} });
	}
	showReject = () => {
		this.setState({ rejectVisible: true });
	}
	handleReject = () => {
		const search = qs.parse(this.props.location.search.substring(1));
		const { postRejectByOrderIds } = this.props.actions;
		const { curSelectRowKeys } = this.state;
		const remark = document.querySelector('#reject-remark').value;
		const params = {
			order_ids: curSelectRowKeys.toString(),
			readjust_application_id: search.readjust_application_id,
			remark
		};
		const hide = message.loading('操作中，请稍候...');
		postRejectByOrderIds({ ...params }).then(() => {
			this.queryData({ page: 1, ...search.keys }, () => {
				message.success('操作成功！');
				this.handleClear();
				hide();
				this.setState({ rejectVisible: false });
			})
		}).catch(({ errorMsg }) => {
			hide();
			message.error(errorMsg || '操作失败！');
		})
	}
	render() {
		const { loading, tipVisible, rejectVisible, flag, curSelectRowKeys, curSelectRows } = this.state;
		const { applicationDetail: { list = [], page = 1, total = 0 }, goldenMetadata: { rel_order_status = [] } } = this.props;
		const adjustApplyDetail = flag ? adjustApplyDetailFunc(rel_order_status)(['order_id', 'status', 'company_name', 'project_name', 'requirement_id', 'requirement_name', 'platform_name', 'account_id', 'weibo_name', 'price', 'quoted_price', 'history_min_sell_price', 'history_rate', 'min_sell_price', 'quote_type', 'pass_time', 'remark']) : adjustApplyDetailFunc(rel_order_status)(['order_id', 'status', 'company_name', 'project_name', 'requirement_id', 'requirement_name', 'platform_name', 'account_id', 'weibo_name', 'price', 'history_min_sell_price', 'min_sell_price', 'pass_time', 'remark']);
		return <div className='add-adjust-apply'>
			<fieldset className='fieldset_css'>
				<legend>统计</legend>
				<div className='left-gap'>
					申请订单:<span className='red-font' style={{ marginLeft: '10px' }}>{total}</span>个
				</div>
			</fieldset>
			<ListQuery
				type={'detail'}
				questAction={this.props.actions.getApplicationDetail}
				location={this.props.location}
				history={this.props.history}
				rel_order_status={rel_order_status}
			></ListQuery>
			<ApplyTable
				type={flag ? 'write_detail' : 'read_detail'}
				rowKey={'order_id'}
				columns={adjustApplyDetail}
				dataSource={list}
				loading={loading}
				queryAction={this.queryData}
				page={parseInt(page)}
				total={parseInt(total)}
				curSelectRowKeys={curSelectRowKeys}
				curSelectRows={curSelectRows}
				handleSelected={this.handleSelected}
				location={this.props.location}
				scroll={flag ? { x: 2770 } : { x: 2170 }}
			>
			</ApplyTable>
			{flag ? <Row className='top-gap' style={{ textAlign: 'center' }}>
				<Button className='adjust-apply-btn' type='primary' onClick={() => {
					this.setState({ tipVisible: true });
				}} disabled={!curSelectRowKeys.length}>审核通过</Button>
				<Button className='adjust-apply-btn left-gap' type='primary' onClick={this.showReject} disabled={!curSelectRowKeys.length}>驳回</Button>
			</Row> : null}
			{tipVisible ? <ApplyModal
				type={'detail'}
				visible={tipVisible}
				queryAction={this.queryData}
				curSelectRowKeys={curSelectRowKeys}
				curSelectRows={curSelectRows}
				handleClear={this.handleClear}
				onCancel={() => { this.setState({ tipVisible: false }) }}
				location={this.props.location}
				quoteType={curSelectRows.length > 0 ? curSelectRows[0].quote_type : null}
			>
			</ApplyModal> : null}
			{rejectVisible ? <Modal title='订单调价处理' visible={rejectVisible}
				onOk={this.handleReject}
				onCancel={() => { this.setState({ rejectVisible: false }) }}
				maskClosable={false}
			>
				备注：<TextArea id='reject-remark' placeholder='非必输' style={{ width: 400, verticalAlign: 'top' }} autosize={{ minRows: 4, maxRows: 6 }} maxLength={50} />
			</Modal> : null}
		</div>
	}
}

const mapStateToProps = (state) => {
	return {
		companyDetailAuthorizations: state.companyDetail.companyDetailAuthorizations,
		goldenMetadata: state.companyDetail.goldenMetadata,
		applicationDetail: state.companyDetail.applicationDetail
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...goldenActions }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(AdjustApplyDetail);
