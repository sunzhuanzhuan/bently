import React, { useState } from 'react'
import api from '@/api'
import MarkMessage from "../MarkMessage";
import { Tag } from 'antd'
export default function Equity({ equitiesIdList }) {
	const [list, setList] = useState([])
	async function hoverEquity() {
		const { data } = await api.get('/operator-gateway/equities/v1/getEquitiesListByEquitiesIds', { params: { equitiesIdList: equitiesIdList.join(',') } })
		setList(data)
	}
	const text = <img src={require('./equity.png')} height='18px' style={{ marginTop: 4, marginLeft: 2 }} />
	const content = <div>
		{list.map(one => <Tag key={one.equitiesId} color="blue" style={{ cursor: 'auto' }}>{one.equitiesName}</Tag>)}
	</div>
	return <span onMouseOver={hoverEquity}><MarkMessage text={text} content={content} /></span>
}

