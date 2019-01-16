import React from "react"
import { Badge, Tooltip } from 'antd'
// 处理原因显示
function handleReason(reason = '') {
	let result = ''
	if (Array.isArray(reason)) {
		result = reason.join('，')
	} else if (typeof reason === 'string') {
		result = reason.replace(/,/g,'，')
	}
	return result
}
const StatusComponent = ({ status = false, desc = ['',''],reason='' }) => {
	return <div>
		{status ? <Badge status={"success"} text={desc[0]} />:
		<Tooltip title={handleReason(reason)}>
			<Badge status={"error"} text={desc[1]} />
		</Tooltip>}
	</div>
}

const AccountState = ({ state = [] }) => {
	let [online, a, b] = state

	return <div className='account-status-tabs'>
		<StatusComponent status={online.code == 1} desc={["账号可售卖","账号不可售卖"]} reason={online.reason}/>
		<StatusComponent status={a.code == 1} desc={["A端上架","A端下架"]} reason={a.reason} />
		<StatusComponent status={b.code == 1} desc={["B端上架","B端下架"]} reason={b.reason} />
	</div>
}

export default AccountState
