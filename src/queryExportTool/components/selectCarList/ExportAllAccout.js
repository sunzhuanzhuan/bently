import React, { Component } from 'react';
import { Form, Select, Input, Button, Row, Col, Modal } from 'antd';
import "./index.less"
import { Link } from "react-router-dom";
import CompanySelect from "./CompanySelect";
import TempleSelect from "./TempleSelect";
import moment from 'moment';
import api from '../../../api'
import debounce from 'lodash/debounce';
import { countstrlen } from "../../../util/verification";
import { sensors } from '../../../util/sensor/sensors'
import AuthVisbleIsBP from '@/queryExportTool/containers/AuthVisbleIsBP'
const FormItem = Form.Item
const Option = Select.Option

class EditQuotation extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.vailAccoutName = debounce(this.vailAccoutName, 800);
	}
	saveAndExport = () => {
		this.props.form.validateFields((err, values) => {
			console.log("TCL: EditQuotation -> saveAndExport -> values", values)
			if (!err) {
				values.templateId = values.templateId.key
				values.companyId = values.companyId.key
				this.props.saveQuota(values)

			}
		});

	}
	vailAccoutName = (rule, value, callback) => {
		if (value) {
			const parent = /^[a-zA-Z0-9_\u4e00-\u9fa5 -]+$/
			if (parent.test(value)) {
				if (countstrlen(value) > 60) {
					callback('报价单名称长度不能超过30个字')
				} else {
					api.get('/export/account/verifyQuotaNameIsAvailable', { params: { name: value } }).then(res => {
						if (res.data) {
							callback()
						} else {
							callback("报价单名称不能重复")
						}
					})
				}
			} else {
				callback(`只能输入汉字、字母、数字、空格、“-”或“_”以上六项组合`)
			}
		} else {
			callback()
		}
	}
	vailIntroduction = (rule, value, callback) => {
		if (value) {
			if (countstrlen(value) > 200) {
				callback('备注信息长度不能超过100个字')
			} else {
				callback()
			}
		} else {
			callback()
		}
	}
	setTempleName = (company_id = 0, company_name) => {
		this.props.form.setFieldsValue({
			companyId: { key: company_id, label: company_name ? company_name : "不限" }
		})
	}
	ruleUrlAddTrack = () => {
		sensors.track('AccountSearchEvent', { app_id: 101, sources: "查号导号工具-选号车", position: "添加报价单信息", click_url: "https://wby-download-storage.oss-cn-beijing.aliyuncs.com/trinity/%E7%9F%AD%E8%A7%86%E9%A2%91%E5%B9%B3%E5%8F%B0%E6%94%BF%E7%AD%96%26%E8%A7%84%E5%88%99%E6%A6%82%E8%A7%88.pdf" });
	}
	1234567890
	render() {
		const { getCompanyList, getStencilList, form, createTemplateData = {}, groupTypeName } = this.props
		const { company_id, name, templateId } = createTemplateData
		const { getFieldDecorator, getFieldError } = form
		const formItemLayout = {
			labelCol: { span: 5 },
			wrapperCol: { span: 18 },
		};
		const formItemLayoutOne = {
			labelCol: { span: 6 },
			wrapperCol: { span: 17 },
		};
		return (
			<Form className="export-all-accout">
				<AuthVisbleIsBP isComponent={null} noComponent={[
					<Row style={{ height: 60 }} key='templateId'>
						<Col span={20}>
							<FormItem
								{...formItemLayoutOne}
								label="选择报价单模板"
							>
								{getFieldDecorator('templateId', {
									initialValue: templateId ? { key: templateId, label: name } : { key: 1, label: "默认模板" },
									rules: [
										{ required: true, message: '请选择报价单模板' },
									],
								})(
									<TempleSelect style={{ width: '100%' }} action={getStencilList} setTempleName={this.setTempleName} />
								)}
							</FormItem>
						</Col>
						<Col span={4}>
							<Button type="primary" onClick={this.props.addTemplate}>新建模版</Button>
						</Col>
					</Row>,
					<FormItem
						key='companyId'
						{...formItemLayout}
						label="指定公司使用"
						{...(getFieldError('companyId') ? {} : { help: "选择指定公司后，报价单详情页、最终导出EXCLE中的报价是按照该公司计算公式计算得出；且报价单对所有能看到该公司的AE、销售可见。" })}
					>
						{getFieldDecorator('companyId', {
							initialValue: company_id && company_id.key ? { ...company_id } : { key: 0, label: "不限" },
							rules: [
								{ required: true, message: '指定公司不能为空' },
							],
						})(
							<CompanySelect style={{ width: '100%' }} action={getCompanyList} />
						)}
					</FormItem>]} />

				<FormItem
					{...formItemLayout}
					label="报价单名称"
					{...(getFieldError('name') ? {} : { help: "请填写报价单的模板名称，不超过30个字" })}
				>
					{getFieldDecorator('name', {
						initialValue: `${groupTypeName}${moment().format("YYYY_MM_DD HH_mm")}`,
						validateFirst: true,
						rules: [
							{ required: true, message: '请输入报价单名称' },
							{ validator: this.vailAccoutName }
						],
					})(
						<Input placeholder="多平台年/月/日 时/分" />
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="备注信息"
					{...(getFieldError('introduction') ? {} : { help: "请填写报价单的备注信息，不超过100个字" })}
				>
					{getFieldDecorator('introduction', {
						rules: [
							{ validator: this.vailIntroduction }
						],
					})(
						<Input placeholder="请输入" />
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="三方平台下单规则"
				>
					<a
						href="https://wby-download-storage.oss-cn-beijing.aliyuncs.com/trinity/%E7%9F%AD%E8%A7%86%E9%A2%91%E5%B9%B3%E5%8F%B0%E6%94%BF%E7%AD%96%26%E8%A7%84%E5%88%99%E6%A6%82%E8%A7%88.pdf"
						target="_blank"
						onClick={this.ruleUrlAddTrack}
					>{`查看微博&短视频&小红书平台下单规则`}</a>
				</FormItem>
				<div style={{ textAlign: "center", marginTop: 20, paddingBottom: 20 }}>
					<Button type="primary" onClick={this.saveAndExport}>保存并导出</Button>
				</div>

			</Form >
		);
	}
}
const EditQuotationFrom = Form.create()(EditQuotation);
export default EditQuotationFrom;
