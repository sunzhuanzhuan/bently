import React, { useState, useEffect } from 'react'
import './PlatformEdit.less'
import { Checkbox, Button } from 'antd'
function PlatformUpdate(props) {
	const [list, setList] = useState([])
	const { data = {}, groupTypeId } = props
	const { equitiesList = [] } = data
	const checkedList = equitiesList.filter(one => one.isPitchOn == 1)
	const checkedIds = checkedList.map(one => one.id)
	function changeCheckbox(isCheck, item) {
		let newItem = {
			...item,
			groupTypeId: groupTypeId,
			equitiesId: item.id,
			isDeleted: 2
		}
		if (checkedIds.includes(item.id)) {
			newItem.isDeleted = 1
			delete newItem.isPitchOn
		}
		const newList = list.filter(one => one.equitiesId != item.id)
		setList([...newList, newItem])
	}
	useEffect(() => {
		setList(checkedList.map(one => ({
			...one,
			groupTypeId: groupTypeId,
			equitiesId: one.id,
		})))
	}, [])

	return (
		<div className='platform-update'>
			<div className='item'>
				<div>权益类型：</div>
				<div>{data.equitiesTypeName}</div>
			</div>
			<div className='item'>
				<div>权益：</div>
				<div>
					{equitiesList.map(item => <div key={item.id} className='equities-item'><Checkbox
						disabled={item.isUsed == 1}
						defaultChecked={item.isPitchOn == 1}
						onChange={e => changeCheckbox(e.target.checked, item)}>
						{item.equitiesName}
					</Checkbox></div>)}
				</div>
			</div>
			<div className='mt20-ml20'>
				<Button onClick={props.onCancel}>取消</Button>
				<Button type='primary' onClick={() => props.groupTypeAddOrUpdateEquitiesAsync(list)}>确认</Button>
			</div>
		</div>
	)
}

export default PlatformUpdate
