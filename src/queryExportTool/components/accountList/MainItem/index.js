import React, { PureComponent } from "react"
import './index.less'
import FansCount from "@/queryExportTool/components/fansCount";
import SimpleTables from "@/queryExportTool/base/SimpleTables";
import InfoDIsplay from "@/queryExportTool/base/InfoDIsplay";
import CTag from "@/queryExportTool/base/CustomTag";
import { WBYPlatformIcon } from "wbyui"
import MarkMessage from "../../../base/MarkMessage";
import LazyLoad from 'react-lazyload';
import numeral from "numeral";
import MultiClamp from 'react-multi-clamp';
import { Icon } from "antd";

import AccountInfos, {
	Avatar,
	AvatarType,
	Secondary,
	ImgType,
	StatusAB
} from "@/queryExportTool/components/common/AccountInfos";
import QRCode from "@/queryExportTool/components/common/AccountInfos/QRCode";
import MediaInfo from "@/queryExportTool/components/common/MediaInfo";
import messageInfo from "../../../constants/messageInfo"
import AccountDetails from "../../../containers/AccountDetails";
import { Popover, Row, Col, Button } from "antd";
import { sensors } from '@/util/sensor/sensors'
const { location } = window;

export default class MainItem extends PureComponent {
	componentWillMount() { }
	//此处是右侧两个小表格的配置列项
	getColumsNum = (group_type, Is_wei) => {
		const tableKey = group_type == 1 ? Is_wei ? 11 : 1 : group_type
		const tableCol = {
			1: ["fabu-yuyue", "yuedu"],
			11: ["fabu-wei", "yuedu"],
			2: ['baojia', 'zhifa'],
			3: ['baojiatwo', 'video'],
			4: ['baojia', 'red'],
			5: ['baojia', 'otherAvg'],
		}
		return tableKey ? tableCol[tableKey] : ['', '']
	}
	track = (eventName) => {
		const { accountListItem = {} } = this.props
		const { base: { account_id } } = accountListItem;
		console.log(eventName, { account_id: account_id, pathname: location.pathname })
		sensors.track(eventName, { account_id: account_id, pathname: location.pathname });
	}


	render() {
		const { accountListItem = {}, isDeleteAction, batchRemove } = this.props
		const { base = {}, price, avg_data = {}, platform_id = 0, group_type } = accountListItem
		const { sns_name = '', avatar_url, verified_status, level, introduction,
			is_low_quality, url, is_support_topic_and_link, is_verified,
			can_origin, area_name, age_group, original_type_display = [],
			is_prevent_shielding, classification = [], qr_code_url,
			sns_id, verification_info, media_manager, is_famous,
			operation_tags = [], follower_count, account_id, gender,
			snbt, true_fans_rate, true_read_ratio, media_weekly_group_count_90d,
			weekly_order_num, reservation_order_num, media_count_7d, media_group_count_7d,
			on_shelf_status = {}, follower_count_verification_status,
			follower_count_screenshot_modified_time, user_id
		} = base
		const genderName = gender == 1 ? "男" : gender == 2 ? "女" : ""
		const IS_WEiXin = group_type == 1
		const Is_Weibo = group_type == 2
		const Is_Red = group_type == 3
		const Is_Vidro = group_type == 4
		const Is_Other = group_type == 5
		const Is_wei = is_famous == 2
		return <section className={`account-list-main-item ${isDeleteAction ? "main-item-hover" : ""}`} >
			{/* {checkNode} */}
			{isDeleteAction ?
				<div className="delete-actions" onClick={() => { batchRemove(account_id, group_type, Is_wei ? "weiNum" : "yuyueNum", follower_count) }}>
					<Icon type="delete" style={{ marginRight: 5 }} />删除</div>
				: null}
			<div className="account-list-main-item-content" style={{ clear: "both" }}>
				<main className="content-main">
					<div className='content-main-left'>
						<div>
							{platform_id ? <WBYPlatformIcon
								weibo_type={platform_id}
								widthSize={20}
							/> : null}
						</div>
						<div>
							<Avatar id={`avatar_${account_id}`} src={avatar_url} name='测试图'>
								<AvatarType type={Is_wei ? "micro" : 'famous'} />
							</Avatar>
							<div>
								<div style={{ padding: 10 }}>
									{/* 朋友圈和微信没有去主页 */}
									{IS_WEiXin || platform_id == 23 ? null : <a onClick={() => this.track('vievAccountHomePageEvent')} href={url} target="_blank">去主页</a>}
								</div>
								<div style={{ marginLeft: 6 }}>
									{is_low_quality == 1 ? <CTag color='gary'> 劣质号 </CTag> : null}
								</div>
								{/* 此处是上下架判断 */}
								<div style={{ marginTop: 2 }}>
									<div><StatusAB title="A" status={on_shelf_status && on_shelf_status.a_on_shelf_status} reason={on_shelf_status && on_shelf_status.a_off_shelf_reason_strings} /></div>
									<div><StatusAB title="B" status={on_shelf_status && on_shelf_status.b_on_shelf_status} reason={on_shelf_status && on_shelf_status.b_off_shelf_reason_strings} /></div>
								</div>
							</div>
						</div>
						<AccountInfos>
							<div onClick={() => { this.track('vievAccountDetailEvent'); this.props.setModalContent(<AccountDetails account_id={account_id} />) }}>
								{/* 此处是账号名称的判断 */}
								<Popover content={sns_name} trigger="hover"  >
									<span className="sns_name_title">{sns_name}</span>
								</Popover>
								{/* 此处是账号平台认证图标、等级图标、蓝黄V图标 */}
								<ImgType verified_status={verified_status} level={level} platform_id={platform_id} is_verified={is_verified} Is_Red={Is_Red} Is_Vidro={Is_Vidro} />

							</div>
							{/* 性别|地域|年龄 */}
							<Secondary genderName={genderName} area_name={area_name} age_group={age_group} />
							{/* 微信才显示二维码，其他为简介 */}
							{IS_WEiXin ? <QRCode src={qr_code_url} sns_id={sns_id} verification_info={verification_info} introduction={introduction} /> :
								<Popover content={introduction} trigger="hover" overlayStyle={{ width: 320 }} getPopupContainer={() => document.querySelector('.query-export-tool')}>
									<MultiClamp ellipsis="..." clamp={2}>{introduction}</MultiClamp>
								</Popover>}
							<div style={{ marginTop: 10 }}>
								{/* 根据平台不同展示不同的标签 */}
								{original_type_display.map((one, index) => <CTag key={index} color='green'>{one}</CTag>)}
								{is_prevent_shielding == 1 && Is_Weibo ? <CTag color='green'>防屏蔽</CTag> : null}
								{is_support_topic_and_link == 1 && Is_Weibo ? <CTag color='green'>可带@/话题/链接</CTag> : null}
								{can_origin == 1 ? <CTag color='green'>原创</CTag> : null}
							</div>
							<div style={{ marginTop: 10 }}>
								{/* 此处展示为运营标签 */}
								{operation_tags && operation_tags.map((one, index) => <CTag key={one.id} color='blue'>{one.name}</CTag>)}
							</div>
						</AccountInfos>

					</div>
					{/* 此处是粉丝数，微信没有粉丝数认证*/}
					<div className="fans-count-box">
						<FansCount value={follower_count > 0 ? follower_count : 0} status={follower_count_verification_status}
							time={follower_count_screenshot_modified_time} IS_WEiXin={IS_WEiXin} />
					</div>
					{/* 此处是右侧两个小表格*/}
					<SimpleTables Is_wei={Is_wei} data={price && price.skus}
						columsNum={this.getColumsNum(group_type, Is_wei)[0]}
						dataTime={price && price.price_valid_to}
						tableFooterText={Is_wei ? "" : "价格有效期"}
						isLeft={true} />
					<SimpleTables Is_wei={Is_wei} data={avg_data && avg_data.items} columsNum={this.getColumsNum(group_type)[1]} dataTime={avg_data && avg_data.fetched_time} tableFooterText="抓取时间" />

				</main>
				<footer className="content-footer">
					<LazyLoad once overflow>
						<MediaInfo {...media_manager} job={media_manager && media_manager.title} user_id={user_id} />
					</LazyLoad>
					{/* <MediaInfo {...media_manager} user_id={user_id} /> */}

					<div className='footer-tages'>
						{/* 此处是热门标签 */}
						{classification && classification.slice(0, 1).map((one, index) => <CTag key={index}>{one.name}</CTag>)}
					</div>
					<div className='footer-info-status'>
						{/* 此处为右下角展示统计信息 */}
						{Is_Other ? null : <InfoDIsplay title={<span>SNBT值 <MarkMessage {...messageInfo['snbt']} /></span>} value={snbt ? numeral(snbt).format("0.0") : ""} textColor="#3db389" afterLable=" " />}
						{Is_Weibo ? <InfoDIsplay title={<span>真粉率<MarkMessage {...messageInfo['zhenfen']} /></span>} value={true_fans_rate ? numeral(true_fans_rate).format("0.0%") : ""} isString={true} /> : null}
						{IS_WEiXin ? <InfoDIsplay title={<span>真实阅读率<MarkMessage {...messageInfo['yudu']} /></span>} value={true_read_ratio ? numeral(true_read_ratio).format("0.0") : ""} afterLable="%" /> : null}
						{IS_WEiXin ? <InfoDIsplay title={<span>周平均推送<MarkMessage {...messageInfo['week']} /></span>} value={media_weekly_group_count_90d} afterLable="次" /> : null}
						{Is_Other ? null : <InfoDIsplay title={<span>近7天推送<MarkMessage {...messageInfo['day']} /></span>} value={IS_WEiXin ? media_group_count_7d : media_count_7d} afterLable="次" />}
						{Is_wei ? <InfoDIsplay title={<span>周订单<MarkMessage {...messageInfo['weekdan']} /></span>} value={weekly_order_num} afterLable="次" /> : null}
						{Is_wei ? null : <InfoDIsplay title={<span>被约次数<MarkMessage {...messageInfo['some']} /></span>} value={reservation_order_num} afterLable="次" />}
					</div>
				</footer>

			</div>
		</section >
	}
}
