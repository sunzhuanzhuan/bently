import React, { Component } from 'react';
import { Table, Popover } from 'antd';

class DownloadList extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { downloadList, paginationConfig, loading, operateDownload, isBPAuthVisble } = this.props
		const columns = [{
			title: '下载ID',
			dataIndex: 'id',
			key: 'id',

		}, {
			title: '报价单名称',
			dataIndex: 'quotation_name',
			key: 'quotation_name',
		}, {
			title: '所属公司',
			dataIndex: 'company_name',
			key: 'company_name',
			render: (text, record) => record.company_name ? record.company_name : "无"
		},
		{
			title: '模版名称',
			dataIndex: 'template_name',
			key: 'template_name',
		}, {
			title: '下载次数',
			dataIndex: 'download_times',
			key: 'download_times',
		}, {
			title: '生成时间',
			dataIndex: 'created_at',
			align: "center",
			key: 'created_at',
		}, {
			title: '创建人',
			dataIndex: 'creator_name',
			key: 'creator_name',
			width: 80,
		}, {
			title: '状态',
			dataIndex: 'process_status',
			align: "center",
			key: 'process_status',
			width: 60,
			render: (text, record) => {
				return <div>
					{record.process_status == 1 || record.process_status == 4 ? <span>处理中</span> :
						record.process_status == 2 ? <span style={{ color: "#0CAD67" }}>已完成</span>
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
					{record.process_status == 1 || record.process_status == 4 ? "" :
						record.process_status == 2 ? <a onClick={() => this.props.downLoadById(record.download_url, record.id)}>下载</a> :
							<a onClick={() => operateDownload(record.id)}>重新处理</a>
					}

				</div>
			}
		}].filter(one => !(isBPAuthVisble && one.key == 'company_name'))
		return (
			<Table dataSource={downloadList}
				columns={columns}
				loading={loading}
				rowKey={record => record.id}
				pagination={paginationConfig} />
		);
	}
}

export default DownloadList;
