import React, { useEffect, useState } from 'react'
import { Tag, Icon, Popover, Form, Input, Button } from 'antd';
import './TagList.less'
const listDefault = [
	{ id: 1, name: '带京东链接', isClose: true },
	{ id: 2, name: '带天猫链接', isClose: false },
]
function TagList(props) {
	const [list, setList] = useState(listDefault)
	const { isOperate = true } = props
	function addList(item) {
		setList([...list, item])
	}
	return (
		<div className='tag-list'>
			{
				list.map(item =>
					<div key={item.id} className='item'>
						<RequiredRed />
						<span>{item.name}</span>
						{isOperate ?
							<Icon
								type="close-circle"
								theme="filled"
								className='icon-close'
								style={{ color: item.isClose ? '#418BF9' : '#BBBBBB' }} />
							: null}
					</div>)
			}
			{isOperate ? <AddOperate addList={addList} /> : null}
		</div>
	)
}

export default TagList
//红色必填
export function RequiredRed({ isRequired = true }) {
	return isRequired ? <span className='required-box'>
		<span className='start'>*</span>
	</span> : null
}
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
