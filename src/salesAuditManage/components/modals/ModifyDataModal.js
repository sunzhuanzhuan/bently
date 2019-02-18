/**
 * 修改执行数据弹窗
 * Created by lzb on 2018/11/16.
 */
import React, { Component } from "react"
import { Modal, Table, InputNumber, Button, Form, message } from "antd";
import { WBYUploadFile } from 'wbyui'
import './style.less'

@Form.create()
export default class ModifyLinkModal extends Component {
	state = {
		result: {}
	}
	handleSubmit = () => {
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const { order_id } = this.state.result
				let params = {
					order_ids: [order_id],
					execution_results: values['execution_results']
				}
				params['execution_results'].forEach(item => {
					item['sale_data_screenshot_path'] = item['sale_data_screenshot_path'].map(file => file.filepath)
				})
				console.log('Received values of form: ', params);
				this.triggerOnOK(params)
			}
		});
	}
	triggerOnOK = (value) => {
		this.props.onOk && this.props.onOk(value)
	}
	validatorImage = (rule, value, callback) => {
		if (value && value.length) {
			return callback()
		}
		callback('请上传数据截图')
	}

	validatorValue = (isProportion) => (rule, value = '', callback) => {
		if (isProportion) {
			let decimal = value.toString().split(".")[1]
			if(decimal && decimal.length > 2){
				callback('仅支持小数点后两位')
			}
			callback()
		} else {
			callback()
		}
	}

	componentWillMount() {
		const { data } = this.props
		const { order_id } = data
		const { ROGetExecutionBackFillDataScreenShot } = this.props.actions
		ROGetExecutionBackFillDataScreenShot({ order_id }).then(({ data }) => {
			this.setState({ result: data })
		})
	}

	render() {
		const { data } = this.props
		const { result: { upload, data: list, image_host } } = this.state
		// dispatched_platforms
		const { order_id, weibo_name, weibo_type_name,dispatched_platforms } = data
		const { getFieldDecorator } = this.props.form
		const header = <header className='sales-audit-manage-modal-header'>
			<div>修改后通过执行数据</div>
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
			dataIndex: 'platform_name',
			align: 'center',
			width: 80
		}, {
			title: '数据截图',
			dataIndex: 'imgs',
			align: 'center',
			width: 400,
			render: (text, record,n) => {
				let { imgs = [] } = record
				let files = imgs.map(filepath => ({
					url: image_host + filepath,
					filepath,
					name: filepath
				}))
				let limit;
				try {
					limit = dispatched_platforms.find(item => item['weibo_type'] === record['platform_id'])['data_limit']
				}catch (e) {
					limit = 10
				}
				return upload && <div className='upload-img-container'>
					<Form.Item extra={`图片大小不超过5M，支持jpg、jpeg、gif、png，最多上传${limit}张`}>
						{getFieldDecorator(`execution_results[${n}]sale_data_screenshot_path`, {
							initialValue: files,
							rules: [{ validator: this.validatorImage }]
						})(
							<WBYUploadFile tok={upload} size={5} accept='.jpg,.jpeg,.gif,.png' len={limit} /* multiple={true}*/ />)}
					</Form.Item>
				</div>
			}
		}, {
			title: '数据',
			align: 'center',
			dataIndex: 'records',
			render: (list, record, n) => {
				return <div className='ant-form-inline upload-data-list'>
					{list.filter(({required}) => required == 1).length ? null : <div style={{textAlign: "center"}}>-</div>}
					{list.map(({ item_id, value, display, type, required },index) => {
						let isProportion = type === 'double'
						let props = isProportion ? {
							max: 100,
							min: -1,
							formatter: value => {
								value = (value >= -1 && value < 0 ) ? -1 : value
								return (value && (value == -1 ? value : `${value}%`))
							},
							parser: value => value.replace('%', '')
						} : {
							min: -1,
							precision: 0
						}
						return <div key={item_id} >
							<Form.Item label=' ' colon={false}>
								<span className='custom-label'>{display}:</span>
								{getFieldDecorator(`execution_results[${n}]record_for_sale[${index}].value`, {
									validateFirst: true,
									initialValue: value,
									rules: [{ required: required == 1, message: `请录入${display}` },
										{ validator: this.validatorValue(isProportion) }]
								})(
									<InputNumber size='small' style={{ width: '80px' }} {...props} />)}
							</Form.Item>
							{getFieldDecorator(`execution_results[${n}]record_for_sale[${index}].id`,{initialValue: item_id,})(
								<input type="hidden" />)}
						</div>
					})}
					{getFieldDecorator(`execution_results[${n}]weibo_type`,{initialValue: record['platform_id'],})(
						<input type="hidden" />)}
				</div>
			}
		}, {
			title: '销售修改时间',
			align: 'center',
			width: 100,
			dataIndex: 'saler_modified_at',
			render: (text) => {
				return <div>{text || '-'}</div>
			}
		}];
		const { onCancel } = this.props
		return <Modal
			wrapClassName='sales-audit-manage'
			title={header}
			visible={true}
			width={860}
			onCancel={onCancel}
			onOk={this.handleSubmit}
		>
			{this.state.result.data ? <Form>
				<Table rowKey='platform_id' pagination={false} columns={columns} dataSource={list} bordered />
			</Form> : 'loading...'}
		</Modal>
	}
}

