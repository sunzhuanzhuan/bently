import React, { Component } from 'react';
import { List, message, Spin, Radio, Row, Col, Rate, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import "./AccountEvalua.less"
class AccountEvaluaMore extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			loading: false,
			hasMore: true,
			page: 0,
			showkey: 1,
			warnMessage: false
		};
	}

	handleInfiniteOnLoad = (value) => {
		const { showkey, account_id } = this.props
		this.setState({
			loading: true,
		});

		this.props.actions.addGetDegreeList({ account_id: account_id, page: value, page_size: 10, evaluate_level: showkey }).then((res) => {
			if (res.data.rows < 10) {
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
		const { degreeList } = this.props
		const { warnMessage } = this.state
		const rows = degreeList && degreeList.rows || []
		return (
			<div className="evalua-list">
				<div className="account-evalua-list">
					{rows.length > 0 ? <InfiniteScroll
						initialLoad={false}
						pageStart={1}
						loadMore={this.handleInfiniteOnLoad}
						hasMore={!this.state.loading && this.state.hasMore}
						useWindow={false}
					>
						<List
							itemLayout="vertical"
							dataSource={degreeList.rows}
							renderItem={(item, index) => (
								<List.Item key={index}>
									<Row>
										<div>{item.more_comment}</div>
									</Row>
									<Row className="rate-box">
										<Col span={6}>
											<div className="item-rate-text">响应速度</div>
											<Rate className="list-rate" disabled value={item.professional_degree} />
										</Col>
										<Col span={6}>
											<div className="item-rate-text">配合度</div>
											<Rate className="list-rate" disabled value={item.coordination_degree} /></Col>
										<Col span={6}>
											<div className="item-rate-text">效果满意</div>
											<Rate className="list-rate" disabled value={item.appearance_degree} /></Col>
										<Col span={6} style={{ textAlign: "right", color: "#b8b8b8" }}>{item.created_time}</Col>
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
					</InfiniteScroll> : <div style={{ textAlign: "center", color: "#ccc" }}> 暂无数据</div>}
				</div>
			</div>
		);
	}
}

export default AccountEvaluaMore;
