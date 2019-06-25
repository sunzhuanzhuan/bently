import React, { Component } from 'react'
import "./index.less"
import { Input, Slider, Select } from 'antd';
import PropTypes from 'prop-types'

const InputGroup = Input.Group;
const Option = Select.Option

/**
 * @param参数说明
 * sliderMin最小值/默认值
 * sliderMax最大值/默认值
 * unit文本框后的单位
 */
class InputAndSlider extends Component {
	static propTypes = {
		sliderMin: PropTypes.number.isRequired,
		sliderMax: PropTypes.number.isRequired,
		unit: PropTypes.string.isRequired
	}
	constructor(props) {
		super(props);
		const value = props.value || {}
		this.state = {
			number: value.number || [props.sliderMin, props.sliderMax],
			filterMin: props.sliderMin,
			filterMax: props.sliderMax,
			isShowOK: false,
			step: null,
			selectValue: props.selectValue || -1
		};
	}
	//修改输入框内容
	changedInputFilter = (index) => (e) => {
		let val = e.target.value.trim()
		// let val = e.target.value.trim() || (index ? this.props.sliderMax : 0)
		// 非负整数校验
		if (val && !/^\d+$/.test(val)) return
		let number = [...this.state.number]
		number[index] = val
		this.setState({
			number,
			step: 10,
			isShowOK: val == this.state.type ? false : true
		})
	}
	//确认按钮
	onClickOkButton = () => {
		const { number } = this.state
		const { sliderMin } = this.props
		let newNumber = [...number]
		if (number[0] >= number[1]) {
			newNumber[0] = sliderMin
		}
		if (!('value' in this.props)) {
			this.setState({ number: newNumber })
		}
		this.setState({ isShowOK: false, number: newNumber })
		this.triggerChange({ number })
	}
	//滑块的变化
	onChangeSlider = (number) => {
		if (!("number" in this.props)) {
			this.setState({ number, step: null });
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

	componentWillReceiveProps(nextProps) {
		if ("value" in nextProps) {
			this.setState({
				...(nextProps.value || {})
			})
		}
	}

	render() {
		const { filterMax, filterMin, step, isShowOK, number = [], selectValue } = this.state;
		const { sliderMin, sliderMax, selectList = [], isShowSelect = false, marks } = this.props
		const { unit } = this.props
		const _marks = marks ? { marks, step } : {};
		return (
			<div className="item-lable">
				<div className="item-lable-right">
					<InputGroup>
						<Input value={number[0]} onChange={this.changedInputFilter(0)} className="lable-input" />
						<Input className="middle-line" style={{ backgroundColor: 'transparent' }} value="-" disabled />
						<Input value={number[1]} onChange={this.changedInputFilter(1)} className="lable-input" />
						<Input className="middle-line" style={{
							backgroundColor: 'transparent',
							width: 42
						}} value={unit} disabled />
						<div className="ok-text">
							{isShowOK ? <a onClick={this.onClickOkButton} >确定</a> : null}
						</div>
					</InputGroup>
				</div>
				<div className="item-lable-left">
					{isShowSelect ? <div className="item-lable-select">
						<Select value={selectValue} style={{ width: "100%" }} placeholder="请选择" dropdownMatchSelectWidth={false} onChange={this.changeSelect}>
							{selectList.length > 0 ? selectList.map((one, index) => {
								return <Option key={index} value={one.id || one.value}>{one.name}</Option>
							}) : null}
						</Select>
					</div> : null}
					<div className='item-slider'>
						<Slider className="ant-slider-theme-thin" range
							value={(number[0] >= number[1] ? [number[1] - 1, number[1]] : number)}
							min={sliderMin}
							max={sliderMax}
							// marks={marks || {}}
							{..._marks}
							// step={step}
							onChange={this.onChangeSlider.bind(this)}
							onAfterChange={this.onClickOkButton}
						/>
					</div>
				</div>

			</div>
		);
	}
}

export default InputAndSlider;
