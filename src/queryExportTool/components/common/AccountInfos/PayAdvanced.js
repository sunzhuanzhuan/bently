import React, { PureComponent } from 'react';
import './PayAdvanced.less';
import api from "../../../../api";

class PayAdvanced extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount = () => {
		const { user_id } = this.props;
		this.isMount = true;

		if (user_id) {
			api.get('export/account/prepayment_account', { params: { account_ids: user_id } }).then(res => {
				const { data } = res

			})
		}
	}

	render() {
		const { title = "提前打款", user_id = '' } = this.props;

		return (
			<div className='pay_advanced_wrapper'>{`${title} ${user_id}`}</div>
		);
	}
}

export default PayAdvanced;
