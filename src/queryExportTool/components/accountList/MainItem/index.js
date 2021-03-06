import React, {PureComponent} from "react"
import './index.less'
import FansCount from "@/queryExportTool/components/fansCount";
import TwoTable from "@/queryExportTool/base/SimpleTables/TwoTable";
import InfoDIsplay from "@/queryExportTool/base/InfoDIsplay";
import CTag from "@/queryExportTool/base/CustomTag";
import {WBYPlatformIcon} from "wbyui"
import MarkMessage from "../../../base/MarkMessage";
import LazyLoad from 'react-lazyload';
import numeral from "numeral";
import MultiClamp from 'react-multi-clamp';
import {Icon, Tooltip, Tag} from "antd";
import AuthVisbleIsBP from '@/queryExportTool/containers/AuthVisbleIsBP'
import AccountInfos, {
    Avatar,
    AvatarType,
    Secondary,
    StatusAB,
    PlatformVerified,
    WeiboVip,
    LevalImg
} from "@/queryExportTool/components/common/AccountInfos";
import QRCode from "@/queryExportTool/components/common/AccountInfos/QRCode";
import MediaInfo from "@/queryExportTool/components/common/MediaInfo";
import messageInfo from "../../../constants/messageInfo"
import AccountDetails from "../../../containers/AccountDetails";
import {Popover, Row, Col, Button} from "antd";
import {sensors} from '@/util/sensor/sensors'
import ClassificationFeedback from "../../common/ClassificationFeedback";
import PayAdvanced from "../../common/AccountInfos/PayAdvanced";
import qs from 'qs'

const {location} = window;

export default class MainItem extends PureComponent {
    componentWillMount() {
    }

    track = (eventName, position) => {
        const {accountListItem = {}} = this.props
        const {accountId} = accountListItem;
        // sensors.track(eventName, {
        // 	accountId: accountId,
        // 	position: position,
        // 	app_id: 101
        // // });
    }
    //查看详情
    lookDetail = (platformId, accountId, groupType) => {
        const urlPrapm = qs.stringify({platformId, accountId, groupType})

        //神策统计
        this.track('AccountListClick', '详情');
        [1, 9, 93, 24, 25, 103, 110, 115, 116].includes(platformId) ?
            window.open(`/account/view/detail?${urlPrapm}`, "_blank")
            : this.props.setModalContent(<AccountDetails accountId={accountId}
            />)
        //添加打开详情
        const {actions} = this.props
        actions && actions.addLookDetailOrIndexList({detali: [accountId]});
    }
    //去主页的事件触发
    lookIndex = (accountId) => {
        this.track('AccountListClick', '主页')
        const {actions} = this.props
        actions && actions.addLookDetailOrIndexList({index: [accountId]});
    }

    render() {
        const {accountListItem = {}, isPreloading, isDeleteAction, batchRemove} = this.props
        const {
            snsName = '', isHighProfit, avatarUrl, verifiedStatus, level, introduction,
            isLowQuality, url, isSupportTopicAndLink, isVerified,
            canOriginWrite, areaName, ageGroup, originalName,
            isPreventShielding, classificationList = [], qrCodeUrl,
            snsId, verificationInfo, mediaManager, isFamous, userId,
            operationTagList = [], followerCount, accountId, gender, snsUniqueId,
            snbt, trueFansRate, trueReadRatio, mediaWeeklyGroupCount90d,
            weeklyOrderNum, reservationOrderNum, mediaCount7d, mediaGroupCount7d,
            onShelfStatus = {}, followerCountVerificationStatus,
            followerCountScreenshotModifiedTime, trinityIsPreventShielding,
            avgData = {}, platformId = 0, groupType, agentInfo, followerCountGrowthRate28d, verificationReason
        } = accountListItem

        const genderName = gender == 1 ? "男" : gender == 2 ? "女" : ""
        const ISWEiXin = groupType == 1
        const IsWeibo = groupType == 2
        const IsVidro = groupType == 3
        const IsRed = groupType == 4
        const IsOther = groupType == 5
        const IsWei = isFamous == 2
        const isfollowerCount = (IsWeibo || IsRed || IsVidro) && followerCountGrowthRate28d


        return <section className={`account-list-main-item ${isDeleteAction ? "main-item-hover" : ""}`}>
            {/* {checkNode} */}
            {isDeleteAction ?
                <div className="delete-actions" onClick={() => {
                    batchRemove(accountId, groupType, IsWei ? "weiNum" : "yuyueNum", followerCount)
                }}>
                    <Icon type="delete" style={{marginRight: 5}}/>删除</div>
                : null}
            <div className="account-list-main-item-content" style={{clear: "both"}}>
                <main className="content-main">
                    <div className='content-main-left'>
                        <div className='platform-icon'>
                            {platformId ? <WBYPlatformIcon
                                weibo_type={platformId}
                                width_size={20}
                            /> : null}
                            {
                                isHighProfit === 1 ?
                                    <img src={require('./../images/HOT.png')} width='30' alt=""/> : null
                            }
                        </div>
                        <div>
                            <Avatar id={`avatar_${accountId}`} src={avatarUrl} name='测试图'>
                                <AvatarType type={IsWei ? "micro" : 'famous'}/>
                            </Avatar>
                            <div>
                                <div style={{padding: 10}}>
                                    {/* 朋友圈和微信没有去主页 */}
                                    {platformId == 23 ? null : <a onClick={() => this.lookIndex(accountId)}
                                                                  href={ISWEiXin ? `https://weixin.sogou.com/weixin?query=${snsId}` : url} target="Blank">去主页</a>}
                                </div>
                                <div style={{marginLeft: 6}}>
                                    {isLowQuality == 1 ? <CTag color='gary'> 劣质号 </CTag> : null}
                                </div>
                                {/* 此处是上下架判断 */}
                                <div style={{marginTop: 2}}>
                                    <div><StatusAB title="A" status={onShelfStatus && onShelfStatus.aOnShelfStatus} reason={onShelfStatus && onShelfStatus.aOffShelfReasonStringList}/></div>
                                    <div><StatusAB title="B" status={onShelfStatus && onShelfStatus.bOnShelfStatus} reason={onShelfStatus && onShelfStatus.bOffShelfReasonStringList}/></div>
                                </div>
                            </div>
                        </div>
                        <AccountInfos>
                            <div className='one-line-box-name-level' onClick={() => this.lookDetail(platformId, accountId, groupType)}>
                                {/* 此处是账号名称的判断 */}
                                <Popover content={snsName} trigger="hover">
                                    <div className="sns-name-title">{snsName}</div>
                                </Popover>
                                {/* 此处是账号平台认证图标、等级图标、蓝黄V图标 */}
                                <div>
                                    <PlatformVerified verifiedStatus={isVerified} platformId={platformId}/>
                                </div>
                                <div>
                                    <WeiboVip verifiedStatus={verifiedStatus} platformId={platformId} marginTop={0}/>
                                </div>
                                {IsRed || IsVidro ? <LevalImg leval={level} platformId={platformId}/> : null}
                            </div>
                            <div className='sns-account'>
                                {ISWEiXin || IsWeibo ? null : snsId ? `ID：${snsId}` : null}
                                {IsWeibo ? snsUniqueId ? `ID：${snsUniqueId}` : null : null}
                                <div>accountId：{accountId}</div>
                            </div>
                            {/* 性别|地域|年龄 */}
                            <Secondary genderName={genderName} areaName={areaName} ageGroup={ageGroup}/>
                            {/* 微信才显示二维码，其他为简介 */}
                            {ISWEiXin ? <QRCode src={qrCodeUrl} snsId={snsId} verificationInfo={verificationInfo} introduction={introduction}/> :
                                <Popover content={IsWeibo ? verificationReason : introduction} trigger="hover" overlayStyle={{width: 320}} getPopupContainer={() => document.querySelector('.query-export-tool')}>
                                    <MultiClamp ellipsis="..." clamp={2}>{IsWeibo ? verificationReason : introduction}</MultiClamp>
                                </Popover>
                            }
                            <div style={{marginTop: 10}}>
                                {/* 根据平台不同展示不同的标签 */}
                                {originalName && originalName.split(',').map((one, index) => <CTag key={index} color='green'>{one}</CTag>)}
                                {!ISWEiXin && trinityIsPreventShielding == 1 ? <CTag color='green'>防屏蔽</CTag> : null}
                                {/*{isSupportTopicAndLink == 1 && IsWeibo ? <CTag color='green'>可带@/话题/链接</CTag> : null} */}
                                {canOriginWrite == 1 ? <CTag color='green'>原创</CTag> : null}
                            </div>
                            <div style={{marginTop: 10}}>
                                {/* 此处展示为运营标签 */}
                                {operationTagList && operationTagList.map((one, index) => one.name && <Tooltip
                                    key={one.id}
                                    title={one.tagDescription} getPopupContainer={() => document.querySelector('.query-export-tool')}>
                                    <Tag color="blue">{one.name}</Tag>
                                </Tooltip>)}
                            </div>
                            <div style={{marginTop: 10}}>
                                {/* 此处展示为是否提前打款标示 */}
                                <LazyLoad once overflow height={20}>
                                    <PayAdvanced accountId={accountId}/>
                                </LazyLoad>
                            </div>
                        </AccountInfos>

                    </div>
                    {/* 此处是粉丝数，微信没有粉丝数认证*/}
                    <div className="fans-count-box">
                        <FansCount value={followerCount > 0 ? followerCount : 0} status={followerCountVerificationStatus}
                                   time={followerCountScreenshotModifiedTime}
                                   followerCountGrowthRate28d={followerCountGrowthRate28d}
                                   isfollowerCount={isfollowerCount}
                        />
                    </div>
                    {/* 此处是右侧两个小表格*/}
                    {isPreloading ? <TwoTable IsWei={IsWei} groupType={groupType} platformId={platformId} accountId={accountId} isShielding={isPreventShielding == 1} isFamous={isFamous} ISWEiXin={ISWEiXin}/> :
                        <LazyLoad once overflow>
                            <TwoTable IsWei={IsWei} groupType={groupType} platformId={platformId} accountId={accountId} isShielding={isPreventShielding == 1} isFamous={isFamous} ISWEiXin={ISWEiXin}/>
                        </LazyLoad>}
                </main>
                <footer className="content-footer">

                    <MediaInfo agentInfo={agentInfo} userId={userId}/>

                    {/* <MediaInfo {...mediaManager} userId={userId} /> */}

                    <div className='footer-tages'>
                        {/* 此处是热门标签 */}
                        {classificationList && classificationList.slice(0, 1).map((one, index) => <CTag key={index}>{one.name}</CTag>)}
                        {(classificationList && classificationList.length) ?
                            <AuthVisbleIsBP isComponent={null} noComponent={<LazyLoad once overflow height='20'>
                                <ClassificationFeedback data={accountListItem}/>
                            </LazyLoad>}/>
                            : null}
                    </div>
                    <div className='footer-info-status'>
                        {/* 此处为右下角展示统计信息 */}
                        {IsOther ? null : <InfoDIsplay title="SNBT值 " messageInfoKey='snbt' value={snbt} format="0.0"/>}
                        {IsWeibo ? <InfoDIsplay title="真粉率" messageInfoKey='zhenfen' value={trueFansRate} format="0.0%"/> : null}
                        {ISWEiXin ? <InfoDIsplay title="真实阅读率" messageInfoKey='yudu' value={trueReadRatio} format="0.0" afterLable="%"/> : null}
                        {ISWEiXin ? <InfoDIsplay title="周平均推送" messageInfoKey='week' value={mediaWeeklyGroupCount90d} afterLable="次"/> : null}
                        {IsOther ? null : <InfoDIsplay title="近7天推送" messageInfoKey='day' value={ISWEiXin ? mediaGroupCount7d : mediaCount7d} afterLable="次"/>}
                        {IsWei ? <InfoDIsplay title="周订单" messageInfoKey='weekdan' value={weeklyOrderNum} afterLable="次"/> : null}
                        {IsWei ? null : <InfoDIsplay title="被约次数" messageInfoKey='some' value={reservationOrderNum} afterLable="次"/>}
                    </div>
                </footer>

            </div>
        </section>

    }
}
