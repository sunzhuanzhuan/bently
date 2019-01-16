import React, { Component } from "react"
import { Row, Col } from 'antd'

export default class MainAccountInfos extends Component {
	componentWillMount() {}

	render() {
		const { user_name, user_id, owner_admin_real_name, vol_admin_real_name, babysitter_host = 'http://192.168.100.142' } = this.props.accountInfo
		return <article className='account-info-module main-account-infos'>
			<section className='common-infos'>
				<Row>
					<Col span={6}>主账号名称：<a target={'_blank'} href={`${babysitter_host}/user/update/user_id/${user_id}`}>{user_name}</a></Col>
					<Col span={6}>User_id：{user_id}</Col>
					<Col span={6}>资源媒介：{owner_admin_real_name || '--'}</Col>
					<Col span={6}>项目媒介：{vol_admin_real_name || '--'}</Col>
				</Row>
			</section>
			{/*<section className='custom-infos'>
			</section>*/}
		</article>
	}
}
