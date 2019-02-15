import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Tabs, Form } from 'antd';
import Suggestion from '../components/suggestion/Suggestion'
import * as batchOptionsActions from '../actions/batchOptions'
import * as dealResultAction from '../actions/dealResult.js'
import { typeConfig } from '../constants/config'
import DealResult from '../components/mainAccountAndmicro/DealResult'
const TabPane = Tabs.TabPane;

class BatchCreateMainAccount extends Component {
	constructor(props) {
		super(props)
		this.state = {
			type: "tab1",
			loading: true,
			operateKey: '',
			filterValue: {}
		}
	}
	//获取upload-token和upload-url
	componentWillMount() {
		this.props.actions.getUploadInfo()
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
	//获取下载模板地址
	getdownloadLink = () => {
		this.props.actions.getDownloadLink({
			operateKey: this.state.operateKey
		})
	}
	//返回上一步
	return = () => {
		this.setState({
			type: "tab1"
		})
	}
	//点击Tab
	clickTab = (key) => {
		if (key == "1") {
			this.setState({
				type: "tab1"
			})
		} else if (key == "2") {
			this.setState({
				loading: true
			})
			this.dealSearchValues(
				this.props.actions.getDealResultList
			)
		}
	}
	//处理查询条件
	dealSearchValues = (fun) => {
		let values = this.props.form.getFieldsValue();
		Object.keys(values).forEach(item => {
			if (values[item] == "0" || !values[item]) {
				delete values[item]
			}
		})
		const timeList = ["startTime", "endTime"]
		timeList.forEach(item => {
			if (values[item]) {
				values[item] = values[item].format('YYYY-MM-DD')
			}
		})
		this.setState({
			filterValue: { ...values }
		}, () => {
			fun({ ...values }).then(() => {
				this.setState({
					loading: false
				})
			})
		})
	}
	//查询
	search = () => {
		this.setState({
			loading: true
		})
		this.dealSearchValues(
			this.props.actions.getDealResultList
		)
	}
	render() {
		const Content = typeConfig[this.state.type]
		return (
			<div>
				<Tabs defaultActiveKey="1" onTabClick={this.clickTab}>
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
						></Content>
					</TabPane>
					<TabPane tab="处理结果" key="2">
						<Form layout="inline">
							<DealResult
								loading={this.state.loading}
								form={this.props.form}
								dealSearchValues={this.dealSearchValues}
								filterValue={this.state.filterValue}
								search={this.search}
							></DealResult>
						</Form>
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
		authVisibleList: state.authorizationsReducers.authVisibleList
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
)(Form.create()(BatchCreateMainAccount))

