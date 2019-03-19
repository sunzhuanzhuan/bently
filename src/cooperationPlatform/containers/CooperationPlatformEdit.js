
import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from '../actions/index'
import { Form, Button, Modal, Spin, message } from 'antd';
import qs from "qs";
import { BaseInfo } from "../components/cooperationPlatformEdit";
import { PaymentMethod, CooperationMethod, SettlementMethod, DividingBox } from "../components/common";
const defultTime = "YYYY:MM:DD HH:mm:ss"
class CooperationPlatformEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: { title: "", content: "" },
			visable: false,
			id: qs.parse(window.location.search.substring(1)).id,
			cooperationPlatformInfoDetail: {},
			isLoading: false,
			saveLoading: false
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
			const { actions: { insertCooperationPlatform, updateCooperationPlatform }, cooperationPlatformReducer: { platformSelect } } = this.props
			const { id } = this.state
			//平台名称
			values.platformName = platformSelect.map[values.platformId].platformName
			//付款公司
			values.agentVo.paymentCompanyName = values.agentVo.paymentCompanyCode == 'ZF0001' ? '布谷鸟' : '微播易'
			console.log('Received values of form: ', values);
			if (!err) {
				this.setState({
					saveLoading: true
				})
				if (id > 0) {
					updateCooperationPlatform({ ...values, id: id, }).then(() => {
						message.success('您所提交的信息已经保存成功！')
						this.setState({
							saveLoading: false
						})
						window.location.href = "/config/platform/list";
					})
				} else {
					insertCooperationPlatform({ ...values, }).then(() => {
						message.success('您所提交的信息已经保存成功！')
						this.setState({
							saveLoading: false
						})
						window.location.href = "/config/platform/list";
					})

				}
			}
		});
	}
	onClean = () => {
		this.props.form.resetFields()
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
		const { showModal, visable, cooperationPlatformInfoDetail, isLoading, saveLoading } = this.state
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
					<div style={{ float: "right" }}>
						<Button type="primary" onClick={this.onEditSave} loading={saveLoading}>提交</Button>
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
			</Spin>
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
