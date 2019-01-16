import React, { Component } from 'react';
import { Select, Input, InputNumber, Button } from 'antd';
import "./index.less"
import PropTypes from 'prop-types'
import CInputNumber from "@/queryExportTool/base/CInputNumber";
const InputGroup = Input.Group;
const Option = Select.Option;
/**
 * @param
 * options:下拉列表集合
 * inputLableBefore：input前的文本
 * inputLableAfter：input后的文本
 * showType：展示个数为three时展示三个表单
 * inputLableMiddle：input中间的文本（showType=three三个时出现）
 */
class SelectAndInput extends Component {
	static propTypes = {
		options: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string,
			value: PropTypes.string,
		})),
		inputLableBefore: PropTypes.string,
		inputLableAfter: PropTypes.string
	}
	constructor(props) {
		super(props);
		const value = props.value || {};
		this.state = {
			name: value.name,
			weight: value.weight || []
		};
	}
	componentWillReceiveProps(nextProps) {
		// Should be a controlled component.
		const value = nextProps.value || {};
		if ("value" in nextProps) {
			this.setState({
				name: value.name,
				weight: value.weight || []
			})
		}
	}
	selectChange = (selectValue) => {
		if (!("value" in this.props)) {
			this.setState({ name: selectValue });
		}
		this.triggerChange({ name: selectValue });
	}

	changeInputNumberMin = (min) => {
		const { weight = [] } = this.state;
		const state = { weight: weight[1] ? [min, weight[1]] : [min] };
		if (!("value" in this.props)) {
			this.setState(state);
		}
		this.triggerChange(state);
	}
	changeInputNumberMax = (max) => {
		const { weight = [] } = this.state;
		const state = { weight: [weight[0], max] };
		if (!("value" in this.props)) {
			this.setState(state);
		}
		this.triggerChange(state);
	}
	triggerChange = changedValue => {
		// Should provide an event to pass value to Form.
		const onChange = this.props.onChange;
		if (onChange) {
			onChange(Object.assign({}, this.state, changedValue));
		}
	};

	onClickOkButton = () => {
		const { name, weight } = this.state
		const min = weight[0] || '';
		const max = weight[1] || '';
		const { onOkClick, showType, inputLableAfter = "%", options = [] } = this.props
		const optionsMap = options.reduce((obj, item) => {
			obj[item.id || item.value] = item.name;
			return obj;
		}, {})
		let optionsValues = { name: name, weight: [min, max] }
		if (options.length == 0) {
			optionsValues = [min, max]
		}
		let optionsNames = (optionsMap[name] || '') + '大于' + min + inputLableAfter;
		if (showType === "three") {
			optionsNames = `${optionsMap[name]}，${min} - ${max}`;
			optionsValues.weight = [min, max]
		}
		onOkClick && onOkClick({ optionsValues, optionsNames })

	}
	getWidthPx = (Text) => {
		return Text.length * 14 + 20
	}
	render() {
		const {
			placeholder = '',
			options = [],
			showType,
			showBtn = true,
			inputLableBefore = "大于",
			inputLableAfter = "%",
			inputLableMiddle = "-",
			promptMessage
		} = this.props
		const state = this.state
		const { weight } = this.state;
		const [min, max] = weight;
		//下拉框选择是否为空
		const emptyName = (options.length !== 0 && !state.name);
		let okBtnDisabled = emptyName || !min ||
			showType != "three" && inputLableAfter == '%' && min >= 100 ||   //如果一个输入框，并且是百分比，
			showType == "three" && (!max || min >= max);

		return (
			<div ref={e => this.node = e} className="select-input">
				{promptMessage ? <div className="prompt-message">{promptMessage}</div> : null}
				<InputGroup className="select-input-group">
					{options.length > 0 && <Select
						getPopupContainer={() => this.node}
						placeholder={placeholder || '请选择'}
						allowClear
						dropdownMatchSelectWidth={false}
						value={state.name}
						className="group-select" onChange={this.selectChange}>
						{options.map((one, index) => {
							return <Option key={index} value={one.id || one.value}>{one.name}</Option>
						})}
					</Select>}
					<Input className="middle-input-lable" style={{ backgroundColor: '#fff', width: this.getWidthPx(inputLableBefore) }} placeholder={inputLableBefore} disabled />
					<CInputNumber min={0} value={weight[0]} className="group-input-number" onChange={this.changeInputNumberMin} />
					{showType == "three" ?
						<span>
							<Input className="middle-input-lable" style={{ backgroundColor: '#fff', width: this.getWidthPx(inputLableMiddle) }} placeholder={inputLableMiddle} disabled />
							<CInputNumber min={0} value={weight[1]} className="group-input-number" onChange={this.changeInputNumberMax} />
						</span> : null}
					<Input className="middle-input-lable" style={{ backgroundColor: '#fff', width: this.getWidthPx(inputLableAfter) }} placeholder={inputLableAfter} disabled />
					{showBtn && <Button disabled={okBtnDisabled} type="primary" onClick={this.onClickOkButton}>确定</Button>}
				</InputGroup>

			</div>
		);
	}
}

export default SelectAndInput;
