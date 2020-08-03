import React, { Component } from 'react'
import "./index.less"
import { Input, Slider, Select,message } from 'antd';
import PropTypes from 'prop-types'
import ItemLable from '../ItemLable';
import CInputNumber from "@/queryExportTool/base/CInputNumber";
const InputGroup = Input.Group;
const Option = Select.Option

/**
 * @param参数说明
 * sliderMin最小值/默认值
 * sliderMax最大值/默认值
 * unit文本框后的单位
 */
class InputAndSliderNumber extends Component {
	static propTypes = {
		sliderMin: PropTypes.number.isRequired,
		sliderMax: PropTypes.number.isRequired,
		unit: PropTypes.string.isRequired,
		onFilter: PropTypes.func
	}
	constructor(props) {
		super(props);
		const value = props.value || {}
		this.state = {
			number: value.number || [], //|| [props.sliderMin, props.sliderMax],
			filterMin: props.sliderMin,
			filterMax: props.sliderMax,
			isShowOK: false,
			step: null,
			selectValue: props.selectValue
		};
	}
	onItemLableChange = (names) => {
		const { onNameChange } = this.props;
		onNameChange && onNameChange(names)
	}
	//修改输入框内容
	changedInputFilter = (index) => (e) => {
		console.log("TCL: changedInputFilter -> (e", (e))
		let val = `${e}`.trim()
		// let val = e.target.value.trim() || (index ? this.props.sliderMax : 0)
		// 非负整数校验
		if (val && !/^\d+$/.test(val)) return
		let number = [...this.state.number]
		number[index] = (val || '') - 0;
		this.setState({
			number,
			isShowOK: val == this.state.type ? false : true
		})
	}
	//确认按钮
	onClickOkButton = () => {
		const { number } = this.state;
		let newNumber = [...number]
		if (number[0] > number[1]) {
			newNumber = [...number].reverse();
		}
		if (!('value' in this.props)) {
			this.setState({ number: newNumber })
		}
		this.setState({ isShowOK: false, number: newNumber })
		this.triggerChange({ newNumber })
		const { unit } = this.props
		this.onItemLableChange({ optionsNames: [newNumber.join('-') + unit] })
	}
	//滑块的变化
	onChangeSlider = (number) => {
		if (!("number" in this.props)) {
			this.setState({ number });
		}
		this.triggerChange({ number })
	}
	//下拉框的变化
	changeSelect = (selectValue) => {
		if (!("selectValue" in this.props)) {
			this.setState({ selectValue });
		}
		this.triggerChange({ selectValue })
	}
	triggerChange = changedValue => {
		const { number, selectValue } = this.state
		const { onFilter, onChange } = this.props;
		if (onChange) {
			onChange({ number, selectValue, ...changedValue });
		}
		onFilter && onFilter()
	};
	onChangeItem = (values) => {
		const number = values[0] ? values[0].split("-") : values;
		if (!("number" in this.props)) {
			this.setState({ number });
		}
		this.triggerChange({ number })
	}

	componentWillReceiveProps(nextProps) {
		const { value = {} } = nextProps;
		if ("value" in nextProps) {
			this.setState({
				number: value.number || [],
				selectValue: value.selectValue
			})
		}
	}

	render() {
		const { isShowOK, number = [], selectValue } = this.state;
		const { selectList = [], isShowSelect = false, marks, maxNumber, showFalseMessage } = this.props
		const { unit } = this.props
		return (
			<div className="item-lable">
				<div className="item-lable-right">
					<CInputNumber value={number[0]} max={maxNumber} onChange={this.changedInputFilter(0)} className="lable-input" showFalseMessage={showFalseMessage} />
					<Input className="middle-line" style={{ backgroundColor: 'transparent' }} value="-" disabled />
					<CInputNumber value={number[1]} max={maxNumber} onChange={this.changedInputFilter(1)} className="lable-input" showFalseMessage={showFalseMessage} />
					<Input className="middle-line" style={{
						backgroundColor: 'transparent',
						width: 42
					}} value={unit} disabled />
					<div className="ok-text">
						{isShowOK ? <a onClick={this.onClickOkButton} >确定</a> : null}
					</div>
				</div>
				<div className="item-lable-left">
					{isShowSelect ? <div className="item-lable-select">
            <Select  getPopupContainer={triggerNode => triggerNode.parentNode}  value={selectValue} style={{ width: "100%" }} placeholder="请选择" dropdownMatchSelectWidth={false} onChange={this.changeSelect}>
							{selectList.length > 0 ? selectList.map((one, index) => {
								return <Option key={index} value={one.id || one.value}>{one.name}</Option>
							}) : null}
						</Select>
					</div> : null}
					<div className='item-slider'>
						<ItemLable
              id={this.props.id}
							onClick={this.onItemLableChange}
							onChange={this.onChangeItem}
							isoOnlyOne
							value={[number.join('-')]}
							tagsArray={marks}
              selectedItems={this.props.selectedItems}
						/>
					</div>
				</div>

			</div>
		);
	}
}

export default InputAndSliderNumber;
