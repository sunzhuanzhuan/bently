import React, { Component } from 'react'
import { WBYDetailTable } from "wbyui";
import "./BYDetailTableBase.less"
class BYDetailTableBase extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { data, columnsAdd = [] } = this.props
		const columnsBase = [{
			title: '执行凭证号（PO号）：',
			dataIndex: 'id',
			key: 'id',
			render: (text, record) => <a href="http://baidu.com" target="_blank">{record.id}</a>
		}, {
			title: '所属项目/品牌：',
			dataIndex: 'asdasd',
			key: 'asdasd',
			render: (text, record) => <span>
				<a href="http://baidu.com" target="_blank">{record.project}</a>/{record.pinpai}
			</span>
		}, {
			title: '执行凭证总额：',
			dataIndex: 'money',
			key: 'money',
			render: (text, record) => <span>¥{record.money}</span>
		}]
		const columns = [...columnsBase, ...columnsAdd]
		return (
			<WBYDetailTable
				dataSource={data}
				className='message-table'
				columnCount={2}
				columns={columns}
				isFilterZero={false}
			/>
		);
	}
}

export default BYDetailTableBase;
