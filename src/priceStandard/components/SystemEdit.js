import React from 'react'
import { Form, Input, Radio, Button } from 'antd'
import TagList from './TagList'
import { systemTrim } from '@/util'

function SystemEdit(props) {
	const { setModalProps, equitiesTypeName, id, equitiesTypeAttribute, equitiesList = [] } = props
	const formLayout = {
		labelCol: { span: 5 },
		wrapperCol: { span: 19 },
	}
	const handleSubmit = e => {
		e.preventDefault();
		props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				props.systemEditEquities({ ...values, id: id })
			}
		});
	};
	function handleCancel() {
		setModalProps({ visible: false })
	}
	//唯一性校验
	const onlyVali = (rule, value, callback) => {
		const nowList = props.systemEquitiesList.map(one => one.equitiesTypeName)
		if (value) {
			if (systemTrim(value).length == 0) {
				callback('请输入权益类型名称!');
			} else if (nowList.includes(value) && value != equitiesTypeName) {
				callback('权益类型名称重复');
			} else {
				callback();
			}
		} else {
			callback();
		}
	}
	const { getFieldDecorator } = props.form
	return (
		<div>
			<Form layout='horizontal'>
				<Form.Item label="权益类型名称" {...formLayout}>
					{getFieldDecorator('equitiesTypeName', {
						initialValue: equitiesTypeName,
						validateFirst: true,
						rules: [
							{ required: true, message: '请输入权益类型名称' },
							{ validator: onlyVali }],
					})(<Input placeholder='请输入' />)}
				</Form.Item>
				<Form.Item label="权益单/复选设置" {...formLayout}>
					{getFieldDecorator('equitiesTypeAttribute', {
						initialValue: equitiesTypeAttribute || 2,
						rules: [{ required: true, message: '请选择权益单/复选设置' }],
					})(<Radio.Group >
						<Radio value={2}>复选</Radio>
						<Radio value={1}>单选</Radio>
					</Radio.Group>
					)}
				</Form.Item>
				<Form.Item label="权益" {...formLayout}>
					<div style={{ marginTop: 9 }}>
						{getFieldDecorator('equitiesList', {
							initialValue: equitiesList || [],
							rules: [{ required: true, message: '请添加权益' }],
						})(
							<TagList isOperate={true} />
						)}
					</div>
				</Form.Item>
			</Form>
			<div className='mt20-ml20'>
				<Button onClick={handleCancel}>取消</Button>
				<Button type='primary' onClick={handleSubmit}>确定</Button>
			</div>
		</div>
	)
}

export default Form.create()(SystemEdit)
