import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Tabs } from 'antd';
import * as action from '../actions'
import * as commonAction from '@/actions'
import ClassificationReview from "../components/ClassificationReview";
import FeedbackExport from "../components/FeedbackExport";


const TabPane = Tabs.TabPane;

class Feedback extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	//获取upload-token和upload-url
	componentDidMount() {
		// this.props.actions.getUploadInfo()
		// 获取入库平台列表
		// this.props.actions.getBatchInstockPlatformList()
		// 修改账号报价获取平台列表
		// this.props.actions.getBatchSkuPlatformList()
	}

	render() {
		const params = {
			actions: this.props.actions
		}
		return (
			<div>
				<Tabs defaultActiveKey="1">
					<TabPane tab="内容分类审核" key="1">
						<ClassificationReview {...params}/>
					</TabPane>
					<TabPane tab="分类反馈收集" key="2">
						<FeedbackExport {...params}/>
					</TabPane>
				</Tabs>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		uploadInfo: state.batchCreateMainAccountReducers.uploadInfo,
		authVisibleList: state.authorizationsReducers.authVisibleList,
		instockPlatformList: state.batchCreateMainAccountReducers.instockPlatformList,
		batchSkuPlatformList: state.batchCreateMainAccountReducers.batchSkuPlatformList
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...commonAction,
		...action
	}, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Feedback)

