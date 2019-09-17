import React, { Component } from 'react';
import { connect } from "react-redux";
import './WebsiteInformation.less';
import { bindActionCreators } from "redux";
import * as WebsiteActions from '../actions';
import { Table, Spin } from 'antd';
import ClueForm from '../components/form/ClueForm';
import moment from 'moment';

class WebsiteInformation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			queryParams: {
				page: {
					currentPage: 1,
					pageSize: 20
				},
				form: {
					name: '',
					cellPhone: '',
					startCreatedAt: '',
					endCreatedAt: '',
					companyName: ''
				}
			},
			columns: [{
				title: 'ID',
				key: 'id',
				dataIndex: 'id'
			}, {
				title: '姓名',
				key: 'name',
				dataIndex: 'name'
			}, {
				title: '手机号',
				key: 'cellPhone',
				dataIndex: 'cellPhone'
			}, {
				title: '公司名称',
				key: 'companyName',
				dataIndex: 'companyName'
			}, {
				title: '提交时间',
				key: 'createdAt',
				dataIndex: 'createdAt',
				render: (text, record) => {
					return moment(text).format('YYYY-MM-DD')
				}

			}]
		}
	}

	componentWillMount() {
		this.props.actions.getWebsiteClueList(this.state.queryParams).then(() => {
			this.setState({ loading: false });
		});
	}

	changePage = (page) => {
		const queryParams = {
			...this.state.queryParams,
			page: {
				...this.state.queryParams.page,
				currentPage: page
			}
		}
		this.setState({
			loading: true,
			queryParams: { ...queryParams }
		}, () => {
			this.props.actions.getWebsiteClueList(this.state.queryParams);
			this.setState({ loading: false });
		})
	};

	/**
	 * 改变当前state
	 * @param params
	 */
	changState = (params, fn) => {
		this.setState(params, fn);
	};

	render() {
		const { clubInfo = {}, actions } = this.props;
		const { total = 0, pageNum, pageSize, list = [] } = clubInfo
		return <div className='website-information-wrap'>
			<h3>运营管理-官网线索列表</h3>
			<div className='filter-wrap'>
				<ClueForm
					queryParams={this.state.queryParams}
					changState={this.changState}
					formValue={this.state.queryParams.from}
					actions={actions}
				/>
			</div>
			<div>
				<Spin spinning={this.state.loading}>
					<div className='total-wrap'>
						共
						<span className="total-num">{total}</span>
						条线索
					</div>
					<Table columns={this.state.columns}
						dataSource={list}
						rowKey={record => record.id}
						pagination={
							{
								total: total,
								pageSize: pageSize,
								current: pageNum,
								onChange: this.changePage.bind(this)
							}
						}
					></Table>
				</Spin>
			</div>
		</div>
	}
}

const mapStateToProps = (state) => {
	return {
		clubInfo: state.websiteReducer.clubInfo
	}
};
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...WebsiteActions
	}, dispatch)
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WebsiteInformation)
