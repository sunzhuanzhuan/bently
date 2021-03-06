import React, { Component } from 'react';
import { Table, Modal, Button, Spin } from 'antd';
import MarkMessage from "../MarkMessage";
import messageInfo from "../../constants/messageInfo"
import { getPriceGoodBad } from "./unit";
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
		const isShow = data.filter(one => (one.defaultQuotePriceDiscount1 > 0) || (one.defaultQuotePriceDiscount2 > 0)).length > 0
		const isUP = data.filter(one => one.productOnShelfStatus == 1).length > 0
		const childrenColumns = [

			{
				title: '参考价',
				dataIndex: 'price1',
				key: 'price1',
				align: 'center',
				render: (text, record) => {
					return (record.productOnShelfStatus == 1 ? <div className='flex-betwwen'>{text}
						{getPriceGoodBad(record.defaultQuotePriceDiscount1, record.productOnShelfStatus == 1)}</div> : '-')
				}
			},
			{
				title: '渠道价',
				dataIndex: 'channelPrice1',
				key: 'channelPrice1',
				align: 'center',
				render: (text, record) => {
					return record.productOnShelfStatus == 1 && text ? text : text === 0 ? text : '-'
				}
			},
			{
				title: '刊例价',
				dataIndex: 'publicationPrice1',
				key: 'publicationPrice1',
				align: 'center',
				render: (text, record) => {
					return record.productOnShelfStatus == 1 && text ? text : text === 0 ? text : '-'
				}

			},
		]
		const columns = [
			{
				title: '价格',
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


		const { visible, loading } = this.state
		return (
			isShow && isUP ? <div className='example-table'>
				<a onClick={this.onOK} ><span className='bold-font'>查看[渠道价][刊例价]</span></a>
				<Modal
					title={<span>查看[渠道价][刊例价]<MarkMessage {...messageInfo['exampleTable']} /></span>}
					visible={visible}
					onOk={this.onClose}
					onCancel={this.onClose}
					footer={null}
					width={700}
				>
					<Spin spinning={loading}>
						{isFamous == 1 ? <div style={{ textAlign: "center", margin: '0px 0px 10px ' }}>价格有效期至：{dataTimeNew}
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

			</div> : null


		)
	}
}

export default ExampleTable;
