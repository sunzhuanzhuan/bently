
import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from '../actions/index'
import { Form, Button, Modal, Spin } from 'antd';
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
			isLoading: false
		};
	}
	componentDidMount = () => {
		const { id } = this.state
		const { actions } = this.props
		this.props.form.resetFields()
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
	onSearch = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			const { actions: { insertCooperationPlatform, updateCooperationPlatform } } = this.props
			const { id } = this.state
			if (!err) {
				console.log('Received values of form: ', values);
				if (id > 0) {
					updateCooperationPlatform({ ...values, id: id })
				} else {
					insertCooperationPlatform(values)
				}
			}
		});
	}
	onClean = () => {
		this.props.form.resetFields()
	}

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
		const { showModal, visable, cooperationPlatformInfoDetail, isLoading } = this.state
		const formLayout = {
			labelCol: { span: 4 },
			wrapperCol: { span: 20 },
		}
		const { platformSelect } = cooperationPlatformReducer
		const commonProps = {
			form,
			formLayout,
			setShowModal: this.setShowModal,
			dataDefault: cooperationPlatformInfoDetail.agentVO,
			cooperationPlatformInfoDetail,
			platformSelect,
			actions
		}
		return (
			<Spin spinning={isLoading}>
				<Form layout="horizontal">
					<DividingBox text="平台基本信息" />
					<BaseInfo {...commonProps} />
					<DividingBox text="平台合作信息" />
					<CooperationMethod {...commonProps} />
					<SettlementMethod {...commonProps} />
					<PaymentMethod  {...commonProps} />
					<div style={{ float: "right" }}>
						<Button type="primary" onClick={this.onSearch}>提交</Button>
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
