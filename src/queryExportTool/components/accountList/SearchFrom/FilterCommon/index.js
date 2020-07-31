import React from 'react';
import { Tag, DatePicker, Button, Popover, Icon, message } from 'antd';
import DropdownMenuNew from '../../../dropdownMenu/dropdownMenuNew'
import MoreFilter from '../MoreFilter/index'
import SelectAndInput from '../SelectAndInput'
import IndexButton from '../SelectAndInput/indexButton'

import SelectMenu from '../SelectMenu'
import TreeTransfer from '../TreeTransfer'
import './FilterCommon.less'
import { objectToArray } from '../../../../../util'
import {
	genderOptions,
	kolVisitorAgeDrawOptions,
	kolVisitorGenderOptions,
} from '@/queryExportTool/constants/searchFilter'

export default class FilterCommon extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
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

	onMoreFilterCancel = () => {
		this.onVisibleChange(false)
	}
	onVisibleChange = (visible) => {
		this.setState({
			moreFilterVisible: visible
		})
	}
	onMoreFilterOk = (selectedItems) => {
    this.onVisibleChange(false)
    let allSelectedItems = {
      ...this.props.selectedItems,
      ...selectedItems
    };
    const {batchUpdateSelectedItems} = this.props;
    let newObj = {};
    if (Object.keys(allSelectedItems).length > 10) {
      let keys = Object.keys(allSelectedItems).slice(0, 10);
      for (let i = 0; i < keys.length; i++) {
        newObj[keys[i]] = allSelectedItems[keys[i]]
      }
      console.log(newObj)
      batchUpdateSelectedItems(newObj);
      message.error("最多显示10个标签");
      return;
    }
		batchUpdateSelectedItems(selectedItems);
    this.props.onFilter();
	}

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
			unitPlayPriceTypes,
			unitReadPriceTypes,
			verifiedStatus,
			defaultHotCities,
			industryList,
			kolProvinceList, //账号地域
			kolInterestList,	//账号兴趣
		} = filterOptions[params.platformType] || {};

		const { dropdownMenuShow } = this.state;
		const selectedItemsArray = objectToArray({ ...selectedItems });
		const mapFieldsToPlatform = {
			"kolVisitorGenderDrawType": [1, 2, 3], //受众性别
			"kolVisitorAgeDraw": [1, 2, 3],	//受众年龄
			"kolVisitorProvinceDraw": [1, 2, 3],
			"kolVisitorInterestDraw": [1, 2, 3],
			"trueReadRatio": [1],
			"mediaIndexOneAvgReadNum": [1],
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
                  selectedItems={this.props.selectedItems}
								></SelectMenu>
							)}
						</DropdownMenuNew>
					}
					{
						mapFieldsToPlatform['kolVisitorAgeDraw'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='受众年龄' className='dropdown-menu' >
							{getFieldDecorator("kolVisitorAgeDraw", {
              })(<SelectAndInput promptMessage="可以选择占比大于某个值的年龄段" options={kolVisitorAgeDrawOptions} onOkClick={(values) => { onChange('kolVisitorAgeDraw', '受众年龄', values) }} selectedItems={this.props.selectedItems}></SelectAndInput>
							)}
						</DropdownMenuNew>
					}
					{
						mapFieldsToPlatform['kolVisitorProvinceDraw'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='受众地域' className='dropdown-menu'>
							{getFieldDecorator("kolVisitorProvinceDraw", {
							})(
                <SelectAndInput promptMessage="可以选择占比大于某个值的地域" options={kolProvinceList} onOkClick={(values) => { onChange('kolVisitorProvinceDraw', '受众地域', values) }} selectedItems={this.props.selectedItems}></SelectAndInput>
							)}
						</DropdownMenuNew>
					}
					{
						mapFieldsToPlatform['kolVisitorInterestDraw'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='受众兴趣' className='dropdown-menu'>
							{getFieldDecorator("kolVisitorInterestDraw", {
							})(
                <SelectAndInput promptMessage="可以选择占比大于某个值的兴趣" options={kolInterestList} onOkClick={(values) => { onChange('kolVisitorInterestDraw', '受众兴趣', values) }} selectedItems={this.props.selectedItems}></SelectAndInput>
							)}
						</DropdownMenuNew>
					}
					{/* 微信公众号 */}
					{
						mapFieldsToPlatform['trueReadRatio'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='真实阅读率' className='dropdown-menu'>
							{getFieldDecorator("trueReadRatio", {
							})(
                <SelectAndInput id='trueReadRatio' onOkClick={(values) => { onChange('trueReadRatio', '真实阅读率', values) }} selectedItems={this.props.selectedItems}></SelectAndInput>
							)}</DropdownMenuNew>
					}
					{
						mapFieldsToPlatform['mediaIndexOneAvgReadNum'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='头条阅读量' className='dropdown-menu'>
							{getFieldDecorator("mediaIndexOneAvgReadNum", {
								// initialValue: {
								// 	name: '',
								// 	weight: [30, 100]
								// }
							})(
								<IndexButton id='mediaIndexOneAvgReadNum' onOkClick={(values) => { onChange('mediaIndexOneAvgReadNum', '头条阅读量', values) }} inputLableAfter=""></IndexButton>
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
							})(
                <SelectAndInput id='trueFansRate' onOkClick={(values) => { onChange('trueFansRate', '真粉率', values) }} selectedItems={this.props.selectedItems}></SelectAndInput>
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
								<TreeTransfer options={defaultHotCities} onOkClick={(values) => { onChange('areaIds', '账号地域', values) }} onClickCancel={this.onClickCancel}></TreeTransfer>
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
									options={industryList}></SelectMenu>
							)}</DropdownMenuNew>
					}
					{
						mapFieldsToPlatform['verifiedStatus'].includes(platformType) && <DropdownMenuNew visible={dropdownMenuShow} name='认证类型' className='dropdown-menu'>
							{getFieldDecorator("verifiedStatus", {
								// initialValue: '0'
							})(
								<SelectMenu
									onSelect={(values) => { onChange('verifiedStatus', '认证类型', values) }}
									options={verifiedStatus}
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
									options={unitReadPriceTypes}
                  selectedItems={this.props.selectedItems}
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
									options={unitPlayPriceTypes}
                  selectedItems={this.props.selectedItems}
								></SelectAndInput>
							)}
						</div></DropdownMenuNew>
					}
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
								unitPlayPriceTypes,
								unitReadPriceTypes,
								verifiedStatus,
								industryList
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




