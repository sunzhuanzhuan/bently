import React, { Component } from 'react'
import { Modal, Button, layout, Spin, Card, Radio, Row, Col, Tooltip, Badge, Progress } from 'antd';
import '../containers/sellerAndAE/selectNumber.less';
import numeral from 'numeral';
import { WBYPlatformIcon } from "wbyui"
import adjustApply from '@/companyDetail/containers/adjustApply';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import { connect } from "react-redux";
import * as actions from '../../actions'

let map = {
	'未入库': 'error',
	'已上架': 'success',
	'已下架': 'warning',
	'抓取中': 'processing',
	'抓取失败': 'default',
	'拓号终止': 'default',
	'待拓号': 'processing',
	'拓号完成': 'success',
}

const SimilarAccountList = ({ data = [], formatFansNum, ext_account_id, preOnChange }) => {

	return <div className='similar-account'>{
		<RadioGroup>
			{data.map((account, index) => {
				return account.weibo_type == 0 ?
					<Radio value={account.account_id} key={account.account_id} style={{ display: 'block', lineHeight: '2.5em' }}
						onClick={(event) => { preOnChange(event, ext_account_id, account, index) }}>{account.weibo_name}</Radio>
					:
					<Radio value={account.account_id} style={{ display: 'block', lineHeight: '2.5em' }} key={account.account_id}
						onClick={(event) => { preOnChange(event, ext_account_id, account) }} className='grid'>
						<em className='id'>ID：
                            <Tooltip placement="topLeft" title={account.weibo_id} arrowPointAtCenter>
								{account.weibo_id}
							</Tooltip>
						</em>
						<em className='url'><a href={account.url} target='_blank'>URL</a></em>
						<em className='fans'>粉丝数：{formatFansNum(account.followers_count)}</em>
						<em className='status'>
							{
								<Badge status={map[account.status_name]} text={account.status_name} />
							}
						</em>
					</Radio>
			}
			)
			}
		</RadioGroup>
	}
	</div>
}
@connect(state => state.extensionNumber, actions)
class FindSameAccount extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cardTitle: '',
			unFindListState: [],

			currentExtenID: 0,
			aleardyLen: '',
			totalAccount: {},
			confirmLoading: true,
			isClickStep: true
		}
		this.selectedAry = {};
		this.totalAccount = {};
		this.updatedAccount = {};
	}
	formatFansNum = (num) => {
		if (num > 1000) {
			return Math.floor((num / 1000)) / 10 + 'W'
		} else {
			return num
		}
	}
	preOnChange = (e, ext_account_id, account, index) => {
		const choose_status = e.target.value == '00000' ? 1 : 2
		this.props.updateHasSimilarAccount(ext_account_id, { ...account, choose_status, ext_account_id })
	}

	render() {

		const { similarAccount, selectedAccountHasSimilar, similarAcccountLoading, rest, updatingAccountLength } = this.props
	

		return (
			<div>
				<p>因账号抓取失败或未入库，我们通过名称为您找到了相似账号，请确定是否符合需求</p>
				{<p>{rest}个加载中的数据，还剩{updatingAccountLength}需要处理</p>}
				<Row className='account-list-container'>
					{selectedAccountHasSimilar.map((item, index) => {
						return <Col key={item.ext_account_id}>
							<Card style={{ width: 360, marginTop: 16, height: 250 }} key={index} loading={similarAcccountLoading}
								className='account-list-card'>
								<div className='account-wrap'>
									<Col className='ellipsis-text'>
										<WBYPlatformIcon weibo_type={item.weibo_type} widthSize={16}></WBYPlatformIcon>
										&nbsp;
										账号名：{item.account_name ?
											<Tooltip placement="topLeft" title={item.account_name} arrowPointAtCenter>
												{item.account_name}
											</Tooltip>
											: '--'}
									</Col>
									<Row>
										<Col span={7} style={{ textAlign: 'left' }} className='ellipsis-text'>
											ID : {item.weibo_id ?
												<Tooltip placement="topLeft" title={item.weibo_id} arrowPointAtCenter>
													{item.weibo_id}
												</Tooltip> : '--'
											}
										</Col>
										<Col span={3} style={{ marginLeft: 5 }} >
											{item.url ? <a href={item.url} target='_blank'>URL</a> : '--'}
										</Col>
										<Col style={{ marginLeft: 5 }} span={7}>
											粉丝：
										{item.status != 5 ? this.formatFansNum(item.followers_count) : '--'}
										</Col>
										<Col span={6}>
											{
												<Badge status={map[item.status_name]} text={item.status_name} />
											}
										</Col>
									</Row>
								</div>

								<Col>
									<p>相似账号</p>
									<SimilarAccountList data={similarAccount[item.ext_account_id]}
										formatFansNum={this.formatFansNum}
										onChange={this.onChange}
										ext_account_id={item.ext_account_id}
										preOnChange={this.preOnChange}
									>
									</SimilarAccountList>
								</Col>


							</Card>
						</Col>
					})}

				</Row>
			</div>
		)
	}
}
export default FindSameAccount
