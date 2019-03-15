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
						<div style={{ width: 150, height: 40, fontSize: 14, textAlign: "right" }}>
							{one.title}：
							</div>
						<div style={{ display: "inline-table", paddingLeft: 5 }}>
							{one.content}
						</div>
					</div>
				})}
			</div>
		);
	}
}

export default ShowDetailArr;
