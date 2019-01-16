import React from 'react';
import { Checkbox, Button } from 'antd';
const CheckboxGroup = Checkbox.Group
export default class WBYTreePopover extends React.Component {
	onChange = (optionsValues) => {
		// const { onChange } = this.props;
		// const optionsNames = optionsValues.map(item => this.optionsObj[item])
		// onChange && onChange({ optionsValues, optionsNames }, false)
		this.optionsValues = optionsValues;
	}
	onClickOk = () => {
		const optionsValues = this.optionsValues;
		const { onChange } = this.props;
		const optionsNames = optionsValues.map(item => this.optionsObj[item])
		// const { optionsNames, optionsValues } = this;
		onChange && onChange({ optionsValues, optionsNames })

	}
	updateOptionsObj = (props) => {
		const { options = [] } = props;
		return options.reduce((obj, item) => {
			obj[item.id] = item.name
			return obj;
		}, {});
	}
	componentDidMount() {
		this.optionsObj = this.updateOptionsObj(this.props)
	}
	componentWillReceiveProps(nextProps) {
		this.optionsObj = this.updateOptionsObj(nextProps)
	}
	render() {
		const { options = [] } = this.props;
		return <div className='wby-tree-popover'>
			<div className="popover-body">
				<ul>
					{
						<CheckboxGroup onChange={this.onChange} >
							{
								options.map(item =>
									<li key={item.id}>
										<Checkbox value={item.id}>{item.name}</Checkbox>
									</li>)
							}
						</CheckboxGroup>
					}
				</ul>
			</div>
			<div className="popover-footer">
				<Button onClick={this.onClickCancel}>取消</Button>
				<Button onClick={this.onClickOk}>确定</Button>
			</div>

		</div>
	}
}
