import React, { Component } from 'react'
import { ShowDetailArr, DividingBox, PaymentMethodDetail, CooperationMethodDetail } from "../components/common";
import { Spin } from 'antd';
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
			{ title: "所属媒体平台", content: "" },
			{ title: "下单平台名称", content: "" },
			{ title: "下单截图是否必填", content: "" },
			{ title: "付款公司", content: "" },
			{ title: "平台报价项", content: "" },
			{ title: "收费类型", content: "" },
		]
		const payInfo = [
			{ title: "结算方式", content: "" },
			{ title: "回票方式", content: "" },
		]
		const { isLoading } = this.state
		return (
			<Spin spinning={isLoading}>
				<DividingBox text="平台基本信息" />
				<div style={{ margin: "30px 0px" }}>
					<ShowDetailArr arr={baseInfo} />
				</div>
				<DividingBox text="平台合作信息" />
				<div style={{ margin: "30px 0px" }}>
					<CooperationMethodDetail />
					<ShowDetailArr arr={payInfo} />
					<PaymentMethodDetail />
				</div>
			</Spin>
		);
	}
}

export default CooperationPlatformDetail;
