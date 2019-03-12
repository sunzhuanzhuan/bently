
import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from '../actions/index'
import { Form, Button, Modal } from 'antd';
import { BaseInfo } from "../components/cooperationPlatformEdit";
import { PaymentMethod, CooperationMethod, SettlementMethod, DividingBox } from "../components/common";
const defultTime = "YYYY:MM:DD HH:mm:ss"
class CooperationPlatformEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: { title: "", content: "" },
			visable: false,

		};
	}
	onSearch = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			const { time } = values
			if (!err) {
				const begin = time && time[0] && time[0].format(defultTime)
				const end = time && time[0] && time[0].format(defultTime)
				console.log('Received values of form: ', values, begin, end);
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
		const { form } = this.props
		const { showModal, visable, } = this.state
		const formLayout = {
			labelCol: { span: 4 },
			wrapperCol: { span: 20 },
		}
		const commonProps = {
			form,
			formLayout,
			setShowModal: this.setShowModal
		}
		return (
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
