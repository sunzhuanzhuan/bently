import React, { Component } from "react"
export default class UpdatePageCommonContainer extends Component {
	render() {
		return <div className='update-page-container'>
			<h2>账号维护</h2>
			{this.props.children}
		</div>
	}
}

