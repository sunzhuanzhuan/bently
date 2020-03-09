import React from 'react';
import { Row, Tabs, Form, Icon, Tooltip } from 'antd';
import ItemLable from './ItemLable';
import OperationTag from './ItemLable/OperationTags'
import InputAndSliderNumber from './InputAndSlider/InputAndSliderNumber'
import Search from './Search'
import debounce from 'lodash/debounce';
import './index.less';
import FilterCommon from './FilterCommon'
import AccountSort from "@/queryExportTool/components/accountList/SearchFrom/AccountSort";
import SelectedItem from './SelectedItems'
import { objectToArray } from '@/util'
import MarkMessage from "../../../base/MarkMessage";
import Cookie from 'js-cookie'

import {
	priceMarks,
	followersCountMarks
} from '@/queryExportTool/constants/searchFilter'
const { TabPane } = Tabs;
const LayoutSearch = ({ name, children, width }) => {
	return (
		<Row className="layout-search-box">
			<div className="lable" style={{ width: width }}>
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
		}
		this.onFilterSearch = debounce(this.onFilterSearch, 800)

	}
	onFilterSearch = (values = {}) => {
		const params = this.props.form.getFieldsValue();
		const { changTabNumber } = this.state
		const { skuPriceValid, followerCount } = params;
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
		if (params.followerCount && !params.followerCount[1]) {
			params.followerCount[1] = null;
		}

		if (params.skuOpenQuotePrice && !params.skuOpenQuotePrice[1]) {
			params.skuOpenQuotePrice[1] = null;
		}
		if (!params.skuOpenQuotePrice) {
			params.skuOpenQuotePrice = undefined;
		}

		this.props.onFilterSearch({ searchSource: changTabNumber, ...params, ...values, })
	}

	batchUpdateSelectedItems = (selectedItems) => {
		this.setState({
			selectedItems: { ...this.state.selectedItems, ...selectedItems }
		})
	}
	onItemLableChange = (id, name, { optionsNames: names }, needReset) => {
		let params, clear = true;
		const selectedItems = {
			...this.state.selectedItems,
			[id]: name + ':' + names
		}
		if (!names || names.length == 0) {
			delete selectedItems[id]
			clear = false
		}
		this.setState({ selectedItems })
		if (needReset) {
			params = this.accountListort.reset(clear)
			//如果输入了关键词则取消选择默认排序
			if (id === 'keyword') {
				const defaultSort = names && names.length > 0 ? 2 : 1
				this.accountListort.changeDefaultSort(defaultSort)
				params.defaultSort = defaultSort
			}
		}

		this.onFilterSearch(params);
	}

	resetFilter = (id, params) => {
		const urlAll = this.props.match.url
		if (id) {
			const SelectedItems = this.state.selectedItems
			delete SelectedItems[id];
			this.setState({ selectedItems: SelectedItems })
			this.props.form.resetFields([id]);
		} else {
			this.props.form.resetFields();
			this.setState({ selectedItems: {} })
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
			category: { id: params.id }
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
		const params = { ...this.accountListort.reset(true), searchSource: value, defaultSort: 1 }
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
		const { isShowMore } = this.state
		this.setState({
			isShowMore: !isShowMore
		})
	}

	render() {
		const { selectedItems, isShowMore, changTabNumber } = this.state;
		const { form, match, history, location, keyword, } = this.props;
		const { getFieldDecorator } = form;
		const { filterOptions = {} } = this.props.queryExportToolReducer;
		const { params } = match;
		const platformType = params.platformType;
		if (!filterOptions[platformType]) return null;
		const PriceMarks = priceMarks[platformType] || priceMarks['default'];
		const FollowersCountMarks = followersCountMarks[platformType] || followersCountMarks['default']
		const {
			category, group, operation_tag, grouped_sku_types = {}, order_industry_category
		} = filterOptions[platformType] || {};
		//参考报价在平台1，2，3时，不现实下拉选择
		const isShowSelectForPrice = [1, 2, 3].indexOf(parseInt(platformType, 10)) !== -1;
		price.options = grouped_sku_types[platformType] || []
		const { grouped_platforms = [] } = group;

		const historyFrom = <div>
			{order_industry_category && <LayoutSearch name=
				{<span>
					历史推广行业
					<Tooltip placement="top"
						getPopupContainer={() => document.querySelector('.query-export-tool')}
						title={'账号在微播易合作过的客户所属行业'}>
						<Icon type="question-circle" theme="filled" style={{ color: '#1890ff' }} />
					</Tooltip>
				</span>
				} width='115px'>
				{getFieldDecorator('orderIndustryCategory')(
					<ItemLable
						isTooltip={true}
						onClick={(names) => this.onItemLableChange('orderIndustryCategory', '历史推广行业', names)}
						// id='operationTag'
						tagsArray={order_industry_category}
					/>
				)}
			</LayoutSearch>}

		</div>

		const commSearch = <Search keyword={keyword} form={form}
			onSearch={(names) => this.onItemLableChange('keyword', '关键字', names, true)}
		></Search>
		const allSearch = <div>
			{category && platformType != 5 && <LayoutSearch name={category.name}>
				{getFieldDecorator('classificationIds')(
					<ItemLable
						onClick={(names) => this.onItemLableChange('classificationIds', '常见分类', names)}
						// id='category'
						tagsArray={category.options}
					/>
				)}
			</LayoutSearch>
			}
			{
				grouped_platforms.length > 0 && <LayoutSearch name='平台名称'>
					{getFieldDecorator('platformIds')(
						<ItemLable
							onClick={(names) => this.onItemLableChange('platformIds', '平台名称', names)}
							tagsArray={grouped_platforms.map(item => { item.id = item.platform_id; return item })}
						/>
					)}
				</LayoutSearch>
			}
			{operation_tag && <LayoutSearch name={'运营标签'}>
				{getFieldDecorator('operationTagIds')(
					<OperationTag
						onClick={(names) => this.onItemLableChange('operationTagIds', '运营标签', names)}
						// id='operationTag'
						tagsArray={operation_tag}
					/>
				)}
			</LayoutSearch>}
			{followersCount && <LayoutSearch name={followersCount.name} >
				{getFieldDecorator('followerCount', {
					// initialValue: {
					// 	number: [0, 200]
					// }
				})(
					<InputAndSliderNumber unit={"万"}
						onNameChange={(names) => this.onItemLableChange('followerCount', followersCount.name, names)}
						onFilter={this.onFilterSearch}
						marks={FollowersCountMarks}
						// id='followersCount'
						maxNumber={100000}//10亿
						showFalseMessage={'粉丝数不能超过10亿'}
						sliderMin={+(followersCount.bar.min)} sliderMax={+(followersCount.bar.max)}
					/>
				)}
			</LayoutSearch>}
			{price && <LayoutSearch name={price.name} >
				<div style={{ marginLeft: isShowSelectForPrice ? 10 : 0 }}>
					{getFieldDecorator('price', {
						// initialValue: {
						// 	number: [2000, 1000000]
						// }
					})(
						<InputAndSliderNumber unit={"元"}
							onNameChange={(names) => this.onItemLableChange('price', price.name, names)}
							onFilter={this.onFilterSearch}
							// id='price'
							marks={PriceMarks}
							maxNumber={100000000}//1亿
							showFalseMessage={'价格不能超过1亿'}
							sliderMin={+(price.bar.min)} sliderMax={+(price.bar.max)}
							isShowSelect={isShowSelectForPrice}
							selectList={[{ id: -1, name: '请选择报价类型' }, ...price.options]} />
					)}
				</div>
			</LayoutSearch>
			}
			<FilterCommon
				batchUpdateSelectedItems={this.batchUpdateSelectedItems}
				onChange={this.onItemLableChange}
				selectedItems={selectedItems}
				{...this.props}
				resetFilter={this.resetFilter}
				onFilter={this.onFilterSearch}
				ref={node => this.onFilterCommon = node}
			/>
		</div>

		const historyStyle = Cookie.get('isLoginedHistoryQueryTool') ? {} : {

		}
		return <div id='js-account-seach-id'>

			<div className='history-new-box'>
				<div className='new-box-img'>
					<img src='http://img.weiboyi.com/vol1/1/102/124/n/v/rp7846pp75sn11r99p5o506o4op229o2/new.png' />
				</div>
			</div>
			<Tabs type="card"
				className='query-tool-search-tab'
				activeKey={changTabNumber} onChange={this.changeTab}
			>
				<TabPane tab="全库账号" key="1" >
					{changTabNumber == 1 ? <div>
						{commSearch}
						{allSearch}
					</div> : null}

				</TabPane>
				<TabPane tab={
					<div className='big-zindex-box'>
						历史成交账号
					</div>} key="2" >

					{changTabNumber == 2 ? <div>
						{commSearch}
						{historyFrom}
						{isShowMore ? <div >
							{allSearch}
						</div> : null}
					</div> : null}

				</TabPane>
			</Tabs>

			{changTabNumber == 2 ? <div className='search-more' onClick={this.isShowMoresSet}>
				<div className='search-more-text'>
					<div className='text'>{isShowMore ? '收起' : '更多筛选条件'}</div>
					<div><Icon type={isShowMore ? 'up' : "down"} className='search-more-icon' /></div>
				</div>
			</div> : null}
			<SelectedItem selectedItems={selectedItems} clear={this.resetFilter}
				changeDefaultSort={
					this.accountListort && this.accountListort.changeDefaultSort
				}
			></SelectedItem>
			<AccountSort key={changTabNumber} changTabNumber={changTabNumber} ref={node => this.accountListort = node} onChange={this.onFilterSearch} group={params.platformType} />
		</div >
	}
}

export default Form.create()(AccountSearch)
