import React, { Component } from "react"
export default class AccountFaceInfo extends Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() { }
	render() {
		const { account } = this.props
		return (
			<em>
				{account.weibo_type != 9 ? (
					<a
						href={account.homepage_url}
						target="_blank"
						className="color-default valign-middle"
						title={account.weibo_name}
					>
						{account.weibo_name}
					</a>
				) : (
						<a
							href={account.single_url}
							target="_blank"
							className="color-default valign-middle"
							title={account.weibo_name}
						>
							{account.weibo_name}
						</a>
					)}
			</em>
		)
	}
}
