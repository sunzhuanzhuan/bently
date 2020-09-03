import React from 'react';
import {Row, Tabs, Form, Icon, Tooltip, message} from 'antd';
import ItemLable from './ItemLable';
import OperationTag from './ItemLable/OperationTags'
import InputAndSliderNumber from './InputAndSlider/InputAndSliderNumber'
import Search from './Search'
import debounce from 'lodash/debounce';
import './index.less';
import FilterCommon from './FilterCommon'
import AccountSort from "@/queryExportTool/components/accountList/SearchFrom/AccountSort";
import SelectedItem from './SelectedItems'
import Cookie from 'js-cookie'
import ProItemLabel from './ProItemLabel';

import {
    priceMarks,
    followersCountMarks
} from '@/queryExportTool/constants/searchFilter'

const {TabPane} = Tabs;

const LayoutSearch = ({name, children, width}) => {
    return (
        <Row className="layout-search-box">
            <div className="lable" style={{width: width}}>
                <div>{name}：</div>
            </div>
            <div>
                {children}
            </div>
        </Row>
    )
}
const followersCount = {
    "name": "粉丝数",
    "bar": {
        "min": 0,
        "max": 200
    } //进度条最大和最小值
}
const price = {
    "name": "参考报价",
    "bar": {
        "min": 2000,
        "max": 1000000
    } //进度条最大和最小值
}


class AccountSearch extends React.Component {
    proItemLabelRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            categoryValue: [],
            groupedPlatformsValue: [],
            operationTagValue: [],
            followersCountValue: {
                value: [followersCount.bar.min, followersCount.bar.max]
            },
            priceValue: {
                value: [price.bar.min, price.bar.max],
                selectValue: -1
            },
            selectedItems: {},
            isShowMore: false,
            changTabNumber: '1',
            isSameId: false,
            contentSelected: [],
            keywordsOptions: ['sns_name', 'sns_id', 'classification']
        }
        this.onFilterSearch = debounce(this.onFilterSearch, 800)

    }

    onFilterSearch = (values = {}) => {
        const params = this.props.form.getFieldsValue();
        const {changTabNumber, contentSelected} = this.state
        const {skuPriceValid, followerCount} = params;
        if (skuPriceValid && skuPriceValid.length > 0) {
            params.skuPriceValidFrom = skuPriceValid[0].format('YYYY-MM-DD 00:00:00')
            params.skuPriceValidTo = skuPriceValid[1].format('YYYY-MM-DD 23:59:59')
            delete params.skuPriceValid;
        } else {
            params.skuPriceValidFrom = params.skuPriceValidTo = null
        }
        if (followerCount) {
            const number = params.followerCount.number || [];
            params.followerCount = number.map(item => item * 10000);
        }
        if (params.price) {
            params.skuTypeId = params.price.selectValue > 0 ? params.price.selectValue : null;
            params.skuOpenQuotePrice = params.price.number;
            delete params.price
        }

        if (params.skuOpenQuotePrice && !params.skuOpenQuotePrice[1]) {
            params.skuOpenQuotePrice[1] = null;
        }
        if (!params.skuOpenQuotePrice) {
            params.skuOpenQuotePrice = undefined;
        }

        params.contentClassificationIds = contentSelected;
        this.props.onFilterSearch({searchSource: changTabNumber, ...params, ...values,})
    }

    batchUpdateSelectedItems = (selectedItems) => {
        this.setState({
            selectedItems: {...this.state.selectedItems, ...selectedItems}
        })
    }
    onItemLableChange = (id, name, {optionsNames: names}, needReset) => {
        let params = {}, clear = true;
        const selectedItems = {
            ...this.state.selectedItems,
            [id]: name + ':' + names
        }
        if (!names || names.length == 0) {
            delete selectedItems[id]
            clear = false
        }
        let keys = Object.keys(selectedItems);

        if (Object.keys(selectedItems).length > 10) {
            message.error("最多显示10个标签");
            return;
        }
        this.setState({selectedItems})
        if (needReset) {
            params = this.accountListort.reset(clear)
            //如果输入了关键词则取消选择默认排序
            if (id === 'keyword') {
                const defaultSort = names && names.length > 0 ? 2 : 1
                this.accountListort.changeDefaultSort(defaultSort)
                params.defaultSort = defaultSort
            }
        }

        const {changTabNumber} = this.state;

        // 是否全库账号或者精选账号, changTabNumber = 1 是全库账号, changTabNumber = 2 是精选账号
        const isAllOrHighAccount = changTabNumber === '1' || changTabNumber === '3';
        if (isAllOrHighAccount) {
            params.keywordsOptions = this.state.keywordsOptions;
        } else {
            params.keywordsOptions = [];
        }

        this.onFilterSearch(params);
    }

    resetFilter = (id, params) => {
        const urlAll = this.props.match.url
        if (id) {
            const SelectedItems = this.state.selectedItems
            delete SelectedItems[id];
            this.setState({selectedItems: SelectedItems})
            this.props.form.resetFields([id]);
        } else {
            this.props.form.resetFields();
            this.setState({selectedItems: {}, contentSelected: []})

        }
        this.props.history.push({
            pathname: urlAll,
            search: "",
        });
        this.onFilterCommon && this.onFilterCommon.reset()
        this.onFilterSearch(params)
    }
    handleChangeForFilterMain = (params) => {
        this.onChange(params)
    }

    onCategoryChange = (params) => {
        this.onChange({
            category: {id: params.id}
        })
    }
    onFollowerChange = (params) => {
        this.onChange({
            followerCount: params.value
        })
    }
    onPriceChange = (params) => {
        this.onChange({
            sku: {
                skuTypeId: params.type,
                openQuotePrice: params.value
            }
        })
    }
    changeTab = (value) => {
        const params = {...this.accountListort.reset(true), searchSource: value, defaultSort: 1}
        this.resetFilter(null, params)
        //查询数据(暂时做异步处理)
        setTimeout(() => {
            this.setState({
                changTabNumber: value,
                isShowMore: false,
            })
        }, 1000);
    }

    isShowMoresSet = () => {
        const {isShowMore} = this.state
        this.setState({
            isShowMore: !isShowMore
        })
    }

    /**
     * 搜索类型change事件
     * @param values
     */
    typeChange = (values) => {
        this.setState({
            keywordsOptions: values
        });
    };

    commSearch = (keyword, form, showSearchType) => {
        return <Search
            keyword={keyword}
            form={form}
            showSearchType={showSearchType}
            keywordsOptions={this.state.keywordsOptions}
            typeChange={this.typeChange}
            onSearch={(names) => this.onItemLableChange('keyword', '关键字', names, true)}
        ></Search>
    }

    contentChange = (codes, names) => {
        let selectedItems = {
            ...this.state.selectedItems,
            content: names
        };
        if (!names || !names.length) {
            delete selectedItems.content;
        }
        this.setState({
            contentSelected: JSON.parse(JSON.stringify(codes)),
            selectedItems: selectedItems
        });
        this.onFilterSearch();
    };

    delContent = (firstCode, code, isLevel2) => {
        let {contentSelected = []} = this.state;
        let $proItemLabel = this.proItemLabelRef.current;
        $proItemLabel.del(firstCode, code, isLevel2, contentSelected);
        let names = $proItemLabel.selectedToNames(contentSelected);
        this.contentChange(contentSelected, names);
    };


    render() {
        const {selectedItems, isShowMore, changTabNumber} = this.state;
        const {form, match, history, location, keyword, defaultPlatformIds} = this.props;
        const {getFieldDecorator} = form;
        const {filterOptions = {}, classificationOptions} = this.props.queryExportToolReducer;
        const {params} = match;
        let platformType = params.platformType;
        if (!filterOptions[platformType]) return null;
        const PriceMarks = priceMarks[platformType] || priceMarks['default'];
        const FollowersCountMarks = followersCountMarks[platformType] || followersCountMarks['default']
        const {
            group, operationTags, groupedSkuTypes = {}, orderIndustryCategory
        } = filterOptions[platformType] || {};

        // 内容分类、人设分类和风格分类
        let {content, people = [], style = []} = classificationOptions.data || {};
        people = people.map(item => {
            item.id = item.code;
            return item;
        });
        style = style.map(item => {
            item.id = item.code;
            return item;
        });

        //参考报价在平台1，2，3时，不现实下拉选择
        const isShowSelectForPrice = [1, 2, 3, 4, 5].indexOf(parseInt(platformType, 10)) !== -1;
        price.options = groupedSkuTypes[platformType] || []
        const {groupedPlatforms = []} = group;

        const historyFrom = <div>
            {orderIndustryCategory &&
            <LayoutSearch
                name={<span>
					历史推广行业
					<Tooltip
                        placement="top"
                        getPopupContainer={() => document.querySelector('.query-export-tool')}
                        title={'账号在微播易合作过的客户所属行业'}>
						<Icon type="question-circle" theme="filled" style={{color: '#1890ff'}}/>
					</Tooltip>
				</span>}
                width='115px'>
                {getFieldDecorator('orderIndustryCategory')(
                    <ItemLable
                        id='orderIndustryCategory'
                        isTooltip={true}
                        onClick={(names) => this.onItemLableChange('orderIndustryCategory', '历史推广行业', names)}
                        tagsArray={orderIndustryCategory} selectedItems={this.state.selectedItems}
                    />
                )}
            </LayoutSearch>}
        </div>

        const allSearch = <div>
            {
                content &&
                <LayoutSearch name='内容分类'>
                    {getFieldDecorator('contentClassificationIds')(
                        <ProItemLabel
                            ref={this.proItemLabelRef}
                            data={content}
                            selected={this.state.contentSelected}
                            onChange={this.contentChange}>
                        </ProItemLabel>
                    )}
                </LayoutSearch>
            }
            {
                people &&
                <LayoutSearch name={'人设分类'}>
                    {getFieldDecorator('peopleClassificationIds')(
                        <OperationTag
                            isoOnlyOne={true}
                            onClick={(names) => this.onItemLableChange('peopleClassificationIds', '人设分类', names)}
                            tagsArray={people}
                            selectedItems={this.state.selectedItems}
                        />
                    )}
                </LayoutSearch>
            }
            {
                style &&
                <LayoutSearch name={'风格分类'}>
                    {getFieldDecorator('styleClassificationIds')(
                        <OperationTag
                            isoOnlyOne={true}
                            onClick={(names) => this.onItemLableChange('styleClassificationIds', '风格分类', names)}
                            tagsArray={style}
                            selectedItems={this.state.selectedItems}
                        />
                    )}
                </LayoutSearch>
            }
            {
                (groupedPlatforms.length > 0 && platformType !== '7' && platformType !== '8') && <LayoutSearch name='平台名称'>
                    {getFieldDecorator('platformIds', ({
                        initialValue: defaultPlatformIds
                    }))(
                        <ItemLable
                            id='platformIds'
                            selectedItems={this.state.selectedItems}
                            onClick={(names) => this.onItemLableChange('platformIds', '平台名称', names)}
                            tagsArray={groupedPlatforms.map(item => {
                                item.id = item.platformId;
                                return item
                            })}
                        />
                    )}
                </LayoutSearch>
            }
            {operationTags && <LayoutSearch name={'运营标签'}>
                {getFieldDecorator('operationTagIds')(
                    <OperationTag
                        onClick={(names) => this.onItemLableChange('operationTagIds', '运营标签', names)}
                        // id='operationTag'
                        tagsArray={operationTags}
                        selectedItems={this.state.selectedItems}
                    />
                )}
            </LayoutSearch>}
            {followersCount && <LayoutSearch name={followersCount.name}>
                {getFieldDecorator('followerCount', {
                })(
                    <InputAndSliderNumber
                        unit={"万"} id='followerCount'
                        onNameChange={(names) => this.onItemLableChange('followerCount', followersCount.name, names)}
                        onFilter={this.onFilterSearch}
                        marks={FollowersCountMarks}
                        maxNumber={100000}//10亿
                        showFalseMessage={'粉丝数不能超过10亿'}
                        sliderMin={+(followersCount.bar.min)}
                        sliderMax={+(followersCount.bar.max)}
                        selectedItems={this.state.selectedItems}
                    />
                )}
            </LayoutSearch>}
            {price && <LayoutSearch name={price.name}>
                <div style={{marginLeft: isShowSelectForPrice ? 10 : 0}}>
                    {getFieldDecorator('price', {
                    })(
                        <InputAndSliderNumber
                            unit={"元"} id='price'
                            onNameChange={(names) => this.onItemLableChange('price', price.name, names)}
                            onFilter={this.onFilterSearch}
                            marks={PriceMarks}
                            maxNumber={100000000}//1亿
                            showFalseMessage={'价格不能超过1亿'}
                            sliderMin={+(price.bar.min)}
                            sliderMax={+(price.bar.max)}
                            isShowSelect={isShowSelectForPrice}
                            selectList={[{id: -1, name: '请选择报价类型'}, ...price.options]}
                            selectedItems={this.state.selectedItems}
                        />
                    )}
                </div>
            </LayoutSearch>
            }
            <FilterCommon
                batchUpdateSelectedItems={this.batchUpdateSelectedItems}
                onChange={this.onItemLableChange}
                selectedItems={this.state.selectedItems}
                {...this.props}
                resetFilter={this.resetFilter}
                onFilter={this.onFilterSearch}
                ref={node => this.onFilterCommon = node}
            />
        </div>

        const historyStyle = Cookie.get('isLoginedHistoryQueryTool') ? {} : {}
        return <div id='js-account-seach-id'>
            <div className='history-new-box'>
                <div className='new-box-img'>
                    <img src='http://img.weiboyi.com/vol1/1/102/124/n/v/rp7846pp75sn11r99p5o506o4op229o2/new.png'/>
                </div>
            </div>
            <Tabs
                type="card"
                className='query-tool-search-tab'
                activeKey={changTabNumber} onChange={this.changeTab}
            >
                <TabPane tab="全库账号" key="1">
                    {changTabNumber == 1 ? <div>
                        {this.commSearch(keyword, form, true)}
                        {allSearch}
                    </div> : null}
                </TabPane>
                <TabPane tab={
                    <div className='big-zindex-box'>
                        历史成交账号
                    </div>} key="2">
                    {changTabNumber == 2 ? <div>
                        {this.commSearch(keyword, form)}
                        {historyFrom}
                        {isShowMore ? <div>
                            {allSearch}
                        </div> : null}
                    </div> : null}
                </TabPane>
                <TabPane tab={
                    <div className='selected-account'>
                        <label>精选账号</label>
                        <img src={require('./../images/HOT.png')} alt=""/>
                    </div>
                } key="3">
                    {changTabNumber == 3 ? <div>
                        {this.commSearch(keyword, form, true)}
                        {allSearch}
                    </div> : null}
                </TabPane>
            </Tabs>

            {changTabNumber == 2 ? <div className='search-more' onClick={this.isShowMoresSet}>
                <div className='search-more-text'>
                    <div className='text'>{isShowMore ? '收起' : '更多筛选条件'}</div>
                    <div><Icon type={isShowMore ? 'up' : "down"} className='search-more-icon'/></div>
                </div>
            </div> : null}
            <SelectedItem selectedItems={selectedItems} delContent={this.delContent} clear={this.resetFilter}></SelectedItem>
            <AccountSort
                key={changTabNumber}
                changTabNumber={changTabNumber}
                ref={node => this.accountListort = node}
                onChange={this.onFilterSearch}
                group={platformType}
                sortMore={groupedSkuTypes[platformType]}/>
        </div>
    }
}

export default Form.create()(AccountSearch)
