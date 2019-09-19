import React, { Component } from 'react'
import { Form, Input, Row, Divider, Col, Checkbox, Radio, Button, Select, DatePicker } from "antd";
import SelectAndInput from '../SelectAndInput'
import './index.less'
import {
	dateRangeOptions,
	genderOptions,
	mediaTypeOptions
} from '@/queryExportTool/constants/searchFilter'
import InputArr from "./InputArr";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const isVerifiedOptions = [
	{ name: '不限', value: '' },
	{ name: '是', value: 1 },
	{ name: '否', value: 2 }
]

const RadioItem = ({ id, name, options = [], form, onChecked }) => {
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
	"mainAccountName": [1, 2, 3, 4, 5],
	"introduction": [1, 2, 3, 4, 5],
	"verificationInfo": [1, 2, 3, 4, 5],
	"cooperationTips": [1, 2, 3, 4, 5],
	"trademarkName": [1, 2, 4],
	"hotwordName": [1, 2, 4],
	"latestPublishTime": [1, 2, 3, 4],
	"verifiedStatus": [2],
	"gender": [1, 2, 3],
	"mediaType": [1, 2, 3, 4, 5],
	"industryId": [],
	"isVerified": [3, 4, 5]
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
		console.log("TCL: MoreFilter -> onChange -> id, name, { optionsNames: names }", id, name, { optionsNames: names })
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
		console.log("selectedkeys", selectedkeys)
		const moreFileldKeys = [
			"introduction", "verificationInfo", "cooperationTips",
			"trademarkName", "hotwordName", "skuUnitReadPrice", "skuUnitPlayPrice",
			"latestPublishTime", "verifiedStatus", "isVerified", "gender", "mediaType", "industryId", "skuPriceValid"
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
		const { onChange } = this;
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
		const { unitPlayPriceTypes, unitReadPriceTypes, verified_status, industryListOptions } = filterMore;
		return (
			<div>
				<Row>
					<h4 >关键字</h4>
					{mapFieldsToPlatform['mainAccountName'].includes(platformType) && <Col span={12}>
						<FormItem
							{...formItemLayout}
							label={'主账号名称'}>
							{getFieldDecorator('mainAccountName')(
								<Input placeholder='请输入主账号名称'
									onChange={(e) => onChange('mainAccountName', '主账号名称', { optionsNames: e.target.value })} />
							)}
						</FormItem>
					</Col>}
					{mapFieldsToPlatform['introduction'].includes(platformType) && <Col span={12}>
						<FormItem
							{...formItemLayout}
							label={'账号简介'}>
							{getFieldDecorator('introduction')(
								<InputArr
									onChange={(value) => onChange('introduction', '账号简介', { optionsNames: value })}
									placeholder={'请输入关键词,多个空格隔开'} />
							)}
						</FormItem>
					</Col>}
					{mapFieldsToPlatform['verificationInfo'].includes(platformType) && <Col span={12}>
						<FormItem
							{...formItemLayout}
							label={'认证信息'}>
							{getFieldDecorator('verificationInfo')(
								<InputArr onChange={(value) => onChange('verificationInfo', '认证信息', { optionsNames: value })} placeholder={'请输入关键词,多个空格隔开'} />
							)}
						</FormItem>
					</Col>}
					{mapFieldsToPlatform['cooperationTips'].includes(platformType) && <Col span={12}>
						<FormItem
							{...formItemLayout}
							label={'合作须知'}>
							{getFieldDecorator('cooperationTips')(
								<InputArr onChange={(value) => onChange('cooperationTips', '合作须知', { optionsNames: value })} placeholder={'请输入关键词,多个空格隔开'} />
							)}
						</FormItem>
					</Col>}
					{mapFieldsToPlatform['trademarkName'].includes(platformType) && <Col span={12}>
						<FormItem
							{...formItemLayout}
							label={'提及品牌词'}>
							{getFieldDecorator('trademarkName')(
								<InputArr onChange={(value) => onChange('trademarkName', '提及品牌词', { optionsNames: value })} placeholder={'请输入关键词,多个空格隔开'} />
							)}
						</FormItem>
					</Col>}
					{mapFieldsToPlatform['hotwordName'].includes(platformType) && <Col span={12}>
						<FormItem
							{...formItemLayout}
							label={'图文热词'}>
							{getFieldDecorator('hotwordName')(
								<InputArr onChange={(value) => onChange('hotwordName', '图文热词', { optionsNames: value })} placeholder={'请输入关键词,多个空格隔开'} />
							)}
						</FormItem>
					</Col>}
					<Divider />
				</Row>

				{mapFieldsToPlatform['latestPublishTime'].includes(platformType) &&
					<RadioItem onChecked={onChange} name='最近一次内容发布时间' id='latestPublishTime' options={dateRangeOptions} form={form}></RadioItem>}
				{mapFieldsToPlatform['verifiedStatus'].includes(platformType) &&
					<RadioItem onChecked={onChange} options={verified_status} name='认证类型' id='verifiedStatus' form={form}></RadioItem>}
				{mapFieldsToPlatform['isVerified'].includes(platformType) &&
					<RadioItem onChecked={onChange} options={isVerifiedOptions} name='是否认证' id='isVerified' form={form}></RadioItem>}
				{mapFieldsToPlatform['gender'].includes(platformType) &&
					<RadioItem onChecked={onChange} options={genderOptions} name='账号性别' id='gender' form={form}></RadioItem>}
				{mapFieldsToPlatform['mediaType'].includes(platformType) &&
					<RadioItem onChecked={onChange} options={mediaTypeOptions} name='名人媒体类别' id='mediaType' form={form}></RadioItem>}
				{mapFieldsToPlatform['industryId'].includes(platformType) &&
					<CheckboxItem onChecked={onChange} options={industryListOptions} name='账号行业' id='industryId' form={form}></CheckboxItem>}
				<PriceValid id="skuPriceValid" name="价格有效期" onChange={onChange} form={form}></PriceValid>
				<Divider />
				<Row className='more-filter-footer'>
					<Col>
						<Button onClick={this.onCancel}>取消</Button>
						<Button onClick={this.onOk} type='primary'>确定</Button>
					</Col>
				</Row>
			</div >
		);
	}
}
export default MoreFilter;
