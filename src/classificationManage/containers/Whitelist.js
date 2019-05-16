import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Tabs } from 'antd';
import Suggestion from '../components/suggestion/Suggestion'
import * as batchOptionsActions from '../actions/batchOptions'
import * as dealResultAction from '../actions/dealResult.js'
import { typeConfig } from '../constants/config'
import DealResult from '../components/mainAccountAndmicro/DealResult'
import NewDealResult from '../components/mainAccountAndmicro/NewDealResult'
const TabPane = Tabs.TabPane;

class Whitelist extends Component {
	constructor(props) {
		super(props)
		this.state = {
			type: "tab1",
			operateKey: '',
			filterValue: {},
			tab2Update: false,
			tab3Update: false,
			flag1: false,
			flag2: false
		}
	}
	//获取upload-token和upload-url
	componentWillMount() {
		this.props.actions.getUploadInfo()
		// 获取入库平台列表
		this.props.actions.getBatchInstockPlatformList()
		// 修改账号报价获取平台列表
		this.props.actions.getBatchSkuPlatformList()
	}
	//跳转Tab2
	jumpToTab2 = () => {
		this.setState({
			type: "tab2"
		})
	}
	//跳转Tab3
	jumpToTab3 = () => {
		this.setState({
			type: "tab3"
		})
	}
	//跳转Tab4-修改账号报价
	jumpToTab4 = () => {
		this.setState({
			type: "tab4"
		})
	}
	//创建主账号点击事件
	createMainAccount = () => {
		this.props.actions.resetdownloadLink()
		this.setState({
			operateKey: 'addSelfmediaUser'
		}, this.jumpToTab2)
	}
	//创建微闪投点击事件
	microPutAttribute = () => {
		this.props.actions.resetdownloadLink()
		this.setState({
			operateKey: 'addMicroPutAttribute'
		}, this.jumpToTab2)
	}
	//更换主账号
	changeMainAccount = () => {
		this.props.actions.resetdownloadLink()
		this.setState({
			operateKey: 'addAccountForChangeMainAccount'
		}, this.jumpToTab2)
	}
	//账号上下架点击事件
	accountOnLine = () => {
		this.props.actions.resetdownloadLink()
		this.setState({
			operateKey: 'addAccountForOnline'
		}, this.jumpToTab2)
	}
	//批量入库
	accountPutAttribute = () => {
		this.jumpToTab3()
	}
	//修改账号报价
	editAccountPrice = () => {
		this.jumpToTab4()
	}
	//获取下载模板地址
	getdownloadLink = () => {
		this.props.actions.getDownloadLink({
			operateKey: this.state.operateKey
		})
	}
	//获取下载模板地址---新
	getNewDownloadLink = () => {
		this.props.actions.getNewDownloadLink({
			operateKey: this.state.operateKey
		})
	}
	//返回上一步
	return = () => {
		this.setState({
			type: "tab1"
		})
	}
	//取消tab2的update
	cancelTab2Update = () => {
		this.setState({
			tab2Update: false
		})
	}
	//取消tab3的update
	cancelTab3Update = () => {
		this.setState({
			tab3Update: false
		})
	}
	//点击Tab
	clickTab = (key) => {
		this.props.actions.resetdownloadLink()
		if (key == "2") {
			if (this.state.flag1) {
				this.setState({
					tab2Update: true
				})
			} else {
				this.setState({
					flag1: true
				})
			}
		} else if (key == "3") {
			if (this.state.flag2) {
				this.setState({
					tab3Update: true
				})
			} else {
				this.setState({
					flag2: true
				})
			}
		}
	}
	onTabClick = (key) => {
		this.props.actions.resetdownloadLink()
		if (key == "1") {
			this.setState({
				type: "tab1"
			})
		}
	}
	render() {
		const { instockPlatformList, batchSkuPlatformList } = this.props
		const Content = typeConfig[this.state.type]
		return (
			<div>
				<Tabs defaultActiveKey="1" onChange={this.clickTab} onTabClick={this.onTabClick}>
					<TabPane tab="批量操作" key="1">
						<Content return={this.return}
							operateKey={this.state.operateKey}
							createMainAccount={this.createMainAccount}
							microPutAttribute={this.microPutAttribute}
							getdownloadLink={this.getdownloadLink}
							authVisibleList={this.props.authVisibleList}
							accountPutAttribute={this.accountPutAttribute}
							accountOnLine={this.accountOnLine}
							changeMainAccount={this.changeMainAccount}
							getNewDownloadLink={this.getNewDownloadLink}
							editAccountPrice={this.editAccountPrice}
							instockPlatformList={instockPlatformList}
							batchSkuPlatformList={batchSkuPlatformList}
						></Content>
					</TabPane>
					<TabPane tab="主账号批量处理结果" key="2">
						<DealResult
							tab2Update={this.state.tab2Update}
							cancelTab2Update={this.cancelTab2Update}
						/>
					</TabPane>
					<TabPane tab="账号批量处理结果" key="3">
						<NewDealResult
							tab3Update={this.state.tab3Update}
							cancelTab3Update={this.cancelTab3Update}
						/>
					</TabPane>
				</Tabs>
				<Suggestion></Suggestion>
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
		...batchOptionsActions,
		...dealResultAction
	}, dispatch)
})

export default connect(
	mapStateToProps,//redux和react连接起来
	mapDispatchToProps
)(Whitelist)

