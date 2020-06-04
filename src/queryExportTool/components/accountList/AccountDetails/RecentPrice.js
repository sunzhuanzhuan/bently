import React, { Component } from 'react'
import { List, message, Spin, Row, Col, Alert, Tag } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import "./RecentPrice.less"
import { executionList, executionMap } from "../../../constants/executionData";
import { getWeixinAvg, getOtherAllAvg } from "../../../base/SimpleTables/unit";
import MarkMessage from "../../../base/MarkMessage";

class RecentPrice extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			loading: false,
			hasMore: true,
			page: 0,
			visable: true,
			bigLoading: true,
			warnMessage: false
		};
	}
	componentDidMount = () => {
		this.props.actions.getRecentReservationOrderPriceList({ account_id: this.props.account_id, page: 1, page_size: 10 }).then((res) => {
			this.setState({
				bigLoading: false,
			});
		});
	}
	handleClose = () => {
		this.setState({ visable: false })
	}
	handleInfiniteOnLoad = (value) => {
		this.setState({
			loading: true,
		});
		this.props.actions.AddGetPriceList({ account_id: this.props.account_id, page: value, page_size: 10 }).then((res) => {
			if (res.data.length < 10) {
				this.setState({
					hasMore: false,
					loading: false,
					warnMessage: true
				});
				return;
			}
			this.setState({
				loading: false,
			});
		});
	}
	render() {
		const { visable, bigLoading, warnMessage } = this.state
		const { recentReservationOrderPriceList, baseInfoList } = this.props
		const { base = {}, } = baseInfoList
		const { platform_id } = base
		return (
			<div className="recent-price-wxy">
				{visable ? <Alert message="说明:本页展示该账号最近一年在微播易平台的应约时间,价格名称,应约价，及执行后的数据表现" type="warning" showIcon closable afterClose={this.handleClose} style={{ marginTop: 20 }} /> : null}
				<div style={{ marginTop: 20 }}>
					<div>
						<Row className="price-table-row title">
							<Col span={4}>应约时间</Col>
							<Col span={4}>价格名称</Col>
							<Col span={4}>应约价(元)</Col>
							<Col span={2}></Col>
							<Col span={4}>执行数据<MarkMessage
								content={<div style={{ width: 200 }}>展示的是订单执行后的表现稳定性数据，一般为发布时间后72小时的数据；若为-则是因为该订单未最终执行或未抓取到数据。</div>}
							/></Col>
							<Col span={5}>发布时间</Col>
						</Row>
					</div>
					<Spin spinning={bigLoading} >
						<div style={{ height: 300, overflowY: "auto" }}>
							{recentReservationOrderPriceList.length > 0 ? <InfiniteScroll
								initialLoad={false}
								pageStart={1}
								loadMore={this.handleInfiniteOnLoad}
								hasMore={!this.state.loading && this.state.hasMore}
								useWindow={false}
							>
								<List
									itemLayout="vertical"
									dataSource={recentReservationOrderPriceList}
									renderItem={(item, index) => (
										<List.Item key={index} style={{ marginTop: 16 }}>
											<Row className="price-table-row">
												<Col span={4}>
													{item.created_time}
												</Col>
												<Col span={4}>
													{item.skuTypeName}
													{item.isShield == 1 ? <img src={require('../../../base/SimpleTables/isSpecial.png')} width='16px' style={{ marginLeft: 4, marginBottom: 4 }} /> : null}
												</Col>
												<Col span={4} >
													{item.deal_price}
												</Col>
												<Col span={2}>
													<EquitiesTags list={item.equities} />
												</Col>
												<Col span={4} >
													<div className='execution-data'>
														{executionList.includes(`${platform_id}`) ?
															executionMap[platform_id].list.map((one, index) => <div key={index} className='execution-data-item'>
																<span>{one.name}：</span>
																<span>{item[one.value] === 0 || item[one.value] ?
																	platform_id == 9 ? getWeixinAvg(item[one.value])
																		: getOtherAllAvg(item[one.value])
																	: '-'}</span>
															</div>
															) : '暂无数据'}
													</div>
												</Col>
												<Col span={5}>
													{platform_id == 106 ? item.live_created_time || '-' : item.media_created_time || '-'}
												</Col>
											</Row>
										</List.Item>
									)}
								>
									{this.state.loading && this.state.hasMore && (
										<div style={{ textAlign: "center" }}>
											<Spin />
										</div>
									)}
									{warnMessage ? <div style={{ textAlign: "center", paddingTop: 10 }}>已经加载到底部了</div> : null}
								</List>
							</InfiniteScroll> : <div style={{ textAlign: "center", color: "#ccc", paddingTop: 30 }}> 暂无数据</div>}
						</div>
					</Spin>
				</div>

			</div >

		);
	}
}

export default RecentPrice;
function EquitiesTags({ list = [] }) {
	return list.length > 0 ? <span><MarkMessage text={
		<img src={require('../../../base/SimpleTables/equity.png')} height='18px' style={{ marginBottom: 1 }} />
	} content={
		list.map(one => <Tag key={one.equitiesId} color="blue" style={{ marginTop: 6, marginBottom: 4 }}>
			{one.is_free == 1 ? <img src={require('../../../images/free.png')} width='14px'
				style={{ marginRight: 4, marginBottom: 2 }} /> : null}
			{one.equitiesName}
		</Tag>)
	} /></span> : null
}

