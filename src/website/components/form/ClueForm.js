import React, { Component } from 'react';
import { Form, Input, DatePicker, Button, Select } from 'antd';
import moment from 'moment';
import apiDownload from "@/api/apiDownloadWebsite";
import Interface from "../../constants/Interface";
import qs from 'qs';

const { RangePicker } = DatePicker;

const FormItem = Form.Item;
const sourceList = [
	{ name: '非外部推广', value: 1 },
	{ name: '外部推广-移动端', value: 2 },
	{ name: '外部推广-非移动端', value: 3 }
]
class ClueForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			forItemLayout: {
				labelCol: { span: 4 },
				wrapperCol: { span: 8 }
			},
			dateFormat: 'YYYY-MM-DD'
		}
	}

	/**
	 * 搜索线索列表
	 * @param e
	 */
	handleSubmit = (e) => {
		const { validateFields } = this.props.form;
		const { changState, actions } = this.props;
		const { dateFormat } = this.state
		e.preventDefault();
		validateFields((err, fieldsValue) => {
			if (err) {
				return
			}

			let queryParams = {
				page: {
					currentPage: 1,
					pageSize: 20
				},
				form: {
					name: fieldsValue.name,
					cellPhone: fieldsValue.cellPhone,
					companyName: fieldsValue.companyName,
					clueSource: fieldsValue.clueSource,
					startCreatedAt: fieldsValue.createdAt && fieldsValue.createdAt.length
						? moment(fieldsValue.createdAt[0]).format(dateFormat) : '',
					endCreatedAt: fieldsValue.createdAt && fieldsValue.createdAt.length
						? moment(fieldsValue.createdAt[1]).format(dateFormat) : ''
				}
			};
			const params = {
				queryParams: { ...queryParams },
				loading: true
			};

			changState(params, () => {
				actions.getWebsiteClueList(queryParams).then(() => {
					changState({ loading: false });
				});
			});

		});

	};

	/**
	 * 导出列表
	 * @param e
	 */
	exportData = (e) => {
		const { queryParams } = this.props;
		e.preventDefault();
		apiDownload({
			url: Interface.exportWebsiteClueList + '?' + qs.stringify(queryParams.form),
			method: 'get'
		}, '导出结果.xlsx')
	}

	render() {
		const {
			getFieldDecorator
		} = this.props.form;
		const {
			formItemLayout,
			dateFormat
		} = this.state
		return <Form layout='inline' onSubmit={this.handleSubmit}>
			<FormItem {...formItemLayout} label="姓名">
				{
					getFieldDecorator('name')(<Input placeholder='请输入' />)
				}
			</FormItem>
			<FormItem {...formItemLayout} label="手机号">
				{
					getFieldDecorator('cellPhone', {
						rules: [{
							pattern: /^[1-9][0-9]{0,10}$/,
							message: '请输入正确的手机号'
						}]
					})(<Input placeholder='请输入' />)
				}
			</FormItem>
			<FormItem label="提交时间">
				{
					getFieldDecorator('createdAt')(
						<RangePicker
							defaultValue={[moment(), moment()]}
							format={dateFormat}
						>
						</RangePicker>
					)
				}
			</FormItem>
			<FormItem {...formItemLayout} label="公司名称">
				{
					getFieldDecorator('companyName')(<Input placeholder='请输入' />)
				}
			</FormItem>
			<FormItem {...formItemLayout} label="线索来源">
				{
					getFieldDecorator('clueSource')(<Select
						style={{ width: 170 }}
						placeholder='请选择'
						allowClear>
						{sourceList.map(one => <Select.Option key={one.value} value={one.value}>{one.name}</Select.Option>)}
					</Select>)
				}
			</FormItem>
			<FormItem>
				<Button type="primary"
					htmlType='submit'
				>搜索</Button>
			</FormItem>
			<FormItem>
				<Button onClick={this.exportData.bind(this)}>导出</Button>
			</FormItem>
		</Form>
	}
}

const CForm = Form.create({})(ClueForm)
export default CForm
