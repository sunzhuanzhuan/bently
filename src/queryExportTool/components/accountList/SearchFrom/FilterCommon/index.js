import React from 'react';
// import moment from 'moment';
import { Tag, DatePicker, Button, Popover, Icon, message } from 'antd';
import DropdownMenuNew from '../../../dropdownMenu/dropdownMenuNew'
import MoreFilter from '../MoreFilter/index'
import SelectAndInput from '../SelectAndInput'
import IndexButton from '../SelectAndInput/indexButton'

import SelectMenu from '../SelectMenu'
import TreeTransfer from '../TreeTransfer'
import './FilterCommon.less'
import { objectToArray } from '../../../../../util'
// import SelectedItem from '../SelectedItems'
const { RangePicker } = DatePicker;
// const FilterNumberRangePicker = DropdownMenu.FilterNumberRangePicker
import {
	// dateRangeOptions,
	genderOptions,
	kolVisitorAgeDrawOptions,
	kolVisitorGenderOptions,
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
			// selectedItems: {},
			moreFilterVisible: false
		}
	}
	onClickCancel = () => {
		this.setState({ dropdownMenuShow: false }, () => {
			this.setState({ dropdownMenuShow: undefined })
		})
	}
	onChange = (...params) => {
		this.props.onChange(...params);

		//这里是为了隐藏下拉菜单，有待优化；
		this.setState({ dropdownMenuShow: false }, () => {
			this.setState({ dropdownMenuShow: undefined })
		})
	}
	onFilter = () => {
		this.props.onFilter();
	}
	// onSelectMenuChange = (id, name, value) => {
	// 	const { filterOptions = {} } = this.props.queryExportToolReducer;
	// 	const { params } = this.props.match;
	// 	const { filterCommonArray = {} } = filterOptions[params.platformType] || {};
	// 	const options = filterCommonArray[id].options || [];
	// 	const map = options.reduce((obj, item) => {
	// 		obj[item.value || item.id] = item.name;
	// 		return obj;
	// 	}, {})
	// 	this.onChange(id, name, { optionsNames: map[value] })
	// }

	onMoreFilterCancel = () => {
		this.onVisibleChange(false)
	}
	onVisibleChange = (visible) => {
		this.setState({
			moreFilterVisible: visible
		})
	}
	onMoreFilterOk = (selectedItems) => {
		const { batchUpdateSelectedItems } = this.props;
		batchUpdateSelectedItems(selectedItems);

		console.log("onMoreFilterOk", selectedItems)
		// const stateSelectedItems = this.state.selectedItems;
		// const maxLength = Object.keys(selectedItems).length + Object.keys(stateSelectedItems).length;
		// if (maxLength > 10) {
		// 	message.error('搜索不能超过十个条件')
		// 	return false;
		// }
		// const SelectedItems = { ...stateSelectedItems, ...selectedItems }
		// this.setState({
		// 	selectedItems: SelectedItems
		// })
		this.onVisibleChange(false)
		this.props.onFilter();
	}
	// remove = (id) => {
	// 	const SelectedItems = this.state.selectedItems;
	// 	delete SelectedItems[id];
	// 	this.MoreFilterNode && this.MoreFilterNode.remove(id);
	// 	this.setState({ selectedItems: SelectedItems })
	// 	this.props.resetFilter(id);
	// 	this.props.onFilter();
	// }
	// resetFilter = () => {
	// 	this.setState({
	// 		selectedItems: {}
	// 	})
	// 	this.MoreFilterNode && this.MoreFilterNode.reset();
	// 	this.props.resetFilter();
	// 	this.props.onFilter();
	// }
	reset = () => {
		this.MoreFilterNode && this.MoreFilterNode.reset()
	}
	render() {
		const { form, selectedItems } = this.props;
		const { getFieldDecorator } = form;
		const { filterOptions = {} } = this.props.queryExportToolReducer;
		const { params } = this.props.match;
		const { onChange } = this;
		const {
			unit_play_price_types,
			unit_read_price_types,
			verified_status,
			default_hot_cities,
			industry_list_options,
			kol_province_list_options, //账号地域
			kol_interest_list_options,	//账号兴趣
		} = filterOptions[params.platformType] || {};

		const { dropdownMenuShow } = this.state;
		const selectedItemsArray = objectToArray({ ...selectedItems });
		const mapFieldsToPlatform = {
			"kolVisitorGenderDrawType": [1, 2, 3], //受众性别
			"kolVisitorAgeDraw": [1, 2, 3],	//受众年龄
			"kolVisitorProvinceDraw": [1, 2, 3],
			"kolVisitorInterestDraw": [1, 2, 3],
			"trueReadRatio": [1],
			"mediaIndex1AvgReadNum": [1],
			"directMediaInteractionAvg": [2],
			"trueFansRate": [2],
			"gender": [4, 5],
			"industryId": [],  //账号行业
			"verifiedStatus": [],
			"liveLatestPublishTime": [4, 5],
			"areaIds": [1, 2, 3, 4, 5],
			"readPrice": [1],
			"playPrice": [3]
		}
		const platformType = parseInt(params.platformType, 10);
		return (
			<div className='filter-common'>
				<div className="filter-common-items">
					{
						mapFieldsToPlatform['kolVisitorGenderDrawType'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='受众性别' className='dropdown-menu'>
							{getFieldDecorator("kolVisitorGenderDrawType", {
								// initialValue: "0"
							})(
								<SelectMenu
									options={kolVisitorGenderOptions}
									onSelect={values => onChange('kolVisitorGenderDrawType', '受众性别', values)}
								></SelectMenu>
							)}
						</DropdownMenuNew>
					}
					{
						mapFieldsToPlatform['kolVisitorAgeDraw'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='受众年龄' className='dropdown-menu' >
							{getFieldDecorator("kolVisitorAgeDraw", {
								// initialValue: {
								// 	name: '19-24',
								// 	weight: [30, 100]
								// }
							})(<SelectAndInput promptMessage="可以选择占比大于某个值的年龄段" options={kolVisitorAgeDrawOptions} onOkClick={(values) => { onChange('kolVisitorAgeDraw', '受众年龄', values) }}></SelectAndInput>
							)}
						</DropdownMenuNew>
					}
					{
						mapFieldsToPlatform['kolVisitorProvinceDraw'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='受众地域' className='dropdown-menu'>
							{getFieldDecorator("kolVisitorProvinceDraw", {
								// initialValue: {
								// 	name: '',
								// 	weight: [30, 100]
								// }
							})(
								<SelectAndInput promptMessage="可以选择占比大于某个值的地域" options={kol_province_list_options} onOkClick={(values) => { onChange('kolVisitorProvinceDraw', '受众地域', values) }}></SelectAndInput>
							)}
						</DropdownMenuNew>
					}
					{
						mapFieldsToPlatform['kolVisitorInterestDraw'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='受众兴趣' className='dropdown-menu'>
							{getFieldDecorator("kolVisitorInterestDraw", {
								// initialValue: {
								// 	name: '',
								// 	weight: [30, 100]
								// }
							})(
								<SelectAndInput promptMessage="可以选择占比大于某个值的兴趣" options={kol_interest_list_options} onOkClick={(values) => { onChange('kolVisitorInterestDraw', '受众兴趣', values) }}></SelectAndInput>
							)}
						</DropdownMenuNew>
					}
					{/* 微信公众号 */}
					{
						mapFieldsToPlatform['trueReadRatio'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='真实阅读率' className='dropdown-menu'>
							{getFieldDecorator("trueReadRatio", {
								// initialValue: {
								// 	name: '',
								// 	weight: [30, 100]
								// }
							})(
								<SelectAndInput id='trueReadRatio' onOkClick={(values) => { onChange('trueReadRatio', '真实阅读率', values) }}></SelectAndInput>
							)}</DropdownMenuNew>
					}
					{
						mapFieldsToPlatform['mediaIndex1AvgReadNum'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='多一阅读量' className='dropdown-menu'>
							{getFieldDecorator("mediaIndex1AvgReadNum", {
								// initialValue: {
								// 	name: '',
								// 	weight: [30, 100]
								// }
							})(
								<IndexButton id='mediaIndex1AvgReadNum' onOkClick={(values) => { onChange('mediaIndex1AvgReadNum', '多一阅读量', values) }} inputLableAfter=""></IndexButton>
							)}</DropdownMenuNew>
					}
					{/* 新浪微博 */}
					{
						mapFieldsToPlatform['directMediaInteractionAvg'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='直发互动量' className='dropdown-menu'>
							{getFieldDecorator("directMediaInteractionAvg", {
								// initialValue: {
								// 	name: '',
								// 	weight: [30, 100]
								// }
							})(
								<IndexButton promptMessage="直发类型微博的平均转发、评论、点赞之和" id='directMediaInteractionAvg' onOkClick={(values) => { onChange('directMediaInteractionAvg', '直发互动量', values) }} inputLableAfter=""></IndexButton>
							)}</DropdownMenuNew>
					}
					{
						mapFieldsToPlatform['trueFansRate'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='真粉率' className='dropdown-menu'>
							{getFieldDecorator("trueFansRate", {
								// initialValue: {
								// 	name: '',
								// 	weight: [30, 100]
								// }
							})(
								<SelectAndInput id='trueFansRate' onOkClick={(values) => { onChange('trueFansRate', '真粉率', values) }}></SelectAndInput>
							)}</DropdownMenuNew>
					}

					{/* 视频/直播， 小红书,其他平台 */}

					{
						// 	mapFieldsToPlatform[].includes(platformType) &&	 <DropdownMenuNew  visible={dropdownMenuShow} name='首次上架时间' className='dropdown-menu'>
						// 	<SelectMenu id='' options={dateRangeOptions}></SelectMenu>
						// </DropdownMenuNew>
					}

					{
						mapFieldsToPlatform['areaIds'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='账号地域' className='dropdown-menu'>
							{getFieldDecorator("areaIds", {
								// initialValue: '0'
							})(
								<TreeTransfer options={default_hot_cities} onOkClick={(values) => { onChange('areaIds', '账号地域', values) }} onClickCancel={this.onClickCancel}></TreeTransfer>
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
									onSelect={(values) => { onChange('gender', '账号性别', values) }}
									options={genderOptions}
								></SelectMenu>
							)}</DropdownMenuNew>
					}
					{
						//这个暂时使用受众兴趣的options
						mapFieldsToPlatform['industryId'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='账号行业' className='dropdown-menu'>
							{getFieldDecorator("industryId", {
								// initialValue: '0'
							})(
								<SelectMenu
									onSelect={(values) => { onChange('industryId', '账号行业', values) }}
									options={industry_list_options}></SelectMenu>
							)}</DropdownMenuNew>
					}
					{
						mapFieldsToPlatform['verifiedStatus'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='认证类型' className='dropdown-menu'>
							{getFieldDecorator("verifiedStatus", {
								// initialValue: '0'
							})(
								<SelectMenu
									onSelect={(values) => { onChange('verifiedStatus', '认证类型', values) }}
									options={verified_status}
								></SelectMenu>
							)}</DropdownMenuNew>
					}
					{mapFieldsToPlatform['readPrice'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='阅读单价' className='dropdown-menu'>
						<div className='' style={{ 'overflow': 'hidden', marginBottom: '20px' }}>
							{getFieldDecorator('skuUnitReadPrice', {})(
								<SelectAndInput
									onOkClick={(values) => { onChange('skuUnitReadPrice', '阅读单价', values) }}
									inputLableBefore='阅读单价'
									inputLableAfter=''
									showType='three'
									options={unit_read_price_types}
								></SelectAndInput>
							)}
						</div></DropdownMenuNew>
					}

					{mapFieldsToPlatform['playPrice'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='播放单价' className='dropdown-menu'>
						<div className='' style={{ 'overflow': 'hidden', marginBottom: '20px' }}>
							{getFieldDecorator('skuUnitPlayPrice', {})(
								<SelectAndInput
									onOkClick={(values) => { onChange('skuUnitPlayPrice', '播放单价', values) }}
									inputLableBefore='播放单价'
									inputLableAfter=''
									showType='three'
									options={unit_play_price_types}
								></SelectAndInput>
							)}
						</div></DropdownMenuNew>
					}
					{/* {
						mapFieldsToPlatform['liveLatestPublishTime'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='最近一次内容发布时间' className='dropdown-menu'>
							{getFieldDecorator("liveLatestPublishTime", {
								// initialValue: '0'
							})(
								<SelectMenu id='liveLatestPublishTime'
									onSelect={(values) => { onChange('liveLatestPublishTime', '最近一次内容发布时间', values) }}
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
				{/* <SelectedItem selectedItemsArray={selectedItemsArray} resetFilter={this.resetFilter} remove={this.remove}></SelectedItem> */}
			</div >
		)
	}
}




