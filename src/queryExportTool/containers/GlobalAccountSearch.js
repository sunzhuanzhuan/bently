import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { message, Form, Pagination } from 'antd';
import { default as BatchSearchCode } from '../components/accountList/SearchFrom/BatchSearchCode'
import { getFiltersMeta } from '../actions/filter.js'
import { getBatchSearch } from '../actions/index.js'
import { SearchResultTable } from '../components/accountList/SearchResultTable'
import './GlobalAccountSearch.less'

class GlobalAccountSearch extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			value: {},
			show: false
		}
	}
	componentWillMount() {
		this.props.actions.getFiltersMeta()
	}
	batchSearch = (value, page) => {
		this.setState({
			loading: true,
			value: { ...value },
			show: true
		})
		const total = value.accoutName.length
		this.props.actions.getBatchSearch({ ...value, pageSize: 20, page: page ? page : 1, accoutName: total }).then(() => {
			this.setState({
				loading: false
			})
		}).catch(() => {
			message.error("数据获取失败")
			this.setState({
				loading: false
			})
		})
	}
	render() {
		const { queryExportToolReducer } = this.props;
		const { filtersMetaMap, batchSearchList = {} } = queryExportToolReducer;
		const { statistic = {}, pagination = {} } = batchSearchList
		const { aOffShelf, bOffShelf, aOnShelf, bOnShelf, notExist } = statistic
		return (
			<div>
				<h2 className="globalAccountSearch-title">全库账号搜索</h2>
				<BatchSearchCode batchSearch={this.batchSearch} filtersMetaMap={filtersMetaMap} />
				{
					this.state.show ?
						<div>
							< div className="globalAccountSearch-statistic">
								<span>
									共查询账号 <a>{statistic.total}</a>个，
									其中在A端上架 <a>{aOnShelf}</a>个/下架 <a>{aOffShelf}</a>个，
									B端上架 <a>{bOnShelf}</a>个/下架 <a>{bOffShelf}</a>个，
									不在库：<a>{notExist}</a>个
								</span>
								{
									this.state.value.query_type == 1 ?
										<Pagination className="globalAccountSearch-statistic-pagination"
											simple
											current={pagination.page}
											total={pagination.total}
											onChange={(page) => this.batchSearch(this.state.value, page)}
											pageSize={20}
										/> : null
								}
							</div>
							<SearchResultTable
								loading={this.state.loading}
								accountList={batchSearchList}
								searchParams={this.state.value}
								batchSearch={this.batchSearch}
							/>
						</div> : null
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		queryExportToolReducer: state.queryExportToolReducer
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		getFiltersMeta, getBatchSearch
	}, dispatch)
})

export default connect(
	mapStateToProps,//redux和react连接起来
	mapDispatchToProps
)(Form.create()(GlobalAccountSearch))

