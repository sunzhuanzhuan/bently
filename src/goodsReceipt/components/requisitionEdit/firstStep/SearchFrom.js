import React, { Component } from 'react'
import { Form, Input, Select, Button, Modal } from "antd";
import "./SearchFrom.less"
import SearchCount from "./SearchCount";
import selectMap from "../../../constants/SelectMap";
import qs from 'qs'
const FormItem = Form.Item
const Option = Select.Option;
const { TextArea } = Input;
class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			notFoundList: [],//为查询到的数据
			searchIds: ""
		};
	}

	searchClick = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			const { actions: { getPoItemList, addSelectedOrderList }, tableType, isShowAccountName = true } = this.props
			const gr_id = qs.parse(window.location.search.slice(1)).gr_id
			if (!err) {
				if (isShowAccountName) {
					values.order_ids = (values.order_ids && values.order_ids.split(/[\n]/) || []).filter(one => one).join(",")
				} else {
					values.business_ids = (values.business_ids && values.business_ids.split(/[\n]/) || []).filter(one => one).join(",")
				}
				const allValue = {
					...values,
					item_list_type: tableType,
					gr_id: gr_id
				}
				this.props.setLoading(true)
				getPoItemList(allValue).then((res) => {
					this.props.setLoading()
					//未输入ID则不展示弹窗
					if (values.order_ids || values.business_ids) {
						this.setState({
							visible: true,
							notFoundList: res.data.not_found_order_ids,
							searchIds: isShowAccountName ? values.order_ids : values.business_ids
						})
					}

				})

			}
		});
	}
	getListArr = (items, key) => {
		const arr = []
		for (var i = 0; i < items.length; i++) {
			if (items[i].is_selected == 1) {
				arr.push(items[i][key])
			}
		}
		return arr
	}
	render() {
		const { form, isShowAccountName = true, } = this.props
		const { getFieldDecorator, resetFields } = form;
		const formItemLayout1 = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 4 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 20 },
			},
		};
		const formItemLayout2 = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 2 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 22 },
			},
		};
		return (
			<div className="first-search">
				<Form className="login-form">
					<div className="top-form-flex">
						{isShowAccountName ? <div >
							<FormItem
								label="账号名称"
								{...formItemLayout1}
							>
								{getFieldDecorator('account_name', {
									// rules: [{ required: true, message: 'Please input your username!' }],
								})(
									<Input placeholder="请输入账号名称" />
								)}
							</FormItem>
						</div> : null}
						<div >
							<FormItem
								label="GR申请状态"
								{...formItemLayout1}
							>
								{getFieldDecorator('gr_order_status', {
									initialValue: "1"
								})(
									<Select >
										{selectMap.applyStateGRArr.map((one, index) => <Option key={one.value} value={one.value}>{one.name}</Option>)}
									</Select>
								)}
							</FormItem>
						</div>
					</div>
					{isShowAccountName ? <div>
						<FormItem
							label="订单ID"
							{...formItemLayout2}>

							{getFieldDecorator('order_ids', {
							})(
								<TextArea rows={3} placeholder="请输入订单ID，一行一个" onChange={this.onChangeOrderId} />
							)}
						</FormItem>
					</div> : <div>
							<FormItem
								label="活动ID"
								{...formItemLayout2}>

								{getFieldDecorator('business_ids', {
								})(
									<TextArea rows={3} placeholder="请输入活动ID，一行一个" onChange={this.onChangeOrderId} />
								)}
							</FormItem>
						</div>}
					<div className="form-footer">
						<Button onClick={() => resetFields()}>清空</Button>
						<Button type="primary" onClick={this.searchClick} style={{ marginLeft: 20 }}>查询</Button>
					</div>
					<Modal
						footer={false}
						visible={this.state.visible}
						onCancel={() => { this.setState({ visible: false }) }}
						onOk={() => { this.setState({ visible: false }) }}
					>
						<SearchCount onCancel={() => { this.setState({ visible: false }) }} list={this.state.notFoundList} searchIds={this.state.searchIds} />
					</Modal>
				</Form>
			</div>
		);
	}
}
const SearchFrom = Form.create()(Search);
export default SearchFrom;
