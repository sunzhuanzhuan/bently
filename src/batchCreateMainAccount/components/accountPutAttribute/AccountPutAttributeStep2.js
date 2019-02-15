
import React from 'react'
import { Button, Form } from 'antd';
import { WBYUploadFile } from 'wbyui'
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
					props.downloadLink.list == "" ?
						null :
						<Button type="primary" href={props.downloadLink.list}
							loading={props.downloadLink.list == undefined ? true : false}
						>下载模板</Button>
				}
				<div className="upload-box">
					<WBYUploadFile
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
