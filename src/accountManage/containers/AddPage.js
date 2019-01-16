import React, { Component } from "react"
import { Route, withRouter } from 'react-router-dom'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from '../actions/index'
import AddPageCommonContainer from './AddPageCommonContainer'
import { Form, Skeleton, Modal, Button } from 'antd'
import { viewTypeForPlatform, platformToType } from '../constants/platform'
import qs from 'qs'
import { message } from 'antd'
import './AddPage.less'


function uploadUrl(file) {
	return (file && file[0]) ? file[0].url : ''
}
function checkVal(value) {
	if (typeof value === "boolean") {
		return value ? "1" : "2"
	}
	return value
}

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

@Form.create()
class AddPage extends Component {
	state = {
		loading: true,
		submitLoading: false,
		visible: false,
		addQuoteData: {}
	}
	handlePrice = (price_now) => {
		const { accountManage: { priceTypeList = [] } } = this.props;
		return priceTypeList.map(item => {
			let obj = { ...item }
			let key = obj['sku_type_code']
			obj['cost_price_raw'] = price_now[key]
			return obj
		})
	}
	handleSubmit = (e) => {
		e.preventDefault()
		const { actions: { saveAccountInfo }, accountManage: { accountInfo }, history: { push } } = this.props;
		const {
			user_id,
			token = {}
		} = accountInfo
		const { upload_token } = token
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.setState({
					submitLoading: true
				})
				values['user_id'] = user_id
				values['is_famous'] = 2
				values['platform_id'] = this.pid
				values['upload_token'] = upload_token
				values['price_item_list'] = this.handlePrice(values['price_now'])
				values['avatar_url'] = uploadUrl(values['avatar_url'])
				values['qr_code_url'] = uploadUrl(values['qr_code_url'])
				values['follower_count_screenshot_url'] = uploadUrl(values['follower_count_screenshot_url'])
				values['is_open'] = checkVal(values['is_open'])
				saveAccountInfo(values).then((data) => {
					this.setState({
						submitLoading: false,
						addQuoteData: {}
					})
					message.success(data.msg || '添加成功', () => {
						let accountId = data.data['account_id'] || 0
						push(`/account/manage/update/${this.pid}?account_id=${accountId}`)
					})
				}).catch((data) => {
					if (data.code == 995) {
						this.setState({
							visible: true,
							addQuoteData: {
								platform_id: this.pid,
								account_id: data.data['account_id'] || 0
							}
						});
					} else {
						message.error('添加失败:' + data.errorMsg)
						this.setState({
							submitLoading: false
						})
					}
				})

			}
		});
	}


	componentWillMount() {
		let path = window.location.pathname.split('/')
		let userId = qs.parse(window.location.search.substring(1))['user_id']
		let pid = this.pid = path[path.length - 1]
		const { getPrimaryAccountInfo, getSkuTypeList, getUploadToken, getPlatformInfo } = this.props.actions
		Promise.all([getPrimaryAccountInfo({
			user_id: userId,
			platform_id: pid
		}), getSkuTypeList({ platform_id: pid, is_famous: 2 }), getUploadToken()]).then(() => {
			this.setState({ loading: false })
		})
		getPlatformInfo({ platform_id: pid })
	}
	// 立即添加报价
	addQuote = () => {
		this.props.history.push(`/account/manage/update/${this.state.addQuoteData.platform_id}?account_id=${this.state.addQuoteData.account_id}&addQuote=addQuote`)
	}
	render() {
		const { form, accountManage, actions } = this.props;
		const { loading, submitLoading } = this.state;
		const params = {
			...form,
			hasErrors,
			formItemLayout,
			halfWrapCol,
			data: accountManage,
			actions,
			submitLoading
		}
		return <Form onSubmit={this.handleSubmit}>
			{loading ? <Skeleton active /> : <AddPageCommonContainer params={params}>
				<Route path={'/account/manage/add/:pid'} render={() =>
					<RouteViewChild params={params} form={form} />} />
			</AddPageCommonContainer>}
			<Modal
				title="提醒"
				visible={this.state.visible}
				footer={null}
				maskClosable={false}
				closable={false}
				wrapClassName="addPage-tips-modal"
			>
				<p>账号报价添加失败，请重新填写报价！</p>
				<Button className="addPage-tips-modal-button" type="primary"
					onClick={this.addQuote}
				>立即添加报价</Button>
			</Modal>
		</Form>
	}
}


const ViewChild = props => {
	const { params, match, form } = props
	let { pid } = match.params
	let viewChildKey = platformToType[pid]
	if (viewChildKey) {
		let C = viewTypeForPlatform[platformToType[pid]]['component']['add']
		return <C params={{ ...params, pid }} form={form} />
	}
	return <p>没有此平台</p>
}
const RouteViewChild = withRouter(ViewChild)

const mapStateToProps = (state) => {
	return {
		accountManage: state.accountManageReducer
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(action, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(AddPage))
