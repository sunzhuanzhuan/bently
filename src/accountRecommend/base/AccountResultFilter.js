import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './AccountResultFilter.less'
import buttonImage from "./image/btn_important_v2.png"
import FilterSelected from './FilterSelected'
import * as actions from "../actions/listApi"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import FilterAction from '../actions/FilterAction'
import { Row, Col } from 'antd';
class AccountResultFilter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			all: true,
		};
		this.unfold = this.unfold.bind(this);
	}
	unfold() {
		this.setState({ all: !this.state.all });
		let b = document.getElementsByClassName('filterTab-classify')[0];
		b.style.height = this.state.all == true ? '30px' : '60px'
		b.style.overflow = this.state.all == true ? 'hidden' : 'visible'
	}
	changeBorder(ev) {
		ev.target.style.border = "1px solid #333"
	}
	removeBorder(ev) {
		ev.target.style.border = "1px solid #CCCCCC"
	}
	async componentWillReceiveProps(nextProps) {
		if (this.checkArrObj(this.props.filterParams.postApi, nextProps.filterParams.postApi,
			["category", "followers_count", 'price', "pricekey", 'pricetype']))
			return false
		let data = this.props.weiboType == 9 ?
			await this.props.actions.FilterList(nextProps.filterParams.postApi)
			: await this.props.actions.sinaList(nextProps.filterParams.postApi)

		this.props.actions.getList(data)
	}
	checkArrObj(obj, oldObj, arr) {
		for (let i = 0; i < arr.length; i++) {
			if (obj[arr[i]] !== oldObj[arr[i]]) {
				return false;
			}
		}
		return true
	}
	optionChange(x) {
		let keyValue = x.target.value
		x.target.value == '' ?
			this.props.actions.postApi({ "pricekey": null, 'task_id': this.props.taskId, 'page': 1 })
			: this.props.actions.postApi({ "pricekey": keyValue, 'task_id': this.props.taskId, 'page': 1 })
	}
	optionTypeChange(y) {
		let value = y.target.value;
		y.target.value == '' ?
			this.props.actions.postApi({ "pricetype": null, 'task_id': this.props.taskId, 'page': 1 })
			: this.props.actions.postApi({ "pricetype": value, 'task_id': this.props.taskId, 'page': 1 })
	}
	render() {
		let { FilterData, taskId } = this.props;
		let industry = ""
		if (FilterData) {
			industry = FilterData["key_map_list"]["category"]
		}
		return (
			<div className="account-filter" >
				<table width="100%">
					<Row>
						<tbody>
							{/*分类*/}
							<tr>
								<th className="classify">
									<span>{industry}</span>
								</th>
								<td>
									<div className="filterTab">
										<ul>
											<div className='filterTab-classify' style={{ position: 'relative', height: 32, overflow: 'hidden' }}>
												<Col span={22}>
													<li>
														{FilterData
															? FilterData["category"].map(item => {
																return (
																	<span key={item.id}
																		onClick={() => {
																			//添加到接口微信
																			this.props.actions.postApi(
																				{ "category": item["id"], 'task_id': taskId, 'page': 1 }
																			)
																			item['name'] == '不限' ?
																				this.props.actions.removeSelected({ "category": null }) && this.props.actions.postApi({ "category": null })
																				: this.props.actions.all(
																					{ "category": item['name'] }
																				)
																		}}
																	>
																		<span className="nav-item" >
																			{item["name"]}
																		</span>
																	</span>

																)
															})
															: ""}
													</li>
												</Col>
												<Col span={2}>
													<span className='account-FilterMore' onClick={this.unfold}>更多<img src={require('./image/arrow_up_normal_2x.png')} />
													</span>
												</Col>

											</div>
										</ul>
									</div>
								</td>
							</tr>
							{/*粉丝数*/}

							<tr>
								<th className="classify">
									<span>粉丝数</span>
								</th>
								<td>
									<div className="filterTab clearfix">
										<ul>
											<Col span={18}>
												{FilterData
													? FilterData["followers_count"].map(item => {
														return (
															<li key={item.id}>
																<span
																	onClick={() => {
																		this.props.actions.postApi(
																			{ "followers_count": item["id"], 'task_id': taskId, 'page': 1 }
																		)
																		item['name'] == '不限' ? this.props.actions.removeSelected({ "followers_count": null })
																			&& this.props.actions.postApi({ "followers_count": null })
																			: this.props.actions.all({ "followers_count": item['name'] })
																	}}>
																	<span className="nav-item">
																		{item["name"]}
																	</span>
																</span>
															</li>
														)
													})
													: ""}
											</Col>
											<Col span={6}>
												<p className="account-fixPrice">
													<span>
														<input
															type="text"
															className="price-range"
															ref={x => (this.fansBefore = x)}
															onFocus={this.changeBorder}
															onBlur={this.removeBorder}
														/>
														-
											<input
															type="text"
															className="price-range"
															ref={x => (this.fansAfter = x)}
															onFocus={this.changeBorder}
															onBlur={this.removeBorder}
														/>
														<span>万</span>
													</span>
													<span className="buttonAccount btn-small-important">
														<span
															className="btn-wrap"
															style={{
																backgroundImage:
																	"url(" + buttonImage + ") no-repeat left",
																color: "#fff"
															}}
															onClick={() => {
																this.props.actions.postApi(
																	{ "followers_count": (this.fansBefore.value) * 10000 + '-' + (this.fansAfter.value) * 10000, 'task_id': taskId, 'page': 1 }
																)
																this.props.actions.all(
																	{ "followers_count": (this.fansBefore.value) * 10000 + '-' + (this.fansAfter.value) * 10000 }
																)
															}}
														>
															确定
											</span>
													</span>
												</p>
											</Col>

										</ul>
									</div>
								</td>
							</tr>
							{/*价格筛选框*/}
							<tr>
								<th className="classify">
									<span>价格</span>
								</th>
								<td>
									<div className="filterTab clearfix">
										<ul>
											<Col span={18}>
												{
													//微信才有的价格标识
													this.props.platform == 'weixin' ?

														<li className="WeChart-filterSelect">
															<select
																onChange={this.optionChange.bind(this)}
																name=""
																id="price_key"

															// value={pricekey}
															>
																{FilterData ? FilterData["pricekey"].map(item => {
																	return (
																		<option value={item["id"]} key={item.id}>
																			{item["name"]}
																		</option>
																	)
																})
																	: null}
															</select>
															<select
																name="pricetype"
																id=""
																onChange={this.optionTypeChange.bind(this)}
															>
																{FilterData ? FilterData["pricetype"].map(item => {
																	return (
																		<option value={item["id"]} key={item.id}
																		>
																			{item["name"]}
																		</option>
																	)
																})
																	: null}
															</select>
														</li>
														: null
												}
												{/*以上 微信价格筛选的select选择框*/}

												{FilterData
													? FilterData["price"].map(item => {
														return (
															<li key={item.id}>
																<span
																	onClick={() => {
																		this.props.actions.postApi(
																			{ "price": item["id"], 'task_id': taskId, 'page': 1 }
																		)
																		item.name == '不限' ?
																			this.props.actions.removeSelected({ "price": null }) && this.props.actions.postApi({ "price": null })
																			: this.props.actions.all({ "price": item['name'] }
																			)
																	}}>
																	<span className="nav-item">
																		{item["name"]}
																	</span>
																</span>
															</li>
														)
													})
													: ""}
											</Col>
											<Col span={6} >
												{
													//价格手动输入
													<p className="account-fixPrice">
														<span>
															<input
																type="text"
																className="price-range"
																ref={x => (this.before = x)}
																onFocus={this.changeBorder}
																onBlur={this.removeBorder}
															/>
															-
                                                    <input
																type="text"
																className="price-range"
																ref={x => (this.after = x)}
																onFocus={this.changeBorder}
																onBlur={this.removeBorder}
															/>
															<span>元</span>
														</span>
														<span className="buttonAccount btn-small-important">
															<span
																className="btn-wrap"
																style={{
																	backgroundImage:
																		"url(" + buttonImage + ") no-repeat left",
																	color: "#fff"
																}}
																onClick={() => {
																	this.props.actions.postApi(
																		{ "price": this.before.value + '-' + this.after.value, 'task_id': taskId, 'page': 1 }
																	)
																	this.props.actions.all(
																		{ "price": this.before.value + '-' + this.after.value }
																	)
																}}
															>
																确定
                                               </span>
														</span>
													</p>
												}
											</Col>
										</ul>
									</div>
								</td>
							</tr>
							{/*已选项*/}
						</tbody>
						<FilterSelected FilterData={this.state.FilterData}></FilterSelected>
					</Row>
				</table>
			</div >)
	}
}
const mapStateToProps = state => (
	{
		filterParams: state.filterParams,
		postApi: state.postApi,
		getList: state.getList
	}
)
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...actions,
		...FilterAction
	}, dispatch)
})
export default (connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(AccountResultFilter)))



