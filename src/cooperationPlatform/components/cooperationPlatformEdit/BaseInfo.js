import React, { Component } from 'react'
import { Form, Input, Select, Radio, Col, Row } from 'antd';
import Quotation from "./Quotation";
import ChargeType from "./ChargeType";
import QuotationEdit from "./QuotationEdit";
import ChargeTypeEdit from "./ChargeTypeEdit";
import { PaymentCompany } from "../common/index";
import qs from "qs";
import numeral from "numeral"
const Option = Select.Option;
const RadioGroup = Radio.Group;
class BaseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trinitySkuTypeVOS: [],
            trinityTollTypeVOS: [],
            IDCount: 1,
            id: qs.parse(window.location.search.substring(1)).id,
            unUsedCPSelect: [],
            platformName: '',
            cooperationPlatformName: ''
        };
    }
    componentDidMount = () => {
        const { actions: { getTrinitySkuTypeList, getTrinityTollTypeList } } = this.props
        const data = qs.parse(window.location.search.substring(1))
        if (data.id > 0) {
            this.setState({
                platformName: data.platformName,
            })
            //此处查询报价项列表
            getTrinitySkuTypeList({ trinityPlatformCode: data.code, platformId: data.platformId }).then(({ data }) => {
                const dataSku = {
                    trinitySkuTypeVOS: this.changeSkuTypeList(data)
                }
                this.setState(dataSku, () => {
                    this.props.form.setFieldsValue(dataSku)
                })
            })
            //此处查询消费类型列表
            getTrinityTollTypeList({ trinityPlatformCode: data.code }).then(({ data }) => {
                const dataToll = { trinityTollTypeVOS: data }
                this.setState(dataToll, () => {
                    this.props.form.setFieldsValue(dataToll)
                })
            })
        }
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
    updateBaseInfotate = (data) => {
        this.setState(data)
    }
    //前台新增数据
    addList = (item, type) => {
        const { IDCount } = this.state
        item.idAdd = `${type}${numeral(IDCount).format('0000')}`
        item.trinitySkuTypeStatus = 2
        const data = { [type]: [...this.state[type], ...[item]], IDCount: IDCount + 1 }
        this.setState(data, () => {
            this.props.form.setFieldsValue(data)
        })
        this.props.setShowModal(false)
    }
    //前台修改数据
    updateList = (index, item, type) => {
        this.state[type].splice(index, 1, item)
        const data = { [type]: this.state[type] }
        this.setState(data, () => {
            this.props.form.setFieldsValue(data)
        })
        this.props.setShowModal(false)
    }
    //前台删除数据
    deleteList = (id, type) => {
        const data = { [type]: this.state[type].filter(one => one.idAdd != id) }
        this.setState(data, () => {
            this.props.form.setFieldsValue(data)
        })
    }
    //修改该报价项的并实时查询数据
    editQuotation = (params, onChange) => {
        const { actions, setShowModal, updateBaseInfoState } = this.props
        const data = qs.parse(window.location.search.substring(1))
        actions.addOrUpdateTrinitySkuType(params).then(() => {
            setShowModal(false)
            actions.getTrinitySkuTypeList({
                trinityPlatformCode: data.code,
                platformId: data.platformId
            }).then(({ data }) => {
                this.setState({ trinitySkuTypeVOS: this.changeSkuTypeList(data) })
                onChange && onChange()
            })
        })
    }
    //平台重选后重新查询相应的报价项，消费类型，并清空原来的列表信息
    platformChange = async (platformId, option) => {
        const { actions, form } = this.props
        const { platformName } = option.props
        //收费类型和sku列表清空
        this.setState({
            trinitySkuTypeVOS: [],
            trinityTollTypeVOS: [],
            platformName: platformName,
            cooperationPlatformName: ''
        })
        //清空可下拉数据，清空微博自定义名称
        form.resetFields(['cooperationPlatformName', 'cooperationPlatformKey'])
        //获取未使用关联的抓取合作平台
        const unCP = await actions.getUnusedCooperationPlatform({ platformId: platformId })
        this.setState({
            unUsedCPSelect: unCP.data,
        })

    }
    changeCPkey = async (value, option) => {
        const { form } = this.props
        const { cooperationPlatformName } = option.props
        //收费类型和sku列表清空
        this.setState({
            trinitySkuTypeVOS: [],
            trinityTollTypeVOS: [],
            cooperationPlatformName: cooperationPlatformName
        })
        //设置默认值
        form.setFieldsValue({
            cooperationPlatformName: cooperationPlatformName
        })
    }
    render () {
        const { form, formLayout, setShowModal, actions, platformSelect, cooperationPlatformInfoDetail, cooperationPlatformReducer, } = this.props
        const { agentVo = {}, formulaDesc, orderPriceTipsTitle } = cooperationPlatformInfoDetail
        const { getFieldDecorator, getFieldValue } = form
        debugger
        const formLayoutTable = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        }
        const formLayoutModal = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        }
        const { id, cooperationPlatformName, platformName } = this.state
        const titleModal = <span style={{ paddingLeft: 16 }}>【平台：{platformName || cooperationPlatformInfoDetail.platformName}<span style={{ paddingLeft: 6 }}>下单平台：{cooperationPlatformName || cooperationPlatformInfoDetail.captureCooperationPlatformName}】</span></span>
        const operateProps = {
            actions,
            addList: this.addList,
            updateList: this.updateList,
            deleteList: this.deleteList,
            formLayoutModal: formLayoutModal,
            setShowModal,
            updateBaseInfoState: this.updateBaseInfoState,
            editQuotation: this.editQuotation,
            platformId: getFieldValue("platformId"),
            cooperationPlatformKey: getFieldValue("cooperationPlatformKey"),
            cooperationPlatformReducer,
            ...this.state,
            titleModal
        }
        return (
            <div style={{ margin: "20px 0px" }}>
                <Form.Item style={{ display: 'none' }}>
                    {getFieldDecorator('agentVo.id', {
                        initialValue: agentVo && agentVo.id
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="所属媒体平台"{...formLayout} >
                    {getFieldDecorator('platformId', {
                        initialValue: cooperationPlatformInfoDetail && cooperationPlatformInfoDetail.platformId,
                        rules: [
                            { required: true, message: '本项为必选项，请选择！' },
                        ],
                    })(
                        id > 0 ? <span>{cooperationPlatformInfoDetail && cooperationPlatformInfoDetail.platformName}</span> : <Select placeholder="请选择" style={{ width: 250 }} onChange={this.platformChange}>
                            {(platformSelect && platformSelect.arr || []).map((one => <Option key={one.platformName}
                                platformName={one.platformName} value={one.id} >{one.platformName}</Option>))}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="可选下单平台"{...formLayout} >
                    {getFieldDecorator('cooperationPlatformKey', {
                        initialValue: cooperationPlatformInfoDetail && cooperationPlatformInfoDetail.cooperationPlatformKey,
                        rules: [
                            { required: true, message: '本项为必选项，请选择！' },
                        ],
                    })(
                        id > 0 ? <span>{cooperationPlatformInfoDetail && cooperationPlatformInfoDetail.captureCooperationPlatformName}</span> : <Select placeholder="请选择" style={{ width: 250 }} onChange={this.changeCPkey} >
                            {this.state.unUsedCPSelect.map((one => <Option
                                key={one.cooperationPlatformKey}
                                cooperationPlatformName={one.cooperationPlatformName}
                                value={one.cooperationPlatformKey} >{one.cooperationPlatformName}</Option>))}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="微播易展示下单平台名称"  {...formLayout}>
                    {getFieldDecorator('cooperationPlatformName', {
                        initialValue: cooperationPlatformInfoDetail && cooperationPlatformInfoDetail.cooperationPlatformName,
                        validateFirst: true,
                        rules: [
                            { required: true, message: '本项为必填项，请输入！' },
                            { max: 15, message: "最多可输入15个字！" }
                        ],
                    })(
                        <Input placeholder="最多可输入15个字！" style={{ width: 250 }} />
                    )}
                </Form.Item>
                <Form.Item label="下单截图是否必填"{...formLayout}>
                    {getFieldDecorator('isNeedScreenshot', {
                        initialValue: cooperationPlatformInfoDetail && cooperationPlatformInfoDetail.isNeedScreenshot,
                        rules: [
                            { required: true, message: '本项为必选项，请选择！' },
                        ],
                    })(
                        <RadioGroup>
                            <Radio value={1}>是</Radio>
                            <Radio value={2}>否</Radio>
                        </RadioGroup>
                    )}
                </Form.Item>
                <PaymentCompany form={form} formLayout={formLayout} dataDefault={agentVo} />
                <Form.Item label="平台报价项" {...formLayoutTable}>
                    <div style={{ textAlign: "right" }}><a onClick={() => setShowModal(true, {
                        title: <div>新增报价项{titleModal}</div>,
                        content: <QuotationEdit
                            key={getFieldValue("cooperationPlatformKey")}
                            {...operateProps}
                            isAddCooperation={true}
                        />
                    })}
                    >新增报价项</a></div>
                    {getFieldDecorator('trinitySkuTypeVOS', {
                        rules: [
                            { required: true, message: '请添加平台报价项' },
                        ],
                    })(
                        <Input style={{ display: "none" }} />
                    )}
                    <div style={{ marginLeft: -100 }}>
                        <Quotation {...operateProps} />
                    </div>
                </Form.Item>


                <Form.Item label="收费类型" {...formLayoutTable}>
                    {getFieldDecorator('trinityTollTypeVOS')(
                        <Input style={{ display: "none" }} />
                    )}
                    <div style={{ textAlign: "right" }}><a onClick={() => setShowModal(true,
                        {
                            title: <div>新增收费类型{titleModal}</div>,
                            content: <ChargeTypeEdit {...operateProps}
                                key={getFieldValue("cooperationPlatformKey")} />
                        })}>
                        新增收费类型</a>
                    </div>
                    <div style={{ marginLeft: -100 }}>
                        <ChargeType {...operateProps} />
                    </div>
                </Form.Item>
            </div >
        );
    }
}

export default BaseInfo;
