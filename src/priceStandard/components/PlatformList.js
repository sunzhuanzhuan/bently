import React from 'react'
import CardType from './CardType'
import SkuTypeEdit from './SkuTypeEdit'

const listDefault = [
	{
		name: '权益类型',
		value: 'ddd',
		type: 'text'
	}, {
		name: '权益',
		value: [],
		type: 'tags'
	}
]

function PlatformList(props) {
	const { setModalProps, onEdit } = props

	return (
		<div>
			<CardType onEdit={onEdit} data={{ list: listDefault }} />
		</div>
	)
}

export default PlatformList
