import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Tabs, Input, Table, message, Modal } from "antd";
import BulkImportAccountModal from '../components/BulkImportAccountModal';
import * as Action from "../action/highProfitAccount";
import BulkSearchAccountModal from "@/operationslabel/components/BulkSearchAccountModal";
import Login from "@/login/container/Login";
const { TabPane } = Tabs;
const { confirm } = Modal;
const Search = Input.Search;

class HighProfitAccount extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeKey: null, // 搜索tab key
			searchValue: '', // 搜索文本框内容
			current: 1, // 分页 - 当前第几页
			selectedRowKeys: [], // table 选中的keys
			importAccountVisible: false, // 批量导入账号modal 显示、隐藏
			searchAccountVisible: false, // 批量查找账号modal 显示、隐藏
			searchModalStatus: 1
		};
	}
	searchTypes = [
		{name: '微信公众号', groupType: 1},
		{name: '新浪微博', groupType: 2},
		{name: '视频/直播', groupType: 3},
		{name: '小红书', groupType: 4},
		{name: '其他', groupType: 5}
	]

	columns = [
		{
			title: 'account_id',
			dataIndex: 'accountId'
		},
		{
			title: '账号名称',
			dataIndex: 'accountName'
		},
		{
			title: '平台',
			dataIndex: 'platformId'
		},
		{
			title: '账号ID',
			dataIndex: 'snsId'
		},
		{
			title: '账号分类',
			dataIndex: 'groupType'
		},
		{
			title: '被约次数',
			dataIndex: 'appointmentCount'
		},
		{
			title: '当前价格有效期开始时间',
			dataIndex: 'startTime'
		},
		{
			title: '当前价格有效期结束时间',
			dataIndex: 'endTime'
		},
		{
			title: '操作',
			render: (text, record) => {
				return <a href='javascript:' onClick={() => {this.del(record)}}>删除</a>;
			}
		},
	];


	componentWillMount() {
		// 获取搜索类型
		this.props.actions.getSearchType();
		// 获取账户列表
		this.props.actions.getAccountList();
	}


	/**
	 *  tab 切换面包回调事件
	 */
	tabChange = (activeKey, b) => {
		this.setState({
			activeKey: activeKey,
			searchValue: ''
		});
	};

	/**
	 * 搜索输入框change事件
	 */
	searchChange = (e) => {
		this.setState({
			searchValue: e.target.value
		});
	};

	/**
	 * 点击搜索或按下回车键时的回调
	 */
	search = () => {
		let searchValue = this.state.searchValue;
		if (!searchValue) {
			return  message.error('搜索条件不能为空');
		}
		let activeKey = this.state.activeKey;
	};

	/**
	 * 分页改变事件
	 */
	changePage = (pageNum) => {
		this.setState({
			current: pageNum
		}, () => {
			// TODO
			// 分页改变重新请求列表接口
		});
	};

	/**
	 * 获取 tab 的label
	 */
	getTabLabel = () => {
		const activeKey = this.state.activeKey;
		if (activeKey === null) {
			return this.searchTypes[0].name;
		}
		let searchType = this.searchTypes.find(item => item.groupType === activeKey);
		return searchType ? searchType.name : '';
	};

	/**
	 * 表格底部添加批量删除按钮
	 * @returns {*}
	 */
	footerHandle = () => {
		return <Button onClick={this.batchDel}>批量删除</Button>
	};

	/**
	 * 单个删除
	 */
	del = (record) => {
		console.log(record);
		confirm({
			title: '提示',
			content: '确定删除该账号吗',
			onOk() {
				// TODO 调用删除接口
				// TODO 调用table数据接口
				message.success('删除成功');
			},
		});
	};

	/**
	 * 批量删除
	 */
	batchDel = () => {
		const keys = this.state.selectedRowKeys;
		if (!keys.length) {
			return message.error('请先选中账号再进行操作！');
		}
		confirm({
			title: '提示',
			content: '确定删除该账号吗',
			onOk() {
				// TODO 调用删除接口
				// TODO 调用table数据接口
				message.success('删除成功');
			},
		});

	};

	/**
	 * 多选选中项发生变化时的回调
	 */
	selectionChange = (selectedRowKeys) => {
		this.setState({
			selectedRowKeys: selectedRowKeys
		});
	};

	/**
	 * 显示批量导入modal
	 */
	showImportAccountModal = () => {
		this.setState({
			importAccountVisible: true
		});
	};

	/**
	 * 批量导入modal 取消操作
	 */
	handleImportAccountCancel = () => {
		this.setState({
			importAccountVisible: false
		});
	};

	/**
	 * 批量导入modal 开始导入
	 */
	handleImportAccountOk = (accountIds) => {
		console.log(accountIds);
	};

	/**
	 * 显示批量查找modal
	 */
	showSearchAccountModal = () => {
		this.setState({
			searchAccountVisible: true
		});
	};

	render() {
		const { accountnumber, add_account_mode } = this.props.detail;
		const accountInfo = this.props.accountInfo || {};
		const { totalAccount = 0, platformAccount = 0, yyAcount = 0, pdAccount = 0 } =this.props.accountInfo.count || {};
		return (
			<div>
				<div className="high_profit_account">
					<h3>
						<span>运营管理-高利润账号管理</span>
					</h3>

					<h4 className="title">
						<span className="sub-title">账号信息</span>
						<em>账号数：{totalAccount}（预约类{yyAcount} 派单类{pdAccount}）</em>
						<Button
							type="primary"
							size="small"
							className="btn-detail-edit"
							onClick={this.showImportAccountModal}
						>批量导入账号</Button>
					</h4>
					{ totalAccount && totalAccount !== 0 ? <div>
						<div className='search'>
							<div className='search_tabs'>
								<Tabs className="tab" type="card" onChange={this.tabChange}>
									{
										this.searchTypes.map(item => (
											<TabPane tab={item.name} key={item.groupType}>
												<Search
													enterButton={'搜' + item.name}
													placeholder="请输入账号名称、账号ID"
													size="large"
													value={this.state.searchValue}
													onChange={this.searchChange}
													onSearch={this.search}
												/>
											</TabPane>
										))
									}
								</Tabs>
								<Button
									className="batch_search"
									icon="search"
									size="small"
									onClick={this.showSearchAccountModal}
								>批量查找</Button>
							</div>
						</div>
						<div className='account_num'>{this.getTabLabel()}账号数: {platformAccount}</div>
						<div>
							<Table
								rowKey='id'
								columns={this.columns}
								rowSelection= {{
									selectedRowKeys: this.state.selectedRowKeys,
									onChange: this.selectionChange
								}}
								pagination={{
									pageSize: 10,
									current: this.state.current,
									total: accountInfo.count,
									onChange: this.changePage
								}}
								footer={this.footerHandle}
								dataSource={accountInfo.list || []}>
							</Table>
						</div>

					</div> : <div className="account-none-img-box"> <img  className='account-none-img' src={require("../images/none.png")} /></div>

					}
				</div>
				{/*批量导入账号*/}
				<BulkImportAccountModal
					visible={this.state.importAccountVisible}
					handleCancel={this.handleImportAccountCancel}
					handleOk={this.handleImportAccountOk}
				></BulkImportAccountModal>
				{/*批量查找账号*/}
				<BulkSearchAccountModal
					visible={this.state.searchAccountVisible}
					status={this.state.searchModalStatus}
					/>
			</div>
		)

	}
}

const mapStateToProps = (state) => {
	return {
		detail: {},
		searchType: state.operationslabelReducers.searchType || {},
		accountInfo: state.operationslabelReducers.accountInfo || {}
	}
};

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...Action
	}, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HighProfitAccount)


