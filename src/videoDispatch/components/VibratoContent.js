import React, { Component } from 'react';
import { Form, Input, Radio, } from 'antd';
import ExplainContents from "../base/ExplainContents";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
//抖音挑战
class VibratoContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			valueRadioGroup: 1
		};
	}
	onChange = (e) => {
		this.setState({ valueRadioGroup: e.target.value })
	}

	//挑战名称校验
	vailChallenge = (rule, value, callback) => {
		if (value.slice(0, 1) !== "#") {
			callback("挑战名称必须以“#”开头");
		} else if (value.length > 14) {
			callback("挑战名称不得超过14个字");
		} else {
			callback();
		}
	}
	onChangeRadio = (value) => {
		this.setState({ valueRadioGroup: value })
	}
	render() {

		const { valueRadioGroup } = this.state;
		const { formItemLayout, getFieldDecorator, videoCampaignInfo } = this.props
		const challengeName = videoCampaignInfo && videoCampaignInfo.challenge_name
		//什么是挑战组件参数
		const dareWhat = {
			title: "什么是挑战?",
			src: require("../img/vibrato-dare.jpg"),
			desc: "挑战是抖音上的话题类别，参加挑战可以让短视频获得更多曝光机会。如下示意，红色框内的为挑战",
		}
		return (
			<div>
				<FormItem {...formItemLayout} label="添加挑战">
					{getFieldDecorator('challenge', {
						initialValue: valueRadioGroup,
						rules: [{
							required: true,
							message: '请输入添加挑战',
						}],
					})(
						//onChange={this.onChange} value={this.state.radioGroupValue}
						<RadioGroup onChange={this.onChange}>
							<Radio value={1}>是</Radio>
							<Radio value={2}>否</Radio>
						</RadioGroup>
					)}
					<ExplainContents content={dareWhat} />
				</FormItem>

				{valueRadioGroup === 1 ? <FormItem {...formItemLayout} label="挑战名称">
					{getFieldDecorator('challenge_name', {
						initialValue: challengeName,
						validateFirst: true,
						rules: [{
							required: true,
							message: '请输入挑战名称',
						}, { validator: this.vailChallenge }],
					})(
						<Input />
					)}
					<div className="prompt-content"> 填写要添加的挑战，格式为“#挑战名称”，挑战名称不得超过14个字；请确认要添加的挑战在抖音中已存在，否则博主有权不添加</div>
				</FormItem> : null}
			</div>
		);
	}
}

export default VibratoContent;
