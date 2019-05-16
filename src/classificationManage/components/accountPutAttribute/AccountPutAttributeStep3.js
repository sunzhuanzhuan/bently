import React from 'react'
import { Button } from 'antd';
import '../mainAccountAndmicro/Finish.less'

export const AccountPutAttributeStep3 = (props) => {
	return (
		<div className="mainbox">
			<div className="title1">上传账号信息成功！</div>
			<div className="title2">系统处理完成后，会通过邮件通知您。</div>
			<div className="actionbox">
				<Button type="primary"
					onClick={() => props.jumpToTab1()}
				>继续操作</Button>
				<Button type="primary" className="margin-left"
					onClick={() => props.return()}
				>返回首页</Button>
			</div>
		</div>
	)
}
