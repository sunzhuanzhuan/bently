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
		this.props.actions.getRecentReservationOrderPriceList({ account_id: this.props.accountId, page: 1, pageSize: 10 }).then((res) => {
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
		this.props.actions.AddGetPriceList({ accountId: this.props.accountId, page: value, pageSize: 10 }).then((res) => {
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
		const { platformId } = base
		return (
			<div className="recent-price-wxy">
				{visable ? <Alert message="说明:本页展示该账号最近一年在微播易平台的应约时间，应约价，及执行后的数据表现" type="warning" showIcon closable afterClose={this.handleClose} style={{ marginTop: 20 }} /> : null}
				<div style={{ marginTop: 20 }}>
					<div>
						<Row className="price-table-row title">
							<Col span={4}>应约时间</Col>
							<Col span={11}>应约价(元)</Col>
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
													{item.createdTime}
												</Col>
												<Col span={11} className='execution-data'>
													{item.skuTypeName ? `${item.skuTypeName}+` : null}
													<EquitiesTags list={item.equities} />
													{item.otherContent ? <Tag style={{ marginBottom: 8 }}>{item.otherContent}</Tag> : null}
													<div>{item.deal_price}</div>
												</Col>
												<Col span={4} >
													<div className='execution-data'>
														{executionList.includes(`${platformId}`) ?
															executionMap[platformId].list.map((one, index) => <div key={index} className='execution-data-item'>
																<span>{one.name}：</span>
																<span>{item[one.value] === 0 || item[one.value] ?
																	platformId == 9 ? getWeixinAvg(item[one.value])
																		: getOtherAllAvg(item[one.value])
																	: '-'}</span>
															</div>
															) : '暂无数据'}
													</div>
												</Col>
												<Col span={5}>
													{platformId == 106 ? item.liveCreatedTime || '-' : item.mediaCreatedTime || '-'}
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
	return list.length > 0 ? list.map(one => <Tag key={one.equitiesId} color="blue" style={{ marginBottom: 8 }}>
		{one.is_free == 1 ? <img src={require('../../../images/free.png')} width='14px'
			style={{ marginRight: 4, marginBottom: 2 }} /> : null}
		{one.equitiesName}
	</Tag>)
		: null
}

