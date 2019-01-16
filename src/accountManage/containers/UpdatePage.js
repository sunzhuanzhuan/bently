import React, { Component } from "react"
import { Route, withRouter } from 'react-router-dom'
import { bindActionCreators } from "redux";
import { Skeleton } from 'antd'
import { connect } from "react-redux";
import * as action from '../actions/index'
import UpdatePageCommonContainer from './UpdatePageCommonContainer'
import { viewTypeForPlatform, platformToType } from '../constants/platform'
import { accountTypes } from '../constants'
import qs from 'qs'
import authorizationsReducers from "../../reducers/authorizations";

function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some(field => fieldsError[field]);
}
const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 6 },
		md: { span: 4 },
		lg: { span: 3 }
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 18 },
		md: { span: 20 },
		lg: { span: 21 }
	}
};
const halfWrapCol = {
	xs: { span: 12 },
	sm: { span: 9 },
	md: { span: 10 },
	lg: { span: 10 }
}

class UpdatePage extends Component {
	state = {
		loading: true,
		error: false,
		errorMsg: ''
	}

	componentWillMount() {
		window.allSubmit = {
			store: {},
			data: {}
		}
		window.updateForms = {}
	}

	componentDidMount() {
		let path = window.location.pathname.split('/')
		let accountId = this.accountId = qs.parse(window.location.search.substring(1))['account_id']
		if (qs.parse(window.location.search.substring(1))['addQuote']) {
			this.addQuote = qs.parse(window.location.search.substring(1))['addQuote']
		}
		let pid = this.pid = path[path.length - 1]
		const { getAccountInfo, getPlatformInfo, getIndustryListForAccount } = this.props.actions
		getAccountInfo({ account_id: accountId }).then(() => {
			this.setState({ loading: false })
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false, error: true, errorMsg })
		})
		getPlatformInfo({ platform_id: pid })
		getIndustryListForAccount();
	}

	render() {
		const { accountManage, actions, auth } = this.props;
		const { loading, error, errorMsg } = this.state;
		const params = {
			hasErrors, formItemLayout, halfWrapCol, accountTypes, data: accountManage, actions, auth
		}
		let { platform_id } = accountManage.accountInfo
		if (platform_id && this.pid) {
			if (platform_id != this.pid) {
				window.location.replace('/account/manage/update/' + platform_id + '?account_id=' + this.accountId)
				// window.reload()
			}
		}
		return loading ? <Skeleton active /> : (!error ? <UpdatePageCommonContainer params={params}>
			<Route path={'/account/manage/update/:pid'} render={() =>
				<RouteViewChild platform_id={this.pid} params={params} addQuote={this.addQuote ? this.addQuote : undefined} />} />
		</UpdatePageCommonContainer> : <h2>{errorMsg}</h2>)
	}
}

const ViewChild = props => {
	const { params, match, addQuote, platform_id } = props
	let { pid } = match.params
	let viewChildKey = platformToType[pid]
	if (viewChildKey) {
		let C = viewTypeForPlatform[platformToType[pid]]['component']['update']
		return <C platform_id={platform_id} addQuote={addQuote} params={{ ...params, pid, isUpdate: true }} />
	}
	return <p>没有此平台</p>
}
const RouteViewChild = withRouter(ViewChild)

const mapStateToProps = (state) => {
	return {
		accountManage: state.accountManageReducer,
		auth: state.authorizationsReducers.authVisibleList
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(action, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(UpdatePage))
