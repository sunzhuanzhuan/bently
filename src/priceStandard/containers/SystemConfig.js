import React, { useState, useEffect } from 'react'
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import { connect } from "react-redux";
import SystemEdit from '../components/SystemEdit'
import SystemList from '../components/SystemList'
import { Button, Icon, Modal, Spin, message } from 'antd';

function SystemConfig(props) {
	const [modalProps, setModalProps] = useState({ visible: false, title: '', content: '' })
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		getSystemEquitiesAsync()
	}, [])
	//查询列表
	async function getSystemEquitiesAsync() {
		await props.actions.getSystemEquities()
		setIsLoading(false)
	}
	//添加修改接口
	async function systemEditEquities(data) {
		if (data.id) {
			await props.actions.systemUpdateEquities(data)
		} else {
			await props.actions.systemAddEquities(data)
		}
		getSystemEquitiesAsync()
		message.success('操作成功')
	}
	//删除操作
	async function systemDeleteEquitiesAsync(id) {
		await props.actions.systemDeleteEquities({ id: id })
		getSystemEquitiesAsync()
		message.success('操作成功')
	}
	//排序操作
	async function systemEquitiesTypeSortAsync(list) {
		await props.actions.systemEquitiesTypeSort(list)
		message.success('操作成功')
	}
	const { priceStandard = {} } = props
	const { systemEquitiesList } = priceStandard
	const commonProps = {
		setModalProps, modalProps, showEdit, systemEditEquities, systemEquitiesList, systemEquitiesTypeSortAsync,
		systemDeleteEquitiesAsync
	}
	//修改添加弹窗触发
	function showEdit(isDefault, data) {
		setModalProps({
			visible: true,
			width: '700px',
			title: `${isDefault == 2 ? '修改' : '添加'}权益类型`,
			content: (props) => <SystemEdit {...props} {...data} />
		})
	}

	return (
		<div>
			<h2>系统权益池管理</h2>
			<Spin spinning={isLoading}>
				<div>
					<Button type='primary' onClick={showEdit}>+ 添加权益类型</Button>
					<span style={{ marginLeft: 31 }}><Icon type="info-circle" theme="filled" className='warning-info' /> 注：若权益已被平台SKU配置，则不可删除。</span>
				</div>
				<SystemList {...commonProps} key={systemEquitiesList.length} />
			</Spin>
			<Modal
				footer={null}
				{...modalProps}
				maskClosable={false}
				onCancel={() => setModalProps({ visible: false })}
			>
				{modalProps.content && modalProps.content(commonProps)}
			</Modal>
		</div>
	)
}
const mapStateToProps = (state) => {
	return {
		priceStandard: state.priceStandard
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...actions }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(SystemConfig)
