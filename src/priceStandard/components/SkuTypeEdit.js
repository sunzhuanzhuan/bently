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
					props.platformSkuUpdateEquitiesAsync({
						skuTypeId: skuTypeId,
						platformId: platformId,
						equitiesList: list
					})
				},
			});
		} else {
			props.onCancel()
		}
	}
	function changeList(newList) {
		setList([...list, ...newList])
	}
	return (
		<div>
			<Spin spinning={isLoading}>
				<div className='sku-type-edit'>
					{
						skuUpdateList.map(one => <div key={one.id} className='sku-type-card-item'>
							<strong>{one.skuTypeName}</strong>
							<TypeList list={one.equitiesList} changeList={changeList} />
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
function TypeList({ list, changeList }) {
	const [updateList, setUpdateList] = useState([])
	const isRequiredIds = list.filter(one => one.isRequired > 0).map(item => item.equitiesId)
	function changeRequired(required, id) {
		console.log("changeRequired -> required, id", required, id)
		let item = {
			equitiesId: id,
			isRequired: required
		}
		if (isRequiredIds.includes(id) && required == 0) {
			item.isDelete = 2
		}
		const nowList = [...updateList.filter(item => item.equitiesId != id), item]
		console.log("changeRequired -> nowList", nowList)
		setUpdateList(nowList)
		changeList(nowList)
	}
	return list.map(item => <TypeItem {...item} key={item.key} changeRequired={changeRequired} />)
}
function TypeItem(props) {
	const [checkState, setCheckState] = useState(props.isRequired == 2 || props.isRequired == 1)
	const [isRequired, setIsRequired] = useState(props.isRequired)
	function changeRadio(e) {
		const value = e.target.value
		setIsRequired(value)
		props.changeRequired(value, props.equitiesId)
	}
	function changeCheck(checked) {
		const isRequired = checked ? 1 : 0
		setIsRequired(isRequired)
		setCheckState(checked)
		props.changeRequired(isRequired, props.equitiesId)
	}
	return (
		<div className='type-item'>
			<Checkbox defaultChecked={checkState} onChange={(e) => changeCheck(e.target.checked)}>{props.equitiesName}
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
