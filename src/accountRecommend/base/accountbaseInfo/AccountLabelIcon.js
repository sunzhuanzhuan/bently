import React, { Component } from "react"
export default class AccountLabelIcon extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		const { account } = this.props
		return (
			<p className="font-size-small" style={{ lineHeight: "25px", maxWidth: 196 }}>
				{account.weibo_type == 9 && account.can_origin == 1 ? (
					<span className="account-tags text-center valign-middle">原创写稿</span>
				) : (
						""
					)}
				{account.weibo_type == 9 && account.only_support_original == 1 ? (
					<span className="account-tags text-center valign-middle">仅支持原创</span>
				) : (
						""
					)}
				{account.weibo_type != 9 && account.can_origin == 1 ? (
					<span className="account-tags text-center valign-middle">可原创</span>
				) : (
						""
					)}
				{account.is_famous == 1 && account.is_shielding == 1 ? (
					<span className="account-tags text-center valign-middle">防屏蔽</span>
				) : (
						""
					)}
				{account.is_famous == 1 && account.with_topic_and_link == 1 ? (
					<span className="account-tags text-center valign-middle">可带@/话题/链接</span>
				) : (
						""
					)}
				{account.operation_tag &&
					account.operation_tag.map((item, n) => {
						return (
							<img
								height="20"
								src={item.icon_path}
								alt=""
								key={n}
								data-operation-tag-description={item.description}
								className="icon-account-label"
								style={{ height: 20, marginRight: 4, verticalAlign: "middle" }}
							/>
						)
					})}
			</p>
		)
	}
}
