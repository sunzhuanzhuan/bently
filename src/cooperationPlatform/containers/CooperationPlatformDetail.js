import React, { Component } from 'react'
import { ShowDetailArr, DividingBox, PaymentMethodDetail, CooperationMethodDetail } from "../components/common";
import Quotation from "../components/cooperationPlatformEdit/Quotation";
import ChargeType from "../components/cooperationPlatformEdit/ChargeType";

import { Spin, Button } from 'antd';
import { Link } from 'react-router-dom';
class CooperationPlatformDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true
		};
	}
	componentDidMount = () => {
		this.setState({
			isLoading: false
		})
	}
	render() {

		const baseInfo = [
			{ title: "所属媒体平台", content: "131" },
			{ title: "下单平台名称", content: "12312" },
			{ title: "下单截图是否必填", content: "123123" },
			{ title: "付款公司", content: "123" },
		]
		const payInfo = [
			{ title: "结算方式", content: "123" },
			{ title: "回票方式", content: "1231" },
		]
		const { isLoading } = this.state
		return (
			<Spin spinning={isLoading}>
				<DividingBox text="平台基本信息" />
				<div style={{ margin: "30px 0px" }}>
					<ShowDetailArr arr={baseInfo} />
					<ShowDetailArr arr={[{ title: "平台报价项", content: "" }]} />
					<Quotation isEdit={true} noLast={true} />
					<ShowDetailArr arr={[{ title: "收费类型", content: "" }]} />
					<ChargeType isEdit={true} noLast={true} />
				</div>
				<DividingBox text="平台合作信息" />
				<div style={{ margin: "30px 0px" }}>
					<CooperationMethodDetail />
					<ShowDetailArr arr={payInfo} />
					<PaymentMethodDetail />
				</div>
				<div style={{ textAlign: "center", marginBottom: 20 }}>
					<Link to="/config/platform/list">
						<Button >返回</Button>
					</Link>
				</div>
			</Spin>
		);
	}
}

export default CooperationPlatformDetail;
