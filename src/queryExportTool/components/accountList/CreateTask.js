import React, { Component } from 'react';
import { Form, Input, Button } from "antd";
import { countstrlen } from "../../../util/verification";
const FormItem = Form.Item;
class createTask extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	onExport = () => {
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.props.onExportOperate(values)
			}
		});
	}
	vailAccoutName = (rule, value, callback) => {
		if (value) {
			const parent = /^[a-zA-Z0-9_\u4e00-\u9fa5 -]+$/
			if (parent.test(value)) {
				if (countstrlen(value) > 60) {
					callback('名称长度不能超过30个字')
				} else {
					callback()
				}
			} else {
				callback(`只能输入汉字、字母、数字、空格、“-”或“_”以上六项组合`)
			}
		} else {
			callback()
		}
	}
	render() {
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 6 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 },
			},
		};
		const { getFieldDecorator, getFieldError } = this.props.form;
		return (
			<div>
				<Form >
					<FormItem  {...formItemLayout}
						label="文件名称"
						style={{ marginTop: 20 }}
						{...(getFieldError('name') ? {} : { help: "请输入名称，不超过30个字" })}
					>
						{getFieldDecorator('name', {
							rules: [
								{ required: true, message: '请输入名称' },
								{ validator: this.vailAccoutName }]
						})(
							<Input placeholder="请输入文件名称" />
						)}

					</FormItem>
					<FormItem style={{ textAlign: "center", paddingBottom: 20, marginTop: 20 }}>
						<Button
							type="primary"
							onClick={this.onExport}
							loading={this.props.buttonLoaing}
						>
							导出至下载中心
						</Button>
					</FormItem>
				</Form>
			</div>
		);
	}
}
const createTaskForm = Form.create()(createTask);
export default createTaskForm;
