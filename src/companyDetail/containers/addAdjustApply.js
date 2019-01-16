import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as goldenActions from "../actions/goldenApply";
import { Button, Row, Modal, message, Table } from "antd";
import ListQuery from '../components/addAdjustApply/listQuery';
import ApplyTable from '../components/addAdjustApply/applyTable';
import ApplyModal from '../components/addAdjustApply/applyModal';
import { addAdjustApplyConfig, readyCheckFunc } from "../constants";
import "./golden.less";
import qs from 'qs';
import difference from 'lodash/difference';

class AddAdjustApply extends React.Component {
	constructor() {
		super();
		this.state = {
			tipVisible: false,
			checkVisible: false,
			isClick: false,
			loading: false,
			curSelectRowKeys: [],
			curSelectRows: [],
			rowsMap: {},
		}
	}
	componentDidMount() {
		const search = qs.parse(this.props.location.search.substring(1));
		this.props.actions.getGoldenToken();
		delete search['requirement_label'];
		this.queryData({ page: 1, ...search.keys });
	}
	queryData = (obj, func) => {
		this.setState({ loading: true });
		return this.props.actions.getApplyOrderList({ ...obj }).then(() => {
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
	handleDelete = (order_id) => {
		const { rowsMap } = this.state;
		let obj = { ...rowsMap };
		delete obj[order_id];
		let ary = Object.values(obj);
		let curSelectRowKeys = ary.map(item => item.order_id);
		this.setState({ curSelectRowKeys, curSelectRows: ary, rowsMap: obj });
	}
	handleClear = () => {
		this.setState({ curSelectRowKeys: [], curSelectRows: [], rowsMap: {} });
	}
	render() {
		const { loading, tipVisible, checkVisible, curSelectRowKeys, curSelectRows } = this.state;
		const { applyOrderList: { list = [], page, total }, goldenToken } = this.props;
		const readyList = readyCheckFunc(this.handleDelete);
		return <div className='add-adjust-apply'>
			<fieldset className='fieldset_css'>
				<legend>统计</legend>
				<div className='left-gap'>
					已选订单:<span className='red-font' style={{ marginLeft: '10px' }}>{curSelectRowKeys.length}</span>个
					<Button className='left-gap' type='primary' onClick={() => {
						this.setState({ checkVisible: true });
					}}>查看已选</Button>
				</div>
			</fieldset>
			<ListQuery
				type={'add'}
				questAction={this.props.actions.getApplyOrderList}
				location={this.props.location}
				history={this.props.history}
				curSelectRowKeys={curSelectRowKeys}
				handleClear={this.handleClear}
			></ListQuery>
			<ApplyTable
				type={'add'}
				rowKey={'order_id'}
				columns={addAdjustApplyConfig}
				dataSource={list}
				loading={loading}
				queryAction={this.queryData}
				page={parseInt(page)}
				total={parseInt(total)}
				curSelectRowKeys={curSelectRowKeys}
				curSelectRows={curSelectRows}
				handleSelected={this.handleSelected}
				location={this.props.location}
				scroll={{ x: 1600 }}
			/>
			<Row className='top-gap' style={{ textAlign: 'center' }}>
				<Button className='adjust-apply-btn' type='default' onClick={() => {
					this.props.history.push('/golden/adjustApply')
				}}>上一步</Button>
				<Button className='adjust-apply-btn left-gap' type='primary' disabled={!curSelectRowKeys.length}
					onClick={
						() => { this.setState({ tipVisible: true }) }
					}>提交审核</Button>
			</Row>
			{tipVisible ? <ApplyModal
				type={'add'}
				visible={tipVisible}
				queryAction={this.queryData}
				curSelectRowKeys={curSelectRowKeys}
				curSelectRows={curSelectRows}
				onCancel={() => { this.setState({ tipVisible: false }) }}
				handleClear={this.handleClear}
				goldenToken={goldenToken}
				location={this.props.location}
			>
			</ApplyModal> : null}
			<CheckModal checkVisible={checkVisible} columns={readyList} dataSource={curSelectRows}
				handleClear={this.handleClear}
				onCancel={() => { this.setState({ checkVisible: false }) }}
			/>
		</div>
	}
}

const mapStateToProps = (state) => {
	return {
		applyOrderList: state.companyDetail.applyOrderList,
		goldenToken: state.companyDetail.goldenToken
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...goldenActions }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(AddAdjustApply)
function CheckModal(props) {
	return <Modal
		visible={props.checkVisible}
		width={1000}
		title='查看已选'
		footer=""
		onCancel={props.onCancel}
		wrapClassName='accounting-dialog-list'
	>
		<Button
			type="primary"
			onClick={props.handleClear}
		>
			清空已选
				</Button>
		<Table
			className='top-gap'
			rowKey='id'
			columns={props.columns}
			dataSource={props.dataSource}
			size="small"
			pagination={false}
			scroll={{ y: 760 }}
		>
		</Table>
	</Modal>
}
