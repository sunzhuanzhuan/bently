import React, { Component } from 'react';
import { Form, Input, } from 'antd';
import ExplainContents from "../base/ExplainContents";
import { countstrlen } from "../../util/verification";
const FormItem = Form.Item;
const TextArea = Input.TextArea

class SecondShotContent extends Component {
	constructor(props) {
		super(props);

	}
	//描述内容校验
	vailDescription = (rule, value, callback) => {

		if (value) {
			//长度验证
			if (value.length > 200) {
				callback("描述内容不得超过200个字");
			} else {
				callback();
			}
		} else {
			callback();
		}

	}
	render() {
		const { formItemLayout, getFieldDecorator, videoCampaignInfo } = this.props
		//描述内容内容
		const messageWhat = {
			title: "什么是描述内容?",
			src: require("../img/second-message.jpg"),
			desc: "描述内容是对秒拍短视频的介绍信息，如下示意，红色框内的为描述内容",
		}
		return (
			<div>
				<FormItem {...formItemLayout} label="描述内容">
					{getFieldDecorator('note', {
						initialValue: videoCampaignInfo && videoCampaignInfo.note || "",
						validateFirst: true,
						rules: [{
							required: false,
							message: '请输入描述内容',
						}, { validator: this.vailDescription }],
					})(
						<TextArea autosize={{ minRows: 4, maxRows: 4 }} />
					)}
					<div className="prompt-content">
						描述内容不超过200个字，若要添加话题或者@好友，可以“#话题#”<span style={{ color: 'red' }}>(必须为英文输入法下的#符号，否则将不能识别)</span>、“@好友名称”<span style={{ color: 'red' }}>（好友名称后需要留至少一个空格，否则将不能识别）</span>形式添加在描述内容中
						<ExplainContents content={messageWhat} />
					</div>
				</FormItem>
			</div>
		);
	}
}

export default SecondShotContent;
