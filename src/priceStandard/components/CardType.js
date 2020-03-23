import React from 'react'
import TagList from './TagList'
import './CardType.less'
import { Icon, Popconfirm } from 'antd'
import HCPopover from '../base/HCPopover'


function CardType(props) {
	const {
		showDelete = true,
		isDelete = true,
		reason = 'xxx',
		data = {},
		onEdit,
		onDelete,
		deleteText = <div>确定删除权益类型吗？<br /><br />删除后此类型下权益都将删除</div>
	} = props
	return (
		<div className='card-type'>
			{data.map(item => <div key={item.name} className='card-item'>
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
						<Popconfirm title={deleteText} okText="确定" cancelText="取消"
							onConfirm={() => onDelete && onDelete(data)}>
							<span className='active' >
								<Icon type="delete" /> 删除
							</span>
						</Popconfirm>
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
