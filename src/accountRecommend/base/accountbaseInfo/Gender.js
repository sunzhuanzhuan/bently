import React, { Component } from "react"

export default class Gender extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		const { gender } = this.props
		return (
			<em>
				{gender == 1 ? (
					<img
						src={require("../../../../../static/css/images/icon/male_2x.png")}
						width="15"
						className="valign-middle"
						alt=""
					/>
				) : (
						""
					)}
				{gender == 2 ? (
					<img
						src={require("../../../../../static/css/images/icon/female_2x.png")}
						width="15"
						className="valign-middle"
						alt=""
					/>
				) : (
						""
					)}
			</em>
		)
	}
}
