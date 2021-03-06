import React, { Component } from 'react'
import { ShowDetailArr, DividingBox, PaymentMethodDetail, CooperationMethodDetail } from "../components/common";
import Quotation from "../components/cooperationPlatformEdit/Quotation";
import ChargeType from "../components/cooperationPlatformEdit/ChargeType";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from '../actions/index'
import { Spin, Button } from 'antd';
import { Link } from 'react-router-dom';
import qs from "qs";
class CooperationPlatformDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            cooperationPlatformInfoDetail: {},
            trinitySkuTypeList: [],
            trinityTollTypeList: []
        };
    }
    componentDidMount = async () => {
        const { actions: { getCooperationPlatformInfoById, getTrinitySkuTypeList,
            getTrinityTollTypeList } } = this.props
        const data = qs.parse(window.location.search.substring(1))
        const coRes = await getCooperationPlatformInfoById({ id: data.id })
        const tsRes = await getTrinitySkuTypeList({ trinityPlatformCode: data.code, platformId: data.platformId })
        const ttRes = await getTrinityTollTypeList({ trinityPlatformCode: data.code })
        this.setState({
            isLoading: false,
            cooperationPlatformInfoDetail: coRes.data,
            trinitySkuTypeList: this.changeSkuTypeList(tsRes.data),
            trinityTollTypeList: ttRes.data
        })
    }
    changeSkuTypeList = (list = []) => {
        return list.map(item => ({
            ...item,
            skuTypeIds: item.skuTypeList.map(item => ({
                key: item.skuTypeId,
                label: item.skuTypeName
            }))
        }))
    }
    render () {
        const {
            cooperationPlatformInfoDetail,
            trinitySkuTypeList,
            trinityTollTypeList
        } = this.state
        const {
            isNeedScreenshot,
            cooperationPlatformName,
            platformName,
            captureCooperationPlatformName,
            agentVo = {},
            platformId,
            orderPriceTipsTitle = '',
            formulaDesc = ''
        } = cooperationPlatformInfoDetail || {}
        const { settleType, returnInvoiceType, invoiceType, agentTaxRate } = agentVo
        const { paymentCompanyName } = agentVo
        const baseInfo = [
            { title: "所属媒体平台", content: platformName },
            { title: "下单平台", content: captureCooperationPlatformName },
            { title: "微播易展示下单平台名称", content: cooperationPlatformName },
            { title: "下单截图是否必填", content: isNeedScreenshot == 1 ? '是' : '否' },
            { title: "付款公司", content: paymentCompanyName },
            {
                title: "下单价提示标题", content: <div
                    style={{ margin: '0 0 12px' }}
                    dangerouslySetInnerHTML={{
                        __html: orderPriceTipsTitle.replace(/\n/g, '<br />')
                    }}></div>
            },
            {
                title: "公式说明", content: <div
                    style={{ margin: '0 0 12px' }}
                    dangerouslySetInnerHTML={{
                        __html: formulaDesc.replace(/\n/g, '<br />')
                    }}></div>
            },
        ]
        const invoiceArr = {
            1: '增值税专用发票',
            2: '增值税普通发票'
        }
        const payInfo = [
            { title: "结算方式", content: settleType == 1 ? '预付' : '周期结算' },
            { title: "回票方式", content: returnInvoiceType == 1 ? '全部回款' : returnInvoiceType == 2 ? '部分回款' : '不回款' },
            { title: "回票类型", content: invoiceArr[invoiceType] },
            { title: "发票税率", content: `${Number(agentTaxRate || 0) * 100} %`, isHide: invoiceType != 1 },
        ]
        const { isLoading } = this.state
        return (
            <Spin spinning={isLoading && Object.keys(cooperationPlatformInfoDetail).length > 0}>
                <DividingBox text="平台基本信息" />
                <div style={{ margin: "30px 0px" }}>
                    <ShowDetailArr arr={baseInfo} />
                    <ShowDetailArr arr={[{ title: "平台报价项", content: "" }]} />
                    <div style={{ marginLeft: 70 }}>
                        <Quotation isEdit={true} noLast={true} platformId={platformId} trinitySkuTypeVOS={trinitySkuTypeList} />
                    </div>
                    <ShowDetailArr arr={[{ title: "收费类型", content: "" }]} />
                    <div style={{ marginLeft: 70 }}>
                        <ChargeType isEdit={true} noLast={true} trinityTollTypeVOS={trinityTollTypeList} />
                    </div>
                </div>
                <DividingBox text="平台合作信息" />
                <div style={{ margin: "30px 0px" }}>
                    <CooperationMethodDetail detailData={agentVo} />
                    <ShowDetailArr arr={payInfo.filter(item => !(item.isHide))} />
                    <PaymentMethodDetail detailData={agentVo} />
                </div>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                    <Link to="/config/platform/list">
                        <Button >返回</Button>
                    </Link>
                </div>
            </Spin>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cooperationPlatformReducer: state.cooperationPlatformReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(action, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(CooperationPlatformDetail);
