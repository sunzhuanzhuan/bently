import React, { Component } from 'react'
class ShowDetailArr extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { arr = [] } = this.props
		return (
			<div>
				{arr.map((one, index) => {
					return <div key={index}>
						<div style={{ width: 150, height: 40, fontSize: 14, textAlign: "right", display: "inline-table" }}>
							{one.title}：
							</div>
						<div style={{ width: 200, display: "inline-table", paddingLeft: 5 }}>
							{one.content}
						</div>
					</div>
				})}
			</div>
		);
	}
}

export default ShowDetailArr;
