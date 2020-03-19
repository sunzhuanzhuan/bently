import React from 'react'
import CardType from './CardType'
const listDefault = [
	{
		name: 'SKU类型',
		value: 'ddd',
		type: 'text'
	}, {
		name: '权益',
		value: [],
		type: 'tags'
	}
]
function SkuTypeList() {
	return (
		<div>
			<CardType showDelete={false} data={{ list: listDefault }} />
		</div>
	)
}

export default SkuTypeList
