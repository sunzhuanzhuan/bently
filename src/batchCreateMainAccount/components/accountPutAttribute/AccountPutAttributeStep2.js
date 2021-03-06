
import React from 'react'
import { Button, Form, message } from 'antd';
// import { WBYUploadFile } from 'wbyui'
import NewUpload from '../NewUpload'
import '../mainAccountAndmicro/UploadAccountMessage.less'

const FormItem = Form.Item;
export const AccountPutAttributeStep2 = (props) => {
	const formItemLayout = {
		labelCol: { span: 5 },
		wrapperCol: { span: 19 }
	};
	return (
		<div className="main">
			<FormItem
				{...formItemLayout}
				label="操作"
			>
				{
					props.downloadLink == "" ?
						null :
						(
							props.downloadLink == null ?
								message.error("未获取到下载模板，请联系产品经理") :
								<Button type="primary" href={props.downloadLink}
									loading={props.downloadLink == undefined ? true : false}
								>下载模板</Button>
						)
				}
				<div className="upload-box">
					{/* <WBYUploadFile
						tok={{
							token: props.uploadInfo.token,
							upload_url: props.uploadInfo.upload_uri
						}}
						len={1}
						size={50}
						listType="text"
						uploadText="上传账号信息"
						onChange={(file) => props.uploadFile(file)}
						accept=".xlsx,.xls"
						btnProps={{
							type: 'primary'
						}}
					/> */}
					<NewUpload
						tok={props.getNewToken}
						uploadUrl="/api/common-file/file/v1/uploadPriBucket"
						len={1}
						size={50}
						listType="text"
						uploadText="上传账号信息"
						onChange={(file, originFile) => props.uploadFile(file, originFile)}
						accept=".xlsx,.xls"
						btnProps={{
							type: 'primary'
						}}
						bizzCode="B_EXCEL_0004"
					/>
				</div>
			</FormItem>
			<FormItem
				{...formItemLayout}
				label="操作方法"
			>
				<ul className="option-function">
					<li>1、点击【下载模板】按钮，下载模板</li>
					<li>2、按要求将需入库的账号信息填写在模板表格中</li>
					<li>3、点击【上传账号信息】按钮，上传填写好的模板</li>
				</ul>
			</FormItem>
			<FormItem
				{...formItemLayout}
				label="提示"
			>
				<ul className="option-function">
					<li>单文件需≤50MB，格式需为xls或xlsx</li>
				</ul>
			</FormItem>
			<FormItem>
				<Button type="default" className="btn-return"
					onClick={() => props.jumpToTab1()}
				>返回上一步</Button>
			</FormItem>
		</div>
	)
}
