import React, { Component } from 'react'
import { Steps, message, Button, Popover, Icon, Form } from 'antd';
import { OssUpload } from "wbyui";

const FormItem = Form.Item;

const Step = Steps.Step;

export default class UploadProcess extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			visible: false,
			step: 0
		}
		props.actions.getNewToken().then(({ data: authToken }) => {
			this.setState({ authToken })
		})
	}

	hide = () => {
		this.setState({
			visible: false
		});
	}

	upload = ({ file }) => {
		if (file.status === 'done') {
			let value = {
				url: file.url,
				operate_type: this.props.operateKey,
				token: this.props.uploadInfo.token
			}
			this.props.actions.operateBatch(value).then(() => {
				this.setState({
					step: 1
				})
			}).catch(() => {
				message.error("请求失败")
			})
		}
	}
	//继续操作
	continueOption = () => {
		this.setState({
			step: 0
		})
	}

	render() {
		const formItemLayout = {
			labelCol: { span: 5 },
			wrapperCol: { span: 19 }
		};
		return (
			<div className='wby-upload-files-container'>
				<div style={{ width: "80%", margin: '27px auto' }}>
					<Steps current={this.state.step} className="step">
						<Step title='上传账号信息'
							description="上传需要更新的account_id" />
						<Step title="完成" description="账号信息上传成功" />
					</Steps>
				</div>
				{
					this.state.step === 0 ?
						<div className="main">
							<FormItem label="操作" {...formItemLayout}>
								{/*this.props.downloadLink == "" ?
							null :
							(
								this.props.downloadLink == null ?
									message.error("未获取到下载模板，请联系产品经理") :
						)*/}
								<div className='action-btn-wrap'>
									<Button
										style={{ margin: '4px 12px 0 0' }}
										type="primary"
										href={this.props.downloadLink}
									>
										下载模板
									</Button>
									<OssUpload
										onChange={this.upload}
										bizzCode={'FFF_01'}
										authToken={this.state.authToken}
										rule={{
											bizzCode: 'B_EXCEL_0001',
											max: 50,
											suffix: '.xlsx,.xls'
										}}
										tipContent=''
										len={1}
										showUploadList={{
											showPreviewIcon: false,
											showRemoveIcon: false
										}}
									>
										<Button type='primary'>
											<Icon type="upload" /> 上传账号信息
										</Button>
									</OssUpload>
								</div>
							</FormItem>
							<FormItem label="操作方法" {...formItemLayout}>
								<ul className="option-function">
									<li>1、点击【下载模板】按钮，下载模板</li>
									<li>2、按要求将需要处理的账号信息填写在模板中</li>
									<li>3、点击【上传账号信息】按钮，上传填写好的模板</li>
								</ul>
							</FormItem>
							<FormItem label="注意事项" {...formItemLayout}>
								<ul className="option-function">
									<li>1、单文件需≤50MB，格式需为xls或xlsx</li>
									<li>2、 更新内容将添加到白名单中，望周知</li>
								</ul>
							</FormItem>
						</div> :
						<div className="mainbox">
							<div className="title1">上传账号信息成功</div>
							<div className="title2">系统处理完成后，会通过邮件通知您。</div>
							<div className="actionbox">
								<Button type="primary"
									onClick={() => this.continueOption()}
								>我知道了</Button>
							</div>
						</div>
				}
			</div>
		)
	}
}


