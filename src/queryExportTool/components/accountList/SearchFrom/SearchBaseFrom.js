import React, { Component } from 'react'
import { Form, Row, Col } from 'antd';
import InputAndSlider from "./InputAndSlider"
import ItemLable from "./ItemLable";
import "./index.less"
import CustomizeSearch from "./CustomizeSearch";
import TreeTransfer from "./TreeTransfer";
import SelectAndInput from "./SelectAndInput"
const LayoutSearch = (props) => {
	return (
		<Row className="layout-search-box">
			<Col span={2} className="lable">
				<div>{props.lable}：</div>
			</Col>
			<Col span={22}>
				{props.children}
			</Col>
		</Row>
	)
}
class SearchBaseFrom extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	handleSubmit = (e) => {
		console.log("查询方法")
		// this.props.form.validateFields((err, values) => {
		// 	if (!err) {
		// 		console.log('Received values of form: ', values);
		// 	}
		// });
	}
	onSearchList = (param) => {
		console.log("查询的参数：", param)
	}
	render() {
		console.log(this.propsaccounts, 'accountListaccountListaccountListaccountList')
		const defaultList = [{ id: 11, name: "常见分类" }, { id: 12, name: "运营标签" }, { id: 13, name: "粉丝数" }, { id: 14, name: "参考报价" }]
		const defaultSelectList = [{ id: 21, name: "受众性别" }, { id: 22, name: "受众年龄" }, { id: 23, name: "受众地域" }, { id: 24, name: "真实阅读率" }]
		const AudienceList = [{ id: 31, name: "受众兴趣" }, { id: 32, name: "受众兴趣" }, { id: 33, name: "受众兴趣" }, { id: 34, name: "受众兴趣" }, { id: 21, name: "受众性别" }, { id: 22, name: "受众年龄" }, { id: 23, name: "受众地域" }]
		const otherList = [{ id: 41, name: "阅读单价" }, { id: 42, name: "真粉率" }, { id: 43, name: "播放单价" }, { id: 44, name: "账号性别" }, { id: 24, name: "真实阅读率" }]

		const tagsArray1 = ['3C数码', '军事', '母婴育儿', '美容美妆', '汽车', '服饰搭配', '文艺', '教育培训', '情感心理', '娱乐影音', '时尚潮流', '财经', '美食', '游戏/动漫', '健康/养生', '家居', 'IT/互联网', '职场/管理', '笑话段子', '生活', '综合媒体', '新闻资讯 ', '宠物', '摄影', '营销', '两性', '运动健身', '旅游', '星座命理', '地域'];
		const tagsArray2 = ['内容优选资源', '闪投优惠', '游戏行业热选', '广告主喜爱', '近期热门', '平台优选', '五星优评'];
		const treeData = [
			{
				title: '北京',
				key: '1',
			},
			{
				title: '天津',
				key: '2',
			},
			{
				title: '河北省',
				key: '河北省',
				children: [
					{ title: "石家庄市", key: '石家庄市' },
					{ title: "唐山市", key: '唐山市"' },
					{ title: "秦皇岛市", key: '秦皇岛市' },
					{ title: "邯郸市", key: '邯郸市' },
					{ title: "邢台市", key: '邢台市' },
					{ title: "保定市", key: '保定市' },
					{ title: "张家口市", key: '张家口市' },
					{ title: "承德市", key: '承德市' },
					{ title: "沧州市", key: '沧州市' },
					{ title: "廊坊市", key: '廊坊市' }]
			}, {
				title: '山西省',
				key: '山西省',
				children: [

					{ title: "太原市", key: '太原市' },
					{ title: "大同市", key: '大同市' },
					{ title: "阳泉市", key: '阳泉市' },
					{ title: "长治市", key: '长治市' },
					{ title: "晋城市", key: '晋城市' },
					{ title: "朔州市", key: '朔州市' },
					{ title: "晋中市", key: '晋中市' },
					{ title: "运城市", key: '运城市' },
					{ title: "忻州市", key: '忻州市' },
					{ title: "临汾市", key: '临汾市' },
					{ title: "吕梁市", key: '吕梁市' }]
			},]
		const hotCityList = [
			{ key: "1", title: "北京" },
			{ key: "沧州市", title: "沧州市" },
			{ key: "秦皇岛市", title: "秦皇岛市" },
			{ key: "大同市", title: "大同市" },
			{ key: "2", title: "天津" },
		]
		const selectList = [{
			"name": "选择年龄段",
			"value": ""
		}, {
			"name": "0-18岁",
			"value": "1"
		}, {
			"name": "19-24岁",
			"value": "2"
		}, {
			"name": "25-34岁",
			"value": "3"
		}]
		return (
			<div className="search-from">
				<LayoutSearch lable="常见分类">
					<ItemLable tagsArray={tagsArray1} onChange={this.onSearchList} value={['母婴育儿']} />
				</LayoutSearch>
				<LayoutSearch lable="运营标签">
					<ItemLable tagsArray={tagsArray2} onChange={this.onSearchList} />
				</LayoutSearch>
				<LayoutSearch lable="粉丝数">
					<InputAndSlider unit={"万"} onSearch={this.handleSubmit} sliderMin={0} sliderMax={200} onChange={this.onSearchList} />
				</LayoutSearch>
				<LayoutSearch lable="参考报价">
					<InputAndSlider unit={"元"} onSearch={this.handleSubmit} sliderMin={0} sliderMax={3000} onChange={this.onSearchList} />
				</LayoutSearch>
				<SelectAndInput selectList={selectList} />
				<CustomizeSearch defaultList={defaultList} defaultSelectList={defaultSelectList} AudienceList={AudienceList} otherList={otherList} />
				<TreeTransfer onClickCancel={() => console.log("隐藏")} onClickOk={(list) => console.log("保存的筛选项", list)} treeData={treeData} hotCityList={hotCityList} />
			</div>
		);
	}
}
export default SearchBaseFrom;
