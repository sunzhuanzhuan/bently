import React, { Component } from 'react';
import { Form, Button, message } from 'antd';
//推广产品所属行业组件
import SingleBoxList from "../base/SingleBoxList";
const FormItem = Form.Item;
class IndustryCategory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//推广产品所属行业的值
			valueCategoryCode: 0,
			//是否展示推广产品所属行业弹窗
			visbleShowCode: false,
			//初始化页面
		}
		this.isFirstInitialize = true
	}
	componentWillReceiveProps(nextProps) {
		const { isNeedDefault, videoCampaignInfo, isvideoCampaignInfo } = this.props
		if (isNeedDefault && isvideoCampaignInfo && this.isFirstInitialize) {
			const valueCategoryCode = videoCampaignInfo && videoCampaignInfo.industry_category_code
			this.setState({ valueCategoryCode })
			this.isFirstInitialize = false
		}
	}
	//是否展示推广产品所属行业弹窗
	isShowCode = () => {
		const { visbleShowCode } = this.state
		this.setState({
			visbleShowCode: !visbleShowCode
		})
	}
	//设置推广产品所属行业的值
	setIndustryCategoryCode = (value) => {
		if (value !== -1) {
			this.props.setFieldsValue({
				industry_category_code: value
			})
			this.isShowCode()
			this.setState({
				valueCategoryCode: value
			})
		} else {
			message.error("请至少选择一个所属行业")
		}
	}
	render() {
		const { valueCategoryCode, visbleShowCode } = this.state
		const { formItemLayout, getFieldDecorator, videoCampaignInfo, industryMap, industryList } = this.props
		return (
			<div>
				<FormItem {...formItemLayout} label="推广产品所属行业">
					{getFieldDecorator('industry_category_code', {
						initialValue: videoCampaignInfo && videoCampaignInfo.industry_category_code,
						rules: [{
							required: true, message: '请选择推广产品所属行业',
						}],
					})(
						<span>
							<span style={{ paddingRight: 14 }} >
								{industryMap && industryMap[valueCategoryCode] && industryMap[valueCategoryCode].name}
							</span>
							<Button type="primary" onClick={this.isShowCode}>{valueCategoryCode || videoCampaignInfo && videoCampaignInfo.industry_category_code ? "修改" : "选择"}</Button>
						</span>
					)}
				</FormItem>
				{visbleShowCode ? <SingleBoxList
					footer={false}
					value={valueCategoryCode}
					visible={visbleShowCode}
					onChange={this.setIndustryCategoryCode}
					onCancel={this.isShowCode}
					items={industryList && industryList || []} /> : null}
			</div>
		);
	}
}

export default IndustryCategory;
