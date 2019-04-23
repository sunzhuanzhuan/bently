import React, { Component } from 'react';
import { WBYPlatformIcon } from "wbyui"
import { Row, Col, } from 'antd';
import AccountInfos, {
	Avatar,
	AvatarType,
	Secondary,
	WeiboVip, PlatformVerified
} from "@/queryExportTool/components/common/AccountInfos";
class Heard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { baseInfoList, } = this.props
		const { base = {}, account_id } = baseInfoList
		const { avatar_url, sns_name, verification_info,
			media_fetched_time, cooperation_tips, platform_id,
			is_famous, gender, area_name, age_group, is_verified, verified_status } = base
		const Is_wei = is_famous == 2
		const genderName = gender == 1 ? "男" : gender == 2 ? "女" : ""
		return (
			<div>
				<Row>
					<Col span={4} style={{ width: 80 }}>
						<Avatar src={avatar_url} name='测试图'>
							<AvatarType type={Is_wei ? "micro" : 'famous'} />
						</Avatar>

					</Col>
					<Col span={20}>
						<Row>
							<Col span={2} style={{ width: 18, marginTop: -2 }}>
								<WBYPlatformIcon weibo_type={platform_id} widthSize={14} />
							</Col>
							<Col span={22}>
								<div style={{ float: "left", marginRight: 10 }} >{sns_name}
									<WeiboVip platform_id={platform_id} verified_status={verified_status} marginTop={0} />
									<PlatformVerified is_verified={is_verified} platform_id={platform_id} />
								</div>
								<div style={{ marginTop: -4 }}>
									<Secondary genderName={genderName} area_name={area_name} age_group={age_group} />

								</div>
							</Col>
						</Row>
						<Row style={{ marginTop: 10 }}>
							<span style={{ color: 999 }}>最近一次内容更新时间：</span>
							<span>{media_fetched_time}</span>
						</Row>
					</Col>
					{/* <Col span={4}>
						<Button type="primary"
							onClick={() => {
								addToCartDetail && addToCartDetail({ account_id, platform_id })
							}}  >
							<Icon type="shopping-cart" theme="outlined" /> 加入选号车
						</Button>
					</Col> */}

				</Row >
				<Row style={{ marginTop: 10 }}>
					<span style={{ color: "#999" }}>认证信息：</span>
					<span style={{ color: "#333" }}>{verification_info}</span>
				</Row>
				<Row style={{ marginTop: 10 }}>
					<span style={{ color: "#999" }}>合作须知：</span>
					<span style={{ color: "#333" }}>{cooperation_tips}</span>
				</Row>
			</div>
		);
	}
}

export default Heard;
