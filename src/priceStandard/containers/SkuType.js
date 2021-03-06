import React, { useState, useEffect } from 'react'
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import { connect } from "react-redux";
import PlatformHeader from '../base/PlatformHeader'
import CardType from '../components/CardType'
import TitleBox from '../base/TitleBox'
import SkuTypeEdit from '../components/SkuTypeEdit'
import { Icon, Modal, Spin, message } from 'antd';
const titleStyle = {
	color: '#666',
	fontWeight: '400'
}
function SkuType(props) {
	const [modalProps, setModalProps] = useState({ visible: false, title: '', content: '' })
	const [platformId, setPlatformId] = useState('9')
	const [isLoading, setIsLoading] = useState(true)
	const [platformName, setPlatformName] = useState('微信公众号')
	useEffect(() => {
		props.actions.PSGetNewBPlatforms()
	}, [])
	useEffect(() => {
		getPlatformSkuTypeEquitiesAsync()
	}, [platformId])
	//查询
	async function getPlatformSkuTypeEquitiesAsync() {
		setIsLoading(true)
		await props.actions.getPlatformSkuTypeEquities({ platformId: platformId })
		setIsLoading(false)
	}
	//修改
	function onEdit(data = {}) {
		console.log("onEdit -> data", data)

		setModalProps({
			visible: true,
			width: '1000px',
			title: <div>修改SKU配置
				<span style={{ marginLeft: 30 }}>
					<span style={titleStyle}>平台：</span>{platformName}
				</span>
				<span style={{ marginLeft: 30 }}>
					<span style={titleStyle}>sku类型：</span>{data.skuTypeName}
				</span>
			</div>,
			content: (props) => <SkuTypeEdit data={data} {...props} />
		})
	}
	//修改接口
	async function platformSkuUpdateEquitiesAsync(data) {
		await props.actions.platformSkuUpdateEquities(data)
		message.success('操作成功')
		onCancel()
		getPlatformSkuTypeEquitiesAsync()
	}
	function onCancel() {
		setModalProps({ visible: false })
	}
	//获取修改数据
	async function getCanUpdateSkuTypeEquitiesAsync(skuTypeId) {
		props.actions.getCanUpdateSkuTypeEquities({ platformId: platformId, skuTypeId: skuTypeId })
	}
	const { priceStandard = {}, actions } = props
	const { skuList = [], skuBaseList = [], skuUpdateList = [], newBPlatformsList } = priceStandard
	const commonProps = {
		setModalProps, modalProps,
		getCanUpdateSkuTypeEquitiesAsync, skuUpdateList, platformId
		, skuList, skuBaseList, platformSkuUpdateEquitiesAsync, onCancel
	}
	return (
		<div>
			<h2>平台SKU配置</h2>
			<Spin spinning={isLoading}>
				<PlatformHeader setId={setPlatformId} list={newBPlatformsList} setName={setPlatformName} />
				<TitleBox title='基础类' />
				{skuBaseList.map((item, index) => <CardType key={index}
					onEdit={() => onEdit(item)}
					showDelete={false}
					data={item} />)}

				<TitleBox title='其他类' />
				{skuList.map((item, index) => <CardType key={index}
					onEdit={() => onEdit(item)}
					showDelete={false}
					data={item} />)}
			</Spin>
			<Modal
				footer={null}
				{...modalProps}
				maskClosable={false}
				onCancel={onCancel}
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
