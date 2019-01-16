import React, { Component } from "react"
import { Table, Form, Button, Input } from 'antd'
import ValueFormat from "../base/ValueFormat";
import SimpleTables from "@/queryExportTool/base/SimpleTables";
import FansCount from "@/queryExportTool/components/fansCount";
import MoreFilter from "../components/accountList/SearchFrom/MoreFilter";
import MainItem from "@/queryExportTool/components/accountList/MainItem";
import SearchBaseFrom from "../components/accountList/SearchFrom/SearchBaseFrom";
import ApplyForExport from "../components/common/ApplyForExport";
import TimingButton from "../components/common/TimingButton";
import { NowNoFind } from "../components/common/NoFind";
import { FilterCommon, SelectAndInput, TreeTransfer, WBYSelect, ItemLable, SelectMenu } from '../components/index'
import InputAndSlider from "@/queryExportTool/components/accountList/SearchFrom/InputAndSlider";
import PriceInput from './PriceInput'
import categoryData from './testData/categoryData'
import CInputNumber from "@/queryExportTool/base/CInputNumber";
const FormItem = Form.Item;
class Test extends Component {
	onSubmit = () => {
		const { form } = this.props;
		const allFields = form.getFieldsValue();
		console.log("allFields", allFields)
	}
	handleChangeForFilterMain = ({ optionsValues, optionsNames }) => {
		console.log("{ optionsValues, optionsNames }", optionsValues, optionsNames);
		const { form } = this.props;
		const allFields = form.getFieldsValue();
		console.log("handleChangeForFilterMain", allFields)
	}
	resetFields = () => {
		this.props.form.resetFields();
	}
	onSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, fieldsValue) => {
			if (!err) {
				console.log(fieldsValue);
			}
		})
	}
	onClickOk = (id, name, { optionsNames: names }) => {
		console.log("onClickOk", id, name, names)
	}
	render() {
		const { getFieldDecorator, resetFields, setFieldsValue } = this.props.form
		return (
			<div>
				{/* <NowNoFind /> */}

				<Form onSubmit={this.handleSubmit}>
					<InputAndSlider unit={"元"}
						id='price'
						sliderMin={200} sliderMax={100000}
						isShowSelect={false}
						selectList={[]} />

					<FormItem label="Price">
						{getFieldDecorator("price", {
							// initialValue: {}
						})(<PriceInput />)}
					</FormItem>
					{/* <FormItem label="Price">
						{getFieldDecorator("category", {
							initialValue: ["3003"]
						})(<ItemLable id='operation_tag'
							tagsArray={categoryData}
							onChange={this.handleChangeForFilterMain}
						/>)}
					</FormItem>
					<FormItem label="Price">
						{getFieldDecorator("category2", {
							initialValue: {

								weight: [0, 100]
							}
						})(<SelectAndInput id='operation_tag'
							tagsArray={categoryData}
							showType={"three"}
							options={[{
								"name": "0-18岁",
								"value": "0-18"
							}, {
								"name": "19-24岁",
								"value": "19-24"
							}, {
								"name": "25-34岁",
								"value": "25-34"
							}]}
							onOkClick={this.handleChangeForFilterMain}
						/>)}

					</FormItem>
					<div>
						<FormItem label="Price">
							{getFieldDecorator("abc", {
								initialValue: '19-24'
							})(<SelectMenu id='operation_tag'
								showType={"three"}
								options={[{
									"name": "0-18岁",
									"value": "0-18"
								}, {
									"name": "19-24岁",
									"value": "19-24"
								}, {
									"name": "25-34岁",
									"value": "25-34"
								}]}
								onOkClick={this.handleChangeForFilterMain}
							/>)}

						</FormItem>
					</div>
					<div>
						<h4>参考报价</h4>
						<FormItem>
							{getFieldDecorator('range', {
								initialValue: {}
							})(
								<InputAndLable isShowSelect={true} selectList={[{
									"name": "0-18岁",
									"value": "0-18"
								}, {
									"name": "19-24岁",
									"value": "19-24"
								}, {
									"name": "25-34岁",
									"value": "25-34"
								}]} sliderMin={0} sliderMax={200} value={[1, 100]} unit='万' onChange={e => console.log(e, '+++++')} />)}
						</FormItem>
					</div>
					<div>
						<h4>账号地域</h4>
						<FormItem>
							{getFieldDecorator('range', {
								initialValue: []
							})(
								<TreeTransfer
									name='账号地域'
									onClickCancel={() => console.log("隐藏")}
									onClickOk={this.onClickOk}
									options={default_hot_cities.map(item => ({
										key: String(item.area_id),
										title: item.area_name
									}))}
								/>)}
						</FormItem>
					</div> */}
					<FormItem label="Price">
						{getFieldDecorator("ccc", {
							initialValue: 12
						})(<CInputNumber />)}
					</FormItem>
					{/*<CInputNumber/>*/}
					<FormItem>
						<Input onChange={e => { setFieldsValue({ range: [0, e.target.value] }) }} />
						<Button onClick={this.onSubmit}>提交</Button>
						<Button onClick={() => resetFields()}>重置</Button>
						<Button type="primary" onClick={this.onSubmit} htmlType="submit">Submit</Button>
						<Button type="primary" onClick={this.resetFields} htmlType="submit">resetFields</Button>
					</FormItem>
				</Form>
			</div>
		)
	}
}

export default Form.create()(Test);

const treeData = [
	{
		title: '北京',
		key: '1',
	},
	{
		title: '天津',
		key: '2',
	},
	{
		title: '河北省',
		key: '河北省',
		children: [
			{ title: "石家庄市", key: '石家庄市' },
			{ title: "唐山市", key: '唐山市"' },
			{ title: "秦皇岛市", key: '秦皇岛市' },
			{ title: "邯郸市", key: '邯郸市' },
			{ title: "邢台市", key: '邢台市' },
			{ title: "保定市", key: '保定市' },
			{ title: "张家口市", key: '张家口市' },
			{ title: "承德市", key: '承德市' },
			{ title: "沧州市", key: '沧州市' },
			{ title: "廊坊市", key: '廊坊市' }]
	}, {
		title: '山西省',
		key: '山西省',
		children: [

			{ title: "太原市", key: '太原市' },
			{ title: "大同市", key: '大同市' },
			{ title: "阳泉市", key: '阳泉市' },
			{ title: "长治市", key: '长治市' },
			{ title: "晋城市", key: '晋城市' },
			{ title: "朔州市", key: '朔州市' },
			{ title: "晋中市", key: '晋中市' },
			{ title: "运城市", key: '运城市' },
			{ title: "忻州市", key: '忻州市' },
			{ title: "临汾市", key: '临汾市' },
			{ title: "吕梁市", key: '吕梁市' }]
	},]
const hotCityList = [
	{ key: "1", title: "北京" },
	{ key: "沧州市", title: "沧州市" },
	{ key: "秦皇岛市", title: "秦皇岛市" },
	{ key: "大同市", title: "大同市" },
	{ key: "2", title: "天津" },
]
const default_hot_cities = [{
	"area_id": 1010101,
	"area_name": "北京",
	"area_level": 3,
	"parent_id": "10101"
},
{
	"area_id": 1010308,
	"area_name": "厦门",
	"area_level": 3,
	"parent_id": "10103"
},
{
	"area_id": 1010501,
	"area_name": "广州",
	"area_level": 3,
	"parent_id": "10105"
},
{
	"area_id": 1010502,
	"area_name": "深圳",
	"area_level": 3,
	"parent_id": "10105"
},
{
	"area_id": 1011201,
	"area_name": "武汉",
	"area_level": 3,
	"parent_id": "10112"
},
{
	"area_id": 1011501,
	"area_name": "南京",
	"area_level": 3,
	"parent_id": "10115"
},
{
	"area_id": 1012401,
	"area_name": "上海",
	"area_level": 3,
	"parent_id": "10124"
},
{
	"area_id": 1012501,
	"area_name": "成都",
	"area_level": 3,
	"parent_id": "10125"
},
{
	"area_id": 1013001,
	"area_name": "杭州",
	"area_level": 3,
	"parent_id": "10130"
},
{
	"area_id": 1013101,
	"area_name": "重庆",
	"area_level": 3,
	"parent_id": "10131"
}
]



