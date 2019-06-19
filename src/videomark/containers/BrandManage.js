import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/brandManage'
import { Table, Spin, Button } from 'antd';
import BrandHeader from '../components/BrandManage/BrandHeader';
import BrandModal from '../components/BrandManage/BrandModal';
import './brandManage.less';

class BrandManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            searchQuery: ''
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
                render: data => <div>{data == 1 ? '主品牌' : '子品牌'}</div>
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
                render: data => <div>{data == 1 ? '可用' : '不可用'}</div>
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
                render: (_, record) => {
                    return <Button type='primary' onClick={ () => {this.isShowModal('edit', record)} }>修改</Button>
                }
            },
        ]
    }

    componentDidMount() {
        this.props.getBrandManageList('page=1');
        this.props.getMainBrandList();
        this.props.getIndustryList();
    }

    isShowModal = (modalType, itemInfo) => {
        this.setState({modalType, itemInfo});
    }

    handleAddItem = payload => {
        this.props.addBrand(payload);
    }

    handleEditItem = payload => {
        this.props.editBrand(payload)
    }

    getSearchQuery = (searchQuery = '') => {
        this.setState({searchQuery, currentPage: 1});
        this.props.getBrandManageList(`page=1${searchQuery}`);
    }

    render() {
        const { modalType, itemInfo, currentPage, searchQuery } = this.state;
        const { brandList = [], totalCount = 0, mainBrandList = [], IndustryList = [], progress } = this.props;
        const pagination = {
            onChange: (currentPage) => {
                this.setState({currentPage})
                this.props.getBrandManageList(`page=${currentPage}${searchQuery}`)
            },
            total: totalCount,
            pageSize: 20,
            current: currentPage,
        };

        return [
            <BrandHeader 
                key='brandHeader' 
                isShowModal={this.isShowModal} 
                getSearchQuery={this.getSearchQuery}
            />,
            <Spin
                key='spinWrapper'
                spinning={progress === 'loading'}
                tip="加载中，请稍后..."
                size="large"
            >
                <Table
                    key='list'
                    columns={this.columns}
                    dataSource={brandList}
                    rowKey={record => record.id}
                    pagination={pagination}
                    scroll={{ x: 1300 }}
                />
            </Spin>,
            modalType ? 
                <BrandModal 
                    ke='brandModal' 
                    modalType={modalType} 
                    itemInfo={itemInfo} 
                    mainBrandList={mainBrandList} 
                    IndustryList={IndustryList}
                    isShowModal={this.isShowModal} 
                    handleAddItem={this.handleAddItem}
                    handleEditItem={this.handleEditItem}
                /> : null
        ]
    }
}

const mapStateToProps = (state) => {
    const { brandManageReducer = {} } = state;
    const { brandList, totalCount, mainBrandList, IndustryList, progress } = brandManageReducer;

    return { brandList, totalCount, mainBrandList, IndustryList, progress };
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        ...actions
    }, dispatch)
)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrandManage)