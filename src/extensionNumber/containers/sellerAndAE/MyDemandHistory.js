import React, { Component } from "react";
import api from '../../../api'
import {
    Button,
    Col,
    DatePicker,
    Divider,
    Form,
    Icon,
    Input,
    message,
    Modal,
    Popover,
    Row,
    Select,
    Table,
    Tooltip
} from "antd";
import { connect } from "react-redux";
import FilterContainer from "../../components/FilterContainer";
import {
    accountStatusMap,
    dashboardMap,
    progressMap
} from "../../constants/config";
import NumberInfo from '../../base/NumberInfo/index';
import numeral from 'numeral';
import * as actions from "../../actions";
import PlatformSelect from "../../base/PlatformSelect";
import StausView from "../../base/StatusView";
import { ExpandProgressModal } from "../../components/ExpandProgressModal"
import moment from 'moment'

const { RangePicker } = DatePicker;
const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input;

@connect(state => state.extensionNumber, actions)
class MyDemandHistory extends Component {
    state = {
        filter: {},
        currentPage: 1,
        selectedRowKeys: [],
        endModalShow: false,
        endReason: '',
        endReasonLoading: false,
        step: 1,
        tableLoading: false,
        requirementModalShow: false,
        requirementDetail: null,
        progress_status_reason: '',
        updated_at: '',
        creator: '',
        showExtendProgress: false,
        type: '',
        pagesize: 20
    }
    handleEndModal = () => {
        this.setState({
            endModalShow: true
        })
    }
    sendEndReason = () => {
        if (!this.state.endReason) {
            this.setState({
                error: true
            })
            return
        }
        this.setState({
            error: false,
            endReasonLoading: true
        })
        // 提交终止
        this.props.postEndReason({
            id: this.state.selectedRowKeys,
            finish_status_reason: this.state.endReason
        }).then(() => {
            message.success('终止拓号成功', 1.2, () => {
                // 重新拉取数据 + 复位
                this.getList()
                this.setState({
                    endModalShow: false,
                    sendReason: '',
                    endReasonLoading: false,
                    selectedRowKeys: []
                })

            });
        }).catch(() => {
            message.error('终止拓号失败', 1.2);
            this.setState({
                endReasonLoading: false
            })
        })
    }
    // 创建需求详情弹窗内容
    createRequirementDetail = info => {
        let C = null;
        if (info) {
            C = <div className='requirement-detail'>
                <Row>
                    <Col span={7}>需求名称:</Col>
                    <Col span={15} offset={1}>{info.requirement_name}</Col>
                </Row>
                <Row>
                    <Col span={7}>创建人区域:</Col>
                    <Col span={15} offset={1}>{info.creator_area}</Col>
                </Row>
                <Row>
                    <Col span={7}>项目组名称:</Col>
                    <Col span={15} offset={1}>{info.project_team_name}</Col>
                </Row>
                {/*<Row>*/}
                {/*<Col span={7}>需求计划:</Col>*/}
                {/*<Col span={15} offset={1}>{info.requirement_plan}</Col>*/}
                {/*</Row>*/}
                <Row>
                    <Col span={7}>创建人联系方式:</Col>
                    <Col span={15} offset={1}>{info.creator_mobile}</Col>
                </Row>
                {/*<Row>*/}
                {/*<Col span={7}>需求来源:</Col>*/}
                {/*<Col span={15} offset={1}>{sourceMap[info.source_code].text}</Col>*/}
                {/*</Row>*/}
                <Row>
                    <Col span={7}>预计推广时间:</Col>
                    <Col span={15} offset={1}>{info.promotion_start_at + ' 到 ' + info.promotion_end_at}</Col>
                </Row>
                <Row>
                    <Col span={7}>推广产品:</Col>
                    <Col span={15} offset={1}>{info.promoted_product}</Col>
                </Row>
                <Row>
                    <Col span={7}>最晚上架时间:</Col>
                    <Col span={15} offset={1}>{info.launched_before}</Col>
                </Row>
                <Row>
                    <Col span={7}>需求描述:</Col>
                    <Col span={15} offset={1}>{info.desc}</Col>
                </Row>
                <Row>
                    <Col span={7}>备注:</Col>
                    <Col span={15} offset={1}>{info.comment}</Col>
                </Row>
            </div>
            this.setState({
                requirementModalShow: true,
                requirementDetail: C
            })
        }
    }

    // 获取列表方法
    getList = async (query = {}) => {
        let { getDemandHistory } = this.props
        let { filter } = this.state
        this.setState({ tableLoading: true })
        await getDemandHistory({ ...filter, page: 1, ...query })
        this.setState({
            selectedRowKeys: [],
            filter: { ...filter, ...query },
            tableLoading: false,
            currentPage: query.page || 1
        })
    }

    componentWillMount() {
        let { getRequirementStat } = this.props
        // 获取历史需求列表
        this.getList()
        // 获取需求统计数据
        getRequirementStat();

    }

    //显示不合格原因
    showExtendProgress(progress_status_reason, progress_status_updated_at, operator, type) {
        this.setState({
            showExtendProgress: true,
            progress_status_reason: progress_status_reason,
            updated_at: progress_status_updated_at,
            creator: operator,
            type: type
        });
    }

    closeExtendProgress = () => {
        this.setState({
            showExtendProgress: false,
            progress_status_reason: '',
            updated_at: '',
            operator: ''
        })
    }

    render() {
        let { demandHistory, requirementStat, getDemandHistory } = this.props
        let { count = 0, page = 1, pageNum = 100, map, list, total } = demandHistory || {}
        let columns = [
            {
                title: '需求名称',
                dataIndex: 'requirement_name',
                align: 'center',
                render: (name, info) => {
                    return <a onClick={() => {
                        this.createRequirementDetail(info)
                    }}>{name}</a>;
                }
            },
            {
                title: '拓号进度',
                dataIndex: 'progress',
                align: 'center',
                render: (progress, { progress_status, progress_status_reason, progress_status_updated_at, operator }) => {
                    if (progress_status == '3') {
                        return <a href="javascript:;" onClick={this.showExtendProgress.bind(this, progress_status_reason, progress_status_updated_at, operator, 'failProgressTitle')}> {progress} </a>
                    } else if (progress_status == '5') {
                        return <a href="javascript:;" onClick={this.showExtendProgress.bind(this, progress_status_reason, progress_status_updated_at, operator, 'contactProgressTitle')}> {progress} </a>
                    } else if (progress_status == '7') {
                        return <a href="javascript:;" onClick={this.showExtendProgress.bind(this, progress_status_reason, progress_status_updated_at, operator, 'alreadyStopTitle')}> {progress} </a>
                    } else {
                        return <span>{progress}</span>
                    }
                }
            },
            {
                title: '账号状态',
                dataIndex: 'status_name',
                align: 'center',
                width: 90,
                render: (time) => time ? <StausView status={time} /> : '-'
            },
            {
                title: '平台',
                dataIndex: 'weibo_type_name',
                align: 'center',
                render: (name) => {
                    return name;
                }
            }, {
                title: '账号名称',
                align: 'center',
                render: (text, record) => {
                    let linkList = [119, 25, 24, 103, 115, 118, 116, 110, 93,9]//通过链接获取
                    let showUrl = () => {
                        if(record.url==''){
                            return '-'
                        }else{
                            if(linkList.indexOf(record.weibo_type) !== -1){
                                return <a href={record.url} target='_blank'>URL</a>
                            }else{
                                if(linkList.indexOf(record.weibo_type) == -1 && record.status !== 5){
                                   
                                    return <a href={record.url} target='_blank'>URL</a>
                                }else{
                                    return '-'
                                }

                            }
                        }
                    }
                    return (
                        < p >
                            <span style={{ 'float': 'left' }}>{record.account_name}</span>
                            <span style={{ 'float': 'right' }}>
                                {showUrl() }
                            </span>
                        </p >
                    )
                }
            }, {
                title: 'ID',
                dataIndex: 'weibo_id',
                align: 'center',
                render: (id) => {
                    return id
                }
            }, {
                title: '最晚上架时间',
                dataIndex: 'launched_before',
                align: 'center',
                width: 102,
                render: (num) => num ? num : '-'
            }, {
                title: '媒介经理',
                dataIndex: 'owner_admin',
                align: 'center',
                render: (text, record) => {
                    if (record.user_owner_admin) {
                        return <Popover placement="top" title='联系方式:' content={record.user_owner_admin_cell_phone || '无'} trigger="hover">
                            <a href="javascript:void(0)">{record.user_owner_admin}
                            </a></Popover>
                    } else if (record.owner_admin) {
                        return <Popover placement="top" title='联系方式:' content={record.owner_admin_cell_phone || '无'} trigger="hover">
                            <a href="javascript:void(0)">{record.owner_admin}
                            </a></Popover>
                    } else {
                        return '-'
                    }
                }

            },
            {
                title: '上架时间',
                dataIndex: 'online_time',
                align: 'center',
                width: 102,
                render: (text, record) =>
                    isNaN(Date.parse(record.online_time)) ? '-' : record.online_time
            },
            {
                title: '创建人',
                dataIndex: 'creator',
                align: 'center',
                render: (creator) => creator ? creator : '-'
            },
            {
                title: '创建时间',
                dataIndex: 'created_at',
                align: 'center',
                width: 102,
                render: (text) => {
                    return <span>{text || '-'}</span>
                }
            }
            // , {
            //     title: '需求处理时间',
            //     dataIndex: 'progress_status_updated_at',
            //     align: 'center',
            //     width: 102,
            //     render: (time) => time || '-'
            // },

        ]
        let rowSelection = {
            getCheckboxProps: (record) => ({
                disabled: (record.status == 2 || record.finish_status_code == '1')
            }),
            width: 60,
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys) => {
                this.setState({ selectedRowKeys })
            }
        };
        let pagination = {
            position: 'top',
            showTotal: total => `共 ${Math.ceil(total / pageNum)} 页，${total} 条`,
            size: 'small',
            onChange: (current) => {
                this.getList({ page: current, pageNum: pageNum })
                //this.getList({ page: current })
            },
            total: count,
            pageSize: pageNum,
            current: Number(page),
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ["10", "20", "50", "100"],
            onShowSizeChange: (current, size) => {
                this.setState({
                    pagesize: size
                }, () => {
                    this.getList({ page: current, pageNum: size })
                })
            }
        }
        let dashboardData = Object.entries(dashboardMap).reduce((pre, [key, value]) => {
            pre[key] = { ...value, count: requirementStat[key] }
            return pre
        }, {})
        let primary_key = 'id'
        let dataSoure = list.map(item => map[item])
        let modalTitle = () => {
            if (this.state.type == 'failProgressTitle') {
                return '不合作'
            }
            if (this.state.type == 'contactProgressTitle') {
                return '提供信息有误'
            }
            if (this.state.type == 'alreadyStopTitle') {
                return '已终止'
            }
        }
        return (
            <div className='extension-number demand-history-page'>
                <section className='dashboard'>
                    {
                        Object.values(dashboardData).map(({ name, count, filter }) => (
                            <NumberInfo
                                key={name}
                                onClick={() => {
                                    this.getList({
                                        ...filter,
                                        updated_at: (name === '今日完成拓号数' ? moment().format() : undefined)
                                    })
                                    this.filterFormRef.props.form.resetFields()
                                }}
                                subTitle={<span>{name}</span>}
                                total={numeral(count).format('0,0')}
                                subTotal={
                                    <Tooltip title="点击查看列表"><Icon type="info-circle-o" /></Tooltip>}
                            />
                        ))
                    }
                </section>
                <Divider />
                <header className='page-content'>
                    <FilterContainer>
                        <FilterForm tableLoading={this.state.tableLoading}
                            getList={this.getList}
                            filter={this.state.filter}
                            getDemandHistory={getDemandHistory}
                            wrappedComponentRef={node => this.filterFormRef = node}
                        />
                    </FilterContainer>
                </header>
                <main>
                    <Table rowSelection={rowSelection} pagination={pagination}
                        bordered columns={columns}
                        rowKey={record => record[primary_key]}
                        dataSource={dataSoure}
                        loading={this.state.tableLoading}
                    />
                </main>
                <footer className='page-footer'>
                    <Button type='primary' disabled={this.state.selectedRowKeys.length <= 0} className='next-button' onClick={this.handleEndModal}>终止拓号</Button>
                </footer>
                {this.state.endModalShow ? <Modal
                    maskClosable={false}
                    visible={true}
                    title='微播易提醒您：'
                    wrapClassName='extension-number-modal modal-select-number-page'
                    width={600}
                    confirmLoading={this.state.endReasonLoading}
                    onCancel={() => {
                        this.setState({
                            endModalShow: false,
                            sendReason: ''
                        })
                    }}
                    onOk={this.sendEndReason}
                >
                    <p>请确认是否终止拓号，并填写终止原因</p>
                    <div className={this.state.error ? 'has-error' : ''}>
                        <TextArea style={{ marginBottom: '0px' }}
                            onChange={e => {
                                this.setState({
                                    endReason: e.target.value,
                                    error: !e.target.value
                                })
                            }}
                            placeholder="终止拓号原因" autosize={{
                                minRows: 4,
                                maxRows: 4
                            }} />
                        {this.state.error ?
                            <div className="ant-form-explain">
                                请填写终止拓号原因</div> : null}
                    </div>
                </Modal> : null}
                <Modal visible={this.state.requirementModalShow}
                    onCancel={() => this.setState({ requirementModalShow: false })}
                    footer={null}
                    className='extension-number-modal'
                    title='需求详情'
                >
                    {this.state.requirementDetail}
                </Modal>
                {/*不合格原因*/}
                {
                    <ExpandProgressModal
                        title={modalTitle()}
                        visible={this.state.showExtendProgress}
                        footer={[
                            <Button key="back" onClick={this.closeExtendProgress}>确认</Button>]}
                        onOk={this.closeExtendProgress}
                        onCancel={this.closeExtendProgress}
                        creator={this.state.creator}
                        updated_at={this.state.updated_at}
                        progress_status_reason={this.state.progress_status_reason || '无'}
                    >
                    </ExpandProgressModal>
                }
            </div>
        );
    }
}

@Form.create({})
@connect(state => ({
    mediaManagerList: state.extensionNumber.mediaManagerList,
    authVisibleList: state.authorizationsReducers.authVisibleList
}), actions)
class FilterForm extends Component {
    // 查询提交
    submitQuery = (e) => {
        let { getList } = this.props
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // 处理查询参数 params
                let params = Object.entries(values).reduce((pre, [key, value]) => {
                    if (key === 'submission_time') {
                        if (value && value.length > 0) {
                            pre['created_at_start'] = value[0].format();
                            pre['created_at_end'] = value[1].format();
                        } else {
                            pre['created_at_start'] = pre['created_at_end'] = undefined;
                        }
                    } else if (key === 'deadline_range') {
                        if (value && value.length > 0) {
                            pre['launched_before_start_at'] = value[0].format();
                            pre['launched_before_end_at'] = value[1].format();
                        } else {
                            pre['launched_before_start_at'] = pre['launched_before_end_at'] = undefined;
                        }
                    } else {
                        pre[key] = value
                    }
                    return pre
                }, {})
                params['updated_at'] = undefined
                // 查询请求
                getList(params)
            }
        });
    }
    handleDownload = async () => {
        let { getDemandHistory } = this.props
        let { filter } = this.props
        //因为没有返回值
        await api.get('/extentionAccount/requirement', { params: { ...filter, type: 1 } })
    }

    componentWillMount() {
        let { authVisibleList } = this.props;
        if (authVisibleList['extention.historylist.creator.search.select'] != undefined) {
            this.props.getMediaManagerList()
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form
        let accountStatusKeys = [1, 2, 3, 5],
            progressKeys = [3, 4, 5, 6, 7, 8, 9, 10],
            accountStatusAry = accountStatusKeys.map(key => accountStatusMap[key]),
            progressAry = progressKeys.map(key => progressMap[key]),
            tmpAry = [],
            { mediaManagerList, authVisibleList } = this.props;
        if (authVisibleList['extention.historylist.creator.search.select'] != undefined) {
            if (Object.keys(mediaManagerList).length > 0) {
                tmpAry = [...mediaManagerList[6]]
            }
        }

        return (<Form layout="inline" onSubmit={this.submitQuery}>
            <FormItem label="需求名称">
                {
                    getFieldDecorator('requirement_name', {})(
                        <Input placeholder='需求名称' style={{ width: 144 }} />)
                }
            </FormItem>
            <FormItem label="账号名称">
                {
                    getFieldDecorator('account_name', {})(
                        <Input placeholder='账号名称' style={{ width: 144 }} />)
                }
            </FormItem>
            <FormItem label="拓号进度">
                {
                    getFieldDecorator('progress_status', {})(
                        <Select allowClear
                            getPopupContainer={() => document.querySelector('.demand-history-page')}
                            style={{ width: 196 }} placeholder='选择进度'>
                            {progressAry.map(({ id, text }) =>
                                <Option key={id}>{text}</Option>)}
                        </Select>)
                }
            </FormItem>
            <FormItem label="账号状态">
                {
                    getFieldDecorator('status', {})(
                        <Select allowClear
                            //getPopupContainer={() => document.querySelector('.fix-task-page')}
                            style={{ width: 110 }} placeholder='选择状态'>
                            {
                                accountStatusAry.map(({ id, text }) =>
                                    <Option key={id}>{text}</Option>)
                            }

                        </Select>)
                }
            </FormItem>


            <FormItem label="平台">
                {
                    getFieldDecorator('weibo_type', {})(
                        <PlatformSelect getPopupContainer={() => document.querySelector('.demand-history-page')} />)
                }
            </FormItem>
            {authVisibleList['extention.historylist.creator.search.select'] != undefined && tmpAry ?
                <FormItem label="创建人">
                    {
                        getFieldDecorator('user_id', {})(
                            <Select
                                allowClear style={{ width: 120 }} placeholder='选择状态'>
                                {
                                    tmpAry.map(({ user_id, real_name }) =>
                                        <Option key={user_id}>{real_name}</Option>
                                    )
                                }
                            </Select>
                        )
                    }
                </FormItem> : null}
            <FormItem label="最晚上架时间">
                {
                    getFieldDecorator('deadline_range', {})(
                        <RangePicker format='YYYY-MM-DD HH:mm:ss' showTime={{
                            hideDisabledOptions: true,
                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
                        }} />)
                }
            </FormItem>
            <FormItem label="创建时间">
                {
                    getFieldDecorator('submission_time', {})(
                        <RangePicker format='YYYY-MM-DD HH:mm:ss' showTime={{
                            hideDisabledOptions: true,
                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
                        }} />)
                }
            </FormItem>
            <FormItem>
                <Button type='primary'
                    htmlType="submit"
                    loading={this.props.tableLoading}
                    style={{ width: '80px' }}
                    className='filter-button mr10'>查询</Button>
                <Button type='dashed'
                    style={{ color: '#1da57a' }}
                    onClick={this.handleDownload}
                >导出结果</Button>
            </FormItem>
        </Form>)
    }
}

export default MyDemandHistory;
