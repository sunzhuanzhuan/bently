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
		const { accountId } = this.props;
		this.isMount = true;

		if (accountId) {
      api.get('operator-gateway/search/export/branch/getPrepaymentAccount', { params: { accountIds: accountId } }).then(res => {
				const { data = {} } = res;

				const { items = [] } = data;
				const itemInfo = items && items.find(item => item.accountId === accountId) || {};

				this.setState({ itemInfo });
			})
		}
	}

	render() {
		const { title = "提前打款", accountId = '' } = this.props;
		const { itemInfo } = this.state;

		if (itemInfo.accountId === accountId && itemInfo.isPrepayment === 1)
			return (
				<div className='pay_advanced_wrapper'>{title}</div>
			);

		return null;
	}
}

export default PayAdvanced;
