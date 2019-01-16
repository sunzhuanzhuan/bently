import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './FilterSelected.less'
import redBorder from "./image/closed_filter.jpg"
import fork from "./image/close_normal_2x.png"
import waste from "./image/btn_important_v2.png"
import Trash from "./image/clean.png"
import * as actions from "../actions/listApi"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import FilterAction from '../actions/FilterAction'
class FilterSelected extends Component {
	constructor() {
		super()
	}
	
	render() {
		let { category, followers_count, price } = this.props.filterParams.filterParams
		return (
			<tbody className='search-selected-all'>
				<tr className="search-grid">
					<td className="clearBorder">&nbsp;</td>
					<td className="clearBorder">
						{
							category || followers_count || price ?
								<div className="closed-filter-wrap clearfix">
									<em>已选择</em>
									{category ? (
										<span className="closed-filter-all fl">
											<span
												className="closed_filter"
												style={{ backgroundImage: "url(" + redBorder + ")" }}
											>
												<i style={{ backgroundImage: "url(" + redBorder + ")" }}>
													<span>分类</span>
													<span className="color-high-light">
														{category}
													</span>
												</i>
												<img
													src={fork}
													alt=""
													className="close"
													onClick={() => {
														this.props.actions.postApi({"category": null})		
														this.props.actions.removeSelected({ "category": null })
													}}
												/>
											</span>
										</span>
									) : null}
									{/*以上是行业筛选*/}
									{followers_count ? (
										<span className="closed-filter-all fl">
											<span
												className="closed_filter"
												style={{ backgroundImage: "url(" + redBorder + ")" }}
											>
												<i style={{ backgroundImage: "url(" + redBorder + ")" }}>
													<span>粉丝数</span>
													<span className="color-high-light">
														{followers_count}
													</span>
												</i>
												<img
													src={fork}
													alt=""
													className="close"
													onClick={() => {
														this.props.actions.postApi({"followers_count": null })													
														this.props.actions.removeSelected({ "followers_count": null })

													}}
												/>
											</span>
										</span>
									) : null}
									{price ? (
										<span className="closed-filter-all fl">
											<span
												className="closed_filter"
												style={{ backgroundImage: "url(" + redBorder + ")" }}
											>
												<i style={{ backgroundImage: "url(" + redBorder + ")" }}>
													<span>参考报价</span>
													<span className="color-high-light">
														{price}
													</span>
												</i>
												<img
													src={fork}
													alt=""
													className="close"
													onClick={() => {
														this.props.actions.postApi({ "price": null })
														this.props.actions.removeSelected({ "price": null })
													}}
												/>
											</span>
										</span>
									) : null}
									{/*以上是价格筛选*/}
									{/*以上是叉子*/}
									<span className="allbutton btn-small-important fl btn-empty" style={{ display: 'inline' }}>
										<span
											className="btn-wrap-delect"
											style={{
												backgroundImage: "url(" + waste + ") no-repeat left",
												color: "#fff",
												
											}}
											onClick={
												() => {
													this.props.actions.postApi({ "price": null, "followers_count": null, "category": null });
													this.props.actions.emptySelected(
														{ "price": null, "followers_count": null, "category": null }
													)
												}
											}
										>
										<img src={Trash} alt="" className="delete-account-filter" />
										清空筛选项
										</span>
									</span>
									{/*清空按钮*/}
								</div>
								: null
						}
					</td>
				</tr>
				
			</tbody>)
	}
}

const mapStateToProps = state => {
	
	return {
		filterParams: state.filterParams,
		postApi:state.postApi
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...actions,
		...FilterAction
	}, dispatch)
})

export default (connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(FilterSelected)))
