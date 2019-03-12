import React, { Component } from 'react'
import { Table } from 'antd';
import ChargeTypeEdit from "./ChargeTypeEdit";
import { DeleteModal } from "../common"
class ChargeType extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const {
			chargeTypeList,
			setShowModal,//打开弹窗
			formLayoutModal,
			updateList,
			deleteList,
			noLast,//查看详情不显示操作列
			isEdit//修改时显示编号和时间
		} = this.props
		const columns = [{
			title: '收费类型编号',
			dataIndex: 'tollTypeCode',
			align: 'center',
			key: 'tollTypeCode',
		}, {
			title: '平台收费类型名称',
			dataIndex: 'tollTypeName',
			align: 'center',
			key: 'tollTypeName',
		}, {
			title: '服务费比例%',
			dataIndex: 'serviceRatio',
			align: 'center',
			key: 'serviceRatio',
		}, {
			title: '描述',
			dataIndex: 'description',
			align: 'center',
			key: 'description',
		}, {
			title: '创建时间',
			dataIndex: 'createdAt',
			align: 'center',
			key: 'createdAt',
		}, {
			title: '最后一次修改时间',
			dataIndex: 'modifiedAt',
			align: 'center',
			key: 'modifiedAt',
		}, {
			title: '操作',
			dataIndex: 'operate',
			align: 'center',
			key: 'operate',
			render: (text, record, index) => {
				return <div>
					<a onClick={() => setShowModal(true, {
						title: <div>修改报价项</div>,
						content: <ChargeTypeEdit
							formLayoutModal={formLayoutModal}
							setShowModal={setShowModal}
							updateList={updateList}
							index={index}
							isEdit={true}
							item={record} />
					})} style={{ marginRight: 4 }}>修改</a>
					{record.isAddItem ? <DeleteModal onDelete={() => deleteList(record.id, 'chargeTypeList')} /> : null}

				</div>

			}
		}]
		const updateKey = ['createTime', 'lastTime', 'id']
		return (
			<div >
				<Table dataSource={chargeTypeList} columns={isEdit ?
					noLast ? columns.filter(one => one.key != 'operate') : columns
					: columns.filter(one => !updateKey.includes(one.key))}
					pagination={false} bordered={true} />
			</div>
		);
	}
}

export default ChargeType;
