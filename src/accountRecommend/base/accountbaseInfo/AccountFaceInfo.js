import React, { Component } from "react"


export default class AccountFaceInfo extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		const { account, isVipShow } = this.props
		return (
			<p className="account-head">
				{/* 需预约 */}
				{account.is_famous == 1 && !isVipShow ? <span className="account-order" /> : ""}
				{/*微闪头*/}
				{account.is_famous == 2 && !isVipShow ? (
					<span className="account-weishantou" />
				) : (
						""
					)}
				{/* 头像  */}
				<span>
					<a href={account.single_url} target="_blank">
						<img
							className="valign-middle"
							width="56"
							style={{ display: "block" }}
							src={
								account.face_url
									? account.face_url
									: require("../../base/image/icon_head.jpg")
							}
							alt=""
							ref={c => (this.Face = c)}
						/>
					</a>
				</span>
			</p>
		)
	}
}
