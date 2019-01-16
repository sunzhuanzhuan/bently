import React, { Component } from 'react'
import { InputNumber, Form, message } from 'antd';
import qs from "qs";
import "./EditInputNumberBlur.less";
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
	}
	cancleClick = () => {
		this.setState({
			isVerifica: false,
			editable: false,
		})
	}
	okClick = () => {

		const { onChange, updateBaseInfo, labelKey } = this.props
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if (updateBaseInfo) {
					const isUsd = values.currency_type == 2
					updateBaseInfo({
						gr_id: qs.parse(window.location.search.slice(1)).gr_id,
						continue_submit: 2,//是否保存后继续提
						[labelKey]: values.price
					}).then((res) => {
						this.setState({
							value: values.price,
							editable: false
						})
						onChange && onChange(values.price)
						const total_amount = isUsd ? res.data.total_amount_usd : res.data.total_amount
						this.props.form.setFieldsValue({ total_amount: total_amount })//修改总金额
						this.props.form.setFieldsValue({ total_amount_rate: total_amount })//修改总金额
					})
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
		const { messageError = "请输入服务费率", vailPrice = {}, inputNumberStep = "0.01", unit = "" } = this.props
		return (
			<span className="edit-service-rate-blur">
				{editable ?
					<FormItem>
						{getFieldDecorator('price', {
							initialValue: value,
							validateFirst: true,
							rules: [{ required: isVerifica, message: messageError },
							{ validator: vailPrice }],
						})(
							<InputNumber
								step={inputNumberStep}
								onChange={this.handleChange}
								onPressEnter={this.check}
								className="edit-service-rate-value-pointer"
								onBlur={this.okClick}
							/>
						)}{unit}
					</FormItem>
					: <span onClick={this.editClick}>
						<FormItem>
							<InputNumber
								step={inputNumberStep}
								className="edit-service-rate-value-pointer"
								disabled
								value={value} />{unit}
						</FormItem>
					</span>}

			</span >
		);
	}
}


export default EditServiceRate;
