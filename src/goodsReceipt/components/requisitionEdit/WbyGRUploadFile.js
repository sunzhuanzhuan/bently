import React, { Component } from 'react'
import { WBYUploadFile } from 'wbyui'
import "./WbyGRUploadFile.less"

const imgType = ".gif,.png,.bmp,.jpg,.jpeg,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.pdf,.zip,.eml"

class WbyGRUploadFile extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	onChangeFile = (filelist) => {
		const commonAttachments = filelist.map(one => ({
			name: one.name,
			file_path: one.filepath
		}))
		this.props.changeFile(commonAttachments, filelist)
	}
	render() {
		const { uploadToken = {}, fileList, textTop } = this.props
		const messageText = 'gif，png，bmp，jpg，jpeg，doc，docx，ppt，pptx，xls，xlsx，pdf，zip，eml 文件格式上传，单附件≤50MB，最多上传10个附件'
		return (
			uploadToken.upload_token ? <div className="wby-gr-upload-file">
				{fileList.length < 10 ? null : <div style={{ paddingBottom: 3 }}>
					{messageText}
				</div>}
				<WBYUploadFile
					tok={{
						token: uploadToken.upload_token,
						upload_url: uploadToken.upload_url
					}}
					listType="text"
					multiple={true}
					size={50}
					len={10}
					uploadText="上传文件"
					accept={imgType}
					beforeUpload={this.beforeUpload}
					onPreview={this.handlePreview}
					onChange={this.onChangeFile}
					value={fileList}
					className="wby-gr-upload-file-item">
				</WBYUploadFile>
				{fileList.length < 10 ? <div className="text-message" style={{ top: textTop }}>
					{messageText}
				</div> : null}
			</div> : null
		);
	}
}

export default WbyGRUploadFile;
