import React, { Component, PureComponent } from "react"
import { Checkbox, Popover } from 'antd'
import CollapseSwitch from "@/components/exportTemplate/base/CollapseSwitch";
import './FieldsCheckboxGroup.less'
import PriceGroupType from "@/components/exportTemplate/base/PriceGroupType";


export default class FieldsCheckboxGroup extends Component {
	state = {
		showFields: true
	}

	handleClick = () => {
		this.setState({
			showFields: !this.state.showFields
		})
	}
	onPriceTypeChange = (priceTypes) => {
		const { data, actions } = this.props
		actions.selectPriceType({
			groupId: data['groupType'],
			priceTypes: priceTypes
		})
	}

	componentWillMount() { }

	render() {
		const { showFields } = this.state
		const { title, fields = [], sources, data } = this.props
		console.log("FieldsCheckboxGroup -> render -> fields", fields)
		return <div className='fields-checkbox-group-container'>
			<header className='group-head-title'>
				<h4>{title}</h4>
				{title === "账号价格信息" && <PriceGroupType onChange={this.onPriceTypeChange} selected={data.priceTypes} />}
				<CollapseSwitch status={showFields} onClick={this.handleClick} />
			</header>
			<div className={'group-content-list' + (showFields ? ' show' : '')}>
				{
					fields.map(key => {
						const { id, name, introduction, removeableStatus } = sources[key]
						return <Checkbox key={id} value={id} disabled={removeableStatus == 2}>
							<Label name={name} content={introduction} />
						</Checkbox>
					})
				}
			</div>
		</div>
	}
}

class Label extends PureComponent {
	render() {
		const { name, content } = this.props
		return content ?
			<Popover placement="topLeft" content={
				<div style={{ maxWidth: '260px' }}>{content}</div>}>
				{name}
			</Popover> : <span>{name}</span>
	}
}
