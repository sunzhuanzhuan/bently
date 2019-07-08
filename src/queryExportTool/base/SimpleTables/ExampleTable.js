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
		const columns = [
			{
				title: '发布',
				children: [
					{
						title: '',
						dataIndex: 'name',
						key: 'name',
						width: 200,

					},
					{
						title: '参考价',
						dataIndex: 'street1',
						key: 'street1',
						width: 200,

					},
					{
						title: '渠道价',
						dataIndex: 'street2',
						key: 'street2',
						width: 200,

					},
					{
						title: '刊例价',
						dataIndex: 'street3',
						key: 'street3',
						width: 200,

					},
				],
			},
			{
				title: '原创+发布',
				children: [
					{
						title: '参考价',
						dataIndex: 'street1',
						key: 'street1',
						width: 200,

					},
					{
						title: '渠道价',
						dataIndex: 'street2',
						key: 'street2',
						width: 200,

					},
					{
						title: '刊例价',
						dataIndex: 'street3',
						key: 'street3',
						width: 200,

					},
				],
			},
		];

		const data = [];
		for (let i = 0; i < 3; i++) {
			data.push({
				key: i,
				name: 'John Brown' + i,
				age: i + 1,
				street1: 'street1' + i,
				street2: 'street2' + i,
				street3: 'street3' + i,
			});
		}
		const { visible, loading } = this.state
		return (
			<div style={{ paddingTop: 6 }}>
				<a onClick={this.onOK} >查看渠道刊例</a>
				<Modal
					title="渠道刊例"
					visible={visible}
					onOk={this.onClose}
					onCancel={this.onClose}
					footer={null}
				>
					<Spin spinning={loading}>
						<div style={{ textAlign: "center", margin: '0px 0px 10px ' }}>价格有效期至：222222<MarkMessage {...messageInfo['exampleTable']} /></div>
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
