import React, { useState, useEffect } from 'react'
import { Tabs, Checkbox, Button, Spin } from 'antd';
import './PlatformEdit.less'
import HCPopover from '../base/HCPopover'
const { TabPane } = Tabs;

function PlatformAdd(props) {
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		props.getUnUseEquitiesByGroupTypeIdAsync()
		setIsLoading(false)
	}, [])

	function onOk() {
		props.groupTypeAddEquitiesAsync(data)
	}
	function changeCheck(checked, id, equitiesTypeId) {
		console.log("changeCheck -> checked", checked)
		let dataNew = [...data]
		if (checked) {
			dataNew = [...dataNew, {
				equitiesTypeId: equitiesTypeId,
				groupTypeId: props.groupTypeId,
				equitiesId: id
			}]
		} else {
			dataNew = dataNew.filter(one => one.equitiesId != id)
		}
		setData(dataNew)
	}
	return (
		<Spin spinning={isLoading}>
			<div className='platform-edit-container'>
				<div className='title'>
					<div>权益类型</div>
					<div>权益</div>
				</div>
				<div className='content'>
					<Tabs tabPosition='left'>
						{props.platformNoUsedList.map(item => <TabPane tab={
							<HCPopover content={item.equitiesTypeName}>
								<div className='left-tab'>{item.equitiesTypeName}</div>
							</HCPopover>
						} key={item.equitiesTypeName}>
							<div className='checkbox-group-box' >
								{item.equitiesList.map(one => <div key={one.key} className='checkbox-item'>
									<Checkbox onChange={(e) => changeCheck(e.target.checked, one.id, item.equitiesTypeId)}>
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
		</Spin>
	)
}

export default PlatformAdd
