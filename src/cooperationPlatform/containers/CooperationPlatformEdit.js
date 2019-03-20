
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
	componentDidMount = () => {
		const { id } = this.state
		const { actions } = this.props
		this.props.form.resetFields()
		//修改获取下拉框数据
		if (id > 0) {
			this.setState({ isLoading: true })
			actions.getCooperationPlatformInfoById({ id: id }).then(({ data }) => {
				this.setState({
					cooperationPlatformInfoDetail: data,
					isLoading: false
				})
			})
		}
		actions.getPlatform()
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
			console.log('Received values of form: ', values);
			if (!err) {
				this.editOprate(values)
			}
		});
	}
	editOprate = async (values) => {
		const { id } = this.state
		const search = qs.parse(window.location.search.substring(1))
		const { actions: { insertCooperationPlatform, updateCooperationPlatform, getTrinitySkuTypeList } } = this.props
		if (id > 0) {
			//如果平台启用则修改时校验报价项是否有启用
			if (search.status == 1) {
				const { data } = await getTrinitySkuTypeList({ trinityPlatformCode: search.code, trinitySkuTypeStatus: 1 });
				if (data.length > 0) {
					await updateCooperationPlatform({ ...values, id: id, })
					message.success('您所提交的信息已经保存成功！')
					this.jumpPage()
				} else {
					message.error('请您至少启用一条报价项，以免影响正常下单')
				}
			} else {
				await updateCooperationPlatform({ ...values, id: id, })
				message.success('您所提交的信息已经保存成功！')
				this.jumpPage()
			}
		} else {
			await insertCooperationPlatform({ ...values, })
			message.success('您所提交的信息已经保存成功！')
			this.jumpPage()
		}

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
		const { showModal, visable, cooperationPlatformInfoDetail, isLoading, } = this.state
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
				<Form layout="horizontal">
					<DividingBox text="平台基本信息" />
					<BaseInfo {...commonProps} />
					<DividingBox text="平台合作信息" />
					<CooperationMethod {...commonProps} />
					<SettlementMethod {...commonProps} />
					<PaymentMethod  {...commonProps} />
					<div style={{ textAlign: "center", margin: '40px auto' }}>
						<Button style={{ marginRight: 50 }}><DeleteModal typeText={'取消'} onDelete={this.jumpPage} /></Button>
						<Button type="primary" onClick={this.onEditSave} >提交</Button>
					</div>
					<Modal
						title={showModal && showModal.title}
						visible={visable}
						onCancel={this.handleCancel}
						footer={null}
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
