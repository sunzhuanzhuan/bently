/**
 * 修改执行链接弹窗
 * Created by lzb on 2018/11/15.
 */
import React, { Component } from "react"
import { Modal, Table, Input, Button, Form, message } from "antd";
import './style.less'

@Form.create()
export default class ModifyLinkModal extends Component {
	handleSubmit = () => {
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const { data } = this.props
				const { order_id } = data
				let params = {
					order_ids: [order_id],
					execution_results: values['execution_results']
				}
				console.log('Received values of form: ', params);
				this.triggerOnOK(params)
			}
		});
	}
	triggerOnOK = (value) => {
		this.props.onOk && this.props.onOk(value)
	}

	render() {
		const { data } = this.props
		const {
			order_id,
			weibo_name,
			weibo_type_name,
			dispatched_platforms
		} = data
		const header = <header className='sales-audit-manage-modal-header'>
			<div>修改后通过执行链接</div>
			[
			<ul>
				<li>订单ID: {order_id}</li>
				<li>账号名称: {weibo_name}</li>
				<li>平台: {weibo_type_name}</li>
			</ul>
			]
		</header>
		const columns = [{
			title: '投放平台',
			dataIndex: 'weibo_type_name',
			align: 'center'
		}, {
			title: '执行链接',
			dataIndex: 'link_required',
			align: 'center',
			width: 460,
			render: (required, record, index) => {
				return required == 1 ?
					<AutoInput index={index} {...record} {...this.props.form} /> : '-'
			}
		}, {
			title: '添加时间',
			align: 'center',
			dataIndex: 'link_update_time',
			render: (text) => text ? <div>{text}</div> : '-'
		}];
		const { onCancel } = this.props
		return <Modal
			wrapClassName='sales-audit-manage'
			title={header}
			visible={true}
			width={800}
			onCancel={onCancel}
			onOk={this.handleSubmit}
		>
			<Form>
				<Table rowKey={'weibo_type'} pagination={false} columns={columns} dataSource={dispatched_platforms} bordered />
			</Form>
		</Modal>
	}
}

class AutoInput extends Component {
	copyLink = () => {
		const { setFieldsValue, index, converted_link } = this.props
		setFieldsValue({ [`execution_results[${index}]link_for_sale`]: converted_link })
		message.success('已使用此博主链接')
	}
	validatorUrl = (rule, value, callback) => {
		const { link_prefix = ['http://', 'https://'] } = this.props
		if (link_prefix.some(pre => new RegExp('^' + pre).test(value))) return callback()
		callback('请输入正确的执行链接')
	}

	render() {
		const { converted_link, getFieldDecorator, weibo_type, link_for_sale, index } = this.props
		return <div className='input-link-wrap'>
			<Form.Item>
				{getFieldDecorator(`execution_results[${index}]link_for_sale`, {
					initialValue: link_for_sale,
					validateFirst: true,
					rules: [{ required: true, message: '请填写执行链接' }, {
						validator: this.validatorUrl
					}]
				})(<Input />)}
				{converted_link ? <div className='auto-input-source'>
					<span>博主回填链接:</span>
					<a href={converted_link} target='_blank' title={converted_link} className='link-overflow-ellipsis'>{converted_link}</a>
					<Button type='primary' size={'small'} onClick={this.copyLink}>使用此链接</Button>
				</div> : null}
			</Form.Item>
			{getFieldDecorator(`execution_results[${index}]weibo_type`, { initialValue: weibo_type })(
				<input type="hidden" />)}
		</div>
	}
}
