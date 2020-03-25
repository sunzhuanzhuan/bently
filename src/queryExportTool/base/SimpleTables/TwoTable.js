import React, { Component } from 'react'
import './index.less'
import api from "../../../api";
import SimpleTables from "./index";
import qs from "qs";
import Interface from "../../constants/Interface";
class TwoTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			skuPrice: [],
			avgData: [],
			dataSku: '',
			dataAvg: ''
		};
	}
	//此处是右侧两个小表格的配置列项
	getColumsNum = (groupType, IsWei) => {
		const tableCol = {
			1: ["fabu-wei", "yuedu"],
			2: ['baojia', 'zhifa'],
			3: ['baojiatwo', 'video'],
			4: ['baojia', 'red'],
			5: ['baojia', 'otherAvg'],
		}
		return groupType ? tableCol[groupType] : ['', '']
	}
	componentDidMount = () => {
		const { accountId } = this.props
		this.isMount = true
		const search = qs.parse(window.location.search.substring(1))
		if (accountId) {
			api.get(Interface.getAccountPrice, { params: { accountId: accountId, companyId: search.companyId } }).then(({ data }) => {
				if (!this.isMount) return

				this.setState({
					skuPrice: data.skuList,
					avgData: data.itemData,
					dataSku: data.priceValidTo,
					dataAvg: data.mediaFetchedTime
				})
			})
		}

	}
	componentWillUnmount() {
		this.isMount = false
	}
	render() {
		const { IsWei, groupType, platformId, accountId, isShielding, ISWEiXin, isFamous } = this.props
		const { skuPrice, avgData, dataSku, dataAvg } = this.state
		return (
			<div style={{ display: 'flex', flex: 5 }}>
				<SimpleTables IsWei={IsWei}
					data={skuPrice}
					dataTime={dataSku}
					columsNum={this.getColumsNum(groupType, IsWei)[0]}
					tableFooterText={IsWei ? "" : "价格有效期"}
					isLeft={true}
					platformId={platformId}
					isShielding={isShielding}
					isFamous={isFamous}
					ISWEiXin={ISWEiXin}
					accountId={accountId} />
				<SimpleTables IsWei={IsWei}
					data={avgData}
					dataTime={dataAvg}
					columsNum={this.getColumsNum(groupType)[1]}
					tableFooterText="抓取时间" platformId={platformId} />
			</div>
		);
	}
}

export default TwoTable;
