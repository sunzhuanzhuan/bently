import React from 'react';
// import moment from 'moment';
import { Menu } from 'antd';
import './SelectMenu.less'

class SelectMenu extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			value: props.value
		}
	}
	componentWillReceiveProps(nextProps) {
		console.log("nextProps", nextProps)
		if ("value" in nextProps) {
			this.setState({
				value: nextProps.value
			})
		}
	}
	onSelect = (value, name) => {
		const { onSelect } = this.props;

		if (!("value" in this.props)) {
			this.setState({ value });
		}
		onSelect && onSelect({ optionsNames: name })

		this.triggerChange(value)
	}
	triggerChange = (changedValue) => {
		// Should provide an event to pass value to Form.
		const onChange = this.props.onChange;
		if (onChange) {
			onChange(changedValue);
		}
	};
	render() {
		const { value } = this.state
		const { options } = this.props;
		return <ul className='wby-select-menu'>
			{
				options.map((item, index) =>
					<li className={(item.value || item.id) == value ? 'active' : ''}
						key={index}
						onClick={() => this.onSelect((item.value || item.id), item.name)}
					>{item.name}</li>)
			}
		</ul>
	}
}
export default SelectMenu
