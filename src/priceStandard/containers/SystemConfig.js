import React, { useState } from 'react'
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import { connect } from "react-redux";
import SystemEdit from '../components/SystemEdit'
import SystemList from '../components/SystemList'
import { Button, Icon, Modal } from 'antd';

function SystemConfig() {
	const [modalProps, setModalProps] = useState({ visible: false, title: '', content: '' })
	const commonProps = {
		setModalProps, modalProps, showEdit
	}
	function showEdit(isDefault) {
		setModalProps({
			visible: true,
			width: '700px',
			title: `${isDefault == 2 ? '修改' : '添加'}权益类型`,
			content: (props) => <SystemEdit {...props} />
		})
	}
	return (
		<div>
			<h2>系统权益池管理</h2>
			<div>
				<Button type='primary' onClick={showEdit}>+ 添加权益类型</Button>
				<span style={{ marginLeft: 31 }}><Icon type="info-circle" theme="filled" className='warning-info' /> 注：若权益已被平台SKU配置，则不可删除。</span>
			</div>
			<SystemList {...commonProps} />
			<Modal
				footer={null}
				{...modalProps}
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
