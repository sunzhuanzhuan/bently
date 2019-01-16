import React, { Component } from "react"
import { Form, Button, Row, Col, Spin } from 'antd';
import qs from "qs";
import { videoTypeContent } from "../configuration/fromContent";
import { coverParam } from "../configuration/coverConfig";
import { videoParam } from "../configuration/videoConfig";
import { videoNoteParam } from "../configuration/videoNoteConfig";

import "./CreateMicroFlashes.less";
import { processCampaign } from '../configuration/processCampaign'
//接口
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import * as actions from "../actions";
import {
	BeautyShotContent,
	// VolcanicContent, 
	SecondShotContent,
	CoverTitleContent,
	VideoTitleContent,
	QualificationImg,
	UploadCover,
	DataStart,
	CampaignName,
	//AllowService,
	IndustryCategory,
	VideoTypeForm,
	Video
} from '../components'

//步骤
import CustomSteps from "../base/CustomSteps";
//创建微闪投活动组件
class CreateMicroFlashes extends Component {
	constructor(props) {
		super(props)
		this.state = {
			//平台类型的值
			radioGroupValue: 25,
			//是否是修改页面
			isEditAction: qs.parse(this.props.location.search.substring(1)).campaign_id > 0 && qs.parse(this.props.location.search.substring(1)).type != "copy",
			//是否展示历史证明
			saveButtonState: false,
			//是否显示loading
			isShowLoading: false,
			videoTypeContentNow: videoTypeContent[0]
		}
	}
	//设置加载loading
	setLoading = () => {
		const { isShowLoading } = this.state
		this.setState({
			isShowLoading: !isShowLoading
		})
	}
	async componentDidMount() {
		this.setLoading()
		const { actions } = this.props
		const { company_id, campaign_id } = qs.parse(this.props.location.search.substring(1))

		let uploadTokenParam = {
			purposes: [215, 217]
		}
		const { radioGroupValue } = this.state
		let nowValue = radioGroupValue
		if (campaign_id > 0) {
			await actions.getVideoCampaignInfo({ campaign_id: campaign_id }).then(response => {
				const { weibo_type } = response.data
				nowValue = weibo_type
				this.setState({
					radioGroupValue: weibo_type,
				})
				this.setVideoTypeContentNow(weibo_type)
			})
			uploadTokenParam = {
				...uploadTokenParam,
				campaign_id: campaign_id
			}
		}
		//所属行业
		await actions.getIndustryList()
		//热门分类
		await actions.getHotcategoryList({ weibo_type: radioGroupValue })
		//获取登陆信息中的公司ID
		// await actions.getHeader().then(response => {

		// })
		//获取上传token的信息
		actions.getUploadToken({ ...uploadTokenParam, company_id: company_id, })
		this.setLoading()
		this.setVideoTypeContentNow(nowValue)
	}

	//提交的方法
	submitFrom = (e) => {
		e.preventDefault();
		const { isEditAction } = this.state
		const { actions, videoDispatch: { uploadToken } } = this.props
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const allValue = processCampaign(values, uploadToken)
				const typeAction = qs.parse(this.props.location.search.substring(1)).type

				if (isEditAction) {
					//当前活动ID
					const { campaign_id, company_id } = qs.parse(this.props.location.search.substring(1))
					const editValue = { ...allValue, campaign_id: campaign_id, company_id: company_id }
					actions.updateVideoCampaign(editValue).then(response => {

						if (response.data.affected_rows == 1 || response.msg.affected_rows == 1) {
							window.alert("操作成功，点击按钮关闭页面")
							window.location.href = "about:blank";
							window.close();
						}
					})
				} else {
					actions.addVideoCampaign({ ...allValue, type_flag: typeAction === "copy" ? 1 : 4 }).then(response => {
						window.location.href = response.data.location
					})
				}
			}
		});
	}
	//平台类型值变化
	onChange = (e) => {
		this.setState({
			radioGroupValue: e.target.value,
			fileListSqualit: [],
			historicalProofList: []
		});
		this.props.form.resetFields()
		this.setVideoTypeContentNow(e.target.value)
	}
	//设置当前平台配置
	setVideoTypeContentNow = (value) => {
		let videoTypeContentNow = {}
		for (let i = 0; i < videoTypeContent.length; i++) {
			if (videoTypeContent[i].id == value) {
				videoTypeContentNow = videoTypeContent[i];
			}
		}
		this.setState({
			videoTypeContentNow
		})
	}
	render() {
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 },
		};
		const { form, videoDispatch } = this.props;
		const { company_id } = qs.parse(this.props.location.search.substring(1))
		const { videoCampaignInfo, industryList, hotcategoryList, headerList, uploadToken, hotcategoryMap, industryMap } = videoDispatch;
		const { getFieldDecorator, setFieldsValue, getFieldValue } = form;
		const isvideoCampaignInfo = JSON.stringify(videoCampaignInfo) != "{}"
		const {
			radioGroupValue, isEditAction,
			isShowLoading, videoTypeContentNow, saveButtonState
		} = this.state
		//上传视频参数
		let VideoUploadParam = {
			...videoParam[radioGroupValue],
			token: uploadToken.tokens && uploadToken.tokens['215'] || "",
			upload_url: uploadToken.meta && uploadToken.meta.upload_url || ""
		}
		const isCopyOperate = qs.parse(this.props.location.search.substring(1)).type == "copy"
		const isNeedDefault = qs.parse(this.props.location.search.substring(1)).campaign_id > 0
		//各个平台参数
		const uniqueContentParam = {
			uploadToken, isEditAction, isvideoCampaignInfo, isCopyOperate,
			formItemLayout, getFieldDecorator, setFieldsValue, getFieldValue,
			videoCampaignInfo, isNeedDefault, videoTypeContentNow, radioGroupValue
		}
		//秒拍独有
		const isSecondShot = radioGroupValue == 24
		//美拍独有
		const isBeautyShot = radioGroupValue == 25
		//快手独有
		const isQuickWorker = radioGroupValue == 103
		//抖音独有
		const isVibrato = radioGroupValue == 115
		//封面标题参数
		const CoverTitleContentParam = {
			//表单操作参数
			...uniqueContentParam,
			key: `${radioGroupValue}CoverTitleContent`,
			//标题参数
			...coverParam[radioGroupValue]
		}
		return !isEditAction || isvideoCampaignInfo ? (
			<Spin spinning={isShowLoading}>
				{isEditAction ? null : <CustomSteps step={0} />}
				<Form className='create-micro-flashes'>
					{/* 视频类型组件 */}
					<VideoTypeForm  {...uniqueContentParam} videoTypeContent={videoTypeContent} onChange={this.onChange} />

					{/* 活动名称组件 */}
					<CampaignName  {...uniqueContentParam} />
					{/* 时间区域组件 */}
					<DataStart {...uniqueContentParam} key={`${radioGroupValue}DataStart`} />
					<Video {...uniqueContentParam} VideoUploadParam={VideoUploadParam} key={`${radioGroupValue}Video`} />
					{isVibrato ? null : <UploadCover {...uniqueContentParam} ref={node => this.nodeUploadCover = node} isSecondShot={isSecondShot} coverTypeIsFrom={isSecondShot} />}
					{/* 美拍 */}
					{isBeautyShot ? <BeautyShotContent {...uniqueContentParam} hotcategoryList={hotcategoryList} hotcategoryMap={hotcategoryMap} />
						: null}
					{/* 封面标题 */}
					<CoverTitleContent {...CoverTitleContentParam} />
					{isBeautyShot || isQuickWorker ? <VideoTitleContent {...uniqueContentParam} {...videoNoteParam[radioGroupValue]} key={`${radioGroupValue}VideoTitleContent`} /> : null}
					{/* 秒拍 */}
					{isSecondShot ? <SecondShotContent {...uniqueContentParam} /> : null}
					{/* 推广产品所属行业组件 */}
					<IndustryCategory key={`${radioGroupValue}IndustryCategory`} {...uniqueContentParam} industryList={industryList} industryMap={industryMap} />
					{/* 历史证明组件 */}
					<QualificationImg  {...uniqueContentParam} key={`${radioGroupValue}QualificationImg`} uploadToken={uploadToken} companyId={company_id} />
					<Row style={{ marginBottom: 30 }}>
						<Col span={4}></Col>
						<Col span={20}>
							{/* 是否同意微播易 */}
							{/* <AllowService {...uniqueContentParam} /> */}
							<Button id="video-dispath-save-id" type="primary" onClick={this.submitFrom} loading={saveButtonState}>{isEditAction ? "保存" : "下一步"}</Button>
						</Col>
					</Row>
				</Form ></Spin>
		) : null
	}
}
const CreateMicroFlashesForm = Form.create()(CreateMicroFlashes);
const mapStateToProps = (state) => ({
	videoDispatch: state.videoDispatch
})

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...actions
	}, dispatch)
})
export default (connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(CreateMicroFlashesForm)))
