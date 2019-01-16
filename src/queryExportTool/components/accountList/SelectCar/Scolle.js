import React, { Component } from 'react'
import { Alert, message, Spin } from 'antd';
import TabList from "./TabList"
import InfiniteScroll from 'react-infinite-scroller';
import debounce from 'lodash/debounce';
class Scolle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			hasMore: true,
			total: 0,
			bigLoading: false,
			showWarn: false
		};
		this.groupNumber = 0
		this.deleteScolle = debounce(this.deleteScolle, 100);
	}
	componentDidMount() {
		const { cheackedKey } = this.props
		this.setState({
			bigLoading: true,
			showWarn: false
		})
		this.props.actions.getAccountListFromCart({ group_type: cheackedKey }).then((res) => {
			const { accounts = [] } = res.data
			this.groupNumber = accounts && accounts.length
			this.setState({
				bigLoading: false
			});
		});
	}

	handleInfiniteOnLoad = (value) => {
		const { selectCartData, cheackedKey } = this.props

		const lengthMax = cheackedKey ? selectCartData && selectCartData.tabList[cheackedKey] : selectCartData.total
		this.setState({
			loading: true,
			showWarn: false
		});
		if (selectCartData.data.length >= lengthMax) {
			this.setState({
				hasMore: false,
				loading: false,
				showWarn: true
			});
			return;
		}
		this.props.actions.addCarSynchronizeSearch({ group_type: cheackedKey, start: selectCartData.data.length, page_size: 10 }).then((res) => {
			this.setState({
				loading: false,

			});
		});
		this.groupNumber = this.groupNumber + 10
	}
	deleteScolle = (ids, group_type) => {
		const { cheackedKey } = this.props
		this.groupNumber = this.groupNumber - 1
		this.props.actions.removeFromCart({ staging_ids: [ids] }).then((res) => {
			const { selectCartData } = this.props
			this.props.actions.changeTypeCountSelect({ group_type })
			this.setState({
				loading: true,
				showWarn: false
			});
			this.props.actions.removeSelectExactQuery([ids])
			if (selectCartData.data.length < 10) {
				if ((selectCartData.data.length + 1) == selectCartData.tabList[group_type ? group_type : 'total']) {
					this.setState({
						hasMore: false,
						loading: false,
					});
					return;
				}

				this.props.actions.addCarSynchronizeSearch({ group_type: cheackedKey, start: this.groupNumber, page_size: 10 }).then((res) => {
					this.setState({
						loading: false,
						showWarn: false
					});
				});
				this.groupNumber = this.groupNumber + 10
			}

		})
	}
	render() {
		const { selectCartData } = this.props
		return (
			<Spin spinning={this.state.bigLoading}>
				<div style={{ overflowY: "auto", height: this.props.selectCarHeight }}>
					<InfiniteScroll
						initialLoad={false}
						pageStart={0}
						loadMore={this.handleInfiniteOnLoad}
						hasMore={!this.state.loading && this.state.hasMore}
						useWindow={false}
					>
						<TabList list={selectCartData.data} removeAccout={this.deleteScolle} />
						{this.state.loading && this.state.hasMore && (
							<div style={{ textAlign: "center", marginTop: 10 }}>
								<Spin />
							</div>
						)}
						{this.state.showWarn ? <div style={{ textAlign: "center", paddingTop: 10 }}>已经加载到底部了</div> : null}
					</InfiniteScroll>
				</div >
			</Spin>
		);
	}
}

export default Scolle;
