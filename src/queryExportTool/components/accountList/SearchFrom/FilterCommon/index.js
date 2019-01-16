import React from 'react';
// import moment from 'moment';
import { Tag, DatePicker, Button, Popover, Icon, message } from 'antd';
import DropdownMenuNew from '../../../dropdownMenu/dropdownMenuNew'
import MoreFilter from '../MoreFilter/index'
import SelectAndInput from '../SelectAndInput'
import SelectMenu from '../SelectMenu'
import TreeTransfer from '../TreeTransfer'
import './FilterCommon.less'
import { objectToArray } from '../../../../../util'
const { RangePicker } = DatePicker;
// const FilterNumberRangePicker = DropdownMenu.FilterNumberRangePicker
import {
	// dateRangeOptions,
	genderOptions,
	kol_visitor_age_draw_options,
	kol_visitor_gender_options,
	// mediaTypeOptions
} from '@/queryExportTool/constants/searchFilter'

// const FilterDateRangePicker = ({ onChange }) => {
// 	const disabledDate = () => { }
// 	const disabledRangeTime = () => { }
// 	return <RangePicker
// 		onChange={(dates, dateStrings) => onChange({ optionsValues: dateStrings, optionsNames: dateStrings })}
// 		disabledDate={disabledDate}
// 		disabledTime={disabledRangeTime}
// 		format="YYYY-MM-DD"
// 	/>
// }

export default class FilterCommon extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			selectedItems: {},
			moreFilterVisible: false
		}
	}
	onClickCancel = () => {
		this.setState({ dropdownMenuShow: false }, () => {
			this.setState({ dropdownMenuShow: undefined })
		})
	}
	onChange = (id, name, { optionsNames: names }) => {
		const selectedItems = {
			...this.state.selectedItems,
			[id]: name + ':' + names
		}
		this.setState({ selectedItems, dropdownMenuShow: false }, () => {
			this.setState({ dropdownMenuShow: undefined })
		})
		this.props.onFilter()
	}
	onFilter = () => {
		this.props.onFilter();
	}
	onSelectMenuChange = (id, name, value) => {
		const { filterOptions = {} } = this.props.queryExportToolReducer;
		const { params } = this.props.match;
		const { filter_commonArray = {} } = filterOptions[params.platformType] || {};
		const options = filter_commonArray[id].options || [];
		const map = options.reduce((obj, item) => {
			obj[item.value || item.id] = item.name;
			return obj;
		}, {})
		this.onChange(id, name, { optionsNames: map[value] })
	}

	onMoreFilterCancel = () => {
		this.onVisibleChange(false)
	}
	onVisibleChange = (visible) => {
		this.setState({
			moreFilterVisible: visible
		})
	}
	onMoreFilterOk = (selectedItems) => {
		const stateSelectedItems = this.state.selectedItems;
		const maxLength = Object.keys(selectedItems).length + Object.keys(stateSelectedItems).length;
		if (maxLength > 10) {
			message.error('搜索不能超过十个条件')
			return false;
		}
		const _selectedItems = { ...stateSelectedItems, ...selectedItems }
		this.setState({
			selectedItems: _selectedItems
		})
		this.onVisibleChange(false)
		this.props.onFilter();
	}
	remove = (id) => {
		const _selectedItems = this.state.selectedItems;
		delete _selectedItems[id];
		this.MoreFilterNode && this.MoreFilterNode.remove(id);
		this.setState({ selectedItems: _selectedItems })
		this.props.resetFilter(id);
		this.props.onFilter();
	}
	resetFilter = () => {
		this.setState({
			selectedItems: {}
		})
		this.MoreFilterNode && this.MoreFilterNode.reset();
		this.props.resetFilter();
		this.props.onFilter();
	}

	render() {
		const { form, selectedItems: selectedItemsFromProps } = this.props;
		const { getFieldDecorator } = form;
		const { filterOptions = {} } = this.props.queryExportToolReducer;
		const { params } = this.props.match;
		const {
			unit_play_price_types,
			unit_read_price_types,
			verified_status,
			default_hot_cities,
			industry_list_options,
			kol_province_list_options, //账号地域
			kol_interest_list_options,	//账号兴趣
		} = filterOptions[params.platformType] || {};

		const { selectedItems, dropdownMenuShow } = this.state;
		const selectedItemsArray = objectToArray({ ...selectedItems, ...selectedItemsFromProps });
		const mapFieldsToPlatform = {
			"kol_visitor_gender_draw_type": [1, 2, 3], //受众性别
			"kol_visitor_age_draw": [1, 2, 3],	//受众年龄
			"kol_visitor_province_draw": [1, 2, 3],
			"kol_visitor_interest_draw": [1, 2, 3],
			"true_read_ratio": [1],
			"media_index1_avg_read_num": [1],
			"direct_media_interaction_avg": [2],
			"true_fans_rate": [2],
			"gender": [4, 5],
			"industry_id": [],  //账号行业
			"verified_status": [],
			"live_latest_publish_time": [4, 5],
			"area_id": [1, 2, 3, 4, 5],
			"read_price": [1],
			"play_price": [3]
		}
		const platformType = parseInt(params.platformType, 10);
		return (
			<div className='filter-common'>
				<div className="filter-common-items">
					{
						mapFieldsToPlatform['kol_visitor_gender_draw_type'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='受众性别' className='dropdown-menu'>
							{getFieldDecorator("kol_visitor_gender_draw_type", {
								// initialValue: "0"
							})(
								<SelectMenu
									options={kol_visitor_gender_options}
									onSelect={values => this.onChange('kol_visitor_gender_draw_type', '受众性别', values)}
								></SelectMenu>
							)}
						</DropdownMenuNew>
					}
					{
						mapFieldsToPlatform['kol_visitor_age_draw'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='受众年龄' className='dropdown-menu' >
							{getFieldDecorator("kol_visitor_age_draw", {
								// initialValue: {
								// 	name: '19-24',
								// 	weight: [30, 100]
								// }
							})(<SelectAndInput promptMessage="可以选择占比大于某个值的年龄段" options={kol_visitor_age_draw_options} onOkClick={(values) => { this.onChange('kol_visitor_age_draw', '受众年龄', values) }}></SelectAndInput>
							)}
						</DropdownMenuNew>
					}
					{
						mapFieldsToPlatform['kol_visitor_province_draw'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='受众地域' className='dropdown-menu'>
							{getFieldDecorator("kol_visitor_province_draw", {
								// initialValue: {
								// 	name: '',
								// 	weight: [30, 100]
								// }
							})(
								<SelectAndInput promptMessage="可以选择占比大于某个值的地域" options={kol_province_list_options} onOkClick={(values) => { this.onChange('kol_visitor_province_draw', '受众地域', values) }}></SelectAndInput>
							)}
						</DropdownMenuNew>
					}
					{
						mapFieldsToPlatform['kol_visitor_interest_draw'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='受众兴趣' className='dropdown-menu'>
							{getFieldDecorator("kol_visitor_interest_draw", {
								// initialValue: {
								// 	name: '',
								// 	weight: [30, 100]
								// }
							})(
								<SelectAndInput promptMessage="可以选择占比大于某个值的兴趣" options={kol_interest_list_options} onOkClick={(values) => { this.onChange('kol_visitor_interest_draw', '受众兴趣', values) }}></SelectAndInput>
							)}
						</DropdownMenuNew>
					}
					{/* 微信公众号 */}
					{
						mapFieldsToPlatform['true_read_ratio'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='真实阅读率' className='dropdown-menu'>
							{getFieldDecorator("true_read_ratio", {
								// initialValue: {
								// 	name: '',
								// 	weight: [30, 100]
								// }
							})(
								<SelectAndInput id='true_read_ratio' onOkClick={(values) => { this.onChange('true_read_ratio', '真实阅读率', values) }}></SelectAndInput>
							)}</DropdownMenuNew>
					}
					{
						mapFieldsToPlatform['media_index1_avg_read_num'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='多一阅读量' className='dropdown-menu'>
							{getFieldDecorator("media_index1_avg_read_num", {
								// initialValue: {
								// 	name: '',
								// 	weight: [30, 100]
								// }
							})(
								<SelectAndInput id='media_index1_avg_read_num' onOkClick={(values) => { this.onChange('media_index1_avg_read_num', '多一阅读量', values) }} inputLableAfter=""></SelectAndInput>
							)}</DropdownMenuNew>
					}
					{/* 新浪微博 */}
					{
						mapFieldsToPlatform['direct_media_interaction_avg'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='直发互动量' className='dropdown-menu'>
							{getFieldDecorator("direct_media_interaction_avg", {
								// initialValue: {
								// 	name: '',
								// 	weight: [30, 100]
								// }
							})(
								<SelectAndInput promptMessage="直发类型微博的平均转发、评论、点赞之和" id='direct_media_interaction_avg' onOkClick={(values) => { this.onChange('direct_media_interaction_avg', '直发互动量', values) }} inputLableAfter=""></SelectAndInput>
							)}</DropdownMenuNew>
					}
					{
						mapFieldsToPlatform['true_fans_rate'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='真粉率' className='dropdown-menu'>
							{getFieldDecorator("true_fans_rate", {
								// initialValue: {
								// 	name: '',
								// 	weight: [30, 100]
								// }
							})(
								<SelectAndInput id='true_fans_rate' onOkClick={(values) => { this.onChange('true_fans_rate', '真粉率', values) }}></SelectAndInput>
							)}</DropdownMenuNew>
					}

					{/* 视频/直播， 小红书,其他平台 */}

					{
						// 	mapFieldsToPlatform[].includes(platformType) &&	 <DropdownMenuNew  visible={dropdownMenuShow} name='首次上架时间' className='dropdown-menu'>
						// 	<SelectMenu id='' options={dateRangeOptions}></SelectMenu>
						// </DropdownMenuNew>
					}

					{
						mapFieldsToPlatform['area_id'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='账号地域' className='dropdown-menu'>
							{getFieldDecorator("area_id", {
								// initialValue: '0'
							})(
								<TreeTransfer options={default_hot_cities} onOkClick={(values) => { this.onChange('area_id', '账号地域', values) }} onClickCancel={this.onClickCancel}></TreeTransfer>
							)}
						</DropdownMenuNew>
					}

					{/* 小红书,其他平台 */}
					{
						mapFieldsToPlatform['gender'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='账号性别' className='dropdown-menu'>
							{getFieldDecorator("gender", {
								// initialValue: '0'
							})(
								<SelectMenu
									onSelect={(values) => { this.onChange('gender', '账号性别', values) }}
									options={genderOptions}
								></SelectMenu>
							)}</DropdownMenuNew>
					}
					{
						//这个暂时使用受众兴趣的options
						mapFieldsToPlatform['industry_id'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='账号行业' className='dropdown-menu'>
							{getFieldDecorator("industry_id", {
								// initialValue: '0'
							})(
								<SelectMenu
									onSelect={(values) => { this.onChange('industry_id', '账号行业', values) }}
									options={industry_list_options}></SelectMenu>
							)}</DropdownMenuNew>
					}
					{
						mapFieldsToPlatform['verified_status'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='认证类型' className='dropdown-menu'>
							{getFieldDecorator("verified_status", {
								// initialValue: '0'
							})(
								<SelectMenu
									onSelect={(values) => { this.onChange('verified_status', '认证类型', values) }}
									options={verified_status}
								></SelectMenu>
							)}</DropdownMenuNew>
					}
					{mapFieldsToPlatform['read_price'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='阅读单价' className='dropdown-menu'>
						<div className='' style={{ 'overflow': 'hidden', marginBottom: '20px' }}>
							{getFieldDecorator('sku_unit_read_price', {})(
								<SelectAndInput
									onOkClick={(values) => { this.onChange('sku_unit_read_price', '阅读单价', values) }}
									inputLableBefore='阅读单价'
									inputLableAfter=''
									showType='three'
									options={unit_read_price_types}
								></SelectAndInput>
							)}
						</div></DropdownMenuNew>
					}

					{mapFieldsToPlatform['play_price'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='播放单价' className='dropdown-menu'>
						<div className='' style={{ 'overflow': 'hidden', marginBottom: '20px' }}>
							{getFieldDecorator('sku_unit_play_price', {})(
								<SelectAndInput
									onOkClick={(values) => { this.onChange('sku_unit_play_price', '播放单价', values) }}
									inputLableBefore='播放单价'
									inputLableAfter=''
									showType='three'
									options={unit_play_price_types}
								></SelectAndInput>
							)}
						</div></DropdownMenuNew>
					}
					{/* {
						mapFieldsToPlatform['live_latest_publish_time'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='最近一次内容发布时间' className='dropdown-menu'>
							{getFieldDecorator("live_latest_publish_time", {
								// initialValue: '0'
							})(
								<SelectMenu id='live_latest_publish_time'
									onSelect={(values) => { this.onChange('live_latest_publish_time', '最近一次内容发布时间', values) }}
									options={dateRangeOptions}
								></SelectMenu>
							)}
						</DropdownMenuNew>
					} */}
				</div>

				<Popover
					title='更多筛选'
					getPopupContainer={e => e.parentNode}
					overlayClassName='filter-more-popover'
					overlayStyle={{ width: 600, height: 500 }}
					onVisibleChange={this.onVisibleChange}
					visible={this.state.moreFilterVisible}
					content={
						<MoreFilter
							autoAdjustOverflow={false}
							params={params}
							selectedkeys={selectedItemsArray.map(item => item.value && item.id)}
							form={this.props.form}
							ref={e => this.MoreFilterNode = e}
							onOk={this.onMoreFilterOk}
							onCancel={this.onMoreFilterCancel}
							filterMore={{
								unit_play_price_types,
								unit_read_price_types,
								verified_status,
								industry_list_options
							}}></MoreFilter>
					}
					trigger="click" >
					<Button>更多筛选<Icon type={this.state.moreFilterVisible ? "up" : "down"} /></Button>

				</Popover>

				{
					selectedItemsArray.length > 0 && <div className="filter-common-selected-items">
						已选：{
							selectedItemsArray.map(item => {
								return item.value ? <Tag
									className='ant-tag-theme-thin ant-tag-checkable-checked'
									key={item.id}
									closable
									onClose={() => this.remove(item.id)}
								>{item.value}</Tag> : null
							})
						}
						<a href="javascript:void(0)"
							style={{ marginLeft: '10px' }}
							onClick={this.resetFilter}
						>清空</a>
					</div>
				}
			</div >
		)
	}
}




