import React, { useState, useEffect } from 'react'
import { Checkbox, Radio, Button } from 'antd'
import './SkuTypeEdit.less'
const listData = [
	{
		"equitiesList": [
			{
				"equitiesId": 333,
				"equitiesName": "sint anim incididunt",
				"isRequired": 1
			},
			{
				"equitiesId": 168,
				"equitiesName": "minim cillum amet",
				"isRequired": 0
			}
		],
		"skuTypeId": -3881745.3354853094,
		"platformId": 4313418.584537759,
		"skuTypeCode": "Lorem non ut",
		"skuTypeName": "eiusmod Excepteur deserunt",
		"isBasic": "eu culpa labore anim elit"
	},
	{
		"equitiesList": [
			{
				"equitiesId": 44352,
				"equitiesName": "et quis",
				"isRequired": 1
			},
			{
				"equitiesId": 776,
				"equitiesName": "Excepteur elit Ut",
				"isRequired": 1
			}
		],
		"skuTypeId": -62401719.11955952,
		"platformId": 23755755.481012747,
		"skuTypeCode": "consequat dolor",
		"skuTypeName": "velit in mollit",
		"isBasic": "ut est"
	},
]

function SkuTypeEdit(props) {
	const [list, setList] = useState({})
	function onOk() {
		console.log(list);
	}
	function changeList(newList) {
		setList([...list, ...newList])
	}
	return (
		<div>
			<div className='sku-type-edit'>
				{
					listData.map(one => <div key={one.id} className='sku-type-card-item'>
						<strong>{one.skuTypeName}</strong>
						<TypeList list={one.equitiesList} changeList={changeList} />
					</div>)
				}
			</div>
			<div style={{ textAlign: 'right', marginTop: 20 }}>
				<Button>取消</Button>
				<Button type='primary' style={{ marginLeft: 20 }} onClick={onOk}>确认</Button>
			</div>
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
	//监听isRequired变化
	useEffect(() => {
		props.changeRequired(isRequired, props.equitiesId)
	}, [isRequired])
	function changeRadio(e) {
		const value = e.target.value
		setIsRequired(value)
	}
	function changeCheck(checked) {
		setIsRequired(checked ? 1 : 0)
		setCheckState(checked)
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
