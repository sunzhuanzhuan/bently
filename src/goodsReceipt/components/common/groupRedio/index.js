import React, { Component } from 'react'
import { Radio, Spin } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class GroupRedioThree extends Component {
	constructor(props) {
		super(props);
		this.state = {
			checkedRedioValue: 1
		};
	}
	changeRdeio = (e) => {
		this.setState({
			checkedRedioValue: e.target.value
		})
		const { onChangeRedio, actions } = this.props
		actions && actions.clearErrorList()
		onChangeRedio && onChangeRedio(e.target.value)
	}
	render() {
		const { sumData = [0, 0, 0], content = [], isLoading = false } = this.props
		const { checkedRedioValue } = this.state
		const redioGroup = [
			{
				value: 1,
				title: "预约订单",
			}, {
				value: 2,
				title: "微闪投订单",
			}, {
				value: 3,
				title: "公司拓展业务",
			}
		]
		return (

			<div>
				<RadioGroup defaultValue={1} onChange={this.changeRdeio} style={{ marginTop: 20 }}>
					{redioGroup.map((one, index) => <RadioButton value={one.value} key={one.value}>
						{one.title}（{sumData[index]}）
					</RadioButton>)}
				</RadioGroup>
				<Spin spinning={isLoading}>
					{content[checkedRedioValue - 1].content}
				</Spin>
			</div>
		);
	}
}

export default GroupRedioThree;
