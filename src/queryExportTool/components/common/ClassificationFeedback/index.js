import React, { Component } from 'react'
import './index.less'
import api from "@/api";
import {
	FeedbackCreate,
	FeedbackDetail,
	FeedbackMini
} from "@/classificationManage/components/CategoryFeedbackModal";
import { connect } from "react-redux";
import * as action from "@/classificationManage/actions";
import { bindActionCreators } from "redux";

@connect(null,(dispatch) => ({
	actions: bindActionCreators(action, dispatch)
}))
class ClassificationFeedback extends Component {
	constructor(props) {
		super(props);
		this.state = {
			feedback: '',
			data: {}
		};
	}

	componentDidMount() {
		const { data, actions } = this.props
		actions.isExistClassify({ accountId: data.account_id }).then(({ data }) => {
			this.setState({
				classifyAuditInfoId: data.classifyAuditInfoId,
				hasRecord: data.count
			})
		})
	}
	setModal = type => {
		this.setState({ feedback: type })
	}

	componentWillUnmount() {
		this.isMount = false
	}

	render() {
		const { actions, data } = this.props
		const { classifyAuditInfoId, hasRecord } = this.state;
		const accountInfo = {
			accountId: data.account_id,
			snsName: data.base.sns_name,
			platformId: data.platform_id,
			url: data.base.url,
			classificationList: data.base.classification
		}
		return <span>
			{hasRecord ? <a
				className='category-feedback-btn'
				onClick={() => this.setModal('detail')}
			>
				查看反馈进度
			</a> : <a
				className='category-feedback-btn'
				onClick={() => this.setModal('create')}
			>
				分类错误?
			</a>}
			{this.state.feedback === 'create' &&
			<FeedbackCreate setModal={this.setModal} accountInfo={accountInfo} actions={actions}/>}
			{this.state.feedback === 'detail' &&
			<FeedbackDetail setModal={this.setModal} actions={actions} classifyAuditInfoId={classifyAuditInfoId}/>}
			{this.state.feedback === 'mini' &&
			<FeedbackMini setModal={this.setModal} accountInfo={accountInfo} actions={actions}/>}
		</span>
	}
}

export default ClassificationFeedback;
