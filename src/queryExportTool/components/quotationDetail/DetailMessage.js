import React, { Component } from 'react';
import { WBYDetailTable } from "wbyui";
import TitleLable from "../common/TitleLable";
import "./index.less"
class DetailMessage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {

		const { quotationDetail } = this.props
		const columnsTest = [{
			title: '报价单名称：',
			dataIndex: 'name',
			key: 'name',
		}, {
			title: '报价单ID：',
			dataIndex: 'id',
			key: 'id',
		}, {
			title: '平台：',
			dataIndex: 'platform',
			key: 'platform',
		}, {
			title: '所属公司：',
			dataIndex: 'companyName',
			key: 'companyName',
			render: (text, record) => (text ? text : "无")
		}, {
			title: '报价单模版：',
			dataIndex: 'templateName',
			key: 'templateName',
		}, {
			title: '创建时间：',
			dataIndex: 'createdAt',
			key: 'createdAt',
		}, {
			title: '导出次数：',
			dataIndex: 'exportedTimes',
			key: 'exportedTimes',
		}, {
			title: '创建人：',
			dataIndex: 'creator_name',
			key: 'creator_name',
		}, {
			title: '备注：',
			dataIndex: 'introduction',
			key: 'introduction',
			colspan: 3
		}];

		return (
			<div className="detail-message">
				<WBYDetailTable dataSource={quotationDetail} className='message-table'
					columnCount={4} columns={columnsTest} isFilterZero={false} />
			</div>
		);
	}
}

export default DetailMessage;
