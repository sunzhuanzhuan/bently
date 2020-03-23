import React, { useState, useEffect } from 'react'
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import { connect } from "react-redux";
import { Modal, Button, Icon, Spin, message } from 'antd';
import PlatformHeader from '../base/PlatformHeader'
import CardType from '../components/CardType'
import PlatformAdd from '../components/PlatformAdd'
import PlatformUpdate from '../components/PlatformUpdate'

const titleStyle = {
	color: '#666',
	fontWeight: '400'
}
function PlatformConfig(props) {
	const [modalProps, setModalProps] = useState({ visible: false, title: '', content: '' })
	const [groupTypeId, setGroupTypeId] = useState('1')
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		getEquitiesByGroupTypeIdAsync()
	}, [groupTypeId])
	//查询
	async function getEquitiesByGroupTypeIdAsync() {
		await props.actions.getEquitiesByGroupTypeId(groupTypeId)
		setIsLoading(false)
	}
	function onAdd(data) {
		setModalProps({
			visible: true,
			width: '666px',
			title: <div> 添加SKU配置
				<span style={{ marginLeft: 30 }}>
					<span style={titleStyle}>平台：</span>微信
				</span>
			</div>,
			content: (props) => <PlatformAdd data={data} {...props} />
		})
	}
	function onUpdate(data) {
		setModalProps({
			visible: true,
			width: '666px',
			title: <div> 修改SKU配置
				<span style={{ marginLeft: 30 }}>
					<span style={titleStyle}>平台：</span>微信
				</span>
			</div>,
			content: (props) => <PlatformUpdate data={data} {...props} />
		})
	}
	//修改
	async function groupTypeUpdateEquitiesAsync(params) {
		console.log("groupTypeUpdateEquitiesAsync -> params", params)
		await props.actions.groupTypeUpdateEquities(params)
		message.success('操作成功')
		onCancel()
		getEquitiesByGroupTypeIdAsync()
	}
	//查询列表
	async function getSystemEquitiesAsync() {
		await props.actions.getSystemEquities()
		setIsLoading(false)
	}
	function onCancel() {
		setModalProps({ visible: false })
	}
	const { priceStandard = {} } = props
	const { platformList } = priceStandard
	const commonProps = {
		setModalProps, modalProps, onAdd, platformList, groupTypeUpdateEquitiesAsync, groupTypeId, onCancel
	}
	return (
		<div>
			<h2>平台权益池配置</h2>
			<Spin spinning={isLoading}>
				<PlatformHeader setId={setGroupTypeId} />
				<div style={{ marginTop: 18 }}>
					<Button type='primary' onClick={onAdd}>+ 添加平台权益</Button>
					<span style={{ marginLeft: 31 }}><Icon type="info-circle" theme="filled" className='warning-info' /> 注：若权益已被平台SKU配置，则不可删除。</span>
				</div>
				<div>
					{platformList.map(item => <CardType onEdit={onUpdate} data={item} key={item.id} />)}
				</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(PlatformConfig)
