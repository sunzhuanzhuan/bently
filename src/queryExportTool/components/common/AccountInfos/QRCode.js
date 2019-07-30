import React from "react"
import { Popover, Icon } from 'antd'
import './QRCode.less'

const QRCode = ({ src = 'dd', snsId = '-', verificationInfo = "-", introduction = "-" }) => {

	const content = <table className="qr-table">
		<tbody>
			<tr>
				<td rowSpan={4}>
					<img width='110' height='110' style={{ display: 'block' }} src={src} alt="" />
				</td>
				<td className="table-title" width="80">微&nbsp;&nbsp;信&nbsp;&nbsp;号：</td>
				<td>{snsId}</td>
			</tr>
			<tr>
				<td className="table-title" width="80">功能简介：</td>
				<td>{introduction}</td>
			</tr>
			<tr>
				<td className="table-title" width="80">认证信息：</td>
				<td>{verificationInfo}</td>
			</tr>
		</tbody>
	</table>
	return <Popover content={content} placement="bottomLeft" trigger="click"
		getPopupContainer={() => document.querySelector('.query-export-tool')}
		overlayStyle={{ width: 620 }}>
		<div className='account-qr-code-wrapper'>
			<Icon type="qrcode" theme="outlined" style={{ color: '#999', fontSize: '14px', marginRight: '6px' }} />
			{snsId}
		</div>
	</Popover>
}

export default QRCode
