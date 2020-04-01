import React, { useState, useEffect } from 'react'
import './PlatformEdit.less'
import { Checkbox, Button } from 'antd'
function PlatformUpdate(props) {
	const [list, setList] = useState([])
	const { data = {}, groupTypeId } = props
	const { equitiesList = [] } = data
	const checkedList = equitiesList.filter(one => one.isUsed == 1)
	const checkedIds = checkedList.map(one => one.id)
	function changeCheckbox(isCheck, item) {
		let newItem = {
			...item,
			groupTypeId: groupTypeId,
			equitiesTypeId: data.equitiesTypeId,
			id: data.id,
			isDelete: 1
		}
		if (isCheck) {
			setList([...list, newItem])
		} else {
			if (checkedIds.includes(item.id)) {
				newItem.isDelete = 2
			}
			setList([...list, newItem])
		}
	}
	useEffect(() => {
		setList(checkedList.map(one => ({
			...one,
			groupTypeId: groupTypeId,
			equitiesTypeId: data.equitiesTypeId,
			id: data.id,
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
					{equitiesList.map(item => <div key={item.id}><Checkbox
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
