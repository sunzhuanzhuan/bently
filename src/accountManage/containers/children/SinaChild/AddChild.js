import React, { Component } from "react"
import PropTypes from 'prop-types'
import { BaseInfo } from '../../../components/BaseInfo'
import { FetchInfo } from '../../../components/FetchInfo'
import {
	AccountDesc,
	AccountIsNameless,
	AccountType,
	Orderable,
	QCCodeUpload
} from '../../../components/Unique'
import { Fans } from '../../../components/Fans'
import { WrapPanel } from '../../../components/index'
import { platformMap } from '../../../constants/platform'
import { NamelessPrice } from "../../../components/AccountPrice";
import { OnSaleInfoForAdd } from "../../../components/OnSaleInfo";

export default class AddChild extends Component {
	static contextTypes = {
		refresh: PropTypes.func
	}

	componentWillMount() { }

	render() {
		const { params, form } = this.props
		const { refresh } = this.context
		const { pid, data: { priceTypeList = [], accountInfo } } = params;
		const { platform_name,platform_icon } = accountInfo
		params.refresh = refresh
		//price_item_list
		const priceKeys = priceTypeList.map(({ sku_type_code, sku_type_name }) => ({
			key: sku_type_code, name: sku_type_name
		}))
		const baseInfoLeft = <div className='wrap-panel-left-content'>
			<img style={{position: "relative",top: '-3px'}} src={platform_icon} alt={platform_name} />
			<span>{platform_name}</span>
		</div>
		return <div>
			<WrapPanel header='信息自动抓取' navId='getAccountInfos'>
				<FetchInfo {...params} defaultKeys='' form={form}/>
			</WrapPanel>
			<WrapPanel header='账号基本信息' navId='baseInfos' left={baseInfoLeft}>
				<BaseInfo {...params}>
					<Fans {...params}
						isFansNumberImg={pid == platformMap.WECHAT || pid == platformMap.PENG_YOU_QUAN}
						isDisableFollowersCount={!(true)}
					/>
					<AccountType {...params} />
					<AccountDesc {...params} />
					<AccountIsNameless {...params} />
				</BaseInfo>
			</WrapPanel>
			<WrapPanel header='上下架信息' navId='shelfInfos'>
				<OnSaleInfoForAdd {...params} />
			</WrapPanel>
			<WrapPanel header='账号报价' navId='priceInfos'>
				<NamelessPrice {...params} {...form} priceKeys={priceKeys}>
					<Orderable {...params} {...form} />
				</NamelessPrice>
			</WrapPanel>
		</div>
	}
}
