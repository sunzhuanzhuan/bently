import React, { Component } from 'react'
import axios from "axios";
//历史证明组件
import HistoricalProof from "../base/HistoricalProof";
import { Button, Upload, message, Form } from "antd";
const FormItem = Form.Item;
class QualificationImg extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//是否展示历史证明
			visbleUploadSqualit: false,
			//历史证明上传集合
			fileListSqualit: [],
			//资质证明集合
			fileListSqualitAll: [],
			//上传封面错误信息提示
			squalitErrorMessage: "",
			//资质证明loading
			isLoadingSqualit: false,
			//历史证明长度
			historicalProofList: [],
		};
		//是否是第一次操作
		this.isFirstInitialize = true
	}
	componentWillReceiveProps(nextProps) {
		const { isNeedDefault, videoCampaignInfo, isvideoCampaignInfo } = this.props
		if (isNeedDefault && isvideoCampaignInfo && this.isFirstInitialize) {
			const { uploadgoodsqualityinput, img_host, } = videoCampaignInfo
			const fileListSqualitNow = uploadgoodsqualityinput.map(((one, index) => {
				return {
					uid: one.img_path + index,
					name: "资质证明图",
					url: img_host + one.img_path,
					filepath: one.img_path
				}
			}))
			this.setState({
				fileListSqualit: fileListSqualitNow,
				fileListSqualitAll: fileListSqualitNow
			})
			this.setUploadgoodsqualityinput(fileListSqualitNow)
			this.isFirstInitialize = false
		}
	}
	//是否显示历史弹窗部门
	isShowUploadSqualit = () => {
		const { visbleUploadSqualit } = this.state
		this.setState({
			visbleUploadSqualit: !visbleUploadSqualit
		})
	}
	onCancelSquailt = () => {
		this.setState({
			visbleUploadSqualit: false
		})
	}
	//设置历史证明的值
	uploadSqualitOk = (value, list) => {
		const { fileListSqualit = [] } = this.state
		const nowList = list.map(one => {
			return {
				uid: "_" + one.img_id,
				name: one.img_file_name,
				url: one.img_path,
				filepath: one.img_file_name,
				status: "done"
			}
		})

		nowList.push(...fileListSqualit)
		this.setState({
			fileListSqualitAll: nowList,
			historicalProofList: list
		})
		this.setUploadgoodsqualityinput(nowList)
		this.isShowUploadSqualit()
	}
	uploadImage = (info) => {
		const isJPG = info.type === 'image/jpg' || info.type === 'image/png' || info.type === 'image/jpeg';
		let errMessage = ""
		if (!isJPG) {
			errMessage = '仅支持jpg、png格式的图片上传'
		}
		const isLt5M = info.size / 1024 / 1024 < 5;
		if (!isLt5M) {
			errMessage = '大小不超过5M'
		}
		this.setState({
			squalitErrorMessage: errMessage
		})
		const { uploadToken, radioGroupValue } = this.props
		const { historicalProofList } = this.state
		let formData = new window.FormData();
		this.setState({
			isLoading: true,
			squalitErrorMessage: "",
			isLoadingSqualit: true,
		})
		const { fileListSqualit } = this.state
		formData.append("qqfile", info.file);
		formData.append("token", uploadToken.tokens['217']);
		formData.append("from", radioGroupValue);
		//formData.append("web_csrf_token", window.web_csrf_token)
		axios.post(uploadToken.meta.upload_url, formData).then(response => {
			if (response) {
				if (response.data.code == 1000) {
					//设置fileList展示出下载列表
					fileListSqualit.push({
						uid: fileListSqualit.length + new Date().getTime(),
						name: "资质证明",
						url: response.data.data.url,
						filepath: response.data.data.filepath,
						status: "done"
					})
					this.setState({
						fileListSqualit: fileListSqualit,
						squalitErrorMessage: "",
						isLoadingSqualit: false
					})

					const fileListSqualitAllNow = []
					const historicalProofListNow = historicalProofList.map(one => {
						return {
							uid: "_" + one.img_id,
							name: one.img_file_name,
							url: one.img_path,
							filepath: one.img_file_name,
							status: "done"
						}
					})
					fileListSqualitAllNow.push(...fileListSqualit, ...historicalProofListNow)
					this.setState({
						fileListSqualitAll: fileListSqualitAllNow
					})
					this.setUploadgoodsqualityinput(fileListSqualitAllNow)

				} else {
					message.error('文件上传失败')
					this.setState({
						isLoadingSqualit: false,
						squalitErrorMessage: "文件上传失败"
					})
				}
			} else {
				message.error('文件上传失败')
				this.setState({
					isLoadingSqualit: false,
					squalitErrorMessage: "文件上传失败"
				})
			}
		}).catch(() => {
			message.error('文件上传失败')
		})
	}
	onRemoveSqualit = (info) => {
		const fileListSqualitAll = [...this.state.fileListSqualitAll.filter((item) => { return item.uid !== info.uid })]
		this.setState({
			fileListSqualitAll,
			fileListSqualit: [...this.state.fileListSqualit.filter((item) => { return item.uid !== info.uid })],
			historicalProofList: [...this.state.historicalProofList.filter((item) => { return `_${item.img_id}` !== info.uid })],
		})
		this.historicalProofNode.handleClick(info.uid)
		this.setUploadgoodsqualityinput(fileListSqualitAll)
	}
	setUploadgoodsqualityinput = (list) => {
		let uploadgoodsqualityinput = ""
		if (list.length > 0) {
			list.map(one => {
				uploadgoodsqualityinput = uploadgoodsqualityinput + one.filepath + ","
			})
			uploadgoodsqualityinput = uploadgoodsqualityinput.slice(0, uploadgoodsqualityinput.length - 1)
		}
		this.props.setFieldsValue({
			uploadgoodsqualityinput
		})
	}
	componentWillUnmount = () => {
		this.setState({
			fileListSqualitAll: [],
			fileListSqualit: [],
			historicalProofList: [],
			squalitErrorMessage: ""
		})
	}
	render() {
		const { visbleUploadSqualit,
			//历史证明上传集合
			fileListSqualit,
			//所有信息
			fileListSqualitAll,
			//上传封面错误信息提示
			squalitErrorMessage,
			//资质证明loading
			isLoadingSqualit,
			//历史证明长度
			historicalProofList, } = this.state
		const { companyId, formItemLayout, videoCampaignInfo, getFieldDecorator } = this.props
		return (
			<FormItem {...formItemLayout} label="资质证明">
				{getFieldDecorator('uploadgoodsqualityinput', {
					initialValue: videoCampaignInfo && videoCampaignInfo.uploadgoodsqualityinput,
				})(
					<div>
						<div>
							<Upload
								listType="picture"
								fileList={fileListSqualit}
								customRequest={this.uploadImage}
								onRemove={this.onRemoveSqualit}
								accept="image/png,image/jpg,image/jpeg"
								className="upload-video"
								showUploadList={false}
								disabled={fileListSqualitAll.length >= 5 || isLoadingSqualit}
							>
								<Button id="video-dispatch-upload-picture-upload-id" loading={isLoadingSqualit}>上传</Button>
							</Upload>
							<Button id="video-dispatch-history-prove" type="primary" onClick={this.isShowUploadSqualit} style={{ marginLeft: 10 }}>使用历史证明</Button>
							<div className="prompt-content">若您本次推广的产品属于个人护理、化妆品类，请上传产品许可证等资质证明</div>
							<Upload
								listType="picture"
								fileList={fileListSqualitAll}
								className="filelist_squalit_all_video"
								onRemove={this.onRemoveSqualit}
							>
							</Upload>
							<div style={{ color: "red" }}> {squalitErrorMessage}</div>
						</div>
						{companyId ? <HistoricalProof
							onCancel={this.onCancelSquailt}
							visible={visbleUploadSqualit}
							onOk={this.uploadSqualitOk}
							length={5 - fileListSqualitAll.length + historicalProofList.length}
							companyId={companyId}
							ref={node => this.historicalProofNode = node} /> : null}
					</div>)}
			</FormItem>
		);
	}
}

export default QualificationImg;
