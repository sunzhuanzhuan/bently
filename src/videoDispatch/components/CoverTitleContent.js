import React, { Component } from 'react';
import { Form, Input, Radio, } from 'antd';
import ExplainContents from "../base/ExplainContents";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class CoverTitleContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			valueRadioGroup: 1
		};
		this.isFirstInitialize = true
	}
	componentWillReceiveProps(nextProps) {
		const { isNeedDefault, videoCampaignInfo, isvideoCampaignInfo } = this.props
		if (isNeedDefault && isvideoCampaignInfo && this.isFirstInitialize) {
			const valueRadioGroup = videoCampaignInfo.title_content ? 1 : 2
			this.setState({ valueRadioGroup })
			this.isFirstInitialize = false
		}
	}
	onChange = (e) => {
		this.setState({ valueRadioGroup: e.target.value })
		if (e.target.value === 2) {
			this.props.setFieldsValue({
				title_content: null
			})
		}
	}
	//封面标题校验
	vailCoverTitle = (rule, value, callback) => {
		const { coverLengthMin, coverLengthMax } = this.props
		if (value.length > coverLengthMax) {
			callback(`标题内容长度不超过${coverLengthMax}个字`);
		} else if (coverLengthMin > value.length) {
			callback(`标题内容长度不少于${coverLengthMin}个字`);
		}
		else {
			callback();
		}
	}
	render() {

		const { valueRadioGroup } = this.state;
		const { formItemLayout, getFieldDecorator, videoCampaignInfo,
			coverWhat, titlePromptText, coverTypeShow } = this.props

		const coverTitle = videoCampaignInfo && videoCampaignInfo.title_content
		return (
			<div>
				<FormItem {...formItemLayout} label={<span className="required-label"><span className="required-red-star">*</span>标题类型</span>} style={{ display: coverTypeShow ? "block" : "none" }}>
					<RadioGroup onChange={this.onChange} value={valueRadioGroup}>
						<Radio value={1}>指定标题</Radio>
						<Radio value={2}>无标题</Radio>
					</RadioGroup>
					<ExplainContents content={coverWhat} />
				</FormItem>

				{valueRadioGroup === 1 ? <FormItem {...formItemLayout} label="标题内容" >
					{getFieldDecorator('title_content', {
						initialValue: coverTitle,
						validateFirst: true,
						rules: [{
							required: true,
							message: '请填写标题内容',
						}, { validator: this.vailCoverTitle }
						],
					})(
						<Input placeholder="请输入标题内容" />
					)}
					<div className="prompt-content" style={{ float: "left" }}>
						{titlePromptText}
					</div>
					{coverTypeShow ?
						null : <div style={{ float: "left", marginTop: -10 }}>
							<ExplainContents content={coverWhat} />
						</div>}
				</FormItem> : null}
			</div>
		);
	}
}

export default CoverTitleContent;
