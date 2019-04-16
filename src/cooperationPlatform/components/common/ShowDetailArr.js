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
					return <div key={index} style={{ display: 'flex' }}>
						<div style={{ minWidth: 180, height: 40, fontSize: 14, textAlign: "right" }}>
							{one.title}：
							</div>
						<div style={{ display: "inline-table", paddingLeft: 5, height: 38, marginTop: 1 }}>
							{one.content}
						</div>
					</div>
				})}
			</div>
		);
	}
}

export default ShowDetailArr;
