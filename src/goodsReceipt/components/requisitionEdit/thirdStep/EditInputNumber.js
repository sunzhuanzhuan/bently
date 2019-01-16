import React, { Component } from 'react'
import { InputNumber, Form, Spin, } from 'antd';
import qs from "qs";
import "../EditServiceRate.less";
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
		setEditState && setEditState({ editTotalMountDStatus: true })
	}
	cancleClick = () => {
		this.setState({
			isVerifica: false,
			editable: false,
		})
		const { setEditState } = this.props
		setEditState && setEditState({ editTotalMountDStatus: false })
	}
	okClick = () => {

		const { onChange, updateBaseInfo, labelKey, setStateThird } = this.props
		this.props.form.validateFields((err, values) => {
			setStateThird({ totalAmountLoading: true })
			if (!err) {
				if (updateBaseInfo) {
					const isUsd = values.currency_type == 2
					updateBaseInfo({
						gr_id: qs.parse(window.location.search.slice(1)).gr_id,
						continue_submit: 2,//是否保存后继续提
						[labelKey]: values.total_amount_rate
					}).then((res) => {
						this.setState({
							value: values.total_amount_rate,
							editable: false
						})
						onChange && onChange(values.total_amount_rate)
						this.props.form.setFieldsValue({ total_amount: values.total_amount_rate })//修改总金额
						this.props.form.setFieldsValue({ total_amount_rate: values.total_amount_rate })//修改总金额
						setStateThird({ totalAmountLoading: false })
					})
					const { setEditState } = this.props
					setEditState && setEditState({ editTotalMountDStatus: false })
				}
			}
		});
	}
	componentWillReceiveProps = (nextProps) => {
		if ("value" in nextProps) {
			this.setState({ value: nextProps.value })
		}
	}

	render() {
		const { value, editable, isVerifica } = this.state;
		const { getFieldDecorator } = this.props.form;
		const { messageError = "请输入服务费率", vailPrice = {}, totalAmountLoading, unit = "", } = this.props
		return (
			<span className="edit-service-rate" style={{ marginLeft: 10 }} >
				{editable ?
					<FormItem>
						<div style={{ float: "left" }} >
							<Spin spinning={totalAmountLoading} style={{ height: 30 }}>
								{getFieldDecorator('total_amount_rate', {
									initialValue: value,
									validateFirst: true,
									rules: [{ required: isVerifica, message: messageError },
									{ validator: vailPrice }],
								})(
									<InputNumber
										step={0.01}
										onChange={this.handleChange}
										onPressEnter={this.check}
										className="edit-service-rate-value"
									/>
								)}
							</Spin>
						</div>
						<span>
							<span style={{ paddingLeft: unit ? 9 : 0 }}>{unit}</span>
							<a className="edit-service-rate-operate" onClick={this.okClick}>确定修改</a>
							<a className="edit-service-rate-operate" onClick={this.cancleClick}>取消修改</a>
						</span>
					</FormItem>
					: <span>
						<FormItem>
							<div style={{ float: "left" }} >
								<Spin spinning={totalAmountLoading} style={{ height: 30 }}>
									<InputNumber
										step={0.01}
										className="edit-service-rate-value"
										disabled
										value={value}
									/>
								</Spin >
							</div>
							<span style={{ paddingLeft: unit ? 9 : 0 }}>{unit}</span>
							<a className="edit-service-rate-operate" onClick={this.editClick}>修改</a>
						</FormItem>
					</span>}

			</span >
		);
	}
}


export default EditServiceRate;
