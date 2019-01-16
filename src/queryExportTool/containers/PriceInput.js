import React from "react";
// import "./index.css";
import { Form, Input, Select, Button } from "antd";

const FormItem = Form.Item;
const Option = Select.Option;

class PriceInput extends React.Component {

	componentWillReceiveProps(nextProps) {
		console.log(nextProps.value, "value" in nextProps)
		const value = nextProps.value || {};
		if ("value" in nextProps) {
			this.setState({
				number: value.number,
				currency: value.currency || "rmb"
			})
		}
	}

	constructor(props) {
		super(props);

		const value = props.value || {};
		this.state = {
			number: value.number,
			currency: value.currency || "rmb"
		};
	}

	handleNumberChange = e => {
		const number = parseInt(e.target.value || 0, 10);
		if (isNaN(number)) {
			return;
		}
		if (!("value" in this.props)) {
			this.setState({ number });
		}
		this.triggerChange({ number });
	};

	handleCurrencyChange = currency => {
		if (!("value" in this.props)) {
			this.setState({ currency });
		}
		this.triggerChange({ currency });
	};

	triggerChange = changedValue => {
		// Should provide an event to pass value to Form.
		const onChange = this.props.onChange;
		if (onChange) {
			onChange(Object.assign({}, this.state, changedValue));
		}
	};

	render() {
		const { size } = this.props;
		const state = this.state;
		console.log("---", state.number)
		return (
			<span>
				<Input
					placeholder='请选择'
					type="text"
					size={size}
					value={state.number}
					onChange={this.handleNumberChange}
					style={{ width: "65%", marginRight: "3%" }}
				/>
				<Select
					value={state.currency}
					size={size}
					style={{ width: "32%" }}
					onChange={this.handleCurrencyChange}
				>
					<Option value="rmb">RMB</Option>
					<Option value="dollar">Dollar</Option>
				</Select>
			</span>
		);
	}
}
export default PriceInput
