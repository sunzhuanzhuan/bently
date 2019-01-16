import React, { Component } from 'react';
import { Form, Radio, } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class VideoTypeForm extends Component {
	render() {
		const { formItemLayout, getFieldDecorator, isNeedDefault, videoTypeContent, videoTypeContentNow, onChange, videoCampaignInfo } = this.props
		return (
			<div>
				<FormItem {...formItemLayout} label="公司简称">
					{videoCampaignInfo && videoCampaignInfo.company_name}
				</FormItem>

				<FormItem {...formItemLayout} label="平台">
					{getFieldDecorator('weibo_type', {
						initialValue: videoCampaignInfo && videoCampaignInfo.weibo_type || 25,
						rules: [{
							required: true,
							message: '请输入',
						}],
					})(
						isNeedDefault ? <span>{videoTypeContentNow.type}</span> : <RadioGroup onChange={onChange} >
							{videoTypeContent.map(one => <Radio key={one.id} value={one.id}>{one.type}</Radio>)}
						</RadioGroup>
					)}
				</FormItem>
			</div>
		);
	}
}

export default VideoTypeForm;
