import React, { Component } from 'react';
import { Row, Col, Table } from 'antd';
import "./BasicInfo.less"
import TitleLable from "../../common/TitleLable"
import numeral from "numeral";
import { log } from 'util';
//卡片
class AudienceBox extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { title, isShowLine } = this.props
		return <div className="wxy-audience-box">
			<div className="title">{title}</div>
			<div className={isShowLine ? "line-right" : ""}>{this.props.children}</div>
		</div>
	}
}
//柱状图
class PillarBox extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { number = 0, height = 140, maxColor, minColor, text } = this.props
		const fillHeight = (height - 20) * number
		return <div>
			<div>{parseInt(number * 100)}%</div>
			<div className="wxy-pillar-box" style={{ height: height }}>
				<div className="filling" style={{ height: fillHeight, background: `linear-gradient(${minColor} 0%, ${maxColor} 100%)` }}></div>
				<div className="text">{text}</div>
			</div>
		</div>
	}
}
//数字排序
class NumberSort extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { list, } = this.props
		const styleMap = {
			0: { fontWeight: "bold", color: "#333" },
			1: { color: "#333" },
			2: { color: "#333" }
		}
		return (
			<div className="wxy-age-list">
				{list.length > 0 ? list.map((one, index) => {
					return <div key={index}
						className="age-list-item"
						style={{ ...styleMap[index] }}>
						<div className="item-left-number"
							style={{ borderColor: styleMap[index].color }}>
							{index + 1}
						</div>
						<div className="item-left">{one.name}</div>
						<div className="item-right">{numeral(one.value).format("0%")}</div>
					</div>
				}) : <div className="none-number">暂无数据</div>}
			</div>
		);
	}
}
class BasicInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { baseInfoList } = this.props
		const { cooperationCases = [], audience = {} } = baseInfoList
		const { kolVisitorGenderDraw = {}, kolVisitorAgeDraw = [],
			kolVisitorProvinceDraw = [], kolVisitorInterestDraw = [] } = audience
		const { male, female } = kolVisitorGenderDraw

		const SexBox = <Row>
			<Col span={4}></Col>
			<Col span={8}>
				<PillarBox text="男" minColor="#8EC2FF" maxColor="#73B4FF" number={male} />
			</Col>
			<Col span={8}>
				<PillarBox text="女" minColor="#ffa88d" maxColor="#fe6d62" number={female} />
			</Col>
			<Col span={4}></Col>
		</Row>
		const isdata = female <= 0 && male <= 0
		const AudienceList = [
			{ colSpan: 5, title: "性别", isShowLine: true, content: isdata ? <div className="none-number">暂无数据</div> : SexBox },
			{ colSpan: 7, title: "年龄", isShowLine: true, content: <NumberSort list={kolVisitorAgeDraw} /> },
			{ colSpan: 7, title: "兴趣", isShowLine: true, content: <NumberSort list={kolVisitorInterestDraw} /> },
			{ colSpan: 5, title: "地域", isShowLine: false, content: <NumberSort list={kolVisitorProvinceDraw} /> }
		]
		const columns = [{
			title: '博文内容/数据',
			dataIndex: 'content',
			align: "center",
			key: 'content',
			width: "200px",
			render: (text, record) => (<a href={record.link} target="_blank">
				{record.content}
			</a>)

		},
		// {
		// 	title: '发送时间',
		// 	dataIndex: 'modified_at',
		// 	align: "center",
		// 	key: 'modified_at',
		// 	width: "200px",
		// }, 
		{
			title: '品牌名称',
			dataIndex: 'brand',
			align: "center",
			key: 'brand',
			width: "200px",
		}];
		return (
			<div className="basic-info">
				<Row>
					<TitleLable title="受众画像" >
						{AudienceList.map((one, index) => {
							return <Col span={6} key={index} className="basic-info-col">
								<AudienceBox title={one.title} isShowLine={one.isShowLine}>
									<div>
										{one.content}
									</div>
								</AudienceBox>
							</Col>
						})}
					</TitleLable>
				</Row>
				<Row>
					<TitleLable title="账号案例" >
						<Table dataSource={cooperationCases} columns={columns} pagination={false}
							bordered rowKey={(record, index) => index} />
					</TitleLable>
				</Row>
			</div>
		);
	}
}

export default BasicInfo;
