import React, { PureComponent } from 'react';
import './PayAdvanced.less';
import api from "../../../../api";

class PayAdvanced extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			itemInfo: {}
		};
	}

	componentDidMount = () => {
		const { account_id } = this.props;
		this.isMount = true;

		if (account_id) {
			api.get('export/account/getPrepaymentAccount', { params: { account_ids: account_id } }).then(res => {
				const { data = {} } = res;

				const { items = [] } = data;
				const itemInfo = items.find(item => item.account_id === account_id) || {};

				this.setState({itemInfo});
			})
		}
	}

	render() {
		const { title = "提前打款", account_id = '' } = this.props;
		const { itemInfo } = this.state;

		if(itemInfo.account_id === account_id && itemInfo.is_prepayment === 1)
			return (
				<div className='pay_advanced_wrapper'>{title}</div>
			);

		return null;
	}
}

export default PayAdvanced;
