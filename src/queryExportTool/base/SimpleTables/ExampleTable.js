import React, { Component } from 'react';
import { Table, Modal } from 'antd';
import MarkMessage from "../MarkMessage";
import messageInfo from "../../constants/messageInfo"
class ExampleTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: true
		};
	}
	render() {
		const columns = [
			{
				title: 'Other',
				children: [

					{
						title: 'Address',
						children: [
							{
								title: 'Street',
								dataIndex: 'street',
								key: 'street',
								width: 200,
							},
							{
								title: 'Block',
								children: [
									{
										title: 'Building',
										dataIndex: 'building',
										key: 'building',
										width: 100,
									},
									{
										title: 'Door No.',
										dataIndex: 'number',
										key: 'number',
										width: 100,
									},
								],
							},
						],
					},
				],
			},
			{
				title: 'Company',
				children: [
					{
						title: 'Company Address',
						dataIndex: 'companyAddress',
						key: 'companyAddress',
						width: 200,
					},
					{
						title: 'Company Name',
						dataIndex: 'companyName',
						key: 'companyName',
					},
				],
			},

		];

		const data = [];
		for (let i = 0; i < 3; i++) {
			data.push({
				key: i,
				name: 'John Brown',
				age: i + 1,
				street: 'Lake Park',
				building: 'C',
				number: 2035,
				companyAddress: 'Lake Street 42',
				companyName: 'SoftLake Co',
				gender: 'M',
			});
		}

		return (
			<div>
				<a>查看渠道刊例</a>
				<Modal
					title="渠道刊例"
					visible={this.state.visible}
					onOk={() => this.setState({ visible: true })}
					onCancel={() => this.setState({ visible: false })}
				>
					<div>价格有效期至：222222<MarkMessage {...messageInfo['exampleTable']} /></div>
					<Table
						columns={columns}
						dataSource={data}
						bordered
						size="middle"
					/>
				</Modal>

			</div>


		)
	}
}

export default ExampleTable;
