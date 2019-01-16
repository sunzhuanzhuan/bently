import React, { Component } from 'react';
import { Icon, Tabs, Button, Drawer, Popconfirm, List, Spin } from 'antd';
import "./index.less"
import AvatarType from "../../common/AvatarType";
import { WBYPlatformIcon } from "wbyui"
import { Link, withRouter } from "react-router-dom";
import images from "../../../images";
import Scolle from "./Scolle";
import TabList from "./TabList";
const TabPane = Tabs.TabPane;
export const MarkBox = ({ number, isShowSelect, visible }) => {
	return <div className="show-car" onClick={isShowSelect}>
		<div className="car-icon">
			<Icon type={visible ? "right" : "left"} theme="outlined" />
		</div>
		<div className="car-text">
			<img src={images.shopPng} width="20" style={{ marginLeft: -3, marginBottom: 10 }} />
			<span className="text">选号车</span>
		</div>
		<div className="car-number">{number}</div>
	</div>
}

class SelectCar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
		};
		this.canClick = this.canClick.bind(this)
		this.disCanClick = this.disCanClick.bind(this)
	}
	componentDidMount = () => {
		var myDiv = document.getElementById("Js-select-car-click-id");
		var noClick = document.getElementById("Js-select-car-no-click-id");
		noClick.addEventListener("click", this.disCanClick);
		myDiv.addEventListener("click", this.canClick)
	}

	canClick(event) {
		const { visible } = this.state
		event = event || window.event;
		event.stopPropagation();
		if (!visible) {
			this.setState({
				visible: true,
			})
		}
	}
	disCanClick() {
		this.setState({
			visible: false,
		})
	}
	componentWillUnmount() {
		var myDiv = document.getElementById("Js-select-car-click-id");
		var noClick = document.getElementById("Js-select-car-no-click-id");
		noClick.removeEventListener("click", this.disCanClick);
		myDiv.removeEventListener("click", this.canClick)
		window.removeEventListener('resize', this.setSelectCarHeight);
	}

	isShowSelect = () => {

		const { visible } = this.state
		this.setState({
			visible: !visible
		})
	}
	onCloseDrawer = () => {
		this.setState({ visible: false })
	}
	render() {
		const { visible } = this.state
		const { number = 0 } = this.props

		return (
			<div className='select-car' id="Js-select-car-click-id">
				{visible ? null : <MarkBox number={number > 0 ? number : 0} isShowSelect={this.isShowSelect} />}
				<Drawer
					placement="right"
					closable={false}
					onClose={this.onCloseDrawer}
					visible={this.state.visible}
					width={390}
					mask={false}
					style={{ padding: 0 }}
					className="select-car-drawer"
				>
					{visible ?
						<div><MarkBox number={number > 0 ? number : 0} isShowSelect={this.isShowSelect} visible={visible} />
							<div style={{ minWidth: 385 }}>{this.props.children}</div>
						</div>
						: null}
				</Drawer>
			</div>

		);
	}
}

export class CarContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cheackedKey: 10,
			selectCarHeight: 0,

		};
		this.setSelectCarHeight.bind(this)
	}
	componentDidMount = () => {
		//监听购物车变化
		this.setSelectCarHeight()
		this.setState({
			cheackedKey: 10
		})
		window.addEventListener('resize', this.setSelectCarHeight);

	}
	setSelectCarHeight = () => {
		this.setState({
			selectCarHeight: window.innerHeight - 120
		})
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.setSelectCarHeight);
	}

	changeTabs = async (key) => {
		const { searchCart } = this.props
		this.setState({
			cheackedKey: key,
		})
		let gounp_type = {}
		if (key != 10) {
			gounp_type = key
		}
		searchCart && searchCart(gounp_type)
	}
	//全部清空方法
	allCleanList = () => {
		const { cleanSelectExactQuery, cleanCart } = this.props
		cleanCart()
		cleanSelectExactQuery()
	}
	removeAccout = (id, group_type) => {
		const { isAsync, deleteCart } = this.props
		if (isAsync) {
			deleteCart(id, group_type)
		} else {
			const { cheackedKey } = this.state
			let gounType = ""
			if (cheackedKey != 10) {
				gounType = cheackedKey
			}
			deleteCart(id, gounType)
		}
	}
	render() {
		const { selectCartData, quotation_id, actions, isAsync } = this.props;
		const { selectCarHeight } = this.state;
		const { cheackedKey } = this.state
		const sumAccount = selectCartData && selectCartData.total || 0
		function getShowImg(type, key) {
			return <span className="tab-icon-style"><WBYPlatformIcon
				weibo_type={type}
				icon_type={key == cheackedKey ? "default" : "gray"}
				widthSize={15}
			/></span>
		}

		const tabsList = [
			{ tab: `全部 ${sumAccount}`, key: 10, },
			{ tab: <span>{getShowImg(9, 1)}<span className="text-number"> {selectCartData.tabList && selectCartData.tabList[1] || 0}</span></span>, key: 1, },
			{ tab: <span>{getShowImg(1, 2)}<span className="text-number"> {selectCartData.tabList && selectCartData.tabList[2] || 0}</span></span>, key: 2 },
			{ tab: <span>{getShowImg(9000, 3)}<span className="text-number"> {selectCartData.tabList && selectCartData.tabList[3] || 0}</span></span>, key: 3 },
			{ tab: <span>{getShowImg(93, 4)}<span className="text-number"> {selectCartData.tabList && selectCartData.tabList[4] || 0}</span></span>, key: 4 },
			{ tab: <span>{getShowImg(10000, 5)}<span className="text-number"> {selectCartData.tabList && selectCartData.tabList[5] || 0}</span></span>, key: 5 }
		]
		return (
			<div className="car-content">
				<Tabs className="select-car-content-tabs" defaultActiveKey="10" onChange={this.changeTabs}>
					{tabsList.map((one) => {
						return <TabPane tab={one.tab} key={one.key} className="tab-pane" style={{ height: selectCarHeight }}>
							{isAsync ?
								cheackedKey == one.key ? <Scolle actions={actions} selectCarHeight={selectCarHeight} selectCartData={selectCartData} removeAccout={this.removeAccout} cheackedKey={cheackedKey > 9 ? "" : cheackedKey} />
									: "" :
								<div style={{ overflow: "auto", height: selectCarHeight }}>	<TabList list={selectCartData.data} removeAccout={this.removeAccout} /></div>}
						</TabPane>
					})}
				</Tabs>
				<div className="car-footer">
					<div className="footer-left">
						{sumAccount ? <Popconfirm title="你确认清空全部账号吗？" onConfirm={this.allCleanList} >
							<a href="javascript:;">全部清空</a>
						</Popconfirm> : null}
					</div>
					<div className="footer-right">
						{quotation_id > 0 ?
							<Link to={`/accountList/quotationManage/detail?quotation_id=${quotation_id}`}>
								<Button type="primary" onClick={() => { this.props.addQuotation() }}>确定</Button>
							</Link>
							: <Link to="/accountList/selectCarList">
								<Button type="primary" >查看并导出</Button>
							</Link>}
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(SelectCar);
