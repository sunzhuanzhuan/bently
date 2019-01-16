import React, { Component } from 'react'
import { TitleLable } from "../../../base";
import TableReservation from "./TableReservation";//表格预约
import TableAmpaignItem from "./TableAmpaignItem";//表格微闪投
import TableExtendedBusiness from "./TableExtendedBusiness";//表格公司拓展
import GroupRedio from "../../common/groupRedio";
import SearchFrom from "./SearchFrom";
import { withRouter } from "react-router-dom";
import qs from "qs";
import "./index.less"
const orderKeyMap = {
	1: "reservation_item_ids",
	2: "campaign_item_ids",
	3: "extended_business_ids"
}
class FirstStep extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
		};

	}
	componentDidMount = () => {
		const { actions: { getPoItemList, getGRItemListStatistic, getPOItemTotalStatistic } } = this.props
		const search = qs.parse(window.location.search.substring(1))
		const data = { gr_id: search.gr_id, gr_order_status: "1" }//
		Promise.all([getPoItemList({ item_list_type: "1", ...data }),
		getGRItemListStatistic({ gr_id: search.gr_id }),
		getPOItemTotalStatistic({ gr_id: search.gr_id })
		]).then((res) => {
			this.setState({ isLoading: false })
			this.props.history.push({
				search: `?` + qs.stringify({
					po_id: search.po_id,
					typeOperate: search.typeOperate,
					...data
				})
			})
		})
	}
	//获取ID
	getListArr = (items, key) => {
		const arr = []
		for (var i = 0; i < items.length; i++) {
			if (items[i].is_selected == 1) {
				arr.push(items[i][key])
			}
		}
		return arr
	}
	onChangeRedio = (value) => {
		this.setState({ isLoading: true })
		const search = qs.parse(window.location.search.substring(1))

		const { actions: { getPoItemList } } = this.props
		getPoItemList({ item_list_type: value, gr_id: search.gr_id, gr_order_status: "1" }).then((res) => {
			this.setState({ isLoading: false })
		})
	}
	setLoading = (value = false) => {
		this.setState({
			isLoading: value
		})
	}
	//取消选择操作
	removeOrdersOperate = (ids, tableType, number) => {
		const { addSelectedOrderList, removeSelectedOrderList, removeOrder, getGRItemListStatistic } = this.props.actions
		removeSelectedOrderList({ id: ids, type: tableType, changeCount: number })
		const gr_id = qs.parse(window.location.search.slice(1)).gr_id
		removeOrder({
			gr_id: gr_id,
			[orderKeyMap[tableType]]: ids.join(","),
		}).then(() => {
			getGRItemListStatistic({ gr_id: gr_id })
		}).
			catch((e) => {
				//接口请求失败，把取消选中改为选中
				addSelectedOrderList({ id: ids, type: tableType, changeCount: number })
				getGRItemListStatistic({ gr_id: gr_id })
			})
	}
	//选中操作
	addOrdersOperate = (ids, tableType, number) => {
		const { addSelectedOrderList, removeSelectedOrderList, addOrders, getGRItemListStatistic } = this.props.actions
		addSelectedOrderList({ id: ids, type: tableType, changeCount: number })
		const gr_id = qs.parse(window.location.search.slice(1)).gr_id
		addOrders({
			gr_id: gr_id,
			[orderKeyMap[tableType]]: ids.join(","),
		})
			.then(() => {
				getGRItemListStatistic({ gr_id: gr_id })
			}).catch((e) => {
				//接口请求失败，把选中改为取消选中
				removeSelectedOrderList({ id: ids, type: tableType, changeCount: number })
				getGRItemListStatistic({ gr_id: gr_id })
			})
	}
	render() {
		const { actions, goodsReceipt } = this.props
		const { isLoading } = this.state
		const commonProps = {
			actions,
			goodsReceipt,
			removeOrdersOperate: this.removeOrdersOperate,
			addOrdersOperate: this.addOrdersOperate,
			setLoading: this.setLoading
		}
		const { poItemList: { poItemReserveList = {},
			poItemCampaignList = {},
			poItemExpandBusinessList = {} }, POItemTotalStatistic = {} } = goodsReceipt
		const {
			reservation_item_total = 0, //预约的总数目
			campaign_item_total = 0, //派单的总数目
			extended_business_item_total = 0 // 拓展业务的总数目
		} = POItemTotalStatistic
		const groupRedioContent = [
			{
				content: <div>
					<SearchFrom tableType="1" key={1} actions={actions} {...commonProps} />
					<TableReservation  {...commonProps} poItemReserveList={poItemReserveList} />
				</div>
			}, {
				content: <div>
					<SearchFrom tableType="2" key={2} actions={actions} {...commonProps} />
					<TableAmpaignItem  {...commonProps} poItemCampaignList={poItemCampaignList} />
				</div>
			}, {
				content: <div >
					<SearchFrom tableType="3" key={3} actions={actions} isShowAccountName={false} {...commonProps} />
					<TableExtendedBusiness  {...commonProps} poItemExpandBusinessList={poItemExpandBusinessList} />
				</div>
			}

		]
		const sumData = [
			reservation_item_total,
			campaign_item_total,
			extended_business_item_total,
		]
		return (
			<div className="first-step">
				<TitleLable title="执行凭证关联的订单/活动" >
					<GroupRedio content={groupRedioContent} sumData={sumData} isLoading={isLoading} onChangeRedio={this.onChangeRedio} />
				</TitleLable>
			</div>
		);
	}
}

export default withRouter(FirstStep);
