import React from 'react'
import { Icon, Button, Input, Row, Form, Select, DatePicker, message } from "antd";
import qs from 'qs';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const FormItem = Form.Item;
const Option = Select.Option;
const dataFormat = 'YYYY-MM-DD'

class AdjustQuery extends React.Component {
	constructor() {
		super();
		this.state = {
		}
	}
	componentDidMount() {
		const search = qs.parse(this.props.location.search.substring(1));
		let obj = {};
		let keys = search.keys || {};
		let labels = search.labels ? Object.keys(search.labels) : [];
		labels.length > 0 ? labels.forEach(item => {
			obj[item] = { key: search.keys[item], label: search.labels[item] }
		}) : null;
		for (let key in keys) {
			if (key === 'start_time' || key === 'end_time') {
				obj[key] = moment(keys[key], dataFormat);
			}
		}
		this.props.form.setFieldsValue({ ...keys, ...obj });
	}
	handleSearch = (e) => {
		const { questAction, pageSize } = this.props;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				let keys = {}, labels = {};
				for (let key in values) {
					if (Object.prototype.toString.call(values[key]) === '[object Object]') {
						if (values[key].key) {
							keys[key] = values[key].key;
							labels[key] = values[key].label;
						}
					} else {
						keys[key] = values[key]
					}
				}
				values['start_time'] ? keys['start_time'] = values['start_time'].format(dataFormat) : null;
				values['end_time'] ? keys['end_time'] = values['end_time'].format(dataFormat) : null;
				let params = {
					keys: { ...keys },
					labels: { ...labels }
				};
				Object.keys(params['keys']).forEach(item => { !params['keys'][item] && params['keys'][item] !== 0 ? delete params['keys'][item] : null });
				const hide = message.loading('查询中，请稍候...');
				questAction({ ...params.keys, page: 1, page_size: pageSize }).then(() => {
					this.props.history.replace({
						pathname: '/golden/adjustApply',
						search: `?${qs.stringify(params)}`,
					})
					hide();
				}).catch(({ errorMsg }) => {
					message.error(errorMsg || '查询失败');
					hide();
				});
			}
		});
	}
	handleClear = () => {
		this.props.form.resetFields();
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const { flag, btnFlag, userList } = this.props;
		const { application_status = [] } = this.props.children;
		return <Form className='adjust-stat'>
			<Row type="flex" justify="start" gutter={16}>
				<FormItem label='申请编号' className='left-gap'>
					{getFieldDecorator('readjust_application_id', { initialValue: '' })(
						<Input placeholder="请输入" />
					)}
				</FormItem>
				<FormItem label='申请人' className='left-gap'>
					{getFieldDecorator('apply_admin_id', { initialValue: { key: '', label: '不限' } })(
						<Select style={{ width: 160 }}
							placeholder="不限"
							allowClear
							showSearch
							labelInValue
							filterOption={(input, option) => (
								option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							)}
						>
							<Option value="">不限</Option>
							{userList.map((item) =>
								<Option key={item.user_id} value={item.user_id}>{item.real_name}</Option>)
							}
						</Select>
					)}
				</FormItem>
				<FormItem label='申请状态' className='left-gap'>
					{getFieldDecorator('status', { initialValue: { key: '', label: '不限' } })(
						<Select style={{ width: 160 }}
							labelInValue>
							<Option value="">不限</Option>
							{application_status.map((item) =>
								<Option key={item.id} value={item.id}>{item.display}</Option>)
							}
						</Select>
					)}
				</FormItem>
			</Row>
			<Row type="flex" justify="start" gutter={16}>
				<FormItem label="申请时间" className='left-gap'>
					{getFieldDecorator('start_time')(
						<DatePicker format={dataFormat} placeholder='开始日期' style={{ width: 150 }} />
					)}
					~
						{getFieldDecorator('end_time')(
						<DatePicker format={dataFormat} placeholder='结束日期' style={{ width: 150 }} />
					)}
				</FormItem>
				<FormItem className='left-gap'>
					<Button type="primary" onClick={this.handleSearch}>查询</Button>
					{flag ? <Button type='primary' className='left-gap' href='/golden/adjustApplyInput'
					>导入</Button> : null}
					{btnFlag ? <Button className='left-gap' type="primary"
						href={`/golden/addAdjustApply?${qs.stringify({ keys: { page_size: 50 } })}`}
						target='_blank'
					>添加申请</Button> : null}
					<a className="reset-filter left-gap" onClick={this.handleClear}><Icon type="retweet" />重置搜索框</a>
				</FormItem>
			</Row>
		</Form >
	}
}

export default Form.create()(AdjustQuery);
