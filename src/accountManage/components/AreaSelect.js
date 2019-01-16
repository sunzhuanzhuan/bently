import React, { Component } from "react"
import { Select } from 'antd'

const Option = Select.Option;

export default class AreaSelect extends Component {
	componentWillMount() {}
	handleChangeForProvience=()=>{

	}
	render() {
		const {flag} = this.props
		const flag_A = 1;//省
		const flag_B = 2;//市
		const flag_C = 4;//县
		return <div>
			{Boolean((flag&flag_A))&&<span>我是省</span>}
			{Boolean((flag&flag_B))&&<span>我是市</span>}
			{Boolean((flag&flag_C))&&<span>我是县</span>}
		</div>
	}
}
