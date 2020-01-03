import React, { Component } from "react";
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
    Radio,
    Row,
    Select,
    Spin,
    Table,
    Tooltip
} from "antd";
import { connect } from "react-redux";
import * as actions from '../../actions'

import FilterContainer from "../../components/FilterContainer";
import './allocateTask.less';
import PlatformSelect from "../../base/PlatformSelect";
import {
	accountStatusMap, areaMap,
	dashboardAccountMap,
	finishStatusMap,
	progressMap,
	sourceMap
} from "../../constants/config";
import StausView from "../../base/StatusView";
import debounce from 'lodash/debounce';
// import SearchSelect from "../../base/SearchSelect";
import ViewMoreText from "../../base/ViewMoreText";
import moment from 'moment'
import numeral from "numeral";
import NumberInfo from "../../base/NumberInfo";
import { ExpandProgressModal } from "../../components/ExpandProgressModal"
import { withRouter } from "react-router-dom";
import api from '@/api';


const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input;

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
};

@withRouter
@connect(state => state.extensionNumber, actions)
class AllocateTask extends Component {
    state = {
        filter: {},
        currentPage: 1,
        selectedRowKeys: [],
        tableLoading: false,
        requirementModalShow: false,
        requirementDetail: null,
        changeProgressModalShow: false,
        changeProgressForm: null,
        storeModalShow: false,
        storeForm: null,
        changeProgressLoading: false,
        accountIDmodal: false,
        accountIDnameId: "",
        accountIDTextArea: "",
        pagesize: 20,
        filteredInfo: null,
        sortedInfo: null,
        columnKey: 'launched_before'
    }

    // 更新进度
    changeProgress = () => {
        let { postProgressStatusUpdate } = this.props
        this.tipProgress.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    changeProgressLoading: true
                });
                postProgressStatusUpdate(values).then(({ msg }) => {
                    message.success(msg, 1.2)
                    // 重新拉取数据 + 复位
                    this.getList({ page: this.state.currentPage })
                    this.setState({
                        changeProgressModalShow: false,
                        changeProgressForm: false
                    });
                })
                    .catch(() => {
                        message.error('分配失败', 1.2)
                        this.setState({
                            submitAllocateLoading: false
                        })
                    })
            }
        });
    }

    // 获取列表方法
    getList = async (query = {}) => {
        let { getOrientationList } = this.props
        let { filter } = this.state
        this.setState({ tableLoading: true })
        await getOrientationList({ ...filter, page: 1, ...query })
        this.setState({
            selectedRowKeys: [],
            filter: { ...filter, ...query },
            tableLoading: false,
            currentPage: query.page || 1
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
                <Row>
                    <Col span={7}>创建人联系方式:</Col>
                    <Col span={15} offset={1}>{info.creator_mobile}</Col>
                </Row>
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

    // 创建进度修改弹窗
    createChangeProgressForm = data => {
        let C = null;
        if (data) {
            C = <ProgressTips
                wrappedComponentRef={node => this.tipProgress = node}
                {...data} />
            this.setState({
                changeProgressModalShow: true,
                changeProgressForm: C
            })
        }
    }

    // 创建入库弹窗
    createStoreForm = data => {
        let C = null;
        if (data) {
            C = <SearchInput {...data} getUserList={this.props.getUserList} />

            this.setState({
                storeModalShow: true,
                storeForm: C
            })
        }
    }

    componentWillMount() {
        let { getMediaManagerList, mediaManagerList } = this.props;
        if (Object.keys(mediaManagerList).length <= 0) {
            getMediaManagerList()
        }
        this.getList();
    }
    showaccountIDmodal(id) {
        this.setState({ accountIDmodal: true, accountIDnameId: id })
    }
    closeaccountIDmodal() {
        this.setState({
            accountIDmodal: false,
            accountIDnameId: "",
            accountIDTextArea: ""
        })
    }

    accountIDTextArea(e) {
        this.setState({
            accountIDTextArea: e.target.value
        })
    }

    accountIDsubmit() {
        if (this.state.accountIDTextArea) {
            this.props.postrelateAccountId({
                id: this.state.accountIDnameId,
                account_id: this.state.accountIDTextArea
            }).then(() => {
                message.success("关联成功")
                this.getList({ page: this.state.currentPage })
                this.closeaccountIDmodal();
            })
        } else {
            message.error("accountid不能为空!");
        }
    }

    //显示不合格原因
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

    //排序
    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }
    render() {
        let { orientationList } = this.props
        let { count = 0, page = 1, pageNum = 100, map, list, stat, search_flag, } = orientationList || {}
        let { sortedInfo, filteredInfo, columnKey } = this.state
        let columns = [
            {
                title: '需求名称',
                dataIndex: 'requirement_name',
                align: 'center',
                key: 'requirement_name',
                width: 160,
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
                key: 'progress',
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
            }, {
                title: '账号状态',
                dataIndex: 'status_name',
                width: 102,
                key: 'status_name',
                align: 'center',
                render: (status) => <StausView status={status} /> || '-'
            }, {
                title: '平台',
                dataIndex: 'weibo_type_name',
                align: 'center',
                key: 'weibo_type_name',
                render: (text) => {
                    return <span>{text || '-'}</span>
                }
            }, {
                title: '账号名称',
                dataIndex: 'account_name',
                align: 'center',
                key: 'account_name',
                render: (text, record) => {
                    let ad = JSON.parse(record.account_id);
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
                    return <p>
                        <span style={{ float: 'left' }}>
                            {ad.code != 0 ? <a target='_blank'
                                href={`/account/manage/update/${record.weibo_type}?account_id=${ad.code}`}>{text}</a> : text
                            }
                        </span>
                        <span style={{ float: 'right' }}>
                            {showUrl()}
                        </span>
                    </p>
                }
            }, {
                title: 'ID',
                dataIndex: 'weibo_id',
                align: 'center',
                key: 'ID',
                render: (text) => {
                    return text
                }
            }, {
                title: '最晚上架时间',
                width: 132,
                dataIndex: 'launched_before',
                align: 'center',
                key: 'launched_before',
                render: (text, record) => text || '-',
                sorter: (a, b) =>
                    Date.parse(a.launched_before) - Date.parse(b.launched_before)

            }, {
                title: '备注',
                dataIndex: 'owner_admin_comment',
                align: 'center',
                width: 160,
                key: 'owner_admin_comment',
                render: (text) =>
                    <ViewMoreText content={text || ''} title='备注' />
            }, {
                title: '主账号',
                width: 100,
                align: 'center',
                dataIndex: 'identity_name',
                key: 'identity_name',
                render: (text, record) => {
                    return <a href={record.user_url} target='_blank'>{text}</a>
                }
            }, {
                title: '资源',
                dataIndex: 'user_owner_admin',
                align: 'center',
                key: 'user_owner_admin',
                render: (name, { user_owner_admin_cell_phone }) =>
                    <Popover placement="top" title='联系方式:' content={user_owner_admin_cell_phone} trigger="hover"><a>{name}</a></Popover> || '-'
            }, {
                title: '拓展',
                dataIndex: 'owner_admin',
                align: 'center',
                key: 'owner_admin',
                render: (name, { owner_admin_cell_phone }) =>
                    <Popover placement="top" title='联系方式:' content={owner_admin_cell_phone} trigger="hover"><a>{name}</a></Popover> || '-'
            }, {
                title: '销售/AE',
                dataIndex: 'creator',
                align: 'center',
                key: 'creator',
                render: (name, { cell_phone }) =>
                    <Popover placement="top" title='联系方式:' content={cell_phone} trigger="hover"><a>{name}</a></Popover>
            }, {
                title: '创建时间',
                dataIndex: 'created_at',
                align: 'center',
                key: 'created_at',
                render: (time) => {
                    return time
                }
            }, {
                title: '操作',
                dataIndex: '-',
                align: 'center',
                key: 'operate',
                width: 260,
                fixed: 'right',
                render: (n, item) => {
                    return <div>
                        {
                            (item.status == 1 || item.status == 5) ?
                                <Button className='mr5' type="primary" size='small' onClick={() => {
                                    this.createStoreForm(item)
                                }}>入库</Button> :
                                item.status == 3 ?
                                    <Button className='mr5' type="primary" size='small'
                                        onClick={() => {
                                            window.open(window.location.origin + '/account/manage/update/' + item.weibo_type + '?account_id=' + JSON.parse(item.account_id).code)
                                        }}>上架</Button> :
                                    null
                        }
                        {item.finish_status_code != 2 || item.status != 2 ?
                            <a type='primary' style={{ width: '80px' }}
                                onClick={() => {
                                    this.createChangeProgressForm(item)
                                }}
                                className='filter-button'>更新进度</a> : null}

                        {item.status == 5 ?
                            <a type='primary' style={{ width: '80px', marginLeft: "3px" }} className='filter-button'
                                onClick={this.showaccountIDmodal.bind(this, item.ext_account_id)}>
                                关联accountID
                            </a> : null}
                    </div>
                }
            }
        ]
        /*let rowSelection = {
        getCheckboxProps: (/!* record *!/) => ({
        disabled: false
        }),
        fixed: 'left',
        selectedRowKeys: this.state.selectedRowKeys,
        onChange: (selectedRowKeys) => {
        this.setState({ selectedRowKeys })
        },
        };*/
        let pagination = {
            position: 'top',
            showTotal: count => `共 ${Math.ceil(count / pageNum)} 页，${count} 条`,
            size: 'small',
            onChange: (current) => {
                this.getList({ page: current })
            },
            total: count,
            pageSize: pageNum,
            current: Number(page),
            showQuickJumper: true,
            pageSizeOptions: ["10", "20", "50", "100"],
            showSizeChanger: true,
            onShowSizeChange: (current, size) => {
                this.setState({
                    pagesize: size
                }, () => {
                    this.getList({ page: current, pageNum: size })
                })
            }
        }
        let primary_key = 'id'
        let dataSoure = list.map(item => map[item])
        let dashboardData = Object.entries(dashboardAccountMap).reduce((pre, [key, value]) => {
            pre[key] = { ...value, count: stat[key] }
            return pre
        }, {})
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
            <div className='extension-number fix-task-page'>
                <section className='dashboard'>
                    {
                        Object.values(dashboardData).map(({ name, count, filter }) => (
                            <NumberInfo
                                key={name}
                                onClick={() => {
                                    this.getList({
                                        ...filter,
                                        updated_start_at: (name === '今日完成拓号数' ? moment('00:00:00', 'HH:mm:ss').format() : undefined),
                                        updated_end_at: (name === '今日完成拓号数' ? moment('23:59:59', 'HH:mm:ss').format() : undefined)
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
                            mediaManagerList={this.props.mediaManagerList}
                            queryRequirement={this.props.queryRequirement}
                            search_flag={search_flag}
                            filter={this.state.filter}
                            list={list}
                            group1='1'
                            group2='2'
                            wrappedComponentRef={node => this.filterFormRef = node}
                        />
                    </FilterContainer>
                </header>
                <main>
                    <Table /* rowSelection={rowSelection}*/ pagination={pagination}
                        scroll={{ x: 1800 }}
                        bordered columns={columns}
                        loading={this.state.tableLoading}
                        rowKey={record => record[primary_key]}
                        dataSource={dataSoure}
                    />
                </main>
                <Modal className='extension-number-modal'
                    maskClosable={false}
                    visible={this.state.storeModalShow}
                    title="微播易提醒您：请选择主账号"
                    onCancel={() => {
                        this.setState({
                            storeModalShow: false,
                            storeForm: null
                        })
                    }}
                    footer={null}
                >
                    {this.state.storeForm}
                </Modal>
                <Modal visible={this.state.requirementModalShow}
                    onCancel={() => this.setState({
                        requirementModalShow: false,
                        requirementDetail: null
                    })}
                    footer={null}
                    className='extension-number-modal'
                    title='需求详情'
                >
                    {this.state.requirementDetail}
                </Modal>
                <Modal visible={this.state.changeProgressModalShow}
                    maskClosable={false}
                    confirmLoading={this.changeProgressLoading}
                    onOk={this.changeProgress}
                    onCancel={() => {
                        this.setState({
                            changeProgressModalShow: false,
                            changeProgressForm: null
                        })
                        this.tipProgress.props.form.resetFields()
                    }}
                >
                    {this.state.changeProgressForm}
                </Modal>
                <Modal visible={this.state.accountIDmodal}
                    title="请输入账号的accountID"
                    onCancel={this.closeaccountIDmodal.bind(this)}
                    onOk={this.accountIDsubmit.bind(this)}
                    destroyOnClose={true}>
                    <TextArea rows={3}
                        ref={account => this.account = account}
                        onChange={this.accountIDTextArea.bind(this)}
                        className="account-relate-text" />
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

// 修改拓号进度
@Form.create({})
class ProgressTips extends Component {
    state = {
        show: this.props.progress_status == '3',
        showContactError: this.props.progress_status == '5',
        emptyPrompt: ''
    }
    onChange = (e) => {
        this.setState({
            show: e.target.value === '3',
            showContactError: e.target.value === '5'
        });
        this.props.form.setFieldsValue({
            "progress_status_reason": ""
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        return <div>
            <h4>确定更新拓号进度吗?</h4>
            <Form>
                <FormItem style={{ display: "none" }}>
                    {getFieldDecorator('id', {
                        initialValue: this.props.id
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('progress_status', {
                        initialValue: this.props.progress_status.toString()
                    })(
                        <RadioGroup onChange={this.onChange}>
                            {
                                [3, 4, 5].map((key) => {
                                    let { id, text } = progressMap[key];
                                    return <Radio style={radioStyle} value={id.toString()} key={id}>{text}</Radio>
                                })
                            }
                        </RadioGroup>
                    )}
                </FormItem>
                {
                    this.state.show ?
                        <FormItem>
                            {
                                getFieldDecorator('progress_status_reason', {
                                    initialValue: this.props.progress_status_reason,
                                    rules: [{
                                        required: true,
                                        message: '请填写备注'
                                    }, {
                                        max: 500,
                                        message: '备注在500个以内'
                                    }]
                                })(
                                    <TextArea placeholder="请填写备注" autosize={{
                                        minRows: 4,
                                        maxRows: 4
                                    }} />
                                )
                            }
                        </FormItem> : null
                }
                {/*提供联系方式有误*/}
                {
                    this.state.showContactError ?
                        <FormItem>
                            {
                                getFieldDecorator('progress_status_reason', {
                                    initialValue: this.props.progress_status_reason,
                                    rules: [{
                                        required: true,
                                        message: '请填写备注'
                                    }, {
                                        max: 500,
                                        message: '备注在500个以内'
                                    }]
                                })(
                                    <TextArea placeholder="请填写备注" autosize={{
                                        minRows: 4,
                                        maxRows: 4
                                    }} />
                                )
                            }
                        </FormItem> : null
                }
            </Form>
        </div>
    }
}

// 查询筛选
@connect(state => ({
    authVisibleList: state.authorizationsReducers.authVisibleList
}), actions)
@Form.create({})
class FilterForm extends Component {

    handleDownload = async () => {
        if(this.isDownloading) return
        this.isDownloading = true
        this.timer = null
        const { filter } = this.props
        const hide = message.loading('处理中....')
        await api.get('/extentionAccount/orientationDerive', { params: { ...filter } }).then(() => {
            this.timer = setTimeout(() => {
                hide()
                this.isDownloading = false
                clearTimeout(this.timer)
            },2000);
        }, ({errorMsg}) => {
            hide()
            message.error('导出失败: ' + errorMsg)
            this.isDownloading = false
        })
    }

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
                    } else if (key === 'launched_before_at') {
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

    render() {
        const { mediaManagerList, search_flag, authVisibleList } = this.props;
        const { getFieldDecorator } = this.props.form;
        let accountStatusKeys = [1, 2, 3, 5],
            finishStatusKeys = [0, 1, 2],
            requirementPlanKeys = [1, 2],
            accountStatusAry = accountStatusKeys.map(key => accountStatusMap[key]),
            finishStatusAry = finishStatusKeys.map(key => finishStatusMap[key]),
			areaKeys = [1, 2, 3, 4, 5],
			areaAry = areaKeys.map(key => areaMap[key])
        //requirementPlanAry = requirementPlanKeys.map(key => requirementPlanMap[key])
        let exist_mediaSelect = search_flag && Object.keys(mediaManagerList).length !== 0
        let sourceMediaListArray = mediaManagerList[this.props.group2]
        let extendMediaListArray = mediaManagerList[this.props.group1]
        let processAry = Object.values(progressMap)
        return (
            <Form layout="inline" onSubmit={this.submitQuery}>
                <FormItem label="平台">
                    {
                        getFieldDecorator('weibo_type')(
                            <PlatformSelect getPopupContainer={() => document.querySelector('.fix-task-page')} />
                        )
                    }
                </FormItem>
                <FormItem label="账号名称">
                    {
                        getFieldDecorator('account_name', {})(
                            <Input placeholder='账号名称' />)
                    }
                </FormItem>
                <FormItem label="最晚上架时间">
                    {
                        getFieldDecorator('launched_before_at', {})(
                            <RangePicker format='YYYY-MM-DD HH:mm:ss' showTime={{
                                hideDisabledOptions: true,
                                defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
                            }} />)
                    }
                </FormItem>
				<FormItem label="区域">
					{
						getFieldDecorator('creator_area', {
						})(
							<Select
								className='w120'
								allowClear
								placeholder='选择区域'
							>
								{areaAry.map(({ id, text }) =>
									<Option key={id}>{text}</Option>)}
							</Select>)
					}
				</FormItem>
                {exist_mediaSelect && authVisibleList['extention.orientationlist.resource.search.select'] === true ?
                    <FormItem label="资源媒介">
                        {
                            getFieldDecorator('user_owner_admin_id', {})(
                                <Select allowClear
                                    getPopupContainer={() => document.querySelector('.fix-task-page')}
                                    style={{ width: 130 }} placeholder='选择资源媒介'>
                                    {
                                        sourceMediaListArray.map(({ user_id, real_name }) => {
                                            return <Option key={user_id}>{real_name}</Option>
                                        })
                                    }
                                </Select>)
                        }
                    </FormItem> : null}
                <FormItem label="账号状态">
                    {
                        getFieldDecorator('status', {})(
                            <Select allowClear
                                getPopupContainer={() => document.querySelector('.fix-task-page')}
                                style={{ width: 110 }} placeholder='选择状态'>
                                {accountStatusAry.map(({ id, text }) =>
                                    <Option key={id}>{text}</Option>)}
                            </Select>)
                    }
                </FormItem>
                <FormItem label="拓号进度">
                    {
                        getFieldDecorator('progress_status', {})(
                            <Select allowClear
                                getPopupContainer={() => document.querySelector('.fix-task-page')}
                                style={{ width: 190 }} placeholder='选择状态'

                            >
                                {processAry.map(({ id, text }) =>
                                    <Option key={id}>{text}</Option>)}
                            </Select>)
                    }
                </FormItem>
                <FormItem label="需求名称">
                    {
                        getFieldDecorator('requirement_name', {})(
                            <Input placeholder='请输入需求名称' />
                            /*<SearchSelect
                            style={{ width: '150px' }}
                            getPopupContainer={() => document.querySelector('.fix-task-page')}
                            searchDataList={queryRequirement} keyWord='requirement_name' dataToList={res => {
                            return res.data
                            }} item={['requirement_id', 'requirement_name']} desc='请选择需求名称'/>*/
                        )
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
                {exist_mediaSelect && authVisibleList['extention.orientationlist.expand.search.select'] === true ?
                    <FormItem label="拓展媒介">
                        {
                            getFieldDecorator('owner_admin_id', {})(
                                <Select allowClear
                                    getPopupContainer={() => document.querySelector('.fix-task-page')}
                                    style={{ width: 130 }} placeholder='选择拓展媒介'>
                                    {
                                        extendMediaListArray.map(({ user_id, real_name }) => {
                                            return <Option key={user_id}>{real_name}</Option>
                                        })
                                    }
                                </Select>)
                        }
                    </FormItem> : null}
                <FormItem label="销售/AE">
                    {
                        getFieldDecorator('creator', {})(
                            <Input placeholder='销售/AE' />)
                    }
                </FormItem>
                <FormItem>
                    <Button type='primary' style={{ width: '80px' }}
                        htmlType="submit"
                        loading={this.props.tableLoading}
                        className='filter-button mr10'>查询</Button>
                    <Button type='primary' ghost onClick={this.handleDownload}
                    >导出结果</Button>
                </FormItem>
            </Form>)
    }
}

// 主账号选择
@withRouter
class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.lastFetchId = 0;
        this.fetchUser = debounce(this.fetchUser, 800);
    }

    state = {
        data: [],
        value: [],
        fetching: false
    }
    fetchUser = (value) => {
        let { getUserList } = this.props
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;
        this.setState({ data: [], fetching: true });
        getUserList({ search_type: 1, identity_name: value })
            .then(res => res.data)
            .then((_data) => {
                if (fetchId !== this.lastFetchId) {
                    return;
                }
                const data = _data.list.rows.map(account => ({
                    text: account.identity_name,
                    value: account.user_id
                }));
                this.setState({ data, fetching: false });
            });
    }
    handleChange = (value) => {
        this.setState({
            value,
            data: [],
            fetching: false
        });
    }

    render() {
        const { fetching, data, value } = this.state;
        const { operationUrl, babysitter_host, weibo_type, weibo_id, status, account_name, url } = this.props;
        return (<div>
            选择主账号：
            <Select
                className='mr10'
                showSearch
                allowClear
                labelInValue
                showArrow={false}
                filterOption={false}
                value={value}
                placeholder="搜索并选择主账号"
                notFoundContent={fetching ? <Spin size="small" /> : null}
                onSearch={this.fetchUser}
                onChange={this.handleChange}
                style={{ width: '180px' }}
            >
                {data.map(d => <Option key={d.value}>{d.text}</Option>)}
            </Select>
            <Button type='primary'
                disabled={!value || !value.key}
                onClick={() => {
                    if (status !== 5) {
                        if (weibo_type != 9) {
                            return window.open(window.location.origin + '/account/manage/add/' + weibo_type + '?user_id=' + value.key + '&fetch_info=' + operationUrl.slice(operationUrl.indexOf("=") + 1, operationUrl.length))
                        } else {
                            return window.open(window.location.origin + '/account/manage/add/' + weibo_type + '?user_id=' + value.key + '&fetch_info=' + (window.encodeURIComponent(url) || weibo_id || account_name))
                        }
                    } else {
                        return window.open(window.location.origin + '/account/manage/add/' + weibo_type + '?user_id=' + value.key + '&fetch_info=' + (window.encodeURIComponent(url) || weibo_id || account_name))
                    }

                }}>去入库</Button>
            <p style={{ marginTop: '10px', textDecoration: 'underline' }}>
                <a target={'_blank'} href={babysitter_host + '/user/register'}>没有找到合适的主账号，去创建主账号</a>
            </p>
        </div>)
    }
}


export default AllocateTask;
