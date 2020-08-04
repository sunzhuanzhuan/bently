import React, { Component } from 'react';
import { Modal, Col, Row, Input, Icon, Form, Button, Divider, message } from "antd";
import TimingButton from "../TimingButton";
import "./index.less"
import api from "../../../../api";
import debounce from 'lodash/debounce';
const FormItem = Form.Item
class ApplyForExport extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
		};
		this.vailEventCode = debounce(this.vailEventCode, 800);
	}
  sendMessage = () => {
    const { messageInfo } = this.props;
    const params = {
      accountNum: messageInfo.accountNumber
    };
    api.get('/operator-gateway/search/export/branch/sendSms', { params: params}).then((res) =>
      message.success(res.data.message)
    )
  }
	showModal = () => {
		this.setState({
			visible: true,
		});
	}
	handleCancel = () => {
		this.setState({
			visible: false,
		});
	}
	saveCode = () => {
		this.props.form.validateFields((err, values) => {
			if (!err) {
				api.get('/export/account/codeCheck', { params: { ...values, status: 2 } })
				this.props.applyCodeOk(values)
				this.handleCancel()
			}
		});
	}
	vailEventCode = (rule, value, callback) => {
		this.props.codeCheck({ verificationCode: value }).then((res) => {
			if (res.data.checkResult == 1) {
				callback()
			} else {
				callback("请输入正确的审核码")
			}
		})
	}


	render() {
		const { getFieldDecorator, getFieldValue, } = this.props.form;
		const { messageInfo = {} } = this.props
		const { parentName, upLevel } = messageInfo
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 4 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 20 },
			},
		};
		return (
			<span>
				<div className='apply-for-export'>
					<div className='text-message'>
						该报价单账号数量超过{upLevel == 2 ? 200 : null}{upLevel == 3 ? 500 : null}个，须向上级【{upLevel ? "李理" : parentName}】申请，点击立即发送，
						您的上级将收到短信审核码，输入审核码即可导出报价单。
					</div>
					<Row className="export-row">
						<Form >
							<Col span={18} >
								<FormItem label="审核码" {...formItemLayout}>
									{getFieldDecorator('code', {
										validateFirst: true,
										rules: [{ required: true, message: '请输入审核码' }, {
											validator: this.vailEventCode
										}],
									})(
										<Input placeholder="请输入审核码" />
									)}
								</FormItem>

							</Col>
							<Col span={4}>
								<FormItem>
									<TimingButton sendMessage={this.sendMessage} />
								</FormItem>
							</Col>
						</Form>
					</Row>
					<Row className="export-warn">
						<Icon style={{ color: "#FAAD14" }} type="info-circle" theme="outlined" />
						<span style={{ paddingLeft: 3 }}>审核码有效期为24小时。</span>
					</Row>
					<div style={{ textAlign: "right" }}>
						{/* <Divider className="export-dicider" /> */}
						<Button style={{ marginRight: 6 }} onClick={() => this.props.handleCancel()}>取消</Button>
						<Button type="primary" onClick={this.saveCode} disabled={!getFieldValue('code')}>确定</Button>
					</div>
				</div>
			</span>

		);
	}
}
const ApplyForExportForm = Form.create()(ApplyForExport);
export default ApplyForExportForm;
