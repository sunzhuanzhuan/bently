import React, { Component } from 'react'
import { Button, Form, Popover, Icon } from 'antd';
import { WBYUploadFile } from 'wbyui'
import { uploadAccountMessage } from '../../constants/config'
import './UploadAccountMessage.less'

const FormItem = Form.Item;
class UploadAccountMessage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false
		}
	}
	hide = () => {
		this.setState({
			visible: false
		});
	}

	handleVisibleChange = (visible) => {
		this.setState({ visible });
	}
	render() {
		const formItemLayout = {
			labelCol: { span: 5 },
			wrapperCol: { span: 19 }
		};
		return (
			<div className="main" >
				<FormItem
					{...formItemLayout}
					label="操作"
				>
					{
						this.props.downloadLink.list == "" ?
							null :
							<Button type="primary" href={this.props.downloadLink.list}
								loading={this.props.downloadLink.list == undefined ? true : false}
							>下载模板</Button>
					}
					<div className="upload-box">
						<WBYUploadFile
							tok={{
								token: this.props.uploadInfo.token,
								upload_url: this.props.uploadInfo.upload_uri
							}}
							len={1}
							size={50}
							listType="text"
							uploadText={uploadAccountMessage[this.props.operateKey].uploadBtn}
							onChange={(file) => this.props.upload(file)}
							accept=".xlsx,.xls"
							btnProps={{
								type: 'primary'
							}}
						/>
					</div>
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="操作方法"
				>
					<ul className="option-function">
						<li>1、点击【下载模板】按钮，下载模板</li>
						<li>2、{uploadAccountMessage[this.props.operateKey].tips2}</li>
						<li>3、点击【{uploadAccountMessage[this.props.operateKey].uploadBtn}】按钮，上传填写好的模板</li>
					</ul>
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="提示"
				>
					<ul className="option-function">
						<li>单文件需≤50MB，格式需为xls或xlsx</li>
						{
							this.props.operateKey == "addAccountForOnline" ?
								<li><span>此功能不能将因账号报价、平台所支持业务和粉丝数不足原因下架的账号处理上架，</span>
									<Popover
										content={
											<div style={{ width: '491px', height: '314px', position: 'relative' }}>
												<Icon type="close" theme="outlined"
													onClick={this.hide}
													style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}
												/>
												<img alt="账号上架粉丝数要求、账号上架价格要求"
													style={{ width: '100%' }}
													src={require("../../constants/images/isOnlineTips.png")} />
											</div>
										}
										trigger="click"
										placement="topLeft"
										visible={this.state.visible}
										onVisibleChange={this.handleVisibleChange}
									>
										<a>查看账号上架粉丝数、报价要求</a>
									</Popover>
								</li> : null
						}
					</ul>
				</FormItem>
				<FormItem>
					<Button type="default" className="btn-return"
						onClick={() => this.props.return()}
					>返回首页</Button>
				</FormItem>
			</div>
		)
	}
}
export default UploadAccountMessage
