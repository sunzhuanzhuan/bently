import React, { Component } from 'react';
import { Select, Input, InputNumber, Button } from 'antd';
import "./index.less"
import PropTypes from 'prop-types'
import CInputNumber from "@/queryExportTool/base/CInputNumber";
const InputGroup = Input.Group;
/**
 * @param
 * inputLableBefore：input前的文本
 * inputLableAfter：input后的文本
 */
class InputButton extends Component {
	static propTypes = {
		inputLableBefore: PropTypes.string,
		inputLableAfter: PropTypes.string
	}
	constructor(props) {
		super(props);
		const value = props.value || {};
		this.state = {
			weight: value || []
		};
	}
	componentWillReceiveProps(nextProps) {
		// Should be a controlled component.
		const value = nextProps.value || {};
		if ("value" in nextProps) {
			this.setState({
				weight: value || []
			})
		}
	}
	changeInputNumberMin = (min) => {
		const state = { weight: [min] };
		if (!("value" in this.props)) {
			this.setState(state);
		}
		this.triggerChange(state);
	}
	//数据每次变化调用函数
	triggerChange = changedValue => {
		// Should provide an event to pass value to Form.
		const onChange = this.props.onChange;
		if (onChange) {
			onChange(changedValue.weight);
		}
	}
	//拼接数据，已选选项
	onClickOkButton = () => {
		const { weight } = this.state
		const min = weight[0] || '';
		const { onOkClick, inputLableAfter = "%", } = this.props
		let optionsValues = { weight: [min] }
		let optionsNames = '大于' + min + inputLableAfter;
		onOkClick && onOkClick({ optionsValues, optionsNames })

	}
	getWidthPx = (Text) => {
		return Text.length * 14 + 20
	}
	render() {
		const {
			showBtn = true,
			inputLableBefore = "大于",
			inputLableAfter = "%",
			promptMessage
		} = this.props
		const { weight } = this.state;
		const min = weight[0];
		//如果一个输入框，并且是百分比，判断确定按钮是否亮起
		let okBtnDisabled = !min || inputLableAfter == '%' && min >= 100;

		return (
			<div ref={e => this.node = e} className="select-input">
				{promptMessage ? <div className="prompt-message">{promptMessage}</div> : null}
				<InputGroup className="select-input-group">
					<Input className="middle-input-lable" style={{ backgroundColor: '#fff', width: this.getWidthPx(inputLableBefore) }} placeholder={inputLableBefore} disabled />
					<CInputNumber min={0} value={weight[0]} className="group-input-number" onChange={this.changeInputNumberMin} />
					<Input className="middle-input-lable" style={{ backgroundColor: '#fff', width: this.getWidthPx(inputLableAfter) }} placeholder={inputLableAfter} disabled />
					{showBtn && <Button disabled={okBtnDisabled} type="primary" onClick={this.onClickOkButton}>确定</Button>}
				</InputGroup>

			</div>
		);
	}
}

export default InputButton;
