import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AccountPutAttributeSteps } from '../../constants/config'
import { platformIcon, operateClass } from '../../constants/config'
import * as batchOptionsAction from '../../actions/batchOptions'
import * as commonActions from '../../../actions/index'
import { Steps, message } from 'antd';

const Step = Steps.Step;

class AccountPutAttribute extends Component {
	constructor(props) {
		super(props)
		this.state = {
			current: 0,
			platform: '',
			platformId: '',
			operateType: ''
		}
	}
	//跳转“上传账号信息”
	jumpToTab2 = (operateType, it, id) => {
		this.props.actions.resetdownloadLink()
		this.setState({
			current: 1,
			platform: it,
			platformId: id,
			operateType: operateType
		})
		this.props.actions.getNewDownloadLink({
			operateKey: operateType,
			platformId: id
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
	uploadFile = (file, originFile) => {
		if (file.length !== 0) {
			let value = {
				uploadUrl: file[0].url,
				operateType: this.state.operateType,
				originalFileName: originFile.name,
				platformId: this.state.platformId,
				operateClass: operateClass[this.state.operateType]
			}
			this.props.actions.saveBatchOperate(value).then(() => {
				this.setState({
					current: 2
				})
			}).catch(() => {
				message.error("请求失败")
			})
		}
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
					getNewToken={this.props.actions.getNewToken}
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
		...batchOptionsAction, ...commonActions
	}, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountPutAttribute)


