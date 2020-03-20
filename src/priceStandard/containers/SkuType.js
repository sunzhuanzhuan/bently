import React, { useState } from 'react'
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import { connect } from "react-redux";
import PlatformHeader from '../base/PlatformHeader'
import SkuTypeList from '../components/SkuTypeList'
import TitleBox from '../base/TitleBox'
import SkuTypeEdit from '../components/SkuTypeEdit'
import { Icon, Modal } from 'antd';
function SkuType() {
	const [modalProps, setModalProps] = useState({ visible: false, title: '', content: '' })
	const commonProps = {
		setModalProps, modalProps
	}
	return (
		<div>
			<h2>平台SKU配置</h2>
			<PlatformHeader />
			<TitleBox title={<div style={{ display: 'flex' }}>
				基础类
				<div style={{ marginLeft: 80, display: 'flex', fontSize: 13 }}>
					<Icon type="exclamation-circle" theme="filled" style={{ color: '#FAAD14', marginRight: 6 }} />
					注：带<span className='red-start'></span>为博主必选项
				</div>
			</div>} />
			<SkuTypeList {...commonProps} />
			<TitleBox title='其他类' />
			{/* <SkuTypeList {...commonProps} /> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(SkuType)
