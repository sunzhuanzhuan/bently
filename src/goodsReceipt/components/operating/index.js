import React, { Component } from 'react'
import { Modal, message, Button } from "antd";
import AuditRejectionForm from "../requisitionList/AuditRejectionForm";
import ModalBox from "../requisitionList/ModalBox";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from '../../actions/index'
import { withRouter, Link } from "react-router-dom";
import apiDownload from '../../../api/apiDownload'
import qs from 'qs'
class Operating extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			modalType: 1
		};
	}
	showModal = (modalType, gr_id) => {
		this.setState({
			visible: true,
			modalType: modalType,
			gr_id: gr_id
		})
	}
	onCancel = () => {
		this.setState({
			visible: false,
		})
	}
	//审核 audit_type:1-内审通过 2内审拒绝
	auditOperate = (value) => {
		const { getGRListOperateAfter } = this.props
		this.props.actions.audit({
			gr_id: this.state.gr_id,
			...value
		}).then(() => {
			message.success(value.audit_type == 1 ? "GR申请单审核通过" : "GR申请单审核拒绝")
			this.onCancel()
			getGRListOperateAfter && getGRListOperateAfter()
		})
	}

	//复制
	copyGROperate = (gr_id) => {
		this.props.actions.copyGR({
			gr_id: gr_id,
		}).then((res) => {
			message.success("复制成功")
			this.onCancel()
			this.props.history.push(`${this.props.GReditUrl}/0?gr_id=${res.data.gr_id}&typeOperate=copy`)
		})
	}
	//作废
	cancelApplyGROperate = (gr_id) => {
		const { getGRListOperateAfter } = this.props
		this.props.actions.cancelApplyGR({
			gr_id: this.state.gr_id,
		}).then((res) => {
			message.success("GR申请单作废成功")
			this.onCancel()
			getGRListOperateAfter && getGRListOperateAfter()
		})
	}
	//导出Excel
	exportExcel = () => {
		const { gr_id } = this.props
		message.loading('正在导出...', 3)
		apiDownload({
			url: '/gr/exportGROrderExcel' + '?' + qs.stringify({ gr_id: gr_id }),
			method: 'GET',
		}, `【GR】${gr_id}_Details.xlsx`)
	}
	render() {
		const { visible, modalType } = this.state
		const modalMap = {
			cancel: <ModalBox
				text="是否确认作废当前GR申请单"
				cancelApplyGROperate={this.cancelApplyGROperate}
				onCancel={this.onCancel}
			/>,
			internal_audit: <ModalBox
				text="是否确认审核通过当前GR申请单"
				auditOperate={this.auditOperate}
				onCancel={this.onCancel}
				typeOperate="adit"
			/>,
			internal_refuse: <AuditRejectionForm
				auditOperate={this.auditOperate}
				onCancel={this.onCancel}
			/>
		}
		const { operateType, gr_id, text, GReditUrl } = this.props
		return (
			<div>
				{operateType == "copy" ? <div onClick={() => this.copyGROperate(gr_id)}>{text}</div> :
					operateType == "modify" ? <Link to={`${GReditUrl}/0?gr_id=${gr_id}&typeOperate=modify`}>
						{text}
					</Link> :
						operateType == 'internal_export' ? <span onClick={this.exportExcel}>{text}</span>
							: <div onClick={() => { this.showModal(operateType, gr_id) }}>{text}</div>
				}
				<Modal
					title="提示"
					visible={visible}
					onCancel={this.onCancel}
					onOk={this.onOk}
					footer={false}
					width={450}
				>
					{modalMap[modalType]}
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		goodsReceipt: state.goodsReceipt
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(action, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(Operating))

