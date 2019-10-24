import React, { Component } from "react";
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    message,
    Modal,
    Popover,
    Row,
    Select,
    Table
} from "antd";

import { areaMap, requirementPlanMap, sourceMap } from "../../constants/config";
import { connect } from "react-redux";
import * as actions from '../../actions'

import PlatformSelect from '../../base/PlatformSelect'
import FilterContainer from "../../components/FilterContainer";
import './allocateTask.less';
// import StausView from "../../base/StatusView";
import MediaManagerSelect from "../../base/MediaManagerSelect";
import ViewMoreText from "../../base/ViewMoreText";
import moment from 'moment';
import api from "@/api";

const { RangePicker } = DatePicker;
const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input;


@connect(state => state.extensionNumber, actions)
class AllocateTask extends Component {
    state = {
        filter: {},
        currentPage: 1,
        selectedRowKeys: [],
        step: 1,
        allocateModalShow: false,
        submitAllocateLoading: false,
        requirementModalShow: false,
        requirementDetail: null,
        pagesize: 20
    }

    // 分配媒介
    handleSubmitAllocate = async () => {
        let { postAllotMediaManager, allotList: { map } } = this.props;
        this.formRef.props.form.validateFields((err, values) => {
            if (!err) {
                // 处理发送数据
                let body = {
                    ...values,
                    ids: this.state.selectedRowKeys.map(key => ({
						ext_account_id : map[key]['ext_account_id'],
						requirement_id : map[key]['requirement_id']
					}))
                };
                this.setState({ submitAllocateLoading: true })
                // 发送请求
                postAllotMediaManager(body).then(({ msg }) => {
                    message.success(msg, 1.2)
                    // 重新拉取数据 + 复位
                    this.getList()
                    this.setState({
                        allocateModalShow: false,
                        submitAllocateLoading: false,
                        selectedRowKeys: []
                    })
                        ;
                })
                    .catch(() => {
                        message.error('分配失败', 1.2)
                        this.setState({
                            submitAllocateLoading: false
                        })
                    })
            }
        })

    }

    // 获取列表方法
    getList = async (query = {}) => {
        let { getAllotList } = this.props
        let { filter } = this.state
        this.setState({ tableLoading: true })
        await getAllotList({ ...filter, page: 1, ...query })
        this.setState({
            selectedRowKeys: [],
            filter: { ...filter, ...query },
            tableLoading: false,
            currentPage: query.page || 1
        })
    }

    componentWillMount() {
        // 获取拓号任务分配列表
        this.getList()
        this.props.getMediaManagerList()
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

    render() {
        let { allotList } = this.props
        let { count = 0, page = 1, pageNum = 100, map, list } = allotList || {}
        let columns = [
            {
                title: '需求名称',
                dataIndex: 'requirement_name',
                align: 'center',
                width: 160,
                render: (name, info) => {
                    return <a onClick={() => {
                        this.createRequirementDetail(info)
                    }}>{name}</a>;
                }
            }, {
                title: '平台',
                dataIndex: 'weibo_type_name',
                align: 'center',
                width: 120,
                render: (text) => {
                    return <span>{text || '-'}</span>
                }
            }, {
                title: '账号名称',
                dataIndex: 'account_name',
                align: 'center',
                width: 120,
                render: (name) => {
                    return name;
                }
            }, {
                title: 'URL',
                dataIndex: 'url',
                align: 'center',
                width: 80,
                render: (url, record) => {
                    let linkList = [119, 25, 24, 103, 115, 118, 116, 110, 93,9]//通过链接获取
                    let showUrl = () => {
                        if(url==''){
                            return '-'
                        }else{
                            if(linkList.indexOf(record.weibo_type) !== -1){
                                return <a href={url} target='_blank'>URL</a>
                            }else{
                                if(linkList.indexOf(record.weibo_type) == -1 && record.status !== 5){
                                    return <a href={url} target='_blank'>URL</a>
                                }else{
                                    return '-'
                                }

                            }
                        }
                    }
                    return (
                         showUrl()
                        //靠链接抓取，并且抓取成功或者不成功的，都需要显示链接
                        //不靠链接抓取，如果抓取失败的情况下，显示'-'
                    )
                }
            }, {
                title: 'ID',
                dataIndex: 'weibo_id',
                width: 120,
                align: 'center',
                render: (weiboID) => {
                    return weiboID
                }
            }, {
                title: '最晚上架时间',
                dataIndex: 'launched_before',
                align: 'center',
                width: 120,
                render: (text) => text || '-'
            }, {
                title: '备注',
                dataIndex: 'comment',
                align: 'center',
                width: 120,
                render: (text) =>
                    <ViewMoreText content={text || ''} title={'备注'} />
            }, {
                title: '创建时间',
                dataIndex: 'created_at',
                align: 'center',
                width: 120,
                render: (num) => num ? num : '-'
            },  /*{
                title: '需求计划',
                dataIndex: 'requirement_plan',
                align: 'center',
                render: (time) => time || '-'
            }, */{
                title: '销售/AE',
                dataIndex: 'creator',
                align: 'center',
                width: 80,
                render: (name, { cell_phone }) =>
                    <Popover placement="top" title='联系方式:' content={cell_phone}
                        trigger="hover"><a>{name}</a></Popover> || '-'
            }
        ]
        let rowSelection = {
            getCheckboxProps: record => ({
                disabled: record['finish_status_code'] == '1'
            }),
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys) => {
                this.setState({ selectedRowKeys })
            },
        };
        let pagination = {
            position: 'top',
            showTotal: count => `共 ${Math.ceil(count / pageNum)} 页，${count} 条`,
            size: 'small',
            onChange: (current) => {
                this.getList({ page: current })
            },
            total: count,
            pageSize: pageNum,
            current: Number(page) || 1,
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
        return (
            <div className='extension-number allocate-task-page'>
                <header className='page-content'>
                    <FilterContainer>
                        <FilterForm tableLoading={this.state.tableLoading} filter={this.state.filter} getList={this.getList} />
                    </FilterContainer>
                </header>
                <main>
                    <Table rowSelection={rowSelection} pagination={pagination}
                        bordered columns={columns}
                        rowKey={record => record[primary_key]}
                        loading={this.state.tableLoading}
                        dataSource={dataSoure}
                        locale={{
                            emptyText: '当日无分配任务'
                        }}
                    />
                </main>
                <footer className='page-footer'>
                    <Button type='primary' className='next-button'
                        disabled={this.state.selectedRowKeys.length <= 0}
                        onClick={() => {
                            this.setState({ allocateModalShow: true })
                        }}>分配</Button>
                </footer>
                {this.state.allocateModalShow ?
                    <Modal visible={true}
                        maskClosable={false}
                        wrapClassName='extension-number-modal modal-allocate-task-page'
                        title="微播易提醒您：请选择分配拓展媒介经理"
                        confirmLoading={this.state.submitAllocateLoading}
                        onCancel={() => {
                            this.setState({ allocateModalShow: false })
                        }}
                        onOk={this.handleSubmitAllocate}
                    ><AllocateForm wrappedComponentRef={node => this.formRef = node} />
                    </Modal> : null}
                <Modal visible={this.state.requirementModalShow}
                    onCancel={() => this.setState({ requirementModalShow: false })}
                    footer={null}
                    className='extension-number-modal'
                    title='需求详情'
                >
                    {this.state.requirementDetail}
                </Modal>
            </div>
        );
    }
}

@Form.create({})
class FilterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
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
	handleDownload = async () => {
		let { getDemandHistory } = this.props
		let { filter } = this.props
		await api.get('/extentionAccount/allotDerive', { params: filter })
	}

    render() {
        let requirementPlanKeys = [1, 2],
            // finishStatusKeys = [1],
            // finishStatusAry = finishStatusKeys.map(key => finishStatusMap[key]),
            requirementPlanAry = requirementPlanKeys.map(key => requirementPlanMap[key]),
			areaKeys = [1, 2, 3, 4, 5],
			areaAry = areaKeys.map(key => areaMap[key])
        const { getFieldDecorator } = this.props.form;
        return (<div><Form layout="inline" onSubmit={this.submitQuery}>
            <FormItem label="平台">
                {
                    getFieldDecorator('weibo_type', {})(
                        <PlatformSelect getPopupContainer={() => document.querySelector('.allocate-task-page')} />)
                }
            </FormItem>
            <FormItem label="账号名称">
                {
                    getFieldDecorator('account_name', {})(
                        <Input placeholder='填写账号名称' />)
                }
            </FormItem>
            <FormItem label="需求名称">
                {
                    getFieldDecorator('requirement_name', {})(
                        <Input placeholder='填写需求名称' />)
                }
            </FormItem>
            <FormItem label="销售/AE">
                {
                    getFieldDecorator('creator', {})(
                        <Input placeholder='填写销售/AE' />)
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
            {/*<FormItem label="拓号状态">
                {
                    getFieldDecorator('finish_status', {})(
                        <Select allowClear
                                getPopupContainer={() => document.querySelector('.allocate-task-page')}
                                className='w130' placeholder='选择状态'>
                            {finishStatusAry.map(({ id, text }) =>
                                <Option key={id}>{text}</Option>)}
                        </Select>)
                }
            </FormItem>*/}
            <FormItem label="最晚上架时间">
                {
                    getFieldDecorator('launched_before_at', {})(
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
                <Button type='primary' style={{ width: '80px', marginRight: 10 }}
                    htmlType="submit"
                    loading={this.props.tableLoading}
                    className='filter-button'>查询</Button>
                {/*<Button type='primary' style={{ width: '80px' }}
                    onClick={this.handleDownload}
                    className='filter-button' ghost>导出结果</Button>*/}
            </FormItem>
        </Form>
        </div>)
    }
}

@Form.create({})
class AllocateForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form
        return (<Form layout="inline">
            <FormItem label="拓号专员">
                {
                    getFieldDecorator('owner_admin_id', {
                        rules: [{ required: true, message: '请选择拓号专员' }]
                    })(
                        <MediaManagerSelect group='1' exnum={"请选择拓号专员"} />)
                }
            </FormItem>
            <div>
                <FormItem style={{ margin: '0' }}>
                    {
                        getFieldDecorator('comment', {
                            rules: [{ max: 500, message: '最多可输入500字' }]
                        })(
                            <TextArea style={{ width: '472px' }} placeholder="备注" autosize={{
                                minRows: 4,
                                maxRows: 4
                            }} />
                        )
                    }
                </FormItem>
            </div>
        </Form>
        )
    }
}

export default AllocateTask;
