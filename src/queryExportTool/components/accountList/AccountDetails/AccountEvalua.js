import React, { Component } from 'react'
import { Spin, Radio, } from 'antd';
import MarkMessage from "../../../base/MarkMessage"
import messageInfo from "../../../constants/messageInfo.js"
import "./AccountEvalua.less"
import AccountEvaluaMore from "./AccountEvaluaMore";
const RadioGroup = Radio.Group;
class AccountEvalua extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bigLoading: true,
			showkey: 0
		};
	}
	componentWillMount = () => {
		this.seachLoading()
	}
	seachLoading = (showkey) => {
		this.props.getDegreeList({ account_id: this.props.accountId, page: 1, page_size: 10, evaluate_level: showkey }).then((req) => {
			this.setState({
				bigLoading: false
			})
		})
	}
	changeType = (e) => {
		const showkey = e.target.value
		this.seachLoading(showkey)
		this.setState({ showkey })
	}
	render() {
		const { degreeList, actions, accountId } = this.props
		const { showkey, bigLoading } = this.state
		const statistic = degreeList && degreeList.statistic || {}
		return (
			<div className="account-evalua">
				<div className="account-evalua-radio">
					<RadioGroup name="radiogroup" defaultValue={0} onChange={this.changeType}>
						<Radio value={0}>全部（{statistic && statistic.total || 0}）</Radio>
						<Radio value={1}>好评（{statistic && statistic.positive || 0}）</Radio>
						<Radio value={2}>中评（{statistic && statistic.neutral || 0}）</Radio>
						<Radio value={3}>差评（{statistic && statistic.negative || 0}）</Radio>
					</RadioGroup>
				</div>
				<Spin spinning={bigLoading} >
					<AccountEvaluaMore actions={actions} degreeList={degreeList}
						showkey={showkey} key={showkey} accountId={accountId} />
				</Spin>
			</div>
		);
	}
}

export default AccountEvalua;
