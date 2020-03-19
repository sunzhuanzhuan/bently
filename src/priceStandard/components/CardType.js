import React from 'react'
import TagList from './TagList'
import './CardType.less'
import { Icon } from 'antd'
import HCPopover from '../base/HCPopover'
const listDefault = [
	{
		name: 'SKU类型',
		value: 'ddd',
		type: 'text'
	}, {
		name: 'SKU类型2',
		value: [],
		type: 'tags'
	}
]
function CardType(props) {
	const {
		showDelete = true,
		isDelete,
		reason = 'xxx',
		data = {},
		onEdit,
		onDelete } = props
	const { list = listDefault } = data
	return (
		<div className='card-type'>
			{list.map(item => <div key={item.name} className='card-item'>
				<div className='name'>{item.name}：</div>
				{
					item.type === 'tags' ?
						<TagList list={item.value} isOperate={false} />
						: <div className='value'>{item.value}</div>
				}

			</div>
			)}
			<div className='operate-box'>
				<span className='active' onClick={() => onEdit && onEdit(data)}>
					<Icon type="form" /> 修改</span>
				{showDelete ?
					isDelete ?
						<span className='active' onClick={() => onDelete && onDelete(data)}>
							<Icon type="delete" /> 删除
						</span>
						:
						<HCPopover content={reason}>
							<span className='disable'>
								<Icon type="delete" /> 删除
							</span>
						</HCPopover>
					: null}
			</div>


		</div>
	)
}

export default CardType
