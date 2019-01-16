import React from "react"
import { Popover, Icon } from 'antd'
import './QRCode.less'

const QRCode = ({ src = 'dd', sns_id = '-', verification_info = "-", introduction = "-" }) => {

	const content = <table className="qr-table">
		<tbody>
			<tr>
				<td rowSpan={4}>
					<img width='110' height='110' style={{ display: 'block' }} src={src} alt="" />
				</td>
				<td className="table-title" width="80">微&nbsp;&nbsp;信&nbsp;&nbsp;号：</td>
				<td>{sns_id}</td>
			</tr>
			<tr>
				<td className="table-title" width="80">功能简介：</td>
				<td>{introduction}</td>
			</tr>
			<tr>
				<td className="table-title" width="80">认证信息：</td>
				<td>{verification_info}</td>
			</tr>
		</tbody>
	</table>
	return <Popover content={content} placement="bottomLeft" trigger="click"
		getPopupContainer={() => document.querySelector('.query-export-tool')}
		overlayStyle={{ width: 620 }}>
		<div className='account-qr-code-wrapper'>
			<Icon type="qrcode" theme="outlined" style={{ color: '#999', fontSize: '14px', marginRight: '6px' }} />
			{sns_id}
		</div>
	</Popover>
}

export default QRCode
