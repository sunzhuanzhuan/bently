import React, { Component } from 'react'
import { Form, Select, Button, Icon } from 'antd';
const Option = Select.Option;
class DisableDefault extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	onDisableDefault = (e) => {
		e.preventDefault();
		const { form, onDefault } = this.props
		form.validateFields((err, values) => {
			if (!err) {
				//保存
				onDefault(values.id)
			}
		});
	}

	render() {
		const { setShowModal, form, list = [] } = this.props
		const { getFieldDecorator } = form
		return (
			<Form layout="inline">
				<Tips text='该下单平台为默认报价项，请选择停用后设置为默认报价项的下单平台后，再停用该下单平台！' />
				<div style={{ height: 60, marginTop: 10 }}>
					<Form.Item label="请选择下单平台">
						{getFieldDecorator('id', {
							rules: [
								{ required: true, message: '请选择下单平台' },
							]
						})(
							<Select placeholder="请选择" style={{ width: 320 }}>
								{list.map(one => <Option key={one.id} value={one.id}>{one.cooperationPlatformName}</Option>)}
							</Select>
						)}
					</Form.Item>
				</div>
				<div style={{ textAlign: "right" }}>
					<Button onClick={() => setShowModal(false, null)}>取消</Button>
					<Button type="primary" onClick={this.onDisableDefault} style={{ margin: "0px 20px" }}>继续</Button>
				</div>
			</Form>
		);
	}
}
export const Tips = ({ text }) => {
	return <div >
		<div style={{ fontSize: 16, fontWeight: 500 }}>
			<Icon type="exclamation-circle" style={{ color: '#faad14', padding: '2px 14px 0px 0px' }} />
			<span style={{ color: '#000' }}>温馨提示</span>
		</div>
		{text}
	</div>
}
const DisableDefaultFrom = Form.create()(DisableDefault);

export default DisableDefaultFrom;
