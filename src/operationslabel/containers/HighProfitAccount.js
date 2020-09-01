import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Tabs, Input, Table, message, Modal, Spin} from "antd";
import VerificationImportAccountModal from '../components/VerificationImportAccountModal'
import * as Action from "../action/highProfitAccount";
import BulkSearchAccountModal from "@/operationslabel/components/BulkSearchAccountModal";

const {TabPane} = Tabs;
const {confirm} = Modal;
const Search = Input.Search;

class HighProfitAccount extends Component {
	constructor(props) {
		super(props);
		this.state = {
			platformId: 1, // 搜索tab key
			keyword: '', // 搜索文本框内容
			currentPage: 1, // 分页 - 当前第几页
			pageSize: 100, //页面数量
			selectedRowKeys: [], // table 选中的keys
			importAccountVisible: false, // 批量导入账号modal 显示、隐藏
			searchAccountVisible: false, // 批量查找账号modal 显示、隐藏
			searchModalStatus: 1,
			currentSearchType: 1, // 1.查询 2.批量查询
			loading: false,
			total: 0, //账号总数,
			accountIds: [],// 账号ID数组,
			delayCount: 0
		}

	}

	searchTypes = [
		{name: '微信公众号', id: 1},
		{name: '新浪微博', id: 2},
		{name: '视频/直播', id: 3},
		{name: '小红书', id: 4},
		{name: '其他', id: 5}
	]

	columns = [
		{
			title: 'account_id',
			dataIndex: 'accountId'
		},
		{
			title: '账号名称',
			dataIndex: 'snsName'
		},
		{
			title: '平台',
			dataIndex: 'groupType',
			render: (value) => {
				return this.getTabLabel(value);
			}
		},
		{
			title: '账号ID',
			dataIndex: 'snsId'
		},
		{
			title: '账号分类',
			dataIndex: 'isFamous',
			render: (value) => {
				return this.getIsFamous(value);
			}
		},
		{
			title: '被约次数',
			dataIndex: 'orderNum'
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
				return <a href='javascript:' onClick={() => {
					this.del(record)
				}}>删除</a>;
			}
		},
	];


	componentDidMount() {
		this.setState({
			currentSearchType: 1
		}, () => {
			this.getAccountInfo();
		})
	}

	/**
	 * 获取账号/账号列表请求  查找getAccountSearch，批量查找getBatchAccountSearch是两个接口，当页面操作删除账号，需要重新请求页面数据，需要记录页面请求的数据是查找还是批量查找得到的，
	 * 用currentSearchType记录。1表示查找getAccountSearch，2表示批量查找getBatchAccountSearch,
	 * 根据currentSearchType发送相应的i请求。
	 *
	 */
	getAccountInfo = () => {
		const {platformId, keyword, currentPage, pageSize, accountIds} = this.state;
		return new Promise(((resolve, reject) => {
			this.setState({
				loading: true
			}, () => {
				switch (this.state.currentSearchType) {
					case 1 :
						this.props.actions.getAccountSearch({platformId, keyword, currentPage, pageSize})
							.then((data) => {
								resolve(data);
							}).catch(() => {
								reject();
							}).finally(() => {
								this.setState({
									loading: false
								})
							});
						break;
					case 2 :
						this.props.actions.getBatchAccountSearch({platformId, accountIds, currentPage, pageSize})
							.then((data) => {
								resolve(data);
							}).catch(() => {
								reject();
							}).finally(() => {
								this.setState({
									loading: false
								})
							});
				}
			})
		}));
	}
	/**
	 *  tab 切换面包回调事件
	 */
	tabChange = (platformId) => {
		//账号查询
		this.setState({
			platformId: platformId * 1,
			currentSearchType: 1,
		}, () => {
			this.getAccountInfo();
		});
	};

	/**
	 * 搜索输入框change事件
	 */
	searchChange = (e) => {
		//账号查询
		this.setState({
			keyword: e.target.value
		});
	};

	/**
	 * 点击搜索或按下回车键时的回调
	 */
	search = () => {
		let keyword = this.state.keyword;
		if (!keyword) {
			return message.error('搜索条件不能为空');
		}
		this.setState({
			currentSearchType: 1
		}, () => {
			this.getAccountInfo();
		})
	};

	/**
	 * 分页改变事件
	 */
	changePage = (pageNum) => {
		this.setState({
			currentPage: pageNum,
			currentSearchType: 1,
		}, () => {
			// 分页改变重新请求列表接口
			this.getAccountInfo();
		});
	};
	onShowSizeChange = (current, size) => {
		this.setState({
			currentPage: current,
			currentSearchType: 1,
			pageSize: size
		}, () => {
			this.getAccountInfo()
		})

	}

	/**
	 * 获取 tab 的label
	 */
	getTabLabel = (platformId) => {
		platformId = platformId || this.state.platformId;
		let searchType = this.searchTypes.find(item => item.id === platformId);
		return searchType ? searchType.name : '';
	};

	/**
	 * 获取table的账号分类
	 */
	getIsFamous = (isFamous) => {
		if (isFamous === 1) {
			return "预约"
		} else if (isFamous === 2) {
			return "派单"
		}
	}

	/**
	 * 表格底部添加批量删除按钮
	 * @returns {*}
	 */
	footerHandle = () => {
		return <Button onClick={this.batchDel}>批量删除</Button>
	};

	/**
	 * 延迟获取账号列表数据, 首次延迟两秒, 之后每秒请求接口获取一次数据，最多5次
	 */
	delayGetAccountInfo = (cb) => {
		const accountInfo = this.props.accountInfo || {};
		const platformTotal = accountInfo.result && accountInfo.result.total || 0;
		if (this.state.delayCount > 3) {
			this.setState({
				delayCount: 0
			});
			if (cb && typeof cb === 'function') {
				cb(false);
			}
			return;
		}
		setTimeout(() => {
			this.getAccountInfo().then((data) => {
				let total = (data.data.result || {}).total;
				if (platformTotal === total) {
					this.setState({
						delayCount: this.state.delayCount + 1
					});
					this.delayGetAccountInfo(cb);
				} else {
					this.setState({
						delayCount: 0
					});
					if (cb && typeof cb === 'function') {
						cb(true);
					}
				}
			});
		}, 1000);
	};
	/**
	 * 单个删除
	 */
	del = (record) => {
		confirm({
			title: '提示',
			content: '确定删除该账号吗',
			onOk: () => {
				return new Promise(((resolve, reject) => {
					this.props.actions.getAccountDelete({accountIds: [record.accountId]})
						.then(res => {
							let code = res ? res.code ? res.code : null : null;
							if (code && code === "1000") {
								setTimeout(() => {
									this.delayGetAccountInfo((success) => {
										success && resolve();
									});
								}, 1000);
							} else {
								message.error('删除失败');
							}
						})
						.catch(() => {
							message.error('删除失败');
						})
				}));
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
			onOk: () => {
				return new Promise((resolve => {
					this.props.actions.getAccountDelete({accountIds: keys}).then(res => {
						let code = res ? res.code ? res.code : null : null;
						if (code && code === "1000") {
							this.delayGetAccountInfo((success) => {
								console.log('66666666');
								console.log(success);
								success && resolve();
							});
						} else {
							message.error('删除失败');
						}
					}).catch(() => {
						message.error('删除失败');
					})
				}))
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
	 * 批量查询modal 取消操作
	 */
	handleSearchAccountCancel = () => {
		this.setState({
			searchAccountVisible: false,
		}, () => {
			this.setState({
				searchModalStatus: 1
			})
		});
	};
	/**
	 * 批量搜索modal
	 */
	handleSearchAccountOk = ({platformId, accountIds}) => {
		this.setState({
			searchModalStatus: 2,
			accountIds: accountIds,
			platformId: platformId
		}, () => {
			this.setState({
				currentSearchType: 2,
				searchModalStatus: 3
			}, () => {
				this.getAccountInfo();
			})
		});
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
		const accountInfo = this.props.accountInfo || {};
		const {total = 0, order = 0, dispatch = 0, ok = 0, on = []} = accountInfo.statistic || {};
		const platform = accountInfo.result && accountInfo.result.total || 0;
		const successNum = {ok, on};
		const {list = []} = accountInfo.result || {};
		return (
			<div>
				<div className="high_profit_account">
					<h3>
						<span>运营管理-高利润账号管理</span>
					</h3>
					<h4 className="title">
						<span className="sub-title">账号信息</span>
						<em>账号数：{total}（预约类{order} 派单类{dispatch}）</em>
						<Button
							type="primary"
							size="small"
							className="btn-detail-edit"
							onClick={this.showImportAccountModal}
						>批量导入账号</Button>
					</h4>
					{total !== 0 ? <div>
						<div className='search'>
							<div className='search_tabs'>
								<Tabs className="tab" type="card" activeKey={this.state.platformId + "" || '1'} onChange={this.tabChange}>
									{
										this.searchTypes.map(item => (
											<TabPane tab={item.name} key={item.id}>
												<Search
													enterButton={'搜' + item.name}
													placeholder="请输入账号名称、账号ID"
													size="large"
													value={this.state.keyword}
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
						<div className='account_num'>{this.getTabLabel()}账号数: {platform}</div>
						<div>
							<Table
								loading={this.state.loading}
								rowKey='accountId'
								columns={this.columns}
								rowSelection={{
									selectedRowKeys: this.state.selectedRowKeys,
									onChange: this.selectionChange
								}}
								pagination={{
									pageSize: this.state.pageSize,
									current: this.state.currentPage,
									total: platform,
									onChange: this.changePage,
									showSizeChanger: true,
									showQuickJumper: true,
									onShowSizeChange: this.onShowSizeChange,
									pageSizeOptions: ["20", "50", "100"]
								}}
								footer={this.footerHandle}
								dataSource={list}>
							</Table>
						</div>
					</div> : (
						<div className="account-none-img-box">
							<img src={require("../images/none.png")}/>
							<div>暂无账号</div>
						</div>)
					}
				</div>
				{/*批量导入账号*/}
				<VerificationImportAccountModal
					visible={this.state.importAccountVisible}
					handleCancel={this.handleImportAccountCancel}
					pageSize={this.state.pageSize}
					keyword={this.state.keyword}
					platformId={this.state.platformId}
					currentPage={this.state.currentPage}
				></VerificationImportAccountModal>
				{/*批量查找账号*/}
				<BulkSearchAccountModal
					visible={this.state.searchAccountVisible}
					status={this.state.searchModalStatus}
					handleCancel={this.handleSearchAccountCancel}
					platform={this.searchTypes}
					handleOk={this.handleSearchAccountOk}
					successNum={successNum}
				/>
			</div>
		)

	}
}

const mapStateToProps = (state) => {
	return {
		accountInfo: state.operationslabelReducers.accountInfo || {},

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


