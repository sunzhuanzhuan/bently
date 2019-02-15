import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AccountPutAttributeSteps } from '../../constants/config'
import { platformIcon } from '../../constants/config'
import * as batchOptionsAction from '../../actions/batchOptions'
import { Steps, message } from 'antd';

const Step = Steps.Step;

class AccountPutAttribute extends Component {
	constructor(props) {
		super(props)
		this.state = {
			current: 0,
			platform: ''
		}
	}
	//跳转“上传账号信息”
	jumpToTab2 = (operateType, it) => {
		this.props.actions.resetdownloadLink()
		this.setState({
			current: 1,
			platform: it
		})
		this.props.actions.getDownloadLink({
			operateKey: operateType
		})
	}
	//返回第一步
	jumpToTab1 = () => {
		this.props.actions.resetdownloadLink()
		this.setState({
			current: 0
		})
	}
	//上传
	uploadFile = (file) => {
		let value = {
			operate_type: platformIcon[this.state.platform].operateType,
			remark: platformIcon[this.state.platform].remark,
			url: file[0].url,
			token: this.props.uploadInfo.token
		}
		this.props.actions.operateBatch(value).then(() => {
			this.setState({
				current: 2
			})
		}).catch(() => {
			message.error("请求失败")
		})
	}
	render() {
		const Content = AccountPutAttributeSteps[this.state.current]
		return (
			<div>
				<h4>账号批量入库</h4>
				<Steps current={this.state.current} className=" step">
					<Step title="选择平台" description="选择要入库的平台" />
					<Step title="上传账号信息" description="填写下载的模板，按要求填写模板并上传" />
					<Step title="完成" description="批量入库完成" />
				</Steps>
				<Content
					return={this.props.return}
					jumpToTab1={this.jumpToTab1}
					jumpToTab2={this.jumpToTab2}
					downloadLink={this.props.downloadLink}
					uploadInfo={this.props.uploadInfo}
					uploadFile={this.uploadFile}
				></Content>
			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		downloadLink: state.batchCreateMainAccountReducers.downloadLink,
		uploadInfo: state.batchCreateMainAccountReducers.uploadInfo
	}
}
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...batchOptionsAction
	}, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountPutAttribute)


