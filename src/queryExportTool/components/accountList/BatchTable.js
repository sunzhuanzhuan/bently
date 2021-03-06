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
import qs from 'qs'
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
	onClickName = ({ platformId, accountId, groupType }) => {
		const urlPrapm = qs.stringify({ platformId, accountId, groupType })
		const isOpenDetail = [1, 9, 93, 24, 25, 103, 110, 115, 116].includes(platformId)
		isOpenDetail ?
			window.open(`/account/view/detail?${urlPrapm}`, "_blank")
			: this.setModalContent(<AccountDetails account_id={accountId} />)

	}
	render() {
		const { visible, modalContent } = this.state
		const { accountList = {}, type = 1, actions, arrSelectExactQuery,
			addLookDetailOrIndexList } = this.props
		const columns = [{
			title: '账号昵称',
			dataIndex: 'name',
			align: "center",
			key: 'name',
			render: (text, record) => {
				const { avatarUrl = require('../common/AccountInfos/img/default.jpg'), accountId, snsName } = record
				return <span className="sns_name_title"
					onClick={() => record.notExist == 1 ? null : this.onClickName(record)}>
					<span data-src={avatarUrl ? `http://api-webroot.api.weiboyi.com/pic.php?picurl=${avatarUrl}` : ""} id={`avatar_list_${accountId}`}></span>
					{snsName}
				</span>
			}
		}, {
			title: '所属平台',
			dataIndex: 'age',
			align: "center",
			key: 'age',
			render: (text, record) => {
				return <span >
					{platform.platformView[record.platformId && record.platformId.toString()]}
				</span>
			}
		}, {
			title: '账号ID',
			dataIndex: 'snsId',
			align: "center",
			key: 'snsId',
			render: (text, record) => {
				return <span>
					{record.snsId}
				</span>
			}
		}, {
			title: 'accountId',
			dataIndex: 'accountId',
			align: "center",
			key: 'accountId',
			render: (text, record) => {
				return <span>
					{record.accountId}
				</span>
			}
		}, {
			title: '执行类型',
			dataIndex: 'isFamous',
			align: "center",
			key: 'isFamous',
			render: (text, record) => {
				return <span>
					{record.isFamous == 1 ? "预约" : record.isFamous == 2 ? "微闪投" : ""}
				</span>
			}
		}, {
			title: '媒介经理',
			dataIndex: 'mediaManager',
			align: "center",
			key: 'mediaManager',
			render: (text, record) => {
				return <span>
					<MediaInfo agentInfo={record.agentInfo} userId={record.userId} />
				</span>
			}
		}, {
			title: '上下架状态',
			dataIndex: 'aStatus',
			align: "center",
			key: 'aStatus',
			render: (text, record) => {
				const { onShelfStatus = {} } = record
				//const { bOffShelfReasonStrings = [], aOffShelfReasonStrings = [], bOnShelfStatus, aOnShelfStatus } = onShelfStatus
				return <span>
					<StatusAB status={onShelfStatus && onShelfStatus.aOnShelfStatus} reason={onShelfStatus && onShelfStatus.aOffShelfReasonStringList || []} title="A" />
					&nbsp;&nbsp;<StatusAB status={onShelfStatus && onShelfStatus.bOnShelfStatus} reason={onShelfStatus && onShelfStatus.bOffShelfReasonStringList || []} title="B" />
				</span>
			}
		}, {
			title: '是否在库',
			dataIndex: 'existStatus',
			align: "center",
			key: 'existStatus',
			render: (text, record) => {
				return <span>
					{record.notExist == 1 ? <span style={{ color: "#e46c09" }}>不在库</span> : "在库"}
				</span>
			}
		}];
		const columnsTable = [{
			title: '',
			dataIndex: 'existStatus',
			key: 'existStatus',
			render: (text, record, index) => {
				const { base } = record
				return base.notExist == 1 ?
					<NoExist name={base.snsName || base.accountId || base.snsId} />
					: <MainItem key={record.accountId} accountListItem={record} setModalContent={this.setModalContent} isPreloading={index < 4} />
			}
		}]
		return (
			<div>
				{/* type=1:卡片式，另一个是列表页 */}
				{type == 1 ?
					<div className="account-table-wxy ">
						<AccountTableSelect
							addLookDetailOrIndexList={addLookDetailOrIndexList}
							accountList={accountList}
							actions={actions}
							IsExactQuery={true}
							arrSelectExactQuery={arrSelectExactQuery}
						/>
					</div>
					: <div>
						<AccountTableSelect
							addLookDetailOrIndexList={addLookDetailOrIndexList}
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

