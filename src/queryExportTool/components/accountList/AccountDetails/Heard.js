import React, { Component } from 'react';
import { WBYPlatformIcon } from "wbyui"
import { Row, Col, Icon, } from 'antd';
import AccountInfos, {
	Avatar,
	AvatarType,
	Secondary,
	WeiboVip, PlatformVerified
} from "@/queryExportTool/components/common/AccountInfos";
import AuthVisbleIsBP from '@/queryExportTool/containers/AuthVisbleIsBP'
class Heard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { baseInfoList, } = this.props
		const { base = {}, accountId } = baseInfoList
		const { avatarUrl, snsName, verificationInfo,
			mediaFetchedTime, cooperationTips, platformId,
			isFamous, gender, areaName, ageGroup, isVerified, verifiedStatus, url, snsId } = base
		const IsWei = isFamous == 2
		const genderName = gender == 1 ? "男" : gender == 2 ? "女" : ""

		return (
			<div>
				<Row>
					<Col span={4} style={{ width: 80 }}>
						<Avatar src={avatarUrl} name='测试图'>
							<AvatarType type={IsWei ? "micro" : 'famous'} />
						</Avatar>

					</Col>
					<Col span={20}>
						<Row>
							<Col span={2} style={{ width: 18, marginTop: -2 }}>
								<WBYPlatformIcon weibo_type={platformId} widthSize={14} />
							</Col>
							<Col span={16}>
								<div style={{ float: "left", marginRight: 10 }} >{snsName}
									<WeiboVip platformId={`${platformId}`} verifiedStatus={verifiedStatus} marginTop={0} />
									<PlatformVerified isVerified={isVerified} platformId={platformId} />
								</div>
								<div style={{ marginTop: -4 }}>
									<Secondary genderName={genderName} areaName={areaName} ageGroup={ageGroup} />
								</div>
							</Col>
							<Col span={6}>
								<AuthVisbleIsBP isComponent={<div>
									<a href={platformId == 9 ? `https://weixin.sogou.com/weixin?query=${snsId}` : url} target="Blank">
										<Icon type="home" /> 去主页
									</a>
									<span style={{ padding: '0px 5px', color: '#999' }}>|</span>
									<a
										target='Blank'
										href={`/account/manage/view/${platformId}?accountId=${accountId}`}><Icon type='search' />
										账号维护页
									</a>
								</div>} noComponent={null} />
							</Col>
						</Row>
						<Row style={{ marginTop: 10 }}>
							<span style={{ color: 999 }}>最近一次内容更新时间：</span>
							<span>{mediaFetchedTime}</span>
						</Row>
					</Col>
					{/* <Col span={4}>
						<Button type="primary"
							onClick={() => {
								addToCartDetail && addToCartDetail({ accountId, platformId })
							}}  >
							<Icon type="shopping-cart" theme="outlined" /> 加入选号车
						</Button>
					</Col> */}

				</Row >
				<Row style={{ marginTop: 10 }}>
					<span style={{ color: "#999" }}>认证信息：</span>
					<span style={{ color: "#333" }}>{verificationInfo}</span>
				</Row>
				<Row style={{ marginTop: 10 }}>
					<span style={{ color: "#999" }}>合作须知：</span>
					<span style={{ color: "#333" }}>{cooperationTips}</span>
				</Row>
			</div>
		);
	}
}

export default Heard;
