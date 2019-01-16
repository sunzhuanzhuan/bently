import React, { Component } from 'react'
import { InputNumber, Form } from 'antd';
import qs from "qs";
import "./EditServiceRate.less";
const FormItem = Form.Item
class EditServiceRate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value,
			editable: false,
			isVerifica: true
		};
	}
	editClick = () => {
		this.setState({
			editable: true
		})
		const { setEditState } = this.props
		setEditState && setEditState({ editServiceRateStatus: true })
	}
	cancleClick = () => {
		this.setState({
			isVerifica: false,
			editable: false,
		})
		const { setEditState } = this.props
		setEditState && setEditState({ editServiceRateStatus: false })
	}
	okClick = () => {
		const { onChange, changeAction, searchActionByFree } = this.props
		this.props.form.validateFields((err, values) => {
			if (!err) {
				changeAction({
					gr_id: qs.parse(window.location.search.slice(1)).gr_id,
					service_fee_rate: values.serviceRate,
				}).then(() => {
					this.setState({
						value: values.serviceRate,
						editable: false
					})
					onChange && onChange(values.serviceRate)
					searchActionByFree && searchActionByFree()
				})
				const { setEditState } = this.props
				setEditState && setEditState({ editServiceRateStatus: false })
			}
		});
	}

	render() {
		const { value, editable, isVerifica } = this.state;
		const { getFieldDecorator } = this.props.form;
		const { messageError = "请填写服务费率", vailPrice = {}, inputNumberProps = {}, unit = "", minError } = this.props
		return (
			<span className="edit-service-rate">

				{editable ?
					<FormItem>
						{getFieldDecorator('serviceRate', {
							initialValue: value,
							validateFirst: true,
							rules: [
								{ required: isVerifica, message: messageError },
								{ validator: vailPrice },
							],
						})(
							<InputNumber
								step={0.01}
								{...inputNumberProps}
								onChange={this.handleChange}
								onPressEnter={this.check}
								className="edit-service-rate-value"
							/>
						)}
						<span>
							<span style={{ paddingLeft: unit ? 9 : 0 }}>{unit}</span>
							<a className="edit-service-rate-operate" onClick={this.okClick}>确定修改</a>
							<a className="edit-service-rate-operate" onClick={this.cancleClick}>取消修改</a>
						</span>
					</FormItem>
					: <span>
						<FormItem>
							<InputNumber
								step={0.01}
								className="edit-service-rate-value"
								disabled
								value={value} />
							<span style={{ paddingLeft: unit ? 9 : 0 }}>{unit}</span>
							<a className="edit-service-rate-operate" onClick={this.editClick}>修改</a>
						</FormItem>
					</span>}

			</span >
		);
	}
}


export default EditServiceRate;
