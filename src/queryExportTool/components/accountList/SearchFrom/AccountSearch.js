import React from 'react';
import { Row, Tabs, Form, Icon, Tooltip } from 'antd';
import ItemLable from './ItemLable';
import InputAndSlider from './InputAndSlider/InputAndSliderNew'
import Search from './Search'
import debounce from 'lodash/debounce';
import './index.less';
import FilterCommon from './FilterCommon'
import AccountSort from "@/queryExportTool/components/accountList/SearchFrom/AccountSort";
import SelectedItem from './SelectedItems'
import { objectToArray } from '@/util'
import MarkMessage from "../../../base/MarkMessage";
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
const followers_count = {
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
			category_value: [],
			grouped_platforms_value: [],
			operation_tag_value: [],
			followers_count_value: {
				value: [followers_count.bar.min, followers_count.bar.max]
			},
			price_value: {
				value: [price.bar.min, price.bar.max],
				selectValue: -1
			},
			selectedItems: {},
			isShowMore: false,
			changTabNumber: '1'
		}
		this.onFilterSearch = debounce(this.onFilterSearch, 800)

	}
	onFilterSearch = (values = {}) => {
		const params = this.props.form.getFieldsValue();
		const { sku_price_valid, follower_count } = params;
		if (sku_price_valid && sku_price_valid.length > 0) {
			params.sku_price_valid_from = sku_price_valid[0].format('YYYY-MM-DD')
			params.sku_price_valid_to = sku_price_valid[1].format('YYYY-MM-DD')
			delete params.sku_price_valid;
		} else {
			params.sku_price_valid_from = params.sku_price_valid_to = null
		}
		if (follower_count) {
			const number = params.follower_count.number || [];
			params.follower_count = number.map(item => item * 10000);
		}
		if (params.price) {
			params.sku_type_id = params.price.selectValue > 0 ? params.price.selectValue : null;
			params.sku_open_quote_price = params.price.number;
			delete params.price
		}
		if (params.follower_count && !params.follower_count[1]) {
			params.follower_count[1] = null;
		}

		if (params.sku_open_quote_price && !params.sku_open_quote_price[1]) {
			params.sku_open_quote_price[1] = null;
		}
		if (!params.sku_open_quote_price) {
			params.sku_open_quote_price = undefined;
		}
		this.props.onFilterSearch({ ...params, ...values })
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
			params = this.accountSort.reset(clear)
		}

		this.onFilterSearch(params);
	}

	resetFilter = (id) => {
		const urlAll = this.props.match.url
		if (id) {
			const _selectedItems = this.state.selectedItems
			delete _selectedItems[id];
			this.setState({ selectedItems: _selectedItems })
			this.props.form.resetFields([id]);
		} else {
			this.props.form.resetFields();
			this.setState({ selectedItems: {} })
		}
		this.props.history.push({
			pathname: urlAll,
			search: "",
		});
		this.onFilterSearch()
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
			follower_count: params.value
		})
	}
	onPriceChange = (params) => {
		this.onChange({
			sku: {
				sku_type_id: params.type,
				open_quote_price: params.value
			}
		})
	}
	changeTab = (value) => {
		this.setState({
			changTabNumber: value,
			isShowMore: false
		})
		//清空数据
		this.resetFilter()
		//查询数据
	}
	isShowMoresSet = () => {
		const { isShowMore } = this.state
		this.setState({
			isShowMore: !isShowMore
		})
	}

	render() {
		const { selectedItems, isShowMore, changTabNumber } = this.state;
		const { form, match, history, location, keyword } = this.props;
		const { getFieldDecorator } = form;
		const { filterOptions = {} } = this.props.queryExportToolReducer;
		const { params } = match;
		const platformType = params.platformType;
		if (!filterOptions[platformType]) return null;
		const _priceMarks = priceMarks[platformType] || priceMarks['default'];
		const _followersCountMarks = followersCountMarks[platformType] || followersCountMarks['default']
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
				{getFieldDecorator('order_industry_category')(
					<ItemLable
						isTooltip={true}
						onClick={(names) => this.onItemLableChange('order_industry_category', '历史推广行业', names)}
						// id='operation_tag'
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
				{getFieldDecorator('classification_id')(
					<ItemLable
						onClick={(names) => this.onItemLableChange('classification_id', '常见分类', names)}
						// id='category'
						tagsArray={category.options}
					/>
				)}
			</LayoutSearch>
			}
			{
				grouped_platforms.length > 0 && <LayoutSearch name='平台名称'>
					{getFieldDecorator('platform_id')(
						<ItemLable
							onClick={(names) => this.onItemLableChange('platform_id', '平台名称', names)}
							tagsArray={grouped_platforms.map(item => { item.id = item.platform_id; return item })}
						/>
					)}
				</LayoutSearch>
			}
			{operation_tag && <LayoutSearch name={'运营标签'}>
				{getFieldDecorator('operation_tag_id')(
					<ItemLable
						onClick={(names) => this.onItemLableChange('operation_tag_id', '运营标签', names)}
						// id='operation_tag'
						tagsArray={operation_tag}
					/>
				)}
			</LayoutSearch>}
			{followers_count && <LayoutSearch name={followers_count.name} >
				{getFieldDecorator('follower_count', {
					// initialValue: {
					// 	number: [0, 200]
					// }
				})(
					<InputAndSlider unit={"万"}
						onNameChange={(names) => this.onItemLableChange('follower_count', followers_count.name, names)}
						onFilter={this.onFilterSearch}
						marks={_followersCountMarks}
						// id='followers_count'
						sliderMin={+(followers_count.bar.min)} sliderMax={+(followers_count.bar.max)}
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
						<InputAndSlider unit={"元"}
							onNameChange={(names) => this.onItemLableChange('price', price.name, names)}
							onFilter={this.onFilterSearch}
							// id='price'
							marks={_priceMarks}
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
			/>
		</div>


		return <div>
			<div className='history-new-box'>
				<div className='new-box-img'>
					<img src='http://img.weiboyi.com/vol1/1/102/124/n/v/rp7846pp75sn11r99p5o506o4op229o2/new.png' />
				</div>

			</div>
			<Tabs type="card"
				className='query-tool-search-tab'
				activeKey={changTabNumber} onChange={this.changeTab}>
				<TabPane tab="全库账号" key="1" >
					{commSearch}
					{allSearch}
				</TabPane>
				<TabPane tab="历史成交账号" key="2">
					{commSearch}
					{historyFrom}
					{isShowMore ? <div >
						{allSearch}
					</div> : null}
				</TabPane>
			</Tabs>
			{changTabNumber == 2 ? <div className='search-more' onClick={this.isShowMoresSet}>
				<div className='search-more-text'>
					<div className='text'>{isShowMore ? '收起' : '更多筛选条件'}</div>
					<div><Icon type={isShowMore ? 'up' : "down"} className='search-more-icon' /></div>
				</div>
			</div> : null}
			<SelectedItem selectedItems={selectedItems} clear={this.resetFilter}></SelectedItem>
			<AccountSort ref={node => this.accountSort = node} onChange={this.onFilterSearch} group={params.platformType} />
		</div >
	}
}

export default Form.create()(AccountSearch)
