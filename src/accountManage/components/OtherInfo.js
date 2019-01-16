import React from 'react';
import {
	Form,
	Input,
	Button,
	Card,
	Row,
	Col,
	Tooltip,
	Rate,
} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;


export class OtherInfo extends React.Component {
	constructor(context, props) {
		super(context, props);
		this.state = {
			visibleForCard: false,
			coExampleCards: [],
			visibleForButton: false
		}
	}
	render() {
		const {
			getFieldDecorator,
			formItemLayout, data ,pid} = this.props;
		const { accountInfo } = data;
		let { account_grade, media_team_note, account_id,user_id,is_low_quality,low_quality_reason  } = accountInfo;
		const toolTipsTitle = <span>{low_quality_reason}</span>
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
			{pid==9&&<FormItem {...formItemLayout}
				label='是否劣等号'
			>
				<Row>
					<Col span={6}>
						{getFieldDecorator('is_low_quality', {
							rules: [{ required: false, }],
						})(
							<div>
							{is_low_quality&&is_low_quality==1&&<Tooltip title={toolTipsTitle}>
								<span>是</span>
							</Tooltip>}
							{is_low_quality&&is_low_quality==2&&<span>否</span>}
							</div>
						)}
					</Col>
					{/* <Col span={6} offset={2}>
						<span title="账号等级">账号等级：</span>
						{getFieldDecorator('account_grade', {
							rules: [{ required: false, }],
							initialValue: account_grade
						})(
							<Rate disabled={true}  />
						)}
					</Col> */}
				</Row>
			</FormItem>}
			<FormItem {...formItemLayout}
				label='媒介备注:'
			>
				{getFieldDecorator('media_team_note', {
					rules: [{ required: false, },
					{max:1000,message:'媒介备注不能超过1000字' },
					],
					initialValue: media_team_note
				})(
					<TextArea style={{ width: '40%' }} />
				)}
			</FormItem>
		</div >
	}
}



