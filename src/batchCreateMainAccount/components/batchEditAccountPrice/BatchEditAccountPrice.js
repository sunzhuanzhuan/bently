import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Steps, message } from 'antd';
import {
	batchEditAccountPrice_steps,
	operateClass
} from '../../constants/config.js'
import * as batchActions from '../../actions/batchOptions'
import * as commonActions from '../../../actions/index'
import './BatchEditAccountPrice.less'

const Step = Steps.Step;

class BatchEditAccountPrice extends Component {
	constructor(props) {
		super(props)
		this.state = {
			step: "step1",
			current: 0,
			platformId: "",
			productionLineId: ""
		}
	}

	//跳转到选择平台
	jumpToStep1 = () => {
		this.props.actions.resetdownloadLink()
		this.setState({
			step: "step1",
			current: 0
		})
	}
	//跳转到选择账号类型-点击选择平台
	jumpToStep2 = (operateType, platformName, platformId) => {
		this.setState({
			step: "step2",
			current: 1,
			platformId: platformId
		})
	}
	//返回第二步-选择账号类型
	returnStep2 = () => {
		this.props.actions.resetdownloadLink()
		this.setState({
			step: "step2",
			current: 1
		})
	}
	//选择类型
	chooseProductionLineId = (productionLineId) => {
		this.props.actions.resetdownloadLink()
		this.setState({
			productionLineId: productionLineId,
			step: "step3",
			current: 2
		}, () => {
			console.log(this.props,'=====>');
			if (this.props.type === 'tab5') {
				this.props.actions.getNewDownloadLink({
					platformId: this.state.platformId,
					operateKey: "updatePublicationPrice",
					productionLineId: productionLineId
				})
			}else {
				this.props.actions.getNewDownloadLink({
					platformId: this.state.platformId,
					operateKey: `updateSkuPrice_${productionLineId}_${this.state.platformId}`,
					productionLineId: productionLineId
				})
			}
		})
	}
	//上传之后的解析
	uploadFile = (file, originFile) => {
		if (file.length !== 0) {
			if(this.props.type === "tab5"){
				let value = {
					uploadUrl: file[0].url,
					operateType: "updatePublicationPrice",
					originalFileName: originFile.name,
					platformId: this.state.platformId,
					productionLineId: this.state.productionLineId,
					operateClass: "updatePublicationPrice"
				}
				this.props.actions.savePublication(value).then(() => {
					this.setState({
						step: "step4",
						current: 3
					})
				}).catch(() => {
					message.error("请求失败")
				})
				return
			}
			let value = {
				uploadUrl: file[0].url,
				operateType: `updateSkuPrice_${this.state.productionLineId}_${this.state.platformId}`,
				originalFileName: originFile.name,
				platformId: this.state.platformId,
				productionLineId: this.state.productionLineId,
				operateClass: operateClass["batchOperateUpdateSkuPrice"]
			}
			this.props.actions.saveBatchOperate(value).then(() => {
				this.setState({
					step: "step4",
					current: 3
				})
			}).catch(() => {
				message.error("请求失败")
			})
		}
	}

	render() {
		const Content = batchEditAccountPrice_steps[this.state.step]
		const { downloadLink, batchSkuPlatformList } = this.props
		return (
			<div>
				<h4>批量修改账号报价</h4>
				{/* 步骤条 */}
				<Steps current={this.state.current} className="batchEditAccountPrice-stepBox">
					<Step title="选择平台" description="选择修改报价账号所属的平台" />
					<Step title="选择账号类型" description="选择修改报价账号的类型" />
					<Step title="上传账号信息" description="上传需要修改报价的账号account_id和报价" />
					<Step title="完成" description="账号信息上传成功" />
				</Steps>
				<div className="batchEditAccountPrice-platformBox">
					<Content
						returnHome={this.props.return}
						chooseProductionLineId={this.chooseProductionLineId}
						downloadLink={downloadLink}
						getNewToken={this.props.actions.getNewToken}
						uploadFile={this.uploadFile}
						jumpToStep1={this.jumpToStep1}
						jumpToStep2={this.jumpToStep2}
						returnStep2={this.returnStep2}
						batchSkuPlatformList={batchSkuPlatformList}
						type={this.props.type}
					/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		downloadLink: state.batchCreateMainAccountReducers.downloadLink
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...batchActions, ...commonActions
	}, dispatch)
})

export default connect(
	mapStateToProps,//redux和react连接起来
	mapDispatchToProps
)(BatchEditAccountPrice)

