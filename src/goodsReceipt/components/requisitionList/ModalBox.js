import React, { Component } from 'react'
import { Button } from "antd";
class ModalBox extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	onOk = () => {
		const { cancelApplyGROperate, auditOperate, typeOperate } = this.props
		if (typeOperate == "adit") {
			auditOperate({ audit_type: 1 })
		} else {
			cancelApplyGROperate()
		}
	}
	render() {
		const { text, onCancel } = this.props
		return (
			<div>
				<div style={{ paddingBottom: 20, toperateGRextAlign: "center", fontSize: 14 }}>{text}</div>
				<div style={{ textAlign: "right" }}>
					<Button onClick={onCancel}>取消</Button>
					<Button type="primary" style={{ marginLeft: 20 }}
						onClick={this.onOk}>确定</Button>
				</div>
			</div>
		);
	}
}

export default ModalBox;
