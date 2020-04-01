import React, { useEffect, useState } from 'react'
import { Tag, Icon, Popover, Form, Input, Button } from 'antd';
import './TagList.less'
import HCPopover from '../base/HCPopover'
import api from '@/api'
function TagList(props) {
	const [list, setList] = useState(props.value)
	const { isOperate, onChange } = props
	function addList(item) {
		const newList = [...list, item]
		setList(newList)
		onChange && onChange(newList)
	}
	const iconClose = {
		type: "close-circle",
		theme: "filled",
		className: 'icon-close'
	}
	function deleteList(item) {
		let deleteList = list.filter(one => one.equitiesName != item.equitiesName)
		if (item.id) {
			deleteList.push({ ...item, isDeleted: 1 })
		}
		setList(deleteList)
		onChange && onChange(deleteList)
	}
	return (
		<div className='tag-list'>
			{
				list.map((item, index) => item.isDeleted == 1 ? null : <div key={item.equitiesName} className='item'>
					{item.isRequired == 1 ? <span className='red-start'></span > : null}
					<span>{item.equitiesName}</span>
					{isOperate ?
						(item.groupTypeNames || []).length > 0 ?
							<HCPopover content={<div>
								该权益已在以下平台权益池中进行配置，不可删除。
								<div className='plat-gray-type-no-delete'>{item.groupTypeNames.join('；')}</div>
							</div>}><Icon
									{...iconClose}
									style={{ color: '#BBBBBB', paddingTop: 3 }} />
							</HCPopover>
							: <Icon
								{...iconClose}
								style={{ color: '#418BF9', paddingTop: 3 }}
								onClick={() => deleteList(item)} />

						: null}
				</div>)
			}
			{isOperate && list.length < 20 ? <AddOperate addList={addList} list={list} /> : null}
		</div>
	)
}

export default TagList

//添加权益
function AddOperate(props) {
	const [visible, setVisible] = useState(false)
	return <Popover
		content={
			<AddContentForm
				setVisible={setVisible}
				addList={props.addList}
				list={props.list}
			/>
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
	//this.search = ;
	function onOk() {
		validateFields((err, values) => {
			if (!err) {
				values.isUsed = 2
				props.addList(values)
				onCancel()
			}
		});
	}
	function onCancel() {
		props.setVisible(false)
		resetFields()
	}
	//唯一性校验
	async function onlyVali(rule, value, callback) {
		const nowList = props.list.map(one => one.equitiesName)
		const { data } = await api.get('/operator-gateway/equities/v1/judgeDuplicationEquitiesName', {
			params: {
				equitiesName: value
			}
		}).catch(err => callback(err))
		if (nowList.includes(value)) {
			callback('权益名称重复');
		} else if (!data) {
			callback('权益名称重复');
		} else {
			callback();
		}
	}
	return <Form>
		<Form.Item label="权益名称" >
			{getFieldDecorator('equitiesName', {

				rules: [
					{
						required: true,
						message: '请填写权益名称!',
					},
					{
						max: 20,
						message: '请输入1-20字的权益名称!'
					},
					{ validator: onlyVali }
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
