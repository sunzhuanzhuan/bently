import React from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	Input,
	Select,
	Radio,
	InputNumber,
	Cascader,
	Checkbox,
	Icon,
	DatePicker
} from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

export class AccountFeature extends React.Component {
	constructor(context, props) {
		super(context, props);
		this.state = {
			visibleForExtarContent: false,
			textCount: 0,
		}
		this.randomKey = 1;
	}
	componentDidMount(){
		const {getRegionCode} = this.props.actions;
		getRegionCode();
	}
	componentWillReceiveProps(nextProps) {
		if ('data' in nextProps && nextProps.data.accountInfo && nextProps.data.accountInfo.verification_info) {
			if (this.randomKey == 1) {
				let verification_info = nextProps.data.accountInfo.verification_info;
				let len = verification_info.length;
				this.setState({
					textCount: len
				}, () => {
					this.randomKey = Math.random()
				})
			}
		}
	}
	handleExtraContent = () => {
		this.setState({
			visibleForExtarContent: !this.state.visibleForExtarContent
		})
	}
	countTextLen = (e) => {
		let str = e.target.value;
		this.setState({
			textCount: str.length
		})
	}
	validaVerificationLen =(rule, value, callback)=>{
		let length = value.length
		if(length>1000){
			callback('认证信息不能超过1000字')
		}else{
		callback();
		}
	}
	render() {
		const {
			getFieldDecorator,
			formItemLayout, data,pid } = this.props;

		const { accountInfo,regionCode,industryListForAccount } = data;
		let { media_type, area_id, gender,
			industry_id, level, verified_status,
			verification_info, weibo_url,
			real_name, support_multi_platform_original_post,
			multi_platform_original_post_tips, snbt,
			true_fans_rate, has_house,
			has_car, has_baby,account_id,user_id,
			is_gender_editable,is_area_id_editable,
			is_level_editable,birth_date,
			catched_at
		} = accountInfo;
		const width = { width: '40%' };
		let { visibleForExtarContent, textCount } = this.state;
		return <div>
			{getFieldDecorator('account_id', {
				initialValue: account_id
			})(
				<input type="hidden" />
			)}
			{getFieldDecorator('user_id', {
				initialValue: user_id
			})(
				<input type="hidden" />
			)}
			{getFieldDecorator('is_gender_editable', {
				initialValue: is_gender_editable
			})(
				<input type="hidden" />
			)}
			{getFieldDecorator('is_area_id_editable', {
				initialValue: is_area_id_editable
			})(
				<input type="hidden" />
			)}
			{getFieldDecorator('is_level_editable', {
				initialValue: is_level_editable
			})(
				<input type="hidden" />
			)}
			{getFieldDecorator('catched_at', {
				initialValue: catched_at
			})(
				<input type="hidden" />
			)}
			<FormItem {...formItemLayout}
				label='账号类型:'
				hasFeedback
			>
				{getFieldDecorator('media_type', {
					// rules: [{ required: true, message: '账号类型不能为空!' }],
					initialValue: media_type
				})(
					<Select style={width}>
						<Option value={3}>未知</Option>
						<Option value={1}>草根</Option>
						<Option value={2}>名人</Option>
						<Option value={4}>媒体</Option>
						<Option value={5}>个人</Option>
					</Select>
				)}
				{<a style={{ float: 'right' }} onClick={this.handleExtraContent}>{!visibleForExtarContent ? <span>展开更多设置<Icon type="down" theme="outlined" /></span> : <span>收起更多设置<Icon type="up" theme="outlined" /></span>} </a>}
			</FormItem>
			{visibleForExtarContent && <div>
				<FormItem {...formItemLayout}
					label='地域:'
				>
					{getFieldDecorator('area_id', {
						rules: [{ required: false, }],
						initialValue: area_id?area_id:[]
					})(
						<Cascader options={regionCode} placeholder="请选择地域！" style={width} />
					)}
				</FormItem>
				<FormItem {...formItemLayout}
					label='性别:'
				>
					{getFieldDecorator('gender', {
						rules: [{ required: false, }],
						initialValue: gender
					})(
						<RadioGroup style={width} disabled={is_gender_editable==1?false:true}>
							<Radio value={3}>未知/其他</Radio>
							<Radio value={1}>男</Radio>
							<Radio value={2}>女</Radio>
						</RadioGroup>
					)}
				</FormItem>
				<FormItem {...formItemLayout}
					label='出生日期:'
				>
					{getFieldDecorator('birth_date', {
						rules: [{ required: false, }],
						initialValue: birth_date ? moment(birth_date, 'YYYY-MM-DD') : null
					})(
						<DatePicker  />
					)}
				</FormItem>
				<FormItem {...formItemLayout}
					label='行业:'
					hasFeedback
				>
					{getFieldDecorator('industry_id', {
						rules: [{ required: false, }],
						initialValue: industry_id?industry_id:undefined
					})(
						<Select placeholder="请输入对应的行业信息!" style={width}>
							{industryListForAccount&&industryListForAccount.map(item=>{
								return <Option key={item.id} value ={item.id}>{item.name}</Option>
							})}
						</Select>
					)}
				</FormItem>

				<FormItem {...formItemLayout}
					label='平台等级:'
				>
					{getFieldDecorator('level', {
						rules: [{ required: false, }],
						initialValue: level
					})(
						<InputNumber min={0} max={1000} disabled={is_level_editable==1?false:true}/>
					)}

				</FormItem>
				<FormItem {...formItemLayout}
					label='是否认证:'
				>
					{getFieldDecorator('verified_status', {
						rules: [{ required: false, }],
						initialValue: verified_status
					})(
						<RadioGroup>
							<Radio value={1}>否</Radio>
							<Radio value={2}>黄V</Radio>
							<Radio value={3}>蓝V</Radio>
							<Radio value={4}>达人</Radio>
							<Radio value={5}>其他</Radio>
						</RadioGroup>
					)}
				</FormItem>
				<FormItem {...formItemLayout}
					label='认证信息:'
				>
					{getFieldDecorator('verification_info', {
						rules: [{ required: false, },{
							validator:this.validaVerificationLen
						}],
						initialValue: verification_info
					})(
						<TextArea placeholder="" autosize={{ minRows: 2, maxRows: 6 }} style={{ width: '70%' }}  onChange={this.countTextLen} />
					)}
					<span style={{position:'absolute',top:'0px',right:'20px'}}><span style={{ color: (textCount > 1000) ? 'red' : 'black' }}>{textCount}</span>/1000</span>
				</FormItem>
				{pid!=1&&<FormItem {...formItemLayout}
					label='新浪微博:'
				>
					{getFieldDecorator('weibo_url', {
						rules: [{ required: false, },{
							pattern: /^htt(p|ps):\/\//,
							message:'新浪微博链接格式不正确，请填写前缀为“http://或https://”的新浪微博链接'
						},{ max: 1024, message: '新浪微博链接最多可输入1024个字符' }],
						initialValue: weibo_url
					})(
						<Input style={width}  />
					)}
				</FormItem>}
				<FormItem {...formItemLayout}
					label='真实姓名:'
				>
					{getFieldDecorator('real_name', {
						rules: [{ required: false, },{
							max:60,message:'真实姓名不能超过60字'
						}],
						initialValue: real_name
					})(
						<Input style={width}  />
					)}
				</FormItem>
				<FormItem {...formItemLayout}
					label='是否多平台原创发布:'
				>
					{getFieldDecorator('support_multi_platform_original_post', {
						rules: [{ required: false, }],
						initialValue: support_multi_platform_original_post
					})(
						<RadioGroup>
							<Radio value={2}>否</Radio>
							<Radio value={1}>是</Radio>
						</RadioGroup>
					)}
				</FormItem>
				<FormItem {...formItemLayout}
					label=' '
					colon={false}
				>
					{getFieldDecorator('multi_platform_original_post_tips', {
						rules: [{ required: false, },{
							max:1000,message:'备注信息不能超过1000字'
						}],
						initialValue: multi_platform_original_post_tips
					})(
						<TextArea placeholder="输入平台名" autosize={{ minRows: 2, maxRows: 6 }} style={width} />
					)}
				</FormItem>
				<FormItem {...formItemLayout}
					label='SNBT:'
				>
					{getFieldDecorator('snbt', {
						rules: [{ required: false, }],

					})(
						<span>{snbt ? snbt : '--'}</span>
					)}
				</FormItem>
				<FormItem {...formItemLayout}
					label='真粉率:'
				>
					{getFieldDecorator('true_fans_rate', {
						rules: [{ required: false, }],
					})(
						<span>{true_fans_rate ? true_fans_rate : '--'}</span>
					)}
				</FormItem>
				<FormItem {...formItemLayout}
					label='家庭状况:'
				>
					<FormItem {...formItemLayout}
						label=' '
						colon={false}
						style={{ display: 'inline-block' }}
					>
						{getFieldDecorator('has_house', {
							rules: [{ required: false, }],
							valuePropName: 'checked',
							initialValue: (has_house == 1 ? true : false)
						})(
							<Checkbox >有房</Checkbox>
						)}
					</FormItem>
					<FormItem {...formItemLayout}
						label=' '
						colon={false}
						style={{ display: 'inline-block' }}
					>
						{getFieldDecorator('has_car', {
							rules: [{ required: false, }],
							valuePropName: 'checked',
							initialValue: (has_car == 1 ? true : false)
						})(
							<Checkbox >有车</Checkbox>
						)}
					</FormItem>
					<FormItem labelCol={{ sm: 0 }}
						label=' '
						colon={false}
						style={{ display: 'inline-block' }}
					>
						{getFieldDecorator('has_baby', {
							rules: [{ required: false, }],
							valuePropName: 'checked',
							initialValue: (has_baby == 1 ? true : false)
						})(
							<Checkbox >有子女</Checkbox>
						)}
					</FormItem>
				</FormItem>
			</div>}
		</div >
	}
}



