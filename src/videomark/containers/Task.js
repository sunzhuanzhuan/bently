import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/task'
import FilterForm from '../components/Task/FilterForm'
import TaskTable from '../components/Task/Table'
import { Tabs, Spin } from 'antd';
const TabPane = Tabs.TabPane;
import './Task.less'

class Task extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loadingVisible: false,
            signedStatus: false,
            filterParams: {
                "is_signed": 2
            },
            getOrderList: this.props.actions.getReservationList
        }
        this.form = {}
    }

    async componentWillMount() {
        this.setState({ loadingVisible: true })
        await this.props.actions.getPlatformList();
        await this.props.actions.getSaleList();
        await this.props.actions.getVMIndustryList();

        await this.initBrandList(this.props.actions);
        await this.props.actions.getReservationList(this.state.filterParams);
        this.setState({ loadingVisible: false })
    }


    changeOrderType = async (value) => {

        this.setState({ loadingVisible: true })
        if (value === 'reservation') {
            await this.resetForm('campaign') //重置搜索框
            await this.setState({
                getOrderList: this.props.actions.getReservationList
            })

        } else {
            await this.resetForm('reservation') //重置搜索框
            await this.setState({
                getOrderList: this.props.actions.getCampaignList
            });
        }
        const params = this.state.filterParams
        await this.state.getOrderList(params);
        await this.initBrandList(this.props.actions);
        this.setState({ loadingVisible: false })
    }
    resetForm = (type) => {
        this.setState({
            filterParams: { "is_signed": 2 },
            signedStatus: false,
        })
        this.initBrandList(this.props.actions);
        this.form[type].resetFields();
    }

    initBrandList = (actions) => {
        actions.getBrandList({
            code: this.state.filterParams.industry_id || 'empty'
        });
    }

    setStateData = (params) => {
        this.setState(params)
    }

    render() {
        const {
            platformList,
            saleList,
            reservationList,
            campaignList,
            industryList,
            brandList,
            brandListForModal,
            actions
        } = this.props
        const markVisible = this.props.auth['data.order.sign']
        const tabArr = [{
            tab: "预约订单",
            key: "reservation"
        }, {
            tab: "微闪投订单",
            key: "campaign"
        }]

        return <Tabs defaultActiveKey='reservation' onChange={this.changeOrderType} className="common-question-tool">
            {
                tabArr.map((item) => {
                    return <TabPane tab={item.tab} key={item.key}>
                        <Spin
                            spinning={this.state.loadingVisible}
                            tip="加载中，请稍后..."
                            wrapperClassName="order-mark-task-spin"
                            size="large"
                        >
                            <FilterForm
                                ref={form => this.form[item.key] = form}
                                platformList={platformList}
                                saleList={saleList}
                                actions={actions}
                                setStateData={this.setStateData}
                                resetForm={this.resetForm}
                                handleSignedChange={this.handleSignedChange}
                                loadingVisible={this.state.loadingVisible}
                                signedStatus={this.state.signedStatus}
                                type={item.key}
                                getOrderList={this.state.getOrderList}
                                industryList={industryList}
                                brandList={brandList}
                            />
                            <TaskTable
                                data={item.key == 'reservation' ? reservationList : campaignList}
                                type={item.key}
                                actions={actions}
                                filterParams={this.state.filterParams}
                                setStateData={this.setStateData}
                                getOrderList={this.state.getOrderList}
                                markVisible={markVisible}
                                industryList={industryList}
                                brandListForModal={brandListForModal}
                            >
                            </TaskTable>
                        </Spin>
                    </TabPane>
                })
            }
        </Tabs>
    }
}

const mapStateToProps = (state) => ({
    reservationList: state.videoMark.reservationList || {},
    campaignList: state.videoMark.campaignList || {},
    platformList: state.videoMark.platformList || [],
    saleList: state.videoMark.saleList || [],
    industryList: state.videoMark.industryList || [],
    brandList: state.videoMark.brandList || [],
    brandListForModal: state.videoMark.brandListForModal || [],
    auth: state.authorizationsReducers.authVisibleList
})

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...actions
    }, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Task)