import React, { useState } from 'react'
import { Tabs, Checkbox, Button } from 'antd';
import './PlatformEdit.less'
import HCPopover from '../base/HCPopover'
const { TabPane } = Tabs;
const list = [
	{
		name: '话题、@',
		key: 'type1',
		list: [
			{ name: '带话题（最多3个）', key: 'topic' },
			{ name: '带话题（最多1个）', key: 'topic2' },
			{ name: '带话题（最多2个）', key: 'topic3' },
			{ name: '带话题（最多4个）', key: 'topic4' },
			{ name: '带话题（最多5个）', key: 'topic5' },
			{ name: '带话题xx', key: 'topicxx' }
		]
	},
	{
		key: 'type2',
		name: '1带权益类型名称可能很长权益类型名称可能很长链接',
		list: [{ name: '带话题（最多3个）', key: 'topic' }, { name: '带话题xx', key: 'topicxx' }]
	},
	{
		key: 'type3',
		name: '2带权益类型名称可能很长权益类型名称可能很长链接',
		list: [{ name: '带话题（最多3个）', key: 'topic' }, { name: '带话题xx', key: 'topicxx' }]
	},
]
function PlatformAdd() {
	const [data, setData] = useState({})
	const changeType = (key, value) => {
		setData({ ...data, [key]: value })
	}
	function onOk() {
		console.log('data', data);
	}
	return (
		<div>
			<div className='platform-edit-container'>
				<div className='title'>
					<div>权益类型</div>
					<div>权益</div>
				</div>
				<div className='content'>
					<Tabs tabPosition='left'>
						{list.map(item => <TabPane tab={
							<HCPopover content={item.name}>
								<div className='left-tab'>{item.name}</div>
							</HCPopover>
						} key={item.name}>
							<Checkbox.Group className='checkbox-group-box' onChange={(value) => changeType(item.key, value)}>
								{item.list.map(one => <div key={one.key} className='checkbox-item'>
									<Checkbox value={one.name}> {one.name}</Checkbox>
								</div>)}
							</Checkbox.Group>
						</TabPane>)}
					</Tabs>
				</div>
			</div>
			<div className='mt20-ml20'>
				<Button>取消</Button>
				<Button type='primary' onClick={onOk}>确认</Button>
			</div>
		</div>
	)
}

export default PlatformAdd
