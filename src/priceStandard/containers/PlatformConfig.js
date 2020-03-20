import React, { useState } from 'react'
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import { connect } from "react-redux";
import { Modal, Button, Icon } from 'antd';
import PlatformHeader from '../base/PlatformHeader'
import PlatformList from '../components/PlatformList'
import PlatformEdit from '../components/PlatformEdit'
const titleStyle = {
	color: '#666',
	fontWeight: '400'
}
function PlatformConfig() {
	const [modalProps, setModalProps] = useState({ visible: false, title: '', content: '' })
	function onEdit(data) {
		setModalProps({
			visible: true,
			width: '666px',
			title: <div>{`修改SKU配置`}
				<span style={{ marginLeft: 30 }}>
					<span style={titleStyle}>平台：</span>微信
				</span>
			</div>,
			content: (props) => <PlatformEdit data={data} {...props} />
		})
	}
	const commonProps = {
		setModalProps, modalProps, onEdit
	}
	return (
		<div>
			<h2>平台权益池配置</h2>
			<PlatformHeader />
			<div style={{ marginTop: 18 }}>
				<Button type='primary' onClick={onEdit}>+ 添加平台权益</Button>
				<span style={{ marginLeft: 31 }}><Icon type="info-circle" theme="filled" className='warning-info' /> 注：若权益已被平台SKU配置，则不可删除。</span>
			</div>
			<PlatformList {...commonProps} />
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
export default connect(mapStateToProps, mapDispatchToProps)(PlatformConfig)
