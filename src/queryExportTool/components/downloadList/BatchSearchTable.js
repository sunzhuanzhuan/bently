import React, { Component } from 'react';
import { Table, Popover } from 'antd';

class BatchSearchTable extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { downloadList, paginationConfig, loading, operateDownload } = this.props
		const columns = [{
			title: '下载ID',
			dataIndex: 'id',

			key: 'id',
		}, {
			title: '文件名称',
			dataIndex: 'name',

			key: 'name',
		}, {
			title: '下载次数',
			dataIndex: 'downloadTimes',
			key: 'downloadTimes',
		}, {
			title: '生成时间',
			dataIndex: 'createdAt',
			align: "center",
			key: 'createdAt',
		}, {
			title: '创建人',
			dataIndex: 'creatorName',
			key: 'creatorName',
			width: 80,
		}, {
			title: '状态',
			dataIndex: 'processStatus',
			align: "center",
			key: 'processStatus',
			width: 60,
			render: (text, record) => {
				return <div>
					{record.processStatus == 1 || record.processStatus == 4 ? <span>处理中</span> :
						record.processStatus == 2 ? <span style={{ color: "#0CAD67" }}>已完成</span>
							: <Popover trigger="hover" content={record.export_failed_reason ? record.export_failed_reason : "无"} title="失败原因">
								<span style={{ color: "#FF0000" }}>失败</span>
							</Popover>}
				</div>
			}
		}, {
			title: '操作',
			dataIndex: 'active',
			align: "center",
			key: 'active',
			render: (text, record) => {
				return <div>
					{record.processStatus == 1 || record.processStatus == 4 ? "" :
						record.processStatus == 2 ? <a onClick={() => this.props.downLoadById(record.download_url, record.id)}>下载</a> :
							<a onClick={() => operateDownload(record.id)}>重新处理</a>
					}

				</div>
			}
		}]
		return (
			<Table
				dataSource={downloadList}
				columns={columns}
				rowKey={record => record.id}
				pagination={paginationConfig}
				loading={loading} />
		);
	}
}

export default BatchSearchTable;

