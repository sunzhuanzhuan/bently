import React, { Component } from 'react';
import { Table, Modal, Button, Spin } from 'antd';
import MarkMessage from "../MarkMessage";
import messageInfo from "../../constants/messageInfo"
class ExampleTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			tableList: [],
			loading: true
		};
	}

	onOK = () => {
		this.setState({
			visible: true,
			tableList: [],
			loading: false
		})
	}
	onClose = () => {
		this.setState({
			visible: false,
		})
	}
	render() {
		const { isFamous, ISWEiXin, data, dataTimeNew } = this.props
		const childrenColumns = [

			{
				title: '参考价',
				dataIndex: 'price1',
				key: 'price1',
				align: 'center'

			},
			{
				title: '渠道价',
				dataIndex: 'channelPrice1',
				key: 'channelPrice1',
				align: 'center'

			},
			{
				title: '刊例价',
				dataIndex: 'publicationPrice1',
				key: 'publicationPrice1',
				align: 'center'

			},
		]
		const childrenColumns2 = [

			{
				title: '参考价',
				dataIndex: 'price2',
				key: 'price2',
				align: 'center'

			},
			{
				title: '渠道价',
				dataIndex: 'channelPrice2',
				key: 'channelPrice2',
				align: 'center'

			},
			{
				title: '刊例价',
				dataIndex: 'publicationPrice2',
				key: 'publicationPrice2',
				align: 'center'

			},
		]

		const WeixinIsFamous2 = [
			{
				title: ISWEiXin ? '发布' : '价格',
				children: [
					{
						title: '',
						dataIndex: 'skuTypeName',
						key: 'skuTypeName',
						width: 120,
						align: 'center'
					},
					...childrenColumns
				]
			},

		];
		const WeixinIsFamous1 = [...WeixinIsFamous2, {
			title: '原创+发布',
			children: [
				...childrenColumns2
			]
		},]

		const { visible, loading } = this.state
		const columns = ISWEiXin && isFamous == 1 ? WeixinIsFamous1 : WeixinIsFamous2

		return (
			<div style={{ paddingTop: 6, flex: 'none' }}>
				<a onClick={this.onOK} >查看【渠道价】【刊例价】</a>
				<Modal
					title="渠道刊例"
					visible={visible}
					onOk={this.onClose}
					onCancel={this.onClose}
					footer={null}
				>
					<Spin spinning={loading}>
						{isFamous == 1 ? <div style={{ textAlign: "center", margin: '0px 0px 10px ' }}>价格有效期至：{dataTimeNew}<MarkMessage {...messageInfo['exampleTable']} />
						</div> : null}
						<Table
							columns={columns}
							dataSource={data}
							bordered
							size="middle"
							pagination={false}
						/>
					</Spin>
					<div style={{ textAlign: "center", marginTop: 10 }}><Button type='primary' onClick={this.onClose}>知道了</Button></div>
				</Modal>

			</div>


		)
	}
}

export default ExampleTable;
