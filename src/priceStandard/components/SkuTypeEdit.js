import React, { useState, useEffect } from 'react'
import { Checkbox, Radio, Button, Modal, Spin } from 'antd'
const { confirm } = Modal;
import './SkuTypeEdit.less'

function SkuTypeEdit(props) {
	const [list, setList] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const { data = {}, platformId, skuUpdateList } = props
	const { skuTypeId } = data
	useEffect(() => {
		props.getCanUpdateSkuTypeEquitiesAsync(skuTypeId)
		setIsLoading(false)
	}, [])
	function onOk() {
		if (list.length > 0) {
			confirm({
				title: '您修改SKU配置，是否确认修改？',
				onOk() {
					props.platformSkuUpdateEquitiesAsync(list)
				},
			});
		} else {
			props.onCancel()
		}
	}

	function changeRequired(required, id, isRequiredIds = []) {
		let item = {
			equitiesId: id,
			skuTypeId: skuTypeId,
			platformId: platformId,
			isRequired: required,
			isDeleted: 2
		}
		let isUpdate = true
		if (isRequiredIds.includes(id) && required == 0) {
			item.isDeleted = 1
		}
		//如果取消勾选的是本次新增的则不更新list
		if (!isRequiredIds.includes(id) && required == 0) {
			isUpdate = false
		}
		//过去上次操作过的的id的item
		const nowList = list.filter(one => one.equitiesId != id)
		setList(isUpdate ? [...nowList, item] : [...nowList])
	}
	return (
		<div>
			<Spin spinning={isLoading}>
				<div className='sku-type-edit'>
					{
						skuUpdateList.map(one => <div key={one.id} className='sku-type-card-item'>
							<strong>{one.equitiesTypeName}</strong>
							{one.equitiesList.map(item => <TypeItem
								{...item}
								isRequiredIds={one.isRequiredIds}
								key={JSON.stringify(`${one.isRequiredIds}_${item.id}`)}
								changeRequired={changeRequired} />
							)}
						</div>)
					}
				</div>
				<div style={{ textAlign: 'right', marginTop: 20 }}>
					<Button onClick={props.onCancel}>取消</Button>
					<Button type='primary' style={{ marginLeft: 20 }} onClick={onOk}>确认</Button>
				</div>
			</Spin>
		</div>
	)
}

function TypeItem(props) {
	const [checkState, setCheckState] = useState(props.isRequired == 2)//props.isRequired == 2
	//const [isRequired, setIsRequired] = useState(props.isRequired)
	// function changeRadio(e) {
	// 	const value = e.target.value
	// 	setIsRequired(value)
	// 	props.changeRequired(value, props.id)
	// }
	function changeCheck(checked) {
		const isRequired = checked ? 2 : 0//0
		//setIsRequired(isRequired)
		setCheckState(checked)
		props.changeRequired(isRequired, props.id, props.isRequiredIds)
	}
	return (
		<div className='type-item'>
			<Checkbox defaultChecked={checkState} onChange={(e) => changeCheck(e.target.checked)}>{props.equitiesName}
			</Checkbox>
			{/* {checkState ? <div className='radio-item'>
				<Radio.Group onChange={changeRadio} value={isRequired}>
					<Radio value={1}>必选</Radio>
					<Radio value={2}>非必选</Radio>
				</Radio.Group>
			</div> : null} */}
		</div>
	)
}

export default SkuTypeEdit
