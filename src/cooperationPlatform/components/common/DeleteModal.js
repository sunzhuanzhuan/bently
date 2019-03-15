import React, { Component } from 'react'
import { Modal, Icon } from 'antd';
const confirm = Modal.confirm;
class DeleteModal extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	showDeleteConfirm = () => {
		const { onDelete, onCancelDelete, messageType = 'delete' } = this.props
		const messageMap = {
			"delete": "是否确认删除，确认后将无法恢复，请谨慎操作？",
			"cancle": "取消后您的信息将无法保存，是否确认此操作？",
			"set": "是否确认将该平台的报价项设置为默认报价项？"
		}
		confirm({
			title: '温馨提示',
			content: messageMap[messageType],
			okText: '继续',
			cancelText: '取消',
			icon: "exclamation-circle",
			iconType: "exclamation-circle",
			onOk() {
				onDelete && onDelete()
			},
			onCancel() {
				onCancelDelete && onCancelDelete();
			},
		});
	}
	render() {
		const { typeText = '删除' } = this.props
		return (
			<a onClick={this.showDeleteConfirm}>{typeText}</a>
		);
	}
}

export default DeleteModal;
