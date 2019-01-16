import React, { Component } from 'react';
import { Form, Input, Radio } from 'antd';
import { WBYUploadFile } from 'wbyui'
import GenderPercent from './GenderPercent'
import TopCity from "./TopCity";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const checkGenderRadio = (rule, value, callback) => {
	if((value[0] + value[1]) > 100){
		callback('男女性别分布比例之和不能超过100%')
	}
	callback()
}

export default class AudiencePortrait extends Component {
	render() {
		const {
			getFieldDecorator, formItemLayout, children, data: { accountInfo }
		} = this.props
		const {
			audience_gender_distribution_verification_status,
			audience_gender_male_ratio = 0.5,
			audience_gender_female_ratio = 0.5,
			audience_city_distribution_sceenshot_url,
			audience_city_top1,
			audience_city_top2,
			audience_city_top3,
			token = {}
		} = accountInfo
		const {upload_token,upload_url} = token
		return <div>
			<FormItem {...formItemLayout} label='性别分布认证'>
				{getFieldDecorator('audience_gender_distribution_verification_status', {
					initialValue: audience_gender_distribution_verification_status || 2
				})(
					<RadioGroup>
						<Radio value={1}>是</Radio>
						<Radio value={2}>否</Radio>
					</RadioGroup>
				)}
			</FormItem>
			<FormItem {...formItemLayout} label='性别分布'>
				{getFieldDecorator('gender_radio', {
					initialValue: [parseInt(audience_gender_male_ratio * 10000) / 100, parseInt(audience_gender_female_ratio * 10000) / 100],
					first: true,
					rules: [{validator: checkGenderRadio}]
				})(<GenderPercent />)}
			</FormItem>
			<FormItem {...formItemLayout} label='城市分布截图'>
				<div className='clearfix'>
					{getFieldDecorator('city_url', {
						initialValue: audience_city_distribution_sceenshot_url ? [{
							name: audience_city_distribution_sceenshot_url,
							url: audience_city_distribution_sceenshot_url,
							filepath: audience_city_distribution_sceenshot_url
						}] : []
					})(
						<WBYUploadFile tok={{
							token: upload_token,
							upload_url: upload_url
						}} accept={'.bmp, .gif, image/jpeg'} uploadText={'点击上传'} size={5} />
					)}
				</div>
				<p className='input-desc-bottom'>请上传bmp, jpeg, jpg, gif;5M以内的图片</p>
			</FormItem>
			<FormItem {...formItemLayout} label='粉丝城市分布'>
				<div>
					{getFieldDecorator('city_radio', {
						initialValue: [audience_city_top1,audience_city_top2,audience_city_top3]
					})(<TopCity />)}
					<p className='input-desc-bottom'>建议选择前三名城市</p>
				</div>
			</FormItem>
			{children}
		</div>
	}
}
