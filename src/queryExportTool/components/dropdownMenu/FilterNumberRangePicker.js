import React from 'react';
import { Button, Radio } from 'antd';
import { InputAndSlider } from '../index'
const RadioGroup = Radio.Group;

export default class FilterNumberRangePicker extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			type: "1",
			min: 0,
			max: 100000
		}
		this.fields = { type: this.state.type, rangeValue: [0, 100000] };
	}
	onChange = (e) => {
		const { options = [] } = this.props;
		const mapObj = options.reduce((obj, item) => {
			obj[item.value] = item.name;
			return obj;
		}, {})
		const type = e.target.value;
		this.setState({ type })
		this.fields.type = type;
		this.fields.typeName = mapObj[type];
	}
	onSliderChange = (value) => {
		this.fields.rangeValue = value.value;
	}
	onCancel = () => {
		const { onCancel } = this.props;
		this.setState({
			type: "1",
			min: 0,
			max: 100000
		})
		onCancel && onCancel(false)
	}
	onOk = () => {
		const { rangeValue = [] } = this.fields;
		this.props.onChange({
			optionsValues: {
				rangeValue: rangeValue,
				type: this.fields.type
			}, optionsNames: `${this.fields.typeName}${rangeValue.join('-')}元`
		})
	}
	render() {
		const { type, min, max } = this.state;
		const { options = [] } = this.props;
		return <div className='filter-number-range-picker'>
			<RadioGroup onChange={this.onChange} defaultValue={type} value={type}>
				{
					options.map((item, index) => <Radio key={index} value={`${item.value}`}>{item.name}</Radio>)
				}
			</RadioGroup>
			<div>播放单价：<InputAndSlider onChange={this.onSliderChange} sliderMin={min} sliderMax={max} unit='元'></InputAndSlider></div>
			<div className='footer' style={{ textAlign: 'right' }}>
				<Button onClick={this.onCancel}>取消</Button>
				<Button style={{ marginLeft: '10px' }} onClick={this.onOk}>确定</Button>
			</div>
		</div>
	}
}
