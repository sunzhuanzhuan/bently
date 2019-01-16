import React, { Component } from "react"
import { Form, Button,message } from 'antd'
import { WrapPanel } from "../../components";
import AffixNav from "../../components/AffixNav";
import MainAccountInfos from "../../components/MainAccountInfos";
import { scroll } from "../../components/ScrollWrap"
import AudiencePortrait from "../../components/AudiencePortrait";
import moment from 'moment'


function uploadUrl(file) {
	return (file && file[0]) ? file[0].url : ''
}

const FormItem = Form.Item;
const scrollConf = {
	scrollElementSelector: '#app-content-children-id',
	targetsSelector: '.J-scroll-follow-nav',
	offset: 100
}

/**
 * 主账号信息
 */
@scroll(scrollConf)
export class AccountInfos extends Component {
	render() {
		const { auth, data: { accountInfo } ,actions: {updateAccountInfo}} = this.props.params;
		const {
			babysitter_host = 'host',
			account_id,
			latest_publish_time,
			platform_id,
		} = accountInfo


		let isOwner = auth['account.manage.update.change.main.account']
		let href =  isOwner ? `${babysitter_host}/user/index/type/huanma/account_id/${account_id}/weibo_type/${platform_id}`: `${babysitter_host}/user/chowner/account_id/${account_id}`

		const rightC = <div className='wrap-panel-right-content'>
			<span className='gray-text'>信息更新时间 : {latest_publish_time|| '--'}</span>
			<a target={'_blank'} href={href}>更换主账号</a>
		</div>
		return <div className='account-info-container update-page'>
			<div>
				<WrapPanel header='主账号信息' navId='mainAccountInfos' right={rightC}>
					<MainAccountInfos accountInfo={accountInfo} />
				</WrapPanel>
				{React.Children.map(this.props.children, child => React.cloneElement(child, { refresh: this.props.refresh }))}
			</div>
			{this.props.sidebarData.length ?
				<AffixNav scrollNode='.account-info-container' isUpdate={true} updateAccountInfo={updateAccountInfo} current={this.props.navCurrent} dataSource={this.props.sidebarData} onToggle={this.props.toggle} /> : null}
		</div>
	}
}


/**
 * 受众画像表单
 */
@Form.create()
export class AudiencePortraitForm extends Component {
	state = {isLoading:false}
	handleData = (values) => {
		let newData = { ...values }
		let gender = newData['gender_radio'] || []
		let city = newData['city_radio'] || []
		newData['audience_gender_male_ratio'] = (gender[0] * 100) / 10000
		newData['audience_gender_female_ratio'] = (gender[1] * 100) / 10000
		newData['audience_city_distribution_sceenshot_url'] = uploadUrl(newData['city_url'])
		newData['audience_city_top1'] = city[0]
		newData['audience_city_top2'] = city[1]
		newData['audience_city_top3'] = city[2]
		delete newData['gender_radio']
		delete newData['city_radio']
		return newData
	}
	submit = (e) => {
		e.preventDefault();
		const { actions: { updateAccountInfo }, data: { accountInfo } } = this.props.params;
		const {
			account_id,
			is_famous,
			user_id,
			token = {}
		} = accountInfo
		const {upload_token} = token
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				let data = this.handleData(values)
				this.setState({ isLoading: true })
				updateAccountInfo({ ...data, account_id, is_famous, user_id,upload_token }).then((data) => {
					this.setState({ isLoading: false })
					message.success(data.msg || '提交成功')
				}).catch(({errorMsg}) => {
					this.setState({ isLoading: false })
					message.error("提交失败: " + errorMsg)
				})
			}
		});
	}


	render() {
		const { form, params } = this.props
		const { data: { accountInfo } } = params;
		const {
			latest_publish_time
		} = accountInfo
		const rightC = <div className='wrap-panel-right-content'>
			<span className='gray-text'>信息更新时间 : {latest_publish_time || '--'}</span>
			<Button loading={this.state.isLoading} size='small' type='primary' onClick={this.submit}>{'保存'}</Button>
		</div>
		return <Form>
			<WrapPanel header='受众画像' right={rightC}>
				<AudiencePortrait {...params} {...form} />
			</WrapPanel>
		</Form>
	}
}
