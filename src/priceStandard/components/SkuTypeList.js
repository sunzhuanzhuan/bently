import React from 'react'
import CardType from './CardType'
import SkuTypeEdit from './SkuTypeEdit'

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
const titleStyle = {
	color: '#666',
	fontWeight: '400'
}
function SkuTypeList(props) {
	const { setModalProps } = props
	function onEdit(data = {}) {
		setModalProps({
			visible: true,
			width: '1000px',
			title: <div>修改SKU配置
				<span style={{ marginLeft: 30 }}>
					<span style={titleStyle}>平台：</span>微信
				</span>
				<span style={{ marginLeft: 30 }}>
					<span style={titleStyle}>sku类型：</span>dd
				</span>
			</div>,
			content: (props) => <SkuTypeEdit data={data} {...props} />
		})
	}
	return (
		<div>
			<CardType onEdit={onEdit} showDelete={false} data={{ list: listDefault }} />
		</div>
	)
}

export default SkuTypeList
