import React, { useState, useEffect } from 'react'
import { Tabs, Checkbox, Button, Spin } from 'antd';
import './PlatformEdit.less'
import HCPopover from '../base/HCPopover'
import NoData from '../base/NoData'
const { TabPane } = Tabs;

function PlatformAdd(props) {
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		props.getUnUseEquitiesByGroupTypeIdAsync()
		setIsLoading(false)
	}, [])

	function onOk() {
		props.groupTypeAddOrUpdateEquitiesAsync(data)
	}
	function changeCheck(checked, id, equitiesTypeId) {
		let dataNew = [...data]
		if (checked) {
			dataNew = [...dataNew, {
				equitiesTypeId: equitiesTypeId,
				groupTypeId: props.groupTypeId,
				equitiesId: id,
				isDeleted: 2
			}]
		} else {
			dataNew = dataNew.filter(one => one.equitiesId != id)
		}
		setData(dataNew)
	}

	const { platformNoUsedList = [], systemEquitiesConfig } = props
	return (
		<Spin spinning={isLoading}>
			{platformNoUsedList.length > 0 ?
				<span>
					<div className='platform-edit-container'>
						<div className='title'>
							<div>权益类型</div>
							<div>权益</div>
						</div>
						<div className='content'>
							<Tabs tabPosition='left'>
								{platformNoUsedList.map(item => <TabPane tab={
									<HCPopover content={item.equitiesTypeName}>
										<div className='left-tab'>{item.equitiesTypeName}</div>
									</HCPopover>
								} key={item.equitiesTypeName}>
									<div className='checkbox-group-box' >
										{item.equitiesList.map(one => <div key={one.key} className='checkbox-item'>
											<Checkbox onChange={(e) => changeCheck(e.target.checked, one.id, one.equitiesTypeId)}>
												{one.equitiesName}
											</Checkbox>
										</div>)}
									</div>
								</TabPane>)}
							</Tabs>
						</div>
					</div>
					<div className='mt20-ml20'>
						<Button onClick={props.onCancel}>取消</Button>
						<Button type='primary' onClick={onOk}>确认</Button>
					</div>
				</span>
				: <div className='empty-data'>
					<NoData />
					<div className='text'>
						{/* ?addModel=true */}
						{systemEquitiesConfig ?
							<a className='add-btn' href='/priceStandard/system'>添加权益类型</a>
							: '请联系超级管理员添加权益类型'}
					</div>
				</div>}
		</Spin>
	)
}

export default PlatformAdd
