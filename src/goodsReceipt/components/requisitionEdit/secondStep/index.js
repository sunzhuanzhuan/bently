import React, { Component } from 'react'
import { TitleLable } from "../../../base";
import "./index.less"
import EditServiceRate from "../EditServiceRate";
import TableByType from "./TableByType";
import GroupRedio from "../../common/groupRedio";
import WbyGRUploadFile from '../WbyGRUploadFile'
import { Divider, Button, Icon, Form, Spin } from "antd"
import MarkMessage from "../../common/MarkMessage";
import qs from "qs";
class SecondStep extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			fileList: []
		};
	}
	componentDidMount = () => {
		const { actions: { getBaseDetail } } = this.props
		const search = qs.parse(window.location.search.slice(1))
		this.searchAction()
		this.props.actions.getGRItemListStatistic({ gr_id: qs.parse(window.location.search.slice(1)).gr_id })
		getBaseDetail({ gr_id: search.gr_id }).then((res) => {
			const { attachments = {} } = res.data.result
			const { supplement_attachments = [] } = attachments
			const fileList = supplement_attachments.map(one => ({
				name: one.name,
				url: one.absolute_file_path,
				filepath: one.file_path
			}))
			const supplementAttachmentsList = fileList.map(one => ({
				name: one.name,
				file_path: one.filepath
			}))
			this.props.setEditState({ supplementAttachmentsList: supplementAttachmentsList })
			this.setState({ isLoading: false, fileList })
		})

	}
	//初始化页面数据方法：列表和统计
	searchAction = () => {
		const { actions: { getGRItemList, getGRItemListStatistic } } = this.props
		const search = qs.parse(window.location.search.slice(1))
		Promise.all([getGRItemList({ item_type: 1, gr_id: search.gr_id }),
		getGRItemList({ item_type: 2, gr_id: search.gr_id }),
		getGRItemList({ item_type: 3, gr_id: search.gr_id }),
		getGRItemListStatistic({ gr_id: search.gr_id })]).then(() => {
			this.setLoading()
		})
	}
	//设置loading
	setLoading = (value = false) => {
		this.setState({ isLoading: value })
	}
	//修改服务税率的查询方法
	searchActionByFree = () => {
		this.setLoading(true)
		this.searchAction()
	}
	vailPrice = (rule, value, callback) => {
		const parent = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d{1,2})$/
		if (!parent.test(value) || value < 0 || value > 100) {
			callback('请确认填写的是0-100，小数点后最多2位的数字')
		} else {
			callback()
		}

	}
	changeFile = (attachments, filelist) => {
		this.props.setEditState({ supplementAttachmentsList: attachments })
		this.setState({ fileList: filelist })
	}
	render() {
		const { actions, goodsReceipt,
			setEditState
		} = this.props
		const { updateBaseInfo, exportOrderExcel } = actions
		const { GRItemList: { campaign_items, extended_business_items, reservation_items },
			baseDetail = {}, uploadToken = {}, GRItemListStatistic = {} } = goodsReceipt
		const { isLoading, fileList } = this.state
		const { need_supplement_attachments, service_fee_rate } = baseDetail
		const commonProps = {
			actions,
			goodsReceipt,
		}
		const groupRedioContent = [
			{
				content: <TableByType tableType="1" {...commonProps} list={reservation_items} />
			}, {
				content: <TableByType tableType="2" {...commonProps} list={campaign_items} />
			}, {
				content: <TableByType tableKeyId="business_id" tableType="3" {...commonProps} list={extended_business_items} />
			}
		]
		const { count = {} } = GRItemListStatistic
		const { reservation_items_total = 0,
			campaign_items_total = 0,
			extended_business_items_total = 0 } = count
		const sumData = [
			reservation_items_total,
			campaign_items_total,
			extended_business_items_total
		]
		return (
			<Spin spinning={isLoading}>
				<div className="second-step">
					<div className="red-start">*为必填项</div>
					<TitleLable title="执行凭证基本信息" >
						{/* <BYDetailTableBase data={data} columnsAdd={columnsAdd} /> */}
						<div className="service-rate-flex">
							<div style={{ marginTop: -19 }}><span className="red-start">*</span>服务费率：</div>
							<div >
								<Form className="edit-service-rate-form">
									{service_fee_rate >= 0 ? <EditServiceRate
										value={service_fee_rate}
										unit="%"
										changeAction={updateBaseInfo}
										minError="请确认填写的是0-100，小数点后最多2位的数字"
										searchActionByFree={this.searchActionByFree}
										form={this.props.form}
										vailPrice={this.vailPrice}
										setEditState={setEditState} /> : null}
								</Form>
							</div>
						</div>
					</TitleLable>
					{need_supplement_attachments == 1 ? <TitleLable
						title={<span>补充结案附件<MarkMessage content={<div style={{ width: 150 }} >请上传需要补齐的结案数据，具体哪些订单/活动 需要补齐可以一键下载</div>} />
						</span>} >
						<div style={{ marginTop: 20 }}>
							<div className="circle-number">1</div>
							<span style={{ color: "#f5222d" }}>一键下载需补齐结案数据的订单/活动ID</span>
							<div style={{ marginTop: 10, marginLeft: 40 }}>
								<Button onClick={() => { exportOrderExcel({ gr_id: qs.parse(window.location.search.slice(1)).gr_id }) }}><Icon type="download" />下载文件</Button>
							</div>
						</div>
						<div className="line-middle">

						</div>
						<div>
							<div className="circle-number">2</div>
							<span className="red-start">*</span><span>上传结案附件</span>
							<div style={{ marginTop: 10, marginLeft: 40, width: 900 }}>
								<WbyGRUploadFile changeFile={this.changeFile} fileList={fileList} uploadToken={uploadToken} />
							</div>
						</div>
					</TitleLable> : null}
					<TitleLable title="确认已选择的订单/活动的采购价" >
						<GroupRedio content={groupRedioContent} sumData={sumData} />
					</TitleLable>
				</div >
			</Spin>
		);
	}
}
const SecondStepForm = Form.create()(SecondStep);
export default SecondStepForm;
