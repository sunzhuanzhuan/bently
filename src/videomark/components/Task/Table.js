import React, { Component } from 'react'
import { Table, Button, message } from 'antd';
import './Table.less'
import CommonQuestionTip from "../../../components/Common/CommonQuestionTip";
import CommonModal from "../../../components/Common/CommonModal";
import TaskForm from "./Form";
import api from '../../../api/index'
class TaskTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commonModalVisible: false,
            brandListForModal: props.brandListForModal
        };
    }
    /**
     * 根据行业改变品牌的数据
     * * */
    handleIndustryChange = (value) => {
        this.form.setFieldsValue({
            signed_brand_id: undefined
        })
        this.props.actions.getBrandListForModal({
            code: value
        });
    }
    /**
     * 初始化添加/修改标注Modal
     * @param record 列表数据项
     * @param edit_page 订单类型：1-微闪投订单 2-预约订单
     * @param is_create 类型：1-添加 2-修改
     * 1、Modal弹窗 title逻辑处理
     * 2、获取列表action
     * 3、state数据设置
     * 
     */
    initModal = async (record, edit_page, is_create) => {
        let title = ''
        let data = {
            order_id: record.order_id,
            industry_category_code: record.industry_category_code,
            signed_brand_id: record.signed_brand_id
        }

        if (is_create == 1) {
            title = <span>
                标注订单
                <span style={{ marginLeft: '30px', fontWeight: 'normal' }}>
                    <span style={{ marginRight: '20px' }}>【订单ID：{record.order_id}</span>
                    <span style={{ marginRight: '20px' }}>账号名称：{record.weibo_name}</span>
                    平台：{record.weibo_type}】
                </span>
            </span>
        } else {
            title = <span>
                修改标注
                <span style={{ marginLeft: '30px', fontWeight: 'normal' }}>
                    <span style={{ marginRight: '20px' }}>【订单ID：{record.order_id}</span>
                    <span style={{ marginRight: '20px' }}>账号名称：{record.weibo_name}</span>
                    平台：{record.weibo_type}】
                </span>
            </span>
            data.content_type_id = parseInt(record.content_type_id)
            if (data.content_type_id != 1) {
                data.original_post_type_id = parseInt(record.original_post_type_id)
            }
        }
        // 根据行业请求品牌数据
        if (record.industry_category_code) {
            await this.props.actions.getBrandListForModal({
                code: record.industry_category_code
            });
        }

        await this.setState({
            data: data,
            modalTitle: title,
            commonModalVisible: true,
            edit_page: edit_page, //是微闪投还是预约订单
            is_create: is_create,  //是创建还是修改
        });
    }
    /**
     * 添加/修改标注
     * 1、验证表单数据
     * 2、发送请求
     * 3、请求消息处理
     * 4、刷新列表
     * 5、关闭Modal
     * 
     */
    handleAddAndUpdateMark = () => {

        this.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let params = values;
            params.order_id = this.state.data.order_id
            params.edit_page = this.state.edit_page
            params.is_create = this.state.is_create
            api.post('/dataProcessing/order/updatOrderSignStatus', params).then((response) => {
                message.success(response.msg)
                this.closeModal()
                this.props.setStateData({
                    loadingVisible: true
                })
                this.props.getOrderList(this.props.filterParams).then(() => {
                    this.props.setStateData({
                        loadingVisible: false
                    });
                })

            }).catch((error) => {
                message.error(error.errorMsg)
            })
        });
    }

    closeModal = () => {
        this.setState({
            commonModalVisible: false,
            data: {}
        });
    }

    //type: reservation--预约订单  campaign--微闪投订单
    render() {
        const { data, type, filterParams, setStateData, markVisible } = this.props;

        const campaignColumn = [
            {
                title: '订单ID',
                dataIndex: 'order_id',
                key: 'order_id',
                width: 100,
                align: 'center',
                render: (text, record) => (
                    <a className="" target="_blank"
                        href={babysitter_host + linkContent + record.campaign_id}>
                        {text}
                    </a>
                ),
            }, {
                title: '状态',
                dataIndex: 'sign_status',
                key: 'sign_status',
                align: 'center',
                render: (text, record) => (
                    <div>
                        {
                            record.is_signed == 1 ?
                                <div>
                                    <div>
                                        {record.sign_status}
                                    </div>
                                    <div style={{ color: 'red' }}>
                                        <span>内容形式：{record.content_type}</span><br />
                                        <span>需求类型：{record.original_post_type || '-'}</span><br />
                                        <span>所属行业：{record.industry_name || '-'}</span><br />
                                        <span>所属品牌：{record.brand_name || '-'}</span><br />
                                    </div>
                                    <div style={{ minWidth: 210 }}>
                                        <span>
                                            时间：{record.sign_time}
                                            <CommonQuestionTip
                                                title='首次标注时间'
                                                content={record.sign_created_time}
                                                type="click"
                                            ></CommonQuestionTip>
                                        </span><br />
                                        <span>标注人：{record.creator_real_name}</span>
                                    </div>
                                </div>
                                :
                                <div>{record.sign_status}</div>
                        }
                    </div>
                ),
            }, {
                title: '活动名称',
                dataIndex: 'campaign_name',
                key: 'campaign_name',
                align: 'center',
            }, {
                title: '账号名称',
                dataIndex: 'weibo_name',
                key: 'weibo_name',
                align: 'center',
            }, {
                title: '平台',
                dataIndex: 'weibo_type',
                key: 'weibo_type',
                align: 'center',
            }, {
                title: '销售经理',
                dataIndex: 'sale_manager_name',
                key: 'sale_manager_name',
                align: 'center',
            }, {
                title: '厂商简称',
                dataIndex: 'company_name',
                key: 'company_name',
                align: 'center',
            }
        ]
        const reservationColumn = [
            {
                title: '订单ID',
                dataIndex: 'order_id',
                key: 'order_id',
                width: 100,
                align: 'center',
                render: (text, record) => (
                    <a className="" target="_blank"
                        href={babysitter_host + linkContent + record.order_id}>
                        {text}
                    </a>
                ),
            }, {
                title: '状态',
                dataIndex: 'sign_status',
                key: 'sign_status',
                align: 'center',
                render: (text, record) => (
                    <div>
                        {
                            record.is_signed == 1 ?
                                <div>
                                    <div>
                                        {record.sign_status}
                                    </div>
                                    <div style={{ color: 'red' }}>
                                        <span>内容形式：{record.content_type}</span><br />
                                        <span>需求类型：{record.original_post_type || '-'}</span><br />
                                        <span>所属行业：{record.industry_name || '-'}</span><br />
                                        <span>所属品牌：{record.brand_name || '-'}</span><br />
                                    </div>
                                    <div style={{ minWidth: 210 }}>
                                        <span>
                                            时间：{record.sign_time}
                                            <CommonQuestionTip
                                                title='首次标注时间'
                                                content={record.sign_created_time}
                                                type="click"
                                            ></CommonQuestionTip>
                                        </span><br />
                                        <span>标注人：{record.creator_real_name}</span>
                                    </div>
                                </div>
                                :
                                <div>{record.sign_status}</div>
                        }
                    </div>
                ),
            }, {
                title: '预约需求名称',
                dataIndex: 'requirement_name',
                key: 'requirement_name',
                align: 'center',
            }, {
                title: '客户确认价格名称',
                dataIndex: 'accept_reservation_chosen_price_name',
                key: 'accept_reservation_chosen_price_name',
                align: 'center',
            }, {
                title: '账号名称',
                dataIndex: 'weibo_name',
                key: 'weibo_name',
                align: 'center',
            }, {
                title: '平台',
                dataIndex: 'weibo_type',
                key: 'weibo_type',
                align: 'center',
            }, {
                title: '销售经理',
                dataIndex: 'sale_manager_name',
                key: 'sale_manager_name',
                align: 'center',
            }, {
                title: '厂商简称',
                dataIndex: 'company_name',
                key: 'company_name',
                align: 'center',
            }, {
                title: '回传链接时间',
                dataIndex: 'execution_completed_time',
                key: 'execution_completed_time',
                align: 'center',
            }, {
                title: '执行类型',
                dataIndex: 'execution_type_name',
                key: 'execution_type_name',
                align: 'center',
            }, {
                title: '是否含视频/直播',
                dataIndex: 'video_type_name',
                key: 'video_type_name',
                align: 'center',
            }
        ]

        const dataRows = data.rows || []

        const { babysitter_host } = data
        let linkContent = ''
        let column = ''
        if (type === 'reservation') {
            linkContent = '/pack/order/info/order_id/' //跳转订单详情页逻辑
            column = reservationColumn  //table的表头
            if (markVisible) {  //如果有权限就展示操作列
                column.push({
                    title: '操作',
                    dataIndex: 'option',
                    key: 'option',
                    fixed: 'right',
                    width: 100,
                    align: 'center',
                    render: (text, record) => (
                        <div>
                            {
                                record.is_signed == 2 ?
                                    <Button type="primary" onClick={this.initModal.bind(this, record, 2, 1)}>标注</Button>
                                    : ""
                            }
                            {
                                record.is_signed == 1 && record.is_sign_editable == 1 ?
                                    <Button type="primary" onClick={this.initModal.bind(this, record, 2, 2)}>修改标注</Button>
                                    : ""
                            }
                        </div>
                    ),
                });
            }
        } else {
            linkContent = '/sale/company/orderlist/campaign_id/' //跳转订单详情页逻辑
            column = campaignColumn //table的表头
            if (markVisible) { //如果有权限就展示操作列
                column.push({
                    title: '操作',
                    dataIndex: 'option',
                    key: 'option',
                    fixed: 'right',
                    width: 100,
                    align: 'center',
                    render: (text, record) => (
                        <div>
                            {
                                record.is_signed == 2 ?
                                    <Button type="primary" onClick={this.initModal.bind(this, record, 1, 1)}>标注</Button>
                                    : ""
                            }
                            {
                                record.is_signed == 1 && record.is_sign_editable == 1 ?
                                    <Button type="primary" onClick={this.initModal.bind(this, record, 1, 2)}>修改标注</Button>
                                    : ""
                            }
                        </div>
                    ),
                });
            }
        }

        //分页
        let paginationObj = {
            onChange: (current) => {
                setStateData({ loadingVisible: true })
                var params = filterParams
                params.page = current
                this.props.getOrderList(params).then(() => {
                    setStateData({ loadingVisible: false })
                });
            },
            total: data.total,
            pageSize: data.pageNum,
            current: data.page,
        }

        return <div className="task-table-content">
            <div className="total-content">共{data.total || 0}条订单</div>
            <Table
                columns={column}
                dataSource={dataRows}
                rowKey={record => record.order_id}
                pagination={paginationObj}
                scroll={{ x: 1300 }}
            >
            </Table>
            <CommonModal
                visible={this.state.commonModalVisible}
                title={this.state.modalTitle}
                okText={this.state.okText}
                onCancel={this.closeModal}
                onOk={this.handleAddAndUpdateMark}
                wrapClassName="order-mark-task-modal"
                centered={true}
            >
                <TaskForm
                    ref={form => this.form = form}
                    data={this.state.data}
                    industryList={this.props.industryList}
                    brandList={this.props.brandListForModal}
                    handleIndustryChange={this.handleIndustryChange}
                ></TaskForm>
            </CommonModal>
        </div>

    }
}

export default TaskTable


