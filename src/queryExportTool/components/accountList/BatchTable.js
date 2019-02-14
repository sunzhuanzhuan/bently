import React, { Component } from 'react'
import MainItem from "./MainItem";
import { Table, Modal } from "antd";
import platform from "../../constants/platform"
import AccountDetails from "../../containers/AccountDetails";
import { StatusAB, NoExist } from "../common/AccountInfos";
import AccountTableSelect from '../accountList/AccountTable/AccountTableSelect';
import MediaInfo from "@/queryExportTool/components/common/MediaInfo";
import LazyLoad from 'react-lazyload';
import './AccountTable/index.less'
class BatchTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			modalContent: ""
		};
	}
	showModal = () => {
		this.setState({
			visible: true
		})
	}
	handleCancel = () => {
		this.setState({
			visible: false
		})
	}
	setModalContent = (modalContent) => {
		this.setState({
			modalContent: modalContent,
			visible: true
		})
	}
	render() {
		const { visible, modalContent } = this.state
		const { accountList = {}, type = 1, actions, arrSelectExactQuery } = this.props
		const columns = [{
			title: '账号昵称',
			dataIndex: 'name',
			align: "center",
			key: 'name',
			render: (text, record) => {
				return <span className="sns_name_title"
					onClick={() => this.setModalContent(<AccountDetails account_id={record.account_id} />)}>
					<span data-src={record.base.avatar_url ? `http://api-webroot.api.weiboyi.com/pic.php?picurl=${record.base.avatar_url}` : ""} id={`avatar_list${record.base.account_id}`}></span>
					{record.base.sns_name}
				</span>
			}
		}, {
			title: '所属平台',
			dataIndex: 'age',
			align: "center",
			key: 'age',
			render: (text, record) => {
				return <span >
					{platform.platformView[record.platform_id && record.platform_id.toString()]}
				</span>
			}
		}, {
			title: '账号ID',
			dataIndex: 'sns_id',
			align: "center",
			key: 'sns_id',
			render: (text, record) => {
				return <span>
					{record.base.sns_id}
				</span>
			}
		}, {
			title: 'account_id',
			dataIndex: 'account_id',
			align: "center",
			key: 'account_id',
			render: (text, record) => {
				return <span>
					{record.base.account_id}
				</span>
			}
		}, {
			title: '执行类型',
			dataIndex: 'is_famous',
			align: "center",
			key: 'is_famous',
			render: (text, record) => {
				return <span>
					{record.base.is_famous == 1 ? "预约" : record.base.is_famous == 2 ? "微闪投" : ""}
				</span>
			}
		}, {
			title: '媒介经理',
			dataIndex: 'media_manager',
			align: "center",
			key: 'media_manager',
			render: (text, record) => {
				return <span>
					<LazyLoad once overflow>
						<MediaInfo user_id={record.base.user_id} isShowPopover={false} />
					</LazyLoad>
					{/* <MediaInfo user_id={record.base.user_id} isShowPopover={false} /> */}
				</span>
			}
		}, {
			title: '上下架状态',
			dataIndex: 'a_status',
			align: "center",
			key: 'a_status',
			render: (text, record) => {
				const { on_shelf_status = {} } = record.base
				//const { b_off_shelf_reason_strings = [], a_off_shelf_reason_strings = [], b_on_shelf_status, a_on_shelf_status } = on_shelf_status
				return <span>
					<StatusAB status={on_shelf_status && on_shelf_status.a_on_shelf_status} reason={on_shelf_status && on_shelf_status.a_off_shelf_reason_strings || []} title="A" />
					&nbsp;&nbsp;<StatusAB status={on_shelf_status && on_shelf_status.b_on_shelf_status} reason={on_shelf_status && on_shelf_status.b_off_shelf_reason_strings || []} title="B" />
				</span>
			}
		}, {
			title: '是否在库',
			dataIndex: 'exist_status',
			align: "center",
			key: 'exist_status',
			render: (text, record) => {
				return <span>
					{record.base.not_exist == 1 ? <span style={{ color: "#e46c09" }}>不在库</span> : "在库"}
				</span>
			}
		}];
		const columnsTable = [{
			title: '',
			dataIndex: 'exist_status',
			key: 'exist_status',
			render: (text, record) => {
				const { base } = record
				return base.not_exist == 1 ?
					<NoExist name={base.sns_name || base.account_id || base.sns_id} />
					: <MainItem key={record.account_id} accountListItem={record} setModalContent={this.setModalContent} />
			}
		}]
		return (
			<div>
				{/* type=1:卡片式，另一个是列表页 */}
				{type == 1 ?
					<div className="account-table-wxy ">
						<AccountTableSelect
							accountList={accountList}
							actions={actions}
							IsExactQuery={true}
							arrSelectExactQuery={arrSelectExactQuery}
						/>
					</div>
					: <div>
						<AccountTableSelect
							isShowTypeByList={true}
							IsExactQuery={true}
							accountList={accountList}
							actions={actions}
							columnsTypeByList={columns}
							arrSelectExactQuery={arrSelectExactQuery}
						/>
					</div>}
				<Modal
					title={"查看账号详情"}
					visible={visible}
					onCancel={this.handleCancel}
					width={820}
					footer={false}
				>
					{visible ? modalContent : null}
				</Modal>
			</div>

		);
	}
}

export default BatchTable;
