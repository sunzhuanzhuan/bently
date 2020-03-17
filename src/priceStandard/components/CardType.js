import React from 'react'
import TagList from './TagList'
import './CardType.less'
const list = [
	{
		name: 'SKU类型',
		value: 'ddd',
		type: 'text'
	}, {
		name: 'SKU类型',
		value: [],
		type: 'tags'
	}
]
function CardType(props) {
	const { item = {
		name: 'SKU类型',
		value: 'ddd',
		type: 'tags'
	} } = props

	return (
		<div className='card-type'>
			<div className='name'>{item.name}：</div>
			{
				item.type === 'tags' ?
					<TagList list={item.value} />
					: item.value
			}
		</div>
	)
}

export default CardType
