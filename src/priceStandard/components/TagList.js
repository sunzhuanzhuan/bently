import React, { useEffect, useState } from 'react'
import { Tag, Icon, Popover, Form, Input, Button } from 'antd';
import './TagList.less'
import HCPopover from '../base/HCPopover'
const listDefault = [
	{ id: 1, name: '带京东链接', isClose: true, isRequired: true },
	{ id: 2, name: '带天猫链接', isClose: false },
]
function TagList(props) {
	const [list, setList] = useState(listDefault)
	const { isOperate, onChange } = props
	function addList(item) {
		setList([...list, item])
	}
	useEffect(() => {
		onChange && onChange(list)
	}, [list])
	const iconClose = {
		type: "close-circle",
		theme: "filled",
		className: 'icon-close'
	}
	function deleteList(item) {
		setList(list.filter(one => one.name != item.name))
	}
	return (
		<div className='tag-list'>
			{
				list.map(item =>
					<div key={item.id} className='item'>
						{item.isRequired ? <span className='red-start'></span > : null}
						<span>{item.name}</span>
						{isOperate ?
							item.isClose ?
								<Icon
									{...iconClose}
									style={{ color: '#418BF9', paddingTop: 3 }}
									onClick={() => deleteList(item)} />
								: <HCPopover content={<div>
									该权益已在以下平台权益池中进行配置，不可删除。
									<div className='plat-gray-type-no-delete'>{['微信公众号', '新浪微博', '抖音'].join('；')}</div>
								</div>}><Icon
										{...iconClose}
										style={{ color: '#BBBBBB', paddingTop: 3 }} />
								</HCPopover>
							: null}
					</div>)
			}
			{isOperate ? <AddOperate addList={addList} /> : null}
		</div>
	)
}

export default TagList

//添加权益
function AddOperate(props) {
	const [visible, setVisible] = useState(false)
	return <Popover
		content={
			<AddContentForm setVisible={setVisible}
				addList={props.addList} />
		}
		overlayStyle={{ width: 300 }}
		trigger="click"
		visible={visible}
		onVisibleChange={() => setVisible(!visible)}
	>
		<a className='box-config'>+ 添加权益</a>
	</Popover>
}
//弹窗内容
function AddContent(props) {
	const { getFieldDecorator, validateFields, resetFields } = props.form;
	function onOk() {
		validateFields((err, values) => {
			if (!err) {
				values.isClose = true
				props.addList(values)
				onCancel()
			}
		});
	}
	function onCancel() {
		props.setVisible(false)
		resetFields()
	}
	return <Form>
		<Form.Item label="权益名称" >
			{getFieldDecorator('name', {
				rules: [
					{
						required: true,
						message: '请填写权益名称!',
					},
					{
						max: 20,
						message: '请输入1-20字的权益名称!'
					},
				],
			})(<Input placeholder='请输入1-20字的权益名称' />)}
		</Form.Item>
		<div className='add-form-btn'>
			<Button size='small' onClick={onCancel}>取消</Button>
			<Button onClick={onOk} type='primary' size='small'>确定</Button>
		</div>
	</Form>
}
const AddContentForm = Form.create()(AddContent)
