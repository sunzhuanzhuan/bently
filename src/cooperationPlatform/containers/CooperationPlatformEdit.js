
import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from '../actions/index'
import { Form, Button, Modal, Spin, message } from 'antd';
import qs from "qs";
import { BaseInfo } from "../components/cooperationPlatformEdit";
import { PaymentMethod, CooperationMethod, SettlementMethod, DividingBox, DeleteModal } from "../components/common";
class CooperationPlatformEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: { title: "", content: "" },
			visable: false,
			id: qs.parse(window.location.search.substring(1)).id,
			cooperationPlatformInfoDetail: {},
			isLoading: false,
		};
	}
	componentDidMount = async () => {
		const { id } = this.state
		const { actions } = this.props
		this.props.form.resetFields()
		//修改获取下拉框数据
		if (id > 0) {
			this.setState({ isLoading: true })
			const { data } = await actions.getCooperationPlatformInfoById({ id: id })
			this.setState({
				cooperationPlatformInfoDetail: data,
				isLoading: false
			})
		}
		actions.getExistTrinityPlatformList()
	}
	//保存数据
	onEditSave = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			const { cooperationPlatformReducer: { platformSelect } } = this.props
			//平台名称
			values.platformName = platformSelect.map[values.platformId].platformName
			//付款公司
			values.agentVo.paymentCompanyName = values.agentVo.paymentCompanyCode == 'ZF0001' ? '布谷鸟' : '微播易'
			if (!err) {
				this.editOprate(values)
			}
		});
	}
	editOprate = async (values) => {
		const { id } = this.state
		const search = qs.parse(window.location.search.substring(1))
		const { actions: { insertCooperationPlatform, updateCooperationPlatform, addOrUpdateTollType, getTrinitySkuTypeList } } = this.props
		if (id > 0) {
			if (values.agentVo.paymentType == 1) {
				values.agentVo.alipayAccountName = ""
				values.agentVo.alipayAccount = ""
			} else {
				values.agentVo.bankAgency = ""
				values.agentVo.bankAgencyProvince = ""
				values.agentVo.bankAgencyCity = ""
				values.agentVo.realName = ""
				values.agentVo.bank = ""
				values.agentVo.cardNumber = ""
			}
			if (values.agentVo.cooperationType == 1) {
				values.agentVo.cooperationRemark = ""
			} else {
				values.agentVo.refundRate = ""
			}
			const { trinityTollTypeVOS = [] } = values
			//修改时，消费类型信息 trinityTollTypeVOS 列表
			if (trinityTollTypeVOS.length > 0) {
				const list = values.trinityTollTypeVOS.map(one => {
					return {
						...one,
						cooperationPlatformKey: values.cooperationPlatformKey,
						trinityPlatformCode: search.code,
						platformId: search.platformId
					}
				})
				//修改时，异步修改消费类型信息
				await addOrUpdateTollType(list)
			}
			await updateCooperationPlatform({ ...values, id: id, })
		} else {
			await insertCooperationPlatform({ ...values, })
		}
		message.success('您所提交的信息已经保存成功！', 2).then(this.jumpPage)

	}
	jumpPage = () => {
		window.location.href = "/config/platform/list";
	}
	//弹窗方法
	setShowModal = (isVisable, showModal) => {
		this.setState({
			visable: isVisable,
			showModal: showModal
		})
	}
	handleCancel = () => {
		this.setState({ visable: false })
	}
	render() {
		const { form, cooperationPlatformReducer, actions } = this.props
		const { showModal, visable, cooperationPlatformInfoDetail, isLoading, id } = this.state
		const formLayout = {
			labelCol: { span: 4 },
			wrapperCol: { span: 20 },
		}
		const { platformSelect } = cooperationPlatformReducer
		const commonProps = {
			form,
			formLayout,
			setShowModal: this.setShowModal,
			dataDefault: cooperationPlatformInfoDetail.agentVo,
			cooperationPlatformInfoDetail,
			platformSelect,
			actions,
			cooperationPlatformReducer
		}

		return (
			<Spin spinning={isLoading && Object.keys(cooperationPlatformInfoDetail).length > 0}>
				<h2>{`${id > 0 ? '修改' : '新增'}合作平台`}</h2>
				<Form layout="horizontal">
					<DividingBox text="平台基本信息" />
					<BaseInfo {...commonProps} />
					<DividingBox text="平台合作信息" />
					<div style={{ width: '60%', marginLeft: '6.6%' }}>
						<CooperationMethod {...commonProps} />
					</div>
					<SettlementMethod {...commonProps} />
					<div style={{ width: '60%', marginLeft: '6.6%' }}>
						<PaymentMethod  {...commonProps} />
					</div>

					<div style={{ textAlign: "center", margin: '40px auto' }}>
						<Button style={{ marginRight: 50 }}><DeleteModal typeText={'取消'} messageType='cancle' onDelete={this.jumpPage} /></Button>
						<Button type="primary" onClick={this.onEditSave} >提交</Button>
					</div>
					<Modal
						title={showModal && showModal.title}
						visible={visable}
						onCancel={this.handleCancel}
						footer={null}
						maskClosable={false}
					>
						{showModal && showModal.content}
					</Modal>
				</Form>
			</Spin >
		);
	}
}
const CooperationPlatformEditFrom = Form.create()(CooperationPlatformEdit);
const mapStateToProps = (state) => {
	return {
		cooperationPlatformReducer: state.cooperationPlatformReducer
	}
}
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(action, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(CooperationPlatformEditFrom);
