import React, { useEffect, useState } from 'react'
import { Tag, Icon, Popover, Form, Input } from 'antd';
import './TagList.less'
const listDefault = [
	{ id: 1, name: '带京东链接', isClose: true },
	{ id: 2, name: '带天猫链接', isClose: false },
]
function TagList(props) {
	console.log("useState----", React)

	const { isOperate = true } = props
	return (
		<div className='tag-list'>
			{
				listDefault.map(item =>
					<Tag color="rgba(65,139,249,0.1)" key={item.id} className='item'>
						<RequiredRed />
						<span>{item.name}</span>
						{isOperate ?
							<Icon
								type="close-circle"
								theme="filled"
								className='icon-close'
								style={{ color: item.isClose ? '#418BF9' : '#BBBBBB' }} />
							: null}
					</Tag>)
			}
			{/* {isOperate ?  : null} */}
		</div>
	)
}

export default TagList

export function RequiredRed({ isRequired }) {
	return isRequired ? <span className='required-box'>
		<span className='start'>*</span>
	</span> : null
}
function AddOperate() {
	<Popover
		content={
			<AddContentForm />
		}
		title="Title"
		trigger="click"
		visible={this.state.visible}
		onVisibleChange={this.handleVisibleChange}
	>
		<a>+ 添加权益</a>
	</Popover>
}
function AddContent(props) {
	const { getFieldDecorator } = props.form;
	return <Form>
		<Form.Item label="权益名称" >
			{getFieldDecorator('confirm', {
				rules: [
					{
						required: true,
						message: '请填写权益名称',
					},
					{
						max: 20,
						message: '1-20字的权益名称'
					},
				],
			})(<Input />)}
		</Form.Item>
	</Form>
}
const AddContentForm = Form.create()(AddContent)
