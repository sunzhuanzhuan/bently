import React, { useState } from 'react'
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import { connect } from "react-redux";
import { Modal } from 'antd';
function PlatformConfig() {
	const [modalProps, setModalProps] = useState({ visible: false, title: '', content: '' })
	const commonProps = {
		setModalProps, modalProps
	}
	return (
		<div>
			<h2>平台权益池配置</h2>
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
export default connect(mapStateToProps, mapDispatchToProps)(PlatformConfig)
