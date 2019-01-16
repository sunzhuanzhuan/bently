import React, { Component } from 'react';
import { Form, Button, Radio, message } from 'antd';
import ExplainContents from "../base/ExplainContents";
//热门分类组件
import MultipleBoxList from "../base/MultipleBoxList";
const FormItem = Form.Item;
class BeautyShotContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryVisible: false,
			hotCategory: []
		};
	}
	isShowCategory = () => {
		const { categoryVisible } = this.state
		this.setState({
			categoryVisible: !categoryVisible
		})
	}
	onChangeCategory = (value) => {
		if (value !== -1) {
			this.props.setFieldsValue({
				hot_category_id: value
			})
			this.isShowCategory()
			this.setState({
				hotCategory: value
			})
		} else {
			message.error("请至少选择一个分类")
		}
	}
	render() {

		const { categoryVisible, hotCategory } = this.state;
		const { formItemLayout, getFieldDecorator,
			videoCampaignInfo, hotcategoryList, isNeedDefault,
			hotcategoryMap } = this.props

		const hotCategoryId = videoCampaignInfo && videoCampaignInfo.hot_category_id
		const hot_category_parent_id = videoCampaignInfo && videoCampaignInfo.hot_category_parent_id
		//什么是分类组件参数
		const hotWhat = {
			title: "什么是分类?",
			desc: "在发布视频时需要选择“分类”，在视频通过审核后就有机会上热门展示。",
		}
		const hotCategoryStateOne = isNeedDefault ? (hotCategory[0] || hot_category_parent_id) : hotCategory[0] || 0
		const hotCategoryStateTwo = isNeedDefault ? (hotCategory[1] || hotCategoryId) : hotCategory[1] || 0
		const hotCategoryValue = (hotCategoryStateOne > 0 && hotCategoryStateTwo > 0) ? [hotCategoryStateOne, hotCategoryStateTwo] : null
		return (
			<div>
				<FormItem {...formItemLayout} label="分类">
					{getFieldDecorator('hot_category_id', {
						initialValue: hotCategoryValue,
						rules: [{
							required: true,
							message: '请选择分类',
						}],
					})(
						<div>
							<span style={{ marginRight: hotCategoryStateOne ? 20 : 0 }}>
								{hotcategoryMap && hotcategoryMap[hotCategoryStateOne] && hotcategoryMap[hotCategoryStateOne].title}
								{hotCategoryStateOne ? "-" : ""}
								{hotcategoryMap && hotcategoryMap[hotCategoryStateTwo] && hotcategoryMap[hotCategoryStateTwo].title}
							</span>
							<Button type="primary" onClick={this.isShowCategory}>{hotCategoryStateTwo > 0 ? "修改" : "选择"}</Button>
						</div>
					)}
					<span className="prompt-content" >
						请选择要添加的分类
					</span>
					<ExplainContents content={hotWhat} />
				</FormItem>
				{categoryVisible ? <MultipleBoxList
					id="multiple-box-list-id-hot_category_id"
					items={hotcategoryList}
					visible={categoryVisible}
					onCancel={this.isShowCategory}
					value={hotCategoryValue}
					onOk={this.onChangeCategory} /> : null}
			</div>
		);
	}
}

export default BeautyShotContent;
