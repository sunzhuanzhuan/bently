import React, { useState, useEffect } from 'react'
import { Checkbox, Radio, Button } from 'antd'
import './SkuTypeEdit.less'
const listData = [
	{
		type: '1',
		name: '话题、@',
		list: [
			{ name: '带话题（最多3个）', key: 'topic', isRequired: 1 },
			{ name: '带链接（最多3个）', key: 'link', isRequired: 2 },
			{ name: '带链接（最多3个）', key: 'links', },

		]
	}, {
		type: '2',
		name: '话题、@',
		list: [
			{ name: '带话题（最多3个）', key: 'topic', isRequired: 1 },
			{ name: '带链接（最多3个）', key: 'link', isRequired: 2 },
			{ name: '带链接（最多3个）', key: 'links', },

		]
	}, {
		type: '2',
		name: '话题、@',
		list: [
			{ name: '带话题（最多3个）', key: 'topic', isRequired: 1 },
			{ name: '带链接（最多3个）', key: 'link', isRequired: 2 },
			{ name: '带链接（最多3个）', key: 'links', },

		]
	}, {
		type: '2',
		name: '话题、@',
		list: [
			{ name: '带话题（最多3个）', key: 'topic', isRequired: 1 },
			{ name: '带链接（最多3个）', key: 'link', isRequired: 2 },
			{ name: '带链接（最多3个）', key: 'links', },

		]
	}, {
		type: '2',
		name: '话题、@',
		list: [
			{ name: '带话题（最多3个）', key: 'topic', isRequired: 1 },
			{ name: '带链接（最多3个）', key: 'link', isRequired: 2 },
			{ name: '带链接（最多3个）', key: 'links', },

		]
	}
]
function SkuTypeEdit() {
	const [data, setData] = useState({})
	console.log("SkuTypeEdit -> data", data)

	return (
		<div>
			<div className='sku-type-edit'>
				{
					listData.map(one => <div key={one.id} className='sku-type-card-item'>
						<strong>{one.name}</strong>
						{one.list.map(item => <TypeItem key={item.key}
							{...item} />)}
					</div>)
				}
			</div>
			<div style={{ textAlign: 'right', marginTop: 20 }}>
				<Button>取消</Button>
				<Button type='primary' style={{ marginLeft: 20 }}>确认</Button>
			</div>
		</div>
	)
}

function TypeItem(props) {
	const [checkState, setCheckState] = useState(props.isRequired)
	const [isRequired, setIsRequired] = useState(props.isRequired)
	function changeRadio(e) {
		const value = e.target.value
		setIsRequired(value)
	}
	return (
		<div className='type-item'>
			<Checkbox checked={checkState} onChange={(e) => setCheckState(e.target.checked)}>{props.name}
			</Checkbox>
			{checkState ? <div className='radio-item'>
				<Radio.Group onChange={changeRadio} value={isRequired}>
					<Radio value={1}>必选</Radio>
					<Radio value={2}>非必选</Radio>
				</Radio.Group>
			</div> : null}
		</div>
	)
}

export default SkuTypeEdit
