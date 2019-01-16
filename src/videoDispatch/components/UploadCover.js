import React, { Component } from 'react';
import axios from "axios";
import { Spin, message, Form, Upload, Radio } from "antd";
import ExplainContents from "../base/ExplainContents";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class UploadCover extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//上传封面的信息
			fileList: [],
			//上传封面错误信息提示
			coverErrorMessage: "",
			isLoadingCover: false,
			coverTypeValue: 1
		};
		this.isFirstInitialize = true
	}
	componentWillReceiveProps(nextProps) {
		const { isNeedDefault, videoCampaignInfo, isvideoCampaignInfo } = this.props
		if (isNeedDefault && isvideoCampaignInfo && this.isFirstInitialize) {
			const coverTypeValue = videoCampaignInfo.link ? 1 : 2
			const { campaign_id, link, img_host } = videoCampaignInfo
			let fileList = []
			if (link) {
				fileList = [
					{
						uid: campaign_id,
						name: "封面图",
						url: img_host + link,
						filepath: link
					}
				]
			}
			this.setState({ coverTypeValue, fileList })
			this.setFileLinkValue(link)
			this.isFirstInitialize = false
		}
	}
	//图片上传限制
	beforeUpload = (file) => {
		const isJPG = file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg';
		let errMessage = ""
		if (!isJPG) {
			errMessage = '仅支持jpg、png格式的图片上传'
		}
		const isLt5M = file.size / 1024 / 1024 < 5;
		if (!isLt5M) {
			errMessage = '大小不超过5M'
		}
		this.setState({
			coverErrorMessage: errMessage
		})
		return isLt5M && isJPG;
	}
	//上传图片方法
	uploadImage = (info) => {

		const { uploadToken } = this.props
		const { radioGroupValue } = this.state
		let formData = new window.FormData();
		this.setState({
			coverErrorMessage: "",
			isLoadingCover: true,
		})
		const fileListNow = this.state.fileList
		formData.append("qqfile", info.file);
		formData.append("token", uploadToken.tokens['217']);
		formData.append("from", radioGroupValue);
		//formData.append("web_csrf_token", window.web_csrf_token)
		axios.post(uploadToken.meta.upload_url, formData).then(response => {
			if (response) {
				if (response.data.code == 1000) {
					//设置fileList展示出下载列表
					fileListNow.push({
						uid: fileListNow.length + new Date().getTime(),
						name: "封面图",
						url: response.data.data.url,
						filepath: response.data.data.filepath,
						status: "done"
					})
					this.setState({
						fileList: fileListNow,
						coverErrorMessage: "",
						isLoadingCover: false
					})
					this.setFileLinkValue(response.data.data.filepath)
				} else {
					message.error('文件上传失败')
					this.setState({
						isLoadingCover: false,
						coverErrorMessage: "文件上传失败"
					})
				}
			} else {
				message.error('文件上传失败')
				this.setState({
					isLoadingCover: false,
					coverErrorMessage: "文件上传失败"
				})
			}
		}).catch((e) => {
			message.error('文件上传失败')
		})
	}
	//上传删除图片
	onRemove = (info) => {
		const fileList = [...this.state.fileList.filter((item) => { return item.uid !== info.uid })]
		this.setState({
			fileList: fileList
		})
		this.setFileLinkValue("")
	}
	setFileLinkValue = (link) => {
		this.props.setFieldsValue({
			link: link
		})
	}
	//秒拍是否上传图片
	changeCoverTypeValue = (e) => {
		this.setState({
			coverTypeValue: e.target.value,
		})
		if (e.target.value == 2) {
			this.setState({ fileList: [] })
			this.setFileLinkValue("")
		}
	}
	componentWillUnmount = () => {
		this.setState({ fileList: [], coverErrorMessage: "" })
	}
	render() {
		const { formItemLayout, getFieldDecorator, coverTypeIsFrom, isSecondShot } = this.props
		const { fileList, isLoadingCover, coverErrorMessage, coverTypeValue } = this.state
		//什么是封面组件参数
		const titleWhat = {
			title: "什么是封面?",
			src: require("../img/second-cover-title.jpg"),
			desc: "封面是视频未播放时展示出来的界面，好的封面更容易吸引点击和观看。如下示意，红色框内的为视频封面",
		}
		return (<div>
			<FormItem {...formItemLayout} label={<span className="required-label"><span className="required-red-star">*</span>封面类型</span>} >
				{coverTypeIsFrom ? <RadioGroup value={coverTypeValue} onChange={this.changeCoverTypeValue}>
					<Radio value={1}>上传图片</Radio>
					<Radio value={2}>默认封面（截取视频第一帧）</Radio>
				</RadioGroup> : <span>默认封面（截取视频第一帧）</span>}
				{coverTypeIsFrom ? <ExplainContents content={titleWhat} /> : null}
			</FormItem>
			{coverTypeValue == 1 && isSecondShot ? <FormItem {...formItemLayout} label="设置封面">
				{getFieldDecorator('link', {
					initialValue: fileList && fileList[0] && fileList[0].filepath,
					rules: [{
						required: true,
						message: '请输入',
					}],
				})(
					<Upload
						listType="picture-card"
						fileList={fileList}
						customRequest={this.uploadImage}
						beforeUpload={this.beforeUpload}
						onRemove={this.onRemove}
						accept="image/png,image/jpg,image/jpeg"
						className='upload-video link-uplod'
						disabled={isLoadingCover}
					>
						{fileList.length >= 1 ? null : <Spin spinning={isLoadingCover}>上传</Spin>}
					</Upload>
				)}

				<div className="prompt-content" style={{ color: coverErrorMessage ? "red" : "#999" }}>{coverErrorMessage ? coverErrorMessage : "图片仅支持jpg，png格式，建议宽高为大于420像素，大小不超过5M"}</div>
			</FormItem> : null}
		</div>
		);
	}
}

export default UploadCover;
