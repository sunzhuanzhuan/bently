import React, { Component } from 'react'
import AccountDetailsHeard from "../components/accountList/AccountDetails/Heard";
import AccountDetailsAccountEvalua from "../components/accountList/AccountDetails/AccountEvalua";
import AccountDetailsRecentPrice from "../components/accountList/AccountDetails/RecentPrice";
import AccountDetailsBasicInfo from "../components/accountList/AccountDetails/BasicInfo";
import { bindActionCreators } from "redux";
import { Radio, Spin } from 'antd';
// import SelectCompany from "@/components/exportTemplate/components/SelectCompany";
import MarkMessage from "../base/MarkMessage"
import messageInfo from "../constants/messageInfo.js"
import { connect } from "react-redux";
import * as action from '../actions/index'
import "./AccountDetails.less"
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class AccountDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showkey: 1,
			isLoading: true,
			minLoding: false
		};
	}

	componentDidMount = () => {
		const { account_id, actions } = this.props
		const data = { account_id: account_id }
		actions.getBaseInfo(data).then(results => {
			this.setState({
				isLoading: false
			})
		});
	}
	onChange = (e) => {
		const showkey = e.target.value
		this.setState({ showkey })
	}
	render() {

		const { showkey, isLoading } = this.state
		const { actions, queryExportToolReducer, account_id, } = this.props
		const { getDegreeList } = actions
		const { degreeList, baseInfoList, recentReservationOrderPriceList } = queryExportToolReducer;
		return (
			<Spin spinning={isLoading} >
				<div className="account-details">
					<AccountDetailsHeard baseInfoList={baseInfoList} />
					<div className="tab-three">
						<div className="wxy-radio-group">
							<RadioGroup onChange={this.onChange} defaultValue="1" >
								<RadioButton value="1">基本信息</RadioButton>
								<RadioButton value="2">账号评价（{baseInfoList && baseInfoList.degree_count || 0}）<MarkMessage {...messageInfo.degree} /></RadioButton>
								<RadioButton value="3">近期应约 （{baseInfoList && baseInfoList.price_count || 0}）</RadioButton>
							</RadioGroup>
						</div>
						<div >
							{showkey == 1 ? <AccountDetailsBasicInfo baseInfoList={baseInfoList} /> :
								showkey == 2 ? <AccountDetailsAccountEvalua degreeList={degreeList} getDegreeList=
									{getDegreeList} actions={actions} account_id={account_id} /> :
									showkey == 3 ? <AccountDetailsRecentPrice recentReservationOrderPriceList={recentReservationOrderPriceList}
										baseInfoList={baseInfoList}
										actions={actions} account_id={account_id} />
										: null}
						</div>
					</div>
				</div>
			</Spin >
		);
	}
}
const mapStateToProps = (state) => {
	return {
		queryExportToolReducer: state.queryExportToolReducer,
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(action, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountDetails)

