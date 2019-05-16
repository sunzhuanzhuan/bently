import React from 'react'
import { Button } from 'antd';
import { finishMessage } from '../../constants/config'
import './Finish.less'

export const Finish = (props) => {
	return (
		<div className="mainbox">
			<div className="title1">{finishMessage[props.operateKey].tips1}</div>
			<div className="title2">系统处理完成后，会通过邮件通知您。</div>
			<div className="actionbox">
				<Button type="primary"
					onClick={() => props.continueOption()}
				>继续操作</Button>
				<Button type="primary" className="margin-left"
					onClick={() => props.return()}
				>返回首页</Button>
			</div>
		</div>
	)
}
