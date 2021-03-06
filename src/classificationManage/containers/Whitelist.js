import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Tabs } from 'antd';
import * as action from '../actions'
import * as commonAction from '@/actions'
import UploadProcess from "../components/UploadProcess";
import ProcessResult from "../components/ProcessResult";


const TabPane = Tabs.TabPane;

class Whitelist extends Component {
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
			actions: this.props.actions,
			data: this.props.data,
		}
		return (
			<div>
				<Tabs defaultActiveKey="1">
					<TabPane tab="添加/修改分类" key="1">
						<UploadProcess {...params}/>
					</TabPane>
					<TabPane tab="批处理结果" key="2">
						<ProcessResult {...params}/>
					</TabPane>
				</Tabs>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.classificationManageReducer,
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
)(Whitelist)

