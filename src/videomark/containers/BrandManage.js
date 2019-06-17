import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/brandManage'
import { Table, Spin } from 'antd';
import './brandManage.less';

class BrandManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: 100,
                align: 'center',
            }, 
            {
                title: '品牌名称',
                dataIndex: 'brand_name',
                key: 'brand_name',
                width: 100,
                align: 'center',
            },
            {
                title: '品牌code',
                dataIndex: 'brand_code',
                key: 'brand_code',
                width: 100,
                align: 'center',
            },
            {
                title: '品牌类型',
                dataIndex: 'level',
                key: 'level',
                width: 100,
                align: 'center',
            },
            {
                title: '所属主品牌',
                dataIndex: 'brand_parent_name',
                key: 'brand_parent_name',
                width: 100,
                align: 'center',
            },
            {
                title: '主品牌code',
                dataIndex: 'brand_parent_code',
                key: 'brand_parent_code',
                width: 100,
                align: 'center',
            },
            {
                title: '品牌序列号',
                dataIndex: 'brand_child_code',
                key: 'brand_child_code',
                width: 100,
                align: 'center',
            },
            {
                title: '所属行业',
                dataIndex: 'industry_name',
                key: 'industry_name',
                width: 100,
                align: 'center',
            },
            {
                title: '标注可用',
                dataIndex: 'is_signed_available',
                key: 'is_signed_available',
                width: 100,
                align: 'center',
            },
            {
                title: '添加/修改时间',
                dataIndex: 'modified_at',
                key: 'modified_at',
                width: 100,
                align: 'center',
            },
            {
                title: '操作',
                dataIndex: 'operate',
                key: 'operate',
                width: 100,
                align: 'center',
            },
        ]
    }

    componentDidMount() {
        this.setState({loading: true});
        this.props.actions.getBrandManageList().then(() => {
            this.setState({loading: false});
        })
    }

    render() {
        const { loading } = this.state;
        const { brandManageList } = this.props;
        const pagination = {
            onChange: (current) => {
                
            },
            total: 100,
            pageSize: 20,
            current: 1,
        }
        return [
            <div key='title' className='brand_manage_title'>品牌管理</div>,
            <Spin
                key='spinWrapper'
                spinning={loading}
                tip="加载中，请稍后..."
                size="large"
            >
                <Table
                key='list'
                columns={this.columns}
                dataSource={brandManageList}
                rowKey={record => record.id}
                pagination={pagination}
                scroll={{ x: 1300 }}
            />
            </Spin>
        ]
    }
}

const mapStateToProps = (state) => ({
    brandManageList: state.videoMark.brandManageList || [],
    addInfo: state.videoMark.addBrandManage || {},
    editInfo: state.videoMark.editBrandManage || {}
})

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...actions
    }, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrandManage)