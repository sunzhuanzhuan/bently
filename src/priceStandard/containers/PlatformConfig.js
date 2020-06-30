import React, { useState, useEffect } from 'react'
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import { connect } from "react-redux";
import { Modal, Button, Icon, Spin, message } from 'antd';
import { GroupHeader } from '../base/PlatformHeader'
import CardType from '../components/CardType'
import PlatformAdd from '../components/PlatformAdd'
import PlatformUpdate from '../components/PlatformUpdate'
import HCPopover from '../base/HCPopover'
const titleStyle = {
	color: '#666',
	fontWeight: '400'
}
function PlatformConfig(props) {
	const [modalProps, setModalProps] = useState({ visible: false, title: '', content: '' })
	const [groupTypeId, setGroupTypeId] = useState('1')
	const [isLoading, setIsLoading] = useState(true)
	const [platformName, setPlatformName] = useState('微信公众号')

	useEffect(() => {
		props.actions.PSGetGroupPlatformList()
	}, [])
	useEffect(() => {
		getEquitiesByGroupTypeIdAsync()
	}, [groupTypeId])
	//查询
	async function getEquitiesByGroupTypeIdAsync() {
		setIsLoading(true)
		await props.actions.getEquitiesByGroupTypeId({ groupTypeId: groupTypeId })
		setIsLoading(false)
	}
	//添加弹窗
	function onAdd(data) {
		setModalProps({
			visible: true,
			width: '666px',
			title: <div> 添加SKU配置
				<span style={{ marginLeft: 30 }}>
					<span style={titleStyle}>平台：</span>{platformName}
				</span>
			</div>,
			content: (props) => <PlatformAdd data={data} {...props} />
		})
	}
	//获取添加弹窗选中内容
	async function getUnUseEquitiesByGroupTypeIdAsync() {
		await props.actions.getUnUseEquitiesByGroupTypeId({ groupTypeId: groupTypeId })
	}
	//添加接口
	async function groupTypeAddOrUpdateEquitiesAsync(params) {
		await props.actions.groupTypeAddOrUpdateEquities(params)
		message.success('操作成功')
		onCancel()
		getEquitiesByGroupTypeIdAsync()
	}
	//修改弹窗
	function onUpdate(data) {
		setModalProps({
			visible: true,
			width: '666px',
			title: <div> 修改SKU配置
				<span style={{ marginLeft: 30 }}>
					<span style={titleStyle}>平台：</span>{platformName}
				</span>
			</div>,
			content: (props) => <PlatformUpdate data={data} {...props} />
		})
	}

	//删除
	async function deleteEquitiesTypeByGroupTypeIdAsync(id) {
		await props.actions.deleteEquitiesTypeByGroupTypeId({ equitiesTypeId: id, groupTypeId: groupTypeId })
		message.success('操作成功')
		getEquitiesByGroupTypeIdAsync()
	}

	function onCancel() {
		setModalProps({ visible: false })
	}
	const { priceStandard = {}, authorizationsReducers = {} } = props
	const { platformList, platformNoUsedList, groupPlatformList } = priceStandard
	const systemEquitiesConfig = authorizationsReducers.authVisibleList['system.equities.config']

	const commonProps = {
		setModalProps, modalProps, onAdd, platformList,
		groupTypeId, onCancel, systemEquitiesConfig,
		getUnUseEquitiesByGroupTypeIdAsync, platformNoUsedList, groupTypeAddOrUpdateEquitiesAsync
	}
	return (
		<div>
			<h2>平台权益池配置</h2>
			<Spin spinning={isLoading}>
				<GroupHeader setId={setGroupTypeId} list={groupPlatformList} setName={setPlatformName} />
				<div style={{ marginTop: 18 }}>
					<Button type='primary' onClick={onAdd}>+ 添加平台权益</Button>
					<span style={{ marginLeft: 31 }}><Icon type="info-circle" theme="filled" className='warning-info' /> 注：若权益已被平台SKU配置，则不可删除。</span>
				</div>
				<div>
					{platformList.map((item, index) => <CardType
						onEdit={onUpdate}
						onDelete={() => deleteEquitiesTypeByGroupTypeIdAsync(item.id)}
						data={{
							...item,
							isUsed: (item.skuTypeNames || []).length > 0 ? 1 : 2//占用平台名称数组有数据,则被占用即isUsed=1
						}}
						key={index}
						reason={<div>
							该权益目前在以下SKU类型中配置，不可删除。
								<div className='plat-gray-type-no-delete'>
								{(item.skuTypeNames || []).join('；')}
							</div>
						</div>
						}
					/>)}
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
		priceStandard: state.priceStandard,
		authorizationsReducers: state.authorizationsReducers,
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...actions }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(PlatformConfig)
