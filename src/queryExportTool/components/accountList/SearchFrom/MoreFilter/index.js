import React, { Component } from 'react'
import { Form, Input, Row, Divider, Col, Checkbox, Radio, Button, Select, DatePicker } from "antd";
import SelectAndInput from '../SelectAndInput'
import './index.less'
import {
	dateRangeOptions,
	genderOptions,
	mediaTypeOptions
} from '@/queryExportTool/constants/searchFilter'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const is_verified_options = [
	{ name: '不限', value: '' },
	{ name: '是', value: 1 },
	{ name: '否', value: 2 }
]

const RadioItem = ({ id, name, options, form, onChecked }) => {
	const onChange = (e) => {
		const map = options.reduce((obj, item) => {
			obj[item.value || item.id] = item.name;
			return obj;
		}, {})
		onChecked && onChecked(id, name, { optionsNames: map[e.target.value] })
	}
	const { getFieldDecorator } = form;
	return (
		<div>
			<h4>{name}</h4>
			<FormItem>
				{getFieldDecorator(id)(
					<RadioGroup onChange={onChange}>
						{options.map(one => {
							return <Radio key={one.name} value={one.value || one.id}> {one.name}</Radio>
						})}
					</RadioGroup>
				)}
			</FormItem>
		</div>
	)
}
const CheckboxItem = ({ id, name, options, form, onChecked }) => {
	const { getFieldDecorator } = form;
	const onChange = (values = []) => {
		const map = options.reduce((obj, item) => {
			obj[item.value || item.id] = item.name;
			return obj;
		}, {})
		const optionsNames = values.map(item => map[item])
		onChecked && onChecked(id, name, { optionsNames })
	}
	return (
		<div>
			<h4>{name}</h4>
			<FormItem>
				{getFieldDecorator(id)(
					<CheckboxGroup onChange={onChange}>
						{options.map(one => {
							return <Checkbox key={one.name} value={one.value}> {one.name}</Checkbox>
						})}
					</CheckboxGroup>
				)}
			</FormItem>
		</div>
	)
}

// const ReadPrice = ({ name, form, type, price }) => {
// 	const { getFieldDecorator } = form;
// 	return <div className='' style={{ 'overflow': 'hidden', marginBottom: '20px' }}>
// 		<h4>{name}</h4>
// 		{getFieldDecorator(type, {})(
// 			<SelectAndInput inputLableBefore='阅读单价' inputLableAfter='' showBtn={false} showType='three' options={[{ name: '多一', value: '1' }]} ></SelectAndInput>
// 		)}
// 	</div>
// }

const PriceValid = ({ id, name, form, onChange }) => {
	const { getFieldDecorator } = form;
	const onChange2 = (adates, dateStrings) => {
		onChange && onChange(id, name, { optionsNames: dateStrings.join("~") })
	}
	return <div className='range-picker-z-index-0'>
		<h4>{name}</h4>
		{getFieldDecorator(id)(
			<RangePicker onChange={onChange2} getCalendarContainer={(e) => e.parentNode} format="YYYY-MM-DD" />
		)}
	</div>
}

const mapFieldsToPlatform = {
	"introduction": [1, 2, 3, 4, 5],
	"verification_info": [1, 2, 3, 4, 5],
	"cooperation_tips": [1, 2, 3, 4, 5],
	"trademark_name": [1, 2, 4],
	"hotword_name": [1, 2, 4],
	"latest_publish_time": [1, 2, 3, 4],
	"verified_status": [2],
	"gender": [1, 2, 3],
	"media_type": [1, 2, 3, 4, 5],
	"industry_id": [],
	"is_verified": [3, 4, 5]
}

class MoreFilter extends Component {
	constructor(props) {
		super(props);
		this.selectedItems = {};
	}
	onOk = () => {
		this.props.onOk(this.selectedItems)
	}
	remove = (id) => {
		delete this.selectedItems[id]
	}
	reset = () => {
		this.selectedItems = {};
	}

	onChange = (id, name, { optionsNames: names }) => {
		// if (!names) {
		// 	// delete this.selectedItems[id]
		// } else {
		// 	this.selectedItems = {
		// 		...this.selectedItems,
		// 		[id]: name + ':' + names
		// 	}
		// }
		this.selectedItems = {
			...this.selectedItems,
			[id]: !names ? '' : (name + ':' + names)
		}
	}
	onCancel = () => {
		const { onCancel, selectedkeys } = this.props;
		const moreFileldKeys = [
			"introduction", "verification_info", "cooperation_tips",
			"trademark_name", "hotword_name", "sku_unit_read_price", "sku_unit_play_price",
			"latest_publish_time", "verified_status", "is_verified", "gender", "media_type", "industry_id", "sku_price_valid"
		]
		const _moreFileldKeys = moreFileldKeys.filter(item => selectedkeys.indexOf(item) == -1)
		moreFileldKeys.forEach(item => {
			if (selectedkeys.indexOf(item) == -1) {
				delete this.selectedItems[item]
			}
		});
		this.props.form.resetFields(_moreFileldKeys)
		onCancel && onCancel();
	}
	render() {
		const { form } = this.props;
		const { getFieldDecorator } = this.props.form;
		const { params, filterMore } = this.props;
		const platformType = parseInt(params.platformType, 10);
		const formItemLayout = {
			labelCol: {
				sm: { span: 8 }
			},
			wrapperCol: {
				sm: { span: 16 }
			},
		};
		const { unit_play_price_types, unit_read_price_types, verified_status, industry_list_options } = filterMore;
		return (
			<div>
				<Form>
					<Row>
						<h4 >关键字</h4>
						{mapFieldsToPlatform['introduction'].includes(platformType) && <Col span={12}>
							<FormItem
								{...formItemLayout}
								label={'账号简介'}>
								{getFieldDecorator('introduction')(
									<Input onChange={(e) => this.onChange('introduction', '账号简介', { optionsNames: e.target.value })} placeholder={'请输入关键词,多个空格隔开'} />
								)}
							</FormItem>
						</Col>}
						{mapFieldsToPlatform['verification_info'].includes(platformType) && <Col span={12}>
							<FormItem
								{...formItemLayout}
								label={'认证信息'}>
								{getFieldDecorator('verification_info')(
									<Input onChange={(e) => this.onChange('verification_info', '认证信息', { optionsNames: e.target.value })} placeholder={'请输入关键词,多个空格隔开'} />
								)}
							</FormItem>
						</Col>}
						{mapFieldsToPlatform['cooperation_tips'].includes(platformType) && <Col span={12}>
							<FormItem
								{...formItemLayout}
								label={'合作须知'}>
								{getFieldDecorator('cooperation_tips')(
									<Input onChange={(e) => this.onChange('cooperation_tips', '合作须知', { optionsNames: e.target.value })} placeholder={'请输入关键词,多个空格隔开'} />
								)}
							</FormItem>
						</Col>}
						{mapFieldsToPlatform['trademark_name'].includes(platformType) && <Col span={12}>
							<FormItem
								{...formItemLayout}
								label={'提及品牌词'}>
								{getFieldDecorator('trademark_name')(
									<Input onChange={(e) => this.onChange('trademark_name', '提及品牌词', { optionsNames: e.target.value })} placeholder={'请输入关键词,多个空格隔开'} />
								)}
							</FormItem>
						</Col>}
						{mapFieldsToPlatform['hotword_name'].includes(platformType) && <Col span={12}>
							<FormItem
								{...formItemLayout}
								label={'图文热词'}>
								{getFieldDecorator('hotword_name')(
									<Input onChange={(e) => this.onChange('hotword_name', '图文热词', { optionsNames: e.target.value })} placeholder={'请输入关键词,多个空格隔开'} />
								)}
							</FormItem>
						</Col>}
						<Divider />
					</Row>

					{mapFieldsToPlatform['latest_publish_time'].includes(platformType) &&
						<RadioItem onChecked={this.onChange} name='最近一次内容发布时间' id='latest_publish_time' options={dateRangeOptions} form={form}></RadioItem>}
					{mapFieldsToPlatform['verified_status'].includes(platformType) &&
						<RadioItem onChecked={this.onChange} options={verified_status} name='认证类型' id='verified_status' form={form}></RadioItem>}
					{mapFieldsToPlatform['is_verified'].includes(platformType) &&
						<RadioItem onChecked={this.onChange} options={is_verified_options} name='是否认证' id='is_verified' form={form}></RadioItem>}
					{mapFieldsToPlatform['gender'].includes(platformType) &&
						<RadioItem onChecked={this.onChange} options={genderOptions} name='账号性别' id='gender' form={form}></RadioItem>}
					{mapFieldsToPlatform['media_type'].includes(platformType) &&
						<RadioItem onChecked={this.onChange} options={mediaTypeOptions} name='名人媒体类别' id='media_type' form={form}></RadioItem>}
					{mapFieldsToPlatform['industry_id'].includes(platformType) &&
						<CheckboxItem onChecked={this.onChange} options={industry_list_options} name='账号行业' id='industry_id' form={form}></CheckboxItem>}
					<PriceValid id="sku_price_valid" name="价格有效期" onChange={this.onChange} form={form}></PriceValid>
					<Divider />
					<Row className='more-filter-footer'>
						<Col>
							<Button onClick={this.onCancel}>取消</Button>
							<Button onClick={this.onOk} type='primary'>确定</Button>
						</Col>
					</Row>
				</Form>
			</div >
		);
	}
}
// const MoreFilterForm = Form.create()(MoreFilter);
export default MoreFilter;
